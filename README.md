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
