import { Pressable, Text, StyleSheet } from 'react-native'
import { Task } from '../types/Task'

interface Props {
  task: Task
  onToggle: (id: string) => void
}

export default function TodoItem({ task, onToggle }: Props) {
  return (
    <Pressable onPress={() => onToggle(task.id)}>
      <Text style={[styles.text, task.done && styles.done]}>
        {task.title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    paddingVertical: 8,
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
})
