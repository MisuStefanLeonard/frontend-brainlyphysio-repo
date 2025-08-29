<template>
    <div v-if="wasFetched">
        <div data-aos="fade-down">
            <v-img :src="announceData.presignedUrl" :aspect-ratio="10/5" cover>
            <div class="overlay d-flex justify-center align-center fill-height text-h6 elevation-24">
                <v-row>
                <v-col cols="12">
                    <p class="text-h3 text-white font-weight-light text-center">{{ announceData.courseTitle }}</p>
                </v-col>
                </v-row>
            </div>
            </v-img>
        </div>
        <div class="p-2 mx-2 my-2 bg-grey-lighten-3">
            <v-row no-gutters v-if="announceData.courseSections && announceData.courseSections.length > 0">
                <v-col cols="12"  md="3" sm="12" xs="12" :class="{'text-center' : height === 12}">
                    <v-card class="w-100 p-1 h-100  border-md elevation-12 bg-grey-lighten-3">
                        <div class="mx-2 my-1">
                            <v-card-text>
                                <p class="font-weight-bold mt-2">Date disponibile</p>
                                <p class="font-weight-normal mt-2">{{ formattedComingDate }} - {{ formattedLeavingDate }}</p>
                                <v-divider></v-divider>
                                <p class="font-weight-bold mt-2">Locatia cursului</p>
                                <p class="font-weight-normal mt-2">{{ announceData.location }}</p>
                                <v-divider></v-divider>
                                <p class="font-weight-bold mt-2">Instructori</p>
                                <p class="font-weight-normal mt-2"
                                    v-for="(instructor,index) in instructors" :key="index">
                                    <v-icon :icon="mdiArrowRight" size="14"></v-icon>
                                    {{ instructor }}
                                </p>
                                <v-divider></v-divider>
                                <p class="font-weight-bold mt-2">Pret</p>
                                <p v-if="announceData.price === 0" class="font-weight-light text-red  mt-2">
                                    Gratis
                                </p>
                                <p  class="font-weight-normal  mt-2" v-else>
                                    {{ announceData.price }} RON
                                </p>
                                <v-divider></v-divider>
                                <p class="font-weight-bold mt-2">Credite EMC</p>
                                <p v-if="announceData.emcPoints === 0" class="font-weight-light mt-2">
                                    Nu are puncte EMC
                                </p>
                                <p  class="font-weight-normal  mt-2" v-else>
                                    {{ announceData.emcPoints }} puncte
                                </p>
                                <v-divider></v-divider>
                                <p class="font-weight-bold mt-2">Durata</p>
                                <p class="font-weight-normal mt-2">{{ announceData.courseDuration }} ore</p>
                            </v-card-text>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="9" sm="12" xs="12">
                    <v-card class="w-100 p-1 h-100 border-md elevation-12 bg-grey-lighten-3" >
                        <v-card-title>
                            <p class="font-weight-normal text-h6">Structura cursului</p>
                        </v-card-title>
                        <v-card-text class="mt-2 bg-grey-lighten-3" v-if="announceData.courseSections.length > 0">
                            <v-list class="bg-grey-lighten-3">
                                <v-list-group v-for="(section,courseIndex) in announceData.courseSections" 
                                :key="courseIndex" :value="section.sectionTitle">
                                    <template v-slot:activator="{ props }">
                                        <v-list-item
                                        v-bind="props"
                                        :title="section.sectionTitle"
                                        ></v-list-item>
                                    </template>

                                    <div class="pa-4 text-body-1 ml-5">
                                        <p
                                            v-for="(content, contentIndex) in section.sectionContents"
                                            :key="contentIndex"
                                            class="mb-3"
                                        >
                                            <v-icon :icon="mdiArrowRight" size="18" class="mr-3"></v-icon>{{ content.content }}
                                        </p>
                                    </div>
                                </v-list-group>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters v-else>
                <v-col cols="12"  md="12" sm="12" xs="12">
                    <v-card class="w-100 p-1 h-100  border-md elevation-24">
                        <div class="mx-2 my-1">
                            <v-card-text>
                                <v-row no-gutters>
                                    <v-col cols="12" sm="12" xs="12" md="4" class="text-center">
                                        <p class="font-weight-bold mt-2">Date disponibile</p>
                                        <p class="font-weight-normal mt-2">{{ formattedComingDate }} - {{ formattedLeavingDate }}</p>
                                    </v-col>
                                    <v-col cols="12" sm="12" xs="12" md="4" class="text-center">
                                        <p class="font-weight-bold mt-2">Locatia cursului</p>
                                        <p class="font-weight-normal mt-2">{{ announceData.location }}</p>
                                    </v-col>
                                    <v-col cols="12" sm="12" xs="12" md="4" class="text-center">
                                        <p class="font-weight-bold mt-2">Instructori</p>
                                        <p class="font-weight-normal mt-2"
                                            v-for="(instructor,index) in instructors" :key="index">
                                            <v-icon :icon="mdiArrowRight" size="14"></v-icon>
                                            {{ instructor }}
                                        </p>
                                    </v-col>
                                    <v-divider v-for="i in 10" :key="i" opacity="0"></v-divider>
                                    <v-col cols="12" sm="12" xs="12" md="4" class="text-center">
                                        <p class="font-weight-bold mt-2">Pret</p>
                                        <p v-if="announceData.price === 0" class="font-weight-light text-red  mt-2">
                                            Gratis
                                        </p>
                                        <p  class="font-weight-normal  mt-2" v-else>
                                            {{ announceData.price }} RON
                                        </p>
                                    </v-col>
                                    <v-col cols="12" sm="12" xs="12" md="4" class="text-center">
                                        <p class="font-weight-bold mt-2">Credite EMC</p>
                                        <p v-if="announceData.emcPoints === 0" class="font-weight-light mt-2">
                                            Nu are puncte EMC
                                        </p>
                                        <p  class="font-weight-normal  mt-2" v-else>
                                            {{ announceData.emcPoints }} puncte
                                        </p>
                                    </v-col>
                                    <v-col cols="12" sm="12" xs="12" md="4" class="text-center">
                                        <p class="font-weight-bold mt-2">Durata</p>
                                        <p class="font-weight-normal mt-2">{{ announceData.courseDuration }} ore</p>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <ContactBannerFooter></ContactBannerFooter>
    </div>
