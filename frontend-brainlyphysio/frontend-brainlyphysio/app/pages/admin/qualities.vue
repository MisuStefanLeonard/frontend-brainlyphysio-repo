<template>
    <div class="bg-grey-darken-4 p-3 h-100">
        <v-container fluid>
            <p class="font-weight-light text-h6 text-center">Calitati</p>
        </v-container>
        <v-container fluid>
            <v-row no-gutters class="p-2 m-2">
                <v-col cols="12" class="d-block text-center">
                    <v-btn rounded class="m-2 " color="success" @click="openDialog()">
                        Adauga calitate
                        <v-icon size="24" class="pl-3" right :icon="mdiPlus"></v-icon>
                    </v-btn>
                </v-col>
            </v-row> 
        </v-container>
        <v-dialog v-model="showAddQualityDialog" scrollable max-width="600" persistent>
            <v-card max-width="600" class="bg-grey-darken-4 pa-2">
                <v-card-title class="d-flex justify-space-between align-center">
                    <p class="font-weight-thin text-h6">
                        {{ isModifying === true ? "Modifica calitatea" : "Adauga o calitate noua" }}
                    </p>
                    <v-btn
                        icon
                        variant="text"
                        color="red"
                        @click="closeDialog()"
                    >
                        <v-icon :icon="mdiClose"></v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container fluid class="text-center">
                        <v-form ref="qualityForm"  class="bg-grey-lighten-3 text-center">
                            <v-row class="p-2 m-2">
                                <!-- Loop through fields and render specific components based on type -->
                                <v-col v-for="(field, index) in qualityFormData" :key="index" cols="12" class="bg-grey-darken-4">
                                    <!-- Render v-text-field for text fields -->
                                    <v-text-field
                                        v-if="field.type === 'text-field'"
                                        v-model="addingQualityFormData[field.model]"
                                        :label="field.label"
                                        :placeholder="field.placeholder"
                                        :rules="field.rules"
                                        :counter="field.maxLength"
                                        variant="outlined"
                                        color="white"
                                        class="p-2 m-1"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>

                    <!-- Save Button -->
                    <v-container fluid class="text-center">
                        <v-btn
                            variant="flat"
                            color="success"
                            class="p-2"
                            :append-icon="mdiContentSave"
                            @click="isModifying === true ? modifyActualQuality() : saveNewQuality()"
                        >
                            {{isModifying === true ? 'Salveaza' : 'Adauga'}}
                        </v-btn>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-card
            v-if="loaded"
            class="bg-blue-grey-darken-4 rounded-xl p-1 mx-4 my-4"
            variant="outlined"
        >
            <v-card-title class="text-center">Calitati</v-card-title>
            <v-text-field
                v-model="search"
                label="Cauta dupa numele calitatii"
                :prepend-inner-icon="mdiMagnify"
                class="p-3 mx-3"
                variant="outlined"
            ></v-text-field>
            
            <v-data-table
                :headers="headers"
                :items="filteredQualities"
                :items-per-page="15"
                item-value="idQuality"
                show-select
                class="bg-blue-grey-darken-4 p-4"
                >

              <!-- Custom Actions for Each Row -->
                <template #[`item.actions`]="{ item }">
                    <v-icon
                        color="error"
                        size="28"
                        @click="deleteQuality(item.idQuality)"
                        class="mr-2" :icon="mdiDelete"
                    >
                    </v-icon>
                    <v-icon
                        color="white"
                        size="28"
                        class="mr-2"
                        @click="modifyQuality(item.idQuality)" :icon="mdiPen"
                    >
                   
                </v-icon>
                </template>
                

            </v-data-table>
      </v-card>
    </div>
</template>

<script setup>
import { mdiDelete, mdiEye, mdiMagnify, mdiPlus,mdiClose,mdiContentSave, mdiPen } from '@mdi/js';
import Swal from 'sweetalert2';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

useHead({
    title: 'Calitati membrii'
})

const config = useRuntimeConfig()
const search = ref('')
const swal = useNuxtApp().$swal;
const loaded = ref(false);
const showAddQualityDialog = ref(false)
const isModifying = ref(false)
const qualities = ref([])
const qualityForm = ref(null)

const headers = ref([
  { title: 'Id', align: 'center', key: 'idQuality' , sortable: false, hidden: true},
  { title: 'Nume', align: 'center', key: 'qualityName' , sortable: true },
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false }
])

const uniqueQualityName = computed(() => {
  return () => {
    const qualityName = addingQualityFormData.value.qualityName?.trim().toLowerCase() || ''
    const currentId = addingQualityFormData.value.idQuality

    if (!qualityName) return true // let required rules handle empties

    const duplicate = qualities.value.some(quality => {
      return (
        quality.idQuality !== currentId &&
        quality.qualityName.trim().toLowerCase() === qualityName.trim().toLowerCase() 
      )
    })

    return duplicate ? 'Aceasta calitate exista deja' : true
  }
})

