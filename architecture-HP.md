# Architecture Document – Bus Resource (Harsh Pandya)

This document explains how my Bus feature was designed in Sprint 3 and how I improved it in Sprint 4.

In Sprint 3, my main goal was to build a clean and organized structure using layered architecture. I separated the application 
into different parts: Component, Hook, Service, and Repository. Each layer had a clear responsibility, which made the code easier 
to understand and maintain.

The `useBuses` hook was responsible for handling frontend state and managing how data is displayed. It used React state and 
effects to load and update bus data. I kept all UI-related logic inside the hook so that components stayed simple and focused only 
on displaying information.

The `BusService` handled business logic such as filtering delayed buses and sorting by ETA. I made sure it did not depend on React,
so it could be reused easily and tested independently.

The `BusRepository` was used to manage data access. In Sprint 3, it worked with local test data (`busTestData.ts`). It provided 
basic CRUD operations and acted as a bridge between the service layer and the data source.

I also used `BusContext` to share state between pages like Live Bus Tracker and Favorites. This helped avoid passing props 
through multiple components.

In Sprint 4, I made major improvements by connecting the frontend to a real backend. The biggest change was replacing test 
data with API calls. Instead of reading from a local file, the repository now sends requests to the backend using endpoints like `/api/buses`.

I also implemented a backend using Express and Prisma. I created a Bus model in the Prisma schema and used SQLite as the database. 
This allowed me to store bus data permanently.

Now, when a user adds or deletes a bus, the request goes to the backend, which updates the database. The frontend then reloads 
the data. This means the data stays even after refreshing the page, which was not possible in Sprint 3.

I also added validation on the backend to ensure only valid data is accepted.

Overall, Sprint 3 helped me build a strong frontend structure, and Sprint 4 extended it into a full-stack system with real data 
persistence. This made the application more realistic and closer to how real-world systems work.
