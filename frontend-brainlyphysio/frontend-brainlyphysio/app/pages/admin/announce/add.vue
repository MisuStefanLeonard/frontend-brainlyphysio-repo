<template>
    <v-app class="bg-grey-darken-3 " fluid>
        <AdminNavDrawerOnAnnounces
         v-if="isAdding" 
        :is-adding="isAdding"/>
        <v-main class="h-100" v-if="!isLoading">
            <v-fade-transition>
                <v-card-title  v-if="route.query.courseSection === '1'"  class="font-weight-light text-left text-white my-6" >
                    <v-icon :icon="mdiFileDocumentMultipleOutline" class="mr-2"></v-icon>Sectiuni principale
                </v-card-title>
                <v-card-title  v-else  class="font-weight-light text-left text-white my-6" >
                    <v-icon :icon="mdiCog" class="mr-2"></v-icon>Date generale
                </v-card-title>
                
            </v-fade-transition>
            <v-fade-transition>
                <v-card class="mx-4 bg-grey-darken-4 rounded-xl my-4">
                    <v-card-text v-if="route.query.general === '1'">
                        <v-form ref="announceGeneralDataForm" class="text-white text-center " >
                            <v-row class="p-2 m-2 ">
                                <v-col cols="12" md="12" class="p-2 m-1">
                                    <v-text-field
                                        v-model="announceData.courseTitle"
                                        label="Titlu Curs"
                                        variant="outlined"
                                        placeholder="Ex: Curs [Nume Curs] Acreditat în [Oraș] - Înscrieri [An] | Numele Firmei"
                                        counter="70"
                                        :rules="[rules.required , rules.maxLength(70)]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" class="p-2 m-1">
                                    <v-textarea
                                        v-model="announceData.aboutCourse"
                                        label="Descriere Curs"
                                        placeholder="Ex: Învață [Nume Curs] de la experți. Cursul nostru de [durată] începe pe [data] și costă [preț]. Vezi programa completă și înscrie-te acum pentru a-ți asigura locul!"
                                        variant="outlined"
                                        auto-grow
                                        counter="255"
                                        rows="3"
                                        :rules="[rules.required,rules.maxLength(255)]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-textarea>
                                </v-col>

                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-file-input
                                        v-model="announceData.image"
                                        label="Imagine Curs"
                                        accept="image/*"
                                        :rules="[isLenOfFileValid,rules.required]"
                                        :disabled="announceData.presignedUrl !== 'empty'"
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
                                    ></v-file-input>
                                    <v-container fluid class="text-center">
                                        <p class="font-weight-light h3">Imaginea afisului/cursului</p>
                                        <v-row class="p-2 m-2">
                                            <v-col cols="12" class="d-flex justify-center">
                                                <div v-if="announceData.presignedUrl !== 'empty'">
                                                    <v-img
                                                        :src="announceData.presignedUrl"
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
                                                    <p class="font-weight-bold">Nu este imagine pentru acest afis/curs</p>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-col>

                            

                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-textarea
                                        v-model="announceData.trainers"
                                        label="Traineri (separati prin virgula)"
                                        variant="outlined"
                                        auto-grow
                                        counter="120"
                                        rows="3"
                                        :rules="[rules.required,rules.maxLength(120)]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-textarea>
                                </v-col>
                                
                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-text-field
                                        v-model="announceData.location"
                                        label="Locație"
                                        variant="outlined"
                                        counter="50"
                                        :rules="[rules.required,rules.maxLength(50)]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>
                                
                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-select
                                        v-model="announceData.format"
                                        :items="['Online', 'Fizic']"
                                        label="Format"
                                        variant="outlined"
                                        :rules="[rules.required]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-select>
                                </v-col>

                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-text-field
                                        v-model="announceData.contactPhoneNumber"
                                        label="Nr. Telefon Contact"
                                        variant="outlined"
                                        counter="20"
                                        :rules="[rules.maxLength(20)]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>
                                
                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-text-field
                                        v-model="announceData.price"
                                        label="Preț (RON)"
                                        type="number"
                                        :rules="[rules.onlyNumbers]"
                                        variant="outlined"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>
                                
                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-text-field
                                        v-model="announceData.courseDuration"
                                        label="Durata Curs (ore)"
                                        type="number"
                                        variant="outlined"
                                        :rules="[rules.required,rules.onlyNumbers]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-text-field
                                        v-model="announceData.emcPoints"
                                        label="Puncte EMC (Opțional)"
                                        type="number"
                                        :rules="[rules.onlyNumbers]"
                                        variant="outlined"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-text-field
                                        v-model="announceData.comingDate"
                                        label="Data Începere"
                                        type="date"
                                        variant="outlined"
                                        :rules="[rules.required]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-text-field
                                        v-model="announceData.leavingDate"
                                        label="Data Sfârșit"
                                        type="date"
                                        variant="outlined"
                                        :rules="[rules.required]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" class="p-2 m-1">
                                    <v-text-field
                                        v-model="announceData.expirationDate"
                                        label="Data Expirare Anunț"
                                        type="date"
                                        variant="outlined"
                                        :rules="[rules.required,rules.dateBiggerThanCurrent]"
                                    >
                                    <template v-slot:counter={max,value}>
                                        <span :style="{ color: value > max ? 'red' : 'white' }">
                                            {{ value }} / {{ max }}
                                        </span>
                                    </template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" class="text-center" >
                                    <v-btn color="success" size="large" @click="finalSave()">Salvează
                                        <v-icon class="ml-2" :icon="mdiFileDocumentPlus"></v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-fade-transition>
            <v-fade-transition>
                <v-card-text v-if="route.query.courseSection === '1'">
                    <v-btn class="bg-green" v-if="announceData.courseSections.length <= 0"
                        @click="openCourseAddingDialog()">
                            Adauga sectiune curs <v-icon class="ml-2" :icon="mdiPlus"></v-icon>
                    </v-btn>
                    <v-row v-if="announceData.courseSections.length > 0" class="d-flex flex-column ga-4">
                        <v-card 
                            v-for="(courseSection, indexCourse) in announceData.courseSections" 
                            :key="indexCourse"
                            class="bg-grey-darken-4 mx-3 p-2"
                        >
                            <v-card-title>
                                <p class="font-weight-light">{{ courseSection.sectionTitle }}</p>
                                <p class="font-weight-light text-subtitle-1">Nr. ordine: {{ courseSection.courseSectionOrder }}</p>
                            </v-card-title>
                            <v-card-text class="text-center">
                                <v-row no-gutters>
                                    <v-col cols="4">
                                        <v-btn 
                                            class="bg-primary" 
                                            @click="expandedSectionIndex = (expandedSectionIndex === indexCourse ? null : indexCourse)"
                                        >
                                            Conținut 
                                            <v-icon 
                                                class="ml-2" 
                                                :icon="expandedSectionIndex === indexCourse ? mdiArrowUp : mdiArrowDown"
                                            ></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn class="bg-green" @click="openModifyingCourseDialog(courseSection,indexCourse)">
                                            Modifică <v-icon class="ml-2" :icon="mdiPen"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-btn class="bg-red" @click="deleteCourseSection(indexCourse)">
                                            Șterge <v-icon class="ml-2" :icon="mdiTrashCanOutline"></v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                               
                            </v-card-text>
                            
                            <v-expand-transition>
                                <div v-show="expandedSectionIndex === indexCourse">
                                    <v-divider></v-divider>
                                    <v-container v-if="courseSection.sectionContents.length <= 0" fluid class="text-center">
                                        <v-btn class="bg-green"
                                        @click="openAddingContentSection(indexCourse)">
                                            Adauga sectiune noua <v-icon class="ml-2" :icon="mdiPlus"></v-icon>
                                        </v-btn>
                                    </v-container>
                                    <v-container v-if="courseSection.sectionContents.length > 0" fluid>
                                        <v-card class="bg-grey-darken-3 rounded-xl m-3">
                                            <v-card-title>
                                                <p class="font-weight-light my-2">Continutul sectiunii</p>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-card class="my-4 mx-2 bg-grey-darken-4" v-for="(content,indexContent) in courseSection.sectionContents" :key="indexContent">
                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col cols="12">
                                                                <p class="font-weight-light text-h6">Nr. ordine: {{ content.order }}</p>
                                                                <p class="font-weight-thin">
                                                                    <v-icon class="mr-2" :icon="mdiArrowRight" size="20"></v-icon>
                                                                    {{ content.content }}
                                                                </p>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                    <v-card-actions class="text-center">
                                                        <v-row class="mx-2 my-2 p-2">
                                                            <v-col cols="4">
                                                                <v-btn class="bg-green"
                                                                @click="openModifyingContentSection(content,indexContent,indexCourse)">
                                                                    Modifica <v-icon class="ml-2" :icon="mdiPen"></v-icon>
                                                                </v-btn>
                                                            </v-col>
                                                            <v-col cols="4">
                                                                <v-btn class="bg-red"
                                                                @click="deleteSection(indexContent , indexCourse)">
                                                                    Sterge <v-icon class="ml-2" :icon="mdiTrashCanOutline"></v-icon>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-actions>
                                                    <v-divider></v-divider>
                                                </v-card>
                                                <div class="text-center">
                                                    <v-btn class="bg-green"
                                                    @click="openAddingContentSection(indexCourse)">
                                                        Adauga sectiune noua <v-icon class="ml-2" :icon="mdiPlus"></v-icon>
                                                    </v-btn>
                                                </div>
                                               
                                            </v-card-text>
                                        </v-card>
                                    </v-container>
                                </div>
                            </v-expand-transition>
                        </v-card>
                        <v-col col="12" class="text-center">
                            <v-btn class="bg-green" 
                                @click="openCourseAddingDialog()">
                                    Adauga sectiune curs <v-icon class="ml-2" :icon="mdiPlus"></v-icon>
                            </v-btn>
                        </v-col>
                       
                    </v-row>

                    <v-dialog persistent scrollable max-width="700" v-model="openDialog">    
                        <v-card max-width="700" class="bg-grey-darken-4 pa-2">
                            <v-card-title v-if="isModifyingSectionContentGeneral === false">
                                <p class="font-weight-thin text-h6">{{ isModifyingCourseSection === true ? "Modifica sectiune curs" : "Adauga sectiune curs" }}</p>
                            </v-card-title>
                            <v-card-title v-else>
                                <p class="font-weight-thin text-h6">{{ isModifyingSectionContent === true ? "Modifica continut sectiune" : "Adauga continut sectiune nou" }}</p>
                            </v-card-title>
                            <v-card-text v-if="isModifyingSectionContentGeneral === false">
                                <v-container fluid class="text-center">
                                    <v-form ref="courseSectionForm"  class="text-center">
                                        <v-row class="p-2 m-2">
                                            <!-- Loop through fields and render specific components based on type -->
                                            <v-col v-for="(field, index) in courseSectionFormData" :key="index" cols="12">
                                                <!-- Render v-text-field for text fields -->
                                                <v-text-field
                                                    v-if="field.type === 'number'"
                                                    v-model.number="courseSectionData[field.model]"
                                                    :label="field.label"
                                                    :placeholder="field.placeholder"
                                                    :rules="field.rules"
                                                    type="number"
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
                                                    v-model="courseSectionData[field.model]"
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

                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-container>
                                <v-container fluid class="text-center">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-btn
                                                variant="flat"
                                                color="success"
                                                class="p-2"
                                                :append-icon="mdiContentSave"
                                                @click="isModifyingCourseSection === false ? saveNewCourse() : modifyCourse()"
                                            >
                                                Salveaza
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-btn variant="flat"
                                            color="red"
                                            class="p-2"
                                            :append-icon="mdiAlphaX" @click="closeDialog('course')">
                                            Inchide
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-text v-else>
                                <v-container fluid class="text-center">
                                    <v-form ref="sectionForm"  class=" text-center">
                                        <v-row class="p-2 m-2">
                                            <!-- Loop through fields and render specific components based on type -->
                                            <v-col v-for="(field, index) in sectionFormData" :key="index" cols="12">
                                                <!-- Render v-text-field for text fields -->
                                                <v-text-field
                                                    v-if="field.type === 'number'"
                                                    v-model.number="contentData[field.model]"
                                                    :label="field.label"
                                                    :placeholder="field.placeholder"
                                                    :rules="field.rules"
                                                    type="number"
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
                                                    v-model="contentData[field.model]"
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

                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-container>
                                <v-container fluid class="text-center">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-btn
                                                variant="flat"
                                                color="success"
                                                class="p-2"
                                                :append-icon="mdiContentSave"
                                                @click="isModifyingSectionContent === false ? saveNewContentSection() : modifyContentSection()"
                                            >
                                                Salveaza
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-btn variant="flat"
                                            color="red"
                                            class="p-2"
                                            :append-icon="mdiAlphaX" @click="closeDialog('section')">
                                            Inchide
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-card-text>
            </v-fade-transition>
        </v-main>
    </v-app>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import AdminNavDrawerOnAnnounces from '~/components/admin/AdminNavDrawerOnAnnounces.vue';
