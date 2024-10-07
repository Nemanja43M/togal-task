-   File Management Application

-   Overview
    The File Management Application is a web-based platform that allows users to manage files and folders efficiently. It offers features for creating folders, uploading documents, and managing file versions. The application uses Express.js for the backend, PostgreSQL for data storage, and Docker for containerization.

-   Prerequisites
    Before you begin, ensure you have the following installed on your machine:

Docker: To run the application and database in containers.
Node.js (version 18 or higher): To run and build the Node.js application.
Docker Compose: To easily manage multi-container Docker applications.

-   Run Docker Compose
    In the root of your project directory, run the following command to start the PostgreSQL database and File Browser service:

docker-compose up -d

This command will create two services:

PostgreSQL Database: Accessible at localhost:5432.
File Browser: Accessible at http://localhost:8080/filebrowser with the credentials:
Username: admin
Password: admin

-   After starting the Docker containers, install the Node.js dependencies by running:

npm install

-   Start the Application
    Now, you can start the application using the following command:

npm start
