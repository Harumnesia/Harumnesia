from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
import tensorflow as tf

app = Flask(__name__)

# Load assets
tfidf = pickle.load(open("tfidf_vectorizer.pkl", "rb"))
tfidf_tensor = tf.convert_to_tensor(np.load("tfidf_tensor.npy"))
df = pd.read_csv("parfum_metadata.csv")

def cosine_similarity_tf(a, b):
    a_norm = tf.nn.l2_normalize(a, axis=1)
    b_norm = tf.nn.l2_normalize(b, axis=1)
    return tf.matmul(a_norm, b_norm, transpose_b=True)

@app.route("/recommend", methods=["POST"])
def recommend():
    input_name = request.json["perfume"]
    idx = df[df["perfume"].str.lower() == input_name.lower()].index[0]
    sim_scores = cosine_similarity_tf(tfidf_tensor[idx:idx+1], tfidf_tensor).numpy().flatten()
    sim_scores[idx] = -1
    sorted_indices = np.argsort(sim_scores)[::-1]
    local_indices = [i for i in sorted_indices if df.loc[i, 'is_lokal']]
    result = df.iloc[local_indices[:5]][["perfume", "brand"]].to_dict(orient="records")
    return jsonify(result)