import { mdiShape, mdiAlphaDBoxOutline, mdiArrowDown, mdiArrowUp, mdiPen, mdiTrashCanOutline, mdiArrowRight, 
    mdiPlus, mdiAlphaX, mdiFileDocumentPlus, mdiCog, mdiFileDocumentMultipleOutline,mdiContentSave } from '@mdi/js';

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
});

useHead({
    title: 'Adaugare anunt'
})

const isAdding = "ADAUGARE ANUNT";
const isLoading = ref(true);
const route = useRoute();
const router = useRouter()
const announceGeneralDataForm = ref(null);
const expandedSectionIndex = ref(null);
const swal = useNuxtApp().$swal
const config = useRuntimeConfig()

const isModifyingCourseSection = ref(false)
const openDialog = ref(false)
const courseSectionForm = ref(null)
const courseToModifyIndex = ref(-1);
const isModifyingSectionContent = ref(false)
const isModifyingSectionContentGeneral = ref(false)

const sectionForm = ref(null)
const currentSectionIndex = ref(-1); 
const contentData = ref({
    idSectionContent: 0,
    content: '',
    order: 0
});

const sectionFormData = ref([
    {
        type: 'text-area',
        label: 'Continut sectiune',
        model: 'content',
        maxLength: 1000,
        rules: [
            value => !!value || 'Continut nu poate fi gol',
            value => (value || '').length <= 1000 || 'Sunt permise maxim 1000 de caractere',
        ],
    },
    {
        type: 'number',
        label: 'Nr. ordine',
        model: 'order',
        rules: [
            value => value !== '' && value !== null || 'Nr. de ordine este obligatoriu',
            value => /^\d+$/.test(String(value)) || "Sunt permise doar numere.",
            value => {
                const maxOrder = announceData.value.courseSections.length;
                if (isModifyingSectionContent.value && maxOrder > 0) {
                    return (Number(value) > 0 && Number(value) <= maxOrder) || `Ordinea trebuie să fie între 1 și ${maxOrder}.`;
                }
                return true;
            }
        ],
    },
]);


