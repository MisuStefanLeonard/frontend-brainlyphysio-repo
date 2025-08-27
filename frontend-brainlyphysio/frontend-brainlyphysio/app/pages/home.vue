<template>
    <div>
        <div data-aos="fade-down">
            <v-img src="/logo.png" 
            :aspect-ratio="15/5">
            <div class="overlay d-flex justify-center align-center fill-height text-h6  elevation-24">
                <v-row>
                    <v-col cols="12">
                        <p class="text-h3 text-white  font-weight-light text-center">Acasa</p>
                    </v-col>
                </v-row>
            </div>
            </v-img>
        </div>
        <section>
            <h1 class="text-black font-weight-light text-center my-4 mx-3" style="font-size: 2rem;">
                Brainly Physio: Educație în Fizioterapia Modernă
            </h1>
            <v-row no-gutters >
                <v-col cols="12" data-aos="fade-right">
                    <v-card class="elevation-24 ma-3 bg-grey-darken-4 rounded-xl">
                        <div class="my-2 d-sm-flex  align-center justify-center text-center">
                            <h2 class="font-weight-light text-center">Platforma educationala fantastica</h2>
                            <NuxtImg src="/mortarboard.png" 
                                width="50"
                                alt="Platforma educationala gandita in cel mai profesionist mod"
                                height="50" class="ma-4 text-center">

                                </NuxtImg>
                        </div>
                        <v-row no-gutters class="text-center">
                            <v-col cols="12" xs="12" sm="12" md="3"  class="justify-center align-center d-flex pa-2">
                                <NuxtImg src="/blended-learning.png" 
                                fit="cover"
                                width="150"
                                alt="Invatare multipla cu ajutorul platformelor si diferitelor metode"
                                height="150" class="ma-4">

                                </NuxtImg>
                            </v-col>
                            <v-col cols="12" xs="12" sm="12" md="9" class="justify-center align-center d-flex pa-4">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h3 class="font-weight-thin ">
                                            <v-icon :icon="mdiArrowRight" size="24" class="mr-2"></v-icon>
                                            Brainly Physio este o platformă educațională inovatoare,
                                            dedicată fizioterapeuților, medicilor și pacienților care caută răspunsuri
                                            bazate pe știință și dovezi actuale. 
                                        </h3>
                                    </v-col>
                                    <v-col cols="12"  xs="12" sm="12" md="12">
                                        <h3 class="font-weight-thin ">
                                            <v-icon :icon="mdiArrowRight" size="24" class="mr-2"></v-icon>
                                            Prin conținutul nostru video de înaltă calitate, 
                                            postările din social media și articolele publicate, oferim informații clare și aplicabile în practică, 
                                            promovând o fizioterapie modernă, fundamentată pe cercetare, educație continuă și gândire critică.
                                        </h3>
                                    </v-col>
                                    <v-col cols="12"  xs="12" sm="12" md="12">
                                        <h3 class="font-weight-thin">
                                            <v-icon :icon="mdiArrowRight" size="24" class="mr-2"></v-icon>
                                            Scopul nostru este să conectăm specialiștii din domeniul sănătății și pacienții interesați de recuperare, 
                                            prevenție și tratamente eficiente, punând la dispoziție resurse actualizate și soluții validate științific.
                                        </h3>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" data-aos="fade-left">
                    <v-card class="elevation-24 ma-3 bg-grey-darken-4 rounded-xl">
                        <div class="my-2 d-sm-flex  align-center justify-center text-center">
                            <h2 class="font-weight-light text-center">Echipa de profesionisti in fizioterapie</h2>
                            <NuxtImg src="/professional-services.png" 
                                width="50"
                                alt="Platforma educationala gandita in cel mai profesionist mod"
                                height="50" class="ma-4 text-center">

                                </NuxtImg>
                        </div>
                        <v-row no-gutters class="text-center">
                            <v-col cols="12" xs="12" sm="12" md="9" class="justify-center align-center d-flex pa-4">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h3 class="font-weight-thin">
                                            <v-icon :icon="mdiArrowRight" size="24" class="mr-2"></v-icon>
                                            Suntem o echipă de profesioniști pasionați de educație, dedicați promovării unei fizioterapii moderne, fundamentate pe dovezi științifice.
                                        </h3>
                                    </v-col>
                                    <v-col cols="12"  xs="12" sm="12" md="12">
                                        <h3 class="font-weight-thin">
                                            <v-icon :icon="mdiArrowRight" size="24" class="mr-2"></v-icon>
                                            Punem în lumină cele mai actuale concepte și tehnici din domeniu, demontăm mituri răspândite în recuperarea medicală și oferim explicații clare, structurate și ușor de înțeles pentru specialiști, pacienți și publicul larg.
                                        </h3>
                                    </v-col>
                                    <v-col cols="12"  xs="12" sm="12" md="12">
                                        <h3 class="font-weight-thin">
                                            <v-icon :icon="mdiArrowRight" size="24" class="mr-2"></v-icon>
                                            Prin abordarea noastră, sprijinim învățarea continuă, gândirea critică și aplicarea corectă a principiilor fizioterapiei în practică.
                                        </h3>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" xs="12" sm="12" md="3"  class="justify-center align-center d-flex pa-2">
                                <NuxtImg src="/learning.png" 
                                fit="cover"
                                width="150"
                                alt="Invatare eficienta cu ajutorul materialelor pregatite de experti in kinenoterapie si fizioterapie"
                                height="150" class="ma-4">
                                </NuxtImg>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" data-aos="fade-right">
                    <v-card class="elevation-24 ma-3 bg-grey-darken-4 rounded-xl">
                        <div class="my-2 d-sm-flex  align-center justify-center text-center">
                            <h2 class="font-weight-light text-center">Ne gasesti pe toate platformele</h2>
                            <NuxtImg src="/critical.png" 
                                width="50"
                                alt="Platforma educationala gandita in cel mai profesionist mod"
                                height="50" class="ma-4 text-center">

                                </NuxtImg>
                        </div>
                        <v-row no-gutters class="text-center">
                            <v-col cols="12" xs="12" sm="12" md="3"  class="justify-center align-center d-flex pa-2">
                                <NuxtImg src="/higher-education.png" 
                                fit="cover"
                                width="150"
                                alt="Cresterea cunostintelor in materie de fizioterapie si kinetoterapie si pregatirea viitorilo experti in materie medicala"
                                height="150" class="ma-4">
                                </NuxtImg>
                            </v-col>
                            <v-col cols="12" xs="12" sm="12" md="9" class="justify-center align-center d-flex pa-4">
                                <v-row>
                                    <v-col cols="12" xs="12" sm="12" md="12">
                                        <h3 class="font-weight-thin">
                                            <v-icon :icon="mdiArrowRight" size="24" class="mr-2"></v-icon>
                                            Indiferent dacă ești specialist sau pacient, 
                                            aici vei găsi informații relevante, actuale și 100% bazate pe dovezi științifice.
                                        </h3>
                                    </v-col>
                                    <v-col cols="12"  xs="12" sm="12" md="12">
                                        <h3 class="font-weight-thin">
                                            <v-icon :icon="mdiArrowRight" size="24" class="mr-2"></v-icon>
                                            Brainly Physio este pentru cei care caută sens, nu doar răspunsuri. 
                                        </h3>
                                    </v-col>
                                    <v-col cols="12"  xs="12" sm="12" md="12">
                                        <h3 class="font-weight-thin">
                                            <v-icon :icon="mdiArrowRight" size="24" class="mr-2"></v-icon>
                                            Urmărește-ne pe rețelele de socializare, abonează-te la canalul nostru de YouTube, 
                                            susține-ne pe Patreon și alătură-te unei comunități informate și pasionate de sănătate.
                                        </h3>
                                    </v-col>
                                    <v-col cols="12"  xs="12" sm="12" md="12" class="d-flex align-center justify-center">
                                        <span class="cursor-pointer" v-for="(logo,index) in logos" :key="index">
                                            <v-tooltip :text="logo.text">
                                                <template v-slot:activator="{ props }">
                                                    <NuxtImg :src="logo.path" class="mr-4" v-bind="props"
                                                        width="30"
                                                        :alt="`${logo.text + 'logo'}`"
                                                        height="30">
                                                    </NuxtImg>
                                                </template>
                                            </v-tooltip>
                                        </span>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </section>
        <ContactBannerFooter/>
    </div>
   
