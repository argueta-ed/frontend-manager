<template>
  <!-- Form to create or update user -->
  <form @submit.prevent="submitForm" class="space-y-5">
    <div>
      <!-- Field Name(s) -->
      <label for="firstname" class="block text-sm font-medium text-gray-700">Nombre(s)</label>
      <input v-model="form.firstname" id="firstname" type="text" placeholder="Nombre(s)" required
        class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        <!-- Show validation error for firstname -->
      <p v-if="errors.firstname" class="text-red-500 text-sm mt-1">{{ errors.firstname[0] }}</p>
    </div>

    <div>
      <!-- Last Name(s) Field -->
      <label for="lastname" class="block text-sm font-medium text-gray-700">Apellido(s)</label>
      <input v-model="form.lastname" id="lastname" type="text" placeholder="Apellido(s)" required
        class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        <!-- Show validation error for lastname -->
      <p v-if="errors.lastname" class="text-red-500 text-sm mt-1">{{ errors.lastname[0] }}</p>
    </div>

    <div>
      <!-- Email Field -->
      <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
      <input v-model="form.email" id="email" type="email" :readonly="props.updating" placeholder="Correo electrónico"
        required :class="[
          'mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-100',
          props.updating ? 'opacity-60 cursor-not-allowed' : ''
        ]" />
        <!-- Show validation error for email -->
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</p>
    </div>

    <div>
      <!-- Password Field -->
      <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
      <input v-model="form.password" id="password" type="password" placeholder="Contraseña" :required="!props.updating"
        class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        <!-- Show validation error for password -->
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password[0] }}</p>
    </div>

    <div>
      <!-- Role Selector -->
      <label for="role" class="block text-sm font-medium text-gray-700">Rol</label>
      <select v-model="form.role" id="role" required
        class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <option value="">Seleccionar Rol</option>
        <option value="administrador">Administrador</option>
        <option value="revisor">Revisor</option>
      </select>
      <!-- Show validation error for role -->
      <p v-if="errors.role" class="text-red-500 text-sm mt-1">{{ errors.role[0] }}</p>
    </div>

    <!-- Submit button -->
    <div class="pt-4">
      <button type="submit" :disabled="loading"
        class="w-full min-w-[140px] flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 transition">
        <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <!-- Dynamic text according to status(guardando, actualizar o crear) -->
        <span>{{ loading ? 'Guardando...' : (props.updating ? 'Actualizar' : 'Crear') }}</span>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>

/**
* Props received from the parent component
* - user: user object (in case of editing)
* - updating: Boolean indicating whether it is editing or creating
*/
const props = defineProps({
  user: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  updating: {
    type: Boolean,
    required: false,
    default: false,
  },
})

/**
* Reactive form state that saves field values
*/
const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  role: '',
})

/**
* Watch to sync the form with the user input props
* If in editing mode (updating), fill in the fields with existing data
*/
watch(
  () => props.user,
  (newUser) => {
    if (props.updating && newUser) {
      form.value = {
        firstname: newUser.firstname || '',
        lastname: newUser.lastname || '',
        email: newUser.email || '',
        password: '',
        role: newUser.roles?.[0]?.name || '',
      }
    }
  },
  { immediate: true }
)

/**
* Reactive object for storing validation errors (backend)
* Structure is key: array of messages, to handle multiple errors per field
*/
const errors = ref<Record<string, string[]>>({});

const loading = ref(false)

/**
* Function that handles form submission
* Makes HTTP requests to create or update users via API
* Handles errors and displays backend validation messages in the UI
*/
const submitForm = async () => {

  loading.value = true

  try {
    // URL and HTTP method depending on whether it is created or updated
    const url = props.updating
      ? `/api/users/${props.user.id}`
      : '/api/users';

    const method = props.updating ? 'PUT' : 'POST';

    const payload = { ...form.value }; // Clones the form state for submission
    // If editing and no password is provided, remove it from the payload to avoid overwriting it
    if (props.updating && !payload.password) {
      delete payload.password;
    }

    // Call the API using useSanctumFetch
    const { data, error } = await useSanctumFetch(url, {
      method,
      body: payload,
    });

    // If there is an error, check if there are validation errors to display them in the form
    if (error.value) {
      if (error.value?.data?.errors) {
        errors.value = error.value.data.errors
      } else {
        console.error('Error desconocido:', error.value)
      }
      return
    } else {
      window.location.reload();
    }
  } catch (err) {
    console.error('Excepción al guardar usuario:', err);
  } finally {
    loading.value = false
  }
}
