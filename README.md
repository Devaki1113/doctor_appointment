# PlusCare - Doctor Appointment Booking System

A professional, responsive, and efficient Doctor Appointment Booking application built with **React Class Components**. This project demonstrates the usage of legacy React patterns, state management, and LocalStorage for data persistence.

![Screenshot Placeholder](https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200)

## 🚀 Features

- **Doctor Listing**: Professional cards showing doctor details, specialization, and timings.
- **Search & Filter**: Real-time search by name or specialization using class-based filtering.
- **Booking System**: Intuitive modal-based booking with date and time selection.
- **Appointment Management**: View and cancel booked appointments efficiently.
- **Data Persistence**: Uses LocalStorage to keep your bookings even after page reload.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Feedback System**: Toast notifications for booking and cancellation confirmation.

## 🛠️ Tech Stack

- **React.js**: Class-based architecture (Component, state, lifecycle)
- **CSS3**: Custom vanilla CSS with modern variables for theming
- **LocalStorage**: Client-side data storage
- **Vite**: Ultra-fast frontend tooling

## 📂 Project Structure

```text
src/
├── components/
│   ├── AppointmentList.jsx  # Lists booked appointments
│   ├── BookingModal.jsx     # Form for booking appointments
│   ├── DoctorCard.jsx       # Individual doctor display
│   └── Navbar.jsx           # Main navigation
├── mockData.js              # Doctor profiles and availability
├── App.jsx                  # Main state container (Class Component)
├── index.css                # Global styles and design system
└── main.jsx                 # Application entry point
```

## 🧠 Technical Explanations

### 1. Class-Based State Management
In this project, we use `this.state` and `this.setState`. Unlike hooks:
- **Initialization**: State is initialized in the `constructor(props)` using `this.state = { ... }`.
- **Updating**: Updates are merged using `this.setState({ key: value })`.
- **Context**: Methods must be arrow functions or bound to `this` to access the state.
- **Lifecycle**: We use `componentDidMount` for initial data loading and `componentDidUpdate` for side effects like saving to LocalStorage.

### 2. LocalStorage Usage
Persistence is achieved without a backend:
- **Reading**: In `componentDidMount`, we check `localStorage.getItem('appointments')`. If exists, we `JSON.parse` and set it to state.
- **Writing**: In `componentDidUpdate`, we check if the `appointments` state has changed. If it has, we `JSON.stringify` the new array and save it using `localStorage.setItem`.

## ❓ FAQ / Interview Questions

### Q1: Why use `componentDidUpdate` instead of saving inside `confirmBooking`?
**A:** Saving in `componentDidUpdate` ensures that any state change (booking or cancellation) is automatically persisted to LocalStorage, keeping the UI and storage perfectly in sync (single source of truth).

### Q2: What is the benefit of using the `prevState` pattern in `this.setState`?
**A:** `this.setState` is asynchronous. When the new state depends on the previous state (like adding to an array), using `this.setState(prevState => ({ appointments: [...prevState.appointments, newItem] }))` guarantees we are working with the most current state.

### Q3: How do you handle search and filters in a single list?
**A:** We use a centralized `applyFilters` method. Whenever either the search term or the specialization filter changes, this method runs, filtering the original `allDoctors` array based on both criteria simultaneously, ensuring accuracy.

### Q4: Why bind methods or use arrow functions in class components?
**A:** In JavaScript, class methods are not bound by default. If a method is passed as a callback (like `onClick`), `this` will be `undefined`. Arrow functions automatically bind `this` to the class instance.

---

## 🚦 How to Run

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start Development Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```

Developed with ❤️ for high-efficiency healthcare booking.