</template>

<script setup >
import { NuxtImg } from '#components';
import { mdiArrowRight } from '@mdi/js';
import ContactBannerFooter from '~/components/user/ContactBannerFooter.vue';

definePageMeta({
    layout: 'default',
})


useSeoMeta({
    title: 'Brainly Physio: Fizioterapie Bazată pe Dovezi și Educație Medicală',
    keywords:'Curs fizioterapie, Curs kinetoterapie, Curs recuperare medicală, Formare continuă kinetoterapie, Cursuri pentru fizioterapeuți, Reabilitare medicală curs, Curs masaj terapeutic, Seminar fizioterapie, Workshop kinetoterapie, Cursuri EMC kinetoterapeuți, Cursuri cu puncte EMC pentru fizioterapeuți, Specializare pentru asistenți medicali BFKT, Kinetoterapie pentru medici, Formare profesională pentru maseuri, Cursuri postuniversitare kinetoterapie, Curs terapie manuală, Curs Kinesio Taping, Curs bandajare kinesiologică, Curs terapie Trigger Point, Curs drenaj limfatic, Recuperare post-operatorie curs, Kinetoterapia în afecțiuni neurologice, Recuperarea umărului, Recuperarea genunchiului, Recuperarea coloanei vertebrale, Fizioterapie sportivă curs, Tehnici de masaj terapeutic, Curs acreditat de Colegiul Fizioterapeuților, Diplomă recunoscută în fizioterapie, Certificare în terapie manuală, Dezvoltarea abilităților practice în kinetoterapie, Cursuri cu credite EMC, Perfecționare profesională fizioterapie, cel mai bun curs de terapie manuală, cursuri de recuperare după operația de ligamente, tehnici de tratament pentru hernia de disc, cursuri de fizioterapie online cu creditare EMC, preț curs kinesio taping.',
    ogSiteName: 'Brainly Physio: Fizioterapie Bazată pe Dovezi și Educație Medicală',
    ogType: 'website',
    ogDescription: 'Descoperă o abordare modernă a recuperării medicale. Brainly Physio oferă conținut bazat 100% pe știință pentru fizioterapeuți, medici și pacienți. Alătură-te comunității!',
    ogTitle: 'Brainly Physio: Revoluționăm Educația în Fizioterapie',
    description: 'Brainly Physio este platforma ta de educație în fizioterapie modernă. Oferim resurse video, articole și cursuri bazate pe dovezi științifice pentru specialiști și pacienți. Demontăm mituri și promovăm gândirea critică în recuperarea medicală.',
    canonicalUrl: () =>  process.env.NODE_ENV === 'development' ? `http://localhost:3000/home` : `https://brainlyphysio.ro/lhome`
})


const logos = [
    {
        text: 'Instagram',
        path: '/instagram.png',
        redirect : 'https://www.instagram.com/brainly.physio?igsh=MW13eTloZmVqZ2F4Zg=='
    },
    {
        text: 'Youtube',
        path: '/youtube.png',
        redirect : 'https://youtube.com/@brainlyphysio?si=n9styisF0AhEWBkL'
    },
    {
        text: 'Tiktok',
        path: '/tiktok.png',
        redirect : 'https://www.tiktok.com/@brainly.physio?_t=ZN-8yfyFLISsac&_r=1'
    },
    {
        text: 'Facebook',
        path: '/facebook.png',
        redirect : 'https://www.facebook.com/share/1GA7QFHyJC/'
    },
    {
        text: 'Patreon',
        path: '/patreon.png',
        redirect : 'https://www.patreon.com/BrainlyPhysio?utm_campaign=creatorshare_creator'
    },
]

</script>

<style scoped>

.overlay {
  background-color: rgba(0, 0, 0, 0.4); /* dark overlay */
}
</style>