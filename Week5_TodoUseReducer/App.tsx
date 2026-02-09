import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoInput from './components/Input'
import TodoItem from './components/Item'
import { useTodos } from './hooks/useTodos'

export default function App() {
  const { tasks, addTask, toggleTask } = useTodos()

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
})