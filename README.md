# Task Manager

## About

Task Manager is a responsive web application built with Next.js and TypeScript for managing daily tasks.

The application connects to an external REST API to create, retrieve, update, and delete tasks. The project focuses on building a clean user interface, managing application state, handling API requests, and providing a responsive user experience.

## Stack Used

* Next.js
* React
* TypeScript
* Tailwind CSS
* REST API
* Git & GitHub

## Packages

* `next` — Application framework
* `react` — User interface development
* `react-icons` — Interface icons
* `tailwindcss` — Styling and responsive design

## Features

* Create tasks
* View tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* Connect to an external REST API
* Handle API responses and errors
* Responsive design
* Client-side state management

## API Integration

The frontend communicates with an external backend API to manage task data.

The application sends HTTP requests to the API for operations such as:

```text
GET     /api/v1/tasks
POST    /api/v1/tasks
PATCH   /api/v1/tasks/:id
DELETE  /api/v1/tasks/:id
```

The backend and database are maintained separately from this frontend repository.

## Installation

Clone the repository:

```bash
git clone https://github.com/Iamemmaose/taskmanager.git
```

Navigate into the project:

```bash
cd taskmanager
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Project Purpose

This project was built to strengthen practical frontend development skills, particularly working with Next.js, TypeScript, API integration, asynchronous data fetching, state management, CRUD operations, and responsive UI development.
