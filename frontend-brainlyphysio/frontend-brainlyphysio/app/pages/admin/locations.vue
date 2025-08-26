<template>
    <div class="bg-grey-darken-4 p-3 h-100">
        <v-container fluid>
            <p class="font-weight-light text-h6 text-center">Locatii</p>
        </v-container>
        <v-container fluid>
            <v-row no-gutters class="p-2 m-2">
                <v-col cols="12" class="d-block text-center">
                    <v-btn rounded class="m-2 " color="success" @click="openDialog()">
                        Adauga locatie
                        <v-icon size="24" class="pl-3" right :icon="mdiPlus"></v-icon>
                    </v-btn>
                </v-col>
            </v-row> 
        </v-container>
        <v-dialog v-model="showAddLocationDialog" scrollable max-width="800" persistent>
            <v-card max-width="800" class="bg-grey-darken-4 pa-2">
                <v-card-title class="d-flex justify-space-between align-center">
                    <p class="font-weight-thin text-h6">
                        {{ isModifying === true ? "Modifica locatia" : "Adauga o locatie noua" }}
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
                        <v-form ref="locationForm"  class="bg-grey-darken-4 text-center">
                            <v-row class="p-2 m-2">
                                <!-- Loop through fields and render specific components based on type -->
                                <v-col v-for="(field, index) in locationFormData" :key="index" cols="12">
                                    <!-- Render v-text-field for text fields -->
                                    <v-text-field
                                        v-if="field.type === 'text-field'"
                                        v-model="addingLocationFormData[field.model]"
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
                            @click="isModifying === true ? modifyActualLocation() : saveNewLocation()"
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
            <v-card-title class="text-center">Locatii</v-card-title>
            <v-text-field
                v-model="search"
                label="Cauta dupa oras sau judet"
                :prepend-inner-icon="mdiMagnify"
                class="p-3 mx-3"
                variant="outlined"
            ></v-text-field>
            
            <v-data-table
                :headers="visibleHeaders"
                :items="filteredLocations"
                :items-per-page="15"
                item-value="idLocation"
                show-select
                class="bg-blue-grey-darken-4 p-4"
                >

              <!-- Custom Actions for Each Row -->
                <template #[`item.actions`]="{ item }">
                    <v-icon
                        color="error"
                        size="28"
                        @click="deleteLocation(item.idLocation)"
                        class="mr-2" :icon="mdiDelete"
                    >
                    </v-icon>
                    <v-icon
                        color="white"
                        size="28"
                        class="mr-2"
                        @click="modifyLocation(item.idLocation)" :icon="mdiPen"
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
    title: 'Locatii'
})

const config = useRuntimeConfig()
const search = ref('')
const swal = useNuxtApp().$swal;
const loaded = ref(false);
const showAddLocationDialog = ref(false)
const isModifying = ref(false)
const locations = ref([])
const locationForm = ref(null)


const uniqueCityCountyRule = computed(() => {
  return () => {
    if (!locations.value) return true;
    const city = addingLocationFormData.value.city?.trim().toLowerCase() || ''
    const county = addingLocationFormData.value.county?.trim().toLowerCase() || ''
    const currentId = addingLocationFormData.value.idLocation

    if (!city || !county) return true 

    const duplicate = locations.value.some(loc => {
      return (
        loc.idLocation !== currentId &&
        loc.city.trim().toLowerCase() === city &&
        loc.county.trim().toLowerCase() === county
      )
    })

    return duplicate ? 'Aceasta combinatie oras + judet exista deja' : true
  }
})

const headers = ref([
  { title: 'Id', align: 'center', key: 'idLocation' , sortable: false,},
  { title: 'Oras', align: 'center', key: 'city' , sortable: true },
  { title: 'Judet', align: 'center', key: 'county' , sortable: true },
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false }

])

const visibleHeaders = computed(() => {
  return headers.value.filter(header => !header.hidden); 
});

const filteredLocations = computed(() => {
  if (!search.value) return locations.value;
  let searchTerm = search.value.toLowerCase();
  return locations.value.filter((location) => {
    return (
        location.city.toLowerCase().includes(searchTerm) || 
        location.county.toLowerCase().includes(searchTerm) 
    );
  });
})

const addingLocationFormData = ref({
    idLocation : 0 ,
    city: '',
    county: '',
});


