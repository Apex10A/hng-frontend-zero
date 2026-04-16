# 🚀 Advanced Todo Card (Stage 1A)

## 📌 Overview

This project is an enhanced version of the Stage 0 Todo Card. It introduces interactivity, dynamic state handling, and improved accessibility using **HTML, CSS, and vanilla JavaScript**.

The goal is to simulate real application behavior without a backend by managing state directly in the frontend.

---

## ✨ Features

### 📝 Editing

* Edit todo title, description, priority, and due date
* Save updates the card
* Cancel restores previous values

### 🔄 Status Management

* Toggle between:

  * Pending
  * In Progress
  * Done
* Checkbox and status remain fully synchronized

### 🎯 Priority Indicator

* Visual representation of priority:

  * Low → subtle (green)
  * Medium → moderate (yellow)
  * High → strong (red)

### 📖 Expand / Collapse

* Long descriptions are truncated by default
* Expand to view full content
* Fully keyboard accessible

### ⏰ Time Handling

* Displays dynamic time:

  * “Due in X time”
  * “Overdue by X time”
* Updates automatically every 30–60 seconds
* Stops updating when task is marked as **Done**

### 🎨 Visual States

* Done → strikethrough + muted style
* Overdue → red highlight
* High priority → strong emphasis
* In Progress → distinct styling

---

## ♿ Accessibility

* Semantic HTML structure
* Inputs include proper labels
* Expand/collapse uses:

  * `aria-expanded`
  * `aria-controls`
* Time updates use `aria-live="polite"`
* Fully keyboard navigable

---

## 📱 Responsiveness

* Mobile-first layout
* Adapts across:

  * Mobile (320px)
  * Tablet (768px)
  * Desktop (1024px+)
* No layout breaking on long content

---

## 🛠️ Tech Stack

* HTML5
* CSS3 (Flexbox)
* Vanilla JavaScript (DOM manipulation, state handling)

---

## ⚙️ How to Run Locally

### Option 1 — Open Directly

1. Clone the repository:

   ```
   git clone <your-repo-link>
   ```
2. Open the folder:

   ```
   cd <project-folder>
   ```
3. Open `index.html` in your browser

---

### Option 2 — Live Server (Recommended)

1. Open project in VS Code
2. Install **Live Server** extension
3. Right-click `index.html`
4. Click **Open with Live Server**

---

## 🧪 Testing

* All required `data-testid` attributes are implemented
* Status, edit mode, and time updates behave as expected
* UI is consistent and testable

---

## ⚠️ Limitations

* No backend (data resets on refresh)
* State managed in-memory
* Persistence optional (localStorage not required)


