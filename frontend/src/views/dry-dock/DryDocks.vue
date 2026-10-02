<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import { onMounted, ref } from 'vue'
import { deleteDryDock, getDryDocks } from '@/api/dry-dock.ts'
import type { DryDock } from '@/types/dry-dock.ts'
import { useRouter } from 'vue-router'
import DeleteConfirmationModal from '@/components/data-table/DeleteConfirmationModal.vue'
import DryDockCreate from './DryDockCreate.vue'
import Button from 'primevue/button'
import DryDockEdit from './DryDockEdit.vue'
import type { Pagination } from '@/types/pagination.ts'

const router = useRouter()
const dryDocks = ref<DryDock[]>([])
const loading = ref(false)
const search = ref('')

const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
})

const fetchDryDocks = async () => {
    try {
        loading.value = true

        const response = await getDryDocks({
            page: pagination.value.page,
            limit: pagination.value.limit,
            search: search.value,
        })

        dryDocks.value = response.data
        pagination.value = response.pagination
    } catch (error) {
        console.error('Failed to fetch data:', error)
    } finally {
        loading.value = false
    }
}

const onPage = (event: {
    page: number
    rows: number
}) => {
    pagination.value.page = event.page + 1
    pagination.value.limit = event.rows

    fetchDryDocks()
}

const getStatusSeverity = (
    status: DryDock['status'],
) => {
    switch (status) {
        case 'PLANNING':
            return 'info'
        case 'EXECUTION':
            return 'warn'
        case 'COMPLETED':
            return 'success'
        default:
            return 'secondary'
    }
}

const getPrioritySeverity = (
    priority: DryDock['priority'],
) => {
    switch (priority) {
        case 'HIGH':
            return 'danger'
        case 'MEDIUM':
            return 'warn'
        case 'LOW':
            return 'success'
        default:
            return 'secondary'
    }
}

const formatDate = (date: string | null) => {
    if (!date) {
        return '-'
    }

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(date))
}

onMounted(() => {
    fetchDryDocks()
})

const showCreateModal = ref(false)

const goToCreate = (): void => {
    showCreateModal.value = true
}

const onCreateSuccess = async (): Promise<void> => {
    showCreateModal.value = false

    await fetchDryDocks()
}

const viewDryDock = (data: DryDock): void => {
    router.push(`/dry-dock/${data.id}`)
}

const showEditModal = ref(false)
const selectedDryDockId = ref<number | null>(null)

const editDryDock = (data: DryDock): void => {
    selectedDryDockId.value = data.id
    showEditModal.value = true
}

const onEditSuccess = async (): Promise<void> => {
    showEditModal.value = false
    selectedDryDockId.value = null

    await fetchDryDocks()
}

const onEditCancel = (): void => {
    showEditModal.value = false
    selectedDryDockId.value = null
}

const showDeleteModal = ref(false)
const selectedDryDock = ref<DryDock | null>(null)
const deleting = ref(false)

const deleteAction = (data: DryDock): void => {
    selectedDryDock.value = data
    showDeleteModal.value = true
}

const confirmDeleteDryDock = async (): Promise<void> => {
    if (!selectedDryDock.value) return

    try {
        deleting.value = true

        await deleteDryDock(selectedDryDock.value.id)

        showDeleteModal.value = false
        selectedDryDock.value = null

        await fetchDryDocks()
    } finally {
        deleting.value = false
    }
}
</script>

<template>
    <div class="min-h-screen bg-slate-50 p-12 text-slate-900">
        <div class="mb-12 flex items-center justify-between">
            <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
                Dry Docks
            </h1>

            <div class="flex items-center gap-3">
                <input v-model="search" type="text" placeholder="Search..."
                    class="w-64 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    @keyup.enter="fetchDryDocks" />

                <button
                    class="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 cursor-pointer"
                    @click="fetchDryDocks">
                    Search
                </button>

                <button
                    class="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 cursor-pointer"
                    @click="goToCreate">
                    Add Dry Dock
                </button>
            </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <DataTable :value="dryDocks" :loading="loading" lazy paginator :rows="pagination.limit"
                :total-records="pagination.total" :rows-per-page-options="[10, 20, 50]" @page="onPage"
                table-style="min-width: 100%">
                <Column field="dock_list_no" header="Dock List No" />

                <Column field="vessel" header="Vessel" />

                <Column field="shipyard_name" header="Shipyard" />

                <Column field="planned_start_date" header="Planned Start">
                    <template #body="{ data }">
                        {{ formatDate(data.planned_start_date) }}
                    </template>
                </Column>

                <Column field="planned_end_date" header="Planned End">
                    <template #body="{ data }">
                        {{ formatDate(data.planned_end_date) }}
                    </template>
                </Column>

                <Column field="priority" header="Priority">
                    <template #body="{ data }">
                        <Tag :value="data.priority" :severity="getPrioritySeverity(data.priority)" />
                    </template>
                </Column>

                <Column field="status" header="Status">
                    <template #body="{ data }">
                        <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
                    </template>
                </Column>

                <Column header="Action" style="width: 180px">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <Button severity="info"
                                class="!bg-blue-500 !border-blue-500 !text-white w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer"
                                v-tooltip.top="'View'" @click="viewDryDock(data)">
                                <i class="pi pi-eye !text-white"></i>
                            </Button>

                            <Button severity="warning"
                                class="!bg-yellow-500 !border-yellow-500 !text-white w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer"
                                v-tooltip.top="'Edit'" @click="editDryDock(data)">
                                <i class="pi pi-pencil !text-white"></i>
                            </Button>

                            <Button severity="danger"
                                class="!bg-red-500 !border-red-500 !text-white w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer"
                                v-tooltip.top="'Delete'" @click="deleteAction(data)">
                                <i class="pi pi-trash !text-white"></i>
                            </Button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <DryDockCreate v-model:visible="showCreateModal" @success="onCreateSuccess" />
    <DryDockEdit v-model:visible="showEditModal" :id="selectedDryDockId" @success="onEditSuccess"
        @cancel="onEditCancel" />

    <DeleteConfirmationModal v-model:visible="showDeleteModal" :data="selectedDryDock" :loading="deleting"
        @confirm="confirmDeleteDryDock" />
</template>