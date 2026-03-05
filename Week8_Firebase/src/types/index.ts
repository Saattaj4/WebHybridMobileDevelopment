export interface Project {
    id?: string;
    name: string;
    description: string;
    createdAt: Date;
    status: 'offline' | 'building' | 'testing' | 'ready';
}

