# Harumnesia - Parfum Store

Harumnesia adalah aplikasi toko parfum online yang menampilkan berbagai jenis parfum dengan informasi detail tentang aroma, brand, dan karakteristiknya.

## Teknologi yang Digunakan

- **Frontend**: React, React Router, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Fitur Aplikasi

- Melihat katalog parfum
- Detail parfum termasuk top notes, middle notes, dan base notes
- Informasi brand
- Filter berdasarkan gender dan waktu penggunaan

## Setup Pengembangan

### Prasyarat

- Node.js dan npm
- MongoDB

### Langkah Instalasi

1. Clone repositori ini

```bash
git clone <repository-url>
cd Harumnesia
```

2. Install dependensi

```bash
npm install
```

3. Konfigurasi Database

   - Pastikan MongoDB berjalan di sistem Anda
   - Database akan otomatis dibuat dengan nama "parfumdb"

4. Setup Data Awal

```bash
npm run data:import
```

5. Jalankan Aplikasi

```bash
# Menjalankan server backend saja
npm run server

# Menjalankan client frontend saja
npm run dev

# Menjalankan keduanya secara bersamaan
npm run dev:full
```

6. Akses aplikasi
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001/api/perfumes

## Struktur API

- `GET /api/perfumes`: Mendapatkan semua parfum
- `GET /api/perfumes/:id`: Mendapatkan detail parfum berdasarkan ID
- `POST /api/perfumes`: Menambahkan parfum baru (admin)
- `PUT /api/perfumes/:id`: Mengupdate parfum (admin)
- `DELETE /api/perfumes/:id`: Menghapus parfum (admin)

## Struktur Model Data

```javascript
{
  brand: String,
  name: String,
  price: Number,
  formattedPrice: String,
  volume: String,
  concentration: String,
  image: String,
  gender: [String],
  topNotes: [String],
  middleNotes: [String],
  baseNotes: [String],
  description: String
}
```

## License

[MIT](LICENSE)
