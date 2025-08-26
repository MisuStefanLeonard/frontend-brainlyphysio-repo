<template>
    <v-navigation-drawer color="grey-darken-4" v-model="internalSidebar" temporary  style="position:fixed; top:0; left:0; overflow-y:scroll;">
      <div class="text-center">
        <v-divider v-for="i in 10" :key="i" opacity="0"></v-divider>
        <NuxtImg
         class="text-center"
         src="/logo.png"  format="webp"
          width="75" loading="lazy"
          height="75"
          alt="Logo">
  
          </NuxtImg>
      </div>
      <v-list class="text-center d-flex flex-column fill-height">
        <!-- Menu items -->
        <v-list-item v-for="item in menuItems" :key="item.title" @click="goTo(item.path)">
          <v-list-item-title> <v-icon class="mr-2" :icon="item.icon"></v-icon>{{ item.title  }}</v-list-item-title>
        </v-list-item>
        
        <!-- Dropdown items -->
        <!-- <v-list-item v-for="item in menuItems2" :key="item.title" @click="item.dropdown.length > 0 ? toggleDropdown(item) : goTo(item.path)" >
          <v-list-item-title>
            <v-icon class="mr-2" :icon="item.icon"></v-icon>
            {{ $t(item.title)}}
          </v-list-item-title>
          <template v-if="item.dropdown.length > 0">
            <v-expand-transition>
              <v-list v-if="item.expand" >
                <v-list-item v-for="dropitem in item.dropdown" :key="dropitem.title" @click="handleDropDown(dropitem )">
                  <v-list-item-title>
                    <v-icon class="mr-2" :icon="dropitem.icon"></v-icon>
                    {{dropitem.dynamic === true ? `${dropitem.title}`  :`${ $t(dropitem.title) }` }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expand-transition>
          </template>
        </v-list-item> -->
        <div v-if="useCookie('admin').value === 1">
          <v-list-item v-for="item in adminItems" :key="item.title" @click="goToQuery(item.path)">
            <v-list-item-title> <v-icon class="mr-2" :icon="item.icon"></v-icon>{{item.title  }}</v-list-item-title>
          </v-list-item>
        </div>
        
        <v-spacer></v-spacer>
        <v-container fluid class="text-center" >
          <v-row no-gutters>
            <v-col cols="12"  >
              <v-btn variant="flat" block :color="isLoggedIn === true ? 'error' : 'success' "
              @click="emitButtonAction">
                <div v-if="isLoggedIn === true">
                  <span>Delogare <v-icon :icon="mdiArrowLeft"></v-icon></span>
                </div>
                <div v-else>
                  <span>Logare <v-icon :icon="mdiArrowRight"></v-icon></span>
                </div>
              </v-btn>
              <v-btn v-if="isLoggedIn === false" 
              variant="flat" block color="primary" @click="goToRegister" class="mt-2">
                <span>Inregistrare <v-icon :icon="mdiAccountPlus"></v-icon></span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { useNuxtApp } from '#app'
  import { mdiAccountPlus, mdiArrowLeft, mdiArrowRight } from '@mdi/js';

  // Define props
  const props = defineProps({
    sidebar: Boolean,
    menuItems: Array,
    // menuItems2: Array,
    adminItems: Array
  })
  

  
  
  
  
  // Reactive state
  const internalSidebar = ref(props.sidebar)
  const isLoggedIn = ref(false)
  
  const emitter = useNuxtApp().$emitter
  const isClient = ref(false)
  
  watch(() => props.sidebar, (newValue) => {
    internalSidebar.value = newValue
  })
  
  // Methods
  const getCookie = (name) => {
    return useCookie(name).value
  }
  
  
  emitter.on('isLoggedIn' , (state) => {
    if(state === true){
      isLoggedIn.value = true;
    }else {
      isLoggedIn.value = false;
    }
  })
  
  
  
  
  const emitButtonAction = () => {
    if(isLoggedIn.value === true){
      navigateTo('/logout')
    }else{
      navigateTo('/login')
    }
  }
  
  const goToRegister = () => {
    navigateTo('/user/register')
  }
  
  
  const goTo = (path) => {
    navigateTo(path)

  }
  
  const goToQuery = (pathP) => {
    navigateTo({path : pathP , query : {redirect: 'redirect'}})
  }
  
  // const handleDropDown = (dropitem ) => {
  //   console.log(dropitem , dropitem.dynamic , dropitem.value)
  //   if(dropitem.dynamic === true){
  //     currentDropDown(dropitem.title , dropitem.dynamic , dropitem.value)
  //   }else{
  //     currentDropDown(t(dropitem.title), 'none' )
  //   }
   
  // }
  
  // function toggleDropdown(item) {
  //   console.log(item)
  //   item.expand = !item.expand;
  //   props.menuItems2.forEach(menuItem => {
  //     if (menuItem !== item) {
  //       menuItem.expand = false;
  //     }
  //   });
  // }
  
  onMounted(() => {
    isLoggedIn.value = getCookie('userLoggedIn') === 1
    isClient.value = true
  })
  
  </script>
  
  