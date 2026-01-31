[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22088090&assignment_repo_type=AssignmentRepo)
# Holiday Challenge - Library Management System

## Ringkasan

Selamat datang di Long Holiday Challenge! Tantangan ini diberikan selama liburan akhir tahun agar kamu tetap bisa mengikuti pembelajaran setelah kamu kembali masuk ke kelas, dan kamu bisa lebih siap ketika mengikuti mengikuti pembelajaran selanjutnya!

Kalian akan membuat sebuah website aplikasi Full Stack Javascript client-server model (`NodeJS`, `ExpressJS`, `PostgreSQL`, `Sequelize`, `ReactJS`) untuk mengelola perpustakaan bernama `Library Management System`.

Feature-feature aplikasi ini adalah:

1. Admin dapat melakukan login
2. Admin dapat melihat list _Books_ dan _Users_
3. Admin dapat menambahkan, mengupdate, dan menghapus _Books_
4. Admin dapat menambahkan, mengupdate, dan menghapus _Users_
5. Admin dapat membuat _Booking_ untuk user
6. Admin dapat menandai booking sebagai _Returned_

Aplikasi ini akan dibuat dari _scratch_ atau dari awal oleh karena itu pastikan feature yang akan dibuat sesuai dengan yang diminta, kalian hanya diberikan `server/api_doc.md` sebagai panduan dalam membuat server dan client. Silahkan kalian buat feature by feature sesuai release yang disediakan `README.md` ini!

Semoga sukses!

## Aturan dan Kebijakan

- Deadline Pengerjaan: Minggu, 5 Januari 2026, Pukul 23.59
- Terdapat poin pada setiap release, jika release salah/error/gagal maka score dinyatakan 0 pada release tersebut
- Score Long Holiday Challenge ini akan digunakan untuk tambahan score **(TBA)**
- Student diharapkan menjunjung tinggi INTEGRITAS. Segala bentuk ketidakjujuran meliputi peniruan, plagiarisme, pemalsuan pengerjaan akan mendapatkan tindakan tegas dari akademik
- (-10) jika `node_modules` tidak di-_ignore_
- (-5) jika `package.json` tidak ada atau tidak di-_push_
- (-5) jika `.env` tidak di-_ignore_, bagi yang menggunakan dotenv
- (-5) jika tidak menyertakan example value `.env`, bagi yang menggunakan dotenv
- (-5) jika tidak menerapkan konsep SPA
- (-5) Error tidak ditampilkan pada client
- (-2) jika menggunakan `alert` bawaan browser (gunakan sweetalert atau sejenisnya)
- Data buku dan user diperbolehkan untuk dimasukkan _melalui_ seeding atau input manual pada database GUI (eg. pgadmin4 atau dbeaver)

## Release 0 - Setup Project

Lakukan setup project full stack dengan menginstall package yang sudah diajarkan sebelumnya. Adapun folder yang dibuat hanya ada `server` & `client`. Pada project ini terdapat:

1. `server/api_doc.md`: API Docs sebagai guideline pembuatan server
2. `server/books.json`: initial data books untuk aplikasi library management system
3. server: untuk pembuatan REST API
4. client: untuk pembuatan aplikasi React

> Hint (opsional): Untuk mengisi data awal tabel `Books`, kamu bisa membuat seeder Sequelize yang membaca file `server/books.json` dan melakukan `bulkInsert` ke tabel `Books`.

### 0.1 Setup: Server

Aplikasi ini memiliki 3 entitas atau table. Buatlah Model sesuai `server/api_doc.md` pada folder server dan buatlah relasi yang sesuai antara User, Book, dan Booking. Jangan lupa implementasi _error handling_ untuk error yang ada pada server.

**Admin Credentials**
Siapkan 1 akun admin dengan data berikut:
```js
{ 
  email: 'admin@library.com',
  password: 'admin123',
  fullName: 'Library Admin',
  role: 'admin' 
}
```

### 0.2 Setup: Client

Aplikasi ini menggunakan `ReactJS`. Buatlah folder `client` dengan menggunakan `vite` dan `react-router` pada client side

## Release 1 - Authentication: Login

### 1.1 Server Side - Login

- Buatlah sebuah endpoint **`POST /auth/login`** dengan request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 1
- Implementasikan proses untuk _compare_ password yang di-input dengan password yang ter-hash di database menggunakan `bcrypt`
- Buatlah proses untuk _generate_ **access token** menggunakan `jsonwebtoken`, pastikan kalian hanya menyimpan data rahasia pada env
- Response harus include: access_token, email, dan fullName

### 1.2 Client Side - Login

- Buatlah halaman `/login` untuk menampilkan form login admin
- Jika proses login berhasil maka akan menuju halaman `/dashboard` dan menampilkan dashboard dengan statistics
- Pastikan ketika admin sudah berhasil login, ketika direfresh maka admin tidak harus login lagi

