<template>
  <!-- Modal component -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-xl relative">
      <!-- Close button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        aria-label="Cerrar"
      >
        ✕
      </button>

      <!-- Header -->
      <div class="px-6 pt-6 pb-2 border-b">
        <h2 class="text-xl font-semibold text-gray-800">
          {{ updating ? 'Editar Usuario' : 'Crear Usuario' }}
        </h2>
      </div>

      <!-- Form content -->
      <div class="p-6">
        <DashboardForm
          :user="user"
          :updating="updating"
          @saved="$emit('saved')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
/**
* Props received:
* - user: Object with the user's data to edit (or null to create a new one)
* - updating: Boolean indicating whether the modal is in edit mode (true) or create mode (false)
*/
defineProps(['user', 'updating'])

/**
* Emitted events:
* - 'close': Emitted when the user closes the modal
* - 'saved': Emitted when the form indicates that the data was saved successfully
*/
defineEmits(['close', 'saved'])
</script>
