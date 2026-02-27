# Architecture Document — Jack Buchholzer

## Overview

This sprint reorganized the Trip Planner section of the app into a layered architecture:

```
Component (UI) --> Hook (presentation logic) --> Service (business logic) --> Repository (data access)
```

Each layer has one job. This makes the code easier to understand, test, and change later (like when we swap test data for a real database next sprint).

---

## Trip Type (`src/types/trip.ts`)

**What:** Defines the shape of a Trip object used across the whole app.

**Why separated:** Having one type definition in one place means every layer agrees on what a Trip looks like. If we add a field later, we change it in one spot.

**Where used:** Imported by tripData, tripRepository, tripService, useTrips hook, TripPlannerPage, and SavedTripsPage.

---

## Trip Test Data (`src/data/tripData.ts`)

**What:** An array of 12 pre-made Trip objects using real Winnipeg Transit stops and route numbers (BLUE, 11, 16, 36, 47, 75).

**Why separated:** Keeps test data out of the repository logic. Next sprint we delete this file and point the repository at a database instead.

**Where used:** Imported only by tripRepository. Nothing else touches this file directly.

---

## Trip Repository (`src/repository/tripRepository.ts`)

**What:** The data access layer. Provides CRUD methods:
- `getAllTrips()` — returns all trips
- `getTripById(id)` — returns one trip
- `addTrip(trip)` — creates a new trip with auto-generated id
- `updateTrip(id, updates)` — updates fields on an existing trip
- `removeTrip(id)` — deletes a trip
- `getAllStops()` — returns unique stop names from the data

**Why separated:** All data access goes through one place. Right now it reads from an in-memory array. Next sprint we change these methods to hit a database, and nothing else in the app needs to change.

**Where used:** Only called by tripService. Components and hooks never touch the repository directly.

---

## Trip Service (`src/services/tripService.ts`)

**What:** The business logic layer. Handles the "thinking" about trips:
- `searchTrips(from, to)` — filters trips by origin/destination
- `getTripsByStatus(status)` — filters by scheduled/completed/etc.
- `getStopNames()` — gets stop names for dropdowns
- `createTrip(from, to)` — validates input and creates a new trip
- `deleteTrip(id)` — removes a trip
- `getTrip(id)` — gets a single trip
- `getTripStats()` — calculates summary stats (totals, averages)

**Why separated:** Business rules live here, not in components. If we need to change how searching works or add validation rules, we change the service. The UI doesn't care how the filtering happens.

**Where used:**
1. `useTrips` hook — calls searchTrips, getStopNames
2. `SavedTripsPage` — calls getTripStats directly

---

## useTrips Hook (`src/hooks/useTrips.ts`)

**What:** The presentation logic layer. Manages all UI state for trip pages:
- `stops` — stop names for dropdown options
- `selectedFrom` / `selectedTo` — current form selections
- `searchResults` — trips matching the search
- `savedTrips` — trips the user saved
- `handleSearch()` — triggers a search
- `handleSaveTrip(trip)` — adds to saved list (prevents duplicates)
- `handleRemoveSavedTrip(id)` — removes from saved list

**Why separated:** Components shouldn't manage complex state logic. The hook handles state so components just render what the hook gives them.

**Where used:**
1. `TripPlannerPage` — uses the full hook (form state, search, save)
2. `SavedTripsPage` — uses savedTrips and handleRemoveSavedTrip

---

## TripPlannerPage (`src/pages/TripPlannerPage.tsx`)

**What:** The main trip planner page. Lets users pick From/To stops, search for available trips, and save them.

**How it uses the architecture:**
1. Calls `useTrips()` hook for all state and actions
2. Passes stop names and form state down to `TripForm` as props
3. Displays search results and saved trips from the hook

**Before vs After:**
- Before: State lived in App.tsx and got drilled through TripPlanner into TripForm. Business logic was mixed into the component.
- After: State lives in the hook. The page just renders what the hook provides. No prop drilling from App.

---

## SavedTripsPage (`src/pages/SavedTripsPage.tsx`)

**What:** Displays the user's saved trips and system-wide trip stats.

**How it uses the architecture:**
1. Calls `useTrips()` hook for saved trips list
2. Calls `tripService.getTripStats()` directly for statistics

This page shows both patterns: using the hook for presentation state, and using the service directly when you just need a quick calculation.

---

## TripForm (`src/TripForm.tsx`)

**What:** The From/To dropdown form. Updated to receive stop names as props instead of hardcoding them.

**How it fits:** It's a simple UI component. It doesn't know about the service or repository. The page passes it data from the hook, and it renders dropdowns.

---

## Data Flow Example

Here's what happens when a user searches for a trip:

1. User selects "Portage & Main" in the From dropdown
2. `TripPlannerPage` calls `setSelectedFrom("Portage & Main")` (from the hook)
3. User clicks "Search Trips"
4. `TripPlannerPage` calls `handleSearch()` (from the hook)
5. `useTrips` hook calls `tripService.searchTrips("Portage & Main", "")`
6. `tripService` calls `tripRepository.getAllTrips()` to get the data
7. `tripService` filters the trips and returns matches
8. Hook stores results in `searchResults` state
9. React re-renders `TripPlannerPage` with the results

```
User Click -> TripPlannerPage -> useTrips hook -> tripService -> tripRepository -> testData
                                                                      |
User Sees  <- TripPlannerPage <- useTrips hook <- tripService <-------+
```

---

## Changes to Existing Files

- **App.tsx** — Removed duplicate Router (was nested with main.tsx), removed unused useState, added routes for `/trip-planner` and `/saved-trips`
- **TripForm.tsx** — Now receives `stops` array as a prop instead of hardcoding Winnipeg stops
- **TripPlanner.tsx** — Old component, replaced by TripPlannerPage. Can be removed.
