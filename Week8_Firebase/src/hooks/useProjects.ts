import { useState, useEffect } from 'react';
import { Project } from '../types';
import { getProjects, createProject, deleteProject, updateProject } from '../services/projectService';

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);

    async function loadProjects() {
        const data = await getProjects();
        setProjects(data);
    }

    async function handleCreateProject(name: string) {
        await createProject({
            name: name || 'New RPi Project',
            description: 'Test project',
            createdAt: new Date(),
            status: 'offline'
        });
        loadProjects();
    }

    async function handleDeleteProject(id: string) {
        await deleteProject(id);
        loadProjects();
    }

    async function handleStatusChange(projectId: string, currentStatus: string) {
        const statuses = ['offline', 'building', 'testing', 'ready'];
        const current = statuses.indexOf(currentStatus);
        const next = statuses[(current + 1) % statuses.length];
        await updateProject(projectId, { status: next as any });
        loadProjects();
    }

    useEffect(() => {
        loadProjects();
    }, []);

    return { projects, handleCreateProject, handleDeleteProject, handleStatusChange };
}
