# Brutalist Todo

> "Press hard to make a mark"

A todo application that treats your tasks like headlines. Built with React, Flask, and a commitment to distinctive design.

## 🚀 Quick Start

**See [QUICKSTART.md](QUICKSTART.md) for detailed instructions.**

### Fastest Way to Run:

```bash
# Mac/Linux:
chmod +x start.sh && ./start.sh

# Windows:
start.bat
```

Then open **http://localhost:3000** in your browser.

**Prerequisites**: Python 3.8+ and Node.js 18+

## The Vision

This isn't just another todo app. It's a statement about how we interact with our tasks. Every todo is rendered as a **large typographic element** with dramatic scale contrast, treating each item like an editorial headline rather than a checkbox in a list.

### Design Philosophy

**Aesthetic Direction:** Brutalist Editorial
- Raw, honest typography (IBM Plex Mono + Spectral)
- Stark monochrome palette with electric accent
- Dramatic scale hierarchy
- Sharp, geometric animations
- Physical interactions (shadows on hover, strikethrough animations)

**The Unforgettable Element:**
Tasks are displayed in LARGE type (2.5rem at full scale) while metadata whispers in small caps. This inverts the typical todo app hierarchy and makes each task feel important.

## Architecture

```
todo-app/
├── backend/          Flask API with file-based storage
│   ├── app.py       RESTful endpoints
│   ├── requirements.txt
│   └── todos.json   (auto-generated)
├── frontend/         React + Vite
│   ├── src/
│   │   ├── App.jsx  Main component
│   │   ├── App.css  Brutalist styles
│   │   ├── index.css Global styles
│   │   └── main.jsx Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

### Backend (Flask)
- Simple RESTful API
- File-based JSON storage (easily swappable for a database)
- CORS enabled for local development
- Endpoints: GET, POST, PUT, DELETE for todos

### Frontend (React)
- Vite for blazing fast development
- Framer Motion for orchestrated animations
- CSS variables for consistent design system
- Responsive down to 320px

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will run on `http://localhost:3000`

The frontend is configured to proxy API requests to the backend automatically.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo (toggle completion) |
| DELETE | `/api/todos/:id` | Delete a todo |

### Example Request

```javascript
// Create a new todo
fetch('/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Build something beautiful' })
})
```

## Design Details

### Typography
- **IBM Plex Mono**: Brutalist backbone, used for UI elements, stats, metadata
- **Spectral**: Editorial refinement, used for task text and body copy
- Dramatic scale: Tasks are 1.5-2.5rem, metadata is 0.75rem

### Color System
```css
--color-bg: #fafafa      /* Clean background */
--color-fg: #0a0a0a      /* Deep black for contrast */
--color-border: #d4d4d4  /* Subtle borders */
--color-accent: #ff3366  /* Electric accent for actions */
--color-muted: #737373   /* Metadata and secondary info */
```

### Animations
- **Page load**: Staggered reveals with 50ms delays
- **Todo add**: Slide in from left with sharp easing
- **Todo delete**: Slide out to right with height collapse
- **Completion**: Strikethrough animates left to right over 500ms
- **Hover**: Transform + shadow creates physical depth

### Interactions
- Checkbox: Scales accent square from 0 to 1 with rotation
- Delete button: Rotates 90° on hover
- Add button: Accent color slides up from bottom
- Input: Background inverts on focus

## Production Build

```bash
# Frontend
cd frontend
npm run build
# Output in frontend/dist/

# Backend
# Use gunicorn for production
pip install gunicorn
gunicorn -w 4 app:app
```

## Future Enhancements

The architecture is designed to scale:
- Replace file storage with PostgreSQL/MongoDB
- Add user authentication
- Implement categories/tags
- Add drag-and-drop reordering
- Progressive Web App features
- Dark mode variant (could be even more striking)

## Philosophy

Built following principles from:
- **Ulthrathink**: Question assumptions, obsess over details, craft don't code
- **Frontend Design**: Distinctive aesthetics, avoid generic AI patterns
- **Brutalism**: Raw, honest, functional
- **Editorial Design**: Hierarchy, typography, white space

Every interaction was considered. Every animation has purpose. Every design decision creates cohesion.

---

*"Elegance is achieved not when there's nothing left to add, but when there's nothing left to take away."*
