# Job Tracking API

A Node.js/Express API for job tracking with MongoDB as the database. The API includes a login/signin system using JSON Web Tokens (JWT) for authentication. It follows the RESTful API design pattern and implements CRUD functionality for jobs. The project uses an MVC pattern and includes security measures such as Helmet, xss-clean, cors, and express-rate-limit. Passwords are hashed and well protected.

## Installation

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Set up a MongoDB database.
4. Create a `.env` file in the root directory and add the following :
``` cmd
  PORT=<your_preferred_port>
  MONGO_URI=<your_mongodb_uri>
  SECRET_JWT=<your_jwt_secret>
  JWT_EXP=<your_jwt_expiration_period>
```
5. Start the server with `npm start`.

## Usage

The API supports the following endpoints:

- `POST /auth/signup`: Creates a new user.
- `POST /auth/login`: Logs in an existing user.
- `GET /jobs`: Returns a list of all jobs.
- `POST /jobs`: Creates a new job.
- `GET /jobs/:id`: Returns a single job by ID.
- `PUT /jobs/:id`: Updates a job by ID.
- `DELETE /jobs/:id`: Deletes a job by ID.

You must be authenticated to create, update, or delete a job. Authentication is done via JWT. Pass the token in the `Authorization` header as a Bearer token.

## Security

The project includes several security measures to prevent attacks such as cross-site scripting (XSS) and HTTP header injection. These measures include:

- Helmet: Helps secure the app by setting various HTTP headers.
- Xss-clean: Sanitizes user input to prevent XSS attacks.
- Bcrypt: Hashes passwords before storing them in the database.
- Cors: Enables Cross-Origin Resource Sharing to restrict access to the API from unauthorized domains.
- Express-rate-limit: Limits the number of requests per IP address to prevent brute-force attacks.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
