<template>
    <v-app>
      <!-- <FirstTimeEntering /> -->
      <NavigationBar :key="route.fullPath" />
      <v-main>
        <SnackbarExpired />
        <NuxtPage />
      </v-main>
      <FooterComp />
      <CookieBanner/>
    </v-app>
  </template>
  
<script setup>
  // import SnackbarExpired from '~/components/SnackbarExpired.vue';
  import CookieBanner from '~/components/user/CookieBanner.vue';
  import NavigationBar from '~/components/user/NavigationBar.vue';
  import FooterComp from '~/components/user/Footer.vue';


  const route = useRoute();
  const config = useRuntimeConfig()
  // const head = useLocaleHead({
  //   seo: true,
  //   dir: true,
  //   lang: true,
  // })

  useHead(() => ({
    titleTemplate : (titleChunk) => {
      return titleChunk ? `${titleChunk}` : 'Site Title';
    },
    htmlAttrs : {
      lang: true,
      dir: true,
      seo: true
    },
    link: [
      {rel: 'canonical' , href: `${config.public.siteUrl}${route.fullPath}`},
      // ...(head.value.link.filter(h => h.hreflang && h.hreflang.includes('-')) || [])
    ],
    meta : [
      {
        property : 'og:title' , 
        content: `BrainlyPhysio - ${route.meta.title || 'Default'}` 
      },
      {
        property: 'og:locale',
        content: 'ro_RO',
      },
      {
        property: 'og:locale:alternate',
        content: 'en_US',
      },
      {
        property: 'og:url',
        content: `${config.public.siteUrl}${route.fullPath}`|| 'Default',
      },
      {
        name : 'description',
        content: route.meta.description || 'Default'
      },
      
      {
        name : 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      },
      {
        name: 'author',
        content: 'BrainlyPhysio, Romania , all rights reserved'
      },
      {
        name: 'charset',
        content: 'UTF-8'
      },
      {
        name: 'keywords',
        content: route.meta.keywords || 'Default'
      }
    ],
    script: 
    [
      {
        innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KQBVL4PC');`,
        type: 'text/javascript'
      },
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-WN0D0Y17ZT',
        type: 'text/javascript'
      },
      {
          innerHTML: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WN0D0Y17ZT');
          `,
          type: 'text/javascript'
      }
    ],
    noscript: 
    [
      {
        innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQBVL4PC"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }
    ],

  }))

</script>