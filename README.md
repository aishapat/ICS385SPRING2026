

# Luminous Stays — Maui Luxury Vacation Rental
**Live URL:** https://luminous-stays.onrender.com
**GitHub:** https://github.com/aishapat/ICS385SPRING2026


# HW15-A - Google OAuth 2.0 with Passport.js

## What I Built
A standalone Express application that demonstrates Google OAuth 2.0 authentication using passport-google-oauth20. Users can sign in with their Google account, view their profile page showing their email and Mongoose ID, and log out securely.

## How to Run
1. Clone the repo
2. cd into week15/hw15a
3. Run npm install
4. Create .env with MONGO_URI, SESSION_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
5. Run node app.js
6. Open http://localhost:3000

## Reflection
Google OAuth made authentication a lot easier on my end because I didn’t have to deal with passwords at all. Instead of storing and hashing passwords with bcrypt, Google takes care of verifying the user and sends back their basic profile info like email and display name.
That said, it did come with some extra setup. I had to create an OAuth client in the Google Cloud Console, make sure the redirect URIs were set up correctly, and save the googleId in MongoDB so I could recognize returning users. I also needed to configure the OAuth consent screen and add test users before anyone could actually log in.

## AI Tools Used
Claude (Anthropic) assisted with code structure and debugging. All design decisions are my own.

### HW15-B - PRD v3.0
Final PRD update with Google OAuth requirements, acceptance criteria, and Jest test scripts.

