import { useReducer } from 'react'
import { Task } from '../types/Task'

type Action =
  | { type: 'ADD'; title: string }
  | { type: 'TOGGLE'; id: string }

function reducer(tasks: Task[], action: Action) {
  switch (action.type) {
    case 'ADD':
      return [...tasks, { 
        id: Date.now().toString(), 
        title: action.title, 
        done: false 
      }]
    case 'TOGGLE':
      return tasks.map(t => 
        t.id === action.id ? { ...t, done: !t.done } : t
      )
    default:
      return tasks
  }
}

export function useTodos() {
  const [tasks, dispatch] = useReducer(reducer, [])

  return {
    tasks,
    addTask: (title: string) => dispatch({ type: 'ADD', title }),
    toggleTask: (id: string) => dispatch({ type: 'TOGGLE', id })
  }
}