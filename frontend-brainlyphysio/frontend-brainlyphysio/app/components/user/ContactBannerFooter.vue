<template>
  <div data-aos="fade-down">
    <section class="row elevation-24 rounded bg-grey-lighten-5" id="contact">
      <div class="image-hover-dark">
        <v-img 
          src="/cover.jpeg"
          preload
          cover
          format="webp"
          alt="background_image"
          :aspect-ratio="height !== true ? 9 / 6 : 4 / 5"
         
        >
          <div
           class="overlay-content d-flex justify-center align-center fill-height text-h6 elevation-24">
            <v-row>
              <v-col cols="12" class="pa-3">
                <p class="text-center text-white mt-4 mx-2 font-weight-bold">
                  Academia dedicată fizioterapeuților, pacienților si altor specialisti din aria medicala ce 
                  caută informatii bazate pe știință
                </p>
                <v-divider opacity="0"></v-divider>
                <p class="text-center text-white">
                  Alătură-te nouă pentru a invăta ultimele noutăți despre fizioterapie!
                </p>
                <v-divider opacity="0"></v-divider>
                <p class="text-center text-white font-weight-bold">
                  Ce spui, sună bine?
                </p>
              </v-col>
              <v-col cols="12" class="text-center mb-5">
                <v-btn
                  color="white"
                  variant="outlined"
                  class="rounded-xl hoverBtn"
                  @click="navigateTo('https://wa.me/40725283713')"
                >
                  <span class="text-white font-weight-thin text-h5">
                    Da, vreau să discutăm!
                  </span>
                </v-btn>
                <v-divider opacity="0"></v-divider>
                <span class="text-white font-weight-bold text-subtitle-1">
                  <v-icon :icon="mdiPhone" size="28"></v-icon>
                  0725283713
                </span>
                <br>
                <span class="text-white font-weight-bold text-subtitle-1">
                  <v-icon :icon="mdiEmail" size="28"></v-icon>
                  pascu.aeduard@yahoo.com
                </span>
              </v-col>
              <v-col cols="12" class=" text-center">
                <NuxtImg src="/logo.png"
                width="90"
                height="90">

                </NuxtImg>
              </v-col>
            </v-row>
          </div>
        </v-img>
      </div>
    </section>
  </div>
</template>

<script setup>
import { NuxtImg } from '#components'
import { mdiEmail, mdiPhone } from '@mdi/js'
import { useDisplay } from 'vuetify'
const { name } = useDisplay()

const height = computed(() => {
  switch (name.value) {
    case 'xs':
      return true
    default:
      return 3
  }
})
</script>

<style scoped>
.hoverBtn:hover {
  background-color: #311B92 !important;
  border-color: #311B92 !important;
}

.image-hover-dark {
  position: relative;
}

.image-hover-dark .v-img {
  position: relative;
  overflow: hidden;
}

.image-hover-dark .v-img::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0);
  transition: background-color 0.3s ease;
  z-index: 1; /* sits above image but below text */
}

.image-hover-dark:hover .v-img::after {
  background-color: rgba(0,0,0,0.7);
}

.overlay-content {
  position: relative;
  z-index: 2; /* keep text above dark overlay */
}

@media (max-width: 959px) {
  .image-hover-dark .v-img::after {
    background-color: rgba(0,0,0,0.7);
  }
}
</style>
