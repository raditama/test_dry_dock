<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

interface Props {
    visible: boolean
    loading?: boolean
    data?: unknown | null
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
})

const emit = defineEmits<{
    confirm: []
    cancel: []
    'update:visible': [value: boolean]
}>()

const onCancel = (): void => {
    emit('update:visible', false)
    emit('cancel')
}

const onConfirm = (): void => {
    emit('confirm')
}
</script>

<template>
    <Dialog :visible="props.visible" modal header="Delete this data?" :style="{ width: '400px' }"
        :closable="!props.loading" :close-on-escape="!props.loading" @update:visible="emit('update:visible', $event)">
        <div class="flex flex-col items-center gap-4 py-4 text-center">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <i class="pi pi-trash text-2xl text-red-500"></i>
            </div>

            <div>
                <p class="mt-1 text-sm text-slate-500">
                    Are you sure you want to delete this data?
                    This action cannot be undone.
                </p>
            </div>
        </div>

        <template #footer>
            <div class="flex justify-end gap-2">
                <Button label="Cancel" severity="secondary" outlined :disabled="props.loading" @click="onCancel" />

                <Button label="Delete" severity="danger" :loading="props.loading" @click="onConfirm" />
            </div>
        </template>
    </Dialog>
</template>