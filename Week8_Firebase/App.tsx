import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useProjects } from './src/hooks/useProjects';
import { useProjectEdit } from './src/hooks/useProjectEdit';
import { ProjectList } from './src/components/ProjectList';

export default function App() {
  const [newProjectName, setNewProjectName] = useState<string>('');
  const { projects, handleCreateProject, handleDeleteProject, handleStatusChange } = useProjects();
  const { editingId, newName, setNewName, handleUpdate, startEdit, cancelEdit } = useProjectEdit();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pi Build Monitor</Text>

      <TextInput
        placeholder="Project name"
        value={newProjectName}
        onChangeText={setNewProjectName}
        style={styles.input}
      />
      <Button 
        title="Create Project" 
        onPress={() => {
          handleCreateProject(newProjectName);
          setNewProjectName('');
        }} 
      />

      <ProjectList
        projects={projects}
        editingId={editingId}
        editValue={newName}
        onEditChange={setNewName}
        onChangeStatus={handleStatusChange}
        onRename={(id, name) => startEdit(id, name)}
        onSave={() => handleUpdate(() => {})}
        onCancel={cancelEdit}
        onDelete={handleDeleteProject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0d1117'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#58a6ff'
  },

  input: {
    borderWidth: 1,
    borderColor: '#30363d',
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4
  }
});