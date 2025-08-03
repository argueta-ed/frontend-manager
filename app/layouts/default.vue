<template>
  <!-- Main layout with navigation bar -->
  <div class="h-screen">
    <nav class="bg-gray-800 text-white py-3 px-4 flex items-center justify-between">

        <!-- Section to display to authenticated users -->
      <template v-if="isAuthenticated && user">
        <span class="font-bold text-xl tracking-tight">App Manager</span>
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <span> Bienvenido, {{ user.firstname }} {{ user.lastname }}</span>
        </div>
        <div class="flex items-center">
          <NuxtLink to="/dashboard" class="text-sm px-4 py-2 leading-none rounded-full hover:bg-gray-700">Dashboard
          </NuxtLink>
          <button @click.prevent="logoutUser" class="text-red-600 hover:text-red-800">Cerrar sesión</button>
        </div>
      </template>

      <!-- Section to display to authenticated users -->
      <template v-if="!isAuthenticated">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <span> Bienvenido a <span class="font-bold text-xl tracking-tight"> App Manager</span></span>
        </div>
      </template>
    </nav>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">

// Interface for typing the authenticated user
interface User {
  firstname: string;
  lastname: string;
  email: string;
}

const { isAuthenticated, user, logout } = useSanctumAuth<User>(); // Sanctum Authentication Composable
const authStore = useAuthStore() //Store global to save the user

// Watch for changes in the user object and update the auth store
watchEffect(() => {
  if (user.value) {
    authStore.setUser(user.value)
  }
})

// Function to handle user logout
function logoutUser() {
  logout();
  authStore.logout();
}
</script>
