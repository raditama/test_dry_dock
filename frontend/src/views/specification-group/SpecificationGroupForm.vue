<script setup lang="ts">
import { reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import type { SpecificationGroup, SpecificationGroupFormData } from '@/types/specification-group'
import { Checkbox, InputNumber } from 'primevue'

const props = withDefaults(
    defineProps<{
        modelValue?: Partial<SpecificationGroup>
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
    submit: [data: SpecificationGroupFormData]
    cancel: []
}>()

const form = reactive<SpecificationGroupFormData>({
    group_no: props.modelValue.group_no ?? '',
    name: props.modelValue.name ?? '',
    sort_order: props.modelValue.sort_order ?? 0,
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
                            Group No
                        </label>
                        <InputText v-model="form.group_no" class="w-full"
                            placeholder="Enter specificationGroup group no" required />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Name
                        </label>
                        <InputText v-model="form.name" class="w-full" placeholder="Enter specificationGroup name"
                            required />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Sort Order
                        </label>
                        <InputNumber v-model="form.sort_order" class="w-full"
                            placeholder="Enter specificationGroup sort order" :min="0" required />
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