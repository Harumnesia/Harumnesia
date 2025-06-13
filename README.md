#  Harumnesia

Selamat datang di repositori proyek Harumnesia! 🎉

## 💡 Versi Final

⚠️ **Penting:** Versi final dan stabil dari proyek ini, yang merupakan hasil jadi dan direkomendasikan untuk digunakan, berada di *branch* `final`.

## 🚀 Memulai Proyek

Ikuti langkah-langkah di bawah ini untuk mendapatkan salinan proyek di mesin lokal Anda dan menjalankannya.

### ⚙️ Instalasi

1.  **Kloning Repositori:**
    Buka terminal atau *command prompt* Anda dan jalankan perintah berikut untuk mengklon *branch* `final`:

    ```bash
    git clone git@github.com:Harumnesia/Harumnesia.git
    ```

2.  **Masuk ke Direktori Proyek:**
    Setelah berhasil diklon, masuk ke direktori proyek yang baru dibuat:

    ```bash
    cd Harumnesia # Pastikan nama foldernya sama dengan repo ini
    ```

3.  **Instal Dependensi:**
    Instal semua dependensi proyek menggunakan npm:

    ```bash
    npm install
    ```
    *Proses ini mungkin memerlukan waktu beberapa menit, tergantung koneksi internet Anda.*

### ▶️ Menjalankan Proyek

Setelah semua dependensi terinstal, Anda bisa menjalankan proyek dengan perintah berikut:

1.  **Menjalankan Mode Pengembangan (Development):**
    Gunakan perintah ini untuk menjalankan aplikasi dalam mode pengembangan. Biasanya ini akan mengaktifkan *hot-reloading* atau *live-server*.

    ```bash
    npm run dev
    ```

2.  **Menjalankan Mode Pengembangan Penuh (Opsional karena FrontEnd sudah terhubung dengan api yang sudah di deploy):**
    Jika ada perintah `npm run dev:full`, ini mungkin menjalankan semua layanan atau bagian *frontend* dan *backend* sekaligus.

    ```bash
    npm run dev:full
    ```

    *Setelah menjalankan salah satu perintah di atas, aplikasi biasanya akan tersedia di `http://localhost:[PORT_NUMBER]`. Periksa pesan di terminal Anda untuk melihat port yang tepat.*

---

### 🌐 Konfigurasi API (Penting!)

**Frontend proyek ini telah dikonfigurasi untuk terhubung langsung ke API yang sudah di-deploy.** Ini berarti Anda **tidak wajib** menjalankan *backend* Express secara lokal untuk fungsionalitas dasar aplikasi.

Jika ingin menjalankan backend express silahkan konfigurasi env

[Dokumentasi API Harumnesia di Postman](https://www.postman.com/spaceflight-meteorologist-64449996/workspace/harumnesia/collection/34557042-2c42f1e1-efb4-4c4e-a31a-b37fb9397aaf?action=share&creator=34557042)

---

## ✨ Terima Kasih

Terima kasih telah menjelajahi proyek Harumnesia! Jika Anda memiliki pertanyaan atau masukan, jangan ragu untuk membuka *issue* di repositori ini. 🙏