// This reactive object holds the form's data and matches your DTO
const announceData = ref({
    courseTitle: '',
    courseImagePath: null,
    presignedUrl: 'empty',
    image: null, 
    emcPoints: 0,
    aboutCourse: '',
    format: '',
    trainers: '',
    contactPhoneNumber: '',
    location: '',
    price: 0,
    courseDuration: 0,
    comingDate: new Date().toISOString().split('T')[0],
    leavingDate: new Date().toISOString().split('T')[0],
    expirationDate: new Date().toISOString().split('T')[0],
    courseSections: [] 
});

const courseSectionData = ref({
    idCourseSection : 0 ,
    sectionTitle : '',
    courseSectionOrder : 0,
    sectionContents : []
})

const courseSectionFormData = ref([
    {
        type: 'text-area',
        label: 'Titlu sectiune',
        placeholder: '',
        model: 'sectionTitle',
        maxLength: 150,
        rules: [
            value => !!value || 'Titlul nu poate fi gol',
            value => value.length <= 150 || 'Sunt permise maxim 150 de caractere',
        ],
    },
    {
        type: 'number',
        label: 'Nr. ordine',
        model: 'courseSectionOrder',
        rules: [
            value => !!value || 'Nr. de ordine este obligatoriu',
            value => /^\d+$/.test(String(value)) || "Sunt permise doar numere.",
            value => {
                const maxOrder = announceData.value.courseSections.length;
                if (isModifyingCourseSection.value) {
                    return (Number(value) > 0 && Number(value) <= maxOrder) || `Ordinea trebuie să fie între 1 și ${maxOrder}.`;
                }
                return true; 
            }
        ],
    },
])

