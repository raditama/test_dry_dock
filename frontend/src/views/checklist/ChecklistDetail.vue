<script setup lang="ts">
import { getChecklist } from '@/api/checklist'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import type { Checklist } from '@/types/checklist'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const checklist = ref<Checklist | null>(null)

const fetchChecklist = async (): Promise<void> => {
    const id = Number(route.params.id)

    if (!id) return

    try {
        loading.value = true

        const response = await getChecklist(id)

        checklist.value = response.data
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
    fetchChecklist()
})
</script>

<template>
    <div class="min-h-screen bg-slate-50 p-12 text-slate-900">
        <div class="mb-12 flex items-center justify-between">
            <h1 class="text-2xl font-semibold tracking-tight">
                Detail Checklist
            </h1>

            <Button type="button" label="Back" severity="secondary" outlined @click="goBack()" />
        </div>

        <div v-if="loading" class="py-8 text-center text-slate-500">
            Loading...
        </div>

        <div v-else-if="checklist" class="space-y-6">
            <div class="rounded-lg border border-slate-200 bg-white">
                <div class="border-b border-slate-200 px-6 py-4">
                    <h2 class="font-semibold text-slate-800">
                        General Information
                    </h2>
                </div>

                <div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                    <div>
                        <p class="text-sm text-slate-500">
                            Name
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ checklist.name || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Description
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ checklist.description || '-' }}
                        </p>
                    </div>

                    <div>
                        <p class="text-sm text-slate-500">
                            Status
                        </p>

                        <p class="mt-1 font-medium text-slate-800">
                            {{ checklist.is_active ? 'Active' : 'Inactive' }}
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