# PrimeTrade Backend

## Overview
Node.js/Express backend for PrimeTrade assignment. Handles authentication, profile, and task CRUD.

## Setup
1. `npm install`
2. Set up MongoDB (local or Atlas)
3. Configure `.env` with your MongoDB URI and JWT secret
4. `node app.js` or `npm run dev` (if nodemon installed)

## Structure
- `controllers/` — Route logic
- `middleware/` — Auth middleware
- `models/` — Mongoose models
- `routes/` — API routes
- `utils/` — Error handler
- `API_DOCS.md` — API documentation

## Notes
- Do not commit `.env` (add to `.gitignore`)
- See `API_DOCS.md` for endpoints