const isLenOfFileValid = computed(() => {
    if(announceData.value.image === null){
        return true;
    }
    return announceData.value.image?.name.length <= 255;
});

const handleFileUpload = (() => {
    announceData.value.presignedUrl = URL.createObjectURL(announceData.value.image);
    announceData.value.courseImagePath = announceData.value.image.name;
})

const deleteImage = (() => {
    URL.revokeObjectURL(announceData.value.presignedUrl);
    announceData.value.presignedUrl = 'empty';
    announceData.value.image = null
    announceData.value.courseImagePath = null;
})

const rules = reactive({
    required: value => !!value || "Acest câmp este obligatoriu.",
    maxLength: (len) => (value) => (value || '').length <= len || `Maxim ${len} caractere permise.`,
    onlyNumbers: value => /^\d+$/.test(value) || "Sunt permise doar numere.",
    dateBiggerThanCurrent: value => {
        // If the field is empty, let the 'required' rule handle it.
        if (!value) return true; 

        // Get today's date in 'YYYY-MM-DD' format
        const today = new Date().toISOString().split('T')[0];

        // Compare the input date with today's date
        return value > today || 'Data trebuie să fie în viitor.';
    }
});

watch(() => announceData.value.image, (newFile) => {
    if (announceData.value.presignedUrl) {
        URL.revokeObjectURL(announceData.value.presignedUrl);
    }

    if (newFile && newFile[0]) {
        announceData.value.presignedUrl = URL.createObjectURL(newFile[0]);
    } else {
        announceData.value.presignedUrl = 'empty';
    }
    console.log(announceData.value)
});

