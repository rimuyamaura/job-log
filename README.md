# Job-Log

A job application tracking website designed to help users save and monitor their job application progress throughout their job search journey! Users are able to login to view, create, edit, and delete their job applications along with the ability to sort by status and view statistics for their own applications.

One feature I am proud of for my application is the use of JWT Bearer Tokens to handle user authentication and authorization for this application. Each unique Bearer token securely identifies users and authorizes their access to the CRUD operations on job applications. This layer of protection is important as we do not want people to make unauthorized changes and access other user's data.

## Features

- User can Fetch/Create/Edit/Delete their own Job Applications.
- Ability to filter Job Applications via status (Wishlist, Applied, Interviewing, Offer Received, Rejected, Ghosted).
- Visual statistic generated for job application status using recharts.
- Responsive and animated user UI created with MaterialUI and Framer-motion.

- Routing with React Router and API calls to backend made with Axios.

- .NET8 and EF Core backend, using SQL database hosted on MS SQL Server.
- Github repository to host project code for efficient development.

Advanced

- State management with redux, Slices for user and job application to store respective data. Used async thunks to call api endpoints, selectors to access state.
- Swap between light and dark theme with preference being stored in user state and localstorage.
- Authentication and authorization for CRUD API requests are handled via JWT Bearer tokens which are generated upon successful user login.

## Technology

Frontend: React Typescript, MaterialUI, Redux, Axios, Framer-motion, Recharts

Backend: .NET Core, SQL Server, JWT Bearer

## Screenshots

## Installation and Setup

Initialize .env file with following properties tailored to your setup

```sh
# /job-log.Server/.env

CONNECTION_STRING=YOUR_DB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET_STRING
JWT_ISSUER=YOUR_JWT_ISSUER_ADDRESS_URL
JWT_AUDIENCE=YOUR_JWT_AUDIENCE_URL

```

In frontend, configure HOST_API (same as JWT_ISSUER) in axiosInstance.ts

```sh
# /job-log.client/src/features/axiosInstance.ts

import axios from 'axios';

const HOST_API = 'YOUR_HOST_API_URL';

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

...
```

Then build and run the webapp:

```sh
dotnet build
dotnet run
```
