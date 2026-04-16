Stage 1A — Advanced Todo Card
📌 Overview

This is an enhanced version of the Stage 0 Todo Card. It introduces interactivity, state management, and improved accessibility — making the component feel more like a real application.

Features
Editable Todo (title, description, priority, due date)
Status control (Pending, In Progress, Done)
Synced checkbox + status logic
Priority visual indicators (Low, Medium, High)
Expand / Collapse for long descriptions
Dynamic time updates (e.g., "Due in 2 hours", "Overdue")
Overdue state styling
Completed state handling
Keyboard accessibility
Responsive layout (mobile → desktop)

Key Implementation Details
State is managed using JavaScript objects
Edit mode uses a temporary “draft” state before saving
Time updates handled via setInterval
Accessibility includes:
aria-expanded
aria-controls
aria-live="polite"
