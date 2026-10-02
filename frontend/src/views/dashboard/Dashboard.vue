<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getDryDocks } from '@/api/dry-dock.ts'
import type { DryDock } from '@/types/dry-dock.ts'

interface VesselColumn {
    vessel: string
    items: DryDock[]
}

const dryDocks = ref<DryDock[]>([])
const loading = ref(false)
const errorMessage = ref('')

const columns = computed<VesselColumn[]>(() => {
    const grouped = new Map<string, DryDock[]>()

    for (const dryDock of dryDocks.value) {
        const items = grouped.get(dryDock.vessel) ?? []

        items.push(dryDock)
        grouped.set(dryDock.vessel, items)
    }

    return Array.from(grouped, ([vessel, items]) => ({
        vessel,
        items,
    })).sort((a, b) => a.vessel.localeCompare(b.vessel))
})

const fetchDryDocks = async () => {
    try {
        loading.value = true
        errorMessage.value = ''

        const response = await getDryDocks({
            page: 1,
            limit: 100,
        })

        dryDocks.value = response.data
    } catch (error) {
        console.error('Failed to fetch data:', error)
        errorMessage.value = 'Failed to load dry docks. Please try again.'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchDryDocks()
})
</script>

<template>
    <div class="min-h-screen bg-slate-50 p-12 text-slate-900">
        <div class="mb-12 flex items-center justify-between">
            <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
                Dashboard
            </h1>
        </div>

        <p v-if="loading" class="text-sm text-slate-500">
            Loading...
        </p>

        <div v-else-if="errorMessage" class="flex items-center gap-3">
            <p class="text-sm text-red-600">
                {{ errorMessage }}
            </p>

            <button
                class="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 cursor-pointer"
                @click="fetchDryDocks">
                Retry
            </button>
        </div>

        <p v-else-if="columns.length === 0" class="text-sm text-slate-500">
            No dry docks found.
        </p>

        <div v-else>
            <div class="mb-4 text-xl font-semibold tracking-tight text-slate-900">
                Quotes Pending Approval
            </div>
            <div class="flex items-start gap-6 overflow-x-auto p-4 rounded-lg border border-slate-200">
                
                <div v-for="column in columns" :key="column.vessel"
                    class="w-80 shrink-0 rounded-lg border border-slate-200 bg-slate-100 p-4">
                    <div class="mb-4 flex items-center justify-between">
                        <h2 class="text-sm font-semibold text-slate-900">
                            {{ column.vessel }}
                        </h2>

                        <span class="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600">
                            {{ column.items.length }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-3">
                        <div v-for="item in column.items" :key="item.id"
                            class="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-3">
                            <div class="h-16 w-16 shrink-0 rounded-md bg-slate-200"></div>

                            <div class="min-w-0">
                                <p class="truncate text-lg font-semibold text-slate-900">
                                    {{ item.shipyard_name }}
                                </p>

                                <p class="truncate text-sm text-slate-500">
                                    {{ item.dock_list_no }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 mb-4 text-xl font-semibold tracking-tight text-slate-900">
                Pending Yard Quotes
            </div>
            <div class="flex items-start gap-6 overflow-x-auto p-4 rounded-lg border border-slate-200">
                
                <div v-for="column in columns" :key="column.vessel"
                    class="w-80 shrink-0 rounded-lg border border-slate-200 bg-slate-100 p-4">
                    <div class="mb-4 flex items-center justify-between">
                        <h2 class="text-sm font-semibold text-slate-900">
                            {{ column.vessel }}
                        </h2>

                        <span class="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600">
                            {{ column.items.length }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-3">
                        <div v-for="item in column.items" :key="item.id"
                            class="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-3">
                            <div class="h-16 w-16 shrink-0 rounded-md bg-slate-200"></div>

                            <div class="min-w-0">
                                <p class="truncate text-lg font-semibold text-slate-900">
                                    {{ item.shipyard_name }}
                                </p>

                                <p class="truncate text-sm text-slate-500">
                                    {{ item.dock_list_no }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 mb-4 text-xl font-semibold tracking-tight text-slate-900">
                Jobs Awaiting Dock
            </div>
            <div class="flex items-start gap-6 overflow-x-auto p-4 rounded-lg border border-slate-200">
                
                <div v-for="column in columns" :key="column.vessel"
                    class="w-80 shrink-0 rounded-lg border border-slate-200 bg-slate-100 p-4">
                    <div class="mb-4 flex items-center justify-between">
                        <h2 class="text-sm font-semibold text-slate-900">
                            {{ column.vessel }}
                        </h2>

                        <span class="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-600">
                            {{ column.items.length }}
                        </span>
                    </div>

                    <div class="flex flex-col gap-3">
                        <div v-for="item in column.items" :key="item.id"
                            class="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-3">
                            <div class="h-16 w-16 shrink-0 rounded-md bg-slate-200"></div>

                            <div class="min-w-0">
                                <p class="truncate text-lg font-semibold text-slate-900">
                                    {{ item.shipyard_name }}
                                </p>

                                <p class="truncate text-sm text-slate-500">
                                    {{ item.dock_list_no }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>