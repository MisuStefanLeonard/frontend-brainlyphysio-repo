<template>
    <div>
     <v-footer
      class="bg-grey-darken-4 text-center d-flex flex-column"
    >
      <div>
        <NuxtLink :to="image.redirect" target="_blank"
          prefetch-on="visibility"
          v-for="image in images" :key="image">
          <NuxtImg
            format="webp"
            height="25"
            width="25"
            :src="image.path"
            class="mx-4 cursor-pointer"
          ></NuxtImg>
        </NuxtLink>
        
      </div>
      <v-divider v-for="i in 20" :key="i"></v-divider>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="1">
          <NuxtImg format="webp"
          src="/logo.png"
          width="60"
          height="60">
  
          </NuxtImg>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="2">
          <p class="h4">Brainly Physio</p>
          <br>
          <p class="h6 font-weight-normal cursor-pointer text-white" @click="openCookieSection">Politica de utilizare cookie-uri</p>
          <br>
          <p class="h6 font-weight-normal cursor-pointer text-white" @click="navigateTo('/terms_and_conditions')">Termeni si conditii</p>
        </v-col>
       
        <v-col cols="12" xs="12" sm="12" md="6">
          <p class="h4">Contact</p>
          <v-divider v-for="i in 20" :key="i" opacity="0"></v-divider>
          <v-btn @mouseenter="mouseEnterFunc()"
          @mouseleave="mouseLeaveFunc()"
            @click="navigateTo('https://wa.me/40725283713' , {external: true})"  class="rounded-xl "
            :variant="makeOutlined === true ? 'outlined' : 'flat'">
            <v-icon class="mr-2" :icon="mdiPhone"></v-icon>
            {{ buttonText }}
          </v-btn>
          <br>
          <br>
          <v-btn @mouseenter="mouseEnterFuncMail()"
          @mouseleave="mouseLeaveFuncMail()"
             class="rounded-xl "
             @click="navigateTo('mailto:pascu.aeduard@yahoo.com' , {external: true})"
            :variant="makeOutlinedMail === true ? 'outlined' : 'flat'">
            <v-icon class="mr-2" :icon="mdiEmail"></v-icon>
            {{ buttonMailText }}
          </v-btn>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="2">
          <p class="h4">Informatii</p>
          <v-divider v-for="i in 20" :key="i" opacity="0"></v-divider>

          <!-- <p class="h6 font-weight-light">{{ $t('footer.infoSubText.address') }} </p>
          <v-btn class="rounded-xl"   @mouseenter="makeOutlinedOfficeLocation2 = true"
            @mouseleave="makeOutlinedOfficeLocation2 = false"
            :variant="makeOutlinedOfficeLocation2 === true ? 'outlined' : 'flat'"
            @click="goToMapsOfficeLocation2()">
            <v-icon size="28" :icon="mdiMapMarker"></v-icon>Str. Harmanului nr.61, Brasov
          </v-btn> -->
          <v-divider opacity="0"></v-divider>
          <p class="h4">Program</p>
          <p class="h6 font-weight-bold">L-V: 9:00 AM - 18:00 PM </p>
        </v-col>
      </v-row>
      <v-divider v-for="i in 20" :key="i"></v-divider>

      <div>
        &copy;Copyright 2025 — <strong>Brainly Physio</strong>
      </div>
    </v-footer>
  </div>
  </template>
  
  
  <script setup>
  import { NuxtImg, NuxtLink } from '#components';
  import {  mdiPhone, mdiEmail } from '@mdi/js';
  
  const emitter = useNuxtApp().$emitter
  const images = ref([
    {
      path : '/youtube.png',
      redirect : 'https://youtube.com/@brainlyphysio?si=n9styisF0AhEWBkL'
    },
    {
      path : '/tiktok.png',
      redirect : 'https://www.tiktok.com/@brainly.physio?_t=ZN-8yfyFLISsac&_r=1'
    },
    {
      path : '/facebook.png',
      redirect : 'https://www.facebook.com/share/1GA7QFHyJC/'
    },
    {
      path :'/instagram.png',
      redirect : 'https://www.instagram.com/brainly.physio?igsh=MW13eTloZmVqZ2F4Zg=='
    },
    {
      path : '/patreon.png',
      redirect : 'https://www.patreon.com/BrainlyPhysio?utm_campaign=creatorshare_creator'
    },
  ])
  const openCookieSection = () => {
    localStorage.setItem('gdpr', '0');
    emitter.emit('openCookieBanner');
  };
  const buttonText = ref('Suna-ne acum!')
  const buttonMailText = ref('Lasa-ne un mail!')
  const makeOutlined = ref(false)
  const makeOutlinedMail = ref(false)
//   const makeOutlinedOfficeLocation2 = ref(false)
  
  const mouseEnterFunc = () => {
    buttonText.value = "0725283713"
    makeOutlined.value = true
  }
  
  const mouseLeaveFunc = () => {
    buttonText.value = "Suna-ne acum!"
    makeOutlined.value = false
  }
  
  const mouseEnterFuncMail = () => {
    buttonMailText.value = "pascu.aeduard@yahoo.com"
    makeOutlinedMail.value = true
  }
  
  const mouseLeaveFuncMail = () => {
    buttonMailText.value = "Lasa-ne un mail!"
    makeOutlinedMail.value = false
  }
  
//   const goToMapsOfficeLocation2 = () => {
//     window.open(
//       'https://www.google.com/maps/place/Strada+Harmanului+61,+Brașov',
//       '_blank'
//     )
//   }
  
  
  </script>
  