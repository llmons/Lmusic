# Lmusic

<div align="center">

![Lmusic Logo](https://img.shields.io/badge/Lmusic-Music%20Player-blue)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](LICENSE)
[![Go](https://img.shields.io/badge/Go-1.24.3-00ADD8)](go.mod)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)](ui/package.json)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB)](ui/package.json)

</div>

<div align="center">
  <strong>A modern music player with seamless integration of multiple music platforms.</strong>
</div>

<br />

## ✨ Features

- 🎵 Stream music from multiple sources (NetEase Cloud Music, Tencent Music)
- 🎨 Modern and elegant user interface
- 🌊 Smooth animated lyrics display
- 📱 Responsive design for various screen sizes
- 🎛️ Advanced playback controls (play/pause, previous/next, volume, mode switching)
- 📋 Playlist management and navigation

## 📸 Screenshots

_Screenshots coming soon_

## 🛠️ Architecture

Lmusic is built with a clean architecture, separating the backend and frontend components:

### Backend (Go)

- **[Gin](https://github.com/gin-gonic/gin)**: High-performance HTTP web framework
- **[Wire](https://github.com/google/wire)**: Compile-time dependency injection
- **[Viper](https://github.com/spf13/viper)**: Configuration management

### Frontend (React/Next.js)

- **[Next.js](https://nextjs.org/)**: React framework with server-side rendering
- **[React](https://reactjs.org/)**: UI library
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Zustand](https://github.com/pmndrs/zustand)**: State management
- **[Framer Motion](https://www.framer.com/motion/)**: Animation library
- **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible UI components

## 🚀 Getting Started

### Prerequisites

- Go 1.24 or higher
- Node.js 18 or higher
- npm or yarn

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/llmons/Lmusic.git
cd Lmusic
```

2. Run the backend server:

```bash
go run cmd/main.go
```

The API server will start at `http://localhost:8080`

### Frontend Setup

1. Navigate to the UI directory:

```bash
cd ui
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The frontend will be available at `http://localhost:3000`

## 📖 API Documentation

### NetEase Music API

- `GET /netease/song/:id`: Get song details
- `GET /netease/playlist/:id`: Get playlist details

### Tencent Music API

- `GET /tencent/song/:id`: Get song details
- `GET /tencent/playlist/:id`: Get playlist details

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/llmons/Lmusic/issues).

## 📜 License

This project is licensed under the [Apache 2.0 License](LICENSE) - see the LICENSE file for details.

## 📮 Contact

- GitHub: [@llmons](https://github.com/llmons)
