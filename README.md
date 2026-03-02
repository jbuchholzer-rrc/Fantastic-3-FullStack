Team Name: Fantastic-3

Project Description :

- Winnipeg Transit Tracker is a web-based application designed to help users explore 
  Winnipeg Transit bus routes and track bus activity in a simple and organized way. 
  The application focuses on presenting transit information in a clear interface that 
  can be expanded in future sprints to include real-time data and user personalization.

Team Members:

Harsh Pandya,
Khush Patel,
Jack Buchholzer

User Stories: 

- As a commuter, I want to view active bus routes and estimated arrival times so that I can plan my daily travel more efficiently.
- As a visitor, I want to see route destinations and stops so that I can navigate the city without confusion.
- As a frequent rider, I want to track buses and save commonly used routes so that I can access transit information quickly 
   and track another bus to take that one to reach early at college.

Tech Stack (Preview)

- React with TypeScript
- Vite build tool
- CSS for styling
- Vercel for deployment


## Sprint 3 - Architecture Refactoring

This sprint focused on refactoring the frontend to use the hook-service-repository pattern.

### Implemented by Harsh Pandya (Bus Resource)

| Requirement | Description | Status |
|-------------|-------------|--------|
| T.1 | Hook Definition - useBuses | Completed |
| T.2 | Service Definition - BusService | completed |
| T.4 | Shared-page-state Refactor - BusContext | completed |
| I.1 | Repository Definition - BusRepository | completed |
| I.2 | Test Data - 12 bus items | completed |
| I.3 | Refactored Components | completed 
| I.4 | Architecture Document | completed |

### Key Changes
- Created reusable hooks for presentation logic
- Built service layer for business logic
- Implemented repository pattern for data access
- Added context for shared state between pages

### How to Run
```
bash
cd city-transit
npm install
npm run dev


This keeps the README focused, realistic, and expandable for future sprints.