/**
* Middleware that automatically redirects to the appropriate page
* depending on the user's authentication status.
*
* If the user is authenticated, they are redirected to /dashboard.
* If they are not authenticated, they are redirected to /auth/login.
*/

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated } = useSanctumAuth()

  if (isAuthenticated.value) {
    return navigateTo('/dashboard')
  } else {
    return navigateTo('/auth/login')
  }
})
