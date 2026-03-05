import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Project } from '../types';

interface ProjectCardProps {
    item: Project;
    isEditing: boolean;
    editValue: string;
    onEditChange: (text: string) => void;
    onChangeStatus: () => void;
    onRename: () => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: () => void;
}

export function ProjectCard({
    item,
    isEditing,
    editValue,
    onEditChange,
    onChangeStatus,
    onRename,
    onSave,
    onCancel,
    onDelete
}: ProjectCardProps) {
    return (
        <View style={styles.mini}>
            {isEditing ? (
                <TextInput
                    value={editValue}
                    onChangeText={onEditChange}
                    style={styles.input}
                    autoFocus
                />
            ) : (
                <Text style={styles.projectName}>{item.name}</Text>
            )}

            <Text style={styles.statusText}>Status: {item.status}</Text>

            <View style={styles.row}>
                <Button title="Change status" onPress={onChangeStatus} />

                {isEditing ? (
                    <>
                        <Button title="Save" onPress={onSave} />
                        <Button title="Cancel" onPress={onCancel} />
                    </>
                ) : (
                    <Button title="Rename" onPress={onRename} />
                )}

                <Button title="Delete" onPress={onDelete} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mini: {
        marginBottom: 12,
        padding: 12,
        backgroundColor: '#161b22',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#30363d'
    },
    projectName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#c9d1d9',
        marginBottom: 4
    },
    statusText: {
        fontSize: 14,
        color: '#8b949e',
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#30363d',
        backgroundColor: '#0d1117',
        color: '#c9d1d9',
        padding: 8,
        marginBottom: 10,
        borderRadius: 4
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    }
});
