<template>
    <div>
        <div>
            <div data-aos="fade-down">
                <v-img src="/logo.png" 
                :aspect-ratio="15/5">
                <div class="overlay d-flex justify-center align-center fill-height text-h6  elevation-24">
                    <v-row>
                        <v-col cols="12">
                            <p class="text-h3 text-white  font-weight-light text-center">Academie</p>
                        </v-col>
                    </v-row>
                </div>
                </v-img>
            </div>
            <section>
                <div id="main-text" data-aos="flip-left" data-aos-duration="1000">
                    <v-card class="rounded-xl pa-2 ma-2 elevation-24 bg-grey-darken-4">
                        <v-card-text>
                            <p class="font-weight-thin text-h6">
                               <v-icon class="mr-2" :icon="mdiArrowRight" size="20"></v-icon>Brainly Physio este pentru cei ce caută sens, nu doar răspunsuri.
                            </p>
                            <p class="font-weight-thin text-h6">
                                <v-icon class="mr-2" :icon="mdiArrowRight" size="20"></v-icon>Urmărește-ne pe rețelele de socializare, dă-ne un subscribe pe youtube, susține-ne pe Patreon și devino parte dintr-o comunitate informată.
                            </p>
                        </v-card-text>
                    </v-card>
                </div>
                <article id="social-media" data-aos="flip-right" data-aos-duration="1000">
                    <v-card class="rounded-xl pa-2 ma-2 elevation-24 bg-grey-darken-4 text-center">
                        <v-card-text>
                            <v-card-title>
                                <p>Social media</p>
                            </v-card-title>
                            <div v-for="(item,index) in data" :key="index" class="my-2">
                                <NuxtLink target="_blank" :to="item.href"
                                    prefetch-on="visibility">
                                    <div class="d-flex justify-center">
                                        <NuxtImg :src="item.icon"
                                        format="webp"
                                        width="30"
                                        height="30">

                                        </NuxtImg>
                                        <div class=" ml-3 d-flex align-center">
                                            <p >
                                                <a class="text-decoration-none
                                                text-white font-weight-bold" href="">{{ item.name.toUpperCase() }}</a>
                                            </p>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </v-card-text>
                    </v-card>
                </article>
            </section>
        </div>
        <ContactBannerFooter/>
    </div>
</template>

<script setup>
import { NuxtImg, NuxtLink } from '#components';
import { mdiArrowRight } from '@mdi/js';
import ContactBannerFooter from '~/components/user/ContactBannerFooter.vue';

const data = ref([
    {name: 'Youtube' , icon : '/youtube.png' , href: "https://youtube.com/@brainlyphysio?si=n9styisF0AhEWBkL"},
    {name: 'Instagram' , icon : '/instagram.png',href: "https://www.instagram.com/brainly.physio?igsh=MW13eTloZmVqZ2F4Zg=="},
    {name: 'Patreon' , icon : '/patreon.png',href: "https://www.patreon.com/BrainlyPhysio?utm_campaign=creatorshare_creator"},
    {name: 'Tiktok' , icon : '/tiktok.png',href: "https://www.tiktok.com/@brainly.physio?_t=ZN-8yfyFLISsac&_r=1"},
    {name: 'Facebook' , icon : '/facebook.png',href: "https://www.facebook.com/share/1GA7QFHyJC/"},
])

definePageMeta({
    layout: 'default',
})

useSeoMeta({
    title: 'Academie',
    keywords: 'academie , invatare , invata de la noi , youtube , instagram , patreon , tiktok , facebook , invata cu noi , academie brainlyphyisio',
    ogSiteName: 'Academie',
    ogType : 'article',
    ogDescription : `Invata de la noi prin Academie BrainlyPhysio unde ai acces la tot felul de articole,cursuri si iti putem raspunde la orice intrebare pe care o ai.Haide pe BrainlyPhysio Academy sa invatam impreuna!`,
    ogTitle: 'Academie',
    description : `Invata de la noi prin Academie BrainlyPhysio unde ai acces la tot felul de articole,cursuri si iti putem raspunde la orice intrebare pe care o ai.Haide pe BrainlyPhysio Academy sa invatam impreuna!`,
    canonicalUrl: () => process.env.NODE_ENV === 'development' ? `http://localhost:3000/academy` : `https://brainlyphysio.ro/academy`
})


</script>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.4); /* dark overlay */
}
</style>