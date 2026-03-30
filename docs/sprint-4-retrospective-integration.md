# Retrospective Integration — Khush Patel (Sprint 4)

## Overview

In Sprint 3, I identified several issues in my development process, mainly related to code cleanup, structure consistency, and explaining my implementation clearly. In Sprint 4, I focused on improving these areas while working on backend integration.

---

## Key Improvements from Sprint 3

### 1. Code Cleanup and Structure

In Sprint 3, I left duplicate components and unnecessary code after refactoring, such as multiple App components and repeated providers. This created confusion and affected code quality.

In Sprint 4, before starting backend integration, I cleaned up the frontend structure and ensured there were no duplicate components or exports. I also made sure each file had a single clear responsibility.

---

### 2. Centralized Types

Previously, I had duplicate type definitions across multiple files. This could lead to inconsistencies if changes were made later.

In this sprint, I ensured that all shared types, such as Stop, are defined in a single location under the types folder and reused across the application.

---

### 3. Build and Testing Before Completion

In Sprint 3, I faced a deployment issue because I did not verify the build before merging.

In Sprint 4, I followed a more structured testing approach:

* Verified backend endpoints using browser/Postman
* Confirmed database updates after API calls
* Tested frontend integration by adding and deleting stops
* Ensured data persisted after page refresh

This helped me confirm that the feature was working end-to-end before considering it complete.

---

### 4. Understanding Data Flow

One of the main improvements in this sprint was focusing on understanding how data moves across the system.

I worked through the full flow:

Component → Hook → Repository → API → Controller → Service → Prisma → Database

By testing each step and debugging issues, I now have a clearer understanding of how each layer interacts.

---

## Result

Compared to Sprint 3, my approach in Sprint 4 was more structured and intentional. I focused not only on making the feature work, but also on ensuring code quality, proper architecture, and clear understanding of the implementation.
