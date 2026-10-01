<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import ChecklistItemForm from './ChecklistItemForm.vue'
import { createChecklistItem } from '@/api/checklist-item.ts'
import type { ChecklistItemFormData } from '@/types/checklist-item.js'

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

const handleSubmit = async (data: ChecklistItemFormData): Promise<void> => {
    try {
        loading.value = true

        await createChecklistItem(data)

        emit('success')
        emit('update:visible', false)
    } catch (error) {
        console.error('Failed to create data:', error)
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
    <Dialog :visible="props.visible" modal header="Add Checklist Item" :style="{ width: '800px' }" :closable="!loading"
        :close-on-escape="!loading" @update:visible="handleClose">
        <ChecklistItemForm :loading="loading" mode="create" @submit="handleSubmit" @cancel="handleCancel" />
    </Dialog>
</template>