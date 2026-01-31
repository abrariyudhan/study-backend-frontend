# Library Management System API Documentation

## Models :

_User_
```md
- email : string, required, unique, isEmail
- password : string, required
- fullName : string, required
- role : string, required, enum: ['admin', 'member'], default: 'member'
- phone : string
- address : text
```

_Book_
```md
- title : string, required
- author : string, required
- isbn : string, required, unique
- category : string, required
- stock : integer, required, default: 0
- description : text
- imageUrl : string
```

_Booking_
```md
- UserId : integer, required
- BookId : integer, required
- bookingDate : date, required
- returnDate : date
- status : string, required, enum: ['borrowed', 'returned'], default: 'borrowed'
```

## Relationship :

>### **One-to-Many**
Perhatikan relasi antara `User`, `Booking`, dan `Book` gunakan definisi relasi yang sesuai pada sequelize relation [doc](https://sequelize.org/master/manual/assocs.html).

- **User** has many **Bookings**
- **Booking** belongs to **User**
- **Book** has many **Bookings**
- **Booking** belongs to **Book**

## Endpoints :

List of available endpoints:

**Public endpoints:**
- `POST /auth/login`

**Authenticated endpoints:**
Routes below need authentication (Bearer token in Authorization header)

- `GET /books`
- `GET /books/:id`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`
- `GET /bookings`
- `POST /bookings`
- `PATCH /bookings/:id/return`

&nbsp;

## 1. POST /auth/login

Description: Login for admin user

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "email": "string",
  "fullName": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 2. GET /books

Description: Get all books

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0-7432-7356-5",
    "category": "Fiction",
    "stock": 5,
    "description": "A classic novel set in the Jazz Age",
    "imageUrl": "https://example.com/gatsby.jpg"
  },
  {
    "id": 2,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "isbn": "978-0-06-112008-4",
    "category": "Fiction",
    "stock": 3,
    "description": "A novel about racial injustice",
    "imageUrl": "https://example.com/mockingbird.jpg"
  }
]
```

&nbsp;

## 3. GET /books/:id

Description: Get book detail by id

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0-7432-7356-5",
  "category": "Fiction",
  "stock": 5,
  "description": "A classic novel set in the Jazz Age",
  "imageUrl": "https://example.com/gatsby.jpg"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## 4. POST /books

Description: Create new book (Admin only)

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:
```json
{
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0-452-28423-4",
  "category": "Fiction",
  "stock": 10,
  "description": "A dystopian social science fiction novel",
  "imageUrl": "https://example.com/1984.jpg"
}
```

_Response (201 - Created)_

```json
{
  "id": 3,
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0-452-28423-4",
  "category": "Fiction",
  "stock": 10,
  "description": "A dystopian social science fiction novel",
  "imageUrl": "https://example.com/1984.jpg"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "ISBN must be unique"
}
```

&nbsp;

## 5. PUT /books/:id

Description: Update book by id (Admin only)

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

- body:
```json
{
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0-452-28423-4",
  "category": "Fiction",
  "stock": 15,
  "description": "A dystopian social science fiction novel",
  "imageUrl": "https://example.com/1984.jpg"
}
```

_Response (200 - OK)_

```json
{
  "id": 3,
  "title": "1984",
  "author": "George Orwell",
  "isbn": "978-0-452-28423-4",
  "category": "Fiction",
  "stock": 15,
  "description": "A dystopian social science fiction novel",
  "imageUrl": "https://example.com/1984.jpg"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## 6. DELETE /books/:id

Description: Delete book by id (Admin only)

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "Book deleted successfully"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Book not found"
}
```

&nbsp;

## 7. GET /users

Description: Get all users (can filter by role)

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- query params (optional):
```
?role=member
```

_Response (200 - OK)_

```json
[
  {
    "id": 2,
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "member",
    "phone": "081234567890",
    "address": "123 Main St"
  },
  {
    "id": 3,
    "email": "jane@example.com",
    "fullName": "Jane Smith",
    "role": "member",
    "phone": "081234567891",
    "address": "456 Oak Ave"
  }
]
```

&nbsp;

## 8. GET /users/:id

Description: Get user detail by id with their bookings

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 2,
  "email": "john@example.com",
  "fullName": "John Doe",
  "role": "member",
  "phone": "081234567890",
  "address": "123 Main St",
  "Bookings": [
    {
      "id": 1,
      "bookingDate": "2024-01-15",
      "returnDate": null,
      "status": "borrowed",
      "Book": {
        "id": 1,
        "title": "The Great Gatsby"
      }
    }
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
```

&nbsp;

## 9. POST /users

Description: Create new user/member (Admin only)

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "fullName": "New User",
  "phone": "081234567892",
  "address": "789 Pine St",
  "role": "member"
}
```

_Response (201 - Created)_

```json
{
  "id": 4,
  "email": "newuser@example.com",
  "fullName": "New User",
  "role": "member",
  "phone": "081234567892",
  "address": "789 Pine St"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email must be unique"
}
```

&nbsp;

## 10. PUT /users/:id

Description: Update user by id (Admin only)

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

- body:
```json
{
  "fullName": "Updated Name",
  "phone": "081234567899",
  "address": "999 Updated St"
}
```

_Response (200 - OK)_

```json
{
  "id": 4,
  "email": "newuser@example.com",
  "fullName": "Updated Name",
  "role": "member",
  "phone": "081234567899",
  "address": "999 Updated St"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
```

&nbsp;

## 11. DELETE /users/:id

Description: Delete user by id (Admin only)

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "User deleted successfully"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
```

&nbsp;

## 12. GET /bookings

Description: Get all bookings with user and book details

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "UserId": 2,
    "BookId": 1,
    "bookingDate": "2024-01-15",
    "returnDate": null,
    "status": "borrowed",
    "User": {
      "id": 2,
      "fullName": "John Doe",
      "email": "john@example.com"
    },
    "Book": {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    }
  }
]
```

&nbsp;

## 13. POST /bookings

Description: Create new booking

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:
```json
{
  "UserId": 2,
  "BookId": 1
}
```

_Response (201 - Created)_

```json
{
  "id": 1,
  "UserId": 2,
  "BookId": 1,
  "bookingDate": "2024-01-15",
  "returnDate": null,
  "status": "borrowed"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Book out of stock"
}
OR
{
  "message": "User already has this book borrowed"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
OR
{
  "message": "Book not found"
}
```

&nbsp;

## 14. PATCH /bookings/:id/return

Description: Mark booking as returned

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "UserId": 2,
  "BookId": 1,
  "bookingDate": "2024-01-15",
  "returnDate": "2024-01-20",
  "status": "returned"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Booking not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
OR
{
  "message": "Authentication required"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Admin access only"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
