<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import DryDockForm from '@/components/dry-dock/DryDockForm.vue'
import { createDryDock } from '@/api/dryDock'

interface DryDockFormData {
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
    budget: number | null
    responsible_bank: string
    status: string
    priority: string
}

interface Props {
    visible: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:visible': [value: boolean]
    success: []
    cancel: []
}>()

const loading = ref(false)

const handleSubmit = async (data: DryDockFormData): Promise<void> => {
    try {
        loading.value = true

        await createDryDock(data)

        emit('success')
        emit('update:visible', false)
    } catch (error) {
        console.error('Failed to create dry dock:', error)
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
</script>

<template>
    <Dialog :visible="props.visible" modal header="Add Dry Dock" :style="{ width: '800px' }" :closable="!loading"
        :close-on-escape="!loading" @update:visible="handleClose">
        <DryDockForm :loading="loading" mode="create" @submit="handleSubmit" @cancel="handleCancel" />
    </Dialog>
</template>