<template>
    <div>
        <div data-aos="fade-down">
            <v-img src="/logo.png" :aspect-ratio="15/5">
            <div class="overlay d-flex justify-center align-center fill-height text-h6 elevation-24">
                <v-row>
                <v-col cols="12">
                    <p class="text-h3 text-white font-weight-light text-center">Anunturi / Cursuri</p>
                </v-col>
                </v-row>
            </div>
            </v-img>
        </div>
        <div>
            <section id="announces" class="text-center w-100" v-if="announcesList && announcesList.length > 0">
                <div class="ma-4">
                    <v-row>
                        <v-col
                        :cols="height"
                        v-for="(item, indexAnnounce) in announcesList"
                        :key="item.name"
                        :data-aos="indexAnnounce % 2 === 0 ? 'flip-left' : 'flip-right'"
                        data-aos-duration="1500"
                        >
                            <v-card class="mx-auto elevation-24 rounded-xl text-center bg-grey-lighten-3">
                                <div class="image-container">
                                    <v-tooltip
                                        location="bottom"
                                        text="Vezi detalii"
                                    >
                                        <template v-slot:activator="{ props }">
                                            <v-img
                                                v-bind="props"
                                                @click="navigateTo(`/course/${item.idAnnounce}`)"
                                                :src="item.presignedUrl"
                                                height="500px"
                                                cover
                                                class="zoom-image cursor-pointer contain-image"
                                            ></v-img>
                                        </template>
                                    </v-tooltip>
                                </div>
                
                                <v-card-title class="text-center">
                                    {{ item.courseTitle }}
                                </v-card-title>
                                <v-card-subtitle class="text-center">
                                    <p class="font-weight-bold">Format: {{ item.format }}</p>
                                    <p class="font-weight-bold">Traineri: {{ item.trainers }}</p>
                                </v-card-subtitle>
                                <v-card-actions>
                                <v-row class="text-center">
                                    <v-col cols="6">
                                        <v-btn variant="flat" color="orange-lighten-2" @click="expandedSectionIndex = (expandedSectionIndex === indexAnnounce ? null : indexAnnounce)">
                                        Mai multe
                                        <v-icon 
                                            class="ml-2" 
                                            :icon="expandedSectionIndex === indexAnnounce ? mdiArrowUp : mdiArrowDown"
                                        ></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-btn variant="flat" color="primary" @click="navigateTo(`/course/${item.idAnnounce}`)">
                                        Vezi detalii
                                        <v-icon 
                                            class="ml-2" 
                                            :icon="mdiEye"
                                        ></v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                </v-card-actions>
                
                                <v-expand-transition>
                                    <div v-show="expandedSectionIndex === indexAnnounce">
                                        <v-divider></v-divider>
                                        <v-container fluid>
                                            <v-row no-gutters>
                                                <v-col cols="12">
                                                    <p class="font-weight-bold">Descriere</p>
                                                    <p class="font-weight-normal">
                                                        <v-icon :icon="mdiArrowRight" size="20" class="mr-2"></v-icon>
                                                        {{ item.aboutCourse }}
                                                    </p>
                                                </v-col>
                                                <v-divider opacity="0" v-for="i in 15" :key="i"></v-divider>
                                                <v-col cols="6">
                                                    <p class="font-weight-bold">Puncte EMC</p>
                                                    <p class="font-weight-normal" v-if="item.emcPoints !== 0">
                                                        <v-icon :icon="mdiArrowRight" size="20" class="mr-2"></v-icon>
                                                        {{ item.emcPoints }}
                                                    </p>
                                                    <p class="font-weight-normal" v-else>
                                                        Nu are puncte EMC
                                                    </p>
                                                </v-col>
                                                <v-col cols="6">
                                                    <p class="font-weight-bold">Numar telefon contact</p>
                                                    <p class="font-weight-normal">
                                                        <v-icon :icon="mdiArrowRight" size="20" class="mr-2"></v-icon>{{ item.contactPhoneNumber }}
                                                    </p>
                                                </v-col>
                                                <v-divider opacity="0" v-for="i in 15" :key="i"></v-divider>

                                                <v-col cols="6">
                                                    <p class="font-weight-bold">Locatie</p>
                                                    <p class="font-weight-normal">
                                                        <v-icon :icon="mdiArrowRight" size="20" class="mr-2"></v-icon> {{ item.location }}
                                                    </p>
                                                </v-col>
                                                <v-col cols="6">
                                                    <p class="font-weight-bold">Pret</p>
                                                    <p class="font-weight-normal" v-if="item.price !== 0">
                                                        <v-icon :icon="mdiArrowRight" size="20" class="mr-2"></v-icon>
                                                        {{ item.price }} RON
                                                    </p>
                                                    <p class="font-weight-normal" v-else>
                                                        Nu are pret.
                                                    </p>
                                                </v-col>
                                                <v-divider opacity="0" v-for="i in 15" :key="i"></v-divider>

                                                <v-col cols="6" class="text-center">
                                                    <p class="font-weight-bold">Data venire</p>
                                                    <p class="font-weight-normal">{{ item.comingDate.split('T')[0] }}</p>
                                                </v-col>
                                                <v-col cols="6" class="text-center">
                                                    <p class="font-weight-bold">Data plecare</p>
                                                    <p class="font-weight-normal">{{ item.leavingDate.split('T')[0] }}</p>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </div>
                                </v-expand-transition>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>
            </section>
            <section v-else>
                <v-alert type="error" class="text-center p-2 mx-2 my-2">
                    <p class="font-weight-light text-h5">
                        Niciun curs / anunt activ <v-icon :icon="mdiEmoticonSadOutline"></v-icon>
                    </p>
                    <p class="font-weight-light text-h5">
                        Reveniti mai tarziu.
                    </p>
                </v-alert>
            </section>
        </div>
        <ContactBannerFooter></ContactBannerFooter>
    </div>
