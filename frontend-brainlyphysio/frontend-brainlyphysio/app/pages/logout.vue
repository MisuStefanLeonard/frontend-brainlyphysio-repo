<template>
    <div class="background-wrapper">
      <div class="background"></div>
      <v-container class="content">
        <v-row align="center" no-gutters>
          <v-col>
            <p class="text-center h2 pb-3 font-weight-thin">Pagina pentru delogare</p>
            <v-alert type="success" v-model="succesfullLogoutBanner" closable>
                Ati fost delogat cu succes, redirectionare spre pagina principala.
            </v-alert>
            <v-card class="bg-blue-grey-lighten-4 text-center">
              <v-card-title class="text-h6 text-md-h5 text-lg-h4">BrainlyPhysio</v-card-title>
              <v-card-text class="font-weight-light">Va asteptam din nou pe la noi!</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'

  useSeoMeta({
    title: 'BrainlyPhysio - Delogare',
    keywords:'log out , delogare',
    ogSiteName: 'BrainlyPhysio - Delogare',
    ogType: 'website',
    ogDescription : 'Delogare de pe BrainlyPhysio',
    ogTitle: 'BrainlyPhysio - Delogare',
    description : 'Delogare de pe BrainlyPhysio',
    canonicalUrl: () =>   process.env.NODE_ENV === 'development' ? 'http://localhost:3000/logout' : 'https://brainlyphysio.ro/logout'
  })
  definePageMeta({
    layout: 'default',
  })

  
  // Reactive state
  const succesfullLogoutBanner = ref(false)
  const emitter = useNuxtApp().$emitter
  const config = useRuntimeConfig()
  
  // Methods
  const showSuccesfullLogout = () => {
    succesfullLogoutBanner.value = true
    const info = localStorage.getItem('info')
    if(info !== null){
      localStorage.removeItem('info')
    }
    setTimeout(() => {
      succesfullLogoutBanner.value = false
      navigateTo('/login')
    }, 5000)
  }
  
  const logout = async () => {
    try {
        const method = 'GET'
        const url = 'auth/logout'
        await $fetch(config.public.apiBase + url, {
            method : method,
            credentials: 'include'
        })
        emitter.emit('isLoggedIn' , false);
        showSuccesfullLogout()
    } catch (error) {
        console.error(error)
    }

  }
  
  // Lifecycle hook
  onMounted(async () => {
    await logout()
  })
 </script>
  
  <style scoped>
  .background-wrapper {
    position: relative;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(/cover.jpeg);
    background-size: cover;
    background-position: center;
    opacity: 0.7; 
  }
  
  .content {
    position: relative;
    z-index: 1;
  }
</style>
  