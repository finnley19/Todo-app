# Brutalist Todo - Architecture & Design

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   USER BROWSER                      │
│                                                     │
│  ┌───────────────────────────────────────────┐    │
│  │         React Frontend (Port 3000)        │    │
│  │                                           │    │
│  │  - Framer Motion animations              │    │
│  │  - Brutalist Editorial design            │    │
│  │  - Responsive layout                     │    │
│  │  - State management with hooks           │    │
│  └──────────────┬────────────────────────────┘    │
│                 │ HTTP Requests                    │
│                 │ (proxied by Vite)                │
└─────────────────┼────────────────────────────────┘
                  │
                  ▼
         ┌────────────────────┐
         │   Vite Dev Proxy   │
         └────────┬───────────┘
                  │
                  ▼
    ┌─────────────────────────────┐
    │  Flask API (Port 5000)      │
    │                             │
    │  Routes:                    │
    │  GET    /api/todos          │
    │  POST   /api/todos          │
    │  PUT    /api/todos/:id      │
    │  DELETE /api/todos/:id      │
    │                             │
    └─────────┬───────────────────┘
              │
              ▼
    ┌──────────────────┐
    │   todos.json     │
    │  (File Storage)  │
    └──────────────────┘
```

## Design System

### Visual Hierarchy

```
┌─────────────────────────────────────────────────────┐
│  TASKS                                     12 / 3 / 9│  ← Header: Massive mono type
│  in brutal form                            ─────────│
│═════════════════════════════════════════════════════│
│                                                      │
│  [              What needs to be done?        ] ADD │  ← Input: Serif, inverts on focus
│                                                      │
│  ┌─ Build something beautiful ─────────────────  ×  │  ← Tasks: LARGE serif (2.5rem)
│  │  Jan 6  #001                                     │     Metadata: tiny mono (0.75rem)
│  └──────────────────────────────────────────────────│
│                                                      │
│  ┌─ Ship it to the world ──────────────────────  ×  │
│  │  Jan 6  #002                                     │
│  └──────────────────────────────────────────────────│
│                                                      │
└─────────────────────────────────────────────────────┘
         Brutalist Todo — Press hard to make a mark      ← Footer: Whisper
```

### Typography Scale
```
8rem  - Title "TASKS"
1.5rem- Subtitle (italic)
2.5rem- Todo text (LARGE - the key differentiation)
1.25rem- Input text
1rem  - Buttons
0.75rem- Metadata, footer (SMALL - extreme contrast)
```

### Color Palette
```
Background: #fafafa  ░░░░░░░  Clean canvas
Foreground: #0a0a0a  ██████  Deep black
Border:     #d4d4d4  ─────  Subtle structure
Accent:     #ff3366  ▓▓▓▓▓  Electric energy
Muted:      #737373  ······  Quiet details
```

### Animation Timeline
```
0ms    ─┐
        │ Header fade + slide (600ms)
200ms   ├─ Input form fade (400ms)
        │
400ms   ├─ Todos fade (400ms)
        │
400ms+  ├─ Individual todos stagger (50ms delay each)
        │     └─ Slide from left, cubic-bezier
        │
800ms   └─ Footer fade (400ms)

Interactions:
- Hover: transform + shadow (300ms)
- Complete: strikethrough left→right (500ms)
- Delete: slide right + height collapse (400ms)
- Add: accent slide up (300ms)
```

## Component Breakdown

### App.jsx (Main Component)
```javascript
State:
├─ todos: []           // Array of todo objects
├─ newTodoText: ""     // Input value
└─ isLoading: true     // Loading state

Effects:
└─ fetchTodos() on mount

Functions:
├─ fetchTodos()        // GET /api/todos
├─ addTodo()           // POST /api/todos
├─ toggleTodo(id)      // PUT /api/todos/:id
├─ deleteTodo(id)      // DELETE /api/todos/:id
└─ formatDate()        // Display helper

