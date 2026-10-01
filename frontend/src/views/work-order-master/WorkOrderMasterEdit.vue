<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import { getWorkOrderMaster, updateWorkOrderMaster} from '@/api/work-order-master.ts'
import type { WorkOrderMaster} from '@/types/work-order-master.ts'
import WorkOrderMasterForm from './WorkOrderMasterForm.vue'

interface Props {
    visible: boolean
    id: number | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:visible': [value: boolean]
    success: []
    cancel: []
}>()

const workOrderMaster= ref<Partial<WorkOrderMaster>>({})
const loading = ref(false)
const loadingData = ref(false)

const fetchWorkOrderMaster= async (): Promise<void> => {
    if (!props.id) return

    try {
        loadingData.value = true
        workOrderMaster.value = {}

        const response = await getWorkOrderMaster(props.id)

        workOrderMaster.value = response.data
    } catch (error) {
        console.error('Failed to fetch data:', error)
    } finally {
        loadingData.value = false
    }
}

const handleSubmit = async (data: any): Promise<void> => {
    if (!props.id) return

    try {
        loading.value = true

        await updateWorkOrderMaster(props.id, data)

        emit('success')
        emit('update:visible', false)
    } catch (error) {
        console.error('Failed to update data:', error)
    } finally {
        loading.value = false
    }
}

const handleCancel = (): void => {
    emit('update:visible', false)
    emit('cancel')
}

const handleClose = (): void => {
    if (loading.value) return

    emit('update:visible', false)
    emit('cancel')
}

watch(
    () => [props.visible, props.id],
    ([visible]) => {
        if (visible) {
            fetchWorkOrderMaster()
        }
    },
)
</script>

<template>
    <Dialog :visible="props.visible" modal header="Edit Work Order Master" :style="{ width: '800px' }" :closable="!loading"
        :close-on-escape="!loading" @update:visible="handleClose">
        <div v-if="loadingData" class="py-8 text-center text-slate-500">
            Loading...
        </div>

        <WorkOrderMasterForm v-else :model-value="workOrderMaster" :loading="loading" mode="edit" @submit="handleSubmit"
            @cancel="handleCancel" />
    </Dialog>
</template>