### 1.3 Client Side: Logout

- Buatlah tombol logout dan ketika proses logout berhasil maka akan kembali ke tampilan login
- Pastikan ketika admin sudah berhasil logout, ketika direfresh maka admin akan ke tampilan login

## Release 2 - Books Management

Feature ini bertujuan untuk memberikan kepada admin kemampuan mengelola buku.

### 2.1 Server Side: GET Books

- Buatlah sebuah endpoint **`GET /books`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 2
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint
- Buatlah initial data books sesuai kebutuhan, boleh menggunakan seeding atau input manual pada database GUI

### 2.2 Server Side: GET Book Detail

- Buatlah sebuah endpoint **`GET /books/:id`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 3
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint

### 2.3 Server Side: POST Book

- Buatlah sebuah endpoint **`POST /books`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 4

### 2.4 Server Side: PUT Book

- Buatlah sebuah endpoint **`PUT /books/:id`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 5
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint

### 2.5 Server Side: DELETE Book

- Buatlah sebuah endpoint **`DELETE /books/:id`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 6
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint

### 2.6 Client Side: Books List Page

- Buatlah halaman `/books` untuk menampilkan list books di client dari server yang sudah dibuat sesuai `server/api_doc.md`
- Integrasikan dengan endpoint **`GET /books`**
- Terapkan konsep _component_ untuk setiap bagian yang bersifat `reuseable`
- Tampilkan list books dalam bentuk table atau card dengan informasi: title, author, category, stock, dan action buttons
- **TAMBAHAN**: Pastikan hanya Admin yang sudah login yang bisa melihat halaman Books Management

### 2.7 Client Side: Add Book

- Buatlah form untuk menambahkan book baru (bisa berupa modal atau halaman terpisah)
- Form harus memiliki input: title, author, isbn, category, stock, description, imageUrl
- Integrasikan dengan endpoint **`POST /books`**
- Jika berhasil menambahkan Book maka list Books akan bertambah otomatis di client (Pastikan website kalian reaktif)
- Tampilkan notifikasi success/error menggunakan sweetalert atau library sejenis

### 2.8 Client Side: Edit Book

- Integrasikan tombol `Edit` pada setiap book di halaman list
- Gunakan endpoint **`GET /books/:id`** untuk fetch data book yang akan di-edit
- Tampilkan form edit dengan data book yang sudah terisi (pre-filled)
- Form edit memiliki input yang sama seperti form add
- Integrasikan dengan endpoint **`PUT /books/:id`** untuk menyimpan perubahan
- Jika berhasil book yang telah di update akan berubah tanpa harus di refresh (Pastikan website kalian reaktif)
- Tampilkan notifikasi success/error

### 2.9 Client Side: Delete Book

- Integrasikan tombol `Delete` pada setiap book di halaman list
- Tampilkan konfirmasi sebelum menghapus (menggunakan sweetalert atau sejenis)
- Integrasikan dengan endpoint **`DELETE /books/:id`**
- Jika berhasil book yang telah di delete akan hilang tanpa harus di refresh (Pastikan website kalian reaktif)
- Tampilkan notifikasi success/error

## Release 3 - Users Management

Feature ini bertujuan untuk memberikan kepada admin kemampuan mengelola user/member.

### 3.1 Server Side: GET Users

- Buatlah sebuah endpoint **`GET /users`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 7
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint
- Buatlah initial data users (members) sesuai kebutuhan, boleh menggunakan seeding atau input manual pada database GUI

### 3.2 Server Side: GET User Detail

- Buatlah sebuah endpoint **`GET /users/:id`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 8
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint
- Response harus include relasi dengan Bookings yang dimiliki user tersebut

### 3.3 Server Side: POST User

- Buatlah sebuah endpoint **`POST /users`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 9
- Pastikan password di-hash menggunakan `bcrypt` sebelum disimpan ke database

### 3.4 Server Side: PUT User

- Buatlah sebuah endpoint **`PUT /users/:id`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 10
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint
- **Note**: Update endpoint tidak mengubah password dan email

### 3.5 Server Side: DELETE User

- Buatlah sebuah endpoint **`DELETE /users/:id`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 11
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint

### 3.6 Client Side: Users List Page

- Buatlah halaman `/users` untuk menampilkan list users di client dari server yang sudah dibuat sesuai `server/api_doc.md`
- Integrasikan dengan endpoint **`GET /users`**
- Terapkan konsep _component_ untuk setiap bagian yang bersifat `reuseable`
- Tampilkan list users dalam bentuk table dengan informasi: email, fullName, role, phone, address, dan action buttons

### 3.7 Client Side: Add User

