<script setup lang="ts">
import { getDryDock } from '@/api/dryDock'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'

interface DryDock {
    id: number
    vessel: string
    dock_list_no: string
    description: string
    shipyard_name: string
    shipyard_detail: string
    planned_start_date: string
    planned_end_date: string
    actual_start_date: string
    actual_end_date: string
    account_code: string
    budget: string
    responsible_bank: string
    status: string
    priority: string
}

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const dryDock = ref<DryDock | null>(null)

const fetchDryDock = async (): Promise<void> => {
    const id = Number(route.params.id)

    if (!id) return

    try {
        loading.value = true

        const response = await getDryDock(id)

        dryDock.value = response.data
    } catch (error) {
        console.error('Failed to get dry dock:', error)
    } finally {
        loading.value = false
    }
}

const formatDate = (date: string | null | undefined): string => {
    if (!date) return '-'

    const [year, month, day] = date.split('-')

    return `${day}/${month}/${year}`
}

const formatCurrency = (value: string | number | null | undefined): string => {
    if (value == null || value === '') return '-'

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(Number(value))
}

const goBack = (): void => {
    router.back()
}

onMounted(() => {
    fetchDryDock()
})
</script>

<template>
    <div class="min-h-screen bg-slate-50 p-12 text-slate-900">
        <div class="mb-12 flex items-center justify-between">
            <h1 class="text-2xl font-semibold tracking-tight">
                Detail Dry Dock
            </h1>

            <Button type="button" label="Back" severity="secondary" outlined @click="goBack()" />
        </div>

        <div v-if="loading" class="py-8 text-center text-slate-500">
            Loading...
        </div>

        <div v-else-if="dryDock" class="space-y-6">
            <div class="rounded-lg border border-slate-200 bg-white">
                <div class="border-b border-slate-200 px-6 py-4">
                    <h2 class="font-semibold text-slate-800">
                        General Information
                    </h2>
                </div>

                <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                    <div>
                        <p class="text-sm text-slate-500">
                            Dock List No
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ dryDock.dock_list_no || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Vessel
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ dryDock.vessel || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Shipyard
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ dryDock.shipyard_name || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Shipyard Detail
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ dryDock.shipyard_detail || '-' }}
                        </p>
                    </div>

                    <div class="md:col-span-2">
                        <p class="text-sm text-slate-500">
                            Description
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ dryDock.description || '-' }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg border border-slate-200 bg-white">
                <div class="border-b border-slate-200 px-6 py-4">
                    <h2 class="font-semibold text-slate-800">
                        Schedule
                    </h2>
                </div>

                <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                    <div>
                        <p class="text-sm text-slate-500">
                            Planned Start Date
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ formatDate(dryDock.planned_start_date) }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Planned End Date
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ formatDate(dryDock.planned_end_date) }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Actual Start Date
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ formatDate(dryDock.actual_start_date) }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Actual End Date
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ formatDate(dryDock.actual_end_date) }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg border border-slate-200 bg-white">
                <div class="border-b border-slate-200 px-6 py-4">
                    <h2 class="font-semibold text-slate-800">
                        Financial & Responsibility
                    </h2>
                </div>

                <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                    <div>
                        <p class="text-sm text-slate-500">
                            Account Code
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ dryDock.account_code || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Budget
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ formatCurrency(dryDock.budget) }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Responsible Bank
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ dryDock.responsible_bank || '-' }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="rounded-lg border border-slate-200 bg-white">
                <div class="border-b border-slate-200 px-6 py-4">
                    <h2 class="font-semibold text-slate-800">
                        Status
                    </h2>
                </div>

                <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                    <div>
                        <p class="text-sm text-slate-500">
                            Status
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ dryDock.status || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Priority
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ dryDock.priority || '-' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="rounded-lg border border-slate-200 bg-white p-8 text-center">
            <i class="pi pi-inbox text-4xl text-slate-400"></i>

            <p class="mt-3 text-slate-500">
                Dry dock data not found.
            </p>
        </div>
    </div>
</template>