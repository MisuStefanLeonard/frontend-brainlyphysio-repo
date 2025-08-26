<template>
    <div class="bg-grey-darken-4 h-100">
        <v-container fluid>
            <p class="font-weight-light text-h6 p-2 my-2 mx-1">Anunturi / Cursuri</p>
        </v-container>
        <v-container fluid v-if="announcesList && announcesList.length > 0 ">
            <div v-for="(announce,indexAnnounce) in announcesList" :key="indexAnnounce">
                <v-card  max-width="700"
                variant="outlined" class="mx-auto bg-grey-darken-3 p-2 mx-1 my-2">
                    <v-img cover :aspect-ratio="16/9"
                    :src="announce.presignedUrl">
                    </v-img>
                    <v-card-title class="text-center">
                        {{ announce.courseTitle }}
                    </v-card-title>
                    <v-card-subtitle class="text-center">
                        <p class="font-weight-bold">Format: {{ announce.format }}</p>
                        <p class="font-weight-bold">Traineri: {{ announce.trainers }}</p>
                    </v-card-subtitle>
                    <v-divider opacity="0" v-for="i in 15" :key="i"></v-divider>
                    <v-card-actions>
                        <v-row no-gutters class="text-center">
                            <v-col cols="4">
                                <v-btn variant="outlined" color="orange-lighten-2" @click="expandedSectionIndex = (expandedSectionIndex === indexAnnounce ? null : indexAnnounce)">
                                Mai multe
                                <v-icon 
                                    class="ml-2" 
                                    :icon="expandedSectionIndex === indexAnnounce ? mdiArrowUp : mdiArrowDown"
                                ></v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn  variant="outlined" color="primary" @click="navigateTo(`/admin/announce/${announce.idAnnounce}/general?general=1`)">
                                Modifica
                                <v-icon 
                                    class="ml-2" color="white"
                                    :icon="mdiPen"
                                ></v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn  variant="outlined" color="red" @click="deleteAnnounce(announce.idAnnounce)">
                                    Sterge
                                <v-icon 
                                    class="ml-2" color="white"
                                    :icon="mdiTrashCanOutline"
                                ></v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-divider opacity="0" v-for="i in 15" :key="i"></v-divider>

                    <v-expand-transition>
                        <div v-show="expandedSectionIndex === indexAnnounce">
                            <v-divider></v-divider>
                            <v-container fluid>
                                <v-row no-gutters>
                                    <v-col cols="12">
                                        <p class="font-weight-bold">Descriere</p>
                                        <p class="font-weight-thin">
                                            <v-icon :icon="mdiArrowRight" size="20" class="mr-2"></v-icon>
                                            {{ announce.aboutCourse }}
                                        </p>
                                    </v-col>
                                    <v-divider opacity="0" v-for="i in 15" :key="i"></v-divider>
                                    <v-col cols="6">
                                        <p class="font-weight-bold">Puncte EMC</p>
                                        <p class="font-weight-thin" v-if="announce.emcPoints !== 0">
                                            <v-icon :icon="mdiArrowRight" size="20" class="mr-2"></v-icon>
                                            {{ announce.emcPoints }}
                                        </p>
                                        <p class="font-weight-thin" v-else>
                                            Nu are puncte EMC
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="font-weight-bold">Numar telefon contact</p>
                                        <p class="font-weight-thin">
                                            <v-icon :icon="mdiArrowRight" size="20" class="mr-2"></v-icon>{{ announce.contactPhoneNumber }}
                                        </p>
                                    </v-col>
                                    <v-divider opacity="0" v-for="i in 15" :key="i"></v-divider>

                                    <v-col cols="6">
                                        <p class="font-weight-bold">Locatie</p>
                                        <p class="font-weight-thin">
                                            <v-icon :icon="mdiArrowRight" size="20" class="mr-2"></v-icon> {{ announce.location }}
                                        </p>
                                    </v-col>
                                    <v-col cols="6">
                                        <p class="font-weight-bold">Pret</p>
                                        <p class="font-weight-thin" v-if="announce.price !== 0">
                                            <v-icon :icon="mdiArrowRight" size="20" class="mr-2"></v-icon>
                                            {{ announce.price }} RON
                                        </p>
                                        <p class="font-weight-thin" v-else>
                                            Nu are pret.
                                        </p>
                                    </v-col>
                                    <v-divider opacity="0" v-for="i in 15" :key="i"></v-divider>

                                    <v-col cols="4">
                                        <p class="font-weight-bold">Data venire</p>
                                        <p class="font-weight-thin">{{ announce.comingDate.split('T')[0] }}</p>
                                    </v-col>
                                    <v-col cols="4">
                                        <p class="font-weight-bold">Data plecare</p>
                                        <p class="font-weight-thin">{{ announce.leavingDate.split('T')[0] }}</p>
                                    </v-col>
                                    <v-col cols="4">
                                        <p class="font-weight-bold">Data expirare anunt</p>
                                        <p class="font-weight-thin">{{ announce.expirationDate.split('T')[0] }}</p>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                    </v-expand-transition>
                </v-card>
                <v-divider opacity="0"  v-for="i in 15" :key="i"></v-divider>
            </div>
            <div class="text-center">
                <v-btn color="green" variant="outlined" @click="navigateTo('/admin/announce/add')">
                    Adauga anunt / curs<v-icon class="ml-2" :icon="mdiPlus"></v-icon>
                </v-btn>
            </div>

        </v-container>
        <v-container v-else fluid class="text-center">
            <v-alert variant="outlined" type="warning" class="p-2 mx-2 my-2">
                Nu aveti niciun anunt/curs definit
                <div fluid class="text-center mt-4">
                    <v-btn color="green" variant="outlined" @click="navigateTo('/admin/announce/add')">
                        Adauga anunt / curs<v-icon class="ml-2" :icon="mdiPlus"></v-icon>
                    </v-btn>
                </div>
            </v-alert>
        </v-container>
    </div>
