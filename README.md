# 🛒 ShopNow Backend

The backend server for the ShopNow e-commerce app, built with **Node.js**, **Express**, and **MongoDB**. It manages admin and user authentication, product listings, wishlist, cart, and orders — all using secure APIs.

---

## 📦 Tech Stack

**Backend:** Node.js, Express  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT  
**File Uploads:** Multer, Cloudinary  
**Other:** dotenv, morgan, cookie-parser, cors

---

## 📁 Folder Structure
```txt
ShopNowBackend/
├── Config/                  # DB config
├── Controllers/             # Business logic
│   ├── ShopNowAdmin.controllers.js
│   ├── ProductController/
│   └── UserController/
├── Middleware/              # Auth & upload middleware
│   ├── LoggedIn.js
│   └── multer.middleware.js
├── Models/                  # Mongoose schemas
├── Routers/                 # API routes
│   ├── ShopNowAdmin.js
│   ├── ShopNowProducts.js
│   └── ShopNowUser.js
├── app.js                   # Express app config
├── index.js                 # Server entry point
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
```

## 🚀 Features
```txt
👨‍💼 Admin

Register, Login, Logout
Add products with images
Protected dashboard view

👤 User

Register, Login, Logout
Edit profile
Manage Wishlist & Cart
Address book
Place and View Orders

🛍️ Products

View all products
View individual product details
Search products by name

```

## 🔧 Setup Instructions
```txt
1. Clone and Install

git clone https://github.com/yourusername/shopnowbackend.git
cd shopnowbackend
npm install

2. Configure Environment

Create a .env file in the root with the following:
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

3. Run the Server

nodemon index.js


The backend server runs at: http://localhost:5000

```
## 📬 API Endpoints
```txt
🔐 Admin /auth

| Method | Route         | Description                  |
| ------ | ------------- | ---------------------------- |
| POST   | /registration | Admin registration           |
| POST   | /login        | Admin login                  |
| POST   | /logout       | Admin logout (auth required) |
| GET    | /             | Admin dashboard (auth)       |
| POST   | /             | Add product with image       |

👤 User /user

| Method | Route                    | Description          |
| ------ | ------------------------ | -------------------- |
| POST   | /registration            | User registration    |
| POST   | /login                   | User login           |
| POST   | /logout                  | User logout          |
| POST   | /editprofile             | Edit user profile    |
| GET    | /                        | Get user profile     |
| POST   | /wishlist                | Add to wishlist      |
| GET    | /wishlist                | View wishlist        |
| POST   | /removeitemfromwishlist  | Remove from wishlist |
| POST   | /addtocart               | Add to cart          |
| GET    | /addtocart               | View cart            |
| POST   | /removeitemfromaddtocart | Remove from cart     |
| POST   | /updateitemfromaddtocart | Update cart item     |
| POST   | /deleteaddtocart         | Delete cart          |
| POST   | /addaddress              | Add address          |
| GET    | /addaddress              | View addresses       |
| POST   | /deleteaddress           | Delete address       |
| POST   | /placeorder              | Place an order       |
| GET    | /vieworder               | View all orders      |

🛍️ Product /products

| Method | Route          | Description            |
| ------ | -------------- | ---------------------- |
| GET    | /              | Get all products       |
| GET    | /eachitem/\:id | Get single product     |
| GET    | /search        | Search product by name |

```

## ✅ Tech Stack
``` txt 
Node.js
Express
MongoDB + Mongoose
Cloudinary (image storage)
JWT (authentication)
Multer (file upload)
dotenv, morgan, cookie-parser, cors
```

## 📣 Contribution

Feel free to fork this repository and contribute by submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.

## 🧾 Note
This backend is developed for learning and demo purposes. Add proper validation, error handling, and production configurations before deploying to production.

## 📄 License
This project is not licensed for public/commercial use. All rights reserved to the project owner.
