<template>
  <!-- Dashboard template-->
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Lista de registros</h1>

    <!-- Button to create a new user, only visible for admin users -->
    <button v-if="isAdmin" @click="createUser"
      class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4">
      Agregar nuevo registro
    </button>

    <!-- Dashboard table component -->
    <DashboardTable :users="users" :isAdmin="isAdmin" :id="auth.user?.id" @edit="editUser" @delete="deleteUser"
      @changePage="loadUsers" />

      <!-- Modal for creating or editing a user -->
    <DashboardModal v-if="showModal" :user="selectedUser" :updating="!!selectedUser" @saved="handleSaved"
      @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// middleware to only allow access to the page to logged-in users
definePageMeta({
  middleware: ['sanctum:auth'],
});

useHead({ title: 'App Manager | Dashboard' })

// Access to the current user's authentication
const auth = useAuthStore()

const showModal = ref(false) // Controls the visibility of the create/edit user modal
const selectedUser = ref(null) // User selected to edit
const users = ref<any[]>([]) // List of users to display in the table

// Check if the current user is an admin
const isAdmin = auth.userRole == 'administrador' ? true : false

/**
* Loads the paginated user list from the API
* @param {number} page - Page to load (default 1)
*/
const loadUsers = async (page = 1) => {
  try {    
    const { data } = await useSanctumFetch(`/api/users?page=${page}`)    
    users.value = data.value || []
  } catch (err) {
    console.error('Error al cargar usuarios', err)
  }
}

//  Opens the modal to create a new user
const createUser = () => {
  selectedUser.value = null
  showModal.value = true
}

/**
* Opens the modal to edit an existing user
* @param {any} user - User to edit
*/
const editUser = (user) => {
  selectedUser.value = user
  showModal.value = true
}

await loadUsers()

/**
* Delete a user after confirming with the user
* @param {number} id - ID of the user to delete
*/
const deleteUser = async (id: number) => {
  const confirmed = window.confirm('¿Seguro que deseas eliminar este registro?')
  if (!confirmed) return
  try {
    await useSanctumFetch(`/api/users/${id}`, { method: 'DELETE' })
    window.location.reload()
    // await loadUsers()
  } catch (err) {
    console.error('Error al eliminar usuario', err)
  }
}

/**
* Handles the event that a user was saved (created or edited)
* - Closes the modal
* - Reloads the user list
*/
const handleSaved = async () => {
  showModal.value = false
  await loadUsers()
}
</script>
