<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { InputNumber } from 'primevue'
import type { WorkOrderMaster, WorkOrderMasterFormData, } from '@/types/work-order-master'
import { getSpecificationGroupLov, } from '@/api/specification-group'
import type { SpecificationGroupLov } from '@/types/specification-group'

const props = withDefaults(
    defineProps<{
        modelValue?: Partial<WorkOrderMaster>
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
    submit: [data: WorkOrderMasterFormData]
    cancel: []
}>()

const form = reactive<WorkOrderMasterFormData>({
    specification_group_id: props.modelValue.specification_group_id ?? 0,
    job_code: props.modelValue.job_code ?? '',
    job_name: props.modelValue.job_name ?? '',
    job_category: props.modelValue.job_category ?? null,
    job_standar: props.modelValue.job_standar ?? null,
    job_type: props.modelValue.job_type ?? null,
    job_critical: props.modelValue.job_critical ?? null,
    job_internal: props.modelValue.job_internal ?? null,
    estimated_hours: props.modelValue.estimated_hours ?? null,
    job_desc: props.modelValue.job_desc ?? null,
})

const specificationGroups = ref<SpecificationGroupLov[]>([])
const specificationGroupLoading = ref(false)

const loadSpecificationGroups = async () => {
    specificationGroupLoading.value = true

    try {
        const response = await getSpecificationGroupLov()

        if (response.success) {
            specificationGroups.value = response.data
        } else {
            console.error(
                'Failed to load specification groups:',
                response.message,
            )
        }
    } catch (error) {
        console.error('Failed to load specification groups:', error)
    } finally {
        specificationGroupLoading.value = false
    }
}

const submit = () => {
    emit('submit', { ...form })
}

onMounted(() => {
    loadSpecificationGroups()
})
</script>

<template>
    <form @submit.prevent="submit">
        <div class="space-y-6">

            <div class="rounded-lg border border-slate-200 bg-white p-6">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Specification Group
                        </label>

                        <Select v-model="form.specification_group_id" :options="specificationGroups" optionLabel="name"
                            optionValue="id" class="w-full" placeholder=""
                            :loading="specificationGroupLoading" :disabled="specificationGroupLoading"
                            :showClear="true" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Job Code
                        </label>
                        <InputText v-model="form.job_code" class="w-full" placeholder="" required />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Job Name
                        </label>
                        <InputText v-model="form.job_name" class="w-full" placeholder="" required />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Job Category
                        </label>
                        <InputText v-model="form.job_category" class="w-full" placeholder="" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Job Standard
                        </label>
                        <InputText v-model="form.job_standar" class="w-full" placeholder="" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Job Type
                        </label>
                        <InputText v-model="form.job_type" class="w-full" placeholder="" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Job Critical
                        </label>
                        <InputText v-model="form.job_critical" class="w-full" placeholder="" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Job Internal
                        </label>
                        <InputText v-model="form.job_internal" class="w-full" placeholder="" />
                    </div>

                    <div>
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Estimated Hours
                        </label>
                        <InputNumber v-model="form.estimated_hours" class="w-full" placeholder=""
                            :min="0" />
                    </div>

                    <div class="md:col-span-2">
                        <label class="mb-1 block text-sm font-medium text-slate-700">
                            Job Description
                        </label>
                        <Textarea v-model="form.job_desc" class="w-full" placeholder="" rows="4" />
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