const openDialog = () => {
    showAddQualityDialog.value = true
    isModifying.value = false
    clearFormData()
}


const filteredQualities = computed(() => {
  if (!search.value) return qualities.value;
  let searchTerm = search.value.toLowerCase();
  return qualities.value.filter((quality) => {
    return (
        quality.qualityName.toLowerCase().includes(searchTerm)
    );
  });
})

const addingQualityFormData = ref({
    idQuality : 0 ,
    qualityName: '',
});


const qualityFormData = ref([
    {
        type: 'text-field',
        label: 'Nume calitate',
        placeholder: '',
        model: 'qualityName',
        maxLength: 150,
        rules: [
            value => !!value || 'Calitatea nu poate fi gol',
            value => value.length <= 150 || 'Sunt permise maxim 50 de caractere',
            uniqueQualityName.value
        ],
    },
]);


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

const getQualities = (async () => {
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const {data,error} = await useFetch(config.public.apiBase + 'admin/qualities', {
        method: 'GET',
        credentials: 'include'
    })
    swal.close()
    if(error.value === undefined){
        qualities.value = data.value
        return
    }else{
        console.error(error.value)
    }
})

async function deleteQuality(idQualityFunc) {
    const result = await swal.fire({
        title: "Confirmați ștergerea?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Da, șterge!",
        cancelButtonText: "Anulează",
    });

    if (result.isConfirmed) {
        fireAlarm('info', 'Se șterge...', '', true);
        try {
            await $fetch(config.public.apiBase + `admin/quality/delete/${idQualityFunc}`, 
            { method: 'DELETE',credentials: 'include' });
            swal.close();
            Swal.fire("Șters!", "Calitatea a fost ștearsă.", "success");
            qualities.value = qualities.value.filter(q => q.idQuality !== idQualityFunc);
        } catch (error) {
            swal.close();
            Swal.fire("Eroare", error.data?.message || "Calitatea nu a putut fi ștearsă.", "error");
        }
    }
}


const modifyQuality = (idQualityFunc) => {
    showAddQualityDialog.value = true
    isModifying.value = true
    const findQualityToModify = qualities.value.find(p => p.idQuality === idQualityFunc)
    if(findQualityToModify !== undefined){
        addingQualityFormData.value = {...findQualityToModify}
    }else{
        window.location.reload()
    }
}


const saveNewQuality = (async () => {
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const { valid } = await qualityForm.value.validate();
    if (!valid){
        swal.close()
        fireAlarm('error' , "Verificati din nou formularul!" , '' , null , 2000 , 'top-end')
        return
    }

    fireAlarm('info', 'Se adaugă...', '', true);
    try {
        const newQuality = await $fetch(config.public.apiBase + 'admin/quality/create', {
            method: 'POST',
            credentials: 'include',
            body: addingQualityFormData.value
        });
        addingQualityFormData.value.idQuality = newQuality.id
        qualities.value.push(addingQualityFormData.value);
        swal.close();
        fireAlarm('success', "Adăugat cu succes!", '', null, 1500, 'top-end');
        closeDialog();
        return;
    } catch (error) {
        swal.close();
        fireAlarm('error', 'Eroare', error.data?.message || 'Nu s-a putut adăuga calitatea.', null);
    }

})



const clearFormData = () => {
    addingQualityFormData.value.idQuality = 0;
    addingQualityFormData.value.qualityName = '';
    // qualityForm.value.resetValidation()
}

const closeDialog = () => {
    showAddQualityDialog.value = false
    isModifying.value = false;
    // clearFormData()
}

    

const modifyActualQuality = (async () => {
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const { valid } = await qualityForm.value.validate();
    if (!valid){
        swal.close()
        fireAlarm('error' , "Verificati din nou formularul!" , '' , null , 2000 , 'top-end')
        return
    };

    fireAlarm('info', 'Se modifică...', '', true);
    try {
        const updatedQuality = await $fetch(config.public.apiBase + 'admin/quality/modify', {
            method: 'PUT',
            credentials: 'include',
            body: addingQualityFormData.value
        });
        
        const index = qualities.value.findIndex(q => q.idQuality === addingQualityFormData.value.idQuality);
        if (index !== -1) {
            qualities.value[index] = addingQualityFormData.value;
        }
        swal.close();
        fireAlarm('success', "Modificat cu succes!", '', null, 1500, 'top-end');
        closeDialog();
    } catch (error) {
        swal.close();
        fireAlarm('error', 'Eroare', error.data?.message || 'Nu s-a putut modifica calitatea.', null);
    }
})


onMounted(async () => {
    loaded.value = true;
})

onBeforeMount(async () => {
    await getQualities()
})



</script>