# HW13-A - Hawaii Island Cards with Filter

## What I Built
I added onto the Week 12 Island Cards app and made it data-driven using React props, `.map()`, `.filter()`, and `.reduce()`. I also added a dropdown filter so users can view islands by region and see the total visitor count.

## Key Concepts Used
- Props to pass island data into the `IslandCard` component
- `.map()` to show all island cards
- `.filter()` to sort islands by region (All, Central, North, South)
- `.reduce()` to add up total visitors from the filtered islands
- `useState` to keep track of the selected filter

## How to Run
1. Clone the repo
2. Go to `week13/hw13a-island-cards`
3. Run `npm install`
4. Run `npm run dev`
5. Open `http://localhost:5173`

## AI Tools Used
Claude helped with the component layout and filter logic.

# HW13-B - PRD v2.0
I updated the Product Requirements Document to include the Visitor Statistics Dashboard design, Island Selector UX, Weather Widget, and Data Architecture sections. Also updated Acceptance Criteria with measurable time metrics.

# Hw13C

## What I built
I built a React dashboard for Luminous Stays that shows real Hawaii tourism data from DBEDT. It includes three Chart.js graphs: a bar chart for monthly Maui visitor arrivals from 2021 to 2024, a pie chart for visitor types (vacation rental, hotel, condo, and other), and a line chart showing the average length of stay by year. I also added the OpenWeatherMap API to show the live weather in Wailea, Maui.

## Data Sources
- DBEDT Hawaii Tourism Data Warehouse — real Maui visitor arrival data 2021-2024
- OpenWeatherMap API — live weather for Wailea, Maui

## Key Concepts Used
- Chart.js with react-chartjs-2 for data visualizations
- useEffect to fetch live weather data from OpenWeatherMap API
- useState to manage the island selector dropdown
- Real DBEDT tourism JSON data imported directly into React

## How to Run
1. Clone the repo
2. cd into week13/term-project
3. Create a .env file with VITE_WEATHER_KEY=your_api_key
4. Run npm install
5. Run npm run dev
6. Open http://localhost:5173

## Week14-15 plan
In Week 14 I will add admin login using Passport.js to protect the dashboard page and in Week 15 I will add security headers with Helmet.js and put the full app live on Render.

## AI Tools Used
Claude helped with component structure and Chart.js setup. All data, design decisions, and content are my own.