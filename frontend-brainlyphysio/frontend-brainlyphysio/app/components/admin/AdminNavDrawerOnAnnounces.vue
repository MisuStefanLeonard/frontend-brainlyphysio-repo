<template>
    <div >
        <v-navigation-drawer 
            color="grey-darken-4"
            expand-on-hover
            rail
            app
            permanent
        >
            <v-list>
                <v-list-item v-for="item in data" 
                :key="item.title"
                :title="item.title"
                :prepend-icon=item.icon
                :subtitle="item.subtitle"
                @click="item.route === null ? '' : navigateTo(item.route)"
                >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>


<script setup>
import { mdiCog, mdiPen, mdiPlus, mdiTextBoxMultipleOutline, mdiTextBoxOutline } from '@mdi/js';

const props = defineProps({
    isAdding : String,
    idAnnounce: String,
})

const data = computed(() => [
    {
        title: props.isAdding !== 'ADAUGARE ANUNT' ? 'Modificare anunt' :  'Adaugare anunt',
        icon: props.isAdding !== 'ADAUGARE ANUNT' ? mdiPen : mdiPlus,
        route: null
    },
    {
        title: 'Date generale' ,
        icon:mdiCog , 
        route:  props.isAdding !== 'ADAUGARE ANUNT' ? `/admin/announce/${props.idAnnounce}/general?general=1`  : '/admin/announce/add?general=1'
    },
    {
        title: 'Sectiuni principale' ,
        icon:mdiTextBoxMultipleOutline , 
        subtitle:'',
        route:  props.isAdding !== 'ADAUGARE ANUNT' ? `/admin/announce/${props.idAnnounce}/general?courseSection=1`  : '/admin/announce/add?courseSection=1'

    },
    // {
    //     title: 'Continut sectiuni' ,
    //     icon:mdiTextBoxOutline , 
    //     subtitle:'',
    //     route:  props.isAdding !== 'ADAUGARE ANUNT' ? `/admin/announce/${props.idAnnounce}/general?sectionContent=1`  : '/admin/announce/add?sectionContent=1'
    // },
])


</script>