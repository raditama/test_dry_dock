<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref } from 'vue'
import { deleteChecklistItem, getChecklistItems } from '@/api/checklist-item.ts'
import type { ChecklistItem } from '@/types/checklist-item.ts'
import { useRoute, useRouter } from 'vue-router'
import DeleteConfirmationModal from '@/components/data-table/DeleteConfirmationModal.vue'
import ChecklistItemCreate from './ChecklistItemCreate.vue'
import Button from 'primevue/button'
import ChecklistItemEdit from './ChecklistItemEdit.vue'
import type { Pagination } from '@/types/pagination.ts'
import { getChecklist } from '@/api/checklist.ts'

const route = useRoute()
const router = useRouter()
const checklistItem = ref<ChecklistItem[]>([])
const loading = ref(false)
const search = ref('')

const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
})

const checklist_id = Number(route.params.checklist_id)

const fetchChecklistItems = async () => {
    try {
        loading.value = true

        const response = await getChecklistItems({
            page: pagination.value.page,
            limit: pagination.value.limit,
            search: search.value,
            checklist_id: checklist_id
        })

        checklistItem.value = response.data
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

    fetchChecklistItems()
}

onMounted(() => {
    fetchChecklistItems()
})

const showCreateModal = ref(false)

const goToCreate = (): void => {
    showCreateModal.value = true
}

const onCreateSuccess = async (): Promise<void> => {
    showCreateModal.value = false

    await fetchChecklistItems()
}

const showEditModal = ref(false)
const selectedChecklistItemId = ref<number | null>(null)

const editChecklistItem = (data: ChecklistItem): void => {
    selectedChecklistItemId.value = data.id
    showEditModal.value = true
}

const onEditSuccess = async (): Promise<void> => {
    showEditModal.value = false
    selectedChecklistItemId.value = null

    await fetchChecklistItems()
}

const onEditCancel = (): void => {
    showEditModal.value = false
    selectedChecklistItemId.value = null
}

const showDeleteModal = ref(false)
const selectedChecklistItem = ref<ChecklistItem | null>(null)
const deleting = ref(false)

const deleteAction = (data: ChecklistItem): void => {
    selectedChecklistItem.value = data
    showDeleteModal.value = true
}

const confirmDeleteChecklistItem = async (): Promise<void> => {
    if (!selectedChecklistItem.value) return

    try {
        deleting.value = true

        await deleteChecklistItem(selectedChecklistItem.value.id)

        showDeleteModal.value = false
        selectedChecklistItem.value = null

        await fetchChecklistItems()
    } finally {
        deleting.value = false
    }
}

const checklist = ref<any>(null)

const loadChecklist = async () => {
    const response = await getChecklist(checklist_id)
    checklist.value = response.data
}

onMounted(() => {
    loadChecklist()
})

const goBack = (): void => {
    router.push('/checklist')
}
</script>

<template>
    <div class="min-h-screen bg-slate-50 p-12 text-slate-900">
        <div class="mb-12 flex items-center justify-between">
            <div class="flex items-center gap-5">
                <Button type="button" label="Back" severity="secondary" outlined @click="goBack()" />
                <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
                    {{ checklist?.name }}
                </h1>
            </div>

            <div class="flex items-center gap-3">
                <input v-model="search" type="text" placeholder="Search..."
                    class="w-64 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    @keyup.enter="fetchChecklistItems" />

                <button
                    class="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 cursor-pointer"
                    @click="fetchChecklistItems">
                    Search
                </button>

                <button
                    class="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 cursor-pointer"
                    @click="goToCreate">
                    Add Checklist Item
                </button>
            </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <DataTable v-if="checklistItem && checklistItem.length > 0" :value="checklistItem" :loading="loading" lazy paginator :rows="pagination.limit"
                :total-records="pagination.total" :rows-per-page-options="[10, 20, 50]" @page="onPage"
                table-style="min-width: 100%">

                <Column field="title" header="Title" />

                <Column field="data_type" header="Data Type" />

                <Column header="Action" style="width: 180px">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <Button severity="warning"
                                class="!bg-yellow-500 !border-yellow-500 !text-white w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer"
                                v-tooltip.top="'Edit'" @click="editChecklistItem(data)">
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

            <div v-else class="rounded-lg border border-slate-200 bg-white p-8 text-center">
                <i class="pi pi-inbox text-4xl text-slate-400"></i>

                <p class="mt-3 text-slate-500">
                    Data not found.
                </p>
            </div>
        </div>
    </div>

    <ChecklistItemCreate v-model:visible="showCreateModal" @success="onCreateSuccess" />
    <ChecklistItemEdit v-model:visible="showEditModal" :id="selectedChecklistItemId" @success="onEditSuccess"
        @cancel="onEditCancel" />

    <DeleteConfirmationModal v-model:visible="showDeleteModal" :data="selectedChecklistItem" :loading="deleting"
        @confirm="confirmDeleteChecklistItem" />
</template>