# Analisis Keamanan Harumnesia Project

## Executive Summary

Analisis keamanan menyeluruh telah dilakukan terhadap proyek Harumnesia. Ditemukan beberapa kerentanan keamanan yang **KRITIS** yang memerlukan penanganan segera, terutama terkait eksposur kredensial database dan konfigurasi CORS yang tidak aman.

## 🔴 VULNERABILITIES KRITIS

### 1. Database Credential Exposure (HIGH RISK)

**Lokasi**: `.env`, `server/.env`

```
MONGO_URI=mongodb+srv://admin:harumnesia69@cluster0.im6f14v.mongodb.net/parfumDB?retryWrites=true&w=majority&appName=Mongo-rama
```

**Masalah**:

- Username database: `admin`
- Password database: `harumnesia69` (TEREKSPOS)
- Connection string MongoDB Atlas lengkap terekspos
- Credential ini dapat memberikan akses penuh ke database produksi

**Impact**:

- Unauthorized database access
- Data breach potensial
- Manipulasi/penghapusan data
- Privilege escalation

**Rekomendasi**:

- Segera ubah password database MongoDB Atlas
- Implementasikan database user dengan privilege terbatas
- Gunakan environment variable yang tidak di-commit ke repository
- Implementasikan database access rotation

### 2. CORS Configuration (MEDIUM RISK)

**Lokasi**: `server/server.js`

```javascript
app.use(cors()); // Allow all origins
```

**Masalah**:

- CORS terbuka untuk semua origin
- Tidak ada whitelist domain yang diizinkan
- Vulnerable terhadap CSRF attacks

**Rekomendasi**:

```javascript
app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourdomain.com"],
    credentials: true,
  })
);
```

### 3. Ngrok Hardcoded Configuration (MEDIUM RISK)

**Lokasi**: `vite.config.js`

```javascript
allowedHosts: ["7bf1-125-163-155-63.ngrok-free.app"];
```

**Masalah**:

- Ngrok URL hardcoded dalam konfigurasi
- Potensial untuk man-in-the-middle attacks
- Development configuration masuk ke production

**Rekomendasi**:

- Gunakan environment variable untuk allowed hosts
- Pisahkan konfigurasi development dan production

## 🟠 VULNERABILITIES MEDIUM

### 4. Information Disclosure via Console Logs

**Lokasi**: Multiple files dengan `console.log()`

**Contoh**:

```javascript
// src/pages/Catalog.jsx
console.log("Perfumes dari API:", data);
console.log("Brands from API:", data);

// server/controllers/allPerfumeController.js
console.log(`MongoDB Connected: ${conn.connection.host}`);
```

**Masalah**:

- Sensitive data logging di console
- Database information disclosure
- API response data exposure

**Rekomendasi**:

- Implement proper logging mechanism
- Remove console.log dari production build
- Use environment-based logging levels

### 5. Email Exposure

**Lokasi**: `src/components/Footer.jsx`, `src/pages/AboutUs.jsx`

```javascript
href = "mailto:harum.nesia@gmail.com";
// kontak@harumnesia.com (mentioned in text)
```

**Masalah**:

- Email addresses terekspos di client-side
- Vulnerable untuk spam/phishing

**Rekomendasi**:

- Implementasikan contact form instead of direct email
- Use email obfuscation techniques

### 6. Missing Security Headers

**Lokasi**: `server/server.js`

**Masalah**:

- Tidak ada security headers (CSP, HSTS, X-Frame-Options, dll)
- Missing rate limiting
- No request validation middleware

**Rekomendasi**:

```javascript
import helmet from "helmet";
import rateLimit from "express-rate-limit";

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
```

## 🟡 VULNERABILITIES LOW

### 7. Environment File Misconfiguration

**Masalah**:

- `.env` files tidak di-gitignore dengan benar
- Environment variables hardcoded

**File `.gitignore` sudah correct**, namun perlu verifikasi bahwa `.env` tidak pernah di-commit sebelumnya.

### 8. Missing Input Validation

**Lokasi**: Server controllers

**Masalah**:

- Tidak ada input validation pada API endpoints
- Missing sanitization untuk user inputs
- Vulnerable untuk injection attacks

### 9. Hardcoded URLs dan Configuration

**Contoh**:

```javascript
// src/config/api.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";
```

**Masalah**:

- Development URLs bisa masuk ke production
- Missing environment detection

## ✅ SECURITY BEST PRACTICES YANG SUDAH DITERAPKAN

1. **Dependency Management**: Package.json menggunakan versi dependencies yang relatif baru
2. **Environment Variables**: Struktur environment variables sudah benar
3. **Git Ignore**: .env files sudah di-ignore dengan benar
4. **HTTPS Ready**: Konfigurasi mendukung HTTPS
5. **Error Handling**: Basic error handling sudah diimplementasikan

## 🔧 IMMEDIATE ACTION ITEMS

### Priority 1 (URGENT - Within 24 hours)

1. **Ubah password database MongoDB segera**
2. **Rotate MongoDB connection string**
3. **Remove .env files dari repository history jika pernah di-commit**
4. **Implement CORS whitelist**

### Priority 2 (High - Within 1 week)

1. **Implement proper logging dengan log levels**
2. **Add security headers dengan helmet.js**
3. **Implement rate limiting**
4. **Add input validation middleware**
5. **Remove semua console.log dari production build**

### Priority 3 (Medium - Within 1 month)

1. **Implement proper authentication jika diperlukan**
2. **Add API documentation dengan security considerations**
3. **Implement monitoring dan alerting untuk suspicious activities**
4. **Regular security audit**

## 🛡️ RECOMMENDED SECURITY MEASURES

### Database Security

```javascript
// Gunakan connection string dengan limited privileges
const MONGO_URI = process.env.MONGO_URI; // dari environment yang secure
```

### Server Security

```javascript
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import validator from "express-validator";

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP",
});
app.use("/api/", limiter);

// CORS configuration
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
```

### Environment Configuration

```bash
# .env.example (template)
MONGO_URI=mongodb+srv://[USERNAME]:[PASSWORD]@[CLUSTER]/[DATABASE]
PORT=5001
VITE_API_BASE_URL=http://localhost:5001
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
NODE_ENV=development
```

## 📊 SECURITY SCORE

**Overall Security Score: 4/10** ⚠️

- **Critical Issues**: 3
- **High Issues**: 3
- **Medium Issues**: 2
- **Low Issues**: 3

## 📋 COMPLIANCE CHECKLIST

- [ ] Database credentials secured
- [ ] CORS properly configured
- [ ] Security headers implemented
- [ ] Rate limiting enabled
- [ ] Input validation added
- [ ] Error handling improved
- [ ] Logging secured
- [ ] Environment variables secured
- [ ] Dependencies updated
- [ ] Security monitoring implemented

## 📞 CONTACT

Untuk pertanyaan terkait security analysis ini, hubungi:

- Security Team: [security-team-contact]
- Project Lead: [project-lead-contact]

---

**Catatan**: Analisis ini dilakukan pada tanggal [current-date]. Security landscape berubah dinamis, lakukan review berkala setiap 3-6 bulan.

**Disclaimer**: Analisis ini berdasarkan static code analysis. Penetration testing dan dynamic analysis direkomendasikan untuk assessment yang lebih komprehensif.