function clearCourseSectionForm() {
    courseSectionData.value = {
        idCourseSection : 0 ,
        sectionTitle : '',
        courseSectionOrder : 0,
        sectionContents : []
    };
    courseToModifyIndex.value = -1;
    courseSectionForm.value?.resetValidation();
    isModifyingCourseSection.value = false;
}

function clearSectionForm() {
    contentData.value = {
        idSectionContent: 0,
        content: '',
        order: 0
    };
    currentSectionIndex.value = -1;
    courseToModifyIndex.value = -1;
    sectionForm.value?.resetValidation(); // Resets any validation errors
    isModifyingSectionContent.value = false;
    isModifyingSectionContentGeneral.value = false;

}


function closeDialog(type) {
    openDialog.value = false;
    if(type === 'course'){
        clearCourseSectionForm();
    }else{
        clearSectionForm()
    }
}

const openCourseAddingDialog = (() => {
    isModifyingCourseSection.value = false;
    courseSectionData.value.courseSectionOrder = announceData.value.courseSections.length + 1;
    openDialog.value = true
})

const openModifyingCourseDialog = ((courseSection,index) => {
    isModifyingCourseSection.value = true;
    courseToModifyIndex.value = index;
    courseSectionData.value = JSON.parse(JSON.stringify(courseSection)); // Deep copy for editing
    openDialog.value = true;
})

const saveNewCourse = (async() => {
    const { valid } = await courseSectionForm.value.validate();
    if (!valid){
        swal.fire('error' , 'Verificati formularul din nou' , '' , 1500)
        return;
    }

    const duplicate = announceData.value.courseSections.some(
        sec => sec.sectionTitle.trim().toLowerCase() === courseSectionData.value.sectionTitle.trim().toLowerCase()
    );

    if (duplicate) {
        swal.fire('error' , 'Exista deja un titlu cu acest nume!' , '' , 1500)
        return;
    }

    courseSectionData.value.courseSectionOrder = announceData.value.courseSections.length + 1;
    announceData.value.courseSections.push(courseSectionData.value);
    
    closeDialog('course');
})

const modifyCourse = (async() => {
    const { valid } = await courseSectionForm.value.validate();
    if (!valid){
        swal.fire('error' , 'Verificati formularul din nou' , '' , 1500)
        return
    }

    const originalSection = announceData.value.courseSections[courseToModifyIndex.value];
    const newOrder = courseSectionData.value.courseSectionOrder;
    const oldOrder = originalSection.courseSectionOrder;

    // Handle order swapping if the order has changed
    if (newOrder !== oldOrder) {
        const sectionToSwapWith = announceData.value.courseSections.find(s => s.courseSectionOrder === newOrder);
        if (sectionToSwapWith) {
            // Swap their order numbers
            sectionToSwapWith.courseSectionOrder = oldOrder;
        }
    }

    // Apply all changes from the form to the original item in the array
    announceData.value.courseSections[courseToModifyIndex.value] = courseSectionData.value;
    
    // Sort the entire array by the order number to update the UI correctly
    announceData.value.courseSections.sort((a, b) => a.courseSectionOrder - b.courseSectionOrder);
    
    closeDialog('course');
})

const deleteCourseSection = (indexToDelete) => {
    announceData.value.courseSections.splice(indexToDelete, 1);

    announceData.value.courseSections.forEach((section, newIndex) => {
        section.courseSectionOrder = newIndex + 1;
    });
};


const openModifyingContentSection = ((content, sectionIdx, contentIdx) => {
    isModifyingSectionContentGeneral.value = true;
    isModifyingSectionContent.value = true;
    currentSectionIndex.value = sectionIdx;
    courseToModifyIndex.value = contentIdx;
    contentData.value = JSON.parse(JSON.stringify(content));
    openDialog.value = true;
});

