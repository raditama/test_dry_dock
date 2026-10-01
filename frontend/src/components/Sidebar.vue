<script setup lang="ts">
import { ref, watch } from 'vue'

const collapsed = ref(false)

const emit = defineEmits<{
    collapsed: [value: boolean]
}>()

watch(collapsed, (value) => {
    emit('collapsed', value)
})

const menus = [
    {
        label: 'Dashboard',
        path: '/',
        icon: 'pi pi-home',
    },
    {
        label: 'Specification Groups',
        path: '#',
        icon: 'pi pi-list',
    },
    {
        label: 'Work Order Master',
        path: '#',
        icon: 'pi pi-file-edit',
    },
    {
        label: 'Checklist',
        path: '/checklist',
        icon: 'pi pi-check-square',
    },
    {
        label: 'Dry Docks',
        path: '/dry-dock',
        icon: 'pi pi-building',
    },
]

</script>

<template>
    <aside
        class="fixed left-0 top-0 z-50 flex h-screen flex-col bg-slate-950 text-slate-300 transition-all duration-100"
        :class="collapsed ? 'w-20' : 'w-60'">

        <!-- Logo -->
        <div class="flex h-20 items-center border-b border-slate-800 overflow-hidden"
            :class="collapsed ? 'justify-center px-3' : 'justify-between px-5'">
            <h2 v-if="!collapsed" class="whitespace-nowrap text-lg font-semibold tracking-tight text-sky-400">
                Dry Dock
            </h2>

            <button type="button"
                class="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-white cursor-pointer"
                @click="collapsed = !collapsed">
                <i class="pi" :class="collapsed ? 'pi-angle-right' : 'pi-angle-left'"></i>
            </button>
        </div>

        <!-- Menu -->
        <nav class="flex flex-1 flex-col gap-2 px-3 py-4">
            <RouterLink v-for="menu in menus" :key="menu.label" :to="menu.path"
                class="group flex items-center rounded-md py-2.5 text-sm font-medium transition-colors" :class="[
                    collapsed
                        ? 'justify-center px-2'
                        : 'gap-3 px-3',
                    'text-slate-400 hover:bg-slate-800 hover:text-sky-400',
                ]">
                <i :class="menu.icon" class="text-base" />

                <span v-if="!collapsed" class="truncate">
                    {{ menu.label }}
                </span>

                <span v-if="collapsed"
                    class="pointer-events-none absolute left-20 ml-2 whitespace-nowrap rounded-md bg-slate-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {{ menu.label }}
                </span>
            </RouterLink>
        </nav>
    </aside>
</template>