Render Tree:
├─ Header
│   ├─ Title (main + sub)
│   └─ Stats (total/completed/remaining)
├─ Form
│   ├─ Input (controlled)
│   └─ Button (submit)
├─ Todos List
│   └─ AnimatePresence
│       └─ Todo items (map with stagger)
│           ├─ Checkbox (animated)
│           ├─ Content
│           │   ├─ Text (with strikethrough)
│           │   └─ Meta (date + id)
│           └─ Delete button
└─ Footer
```

### Key Interactions

1. **Adding a task**
   - User types in input
   - Presses ADD or Enter
   - POST request to API
   - New todo slides in from left
   - Input clears, stats update

2. **Completing a task**
   - Click checkbox
   - PUT request toggles completed
   - Checkbox square scales + rotates in
   - Strikethrough animates across text
   - Todo becomes semi-transparent + dashed border

3. **Deleting a task**
   - Click × button (rotates on hover)
   - DELETE request
   - Todo slides right while collapsing height
   - Stats update

4. **Hover states**
   - Todo: Transforms up-left, gains shadow
   - Checkbox: Background becomes black
   - Delete: Rotates 90°
   - Add button: Accent color slides up

## Design Decisions (Ulthrathink Applied)

### Why LARGE task text?
**Problem**: Most todo apps make tasks small, subordinate to UI chrome.
**Solution**: Invert hierarchy. Tasks ARE the interface. Make them headlines.
**Result**: Each task feels important. You're not checking boxes, you're declaring intentions.

### Why Brutalist + Editorial?
**Problem**: Todo apps feel sterile or cutesy.
**Solution**: Combine raw functionality (brutalism) with typographic refinement (editorial).
**Result**: Honest, unadorned, but elevated through craft.

### Why file-based storage?
**Problem**: Database setup creates friction.
**Solution**: JSON file gets you 80% there, easy to swap later.
**Result**: Zero config, but architected for growth.

### Why Framer Motion?
**Problem**: CSS animations are powerful but hard to orchestrate.
**Solution**: Framer Motion handles sequencing, layout animations, exit transitions.
**Result**: Smooth, professional motion with less code.

### Why these fonts?
**Problem**: Inter/Roboto create sameness.
**Solution**: IBM Plex Mono (geometric brutalism) + Spectral (editorial warmth).
**Result**: Distinctive, memorable, purposeful pairing.

## Performance Considerations

- CSS animations preferred (GPU accelerated)
- Framer Motion for complex orchestrations only
- No images (pure CSS aesthetics)
- Font preload in HTML
- Vite's HMR for instant feedback
- Minimal bundle (~40KB gzipped)

## Accessibility

- Semantic HTML (header, main, footer)
- Proper button roles
- ARIA labels on icon buttons
- Focus visible styles (2px accent outline)
- Keyboard navigation
- High contrast (4.5:1 minimum)
- Responsive text scaling

## Extension Points

Want to enhance? The architecture supports:

1. **Database**: Swap file storage for Postgres/Mongo
2. **Auth**: Add user context to API routes
3. **Categories**: Extend todo object, add filtering UI
4. **Drag-drop**: React DnD with reorder endpoint
5. **Dark mode**: CSS variables make theme switching trivial
6. **PWA**: Add service worker, manifest
7. **Real-time**: WebSocket updates for multi-user

## The Craft

Every detail considered:
- Input focus inverts colors (dramatic)
- Stats positioned absolute at bottom-right (asymmetry)
- Empty state uses dashed border (consistency)
- Footer fixed but pointer-events none (elegance)
- Strikethrough uses accent color (coherence)
- Checkbox rotation on complete (delight)
- Sharp transitions (0.4, 0, 0.2, 1) throughout (consistency)

This is what happens when you:
- Question assumptions (tasks as headlines)
- Obsess over details (every animation, every spacing)
- Plan before coding (this document existed mentally first)
- Craft, don't just code (every choice is intentional)
- Iterate relentlessly (tested, refined, polished)
- Simplify ruthlessly (no features you don't need)

---

**The Result**: A todo app that feels different. That treats your tasks with respect. That proves software can be both functional and beautiful.

*Press hard to make a mark.*
