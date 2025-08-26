<template>
    <div class="background-wrapper">
      <div class="background"></div>
      <v-row align="center" no-gutters class="content">
        <v-col class="d-flex align-center justify-center">
          <v-container class="text-center overBackground">
            <p class="text-h3 mt-2 font-weight-thin">STUDENT NOU</p>
          </v-container>
        </v-col>
        <v-col cols="12" md="8" class="">
          <v-container fluid class="d-flex align-center justify-center h-screen ">
            <div class="w-100 d-block" fluid>
              <v-card class="rounded-xl elevation-24 border-md">
                <v-card-title>
                  <v-alert type="success" v-model="succesfullAlert" closable>
                    <p>V-ati inregistrat cu succes!</p>
                    <p>Am trimis un mail de confirmare la adresa de mail</p> 
                  </v-alert>
                  <v-alert type="error" v-model="unsuccesfullAlert" closable>
                    A fost o problema la inregistrare , incercati din nou!
                  </v-alert>
                  <v-alert v-if="waitRegister" type="grey" v-model="waitRegister" closable>
                    Asteptati...Inregistrare se realizeaza...
                  </v-alert>
                  <p class="text-h5 my-4 font-weight-thin text-center ">Inregistrare</p>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" validate-on="submit" @submit.prevent="registerAccount" class="">
                    <v-text-field class="p-2"
                      v-model="email"
                      label="E-mail"
                      placeholder=""
                      type="email"
                      :rules="[rules.required, rules.emailRule, rules.emailExists]"
                      clearable
                      variant="outlined"
                    ></v-text-field>
                    <v-text-field class="p-2"
                      v-model="password"
                      label="Parola"
                      placeholder="Password"
                      :type="passwordVisible ? 'text' : 'password'"
                      :append-icon="passwordVisible ? mdiEyeOff : mdiEye" 
                      @click:append="togglePasswordVisibility"
                      :rules="[rules.required, rules.passwordRule]"
                      variant="outlined"
                      clearable
                    ></v-text-field>
                    <v-text-field class="p-2"
                      v-model="r_password"
                      label="Repeta parola"
                      placeholder="Password"
                      :type="passwordVisible ? 'text' : 'password'"
                      :append-icon="passwordVisible ? mdiEyeOff : mdiEye" 
                      @click:append="togglePasswordVisibility"
                      :rules="[rules.required, rules.repeatPasswordRule]"
                      variant="outlined"
                      clearable
                    ></v-text-field>
                    <v-container class="text-center d-sm-flex d-xs-block">
                      <v-btn
                        rounded="xl"
                        type="submit"
                        variant="outlined"
                        color="green"
                        class="font-weight-bold bg-grey-lighten-3"
                        :disabled="isRegistering"
                      >
                      Inregistreaza-te
                        <v-icon class="pl-1"  :icon="mdiAccountPlus" size="24"></v-icon>
                      </v-btn>
                      <v-spacer class="mt-2"></v-spacer>
                      <v-btn
                        rounded="xl"
                        @click="navigateTo('/login')"
                        type="button"
                        variant="outlined"
                        color="blue"
                        class="font-weight-bold bg-grey-lighten-3"
                      >
                      Deja aveti cont?
                        <v-icon class="pl-1" :icon="mdiLogin" size="24"></v-icon>
                      </v-btn>
                    </v-container>
                    <v-container class="justify-center d-flex">
                      <div>
                        <v-checkbox
                          v-model="termsAndConditions"
                          color="primary"
                          label="Sunt de acord cu termenii si conditiile"
                          value="success"
                          :rules="[rules.required]"
                        ></v-checkbox>
                      </div>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </div>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script setup>
  import { mdiAccountPlus, mdiEye, mdiEyeOff, mdiLogin } from '@mdi/js';
  
  definePageMeta({
    layout: 'default',
  })

  useSeoMeta({
    title: 'BrainlyPhysio - Inregistrare',
    keywords: "cursuri fizioterapie online, cursuri kinetoterapie online, înregistrare cursuri fizioterapie, înscriere cursuri kinetoterapie, cursuri fizioterapie acreditate, cursuri kinetoterapie acreditate, platformă cursuri fizioterapie, platformă cursuri kinetoterapie, învață fizioterapie online, învață kinetoterapie online, program de formare fizioterapie, program de formare kinetoterapie, training fizioterapie online, training kinetoterapie online, creare cont cursuri fizioterapie, creare cont cursuri kinetoterapie, cont student fizioterapie, cont student kinetoterapie, beneficii cont cursuri fizioterapie, beneficii cont cursuri kinetoterapie, înregistrare rapidă cursuri fizioterapie, înregistrare rapidă cursuri kinetoterapie, cursuri online recuperare medicală, cursuri online reabilitare, acces cursuri fizioterapie, acces cursuri kinetoterapie, cont premium cursuri fizioterapie, cont premium cursuri kinetoterapie, înscriere rapidă fizioterapie, înscriere rapidă kinetoterapie, reduceri cursuri fizioterapie, reduceri cursuri kinetoterapie",
    ogSiteName: 'Brainly Physio: Fizioterapie Bazată pe Dovezi și Educație Medicală',
    ogType: 'website',
    ogDescription : 'Inregistreaza-te pe BrainlyPhysio. Totul la un click distanta de cele mai bune cursuri de fizioterapie.',
    ogTitle: 'BrainlyPhysio - Inregistrare',
    description : 'Inregistreaza-te pe BrainlyPhysio. Totul la un click distanta de cele mai bune cursuri de fizioterapie.',
    canonicalUrl: () =>   process.env.NODE_ENV === 'development' ? 'http://localhost:3000/register' : 'to-add'
  })
  
  const config = useRuntimeConfig()

  // Reactive state to track password visibility
  const passwordVisible = ref(false);
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
  }
  
  const swal = useNuxtApp().$swal;
  
  function fireAlarm(icon, title, text, isLoading = null) {
      if (isLoading === true) {
          swal.fire({
              icon: 'info',
              title: title,
              text: text,
              allowOutsideClick: false,
              showConfirmButton: false,
              didOpen: () => {
                  swal.showLoading();
              },
          });
      } else{
          swal.fire({
              icon: icon,
              title: title,
              text: text,
              showConfirmButton: true
          });
      }
  }
  
  // Regular expressions for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@\[\\\]\^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@\[\\\]\^_`{|}~]{8,}$/
  
  const email = ref('')
  const password = ref('')
  const r_password = ref('')
  const succesfullAlert = ref(false)
  const unsuccesfullAlert = ref(false)
  const termsAndConditions = ref(false)
  const isRegistering = ref(false)
  const waitRegister = ref(false)
  const form = ref(null)
