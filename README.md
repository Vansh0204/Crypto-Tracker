# Real-Time Crypto Price Tracker

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.x-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.x-black?logo=framer)](https://www.framer.com/motion/)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-blue)](https://recharts.org/)

This is a responsive React application that displays cryptocurrency prices and simulates real-time updates using Redux Toolkit.

---

## Live Demo

**(Placeholder for link to the hosted application)**

```
https://crypto-tracker-nine-khaki.vercel.app
```

---

## Demo Video

```
https://vimeo.com/1078609707/996a335f5d?ts=0&share=copy
```

---


## Features

*   **Real-Time Simulation:** Asset prices, volumes, and percentage changes update every ~1.5 seconds (simulated).
*   **Responsive UI:** Adapts to different screen sizes, switching to a card view on smaller devices (breakpoint at 1357px).
*   **Data Display:** Shows Rank, Name (with Logo & Symbol), Price, 1h/24h/7d % Change, Market Cap, 24h Volume, Circulating Supply, and a 7-day trend sparkline chart.
*   **State Management:** Uses Redux Toolkit for centralized state management.
*   **Theming:** Light/Dark mode toggle with smooth transitions and subtle glassmorphism effect in dark mode.
*   **Sorting:** Clickable table headers allow sorting by various columns (Name, Price, Market Cap, etc.) in table view.
*   **Filtering:** Search input to filter assets by name or symbol.
*   **Animations:** Subtle animations on row sorting/filtering (using Framer Motion) and price updates (CSS flash).
*   **Visual Polish:** Custom fonts, gradient backgrounds, custom scrollbars, compact number formatting, styled percentage indicators, and faint background coin logos.

---

## Tech Stack & Architecture

*   **Frontend:** React 18 (with TypeScript)
*   **State Management:** Redux Toolkit (using `configureStore`, `createSlice`)
*   **Styling:** CSS Modules (via `create-react-app`) with CSS Variables for theming.
*   **Animation:** Framer Motion
*   **Charting:** Recharts
*   **Build Tool:** Create React App (`react-scripts`)

**Architecture:**

*   **Components:** Functional components organized into logical units (`CryptoTable`, `CryptoRow`, `PercentageChange`, `Sparkline`).
*   **State:** All application state related to crypto assets is managed within the Redux store (`cryptoSlice`). Component state (`useState`) is used for local UI concerns like sorting configuration and search terms.
*   **Data Flow:** Updates are simulated via `setInterval` in `App.tsx`, dispatching a Redux action (`updateAssets`). Components subscribe to the Redux store using `useSelector` and display the latest data.
*   **Theming:** A React Context (`ThemeContext`) manages the current theme (light/dark) and applies a corresponding class to the `<body>` element, allowing CSS variables to control styling.

---

## Setup & Running Locally

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```
    *(Or `yarn install` if you prefer Yarn)*

3.  **Start the Development Server:**
    ```bash
    npm start
    ```
    *(Or `yarn start`)*

4.  **Open in Browser:**
    The application should automatically open at [http://localhost:3000](http://localhost:3000). If not, navigate to that URL.

---

## Available Scripts

In the project directory, you can run:

*   `npm start`: Runs the app in development mode.
*   `npm test`: Launches the test runner (if tests are configured).
*   `npm run build`: Builds the app for production.
*   `npm run eject`: Ejects from Create React App configuration (use with caution).

---

## Future Enhancements (Bonus)

*   **Real WebSocket Integration:** Connect to a live crypto exchange WebSocket API (e.g., Binance, Coinbase) for actual real-time data.
*   **Unit Tests:** Add tests for reducers, selectors, and potentially utility functions.
*   **localStorage Persistence:** Persist theme preference or other settings using `localStorage`.
*   **More Advanced Filtering:** Add filters for top gainers/losers, price ranges, etc.
*   **Pagination:** Implement pagination for handling a larger number of assets.
*   **Detailed Asset View:** Allow clicking a row to navigate to a more detailed view of a specific cryptocurrency. 
