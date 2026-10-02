<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import { getChecklist, updateChecklist } from '@/api/checklist.ts'
import type { Checklist, ChecklistFormData } from '@/types/checklist.ts'
import ChecklistForm from './ChecklistForm.vue'

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

const checklist = ref<Partial<Checklist>>({})
const loading = ref(false)
const loadingData = ref(false)

const fetchChecklist = async (): Promise<void> => {
    if (!props.id) return

    try {
        loadingData.value = true
        checklist.value = {}

        const response = await getChecklist(props.id)

        checklist.value = response.data
    } catch (error) {
        console.error('Failed to fetch data:', error)
    } finally {
        loadingData.value = false
    }
}

const handleSubmit = async (data: ChecklistFormData): Promise<void> => {
    if (!props.id) return

    try {
        loading.value = true

        await updateChecklist(props.id, data)

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
            fetchChecklist()
        }
    },
)
</script>

<template>
    <Dialog :visible="props.visible" modal header="Edit Checklist" :style="{ width: '800px' }" :closable="!loading"
        :close-on-escape="!loading" @update:visible="handleClose">
        <div v-if="loadingData" class="py-8 text-center text-slate-500">
            Loading...
        </div>

        <ChecklistForm v-else :model-value="checklist" :loading="loading" mode="edit" @submit="handleSubmit"
            @cancel="handleCancel" />
    </Dialog>
</template>