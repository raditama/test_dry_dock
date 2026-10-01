<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import { onMounted, ref } from 'vue'
import { deleteChecklist, getChecklists } from '@/api/checklist.ts'
import type { Checklist } from '@/types/checklist.ts'
import { useRouter } from 'vue-router'
import DeleteConfirmationModal from '@/components/data-table/DeleteConfirmationModal.vue'
import ChecklistCreate from './ChecklistCreate.vue'
import Button from 'primevue/button'
import ChecklistEdit from './ChecklistEdit.vue'
import type { Pagination } from '@/types/pagination.ts'

const router = useRouter()
const checklist = ref<Checklist[]>([])
const loading = ref(false)
const search = ref('')

const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
})

const fetchChecklists = async () => {
    try {
        loading.value = true

        const response = await getChecklists({
            page: pagination.value.page,
            limit: pagination.value.limit,
            search: search.value,
        })

        checklist.value = response.data
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

    fetchChecklists()
}

onMounted(() => {
    fetchChecklists()
})

const showCreateModal = ref(false)

const goToCreate = (): void => {
    showCreateModal.value = true
}

const onCreateSuccess = async (): Promise<void> => {
    showCreateModal.value = false

    await fetchChecklists()
}

const viewChecklist = (data: Checklist): void => {
    router.push(`/checklist/${data.id}`)
}

const showEditModal = ref(false)
const selectedChecklistId = ref<number | null>(null)

const editChecklist = (data: Checklist): void => {
    selectedChecklistId.value = data.id
    showEditModal.value = true
}

const onEditSuccess = async (): Promise<void> => {
    showEditModal.value = false
    selectedChecklistId.value = null

    await fetchChecklists()
}

const onEditCancel = (): void => {
    showEditModal.value = false
    selectedChecklistId.value = null
}

const showDeleteModal = ref(false)
const selectedChecklist = ref<Checklist | null>(null)
const deleting = ref(false)

const deleteAction = (data: Checklist): void => {
    selectedChecklist.value = data
    showDeleteModal.value = true
}

const confirmDeleteChecklist = async (): Promise<void> => {
    if (!selectedChecklist.value) return

    try {
        deleting.value = true

        await deleteChecklist(selectedChecklist.value.id)

        showDeleteModal.value = false
        selectedChecklist.value = null

        await fetchChecklists()
    } finally {
        deleting.value = false
    }
}

const getStatusSeverity = (status: number) => {
    switch (status) {
        case 1:
            return 'success'
        case 0:
            return 'warn'
        default:
            return 'secondary'
    }
}

const openChecklistItem = (data: Checklist) => {
    router.push(`/checklist/${data.id}/checklist-item`)
}
</script>

<template>
    <div class="min-h-screen bg-slate-50 p-12 text-slate-900">
        <div class="mb-12 flex items-center justify-between">
            <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
                Checklists
            </h1>

            <div class="flex items-center gap-3">
                <input v-model="search" type="text" placeholder="Search..."
                    class="w-64 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    @keyup.enter="fetchChecklists" />

                <button
                    class="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 cursor-pointer"
                    @click="fetchChecklists">
                    Search
                </button>

                <button
                    class="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 cursor-pointer"
                    @click="goToCreate">
                    Add Checklist
                </button>
            </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <DataTable :value="checklist" :loading="loading" lazy paginator :rows="pagination.limit"
                :total-records="pagination.total" :rows-per-page-options="[10, 20, 50]" @page="onPage"
                table-style="min-width: 100%">
                <Column field="name" header="Name" />

                <Column field="description" header="Description" />

                <Column field="is_active" header="Status">
                    <template #body="{ data }">
                        <Tag :value="data.is_active ? 'Active' : 'Inactive'"
                            :severity="getStatusSeverity(data.is_active)" />
                    </template>
                </Column>

                <Column header="Action" style="width: 180px">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <Button severity="success"
                                class="!bg-green-500 !border-green-500 !text-white w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer ml-2"
                                v-tooltip.top="'Checklist Item'" @click="openChecklistItem(data)">
                                <i class="pi pi-list-check !text-white"></i>
                            </Button>

                            <Button severity="info"
                                class="!bg-blue-500 !border-blue-500 !text-white w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer"
                                v-tooltip.top="'View'" @click="viewChecklist(data)">
                                <i class="pi pi-eye !text-white"></i>
                            </Button>

                            <Button severity="warning"
                                class="!bg-yellow-500 !border-yellow-500 !text-white w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer"
                                v-tooltip.top="'Edit'" @click="editChecklist(data)">
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

    <ChecklistCreate v-model:visible="showCreateModal" @success="onCreateSuccess" />
    <ChecklistEdit v-model:visible="showEditModal" :id="selectedChecklistId" @success="onEditSuccess"
        @cancel="onEditCancel" />

    <DeleteConfirmationModal v-model:visible="showDeleteModal" :data="selectedChecklist" :loading="deleting"
        @confirm="confirmDeleteChecklist" />
</template>