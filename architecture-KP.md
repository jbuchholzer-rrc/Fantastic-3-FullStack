Overview

This project is a full stack web application for tracking Winnipeg Transit data. It consists of a frontend built with React and a backend built with Express and Prisma. The system allows users to view transit routes, stops, plan trips, and manage their own saved data such as custom stops and trips.

The architecture follows a layered approach to keep responsibilities separated and maintainable.

Frontend Architecture:
- The frontend is built using React with TypeScript and organized into clear layers.

Components:
- Components are responsible for rendering UI elements such as route lists, maps, trip forms, and schedule cards.

Hooks:
- Hooks manage state and interaction logic. For example:

useStops handles loading, creating, and deleting stops
useTransit handles communication with transit-related endpoints
useTrips manages trip-related UI logic
Repositories

Repositories handle API communication. They send HTTP requests to the backend and include authentication headers when required.

Services:
- Services contain business logic that processes or transforms data before passing it to components.

Backend Architecture:
- The backend is built with Express and uses Prisma as the ORM for database access.

Routes:
- Routes define API endpoints and map them to controller functions.

Controllers:
- Controllers handle incoming requests and outgoing responses. They extract parameters, validate input, and call services.

Services:
- Services contain the business logic and interact with the database through Prisma.

Middleware:
- Middleware handles cross-cutting concerns such as authentication. Clerk middleware is used to extract the user identity from requests.

Database:
- The database is managed using Prisma and PostgreSQL. Key models include:

User for authentication and ownership
Stop for user-created stops
Trip for saved trip plans
TransitStop and TransitRoute for cached transit data
Authentication

Authentication is handled using Clerk. The frontend retrieves a token using Clerk and sends it in the Authorization header. The backend middleware extracts the userId from this token and uses it to scope data to the current user.

Data Flow:
- When a user performs an action such as creating a stop:

The frontend hook triggers a repository function
The repository sends a request with an auth token
Middleware validates the user
The controller processes the request
The service interacts with the database
The response is returned to the frontend
The UI updates with the new data
External APIs

The backend integrates with the Winnipeg Transit API. Some data is cached in the database, while other endpoints fetch live data such as schedules and trip planning.