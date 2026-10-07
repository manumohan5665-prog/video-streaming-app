# 🎬 VidTube

> A modern, responsive video streaming platform built with React, Vite, and modern frontend technologies.

VidTube is a YouTube-inspired video streaming web application designed to provide a smooth and engaging experience for discovering, watching, organizing, and managing videos.

The project was built from scratch with a focus on **React fundamentals, reusable components, routing, state management, responsive design, performance, and production deployment**.


## 🌐 Live Demo

🔗 **Live Website:**  
https://vidtube4.netlify.app/

🔗 **GitHub Repository:**  
https://github.com/manumohan5665-prog/video-streaming-app.git


## 📸 Screenshots

### 🏠 Home Page

![VidTube Home](./src/assets/Desktop%20Home.jpeg)

### 🔎 Explore Page

![VidTube Explore](./src/assets/Desktop%20Explore.jpeg)

### 🔥 Trending Page

![VidTube Trending](./src/assets/Desktop%20Trending.jpeg)

### 🎬 Video Player

![VidTube Video Player](./src/assets/Desktop%20Videoplayer.jpeg)


### 📱 Mobile Responsive

![VidTube Mobile Home](./src/assets/Mobile%20Home.jpeg)
![VidTube Mobile Explore](./src/assets/Mobile%20Explore.jpeg)
![VidTube Mobile Trending](./src/assets/Mobile%20Trending.jpeg)
![VidTube Video Player](./src/assets/Mobile%20Videoplayer.jpeg)


# ✨ Features

## 🏠 Home

- Featured video section
- Trending videos
- Recommended videos
- Continue Watching
- Category navigation
- Responsive video grid
- Video card hover effects
- Loading skeletons

## 🔎 Search & Explore

- Search videos by title
- Search through URL parameters
- Filter videos by category
- Sort videos by:
  - Newest
  - Most Viewed
  - Title A-Z
  - Title Z-A
- Dynamic result count
- Empty search state

## 🔥 Trending

- Dedicated Trending page
- Trending video ranking
- Ranked video cards
- Trending badges
- Video statistics
- Responsive layout

## 📂 Categories

VidTube supports multiple video categories:

- 🎓 Education
- 🎵 Music
- 😂 Comedy
- 🏆 Sports
- ✈️ Travel

Each category has its own dedicated route and video listing.

Example:

/category/education
/category/music
/category/comedy
/category/sports
/category/travel


## 🎬 Video Player
- YouTube/Vimeo embedded player
- Video title and description
- Creator information
- View count
- Upload information
- Like functionality
- Favorite functionality
- Watch Later functionality
- Add to Playlist
- Share functionality
- Previous/Next playlist navigation
- Related videos
- Recently Watched tracking
- Automatic scroll-to-player when navigating between videos
- Player loading state
- Player error state

## ❤️ Favorites
Users can save videos to their Favorites collection.
Features:
- Add/remove favorites
- Persistent storage
- Favorite count
- Empty state
- Responsive layout

## 🕒 Watch Later
Save videos to watch later.
Features:
- Add/remove videos
- Persistent storage
- Watch Later count
- Empty state
- Responsive layout

## 📋 Playlists
VidTube includes playlist management.
Users can:
- Create playlists
- Delete playlists
- Add videos to playlists
- Remove videos from playlists
- Open individual playlists
- Play videos from playlists
- Navigate between playlist videos
- Play all videos

## 🕘 Recently Watched
VidTube automatically tracks recently watched videos.
Features:
- Stores recently watched video IDs
- Displays Continue Watching section
- Prevents duplicate entries
- Keeps the latest 6 videos
- Clear watch history option
- Persistent using localStorage

## 🔔 Notifications
A responsive notification dropdown provides sample notifications with:
- Notification badge
- Notification list
- Mobile responsive layout

## 👤 Profile Menu
The navbar includes a profile dropdown with:
- User profile
- Settings
- Sign out

## 📱 Responsive Design
VidTube is designed to work across:
- Desktop
- Laptop
- Tablet
- Mobile

## Responsive features include:
- Mobile hamburger menu
- Slide-out sidebar
- Responsive video grids
- Mobile navbar
- Responsive video player
- Mobile-friendly dropdowns
- Adaptive typography and spacing

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- Vite
- React Router DOM

### Styling
- CSS3
- CSS Grid
- CSS Flexbox
- CSS Variables
- Responsive Media Queries

### Icons
- Lucide React

### State Management
- React Context API
- React Hooks
- localStorage

### Video
- YouTube / Vimeo embedded players

### Development Tools
- VS Code
- Git
- GitHub
- Chrome DevTools

### Deployment
- Netlify


# 📁 Project Structure

VidTube/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── EmptyState.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── VideoCard.jsx
│   │   └── VideoCardSkeleton.jsx
│   │
│   ├── context/
│   │   └── VideoContext.jsx
│   │
│   ├── data/
│   │   └── videos.js
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js
│   │
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Explore.jsx
│   │   ├── Trending.jsx
│   │   ├── Category.jsx
│   │   ├── Video.jsx
│   │   ├── Favorites.jsx
│   │   ├── WatchLater.jsx
│   │   ├── Playlists.jsx
│   │   ├── PlaylistDetails.jsx
│   │   └── NotFound.jsx
│   │
│   ├── utils/storage.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

# 🧭 Application Routes

Route	                Description
/	                    Home page
/explore	            Search, filter and sort videos
/trending	            Trending videos
/category/:category	    Category videos
/video/:id	            Video player
/favorites	            Favorite videos
/watch-later	        Watch Later videos
/playlists	            Playlist collection
/playlists/:id	        Individual playlist
*	                    404 page