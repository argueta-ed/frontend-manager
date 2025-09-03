<template>
  <!-- Table component to display user data with pagination and actions for admin users -->
  <div v-if="users.data && users.data.length > 0" class="overflow-x-auto bg-white rounded-lg shadow">
    <table class="w-full table-auto">
      <thead>
        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">ID</th>
          <th class="py-3 px-6 text-left">Nombre(s)</th>
          <th class="py-3 px-6 text-left">Apellido(s)</th>
          <th class="py-3 px-6 text-left">Correo electrónico</th>
          <th class="py-3 px-6 text-left">Rol</th>
          <th class="py-3 px-6 text-left">Fecha del registro</th>
          <th v-if="isAdmin" class="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 text-sm">
        <tr v-for="user in users.data" :key="user.id" class="hover:bg-gray-100">
          <td class="py-3 px-6 text-left">{{ user.id }}</td>
          <td class="py-3 px-6 text-left">{{ user.firstname }}</td>
          <td class="py-3 px-6 text-left">{{ user.lastname }}</td>
          <td class="py-3 px-6 text-left">{{ user.email }}</td>
          <td class="py-3 px-6 text-left">{{ user.roles[0].name }}</td>
          <td class="py-3 px-6 text-left">{{ new Date(user.created_at).toLocaleDateString() }}</td>
          <!-- Edit and delete buttons for admin users -->
          <td  v-if="isAdmin" class="py-3 px-6 text-left">
            <div class="flex item-center justify-center">
              <button  @click="$emit('edit', user, users.current_page)"
                class="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button v-if="user.id != id" @click="deleteUser(users.current_page, user.id)"
                class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Message when there are no users -->
  <p v-else class="text-gray-500">No hay usuarios registrados.</p>

  <!-- Pagination controls -->
  <div v-if="users" class="flex justify-between items-center mt-6">
      <div>
        <span class="text-sm text-gray-700">
          Página {{ users.current_page }} de {{ users.last_page }}
        </span>
      </div>
      <div class="flex space-x-2">

        <button :disabled="users.current_page === 1" @click="changePage(users.current_page - 1)" class="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50">
          Anterior
        </button>

        <button :disabled="users.current_page === users.last_page" @click="changePage(users.current_page + 1)" class="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50">
          Siguiente
        </button>
      </div>
    </div>

</template>

<script setup lang="ts">
// Defines the props that the component receives from the parent
defineProps(['users', 'isAdmin', 'id'])
// Defines the events that the component emits for the parent
const emit = defineEmits(['edit', 'delete', 'changePage'])

// Function that emits the event to change the page to the parent component
function changePage(page: number) {
  emit('changePage', page)
}

function deleteUser(page: number, id: number) {
  emit('delete', page, id)
}

</script>
