<script setup lang="ts">
import { reactive, computed } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import type { DryDock, DryDockFormData } from '@/types/dryDock'

const props = withDefaults(
    defineProps<{
        modelValue?: Partial<DryDock>
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
    submit: [data: DryDockFormData]
    cancel: []
}>()

const form = reactive<DryDockFormData>({
    vessel: props.modelValue.vessel ?? '',
    dock_list_no: props.modelValue.dock_list_no ?? '',
    description: props.modelValue.description ?? '',
    shipyard_name: props.modelValue.shipyard_name ?? '',
    shipyard_detail: props.modelValue.shipyard_detail ?? '',
    planned_start_date: props.modelValue.planned_start_date ?? '',
    planned_end_date: props.modelValue.planned_end_date ?? '',
    actual_start_date: props.modelValue.actual_start_date ?? '',
    actual_end_date: props.modelValue.actual_end_date ?? '',
    account_code: props.modelValue.account_code ?? '',
    budget: props.modelValue.budget != null
        ? Number(props.modelValue.budget)
        : null,
    responsible_bank: props.modelValue.responsible_bank ?? '',
    status: props.modelValue.status ?? 'PLANNING',
    priority: props.modelValue.priority ?? 'MEDIUM',
})

const isEdit = computed(() => props.mode === 'edit')

const statusOptions = [
    { label: 'Planning', value: 'PLANNING' },
    { label: 'Execution', value: 'EXECUTION' },
    { label: 'Completed', value: 'COMPLETED' },
]

const priorityOptions = [
    { label: 'High', value: 'HIGH' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'Low', value: 'LOW' },
]

const submit = () => {
    emit('submit', { ...form })
}
</script>

<template>
    <form @submit.prevent="submit">
        <div class="space-y-6">

            <div class="rounded-lg border border-slate-200 bg-white p-6">
                <div class="grid grid-cols-1 gap-8">
                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Vessel
                        </label>
                        <InputText v-model="form.vessel" class="w-full" placeholder="Enter vessel name" required />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Dock List No
                        </label>
                        <InputText v-model="form.dock_list_no" class="w-full" placeholder="e.g. DL-2026-001" required />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Description
                        </label>
                        <Textarea v-model="form.description" class="w-full" rows="3"
                            placeholder="Describe the dry dock activity" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Shipyard Name
                        </label>
                        <InputText v-model="form.shipyard_name" class="w-full" placeholder="Enter shipyard name"
                            required />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Shipyard Detail
                        </label>
                        <InputText v-model="form.shipyard_detail" class="w-full" placeholder="e.g. Dock Area 01" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Planned Start Date
                        </label>
                        <InputText v-model="form.planned_start_date" type="date" class="w-full" required />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Planned End Date
                        </label>
                        <InputText v-model="form.planned_end_date" type="date" class="w-full" required />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Actual Start Date
                        </label>
                        <InputText v-model="form.actual_start_date" type="date" class="w-full" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Actual End Date
                        </label>
                        <InputText v-model="form.actual_end_date" type="date" class="w-full" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Account Code
                        </label>
                        <InputText v-model="form.account_code" class="w-full" placeholder="e.g. ACC-001" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Budget
                        </label>
                        <InputNumber v-model="form.budget" class="w-full" input-class="w-full" mode="decimal"
                            :min-fraction-digits="2" :max-fraction-digits="2" :use-grouping="true" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Responsible Bank
                        </label>
                        <InputText v-model="form.responsible_bank" class="w-full"
                            placeholder="Enter responsible bank" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Status
                        </label>
                        <Select v-model="form.status" :options="statusOptions" option-label="label" option-value="value"
                            class="w-full" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Priority
                        </label>
                        <Select v-model="form.priority" :options="priorityOptions" option-label="label"
                            option-value="value" class="w-full" />
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