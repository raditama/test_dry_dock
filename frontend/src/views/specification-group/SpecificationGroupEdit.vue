<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import { getSpecificationGroup, updateSpecificationGroup } from '@/api/specification-group.ts'
import type { SpecificationGroup, SpecificationGroupFormData } from '@/types/specification-group.ts'
import SpecificationGroupForm from './SpecificationGroupForm.vue'

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

const specificationGroup = ref<Partial<SpecificationGroup>>({})
const loading = ref(false)
const loadingData = ref(false)

const fetchSpecificationGroup = async (): Promise<void> => {
    if (!props.id) return

    try {
        loadingData.value = true
        specificationGroup.value = {}

        const response = await getSpecificationGroup(props.id)

        specificationGroup.value = response.data
    } catch (error) {
        console.error('Failed to fetch data:', error)
    } finally {
        loadingData.value = false
    }
}

const handleSubmit = async (data: SpecificationGroupFormData): Promise<void> => {
    if (!props.id) return

    try {
        loading.value = true

        await updateSpecificationGroup(props.id, data)

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
            fetchSpecificationGroup()
        }
    },
)
</script>

<template>
    <Dialog :visible="props.visible" modal header="Edit Specification Group" :style="{ width: '800px' }" :closable="!loading"
        :close-on-escape="!loading" @update:visible="handleClose">
        <div v-if="loadingData" class="py-8 text-center text-slate-500">
            Loading...
        </div>

        <SpecificationGroupForm v-else :model-value="specificationGroup" :loading="loading" mode="edit" @submit="handleSubmit"
            @cancel="handleCancel" />
    </Dialog>
</template>