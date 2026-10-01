<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { deleteWorkOrderMaster, getWorkOrderMasterGroup } from '@/api/work-order-master.ts'
import type { WorkOrderMaster, WorkOrderMasterGroup } from '@/types/work-order-master.ts'
import { useRouter } from 'vue-router'
import DeleteConfirmationModal from '@/components/data-table/DeleteConfirmationModal.vue'
import WorkOrderMasterCreate from './WorkOrderMasterCreate.vue'
import Button from 'primevue/button'
import WorkOrderMasterEdit from './WorkOrderMasterEdit.vue'
import { Menu } from 'primevue'

const router = useRouter()
const WorkOrderMasterGroup = ref<WorkOrderMasterGroup[]>([])
const loading = ref(false)
const search = ref('')

const fetchWorkOrderMasters = async () => {
    try {
        loading.value = true

        const response = await getWorkOrderMasterGroup({
            search: search.value,
        })

        WorkOrderMasterGroup.value = response.data
    } catch (error) {
        console.error('Failed to fetch data:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchWorkOrderMasters()
})

const showCreateModal = ref(false)

const goToCreate = (): void => {
    showCreateModal.value = true
}

const onCreateSuccess = async (): Promise<void> => {
    showCreateModal.value = false

    await fetchWorkOrderMasters()
}

const viewWorkOrderMaster = (data: WorkOrderMaster): void => {
    router.push(`/work-order-master/${data.id}`)
}

const showEditModal = ref(false)
const selectedWorkOrderMasterId = ref<number | null>(null)

const editWorkOrderMaster = (data: WorkOrderMaster): void => {
    selectedWorkOrderMasterId.value = data.id
    showEditModal.value = true
}

const onEditSuccess = async (): Promise<void> => {
    showEditModal.value = false
    selectedWorkOrderMasterId.value = null

    await fetchWorkOrderMasters()
}

const onEditCancel = (): void => {
    showEditModal.value = false
    selectedWorkOrderMasterId.value = null
}

const showDeleteModal = ref(false)
const selectedWorkOrderMaster = ref<WorkOrderMaster | null>(null)
const deleting = ref(false)

const deleteAction = (data: WorkOrderMaster): void => {
    selectedWorkOrderMaster.value = data
    showDeleteModal.value = true
}

const confirmDeleteWorkOrderMaster = async (): Promise<void> => {
    if (!selectedWorkOrderMaster.value) return

    try {
        deleting.value = true

        await deleteWorkOrderMaster(selectedWorkOrderMaster.value.id)

        showDeleteModal.value = false
        selectedWorkOrderMaster.value = null

        await fetchWorkOrderMasters()
    } finally {
        deleting.value = false
    }
}

const menu = ref();

const selectedItem = ref<WorkOrderMaster | null>(null);

const toggleMenu = (event: Event, item: WorkOrderMaster) => {
    selectedItem.value = item;
    menu.value?.toggle(event);
};

const menuItems = computed(() => [
    {
        label: 'View',
        icon: 'pi pi-eye',
        command: () => {
            if (selectedItem.value) {
                viewWorkOrderMaster(selectedItem.value);
            }
        },
    },
    {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
            if (selectedItem.value) {
                editWorkOrderMaster(selectedItem.value);
            }
        },
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            if (selectedItem.value) {
                deleteAction(selectedItem.value);
            }
        },
    },
]);

</script>

<template>
    <div class="min-h-screen bg-slate-50 p-12 text-slate-900">
        <div class="mb-12 flex items-center justify-between">
            <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
                Work Order Masters
            </h1>

            <div class="flex items-center gap-3">
                <input v-model="search" type="text" placeholder="Search..."
                    class="w-64 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    @keyup.enter="fetchWorkOrderMasters" />

                <button
                    class="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 cursor-pointer"
                    @click="fetchWorkOrderMasters">
                    Search
                </button>

                <button
                    class="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 cursor-pointer"
                    @click="goToCreate">
                    Add WorkOrderMaster
                </button>
            </div>
        </div>

        <div class="overflow-hidden">
            <div class="flex flex-col gap-3">
                <div v-for="group in WorkOrderMasterGroup" :key="group.id">
                    <div class="mb-3">
                        <p class="text-base font-semibold text-slate-800">
                            {{ group.name || '-' }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-3">
                        <div v-for="item in group.data" :key="item.id"
                            class="rounded-lg border border-slate-200 bg-white p-4">
                            <div class="flex items-stretch gap-4">
                                <div class="h-20 w-20 shrink-0 rounded-lg bg-slate-200"></div>

                                <div class="min-w-0 flex-1 space-y-1">
                                    <div>
                                        <p class="mt-1 text-sm font-medium text-cyan-500">
                                            {{ item.job_type || '-' }}
                                        </p>
                                    </div>

                                    <div>
                                        <p class="mt-1 text-base font-medium text-slate-800">
                                            {{ item.job_name || '-' }}
                                        </p>
                                    </div>

                                    <div>
                                        <p class="mt-1 text-sm text-slate-800">
                                            {{ item.job_code || '-' }}
                                        </p>
                                    </div>
                                </div>

                                <Button text rounded severity="secondary" class="!h-8 !w-8 shrink-0"
                                    v-tooltip.top="'Actions'" @click="toggleMenu($event, item)">
                                    <i class="pi pi-ellipsis-v text-slate-500"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Menu ref="menu" :model="menuItems" :popup="true" />
        </div>
    </div>

    <WorkOrderMasterCreate v-model:visible="showCreateModal" @success="onCreateSuccess" />
    <WorkOrderMasterEdit v-model:visible="showEditModal" :id="selectedWorkOrderMasterId" @success="onEditSuccess"
        @cancel="onEditCancel" />

    <DeleteConfirmationModal v-model:visible="showDeleteModal" :data="selectedWorkOrderMaster" :loading="deleting"
        @confirm="confirmDeleteWorkOrderMaster" />
</template>