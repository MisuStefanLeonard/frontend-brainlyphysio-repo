<template>
    <div class="bg-grey-darken-4 p-3 h-100">
        <v-container fluid>
            <p class="font-weight-light text-h4 text-center">Echipa</p>
        </v-container>
        <v-container fluid>
            <v-row no-gutters class="p-2 m-2">
                <v-col cols="12" class="d-block text-center">
                    <v-btn rounded class="m-2 " color="success" @click="openAddDialog()">
                        Adauga membru
                        <v-icon size="24" class="pl-3" right :icon="mdiPlus"></v-icon>
                    </v-btn>
                </v-col>
            </v-row> 
        </v-container>
        <!-- ADDING MEMBER DIALOG -->
        <!-- ADDING MEMBER DIALOG -->
        <!-- ADDING MEMBER DIALOG -->
        <v-dialog v-model="showDialog" scrollable max-width="800">
            <v-card max-width="800" class="bg-grey-darken-4 pa-2 text-center">
                <v-card-title class="d-flex justify-space-between align-center">
                    <p class="font-weight-thin text-h6">{{ isModifying ? 'Modifică Membru' : 'Adaugă un Membru Nou' }}</p>
                    <v-btn :icon="mdiClose" variant="text" color="red" @click="closeDialog()"></v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container fluid class="text-center">
                        <v-form ref="memberForm"  class="bg-grey-lighten-3 text-center">
                            <v-row class="p-2 m-2">
                                <!-- Loop through fields and render specific components based on type -->
                                <v-col v-for="(field, index) in memberFormData" :key="index" cols="12" class="p-2 m-1 bg-grey-darken-4">
                                    <!-- Render v-text-field for text fields -->
                                    <v-text-field
                                        v-if="field.type === 'text-field'"
                                        v-model="memberData[field.model]"
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

                                    <v-textarea
                                        v-if="field.type === 'text-area'"
                                        v-model="memberData[field.model]"
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
                                    </v-textarea>

                                    <v-file-input
                                        v-if="field.type === 'file-input'"
                                        v-model="memberData[field.model]"
                                        :label="field.label"
                                        :placeholder="field.placeholder"
                                        :accept="field.accept"
                                        :rules="field.rules"
                                        :disabled="memberData.presignedUrl !== 'empty'"
                                        @change="handleFileUpload()"
                                        clearable
                                        variant="outlined"
                                        color="white"
                                        class="p-2 m-1"
                                        counter
                                        show-size
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-file-input>

                                    <v-select v-if="field.type === 'select-multiple'"
                                    v-model="memberData[field.model]"
                                    :label="field.label"
                                    :hint="field.hint"
                                    variant="outlined"
                                    color="white"
                                    item-color="black"
                                    class="p-2 m-1"
                                    persistent-hint
                                    multiple
                                    chips
                                    :items="getItemsForField(field.model)"
                                    :item-title="(item) => itemDisplayForVSelect(field.model, item)"
                                    :item-value="item => item"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>

                    <!-- Image Section -->
                    <v-container fluid class="">
                        <p class="font-weight-light h3">Imaginea membrului</p>
                        <v-row class="p-2 m-2">
                            <v-col cols="12" class="d-flex justify-center">
                                <div v-if="memberData.presignedUrl !== 'empty'">
                                    <v-img
                                        :src="memberData.presignedUrl"
                                        alt="Imaginea membrului"
                                        aspect-ratio="16/9"
                                        cover
                                        max-width="200"
                                        max-height="200"
                                        class="my-2"
                                    >
                                        <template v-slot:placeholder>
                                            <div class="d-flex align-center justify-center fill-height">
                                                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                            </div>
                                        </template>
                                    </v-img>
                                    <!-- Delete Image Button -->
                                    <v-btn
                                        class="m-2 p-1"
                                        color="error"
                                        @click="deleteImage()"
                                    >
                                        Șterge imaginea
                                    </v-btn>
                                </div>
                                <div v-else>
                                    <p class="font-weight-bold">Nu este imagine pentru acest membru</p>
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>

                    <!-- Save Button -->
                    <v-container fluid class="text-center">
                        <v-btn
                            variant="flat"
                            color="success"
                            class="p-2"
                            :append-icon="mdiContentSave"
                            @click="saveOrModify()"
                        >
                            {{isModifying === true ? 'Salveaza' : 'Adauga'}}
                        </v-btn>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Modiyfing member dialog -->
        <!-- Modiyfing member dialog -->
        <!-- Modiyfing member dialog -->

        <v-card
            v-if="loaded"
            class="bg-blue-grey-darken-4 rounded-xl p-1 mx-3 my-4"
            variant="outlined"
        >
            <v-card-title class="text-center">Echipa</v-card-title>
            <v-text-field
                v-model="search"
                label="Cauta dupa nume,prenume,numar de telefon,email"
                :prepend-inner-icon="mdiMagnify"
                class="p-3 mx-3"
                variant="outlined"
            ></v-text-field>
            
            <v-data-table
                :headers="visibleHeaders"
                :items="filteredMembers"
                :items-per-page="15"
                item-value="idAccount"
                show-select
                class="bg-blue-grey-darken-4 p-4"
                >

              <!-- Custom Actions for Each Row -->
                <template #[`item.actions`]="{ item }">
                    <v-icon
                        color="error"
                        size="28"
                        @click="deleteMember(item.idAccount)"
                        class="mr-2" :icon="mdiDelete"
                    >
                        
                    </v-icon>
                    <v-icon
                    color="primary"
                    size="28"
                    class="mr-2"
                    @click="openModifyDialog(item.idAccount)" :icon="mdiPen"
                    >
                   
                </v-icon>
                </template>
                

            </v-data-table>
      </v-card>
    </div>
