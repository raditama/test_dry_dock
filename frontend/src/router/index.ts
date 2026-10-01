import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dry-dock',
            name: 'dry-dock',
            component: () => import('@/views/dry-dock/DryDocks.vue'),
        },
        {
            path: '/dry-dock/:id',
            name: 'dry-dock-detail',
            component: () => import('@/views/dry-dock/DryDockDetail.vue'),
        },
        {
            path: '/checklist',
            name: 'checklist',
            component: () => import('@/views/checklist/Checklists.vue'),
        },
        {
            path: '/checklist/:id',
            name: 'checklist-detail',
            component: () => import('@/views/checklist/ChecklistDetail.vue'),
        },
    ],
})

export default router