import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

const API_URL = '/api/todos'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodoText, setNewTodoText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodoText.trim()) return

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodoText })
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setNewTodoText('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      })
      const updatedTodo = await response.json()
      setTodos(todos.map(t => t.id === id ? updatedTodo : t))
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setTodos(todos.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    remaining: todos.filter(t => !t.completed).length
  }

  if (isLoading) {
    return (
      <div className="app loading">
        <motion.div
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          LOADING
        </motion.div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Header with dramatic typography */}
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="title">
          <span className="title-main">TASKS</span>
          <span className="title-sub">in brutal form</span>
        </h1>
        
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">total</span>
          </div>
          <div className="stat-divider">/</div>
          <div className="stat">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">done</span>
          </div>
          <div className="stat-divider">/</div>
          <div className="stat">
            <span className="stat-value">{stats.remaining}</span>
            <span className="stat-label">left</span>
          </div>
        </div>
      </motion.header>

      {/* Input form */}
      <motion.form
        className="add-form"
        onSubmit={addTodo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="What needs to be done?"
          className="add-input"
        />
        <button type="submit" className="add-button">
          ADD
        </button>
      </motion.form>

      {/* Todo list */}
      <motion.div
        className="todos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <AnimatePresence mode="popLayout">
          {todos.map((todo, index) => (
            <motion.div
              key={todo.id}
              className={`todo ${todo.completed ? 'completed' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.4, 0, 0.2, 1]
              }}
              layout
            >
              <button
                className="todo-checkbox"
                onClick={() => toggleTodo(todo.id)}
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                <motion.div
                  className="checkbox-inner"
                  initial={false}
                  animate={{
                    scale: todo.completed ? 1 : 0,
                    rotate: todo.completed ? 0 : 180
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </button>

              <div className="todo-content">
                <div className="todo-text">
                  {todo.text}
                  {todo.completed && (
                    <motion.div
                      className="strikethrough"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    />
                  )}
                </div>
                <div className="todo-meta">
                  <span className="todo-date">{formatDate(todo.createdAt)}</span>
                  <span className="todo-id">#{todo.id.toString().padStart(3, '0')}</span>
                </div>
              </div>

              <button
                className="todo-delete"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete task"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {todos.length === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="empty-text">No tasks yet.</p>
            <p className="empty-subtext">Add one above to get started.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="footer-text">
          Brutalist Todo <span className="footer-divider">—</span> Press hard to make a mark
        </p>
      </motion.footer>
    </div>
  )
}

export default App