</template>

<script setup>
import { mdiDelete, mdiEye, mdiMagnify, mdiPen, mdiPlus ,mdiContentSave, mdiClose} from '@mdi/js';
import Swal from 'sweetalert2';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

useHead({
    title: 'Membrii echipei'
})

// to keep
const config = useRuntimeConfig()
const swal = useNuxtApp().$swal;

const loaded = ref(false);
const teamMembers = ref([])
const search = ref('')
const memberForm = ref(null)
const locationsList = ref([])
const qualitiesList = ref([])
const showDialog = ref(false);
const isModifying = ref(false);

const memberData = ref({
    idAccount : 0 ,
    name: '',
    prename: '',
    email : '',
    description: '',
    phoneNumber: '',
    image: null,
    imagePath: null,
    presignedUrl: 'empty',
    memberLocations : [],
    memberQualities: []
});

const memberFormData = ref([
    {
        type: 'text-field',
        label: 'Nume ',
        placeholder: '',
        model: 'name',
        maxLength: 30,
        rules: [
            value => !!value || 'Numele nu poate fi gol',
            value => value.length <= 30 || 'Sunt permise maxim 30 de caractere',
        ],
    },
    {
        type: 'text-field',
        label: 'Prenume ',
        placeholder: '',
        model: 'prename',
        maxLength: 70,
        rules: [
            value => !!value || 'Prenume nu poate fi gol',
            value => value.length <= 70 || 'Sunt permise maxim 70 de caractere',
        ],
    },
    {
        type: 'text-field',
        label: 'E-mail ',
        placeholder: '',
        model: 'email',
        maxLength: 120,
        rules: [
            value => !!value || 'E-mail-ul nu poate fi gol',
            value => value.length <= 120 || 'Sunt permise maxim 120 de caractere',
        ],
    },
    {
        type: 'text-field',
        label: 'Nr. telefon ',
        placeholder: '',
        model: 'phoneNumber',
        maxLength: 20,
        rules: [
            value => !!value || 'Nr telefon nu poate fi gol',
            value => value.length <= 20 || 'Sunt permise maxim 20 de caractere',
        ],
    },
    {
        type: 'text-area',
        label: 'Scurta descriere',
        placeholder: '',
        model: 'description',
        maxLength: 150,
        rules: [
            value => !!value || 'Descrierea nu poate fi goala',
            value => value.length <= 150 || 'Sunt permise maxim 150 de caractere',
        ],
    },
    {
        type: 'file-input',
        label: 'Incarca imagine',
        accept: 'image/*',
        placeholder: 'Selectează un fișier',
        model: 'image',
        rules: [
            value => {
                if (!value) return true; 
                return value.name.length <= 255 || 'Numele fișierului trebuie să aibă mai puțin de 255 de caractere';
            },
            
        ],
    },
    {
        type: 'select-multiple',
        label: 'Locatii de operare',
        model: 'memberLocations',
        hint: 'Alege locatiile de operare  '
    },
    {
        type: 'select-multiple',
        label: 'Calitati',
        model: 'memberQualities',
        hint: 'Alege calitatile '
    },
]);

