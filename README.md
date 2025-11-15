# 📊 GitHub Analyzers

A modern dashboard to visualize GitHub stats, repositories, and contributions in a sleek, interactive interface.


---

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://my-stats-dashboard1.netlify.app)



---

## 🛠 Tech Stack & Tools

![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn-ui](https://img.shields.io/badge/-shadcn_ui-8B5CF6?style=for-the-badge)
![Netlify](https://img.shields.io/badge/-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

---
## 🧩 Architecture Overview
--
                     ┌────────────────────────┐
                     │      GitHub API        │
                     └─────────────┬──────────┘
                                   │
                      Fetches User, Repo & Stats
                                   │
           ┌───────────────────────┴────────────────────────┐
           │                                                │
┌──────────▼──────────┐                         ┌───────────▼───────────┐
│  Data Processing     │                         │   UI Components       │
│  (API utils & hooks) │                         │ (Charts, Cards, UI)  │
└──────────┬──────────┘                         └───────────┬───────────┘
           │                                                │
           └───────────┬────────────────────────────────────┘
                       │
            ┌──────────▼──────────┐
            │      Dashboard       │
            │   (Interactive UI)   │
            └──────────────────────┘


## 📁 Project Structure
```
├── public/ # Static assets
├── src/ # React components, pages, and logic
├── package.json # Project metadata & dependencies
├── package-lock.json
├── vite.config.ts # Vite configuration
├── tailwind.config.ts # Tailwind CSS config
├── tsconfig.json # TypeScript configuration
├── README.md # Project documentation
```
---

## 📦 Installation & Usage

1.Clone the repository:
```bash
git clone https://github.com/Deepika6689/my-stats-dashboard1.git
```
2.Navigate into the project folder:
```
cd my-stats-dashboard1
```
3.Install dependencies:
```
npm install
```
4.Run the development server:
```
npm run dev
```
5.Open your browser and visit:
```
http://localhost:8080
```
> 📌 This project helps visualize GitHub stats in a clean and interactive way.

🙋‍♀️ Author

Made with ❤️ by Deepika

Feel free to connect or contribute!



