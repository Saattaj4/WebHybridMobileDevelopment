import { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

interface Props {
  onAddTask: (title: string) => void
}

export default function TodoInput({ onAddTask }: Props) {
  const [text, setText] = useState('')

  const handleSave = () => {
    if (!text.trim()) return
    onAddTask(text)
    setText('')
  }

  return (
    <View style={styles.row}>
      <TextInput
        placeholder="Enter task"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 8,
    padding: 8,
    fontSize: 16,
  },
})
