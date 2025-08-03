<template>
  <!-- content for the login page -->
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

      <!-- Title and description for the login page -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">
          Inicio de Sesión
        </h1>
        <p class="text-gray-600 mt-2">
          Por favor ingrese sus credenciales para acceder
        </p>
      </div>

      <!-- Form for user login -->
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <input v-model="form.email" type="email" id="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com" required>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input v-model="form.password" type="password" id="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••" required>
        </div>

        <!-- Error message display -->
        <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>

        <!-- Submit button -->
        <button type="submit" :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 disabled:opacity-50">
          <span v-if="!loading">Iniciar sesión</span>
          <span v-else>Ingresando...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

// Page only accessible to unauthenticated users
definePageMeta({
  middleware: ['sanctum:guest'],
})

useHead({
  title: 'App Manager | Login'
})

const { login } = useSanctumAuth(); // Authentication Composable with Sanctum

// Form status
const form = ref({
  email: '',
  password: '',
})

const loading = ref(false) // Loading state while the form is being submitted
const error = ref('') // Error message to display if login fails

/**
* Submits the form to the backend
* Authenticates the user using Sanctum
*/
const submitForm = async () => {
  loading.value = true
  error.value = ''

  try {
    await login(form.value) // sanctum endpoint for login
  } catch (err: any) {
    // Validation or login error
    if (err.response?._data?.message) {
      error.value = err.response._data.message
    } else {
      error.value = 'Ocurrió un error. Intente de nuevo.'
    }
  } finally {
    loading.value = false
  }
}

</script>
