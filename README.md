# Buy and Sell Application
- Frontend Repo: https://github.com/ryanhopperlowe/Angular-Node-Listing-App

### Stack
- Angular 15
- Node.js
- Hapi
- Firebase Auth
- MySQL Database
- Google Cloud Hosting (ommitted from repo for security reasons)

This is a full stack listing application.

### Features
- View all listings
- View "My Listings" (for authenticated user)
- Create Listing
- Edit Listing
- Delete Listing
- Contact User About Listing

All operations require authentication through firebase auth (Google login enabled) and user identity is verified against auth token, so no user can modify another user's data.

### Future Plans
- Reimplement all apis in express
- Improve/implement routing system for serving static HTML
- Differentiate between production and local environments
- Implement packaging so building, running, and deploying colocated UI and backend can be done in a single command
- Implement profile functionality
  - Email auth
  - Profile pictures/settings
- Implement in-app chat feature between users
- Reimplement DB using PostgreSQL

#### UI Updates
- Improve navbar to contain login/logout buttons