const headers = ref([
  { title: 'Id ', align: 'center', key: 'idAccount' , sortable: false, hidden: true},
  { title: 'Nume', align: 'center', key: 'name' , sortable: true },
  { title: 'Prenume', align: 'center', key: 'prename' , sortable: true },
  { title: 'Email', align: 'center', key: 'email' , sortable: true },
  { title: 'Nr. telefon', align: 'center', key: 'phoneNumber'},
  { title: 'Actiuni', align: 'center', key: 'actions', sortable: false }

])

const visibleHeaders = computed(() => {
  return headers.value.filter(header => !header.hidden); 
});

const filteredMembers = computed(() => {
  if (!search.value) return teamMembers.value;
  let searchTerm = search.value.toLowerCase();
  return teamMembers.value.filter((member) => {
    return (
        member.name.toLowerCase().includes(searchTerm) || 
        member.prename.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm) ||
        member.phoneNumber.includes(searchTerm)
    );
  });
})

// const isLenOfFileValid = computed(() => {
//     if(memberData.value.image === null){
//         return true;
//     }
//     return memberData.value.image?.name.length <= 255;
// });

const handleFileUpload = (() => {
    memberData.value.presignedUrl = URL.createObjectURL(memberData.value.image);
    memberData.value.imagePath = memberData.value.image.name;
})

const deleteImage = (() => {
    URL.revokeObjectURL(memberData.value.presignedUrl);
    memberData.value.presignedUrl = 'empty';
    memberData.value.image = null
    memberData.value.imagePath = null;
})

const openAddDialog = () => {
    showDialog.value = true;
    isModifying.value = false;
    clearAccountData()
}

const openModifyDialog = (idMember) => {
    isModifying.value = true;
    // Deep copy the member data to avoid reactivity issues
    const findMemberIndexToModify = teamMembers.value.findIndex(member => member.idAccount === idMember)
    if(findMemberIndexToModify !== -1){
        memberData.value = teamMembers.value[findMemberIndexToModify]
        console.log('aici' , memberData.value)
    }else{
        fireAlarm('warning' , 'Atentie' , 'Acest membru nu mai exista. Refresh in 2 secunde.' , null)
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }
    // memberData.value = structuredClone(member);
    // The v-select for multiple items needs an array of IDs, not objects
    showDialog.value = true;
    
}

const closeDialog = () => {
    showDialog.value = false;
    isModifying.value = false;

    // memberForm.value?.resetValidation();
}

const clearAccountData = () => {
    memberData.value.idAccount = 0 ,
    memberData.value.name = '',
    memberData.value.prename = '',
    memberData.value.email  = '',
    memberData.value.description = '',
    memberData.value.phoneNumber = '',
    memberData.value.image = null,
    memberData.value.imagePath = null,
    memberData.value.presignedUrl = 'empty',
    memberData.value.memberLocations  = [],
    memberData.value.memberQualities = []
    
}

