<script setup lang="ts">
import { reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import type { ChecklistItem, ChecklistItemFormData } from '@/types/checklist-item'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = withDefaults(
    defineProps<{
        modelValue?: Partial<ChecklistItem>
        loading?: boolean
        mode?: 'create' | 'edit'
    }>(),
    {
        modelValue: () => ({}),
        loading: false,
        mode: 'create',
    },
)

const emit = defineEmits<{
    submit: [data: ChecklistItemFormData]
    cancel: []
}>()

const checklist_id = Number(route.params.checklist_id)

const form = reactive<ChecklistItemFormData>({
    title: props.modelValue.title ?? '',
    checklist_id: checklist_id
})

const submit = () => {
    emit('submit', { ...form })
}
</script>

<template>
    <form @submit.prevent="submit">
        <div class="space-y-6">

            <div class="rounded-lg border border-slate-200 bg-white p-6">
                <div class="grid grid-cols-1 gap-6">
                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Title
                        </label>
                        <InputText v-model="form.title" class="w-full" placeholder="Enter checklist item title" required />
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-3">
                <Button type="button" label="Cancel" severity="secondary" outlined @click="emit('cancel')" />

                <Button type="submit" label="Submit" :loading="loading" />
            </div>
        </div>
    </form>
</template>