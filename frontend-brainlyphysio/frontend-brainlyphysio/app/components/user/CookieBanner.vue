<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="1000">
            <v-card class="bg-grey-darken-4 ">
                <v-card-title class="text-center bg-grey-darken-4" >
                    <NuxtImg
                     src="/logo.png" 
                     alt="Logo" :height="45" :width="45" 
                     class="mr-1"
                     format="webp"
                     preload/>
                </v-card-title>
                <v-card-text class="text-left">
                    <v-row>
                        <v-col cols="12">
                            <p>Site-ul nostru foloseste cookie-uri pentru buna functionare a acestuia</p>
                        </v-col>
                        <v-col cols="12">
                            <p>Cookie-uri esentiale</p>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12" class="text-left mt-2" v-for="cookie in cookies"
                        :key="cookie">
                            <p class="font-weight-thin h6">{{ cookie.name }}</p>
                            <p class="text-subtitle-2">{{ cookie.info }}</p>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-row>
                        <v-col cols="6" class="text-center">
                            <v-btn color="success" @click="acceptCookies" class="bg-success text-white">
                               Accepta
                            </v-btn>
                        </v-col>
                        <v-col cols="6" class="text-center">
                            <v-btn color="error" @click="declineCookies" class="bg-error text-white">
                               Declina
                            </v-btn>
                        </v-col>        
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    
</template>

<script setup>
import { NuxtImg } from '#components'


const dialog = ref(false)
const cookies = ref([
    {name: 'JWTToken' , info : 'Stocheaza informatii despre sesiunea curenta'},
    {name: '_ga' , info : 'Cookie de marketing care imbunatateste calitate de user a dumneavoastra'},
    {name: 'adminLoggedIn' , info :  "Stocheaza informatii despre sesiunea curenta"},
    {name: 'userLoggedIn' , info : "Stocheza informatii despre sesiunea curenta"},
    {name: 'session_tok' , info :  "Stocheaza informatii despre sesiunea curenta"},
])

const emitter = useNuxtApp().$emitter
const acceptCookies = (() => {
    localStorage.setItem("gdpr" , "1");
    document.cookie = "gdpr_consent=1; max-age=31536000; path=/";
    dialog.value = false;
})

const declineCookies = (() => {
    localStorage.setItem("gdpr" , "1");
    dialog.value = false;
})



const getCookieValue  = (() => {
    const cookieValue = localStorage.getItem("gdpr")
    if(cookieValue !== '1'){
        dialog.value = true
    }else{
        dialog.value = false;
    }
    console.log(cookieValue)
})

emitter.on('openCookieBanner' ,() => {
    dialog.value = true
})

onMounted(() => {
    getCookieValue();
})
</script>