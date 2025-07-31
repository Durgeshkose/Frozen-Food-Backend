# Project Title: Frozen Food Project

## Description
This project is a web application designed to manage a frozen food delivery service. It includes features for user authentication, product management, order processing, and blog management.

## Project Structure
The project is organized into several folders and files, each serving a specific purpose:

- **config/**: Contains configuration files for database and third-party services.
  - `db.js`: MongoDB Atlas connection.
  - `cloudinary.js`: Configuration for Cloudinary image storage.

- **controllers/**: Contains business logic for handling requests.
  - `authController.js`: Manages authentication-related logic.
  - `userController.js`: Handles user-related operations.
  - `adminController.js`: Manages admin functionalities.
  - `productController.js`: Handles product-related operations.
  - `orderController.js`: Manages order processing.
  - `blogController.js`: Handles blog-related operations.

- **models/**: Contains Mongoose models (schemas) for the application.
  - `User.js`: Defines the User schema.
  - `Product.js`: Defines the Product schema.
  - `Order.js`: Defines the Order schema.
  - `Review.js`: Defines the Review schema.
  - `Blog.js`: Defines the Blog schema.
  - `Wishlist.js`: Defines the Wishlist schema.

- **routes/**: Contains Express routes for the application.
  - `authRoutes.js`: Defines authentication routes.
  - `userRoutes.js`: Defines user-related routes.
  - `adminRoutes.js`: Defines admin routes.
  - `productRoutes.js`: Defines product-related routes.
  - `orderRoutes.js`: Defines order-related routes.
  - `blogRoutes.js`: Defines blog-related routes.
  - `wishlistRoutes.js`: Defines wishlist-related routes.

- **middlewares/**: Contains custom middleware functions for the application.
  - `authMiddleware.js`: Checks JWT for authentication.
  - `adminMiddleware.js`: Checks for admin role.
  - `uploadMiddleware.js`: Handles file uploads using Multer and Cloudinary.
  - `errorMiddleware.js`: Handles errors in the application.

- **utils/**: Contains utility/helper functions.
  - `generateToken.js`: Generates JWT tokens.
  - `invoiceGenerator.js`: Generates order invoices.

- **.env**: Stores environment variables such as Mongo URI and API keys.

- **.gitignore**: Specifies files and folders to be ignored by Git.

- **package.json**: Contains configuration for npm, including dependencies and scripts.

- **server.js**: Entry point of the application.

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Create a `.env` file and add your environment variables.
5. Start the server with `node server.js`.

## Usage
Once the server is running, you can access the application through your web browser. Use the provided routes to interact with the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.