const openAddingContentSection = ((courseIdx) => {
    isModifyingSectionContentGeneral.value = true;
    isModifyingSectionContent.value = false;
    currentSectionIndex.value = courseIdx;
    const section = announceData.value.courseSections[courseIdx];
    contentData.value.order = section.sectionContents.length + 1
    openDialog.value = true;
});


// --- IMPLEMENTED FUNCTION ---
async function saveNewContentSection() {
    const { valid } = await sectionForm.value.validate(); // sectionForm is the ref on your content form
    if (!valid){
        swal.fire('error' , 'Verificati formularul din nou' , '' , 1500)
        return;
    }
    
    const section = announceData.value.courseSections[currentSectionIndex.value];
    // Add the new content
    section.sectionContents.push(contentData.value);
    // Ensure order is correct
    section.sectionContents.forEach((c, i) => c.order = i + 1);
    
    closeDialog('section');
}

// --- IMPLEMENTED FUNCTION ---
async function modifyContentSection() {
    const { valid } = await sectionForm.value.validate();
    if (!valid){
        swal.fire('error' , 'Verificati formularul din nou' , '' , 1500)
        return;
    }

    const section = announceData.value.courseSections[courseToModifyIndex.value];
    const originalContent = section.sectionContents[currentSectionIndex.value];

    const newOrder = contentData.value.order;
    const oldOrder = originalContent.order;

    // Handle order swapping if the order has changed
    if (newOrder !== oldOrder) {
        const contentToSwapWith = section.sectionContents.find(c => c.order === newOrder);
        if (contentToSwapWith) {
            contentToSwapWith.order = oldOrder;
        }
    }

    // Apply all changes from the form to the original item in the array
    section.sectionContents[currentSectionIndex.value] = contentData.value;
    
    // Sort the entire array by the order number to update the UI correctly
    section.sectionContents.sort((a, b) => a.order - b.order);
    
    closeDialog('section');
}


const deleteSection = (sectionIndex, contentIndexToDelete) => {
    const targetSection = announceData.value.courseSections[sectionIndex];

    if (!targetSection) {
        console.error("Section not found!");
        return;
    }

    targetSection.sectionContents.splice(contentIndexToDelete, 1);

    targetSection.sectionContents.forEach((content, newIndex) => {
        content.order = newIndex + 1;
    });
};

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

const finalSave = (async () => {
    fireAlarm('info' , 'Asteptati...' , '' , 'ect')

    const isValid = await announceGeneralDataForm.value.validate()
    if(!isValid.valid){
        swal.close()
        fireAlarm('error' , 'Verificati formularul din nou' , '' , null)
        return
    }

    const form = new FormData()
    const addURL = 'admin/announce/create'
    const method = 'POST'

    form.append('announce' , JSON.stringify(announceData.value))
    form.append('image' , announceData.value.image)
    console.log('aici')
    try{
        const response = await $fetch(config.public.apiBase + addURL, {
            method: method,
            credentials: 'include',
            body: form
        })
        console.log(response)
        swal.close()
        fireAlarm('success' , 'Success' , 'Adaugat cu success. Redirectionare' , '',2000,'top-end')
        setTimeout(() => {
            navigateTo('/admin/announces')
        }, 2000);
        
    }catch(error){
        swal.close()
        console.log(error)
        fireAlarm('error' , 'Eroare' , `${error.data?.message}` , '' , 3000)
    }

    
})

watchEffect(() => {
    const queryKeys = Object.keys(route.query);
    const allowedKeys = ['general', 'courseSection'];

    // --- LOGIC WITH THE NEW VALUE CHECK ---
    let isInvalid = false;
    if (queryKeys.length !== 1) {
        // Condition 1: There is NOT exactly one query parameter
        isInvalid = true;
    } else {
        const key = queryKeys[0];
        const value = route.query[key];
        
        if (!allowedKeys.includes(key) || value !== '1') {
            // Condition 2: The single key is not allowed OR its value is not '1'
            isInvalid = true;
        }
    }

    // If any invalid condition is met, redirect.
    if (isInvalid && route.query.general !== '1') { // Avoid redirect loops
        console.log("Invalid query detected. Redirecting to general view.");
        router.replace({ query: { general: '1' } });
    }
});

onMounted(() => {
    isLoading.value = false;
});
</script>