- Buatlah form untuk menambahkan user/member baru (bisa berupa modal atau halaman terpisah)
- Form harus memiliki input: email, password, fullName, role (default: member), phone, address
- Integrasikan dengan endpoint **`POST /users`**
- Jika berhasil menambahkan User maka list Users akan bertambah otomatis di client (Pastikan website kalian reaktif)
- Tampilkan notifikasi success/error menggunakan sweetalert atau library sejenis

### 3.8 Client Side: Edit User

- Integrasikan tombol `Edit` pada setiap user di halaman list
- Gunakan endpoint **`GET /users/:id`** untuk fetch data user yang akan di-edit
- Tampilkan form edit dengan data user yang sudah terisi (pre-filled)
- Form edit hanya untuk: fullName, phone, address (email dan password tidak bisa diubah)
- Integrasikan dengan endpoint **`PUT /users/:id`** untuk menyimpan perubahan
- Jika berhasil user yang telah di update akan berubah tanpa harus di refresh (Pastikan website kalian reaktif)
- Tampilkan notifikasi success/error

### 3.9 Client Side: Delete User

- Integrasikan tombol `Delete` pada setiap user di halaman list
- Tampilkan konfirmasi sebelum menghapus (menggunakan sweetalert atau sejenis)
- Integrasikan dengan endpoint **`DELETE /users/:id`**
- Jika berhasil user yang telah di delete akan hilang tanpa harus di refresh (Pastikan website kalian reaktif)
- Tampilkan notifikasi success/error

## Release 4 - Bookings Management

Feature ini bertujuan agar admin dapat mengelola peminjaman buku.

### 4.1 Server Side: GET Bookings

- Buatlah sebuah endpoint **`GET /bookings`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 12
- **Authentication Check**: melakukan pengecekan apakah User tersebut valid sebelum request endpoint

### 4.2 Server Side: POST Booking

- Buatlah sebuah endpoint **`POST /bookings`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 13
- Request body: { UserId, BookId }
- **Business Logic**: Check if book stock > 0, decrease stock by 1, create booking with status 'borrowed', set bookingDate to current date
- **Validation**: Check if user already has this book borrowed (prevent duplicate active borrowing)

### 4.3 Server Side: PATCH Booking Return

- Buatlah sebuah endpoint **`PATCH /bookings/:id/return`** dengan headers, request, status code, response success, response error (+global error) sesuai `server/api_doc.md` no 14
- **Business Logic**: Update booking status to 'returned', set returnDate, increase book stock by 1

### 4.4 Client Side: Bookings List Page

- Buatlah halaman `/bookings` untuk menampilkan list bookings di client dari server yang sudah dibuat sesuai `server/api_doc.md`
- Integrasikan dengan endpoint **`GET /bookings`**
- Terapkan konsep _component_ untuk setiap bagian yang bersifat `reuseable`
- Tampilkan list bookings dalam bentuk table dengan informasi: User name, Book title, bookingDate, returnDate, status, dan action buttons
- Tampilkan relasi User (fullName, email) dan Book (title, author) pada setiap booking
- Berikan visual indicator yang jelas untuk membedakan status 'borrowed' dan 'returned' (misalnya: warna badge, icon)

### 4.5 Client Side: Create Booking

- Buatlah form untuk membuat booking baru (bisa berupa modal atau halaman terpisah)
- Form harus memiliki dropdown untuk memilih User (filter: hanya members, bukan admin)
- Form harus memiliki dropdown untuk memilih Book (filter: hanya buku dengan stock > 0)
- Integrasikan dengan endpoint **`POST /bookings`**
- Jika berhasil menambahkan Booking maka list Bookings akan bertambah otomatis di client (Pastikan website kalian reaktif)
- Tampilkan notifikasi success/error menggunakan sweetalert atau library sejenis

### 4.6 Client Side: Return Booking

- Integrasikan tombol `Mark as Returned` hanya untuk bookings dengan status 'borrowed' di halaman list
- Tombol tidak muncul untuk bookings dengan status 'returned'
- Tampilkan konfirmasi sebelum marking as returned
- Integrasikan dengan endpoint **`PATCH /bookings/:id/return`**
- Jika berhasil menandai sebagai returned, status dan returnDate akan berubah tanpa harus di refresh (Pastikan website kalian reaktif)
- Tampilkan notifikasi success/error

## Github Workflow

Dalam pengerjaan holiday challenge, kalian diminta untuk melakukan `commit` sebagai check point pengerjaan. Jika pengerjaan release sudah selesai, segera lakukan `add commit push` dengan message release yang jelas.

- Contoh 1: `git commit -m "Release 0.1 Setup: Server, Done"`
- Contoh 2: `git commit -m "Release 2.1 Server: GET Books, Done"`
- Contoh 3: `git commit -m "Release 4.4 Client: Bookings Management Page, Done"`
