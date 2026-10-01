<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'

const sidebarCollapsed = ref(false)
</script>

<template>
    <div class="min-h-screen bg-slate-50">
        <Sidebar @collapsed="sidebarCollapsed = $event" />

        <main class="min-w-0 transition-all duration-300" :class="sidebarCollapsed ? 'ml-20' : 'ml-60'">
            <RouterView />
        </main>
    </div>
</template>