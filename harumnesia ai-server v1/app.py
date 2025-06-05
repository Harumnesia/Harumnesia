# Impor library yang dibutuhkan
from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import os # Untuk mengecek keberadaan file

# Inisialisasi aplikasi Flask
app = Flask(__name__)

# --- Variabel Global untuk Model dan Data ---
# Variabel ini akan diisi saat aplikasi pertama kali dijalankan
tfidf_vectorizer = None
tfidf_tensor_global = None # Menggunakan nama yang berbeda untuk menghindari konflik dengan variabel lokal
parfum_df = None # Menggunakan nama yang berbeda untuk menghindari konflik dengan variabel lokal
model_loaded_successfully = False

# --- Fungsi untuk Memuat Model dan Data ---
def load_model_assets():
    """
    Fungsi untuk memuat semua aset yang dibutuhkan oleh model.
    Termasuk TF-IDF vectorizer, tensor TF-IDF, dan metadata parfum.
    """
    global tfidf_vectorizer, tfidf_tensor_global, parfum_df, model_loaded_successfully
    
    # Tentukan path ke file aset
    # Diasumsikan file-file ini berada di direktori yang sama dengan app.py
    # atau di path yang bisa dijangkau.
    current_dir = os.path.dirname(os.path.abspath(__file__))
    tfidf_vectorizer_path = os.path.join(current_dir, "tfidf_vectorizer.pkl")
    tfidf_tensor_path = os.path.join(current_dir, "tfidf_tensor.npy")
    parfum_metadata_path = os.path.join(current_dir, "parfum_metadata.csv")

    try:
        # Cek apakah semua file ada
        if not os.path.exists(tfidf_vectorizer_path):
            raise FileNotFoundError(f"File 'tfidf_vectorizer.pkl' tidak ditemukan di {current_dir}.")
        if not os.path.exists(tfidf_tensor_path):
            raise FileNotFoundError(f"File 'tfidf_tensor.npy' tidak ditemukan di {current_dir}.")
        if not os.path.exists(parfum_metadata_path):
            raise FileNotFoundError(f"File 'parfum_metadata.csv' tidak ditemukan di {current_dir}.")

        # Muat TF-IDF vectorizer
        with open(tfidf_vectorizer_path, "rb") as f:
            tfidf_vectorizer = pickle.load(f)
        print("INFO: tfidf_vectorizer.pkl berhasil dimuat.")

        # Muat TF-IDF tensor sebagai NumPy array
        tfidf_tensor_global = np.load(tfidf_tensor_path)
        print(f"INFO: tfidf_tensor.npy berhasil dimuat sebagai NumPy array. Shape: {tfidf_tensor_global.shape}")

        # Muat metadata parfum
        parfum_df = pd.read_csv(parfum_metadata_path)
        # Pastikan kolom 'is_lokal' ada dan bertipe boolean jika memungkinkan
        if 'is_lokal' not in parfum_df.columns:
            print("PERINGATAN: Kolom 'is_lokal' tidak ditemukan di parfum_metadata.csv. Rekomendasi parfum lokal mungkin tidak berfungsi.")
        else:
            # Konversi 'is_lokal' ke boolean jika belum. Misal, jika nilainya 1/0 atau 'True'/'False' string.
            # Ini contoh, sesuaikan dengan data Anda.
            if parfum_df['is_lokal'].dtype == 'object': # Jika string
                 parfum_df['is_lokal'] = parfum_df['is_lokal'].str.lower().map({'true': True, 'false': False, '1': True, '0': False}).fillna(False)
            elif parfum_df['is_lokal'].dtype == 'int64': # Jika integer
                 parfum_df['is_lokal'] = parfum_df['is_lokal'].astype(bool)

        print(f"INFO: parfum_metadata.csv berhasil dimuat. Jumlah data: {len(parfum_df)} parfum.")
        
        model_loaded_successfully = True

    except FileNotFoundError as e:
        print(f"ERROR saat memuat aset: {e}")
        model_loaded_successfully = False
    except Exception as e:
        print(f"ERROR tidak terduga saat memuat aset: {e}")
        model_loaded_successfully = False

# --- Fungsi Utilitas Model ---
def cosine_similarity_custom(array_a, array_b):
    """
    Menghitung cosine similarity antara dua array menggunakan scikit-learn.
    Args:
        array_a: Array pertama.
        array_b: Array kedua.
    Returns:
        Array yang berisi skor cosine similarity.
    """
    return cosine_similarity(array_a, array_b)

