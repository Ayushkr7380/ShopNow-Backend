ShopNow Backend


ShopNow is a full-featured e-commerce backend built with Node.js, Express, and MongoDB. It supports user and admin authentication, product management, cart/wishlist features, order handling, and more — all with a secure, modular, and scalable architecture.




Project Structure


ShopNowBackend/

├── Config/

│   └── DBConfig.js    

├── Controllers/

│   ├── ShopNowAdmin.controllers.js

│   ├── ProductController/

│   └── UserController/

├── Middleware/

│   ├── LoggedIn.js    

│   └── multer.middleware.js  

├── Models/       

├── Routers/

│   ├── ShopNowAdmin.js

│   ├── ShopNowProducts.js

│   └── ShopNowUser.js

├── .gitignore

├── .env        

├── app.js    

├── index.js    

├── package.json

├── package-lock.json




Technologies Used



Node.js + Express.js
MongoDB + Mongoose
JWT Authentication
Multer + Cloudinary for image uploads
dotenv, morgan, cookie-parser, cors


Features


Admin


Registration, Login, Logout
Add products with images
Access admin dashboard


Users


Register/Login/Logout
Edit profile
Manage Wishlist & Cart
Add/Delete address
Place & View Orders


Products


List all products
Search by keyword
View individual product details


Getting Started


1. Clone the Repository


git clone https://github.com/yourusername/shopnowbackend.git
cd shopnowbackend


2. Install Dependencies


npm install


3. Set Up .env


Create a .env file in the root directory:

PORT=5000

MONGO_URL=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret


4. Start the Server


nodemon index.js

App runs at http://localhost:5000


API Endpoints


🔐 Admin /auth

POST /registration – Admin register

POST /login – Admin login

POST /logout – Admin logout

GET / – Admin dashboard

POST / – Add product (with image via multer)


👤 User /user


POST /registration – User signup

POST /login – User login

POST /logout – Logout

POST /editprofile – Edit profile

GET / – Get user profile

Wishlist: /wishlist, /removeitemfromwishlist

Cart: /addtocart, /removeitemfromaddtocart, /updateitemfromaddtocart, /deleteaddtocart

Address: /addaddress, /deleteaddress

Orders: /placeorder, /vieworder


🛍️ Product /products


GET / – List all products

GET /eachitem/:id – Get product by ID

GET /search – Search product by name


📄 License

Licensed under the ISC License.
