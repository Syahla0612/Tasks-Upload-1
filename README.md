# Portofolio Tugas Kuliah — Syahla Tsaqifa

Next.js (App Router) + Tailwind CSS v4 + Neon Postgres + Vercel Blob, di-hosting di Vercel.

## Langka deploy dari nol

1. **Buat repo GitHub**: github.com → tombol "+" → New repository → beri nama (mis. `portofolio-tugas`) → Create.
2. **Unggah file**: ekstrak zip, di repo klik "uploading an existing file", lalu seret SEMUA isi folder (bukan folder induknya) → Commit changes. Pastikan `.gitignore` dan `.env.example` ikut terunggah dan folder `src` tetap utuh.
3. **Import ke Vercel**: vercel.com → Add New → Project → pilih repo → Deploy. (Deploy pertama boleh tampil galat database, itu normal.)
4. **Tambah Neon**: proyek Vercel → tab Storage → Create Database → Neon (Marketplace) → hubungkan ke proyek. `DATABASE_URL` terisi otomatis.
5. **Tambah Blob**: tab Storage → Create → Blob → pilih akses **Public** → hubungkan. `BLOB_READ_WRITE_TOKEN` terisi otomatis.
6. **Password admin**: Settings → Environment Variables → tambah `ADMIN_PASSWORD` (isi sendiri, panjang dan sulit ditebak).
7. **Buat tabel**: buka Neon dari Storage → SQL Editor → tempel isi `schema.sql` → Run.
8. **Redeploy**: tab Deployments → titik tiga pada deploy terbaru → Redeploy.
9. Buka `/admin`, login (username bebas, password = `ADMIN_PASSWORD`), lalu tambah tugas.

## Mengatasi galat umum

- **"Application error: a server-side exception has occurred"**: hampir selalu karena `DATABASE_URL` belum ada atau tabel belum dibuat. Cek langkah 4 dan 7, lalu redeploy. Detail galat ada di Vercel → Logs.
- **"Tabel 'tugas' belum dibuat"**: jalankan `schema.sql` (langkah 7).
- **"No blob credentials found" / "BLOB_READ_WRITE_TOKEN"**: Blob belum dihubungkan ke proyek (langkah 5). Setelah dihubungkan, wajib Redeploy.
- **Halaman /admin menampilkan "ADMIN_PASSWORD belum diatur"**: tambahkan variabel di langkah 6, lalu Redeploy.
- **Login admin terus gagal**: password salah atau variabel diubah tanpa Redeploy.
- **Upload gagal**: ukuran file harus ≤ 4 MB dan jenisnya PDF, Word, PowerPoint, Excel, atau gambar.
- **PDF tidak tampil**: halaman otomatis memakai tampilan cadangan; tombol "Buka di tab baru" dan "Unduh" tetap bisa dipakai.
- **Build gagal di Vercel**: buka log build; biasanya ada file yang tidak ikut terunggah (cek folder `src`).

## Mengubah isi Beranda

Edit `src/data/profil.js` (nama, perkenalan, tentang saya, kontak).

## Catatan

- Kolom `deadline` ada di tabel sesuai rancangan tetapi tidak dipakai; situs hanya menampilkan tanggal unggah (WIB).
- Pengembangan lokal (opsional): salin `.env.example` ke `.env.local`, isi, lalu `npm install` dan `npm run dev`.
