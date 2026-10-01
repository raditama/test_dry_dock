<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, ref } from 'vue'
import { deleteSpecificationGroup, getSpecificationGroups } from '@/api/specification-group.ts'
import type { SpecificationGroup } from '@/types/specification-group.ts'
import { useRouter } from 'vue-router'
import DeleteConfirmationModal from '@/components/data-table/DeleteConfirmationModal.vue'
import SpecificationGroupCreate from './SpecificationGroupCreate.vue'
import Button from 'primevue/button'
import SpecificationGroupEdit from './SpecificationGroupEdit.vue'
import type { Pagination } from '@/types/pagination.ts'

const router = useRouter()
const specificationGroup = ref<SpecificationGroup[]>([])
const loading = ref(false)
const search = ref('')

const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
})

const fetchSpecificationGroups = async () => {
    try {
        loading.value = true

        const response = await getSpecificationGroups({
            page: pagination.value.page,
            limit: pagination.value.limit,
            search: search.value,
        })

        specificationGroup.value = response.data
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

    fetchSpecificationGroups()
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
    fetchSpecificationGroups()
})

const showCreateModal = ref(false)

const goToCreate = (): void => {
    showCreateModal.value = true
}

const onCreateSuccess = async (): Promise<void> => {
    showCreateModal.value = false

    await fetchSpecificationGroups()
}

const viewSpecificationGroup = (data: SpecificationGroup): void => {
    router.push(`/specification-group/${data.id}`)
}

const showEditModal = ref(false)
const selectedSpecificationGroupId = ref<number | null>(null)

const editSpecificationGroup = (data: SpecificationGroup): void => {
    selectedSpecificationGroupId.value = data.id
    showEditModal.value = true
}

const onEditSuccess = async (): Promise<void> => {
    showEditModal.value = false
    selectedSpecificationGroupId.value = null

    await fetchSpecificationGroups()
}

const onEditCancel = (): void => {
    showEditModal.value = false
    selectedSpecificationGroupId.value = null
}

const showDeleteModal = ref(false)
const selectedSpecificationGroup = ref<SpecificationGroup | null>(null)
const deleting = ref(false)

const deleteAction = (data: SpecificationGroup): void => {
    selectedSpecificationGroup.value = data
    showDeleteModal.value = true
}

const confirmDeleteSpecificationGroup = async (): Promise<void> => {
    if (!selectedSpecificationGroup.value) return

    try {
        deleting.value = true

        await deleteSpecificationGroup(selectedSpecificationGroup.value.id)

        showDeleteModal.value = false
        selectedSpecificationGroup.value = null

        await fetchSpecificationGroups()
    } finally {
        deleting.value = false
    }
}

</script>

<template>
    <div class="min-h-screen bg-slate-50 p-12 text-slate-900">
        <div class="mb-12 flex items-center justify-between">
            <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
                Specification Groups
            </h1>

            <div class="flex items-center gap-3">
                <input v-model="search" type="text" placeholder="Search..."
                    class="w-64 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    @keyup.enter="fetchSpecificationGroups" />

                <button
                    class="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 cursor-pointer"
                    @click="fetchSpecificationGroups">
                    Search
                </button>

                <button
                    class="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 cursor-pointer"
                    @click="goToCreate">
                    Add SpecificationGroup
                </button>
            </div>
        </div>

        <div class="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <DataTable :value="specificationGroup" :loading="loading" lazy paginator :rows="pagination.limit"
                :total-records="pagination.total" :rows-per-page-options="[10, 20, 50]" @page="onPage"
                table-style="min-width: 100%">

                <Column field="group_no" header="Description" />

                <Column field="name" header="Name" />

                <Column field="sort_order" header="Sort Order" />

                <Column header="Action" style="width: 180px">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <Button severity="info"
                                class="!bg-blue-500 !border-blue-500 !text-white w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer"
                                v-tooltip.top="'View'" @click="viewSpecificationGroup(data)">
                                <i class="pi pi-eye !text-white"></i>
                            </Button>

                            <Button severity="warning"
                                class="!bg-yellow-500 !border-yellow-500 !text-white w-8 h-8 flex items-center justify-center rounded-sm cursor-pointer"
                                v-tooltip.top="'Edit'" @click="editSpecificationGroup(data)">
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

    <SpecificationGroupCreate v-model:visible="showCreateModal" @success="onCreateSuccess" />
    <SpecificationGroupEdit v-model:visible="showEditModal" :id="selectedSpecificationGroupId" @success="onEditSuccess"
        @cancel="onEditCancel" />

    <DeleteConfirmationModal v-model:visible="showDeleteModal" :data="selectedSpecificationGroup" :loading="deleting"
        @confirm="confirmDeleteSpecificationGroup" />
</template>