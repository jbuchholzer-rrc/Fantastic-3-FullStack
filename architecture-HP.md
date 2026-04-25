# Architecture Document – Sprint 3 to Sprint 5 Progress (Harsh Pandya)

## Overview

This document explains how my work evolved across Sprint 3, Sprint 4, and Sprint 5 in the Winnipeg Transit Tracker project. The focus is on how the architecture improved from a basic frontend structure to a full-stack application with authentication and user-based data.

## Sprint 3 – Layered Frontend Architecture

In Sprint 3, I focused on building features using a layered architecture on the frontend. The goal was to improve code organization and maintainability.

The structure was divided into:

* Component layer (UI)
* Hook layer (state and logic)
* Service layer (business logic)
* Repository layer (data access)

For example, in the bus feature:

* Components handled rendering
* Hooks managed state and user interaction
* Services processed logic like filtering and updates
* Repository returned data from local test files

At this stage, all data was static and stored in local files. There was no backend connection.

## Sprint 4 – Backend Integration with Database

In Sprint 4, I extended the architecture by connecting the frontend to a backend system.

Key improvements:

* Added Express backend with TypeScript
* Integrated Prisma ORM
* Connected to PostgreSQL database
* Replaced local data with API calls
* Implemented CRUD operations

The frontend now communicated with the backend through REST APIs. Data such as buses and trips became persistent and no longer reset on refresh.

This improved the realism of the application and introduced full-stack development practices.

## Sprint 5 – Authentication and User-Based Data

In Sprint 5, the main focus was adding authentication and securing user-specific data.

### Authentication (Clerk)

* Integrated Clerk into the frontend for login and session management
* Wrapped the application using ClerkProvider
* Used `useAuth()` hook to manage authentication state

### Backend Protection

* Added Clerk middleware to backend routes
* Protected trip-related endpoints (`/api/trips`)
* Backend reads authenticated user from Clerk token

### User-Based Data Handling

* Trips are now linked to a specific user
* Each request includes a session token
* Backend filters trips using the logged-in user ID
* Only the authenticated user can view or modify their trips

### Updated Data Flow

The application now follows this flow:

UI Component
→ useTrips Hook
→ Trip Service
→ Trip Repository
→ Backend API (with Clerk token)
→ Database (PostgreSQL via Prisma)

## Key Improvements Across Sprints

### From Sprint 3 to Sprint 4

* Moved from static data to real backend
* Added database persistence
* Improved scalability

### From Sprint 4 to Sprint 5

* Added authentication
* Secured API endpoints
* Introduced user-specific data handling

## Current State (Sprint 5)

The application is now a full-stack system with:

* Structured frontend using layered architecture
* Backend with Express and Prisma
* PostgreSQL database for persistent data
* Clerk authentication for user management
* Protected routes for secure access
* User-specific trip storage and retrieval

## Conclusion

The project has evolved from a simple frontend structure into a complete full-stack application with authentication and secure data handling. Each sprint improved the architecture by adding more realistic and scalable features. Sprint 5 adds the most important real-world capability: user authentication and personalized data.