</template>

<script setup>
import ContactBannerFooter from '~/components/user/ContactBannerFooter.vue'
import { useDisplay } from 'vuetify'
import { mdiEmoticonSadOutline,mdiArrowRight,mdiChevronUp,mdiArrowDown,mdiArrowUp, mdiEye } from '@mdi/js'

definePageMeta({
    layout: 'default',
})

useSeoMeta({
    title: 'Cursuri / Anunturi',
    keywords: 'Curs fizioterapie, Curs kinetoterapie, Curs recuperare medicală, Formare continuă kinetoterapie, Cursuri pentru fizioterapeuți, Reabilitare medicală curs, Curs masaj terapeutic, Seminar fizioterapie, Workshop kinetoterapie, Cursuri EMC kinetoterapeuți, Cursuri cu puncte EMC pentru fizioterapeuți, Specializare pentru asistenți medicali BFKT, Kinetoterapie pentru medici, Formare profesională pentru maseuri, Cursuri postuniversitare kinetoterapie, Curs terapie manuală, Curs Kinesio Taping, Curs bandajare kinesiologică, Curs terapie Trigger Point, Curs drenaj limfatic, Recuperare post-operatorie curs, Kinetoterapia în afecțiuni neurologice, Recuperarea umărului, Recuperarea genunchiului, Recuperarea coloanei vertebrale, Fizioterapie sportivă curs, Tehnici de masaj terapeutic, Curs acreditat de Colegiul Fizioterapeuților, Diplomă recunoscută în fizioterapie, Certificare în terapie manuală, Dezvoltarea abilităților practice în kinetoterapie, Cursuri cu credite EMC, Perfecționare profesională fizioterapie, cel mai bun curs de terapie manuală, cursuri de recuperare după operația de ligamente, tehnici de tratament pentru hernia de disc, cursuri de fizioterapie online cu creditare EMC, preț curs kinesio taping.',
    ogSiteName: 'Cursuri / Anunturi',
    ogType : 'article',
    ogDescription : `Fii primul care află noutățile de la BrainlyPhysio Academy! Aici postăm toate cursurile și anunțurile despre evenimentele noastre, inclusiv workshop-uri live în orașul tău. De la Suceava la Timișoara, aducem expertiza mai aproape de tine. Verifică acum!`,
    ogTitle: 'Cursuri / Anunturi',
    description : `Descoperă lista completă de cursuri și anunțuri BrainlyPhysio Academy. Găsește workshop-uri de fizioterapie în orașul tău, acumulează puncte EMC și învață cele mai noi tehnici de recuperare. Nu rata următorul eveniment!`,
    canonicalUrl: () => process.env.NODE_ENV === 'development' ? `http://localhost:3000/courses` : `https://brainlyphysio.ro/courses`
})



const config = useRuntimeConfig()
const announcesList = ref([])
const expandedSectionIndex = ref(-1)
const { name } = useDisplay()
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

const loadAnnounces = (async () => {
    const method = 'GET'
    const url = 'user/announces'

    const {data,error} = await useFetch(config.public.apiBase + url, {
        credentials: 'include',
        method : method
    })

    if(error.value === undefined){
        announcesList.value = data.value
        console.log(announcesList.value)
    }else{
        console.error(error.value)
    }
})

onBeforeMount(() => {
    setTimeout(async () => {
        await loadAnnounces()
    }, 1);
    
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

.contain-image .v-img__img {
  object-fit: contain !important; /* instead of cover */
}
</style>