# carbon-footprint-calculator

---

# Project Setup and Usage

This project uses Yarn for package management. Follow the steps below to set up the project and run both the frontend and backend.

## 1. Install Dependencies

Run the following command to install all the required dependencies:

```bash
yarn install
```

This will install the necessary libraries for both the frontend and backend.

## 2. Start the Project

To run both the frontend and backend, use the following command:

```bash
yarn serve
```

This will start both parts of the project, and you should be able to access the app in your browser.

```bash
http://localhost:3000/
```

## 3. Unit Test

To run unit tests, first access the `api` folder:

```bash
cd api
```

After that, just run the following command:.

```bash
yarn unit:test --coverage
```

This will generate a folder called `coverage` inside `api`. It's possible to access the coverage interface. Just open the following file on your browser:


```bash
/api/coverage/lcov-report/index.html
```

---
