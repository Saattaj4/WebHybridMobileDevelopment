import { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Task } from './types/Task'
import TodoInput from './components/Input'
import TodoItem from './components/Item'

const STORAGE_KEY = 'TASKS'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])


  useEffect(() => {
    loadTasks()
  }, [])


  useEffect(() => {
    saveTasks()
  }, [tasks])

  const loadTasks = async () => {
    const json = await AsyncStorage.getItem(STORAGE_KEY)
    if (json) {
      setTasks(JSON.parse(json))
    }
  }

  const saveTasks = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      done: false,
    }
    setTasks([...tasks, newTask]) 
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, done: !task.done }
        : task
    ))
  }

  return (
    <SafeAreaView style={styles.container}>
      <TodoInput onAddTask={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem task={item} onToggle={toggleTask} />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
})
