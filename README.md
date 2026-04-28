# Portofolio

Personal portofolio and blog. Built with Next.js, Tailwind CSS, and MDX. It showcases my projects, blog posts, and integrations.

## Features

Currently available features/pages:

- Light and Dark mode support.
- Fully responsive design and animations.
- MDX-powered blog and project showcases with syntax highlighting.
- Several dynamic features are powered by a [custom Go API backend](https://github.com/ccrsxx/api), including:
  - Content statistics, views, and likes tracking.
  - Guestbook authenticated via custom GitHub OAuth.
  - Real-time Spotify and Jellyfin currently playing status.

## Development

Steps to run the project locally:

1. Clone the repository

   ```bash
   git clone https://github.com/ccrsxx/portofolio
   ```

1. Change directory to the project

   ```bash
   cd portofolio
   ```

1. Install dependencies

   ```bash
   npm install
   ```

1. Set up environment variables
   Create a copy of the `.env.example` file and name it `.env.local`. Fill in credentials as needed.

   ```bash
   cp .env.example .env.local
   ```

1. Run the app in development

   ```bash
   npm run dev
   ```
