# Dicoding Chellange - Katalog Restoran ( Submission 2 )

## 📝 Kriteria

### Halaman Utama (Daftar Restoran)
- [x] Menampilkan daftar restoran yang datanya bersumber dari API https://restaurant-api.dicoding.dev/. Silakan lihat dokumentasinya pada halaman tersebut.
- [x] Wajib menampilkan nama, gambar dan minimal salah satu diantara kota, rating, dan atau deskripsi pada restoran.
- [x] Terdapat tautan/CTA yang mengarah ke detail restoran pada tiap itemnya.
- [x] Hero elemen tetap dipertahankan.

### Halaman Detail Restoran
- [x] Menampilkan detail dari restoran yang dipilih dari halaman utama (daftar restoran) atau halaman favorit restoran.
- [x] Pada halaman detail restoran harus terdapat:
   - [x] Nama restoran
   - [x] Gambar
   - [x] Alamat
   - [x] Kota
   - [x] Deskripsi
   - [x] Menu Makanan
   - [x] Menu Minuman
   - [x] Customer Reviews
- [x] Terdapat tombol favorite untuk memasukkan atau menghapus restoran favorit dari database (gunakan IndexedDB).

### Halaman Daftar Restoran Favorit
- [x] Halaman Daftar Restoran dapat diakses melalui menu navigasi favorit.
- [x] Menampilkan restoran yang difavoritkan oleh pengguna (data diambil dari indexedDB).
- [x] Wajib menampilkan nama, gambar dan minimal salah satu diantara kota, rating, dan atau deskripsi pada restoran.
- [x] Terdapat tautan/CTA yang mengarah ke detail restoran pada tiap itemnya.

### Native Capability
- [x] Aplikasi dapat diakses dalam keadaan offline tanpa ada aset yang gagal dimuat, termasuk data yang didapatkan dari API. Anda bebas menggunakan strategi caching apapun, bahkan menggunakan workbox.
- [x] Aplikasi harus menampilkan icon Add to Home Screen.
- [x] Aplikasi memiliki custom icon yang ditampilkan pada home screen dan splash screen.

### Code Quality
- [x] Menggunakan ESLint sebagai linter ketika menuliskan kode JavaScript. Harap lampirkan berkas konfigurasi ESLint ya.
- [ ] Menerapkan salah satu style guide baik itu Google JavaScript Code Style, AirBnB JavaScript Code Style, atau StandardJS Code Style.
- [ ] Periksa kembali sebelum mengirimkan submission, apakah project yang Anda kirimkan sesuai dengan kriteria yang ditetapkan atau tidak, ditandai dengan tidak adanya satupun error ketika menjalankan eslint.

### Pertahankan syarat submission sebelum nya
 Seperti responsibilitas tampilan, aksesibilitas pada website, appbar, footer dan sebagainya.

# Dicoding Chellange - Katalog Restoran ( Submission 1 )

LIVE : https://dicoding-resturant-catalog.vercel.app/

## 🔍 Detail

1. Penempatan rating
   Penempatan rating ditaruh dikanan atas supaya pengguna lebih nyaman dengan melihat kesulurahngambar secara tidak langsung.
2. Aksesibilitas menu saat navbar tertutup
   ketika menggunakan tab dalam keadaan navigasi tertutup, maka akan muncul menu yang bisa diakses dengan menggunakan tab.
3. Smooth Transition
4. Grid Card
   Posisi height yang dinamis, sehingga ketika ukuran layar berubah, maka posisi elemen akan berubah sesuai dengan ukuran layar.

## 📝 Kriteria

### App Bar (Navigation Bar)

Syarat:

- [x] Menampilkan nama aplikasi atau brand logo dari aplikasi katalog restoran (tentukan sendiri nama aplikasi atau brand logonya).
- [x] Terdapat navigation menu:
  - [x] Home → mengarah ke root domain.
  - [x] Favorite → target URL cukup bernilai “#” (Sebagai placeholder untuk digunakan pada submission selanjutnya).
  - [x] About Us → arahkan ke profil LinkedIn/Github/Social Media Anda, atau boleh juga ke personal web/blog.
  - [x] Terdapat fitur navigation drawer yang berfungsi dengan baik bila diakses pada layar seluler.

### Hero Element (Jumbotron Element)

Syarat:

- [x] Menampilkan hero element dengan gambar yang sudah ditentukan, silakan pilih salah satu aset yang disediakan di dalam starter proyek, src → public → images → hero. Gambar yang tidak digunakan, bisa Anda hapus.
- [x] Gambar hero element yang ditampilkan haruslah full-width atau memenuhi persyaratan sebagai berikut:
  - [x] Tampilkanlah minimal width 1000px pada viewport width >= 1200px.
  - [x] Jika ukuran viewport width < 1200px, maka hero element ditampilkan full-width.

### Daftar Restoran

Syarat:

- [x] Menampilkan daftar restoran berdasarkan data yang sudah disediakan di dalam project starter (src → DATA.json), untuk menampilkannya boleh melalui cara hardcoded di berkas HTML, atau menggunakan DOM manipulation menggunakan JavaScript.
- [x] Wajib menampilkan nama, gambar dan minimal salah satu diantara kota, rating, dan atau deskripsi pada restoran.

### Footer

Syarat:

- [x] Terdapat footer yang ditampilkan di bawah halaman.
- [x] Terdapat konten teks bebas sesuai dengan kreatifitas Anda. Misalnya, konten copyright yang mencangkup tahun dan nama aplikasi. Contoh: “Copyright © 2020 - Hunger Apps”.

Responsibilitas Tampilan
Syarat:

- [x] Tampilan web app harus responsif pada seluruh ukuran layar (mobile - tablet - desktop). Utamakan tampilan mobile terlebih dahulu.
- [x] Gunakan teknik Grid CSS atau Flexbox dalam menyusun layout. Bila terdapat float, submission akan ditolak.
- [x] Menetapkan ukuran viewport secara dinamis berdasarkan layar device yang digunakan.

Aksesibilitas Website
Syarat:

- [x] Seluruh fungsionalitas website dapat dilakukan dengan menggunakan keyboard. Contohnya mengakses tombol hamburger button, mengakses tautan yang ada.
- [x] Menerapkan teknik skip to content untuk melewati focus pada menu navigasi.
- [x] Terdapat alternative teks pada seluruh gambar yang ditampilkan. Bila hanya gambar tidak memiliki arti apapun, cukup berikan atribut alt dengan nilai kosong.
- [x] Dimensi touch target pada elemen yang diinteraksikan dengan touch harus memilliki ukuran minimal 44x44px. Adapun beberapa contoh elemen tersebut ialah button, anchor, input text, dan textarea.
      Pastikan juga terdapat jarak antar elemen tersebut supaya dimensi touch target tidak menumpuk.
- [x] Menggunakan semantic element dalam menyusun struktur dan landmarking HTML.
