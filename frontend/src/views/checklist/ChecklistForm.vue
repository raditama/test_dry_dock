<script setup lang="ts">
import { reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import type { Checklist, ChecklistFormData } from '@/types/checklist'
import { Checkbox } from 'primevue'

const props = withDefaults(
    defineProps<{
        modelValue?: Partial<Checklist>
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
    submit: [data: ChecklistFormData]
    cancel: []
}>()

const form = reactive<ChecklistFormData>({
    name: props.modelValue.name ?? '',
    description: props.modelValue.description ?? null,
    is_active: Boolean(props.modelValue.is_active) ?? false,
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
                            Name
                        </label>
                        <InputText v-model="form.name" class="w-full" placeholder="" required />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Description
                        </label>
                        <Textarea v-model="form.description" class="w-full" placeholder=""
                            rows="4" />
                    </div>

                    <div class="flex items-center gap-3">
                        <Checkbox v-model="form.is_active" :binary="true" input-id="is_active" />

                        <label for="is_active" class="text-sm font-medium text-slate-700">
                            Active
                        </label>
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