const saveOrModify = (async () => {
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
    const isValid = await memberForm.value.validate();
    if(isValid.valid){
        const formData = new FormData()
        const endpoint = isModifying.value ? 'admin/account/modify' : 'admin/account/create'
        const method = isModifying.value ? 'PUT' : 'POST'
        formData.append('accountString' , JSON.stringify(memberData.value))
        console.log(memberData.value)
        if (memberData.value.image) {
            formData.append('image', memberData.value.image);
        }else{
            formData.append('image' , null)
        }
        try {
            const response = await $fetch(config.public.apiBase + endpoint, {
                method : method,
                credentials: 'include',
                body: formData
            })
            
            Swal.close()
            console.log(response)
            if(!isModifying.value){
                fireAlarm('success' , 'Success' , 'Creat cu success' , null,1000,'top-end')
                memberData.value.idAccount = response.id
                memberData.value.presignedUrl = response.presignedUrl
                teamMembers.value.push(memberData.value)
            }else{
                const index = teamMembers.value.findIndex(member => member.idAccount === memberData.value.idAccount)
                if(index !== -1){
                    fireAlarm('success' , 'Success' , 'Modificat cu success' , null,1000,'top-end')
                    teamMembers.value[index] = memberData.value
                }else{
                    fireAlarm('error' , 'Eroare' , 'Refresh in 2 secunde. O eroare a avut loc' , null,1000,'top-end')
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
            }
            closeDialog()
        } catch (error) {
            console.log(error)
            Swal.close();
            Swal.fire("Eroare", error.data?.message || "O eroare generala a avut loc", "error",2000);
        }
    }else{
        Swal.close()
        fireAlarm('warning' , 'Atentie' , 'Verificati formularul din nou' , null)
        return
    }
    
})

// TO-DO
// Fa functii de extragere a locatiilor si calitatilor!

const getItemsForField = (model) => {
  if (model === 'memberLocations') {
    return locationsList.value
  }
  if (model === 'memberQualities') {
    return qualitiesList.value
  }
  return []
}

const itemDisplayForVSelect = (model, item) => {
  if (model === 'memberLocations') {
    return `Oras: ${item.city}, Judet: ${item.county}`
  }
  if (model === 'memberQualities') {
    return `${item.qualityName}`
  }
  return ''
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

async function deleteMember(idAccountFunc) {
    const result = await swal.fire({
        title: "Confirmați ștergerea?",
        text: "Această acțiune este ireversibilă!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Da, șterge!",
        cancelButtonText: "Anulează",
        showLoaderOnConfirm: true,
        // This function runs when the user clicks "Confirm"
        preConfirm: async () => {
            try {
                // Use $fetch for the API call
                await $fetch(config.public.apiBase + `admin/account/delete/${idAccountFunc}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
            } catch (error) {
                // Let SweetAlert2 display the error
                swal.showValidationMessage(
                    `Cererea a eșuat: ${error.data?.message || 'Eroare de la server'}`
                );
            }
        },
        allowOutsideClick: () => !swal.isLoading()
    });

    // This block runs only if the preConfirm function completed without errors
    if (result.isConfirmed) {
        Swal.fire("Șters!", "Membrul a fost șters cu succes.", "success");
        // Update the UI by removing the deleted member
        teamMembers.value = teamMembers.value.filter(member => member.idAccount !== idAccountFunc);
    }
}


const getAllData = async () => {
    fireAlarm('info' , 'Loading...' , 'Asteptati..' , true)
  const { data, status, error } = await useAsyncData('allData', async () => {
    const [members, locations, qualities] = await Promise.all([
      $fetch(config.public.apiBase + 'admin/accounts', {method: 'GET' , credentials: 'include'}),
      $fetch(config.public.apiBase + 'admin/locations',{method: 'GET' , credentials: 'include'}),
      $fetch(config.public.apiBase + 'admin/qualities',{method: 'GET' , credentials: 'include'}),
    ])
    return { members, locations, qualities }
  })

  if (status.value === 'error' || error.value) {
    console.error("Failed to load data:", error.value)
    swal.close()
    return
  }

  teamMembers.value = data.value.members
  locationsList.value = data.value.locations
  qualitiesList.value = data.value.qualities
  swal.close()
  console.log(teamMembers.value)
}

onBeforeMount(async () => {
    await getAllData()
})

onMounted(() => {
    loaded.value = true;
})



</script>