import { FlatList } from 'react-native';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
    projects: Project[];
    editingId?: string;
    editValue: string;
    onEditChange: (text: string) => void;
    onChangeStatus: (projectId: string, status: string) => void;
    onRename: (projectId: string | undefined, name: string) => void;
    onSave: () => void;
    onCancel: () => void;
    onDelete: (projectId: string) => void;
}

export function ProjectList({
    projects,
    editingId,
    editValue,
    onEditChange,
    onChangeStatus,
    onRename,
    onSave,
    onCancel,
    onDelete
}: ProjectListProps) {
    return (
        <FlatList
            data={projects}
            keyExtractor={(item) => item.id || ''}
            renderItem={({ item }) => (
                <ProjectCard
                    item={item}
                    isEditing={editingId === item.id}
                    editValue={editValue}
                    onEditChange={onEditChange}
                    onChangeStatus={() => item.id && onChangeStatus(item.id, item.status)}
                    onRename={() => onRename(item.id, item.name)}
                    onSave={onSave}
                    onCancel={onCancel}
                    onDelete={() => item.id && onDelete(item.id)}
                />
            )}
        />
    );
}
