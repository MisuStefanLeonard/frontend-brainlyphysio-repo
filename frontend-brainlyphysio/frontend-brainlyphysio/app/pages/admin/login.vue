<template>
    <div class="bg-grey-darken-4 h-100">
        <v-container>
            <v-alert v-if="authorizeAgain" type="error" v-model="authorizeAgain" closable>
                Va rog sa va autorizati din nou
            </v-alert>
            <v-alert v-if="invalidKeyAlert" type="error" v-model="invalidKeyAlert" closable>
                {{ invalidKeyAlertText }}
            </v-alert>
            <v-alert v-if="generalError" type="error" v-model="generalError" closable>
                {{ generalErrorText }}
            </v-alert>
            <v-alert v-if="waitAlert" type="info" v-model="waitAlert" closable>
                {{ waitAlertText }}
            </v-alert>
        </v-container>
        <v-container class="justify-center d-block w-75 text-center bg-blue-grey-lighten-5">
            <p class="font-weight-light text-h6">Administrare</p>
            <v-form class="rounded p-2 " ref="adminForm" @submit.prevent="authAdmin()">
                <v-text-field class="p-3"
                label="Cheia de autentificare"
                variant="outlined"
                color="black"
                :rules="[rules.required]"
                v-model="key"
                type="password">
                </v-text-field>
                <v-btn rounded="xl" type="submit" variant="outlined" class="font-weight-bold bg-grey-lighten-3 my-4">
                    Intra
                    <v-icon class="pl-2" :icon="mdiArrowRight"></v-icon>
                </v-btn>
            </v-form>
        </v-container>
    </div>
</template>

<script setup>
import { mdiArrowRight } from '@mdi/js'

definePageMeta({
    layout:'admin',
    middleware: 'admin'
})

useHead({
    title: 'Logare panou admin'
})

// Reactive state
const key = ref('')
const invalidKeyAlert = ref(false)
const waitAlert = ref(false)
const generalError = ref(false)
const authorizeAgain = ref(false)
const config = useRuntimeConfig()

const rules = {
    required: value => !!value || "Completati campul cu cheia de acces"
}

const swal = useNuxtApp().$swal;
// Static text
const waitAlertText = 'Asteptati...'
const invalidKeyAlertText = 'Cheie de acces gresita! Incercati din nou!'
const generalErrorText = "Eroare generala. Contactati adminul"
const adminForm = ref(null)
const route = useRoute()

// Methods
const authAdmin = async () => {
    waitAlert.value = true
    const isValid = await adminForm.value.validate()
    if(isValid.valid){
        try {
            const method = 'POST'
            const url = 'admin/login'
            await $fetch(config.public.apiBase + url, {
                credentials: 'include',
                method: method,
                body: {
                    key : key.value
                }
            })

            waitAlert.value = false
            navigateTo('/admin/team')
        } catch (error) {
            waitAlert.value = false
            process.env.NODE_ENV === 'development' ? console.error(error) : ''
            if(error.statusCode === 401){
                invalidKeyAlert.value = true
            }else{
                generalError.value = true
            }
        }
    }else{
        swal.fire({
            icon: 'error',
            title: 'Eroare',
            text: 'Completati campul din formular',
            timer: 2000
        })
        waitAlert.value = false
        return
    }
   
}

const getAdminPage = async () => {
  if (route.query.redirect === "redirect") {
    try {
      const data = await $fetch(config.public.apiBase + 'admin/login/redirect', {
        method: 'GET',
        credentials: 'include' // important for cookies
      })
      console.log(data)
      // backend returns plain string, so handle it directly
      if (data === "Please authorize yourself") {
        console.log("authorize again")
        authorizeAgain.value = true
        return
      }
      navigateTo('/admin/team')
      
    } catch (err) {
      console.error("Network error:", err)
      authorizeAgain.value = true
    }
  }
}


onMounted(async () => {
  await getAdminPage()
})


</script>

<style scoped>
/* Add any specific styling here */
</style>
