# Phase 1 foundation

The web application is a Next.js App Router application. Domain contracts, database access, and configuration are separate workspace packages so the future worker can consume the same contracts without importing UI code.

Phase 1 intentionally has no repository ingestion, execution, scanner, AI, queue, upload, or billing capability. Report and dashboard content is fixture data stored in the web feature layer.

Auth.js handles GitHub sign-in only. The sign-in callback creates a personal organization and owner membership for first-time users.
