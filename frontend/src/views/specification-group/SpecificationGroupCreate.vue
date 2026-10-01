<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import SpecificationGroupForm from './SpecificationGroupForm.vue'
import { createSpecificationGroup } from '@/api/specification-group.ts'
import type { SpecificationGroupFormData } from '@/types/specification-group.js'

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

const handleSubmit = async (data: SpecificationGroupFormData): Promise<void> => {
    try {
        loading.value = true

        await createSpecificationGroup(data)

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
    <Dialog :visible="props.visible" modal header="Add Specification Group" :style="{ width: '800px' }"
        :closable="!loading" :close-on-escape="!loading" @update:visible="handleClose">
        <SpecificationGroupForm :loading="loading" mode="create" @submit="handleSubmit" @cancel="handleCancel" />
    </Dialog>
</template>