<template>
    <div>
      <!-- Header Image -->
      <div data-aos="fade-down">
        <v-img src="/logo.png" :aspect-ratio="15/5">
          <div class="overlay d-flex justify-center align-center fill-height text-h6 elevation-24">
            <v-row>
              <v-col cols="12">
                <p class="text-h3 text-white font-weight-light text-center">Echipa</p>
              </v-col>
            </v-row>
          </div>
        </v-img>
      </div>
  
      <!-- Fondator -->
      <div v-if="loaded === true">
        <section id="team-leader" class="text-center w-100" v-if="members && members.length > 0">
          <p class="font-weight-thin text-h4 text-center mt-4">Fondator</p>
          <div class="ma-4">
            <v-row>
              <v-col cols="12" data-aos="fade-down" data-aos-duration="1500">
                <v-card
                  class="mx-auto elevation-12 rounded-xl text-center my-4"
                  height="100%"
                  :class="height === 12 ? 'w-100' : 'w-50'"
                >
                  <div class="image-container">
                    <v-img v-if="members[0].presignedUrl !== 'empty'"
                    :src="members[0].presignedUrl"
                     height="500px"
                     cover 
                     class="zoom-image">
                    </v-img>
                    <v-img v-else
                    src="/user.png"
                    height="500px"
                     cover 
                     class="zoom-image">

                    </v-img>
                  </div>
    
                  <v-card-title>
                    <p class="font-weight-thin text-h5">{{ members[0].name }} {{ members[0].prename }}</p>
                  </v-card-title>
                  <v-card-text>
                    <p class="font-weight-bold">
                      <v-icon :icon="mdiPhone" size="20"></v-icon>
                      {{ members[0].phoneNumber }}
                    </p>
                    <p class="font-weight-bold">
                      <v-icon :icon="mdiEmail"></v-icon>
                      {{ members[0].email }}
                    </p>
                  </v-card-text>
                  <v-card-actions>
                    <v-row class="text-center">
                      <v-col cols="12">
                        <v-btn
                          @click="expandIndex !== -1 ? expandIndex = -1 : expandIndex = 0"
                          class="bg-primary"
                        >
                          DESCOPERA
                          <v-icon :icon="expandIndex !== -1 ? mdiChevronUp : mdiChevronDown"></v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
    
                  <v-expand-transition>
                    <div v-if="expandIndex === 0">
                      <v-card-text class="text-center">
                      <p class="font-weight-bold text-subtitle-1">
                        {{ members[0].description }}
                      </p>
                      <p class="font-weight-bold mt-2">Locatii</p>
                      <v-divider></v-divider>
                      <div v-if="members[0].memberLocations.length > 0" class="mb-2">
                        <p class="font-weight-light" v-for="(location,index) in members[0].memberLocations" :key="index">
                          <v-icon :icon="mdiArrowRight" size="18"></v-icon>
                          {{ location.city }},{{ location.county }}
                        </p>
                      </div>
                      <div v-else>
                        <p class="font-weight-light"> N/A </p>
                      </div>
                      <div v-if="members[0].memberQualities.length > 0" class="mb-2">
                        <p class="font-weight-light" v-for="(quality,index) in members[0].memberQualities" :key="index">
                          <v-icon :icon="mdiStar" size="18"></v-icon>
                          {{ quality.qualityName }}
                        </p>
                      </div>
                      <div v-else>
                        <p class="font-weight-light"> N/A </p>
                      </div>
                    </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </section>
      </div>
      <v-divider v-for="i in 50" :key="i" opacity="0"></v-divider>
      <!-- Echipa -->
      <section id="team-leader" class="text-center w-100" v-if="members && members.length > 0">
        <p class="font-weight-thin text-h5 text-center">Echipa</p>
        <div class="ma-4">
          <v-row>
            <v-col
              :cols="height"
              v-for="(item, index) in members.slice(1)"
              :key="item.name"
              :data-aos="index % 2 === 0 ? 'flip-left' : 'flip-right'"
              data-aos-duration="1500"
            >
              <v-card class="mx-auto elevation-12 rounded-xl text-center" >
                <div class="image-container">
                  <v-img :src="item.presignedUrl" height="500px" cover class="zoom-image"></v-img>
                </div>
  
                <v-card-title>
                  <p class="font-weight-thin text-h5">{{ item.name }} {{ item.prename }}</p>
                </v-card-title>
                <v-card-text>
                  <p class="font-weight-bold">
                    <v-icon :icon="mdiPhone" size="20"></v-icon>
                    {{ item.phoneNumber }}
                  </p>
                  <p class="font-weight-bold">
                    <v-icon :icon="mdiEmail"></v-icon>
                    {{ item.email }}
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-row class="text-center">
                    <v-col cols="12">
                      <v-btn
                        @click="expandIndex !== -1 ? expandIndex = -1 : expandIndex = index"
                        class="bg-primary"
                      >
                        DESCOPERA
                        <v-icon :icon="expandIndex !== -1 ? mdiChevronUp : mdiChevronDown"></v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
  
                <v-expand-transition>
                  <div v-if="expandIndex === index">
                    <v-card-text class="text-center">
                      <p class="font-weight-bold text-subtitle-1">
                        {{ item.description }}
                      </p>
                      <p class="font-weight-bold my-2">Locatii</p>
                      <div v-if="item.memberLocations.length > 0" class="mb-2">
                        <p class="font-weight-light" v-for="(location,index) in item.memberLocations" :key="index">
                          <v-icon :icon="mdiArrowRight" size="18"></v-icon>
                          {{ location.city }},{{ location.county }}
                        </p>
                      </div>
                      <div v-else>
                        <p class="font-weight-light"> N/A </p>
                      </div>
                      <p class="font-weight-bold my-2">Calitati</p>
                      <div v-if="item.memberQualities.length > 0" class="mb-2">
                        <p class="font-weight-light" v-for="(quality,index) in item.memberQualities" :key="index">
                          <v-icon :icon="mdiArrowRight" size="18"></v-icon>
                          {{ quality.qualityName }}
                        </p>
                      </div>
                      <div v-else>
                        <p class="font-weight-light"> N/A </p>
                      </div>
                    </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </section>
      <ContactBannerFooter />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import ContactBannerFooter from '~/components/user/ContactBannerFooter.vue'
  import { useDisplay } from 'vuetify'
  import { mdiArrowRight, mdiChevronDown, mdiChevronUp, mdiEmail, mdiPhone, mdiStar } from '@mdi/js'
  
  definePageMeta({
    layout: 'default'
  })
  
  const { name } = useDisplay()
  const config = useRuntimeConfig()
  const members = ref([])
  const expandIndex = ref(-1)


  useSeoMeta({
    title: 'Echipa BrainlyPhysio',
    keywords:'log in , logare',
    ogSiteName: 'Echipa BrainlyPhysio',
    ogType: 'article',
    ogDescription : 'Echipa BrainlyPhysio este constituita din cei mai pregatiti membrii in domeniul kinetoterapiei,masajului si fizioterapiei. Apeleaza la noi pentru cunostine bine structurate in domeniul fizioterapiei.',
    ogTitle: 'Echipa BrainlyPhysio',
    description : 'Echipa BrainlyPhysio este constituita din cei mai pregatiti membrii in domeniul kinetoterapiei,masajului si fizioterapiei. Apeleaza la noi pentru cunostine bine structurate in domeniul fizioterapiei.',
    canonicalUrl: () =>  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/team' : 'https://brainlyphysio.ro/login'
  })
  
  const height = computed(() => {
    switch (name.value) {
      case 'xs':
      case 'sm':
        return 12
      case 'md':
      default:
        return 6
    }
  })

  const loadTeamMembers = (async () => {

    const getURL = 'user/members'
    const method = 'GET'

    const {data,error} = await useFetch(config.public.apiBase + getURL , {
      method: method,
      credentials: 'omit'
    })

    if(error.value === undefined){
      members.value = data.value
      console.log(members.value)
    }else{
      console.error("Error occured when fethcing members. Sorry")
    }
  })

  const loaded = ref(false)
  

  onBeforeMount(async () => {
    await loadTeamMembers()
    console.log('loaded')
  })

  onMounted(() => {
    loaded.value = true
    console.log('mounted')

  })
  </script>
  
  <style scoped>
  .overlay {
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .image-container {
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  
  .zoom-image {
    transition: transform 0.5s ease;
  }
  
  .image-container:hover .zoom-image {
    transform: scale(1.1);
  }
  </style>
  