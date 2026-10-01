<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import { getChecklistItem, updateChecklistItem } from '@/api/checklist-item.ts'
import type { ChecklistItem } from '@/types/checklist-item.ts'
import ChecklistItemForm from './ChecklistItemForm.vue'

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

const checklistItem = ref<Partial<ChecklistItem>>({})
const loading = ref(false)
const loadingData = ref(false)

const fetchChecklistItem = async (): Promise<void> => {
    if (!props.id) return

    try {
        loadingData.value = true
        checklistItem.value = {}

        const response = await getChecklistItem(props.id)

        checklistItem.value = response.data
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

        await updateChecklistItem(props.id, data)

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
            fetchChecklistItem()
        }
    },
)
</script>

<template>
    <Dialog :visible="props.visible" modal header="Edit Checklist Item" :style="{ width: '800px' }" :closable="!loading"
        :close-on-escape="!loading" @update:visible="handleClose">
        <div v-if="loadingData" class="py-8 text-center text-slate-500">
            Loading...
        </div>

        <ChecklistItemForm v-else :model-value="checklistItem" :loading="loading" mode="edit" @submit="handleSubmit"
            @cancel="handleCancel" />
    </Dialog>
</template>