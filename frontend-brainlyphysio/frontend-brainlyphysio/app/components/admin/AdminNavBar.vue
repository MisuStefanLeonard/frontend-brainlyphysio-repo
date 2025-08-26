<template>
    <div>
      <!-- Toolbar -->
      <v-toolbar app color="blue-grey-darken-4">
        <v-btn icon @click="toggleSidebar">
          <v-icon :icon="mdiMenu"></v-icon>
        </v-btn>
        <v-toolbar-title>Admin Panel</v-toolbar-title>
      </v-toolbar>
  
      <!-- Navigation Drawer -->
      <v-navigation-drawer v-model="sidebar" app color="blue-grey-darken-4" temporary class="text-center">
        <img src="/logo.png" alt="Logo" height="100" class="mr-1 text-center" />
  
        <v-list center>
          <v-hover v-slot="{ isHovering, props }">
            <v-list-item 
              v-bind="item.dropdown.length > 0 ? props : {}"
              v-for="item in navAdminItems"
              :key="item.title"
              :to="item.path"
            >
              <v-icon  :icon="item.icon">
              </v-icon>
              {{ item.title }}
  
              <v-expand-transition v-if="isHovering">
                <v-list right  v-if="item.dropdown.length > 0 ">
                  <v-list-item
                    v-for="dropdownItem in item.dropdown"
                    :key="dropdownItem.title"
                    :to="dropdownItem.path"
                  >
                    <v-icon :icon=" dropdownItem.icon">
                    </v-icon>
                    {{ dropdownItem.title }}
                  </v-list-item>
                </v-list>
              </v-expand-transition>
            </v-list-item>
          </v-hover>
        </v-list>
      </v-navigation-drawer>
    </div>
  </template>
  
  <script setup>
  import { mdiAccountGroupOutline, mdiFileDocumentMultipleOutline, mdiHome, mdiLightbulbOutline, mdiMapMarker,mdiMenu } from '@mdi/js';
  
  const sidebar = ref(false);
  
  const navAdminItems = ref([
    {
      title: 'Echipa',
      path: '/admin/team',
      icon: mdiAccountGroupOutline,
      dropdown: []
    },
    {
      title: 'Locatii',
      path: '/admin/locations',
      icon: mdiMapMarker,
      dropdown: []
    },
    {
      title: 'Calitati',
      path: '/admin/qualities',
      icon: mdiLightbulbOutline,
      dropdown: []
    },
    {
      title: 'Anunturi / Cursuri',
      path: '/admin/announces',
      icon: mdiFileDocumentMultipleOutline,
      dropdown: []
    },
    {
      title: 'Pagina Acasa',
      path: '/home',
      icon: mdiHome,
      dropdown: []
    },
  ]);
  
  const toggleSidebar = () => {
    sidebar.value = !sidebar.value;
  };
  </script>
  