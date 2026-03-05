import { useState } from 'react';
import { updateProject } from '../services/projectService';

export function useProjectEdit() {
    const [editingId, setEditingId] = useState<string>();
    const [newName, setNewName] = useState<string>('');

    async function handleUpdate(onComplete?: () => void) {
        if (editingId) {
            await updateProject(editingId, { name: newName });
            setEditingId(undefined);
            setNewName('');
            onComplete?.();
        }
    }

    function startEdit(projectId: string | undefined, currentName: string) {
        setEditingId(projectId);
        setNewName(currentName);
    }

    function cancelEdit() {
        setEditingId(undefined);
        setNewName('');
    }

    return { editingId, newName, setNewName, handleUpdate, startEdit, cancelEdit };
}
