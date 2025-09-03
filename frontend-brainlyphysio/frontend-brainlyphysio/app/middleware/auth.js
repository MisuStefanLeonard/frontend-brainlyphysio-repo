// middleware/auth.js
import { useUserStore } from "~/store/user";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()  // Adjust this if using Vuex or Pinia
  const emitter = useNuxtApp().$emitter;

  // de folosit set user 
  const isUserloggedInCookie =  useCookie('userLoggedIn')
  const isAdminloggedInCookie =  useCookie('admin')


  const user = {
    auth : isUserloggedInCookie.value === 1,
    admin : isAdminloggedInCookie.value === 1
  }
  userStore.setUser(user)

  emitter.emit('isLoggedIn' , isUserloggedInCookie.value)

  if (!userStore.isAuthenticated) {
    const logoutMessage = "Trebuie sa fiti logat!"
    userStore.showSnackbar(logoutMessage);
    return navigateTo('/logout');
    
  }
});
