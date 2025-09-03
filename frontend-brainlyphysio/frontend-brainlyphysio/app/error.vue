<template>
    <v-app class="bg-grey-lighten-3">
        <NavigationBar></NavigationBar>
        <v-container class="text-center" fluid>
            <v-empty-state
                :headline="errorShown.headline"
                :title="errorShown.title"
                :text="errorShown.text"
                image="/logo.png"
            >
            <v-btn class="bg-red" @click="handleError">
                BACK <v-icon :icon="mdiArrowLeft" :size="20"></v-icon>
            </v-btn>
        </v-empty-state>
        </v-container>
        <ContactBannerFooter></ContactBannerFooter>
        <Footer></Footer>
    </v-app>
</template>


<script setup>
import { clearError } from '#app'
import { mdiArrowLeft } from '@mdi/js';
import Footer from './components/user/Footer.vue';
import ContactBannerFooter from './components/user/ContactBannerFooter.vue';
import NavigationBar from './components/user/NavigationBar.vue';

const props = defineProps({
    error: Object
})

definePageMeta({
    layout: 'default'
})

// const {t} = useI18n();
const errorShown =  ref({
    headline : '',
    title : '',
    text : ''
})

useHead({
    title :  props.error.statusCode
})

const errorInfo = ref([
    {
        id: 404,
        headline: "Oops, 404",
        title: "Aceasta pagina nu mai exista",
        text: "Pagina negasita"
    },
    {
        id: 400,
        headline: "Oops, 400",
        title: "Ati accesat o resursa nevalida",
        text: "Accesare nevalida"
    },
    {
        id: 500,
        headline: "Oops, 500",
        title: "Eroare server",
        text: "Probleme cu conexiunea la server, ne scuzati!"
    },
    {
        id: 401,
        headline: "Oops, 401",
        title: "Acces neautorizat",
        text: "Nu aveti permisiunea de a accesa aceasta resursa"
    }
])


const findErrorCode = (() => {
    const errorCustom = errorInfo.value.find(v => v.id === props.error.statusCode)
    errorShown.value = errorCustom;
})

function handleError() {
  clearError({ redirect: '/home' })
}

onMounted(() => {
    findErrorCode()
})

</script>
