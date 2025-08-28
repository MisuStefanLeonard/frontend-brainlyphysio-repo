<template>
    <div>
      <NavigationDrawer 
        :sidebar="sidebar" 
        :menu-items="menuItems" 
        :admin-items="adminItems"
      />
      <v-toolbar style="z-index: 2;" color="grey-darken-4" >
        <v-app-bar-nav-icon class="d-sm-flex" @click="sidebar = !sidebar" />
        <v-toolbar-title class="d-none d-sm-flex align-center h-100">
          <NuxtLink to="home"  class="text-decoration-none d-flex align-center cursor-pointer">
            <NuxtImg loading="lazy" src="/logo.png" 
            alt="Logo" :height="50" :width="50" class="mr-1"  format="webp"/>
          </NuxtLink>
        </v-toolbar-title>
        <div class="d-none d-md-flex align-center flex-grow-1">
          <v-menu v-for="item in menuItems" :key="item.title" v-model="item.showItems">
            <template v-slot:activator="{ props }">
              <v-btn @click="handleMenuClick(item)" text v-bind="props" density="compact" size="100">
                <v-tooltip :text="item.text">
                  <template v-slot:activator="{ props }">
                    <div class="d-block">
                      <v-icon v-bind="props" :icon="item.icon"></v-icon>
                      <p class="mt-2">{{ item.text }}</p>
                    </div>
                  </template>
                </v-tooltip>
              </v-btn>
            </template>

            <v-list v-if="item.dropdown.length > 0">
              <v-list-item
                v-for="dropitem in item.dropdown"
                :key="dropitem.title"
                :to="dropitem.path"
                class="hover:tw-bg-gray-600 dark:hover:tw-bg-gray-600 hover:tw-cursor-pointer"
              >
                <v-list-item-title @click="navigateTo(dropitem.path)">
                  <v-icon class="mr-2" :icon="dropitem.icon"></v-icon>
                  {{ dropitem.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-spacer></v-spacer>
        <div class="d-block align-end text-end pa-3">
          <p class="text-white font-weight-thin text-subtitle-1">
            <v-icon :icon="mdiPhone" size="18"></v-icon>
            0725283713
          </p>
          <p class="text-white font-weight-thin text-subtitle-1">
            <v-icon :icon="mdiEmail" size="18"></v-icon>
            pascu.aeduard@yahoo.com
          </p>
        </div>
      </v-toolbar>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import NavigationDrawer from './NavigationDrawer.vue' 
  import { mdiHome, mdiInformation,mdiAccountGroup, mdiPhone, mdiEmail, mdiSecurity,mdiBookOpen} from '@mdi/js'
  
  const sidebar = ref(false)
  const isLoggedIn = ref(false)
  const emitter = useNuxtApp().$emitter
  const isClient = ref(false)
  
  function handleMenuClick(item) {
    // If the item has a dropdown (dynamic), toggle it instead of navigating.
    if (item.dropdown && item.dropdown.length > 0) {
      item.showItems = !item.showItems;
    } else {
      navigateTo(item.path);
    }
  }
  
  
  // Define your menu items with translation keys
  const menuItems = [
    { title: 'Acasa', path: '/home', icon: mdiHome , dropdown: [],text: 'Acasa'},
    { title: 'Academie', path: '/academy', icon: mdiInformation , dropdown: [],text: 'Academie'},
    { title: 'Echipa', path: '/team', icon: mdiAccountGroup, dropdown: [] ,text: 'Echipa'},
    { title: 'Cursuri', path: '/courses', icon: mdiBookOpen, dropdown: [] ,text: 'Cursuri'},
  ]

  const adminItems = ref([
    {title: 'Administrare' , path: '/admin/login' , icon: mdiSecurity  }
  ])
  
  // const menuItems2 = ref([
  //   { title: 'menu.profile', path: '/user/profile', icon: mdiAccount, dropdown: [] , dynamic : false },
  //   { 
  //     title: 'menu.shop', 
  //     path: '/shop', 
  //     icon: mdiStore,
  //     // initially empty; will be updated dynamically
  //     dropdown: [] 
  //   },
  //   { title: 'menu.shoppingCart', path: '/cart', icon: mdiShoppingOutline, dropdown: [] ,dynamic : false }
  // ])
  
  // const adminItems = ref([
  //   {title: 'menu.admin' , path: '/admin/login' , icon: mdiSecurity,dynamic : false  }
  // ])
  
  
  if (emitter) {
    emitter.on('isLoggedIn', (status) => {
      isLoggedIn.value = status;
    })
  }
  // const getCartCount = computed(() => { 
  //   try {
  //     localStorage.setItem('test' , 'test');
  //     var getItem = localStorage.getItem('test');
  //     if(getItem !== null ){
  //       localStorage.removeItem('test');
  //       var cartCountS = localStorage.getItem('cartCount');
  //       if(cartCountS === null){
  //         localStorage.setItem('cartCount' , '0')
  //       }
  //       cartCountS = localStorage.getItem('cartCount')
  //       cartCount.value = String(parseInt(cartCountS))
  //     }
  //   } catch (exception) {
  //     console.error("Local storage not available" , ex);
  //     return 0 // def value
  //   }
  // })
  
  // const getProductTypesAndCategories = (async () => {
  //   const productTypesAndCategories = await productService.getProductTypesAndCategoriesForUser()
  //   productTypesRo.value = productTypesAndCategories.productTypesJson.map(elem => elem.tip_ro)
  //   productTypesEn.value = productTypesAndCategories.productTypesJson.map(elem => elem.tip_en)
    
  // })
  
  // const shopDropdown = computed(() => {
  //   // Always include a static "all products" option and "sets"
  //   const staticItems = [
  //     { title: 'menu.allProducts', path: '/shop', icon: mdiPackageVariant, query: {} ,dynamic : false },
  //     { title: 'menu.sets', path: '/shopSeturi', icon: mdiGift, query: {} ,dynamic : false }
  //   ]
  //   // Build dynamic items from productTypes arrays
  //   const dynamicItems = productTypesRo.value.map((tipRo, index) => {
  //     const tipEn = productTypesEn.value[index] || tipRo;
  //     return {
  //       // Display the appropriate title based on the locale
  //       title: (locale.value === 'ro' ? tipRo : tipEn).toUpperCase(),
  //       // Always store the Romanian version as the "value" field
  //       value: tipRo,
  //       path: '/shop',
  //       icon: mdiArrowRight,
  //       query: { type: tipRo.toLowerCase() },
  //       dynamic: true,
  //     }
  //   })
  //   return [...staticItems, ...dynamicItems]
  // })
  
  
  // // Watch the computed shopDropdown and update only the shop part of menuItems2
  // watch(shopDropdown, (newDropdown) => {
  //   const shopItem = menuItems2.value.find(item => item.title === 'menu.shop')
  //   if (shopItem) {
  //     shopItem.dropdown = newDropdown
  //   }
  // }, { immediate: true })
  
  
  
  // function toggleDropdown(item) {
  //   item.expand = !item.expand;
  //   menuItems2.value.forEach(menuItem => {
  //     if (menuItem !== item) {
  //       menuItem.expand = false;
  //     }
  //   });
  // }
  
  function isAuthenticated() {
    const token = useCookie('userLoggedIn');
    return token.value === 1;
  }
  
  // Run this once the component is mounted
  onMounted(async () => {
    isLoggedIn.value = isAuthenticated();
    isClient.value = true;
  })
  
  
  </script>
  