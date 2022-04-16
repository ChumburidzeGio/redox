export interface TaskDts {
    id: string
    name: string
    status: 'completed' | 'active' | 'cancelled'
    appointment?: string
    stage?: string
}

export interface RelocationDts {
    id: string
    name: string
    email: string
    from: {
        code: string
        name: string
        emoji: string
    }
    createdAt: string
    updatedAt: string
    completedAt: string
    canceledAt: string
    progress: number
    status: 'completed' | 'active' | 'cancelled'
    tasks: TaskDts[]
}
