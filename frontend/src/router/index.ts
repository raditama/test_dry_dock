import DryDocks from '@/views/dry-dock/DryDocks.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dry-dock',
            name: 'dry-dock',
            component: DryDocks,
        },
        {
            path: '/dry-dock/:id',
            name: 'dry-dock-detail',
            component: () => import('@/views/dry-dock/DryDockDetail.vue'),
        },
    ],
})

export default router