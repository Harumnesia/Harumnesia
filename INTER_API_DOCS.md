# International Perfume API Documentation

API untuk mengakses data parfum internasional dari koleksi `interdb` di database `parfumDB`.

## Base URL

```
http://localhost:5001/api/inter
```

## Endpoints

### 1. Get All International Perfumes

**GET** `/perfumes`

Mengambil semua data parfum internasional (hanya nama parfum dan brand).

**Response:**

```json
{
  "success": true,
  "count": 150,
  "data": [
    {
      "_id": "682e9aa5907a7eb734a80d91",
      "Perfume": "cherry-lady",
      "Brand": "brocard"
    }
  ]
}
```

### 2. Get All International Brands

**GET** `/brands`

Mengambil daftar semua brand parfum internasional yang unik.

**Response:**

```json
{
  "success": true,
  "count": 50,
  "data": ["brocard", "chanel", "dior", "versace"]
}
```

### 3. Get Perfumes by Brand

**GET** `/brands/:brand/perfumes`

Mengambil semua parfum dari brand tertentu.

**Parameters:**

- `brand` (string): Nama brand (case-insensitive)

**Example:** `/brands/brocard/perfumes`

**Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "682e9aa5907a7eb734a80d91",
      "Perfume": "cherry-lady",
      "Brand": "brocard"
    }
  ]
}
```

### 4. Search Perfumes

**GET** `/search?q={query}`

Mencari parfum berdasarkan nama parfum atau brand.

**Query Parameters:**

- `q` (string, required): Kata kunci pencarian

**Example:** `/search?q=cherry`

**Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "682e9aa5907a7eb734a80d91",
      "Perfume": "cherry-lady",
      "Brand": "brocard"
    }
  ]
}
```

### 5. Get Dropdown Data

**GET** `/dropdown`

Mengambil data yang sudah diformat untuk komponen dropdown UI.

**Response:**

```json
{
  "success": true,
  "data": {
    "grouped": {
      "brocard": [
        {
          "id": "682e9aa5907a7eb734a80d91",
          "name": "cherry-lady",
          "brand": "brocard"
        }
      ]
    },
    "flat": [
      {
        "id": "682e9aa5907a7eb734a80d91",
        "name": "cherry-lady",
        "brand": "brocard",
        "label": "brocard - cherry-lady"
      }
    ]
  }
}
```

## Penggunaan untuk Dropdown

### Untuk React Component

```javascript
// Mengambil data dropdown
const fetchDropdownData = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/inter/dropdown");
    const result = await response.json();

    if (result.success) {
      // Menggunakan data flat untuk dropdown sederhana
      const options = result.data.flat;

      // Atau menggunakan data grouped untuk dropdown bertingkat
      const groupedOptions = result.data.grouped;

      return { options, groupedOptions };
    }
  } catch (error) {
    console.error("Error fetching dropdown data:", error);
  }
};

// Contoh penggunaan dalam komponen
const PerfumeDropdown = () => {
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    fetchDropdownData().then((data) => {
      if (data) {
        setPerfumes(data.options); // atau data.groupedOptions
      }
    });
  }, []);

  return (
    <select>
      {perfumes.map((perfume) => (
        <option key={perfume.id} value={perfume.id}>
          {perfume.label}
        </option>
      ))}
    </select>
  );
};
```

## Error Handling

Semua endpoint mengembalikan format error yang konsisten:

```json
{
  "success": false,
  "message": "Error message description",
  "error": "Detailed error information"
}
```

## Testing

Untuk menguji API, jalankan:

```bash
node test-inter-api.js
```

Atau gunakan tools seperti Postman/Insomnia untuk menguji endpoints secara manual.