const locationFormData = ref([
    {
        type: 'text-field',
        label: 'Oras',
        placeholder: '',
        model: 'city',
        maxLength: 50,
        rules: [
            value => !!value || 'Orasul nu poate fi gol',
            value => value.length <= 50 || 'Sunt permise maxim 50 de caractere',
            uniqueCityCountyRule.value
        ],
    },
    {
        type: 'text-field',
        label: 'Judet',
        placeholder: '',
        model: 'county',
        maxLength: 50,
        rules: [
            value => !!value || 'Judetulu nu poate fi gol',
            value => value.length <= 50 || 'Sunt permise maxim 50 de caractere',
            uniqueCityCountyRule.value
        ],
    },
]);

const openDialog = () => {
    showAddLocationDialog.value = true
    isModifying.value = false
    clearFormData()
}

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

const getLocations = (async () => {
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const {data,error} = await useFetch(config.public.apiBase + 'admin/locations', {
        method: 'GET',
        credentials: 'include'
    })
    // const {data,error} = useAsyncData('locations' , () => {
    //     $fetch()
    // })
    swal.close()
    if(error.value === undefined){
        console.log(data.value)
        locations.value = data.value
        return
    }else{
        console.error(error.value)
    }
})

const deleteLocation = async (idLocationFunc) => {
    const result = await swal.fire({
        title: "Confirmați ștergerea?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Da",
        cancelButtonText: "Nu",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            try {
                // Use $fetch for the API call
                await $fetch(config.public.apiBase + `admin/location/delete/${idLocationFunc}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
            } catch (error) {
                // Let SweetAlert2 handle the error display
                swal.showValidationMessage(
                    `Cererea a eșuat: ${error.data?.message || 'Eroare de la server'}`
                );
            }
        },
        allowOutsideClick: () => !swal.isLoading()
    });

    if (result.isConfirmed) {
        // If the API call was successful, update the UI
        Swal.fire("Șters!", "Locația a fost ștearsă.", "success");
        locations.value = locations.value.filter(loc => loc.idLocation !== idLocationFunc);
    }
};


const modifyLocation = (idLocationFunc) => {
    showAddLocationDialog.value = true
    isModifying.value = true
    let findLocationToModify = locations.value.find(p => p.idLocation === idLocationFunc)
    if(findLocationToModify !== undefined){
        addingLocationFormData.value = {...findLocationToModify}
    }else{
        window.location.reload()
    }
}

const saveNewLocation = async () => {
    fireAlarm('info', 'Se salvează...', '', true);
    const { valid } = await locationForm.value.validate();

    if (valid) {
        try {
            // Use $fetch for a single, direct API call from the client
            const newLocation = await $fetch(config.public.apiBase + 'admin/location/create', {
                method: 'POST',
                credentials: 'include',
                body: addingLocationFormData.value
            });

            swal.close();
            fireAlarm('success', "Adăugat cu succes!", '', null, 1500, 'top-end');
            
            // Push the actual response from the server, not the form data
            addingLocationFormData.value.idLocation = newLocation.id
            locations.value.push(addingLocationFormData.value)
            closeDialog(); // Make sure closeDialog() is defined to close the form
            
        } catch (error) {
            swal.close();
            console.error("Error saving location:", error);
            fireAlarm('error', "A apărut o eroare!", error.data?.message || '', null);
        }
    } else {
        swal.close();
        fireAlarm('error', "Verificați din nou formularul!", '', null);
    }
};



const clearFormData = () => {
    addingLocationFormData.value.idLocation = 0;
    addingLocationFormData.value.city = '';
    addingLocationFormData.value.county = '';
    // locationForm.value.resetValidation()
}

const closeDialog = () => {
    showAddLocationDialog.value = false
    isModifying.value = false;
    // clearFormData()
}


const modifyActualLocation = async () => {
    const { valid } = await locationForm.value.validate();
    if (!valid) {
        fireAlarm('error', "Verificați din nou formularul!", '', null, 2000, 'top-end');
        return;
    }

    fireAlarm('info', 'Se modifică...', '', true);
    
    try {
        // Use $fetch and await the response
        const updatedLocation = await $fetch(config.public.apiBase + 'admin/location/modify', {
            method: 'PUT',
            credentials: 'include',
            body: addingLocationFormData.value
        });

        swal.close();
        fireAlarm('success', "Modificat cu succes!", '', null, 1500, 'top-end');

        // Find the index and update the array with the data from the server response
        const index = locations.value.findIndex(p => p.idLocation === addingLocationFormData.value.idLocation);
        if (index !== -1) {
            locations.value[index] = addingLocationFormData.value;
        } else {
            window.location.reload()
        }
        
        closeDialog();

    } catch (error) {
        swal.close();
        console.error("Error modifying location:", error);
        fireAlarm('error', "A apărut o eroare!", error.data?.message || 'Contactați administratorul', null);
    }
};



onBeforeMount(async () => {
    await getLocations()
})

onMounted(() => {
    loaded.value = true;
})



</script>