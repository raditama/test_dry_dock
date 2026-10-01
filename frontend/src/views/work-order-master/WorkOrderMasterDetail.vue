<script setup lang="ts">
import { getWorkOrderMaster } from '@/api/work-order-master'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import type { WorkOrderMaster } from '@/types/work-order-master'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const workOrderMaster = ref<WorkOrderMaster | null>(null)

const fetchWorkOrderMaster = async (): Promise<void> => {
    const id = Number(route.params.id)

    if (!id) return

    try {
        loading.value = true

        const response = await getWorkOrderMaster(id)

        workOrderMaster.value = response.data
    } catch (error) {
        console.error('Failed to get data:', error)
    } finally {
        loading.value = false
    }
}

const goBack = (): void => {
    router.back()
}

onMounted(() => {
    fetchWorkOrderMaster()
})
</script>

<template>
    <div class="min-h-screen bg-slate-50 p-12 text-slate-900">
        <div class="mb-12 flex items-center justify-between">
            <h1 class="text-2xl font-semibold tracking-tight">
                Detail Work Order Master
            </h1>

            <Button type="button" label="Back" severity="secondary" outlined @click="goBack()" />
        </div>

        <div v-if="loading" class="py-8 text-center text-slate-500">
            Loading...
        </div>

        <div v-else-if="workOrderMaster" class="space-y-6">
            <div class="rounded-lg border border-slate-200 bg-white">
                <div class="border-b border-slate-200 px-6 py-4">
                    <h2 class="font-semibold text-slate-800">
                        General Information
                    </h2>
                </div>

                <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                    <div>
                        <p class="text-sm text-slate-500">
                            Job Code
                        </p>
                        <p class="mt-1 font-medium text-slate-800">
                            {{ workOrderMaster.job_code || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Job Name
                        </p>
                        <p class="mt-1 font-medium text-slate-800">
                            {{ workOrderMaster.job_name || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Job Category
                        </p>
                        <p class="mt-1 font-medium text-slate-800">
                            {{ workOrderMaster.job_category || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Job Standar
                        </p>
                        <p class="mt-1 font-medium text-slate-800">
                            {{ workOrderMaster.job_standar || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Job Type
                        </p>
                        <p class="mt-1 font-medium text-slate-800">
                            {{ workOrderMaster.job_type || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Job Critical
                        </p>
                        <p class="mt-1 font-medium text-slate-800">
                            {{ workOrderMaster.job_critical || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Job Internal
                        </p>
                        <p class="mt-1 font-medium text-slate-800">
                            {{ workOrderMaster.job_internal || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Estimated Hours
                        </p>
                        <p class="mt-1 font-medium text-slate-800">
                            {{ workOrderMaster.estimated_hours ?? '-' }}
                        </p>
                    </div>

                    <div class="md:col-span-2">
                        <p class="text-sm text-slate-500">
                            Job Description
                        </p>
                        <p class="mt-1 whitespace-pre-wrap font-medium text-slate-800">
                            {{ workOrderMaster.job_desc || '-' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="rounded-lg border border-slate-200 bg-white p-8 text-center">
            <i class="pi pi-inbox text-4xl text-slate-400"></i>

            <p class="mt-3 text-slate-500">
                Data not found.
            </p>
        </div>
    </div>
</template>