</template>

<script setup>
import { mdiArrowDown, mdiArrowRight, mdiArrowUp, mdiPen, mdiPlus, mdiTrashCanOutline } from '@mdi/js'

definePageMeta({
    middleware: 'admin',
    layout: 'admin'
})

useHead({
    title: 'Anunturi'
})

const loaded = ref(false)
const config = useRuntimeConfig()
const announcesList = ref([])
const swal = useNuxtApp().$swal
const expandedSectionIndex = ref(-1)

const loadAnnounces = (async () => {
    fireAlarm('info' , 'Asteptati...' , '' , true)
    const getURL = 'admin/announces'
    const method = 'GET'

    const {data,error} = await useFetch(config.public.apiBase + getURL, {
        method : method,
        credentials : 'include',
    })
    swal.close()
    if(error.value === undefined){
        announcesList.value = data.value
    }else{
        fireAlarm('error' , 'Eroare', 'O eroare a avut loc.' , null , 2000 , 'center')
        return
    }
})

const deleteAnnounce = (async (id) => {
    fireAlarm('info' , 'Asteptati...' , '' , true)
    const getURL = `admin/announce/delete/${id}`
    const method = 'DELETE'

    try {
        await $fetch(config.public.apiBase + getURL, {
            credentials: 'include',
            method: method
        })

        swal.close()
        fireAlarm('success' , 'Success' , 'Sters cu succes!' , null , 2000 , 'top-end')
        announcesList.value.splice(id,1);
    } catch (error) {
        fireAlarm('error' , 'Eroare' , `${error.data?.message}` , '' , 3000)
        setTimeout(() => {
            window.location.reload()
        }, 3000);
        return
    }
})

function fireAlarm(icon,title,text,isLoading,timerF=2000,positionF='center'){
    if(isLoading === null){
        swal.fire({
            position: positionF,
            icon: icon,
            title: title,
            text: text,
            timer: timerF,
        });
    }else{
        swal.fire({
            icon: 'info',
            title: 'Loading...',
            text: 'Asteptati...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                swal.showLoading();
            },
        });
    }
}


onMounted(() => {
    loaded.value = true
})

onBeforeMount(async () => {
    await loadAnnounces()
})

</script>