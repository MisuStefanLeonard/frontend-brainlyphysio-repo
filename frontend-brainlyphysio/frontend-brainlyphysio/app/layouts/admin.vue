<template>
    <v-app>
      <AdminNavBar />
      <v-main>
        <SnackbarExpired />
        <NuxtPage />
      </v-main>
      <AdminFooter />
    </v-app>
  </template>
  
  <script setup>
  import AdminNavBar from '~/components/admin/AdminNavBar.vue';
  import AdminFooter from '~/components/admin/AdminFooter.vue';
  import SnackbarExpired from '~/components/SnackbarExpired.vue';
  
  </script>