</template>

<script setup>
import ContactBannerFooter from '~/components/user/ContactBannerFooter.vue';
import Swal from 'sweetalert2';
import { mdiArrowRight } from '@mdi/js';

const route = useRoute();
const config = useRuntimeConfig();
const idAnnounce = route.params.idAnnounce;
const {name} = useDisplay()
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

// Metoda corectă de a prelua datele pentru SSR (Server-Side Rendering) și SEO
const { data: announceData, pending, error } = await useAsyncData(
    `course-${idAnnounce}`, // O cheie unică pentru acest request
    () => $fetch(`${config.public.apiBase}` + `user/announce/${idAnnounce}`),
    {
        // Valori inițiale pentru a evita erorile în template înainte de fetch
        default: () => ({
            courseTitle: 'Încărcare curs...',
            aboutCourse: '',
            trainers: '',
            location: '',
            courseSections: [] 
        })
    }
);

// Gestionează erorile de la fetch
if (error.value) {
  console.error("Eroare la preluarea cursului:", error.value);
  Swal.fire({
    text: 'Cursul nu a fost găsit sau a apărut o eroare.',
    title: 'Eroare',
    icon: 'error',
    position: 'center'
  }).then(() => {
    navigateTo('/courses');
  });
}


// Folosim `pending` pentru a controla starea de încărcare în template
const wasFetched = computed(() => !pending.value && !error.value);


definePageMeta({
    layout: 'default',
    ogType : 'article',
});

// Acest bloc va funcționa acum perfect, deoarece `announceData` va fi populat pe server
useSeoMeta({
    title: () => announceData.value?.courseTitle ? `BrainlyPhysio - ${announceData.value.courseTitle}` : 'BrainlyPhysio Curs',
    description: () => announceData.value?.aboutCourse,
    ogTitle: () => announceData.value?.courseTitle ? `BrainlyPhysio - ${announceData.value.courseTitle}` : 'BrainlyPhysio Curs',
    ogDescription: () => announceData.value?.aboutCourse,
    keywords: () => {
        if (!announceData.value?.courseTitle) {
            return 'fizioterapie, kinetoterapie, cursuri, recuperare medicală'; // Cuvinte cheie default
        }
        // Construiește cuvintele cheie dinamic și în siguranță
        return `Curs ${announceData.value.courseTitle}, Curs fizioterapie ${announceData.value.courseTitle}, Curs kinetoterapie ${announceData.value.courseTitle}, ${announceData.value.trainers}, ${announceData.value.location}`;
    }
});

const loaded = ref(false);

const instructors = computed(() => {
    if (announceData.value && announceData.value.trainers) {
        return announceData.value.trainers.split(',');
    }
    return [];
});

const formattedComingDate = computed(() => {
    if (!announceData.value?.comingDate) return '';
    const date = new Date(announceData.value.comingDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('ro-RO', options).format(date);
});

const formattedLeavingDate = computed(() => {
    if (!announceData.value?.leavingDate) return '';
    const date = new Date(announceData.value.leavingDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('ro-RO', options).format(date);
});

onMounted(() => {
    loaded.value = true;
});
</script> 

<style scoped>
.overlay {
    background-color: rgba(0, 0, 0, 0.4);
}
</style>