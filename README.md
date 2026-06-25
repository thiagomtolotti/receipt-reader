# Receipt App

## Description

This is a prototype of a receipt reader application that uses AI to extract information from receipts. The application is built using a modern tech stack, including FastAPI for the backend and React for the frontend.

You can add an image of a receipt, and the AI will extract the relevant information, then the information will be displayed in a user-friendly format where you can review it and then save it to a local database.

## Getting Started

### Prerequisites

- Python 3.12
- Node.js 20
- UV
- Make

### Installation

To install the necessary dependencies, run the following command:

```bash
cd frontend && npm install
cd backend && uv sync
```

### Setup

To set up the environment variables, create a `.env` file by copying the `.env.example` file and filling in the required values.

### Usage

To run the backend, use the following command:

```bash
cd backend && make dev
```

To run the frontend, use the following command:

```bash
cd frontend && npm run dev
```

## Stack

For the AI usage, a repository pattern was applied to allow the use of different providers.

Currently, Gemini is used, but it can be easily replaced by another provider.

### Backend

- Python 3.12
- FastAPI
- UV

### Frontend

- React 19
- Vite
- Shadcn
- Tanstack Router
- Tanstack Query
