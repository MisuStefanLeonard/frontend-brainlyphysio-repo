<template>
    <div class="background-wrapper">
      <div class="background"></div>
      <v-container class="content" fluid>
        <v-row align="center" no-gutters>
          <v-container class="w-100 " fluid>
            <v-col class="p-4">
              <v-card class="elevation-24 rounded-xl border-md">
                <v-card-title>
                  <v-alert type="error" v-model="wrongCredentialsBanner" closable>
                      Numele sau parola sunt gresite / Nu ati activat contul
                  </v-alert>
                  <v-alert type="error" v-model="errorBanner" closable>
                      O eroare a avut loc, va rugam incercati mai tarziu!
                  </v-alert>
                  <v-alert type="info" v-model="waitLogInBanner" closable>
                      Logare in curs...
                  </v-alert>
                  <p class="text-center my-2  pb-3 font-weight-normal">Logheaza-te in cont</p>
                </v-card-title>
                <v-card-text>
                  <v-form ref="loginForm" validate-on="submit" @submit.prevent="loginAccount" >
                    <v-text-field class="p-1 m-1" 
                      v-for="data in dataForm"
                      :key="data.model"
                      :label="data.label"
                      :placeholder="data.placeholder"
                      :type="data.model === 'password' ? (passwordVisible ? 'text' : 'password') : data.type" 
                      :append-icon="data.model === 'password' ? (passwordVisible ? mdiEyeOff : mdiEye) : ''"
                      @click:append="data.model === 'password' ? togglePasswordVisibility() : ''" 
                      v-model="formData[data.model]"
                      :rules="[rules.required]"
                      variant="outlined"
                    ></v-text-field>
                    <v-container class="text-center">
                      <v-btn
                        rounded="xl"
                        type="submit"
                        color="green"
                        class="font-weight-bold elevation-24"
                      >
                      Logheaza-te
                        <v-icon class="pl-2" :icon="mdiLogin" size="24"></v-icon>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <!-- <v-btn
                        rounded="xl"
                        type="submit"
                        @click="GoogleLogIn"
                        variant="outlined"
                        class="font-weight-bold bg-blue-lighten-1 mt-2"
                      >
                      Google
                        <v-icon class="pl-2" :icon="mdiGooglePlus" size="24"></v-icon>
                      </v-btn>
                      <v-spacer></v-spacer> -->
                      <!-- <v-btn
                        rounded="xl"
                        type="button"
                        @click="forgotPassword"
                        variant="outlined"
                        color="red"
                        class="font-weight-bold bg-grey-lighten-3 mt-2"
                      >
                        Am uitat parola
                        <v-icon class="pl-2" :icon="mdiLockQuestion" size="24"></v-icon>
                      </v-btn>
                      <v-spacer></v-spacer> -->
      
                      <v-btn
                        rounded="xl"
                        type="button"
                        class="font-weight-bold mt-6 elevation-24"
                      >
                        <nuxt-link
                          to="/register"
                          style="cursor: pointer"
                          class="text-decoration-none"
                        >
                        Nu ai cont?
                        </nuxt-link>
                      </v-btn>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-container>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { mdiEye, mdiEyeOff, mdiGooglePlus, mdiLockQuestion, mdiLogin } from '@mdi/js';
  import { useUserStore } from '~/store/user';
  
  definePageMeta({
    layout: 'default',
  })

  useSeoMeta({
    title: 'BrainlyPhysio - Logare',
    keywords:'log in , logare',
    ogSiteName: 'Brainly Physio: Fizioterapie Bazată pe Dovezi și Educație Medicală',
    ogType: 'website',
    ogDescription : 'Logheaza-te pe BrainlyPhysio Academy pentru a intra in orizontul larg al cunoasterii fizioterapiei si kinetoterapiei',
    ogTitle: 'BrainlyPhysio - Logare',
    description : 'Logheaza-te pe BrainlyPhysio Academy pentru a intra in orizontul larg al cunoasterii fizioterapiei si kinetoterapiei',
    canonicalUrl: () =>  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/login' : 'to-add'
  })
  
  
  // State
  const wrongCredentialsBanner = ref(false)
  const errorBanner = ref(false)
  const waitLogInBanner = ref(false)
  // const stayLoggedIn = ref(false)
  const isLoggedIn = ref(false)
  const loginForm = ref(null)

  const config = useRuntimeConfig()
  const emitter = useNuxtApp().$emitter;
  const store = useUserStore();
  const $swal = useNuxtApp().$swal;
  
  // Define reactive state for password visibility
  const passwordVisible = ref(false);
  
  // Toggle function for password visibility
  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
  }
  
  const formData = ref({
    username_email: '',
    password: ''
  })
  
  const dataForm = [
    {
      label: "E-mail",
      placeholder: 'Georgel@gmail.com',
      type: 'text',
      model: 'username_email'
    },
    {
      label:  "Parola",
      placeholder: '',
      type: 'password',
      model: 'password'
    }
  ]
  
  const rules = {
    required: value => !!value || "Acest camp este obligatoriu!"
  }
  
  // Methods
  const showWrongCredentialsBanner = () => {
    wrongCredentialsBanner.value = true
    setTimeout(() => {
      wrongCredentialsBanner.value = false
    }, 3000)
  }
  
  const showError = () => {
    errorBanner.value = true
    setTimeout(() => {
      errorBanner.value = false
    }, 3000)
  }
  

  
  const loginAccount = async () => {
    // Ensure the form exists and the validate method is available
    const isValid = await loginForm.value.validate();
    waitLogInBanner.value = true;
    if (isValid.valid) {
        const boydObj = {
            NumeProp : formData.value.username_email ,
            ParolaProp :  formData.value.password,
            TokenProp : '',
            RoleProp: ''
        }
        const {error} = useFetch(config.public.apiBase + 'auth/login' , {
          method: 'POST',
          credentials: 'include',
          body: boydObj
        })
        console.log(error.value)
        if(error.value === undefined){
            isLoggedIn.value = true;
            await emitter.emit('isLoggedIn', isLoggedIn.value);
            store.initializeAuth();
            localStorage.setItem('info' , formData.value.username_email);
            navigateTo("/home")
            waitLogInBanner.value = false;
        }else{
            if(error.value.statusCode === 404){
                waitLogInBanner.value = false;
                showWrongCredentialsBanner()
            }else {
                waitLogInBanner.value = false;
                showError();
            }
            return;
        }
    } else {
        $swal.fire({
            icon: 'error',
            title: "Eroare",
            text: "Verificati formularul",
            timer: 2000
        });
        waitLogInBanner.value = false;
    }
  };
  
  
  
//   const forgotPassword = () => {
//     navigateTo(localePath('/user/forgotpassword'))
//   }
  
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
    z-index: 1; /* Ensures the content is above the background */
  }
  </style>
  