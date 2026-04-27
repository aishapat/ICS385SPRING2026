# HW14-B - Passport.js Authentication

## What I Built
A standalone Express application that demonstrates username and email based authentication using Passport.js LocalStrategy and bcrypt. Users can register, login, access a protected profile page, and logout.

## How bcrypt Protects Passwords
bcrypt is a hashing function that converts a plain text password into a secure, irreversible string. It uses 10 salt rounds, meaning the hashing process is repeated over 1000 times to increase security and slow down brute force attacks. Even if a database is compromised, attackers would only see the hashed passwords, not the original ones. This is why storing plain text passwords is never acceptable in production applications.

## Routes
- GET /register - registration form
- POST /register - creates new user with bcrypt hashed password
- GET /login - login form
- POST /login - Passport.js authenticates credentials
- GET /profile - protected route, only accessible when logged in
- GET /logout - destroys session and redirects to login

## How to Run
1. Clone the repo
2. cd into week14/hw14b
3. Run npm install
4. Create .env with SESSION_SECRET and MONGODB_URI
5. Run node server.js
6. Open http://localhost:3000/register

## AI Tools Used
Claude (Anthropic) assisted with code structure and debugging. All design decisions are my own.

### HW14-C - PRD v3.0
Updated PRD with authentication and security requirements including Passport.js LocalStrategy, bcrypt hashing, and user stories.

# Week 14D - Luminous Stays Admin Login

## What I Built
Added admin authentication to the Luminous Stays term project using Passport.js LocalStrategy and bcrypt. The admin can log in with email and password, access a protected dashboard showing all properties, and log out securely.

## Admin Credentials
- Email: admin@luminousstays.com
- Password: stored securely as bcrypt hash in MongoDB Atlas

## New Files Added
- models/User.js - admin user schema
- passport-config.js - Passport LocalStrategy configuration
- middleware/isAuthenticated.js - route guard for protected pages
- routes/auth.js - login and logout routes
- routes/admin.js - protected admin dashboard
- seed-admin.js - run once to create admin account

## How to Run
1. Clone the repo
2. cd into week14/term-project
3. Run npm install
4. Create .env with MONGO_URI and SESSION_SECRET
5. Run node seed-admin.js to create admin account
6. Run node app.js
7. Go to http://localhost:3000/admin/login

## Challenge
Setting up Passport.js session management with the Express app took some attention to middleware order. The session middleware had to come before passport.initialize() and passport.session() for everything to work properly.

## AI Tools Used
Claude (Anthropic) assisted with code structure and debugging. All design decisions are my own.