// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['@nuxt/eslint', '@nuxt/ui', 'nuxt-auth-sanctum', '@pinia/nuxt'],

  sanctum: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8000', // Laravel API
    mode: 'cookie',
    redirect: {
      keepRequestedRoute: false,
      onLogin: '/dashboard',
      onLogout: '/auth/login',
      onAuthOnly: '/auth/login',
      onGuestOnly: '/dashboard',
    },
  },
})