//   const {t} = useI18n();
  
  // Validation rules
  const rules = {
    required: value => !!value || 'Acest camp este obligatoriu',
    emailRule: value => emailRegex.test(value) ||  'Formatul de email nu este corespunzator',
    passwordRule: value => passwordRegex.test(value) || 'Parola trebuie sa contina cel putin 8 caractere, dintre care o litera mare , o litera mica , o cifra si un caracter special',
    repeatPasswordRule: value => value === password.value ||'Parolele nu coincid',
    emailExists : async(value) => {
      // const response = await $fetch(config.public.apiBase + "auth/getUserByEmail" , {
      //   method: 'POST',
      //   body : {
      //     email : value
      //   },
      // })
      const {error} = await useFetch(config.public.apiBase + "auth/getUserByEmail" , {
        method: 'POST',
        body : {
          email : value
        },
        watch: false
      })


      if(error.value !== null){
        if(error.value.statusCode === 404){
            return true;
        }
      }else{
        swal.close()
        fireAlarm('warning' , 'Atentie' , 'E-mail-ul este deja folosit!' , null)
        return false;
      }
    },
    // usernameExists : async(value) => {
    //   let response = await RegisterService.getUsernameInDbAsync(value)
  
    //   if(response === 1){
    //       swal.close()
    //       fireAlarm('warning' ,  t('sweetAlert2.Attention') , t('sweetAlert2.UsernameExists') , null)
    //       return false;
    //   }else if (response === -4){
    //     return true;
    //   }
    // }
  }
  
  const showSuccesfulRegistrationBanner = () => {
    succesfullAlert.value = true
    setTimeout(() => {
      succesfullAlert.value = false
    }, 4000)
  }
  
  const showUnsuccesfulRegistrationBanner = () => {
    unsuccesfullAlert.value = true
    setTimeout(() => {
      unsuccesfullAlert.value = false
    }, 4000)
  }
  
  
  const registerAccount = async () => {
    fireAlarm('info' , 'Asteptati','' , true)
    const isValid = await form?.value.validate();
    if (form.value) {
      if(isValid.valid && termsAndConditions.value){
          const registerData = {
            name: null,
            prename: null,
            phoneNumber: null,
            email: email.value,
            password: password.value,
            confirmationLinkHour: new Date().toISOString(),
            activationCode: 'temporaryToken',
            isVerified: false,
            role: 'Membru',
          }
          const {error} = await useFetch(config.public.apiBase + 'auth/inregistrare', {
                method : 'POST',
                body: registerData,
                watch: false
                // credentials: 'include'
            })
          
          if(error.value === undefined){
            swal.close()
            showSuccesfulRegistrationBanner()
            email.value = ''
            password.value = ''
            r_password.value = ''
            termsAndConditions.value = false
            form.value.resetValidation()
          }else{
            showUnsuccesfulRegistrationBanner()
            swal.close()
            return;
          }
      }else{
        swal.close()
        fireAlarm('error' , 'Eroare' , 'Verificati formularul' , null);
        return;
      }
    }
  }
  </script>
  
  <style scoped>
  .background-wrapper {
    position: relative;
    min-height: 100vh;
    width: 100vw;
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
    opacity: 0.4;
    z-index: 1;
  }
  
  .content {
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
  }
  
  .overBackground {
    z-index: 3;
    opacity: 1;
  }
  
  @media (max-width: 600px) {
    .form-container {
      padding: 0 16px;
    }
  }
  </style>
  