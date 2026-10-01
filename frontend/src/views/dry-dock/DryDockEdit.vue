<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import DryDockForm from '@/components/dry-dock/DryDockForm.vue'
import {
    getDryDock,
    updateDryDock,
} from '@/api/dryDock'
import type { DryDock } from '@/types/dryDock'

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

const dryDock = ref<Partial<DryDock>>({})
const loading = ref(false)
const loadingData = ref(false)

const fetchDryDock = async (): Promise<void> => {
    if (!props.id) return

    try {
        loadingData.value = true
        dryDock.value = {}

        const response = await getDryDock(props.id)

        dryDock.value = response.data
    } catch (error) {
        console.error('Failed to fetch dry dock:', error)
    } finally {
        loadingData.value = false
    }
}

const handleSubmit = async (data: any): Promise<void> => {
    if (!props.id) return

    try {
        loading.value = true

        await updateDryDock(props.id, data)

        emit('success')
        emit('update:visible', false)
    } catch (error) {
        console.error('Failed to update dry dock:', error)
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
            fetchDryDock()
        }
    },
)
</script>

<template>
    <Dialog :visible="props.visible" modal header="Edit Dry Dock" :style="{ width: '800px' }" :closable="!loading"
        :close-on-escape="!loading" @update:visible="handleClose">
        <div v-if="loadingData" class="py-8 text-center text-slate-500">
            Loading...
        </div>

        <DryDockForm v-else :model-value="dryDock" :loading="loading" mode="edit" @submit="handleSubmit"
            @cancel="handleCancel" />
    </Dialog>
</template>