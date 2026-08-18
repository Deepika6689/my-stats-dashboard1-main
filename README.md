# GitHub Analyzer — GitHub Statistics Dashboard

## Overview

The **GitHub Analyzer** is a modern web-based analytics dashboard built with **React, TypeScript, and Vite** that retrieves and visualizes GitHub profile, repository, and activity data through the **GitHub API**.

The application provides a centralized and interactive interface for analyzing a developer's GitHub presence, eliminating the need to manually navigate through multiple GitHub pages.

The dashboard focuses on presenting GitHub data in an easy-to-understand format using statistics, visualizations, repository information, and interactive UI components.

---

## Technology Stack

| Layer           | Technology      | Purpose                                      |
| --------------- | --------------- | -------------------------------------------- |
| Frontend        | React           | Component-based user interface development   |
| Language        | TypeScript      | Type-safe application development            |
| Build Tool      | Vite            | Fast development server and optimized builds |
| Styling         | Tailwind CSS    | Responsive and utility-first styling         |
| UI Components   | shadcn/ui       | Reusable and accessible UI components        |
| API             | GitHub REST API | Fetching GitHub profile and repository data  |
| Deployment      | Netlify         | Application hosting and deployment           |
| Version Control | Git / GitHub    | Source code management                       |

---

## Features

### GitHub Profile Analysis

* Search and analyze GitHub user profiles
* Display user profile information
* View public repository statistics
* Display followers and following information
* Present GitHub activity and contribution-related information

### Repository Analysis

* Retrieve and display public repositories
* View repository details and metadata
* Display repository stars and other statistics
* Analyze programming languages used across repositories
* Provide a centralized view of repository information

### Dashboard & Visualization

* Interactive statistics dashboard
* Data-driven cards and visual components
* Graphical representation of GitHub metrics
* Clean and responsive user interface
* Responsive design for desktop and smaller screens

---

## System Architecture

The application follows a component-based frontend architecture using **React and TypeScript**.

GitHub data is retrieved through the GitHub API, processed within the application, and passed to reusable UI components for visualization.

### Architecture Flow

```text
+----------------------+
|      GitHub API      |
+----------+-----------+
           |
           v
+------------------------------+
|     API / Data Layer         |
|                              |
|  User Data                   |
|  Repository Data             |
|  GitHub Statistics           |
+--------------+---------------+
               |
               v
+------------------------------+
|      Data Processing         |
|                              |
|  API Utilities               |
|  Hooks                       |
|  Data Transformation         |
+--------------+---------------+
               |
               v
+------------------------------+
|        React UI Layer        |
|                              |
|  Cards • Charts • Tables     |
|  Statistics • Components     |
+--------------+---------------+
               |
               v
+------------------------------+
|          Dashboard           |
|                              |
|  Interactive GitHub Insights |
+------------------------------+
```

---

## Project Structure

```text
my-stats-dashboard1/
├── public/                  # Static assets
├── src/                     # Application source code
│   ├── components/          # Reusable React components
│   ├── pages/               # Application pages
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and API logic
│   └── main.tsx             # Application entry point
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Dependency lock file
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── index.html               # Application entry point
└── README.md                # Project documentation
```

---

## GitHub API Integration

The application uses the **GitHub API** to retrieve publicly available information from GitHub.

The API is used to obtain data such as:

* User profile information
* Public repositories
* Repository metadata
* Repository statistics
* Programming languages
* Stars and other repository metrics
* GitHub activity information

The retrieved data is processed on the frontend and transformed into dashboard-friendly statistics and visualizations.

---

## Application Workflow

1. User enters a GitHub username
2. Application sends requests to the GitHub API
3. GitHub returns profile and repository data
4. Application processes and organizes the retrieved information
5. Statistics and repository information are displayed
6. Data is presented through interactive dashboard components
7. Users can explore GitHub activity and repository insights from a single interface

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Deepika6689/my-stats-dashboard1.git
cd my-stats-dashboard1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at the local URL displayed in the terminal.

Typically:

```text
http://localhost:5173/
```

---

## Production Build

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Live Demo

The application is deployed on Netlify and can be accessed here:

**https://my-stats-dashboard1.netlify.app**

---

## Future Enhancements

Potential improvements for future versions include:

* Advanced GitHub contribution analytics
* Contribution heatmap visualization
* Detailed commit activity analysis
* Repository comparison
* Advanced language statistics
* GitHub authentication
* Exportable analytics reports
* Improved API caching and performance optimization
* Additional dashboard customization options

---

## Author

**Deepika Sajjan**

* LinkedIn: https://www.linkedin.com/in/deepika-sajjan-22a041284/
* GitHub: https://github.com/Deepika6689
* Live Project: https://my-stats-dashboard1.netlify.app

---

## License

This project is developed for educational and portfolio purposes.

---