# --- Endpoint API ---
@app.route("/recommend", methods=["POST"])
def recommend_perfume():
    """
    Endpoint untuk mendapatkan rekomendasi parfum berdasarkan nama parfum input.
    Menerima JSON dengan key "perfume".
    Mengembalikan rekomendasi parfum lokal.
    """
    if not model_loaded_successfully:
        return jsonify({"error": "Model atau aset gagal dimuat. Silakan cek log server."}), 500

    try:
        # Dapatkan data JSON dari request
        data = request.get_json()
        if not data or "perfume" not in data:
            return jsonify({"error": "Request JSON tidak valid. Pastikan menyertakan field 'perfume'."}), 400

        input_perfume_name = data["perfume"].strip() # Hilangkan spasi di awal/akhir

        # Cari parfum input dalam DataFrame (case-insensitive)
        # .str.lower() untuk pencocokan case-insensitive
        matches = parfum_df[parfum_df["perfume"].str.strip().str.lower() == input_perfume_name.lower()]

        if matches.empty:
            return jsonify({"error": f"Parfum '{input_perfume_name}' tidak ditemukan dalam dataset."}), 404
        
        # Ambil index dari parfum yang cocok pertama
        # Diasumsikan nama parfum unik, jika tidak, ambil yang pertama
        idx = matches.index[0]
        
        # Pastikan idx adalah skalar integer untuk slicing tensor
        if not isinstance(idx, (int, np.integer)):
            # Ini seharusnya tidak terjadi jika DataFrame diindeks dengan benar
            print(f"ERROR: Indeks parfum tidak valid: {idx} (tipe: {type(idx)})")
            return jsonify({"error": "Indeks parfum tidak valid setelah pencarian."}), 500

        # Ambil tensor TF-IDF untuk parfum input
        # Slicing [idx:idx+1] mempertahankan dimensi 2D (misal, (1, num_features))
        input_tensor = tfidf_tensor_global[idx:idx+1]

        # Hitung cosine similarity antara parfum input dengan semua parfum lain
        sim_scores_tensor = cosine_similarity_custom(input_tensor, tfidf_tensor_global)
        
        # Konversi similarity ke NumPy array dan ratakan (flatten)
        # Hasilnya akan menjadi array 1D skor similarity
        sim_scores = sim_scores_tensor.flatten()
        
        # Set skor similarity parfum input dengan dirinya sendiri menjadi -1 (atau nilai rendah lainnya)
        # agar tidak merekomendasikan dirinya sendiri
        sim_scores[idx] = -1 
        
        # Urutkan parfum berdasarkan skor similarity (dari tertinggi ke terendah)
        # np.argsort mengembalikan indeks yang akan mengurutkan array
        sorted_indices = np.argsort(sim_scores)[::-1] # [::-1] untuk descending order
        
        # Filter untuk mendapatkan hanya parfum lokal dan ambil top 8
        # Pastikan kolom 'is_lokal' ada dan bertipe boolean
        if 'is_lokal' in parfum_df.columns:
            local_perfume_indices = [i for i in sorted_indices if parfum_df.loc[i, 'is_lokal'] == True][:8]
        else:
            # Jika kolom 'is_lokal' tidak ada, kembalikan top 8 tanpa filter lokal
            print("PERINGATAN: Kolom 'is_lokal' tidak ada, mengembalikan top 8 tanpa filter lokal.")
            local_perfume_indices = sorted_indices[:8]
        
        if not local_perfume_indices:
            return jsonify({"message": "Tidak ada rekomendasi parfum lokal yang cocok ditemukan.", "recommendations": []}), 200

        # Siapkan hasil rekomendasi dengan similarity score
        recommendations = []
        for idx in local_perfume_indices:
            perfume_data = parfum_df.iloc[idx]
            similarity_score = float(sim_scores[idx])  # Convert numpy float to Python float
            
            recommendations.append({
                "id": perfume_data["ID_Perfume"],
                "perfume": perfume_data["perfume"],
                "brand": perfume_data["brand"],
                "similarity_score": round(similarity_score, 4)  # Round to 4 decimal places
            })
        
        return jsonify({
            "input_perfume": input_perfume_name,
            "recommendations": recommendations,
            "total_found": len(recommendations)
        })

    except KeyError as e:
        # Jika field "perfume" tidak ada dalam JSON request
        print(f"ERROR: KeyError saat memproses request: {e}")
        return jsonify({"error": f"Request JSON tidak valid. Field yang hilang: {e}"}), 400
    except Exception as e:
        # Tangkap error umum lainnya
        print(f"ERROR tidak terduga saat endpoint /recommend: {e}")
        import traceback
        traceback.print_exc() # Cetak traceback untuk debugging lebih detail
        return jsonify({"error": "Terjadi kesalahan internal server saat memproses permintaan."}), 500

# --- Jalankan Aplikasi Flask ---
if __name__ == '__main__':
    # Panggil fungsi untuk memuat model dan aset saat aplikasi dimulai
    load_model_assets()
    
    if model_loaded_successfully:
        print("INFO: Model dan aset berhasil dimuat. Menjalankan server Flask...")
        # Jalankan server Flask di localhost (0.0.0.0 agar bisa diakses dari jaringan lokal)
        # pada port 5001 dengan mode debug aktif.
        app.run(host='0.0.0.0', port=5002, debug=True)
    else:
        print("KRITIS: Gagal memuat model atau aset. Server Flask tidak akan dijalankan.")
        print("Silakan periksa pesan error di atas dan pastikan semua file aset (tfidf_vectorizer.pkl, tfidf_tensor.npy, parfum_metadata.csv) ada di direktori yang benar dan dapat diakses.")