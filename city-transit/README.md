# Winnipeg Transit Tracker

A React + TypeScript application for tracking buses in Winnipeg.

## Sprint 3 - Architecture Refactoring

This sprint focused on implementing the hook-service-repository architecture pattern.

### What Was Done

- **Hook (useBuses)**: Reusable presentation logic for fetching bus data
- **Service (BusService)**: Business logic for filtering, sorting buses
- **Repository (BusRepository)**: Data access layer with CRUD operations
- **Context (BusContext)**: Shared state between pages (replaces prop drilling)
- **Test Data**: 12 bus items for testing

### Project Structure

```
src/
├── components/     # React components
├── context/        # React Context for shared state
├── data/           # Test data
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── repositories/   # Data access layer
├── service/        # Business logic
└── types/          # TypeScript types
```

## Run the App

```
bash
cd city-transit
npm install
npm run dev
```

## Team

Harsh Pandya, Khush Patel, Jack Buchholzer