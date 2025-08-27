<template>
    <div>
        <div data-aos="fade-down">
            <v-img src="/logo.png" :aspect-ratio="15/5">
                <div class="overlay d-flex justify-center align-center fill-height text-h6 elevation-24">
                    <v-row>
                        <v-col cols="12">
                            <p class="text-h3 text-white font-weight-normal text-center">TERMENI SI CONDITII</p>
                        </v-col>
                    </v-row>
                </div>
            </v-img>
        </div>
        <div class="my-2 p-2 mx-2">
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card class="w-100 h-100 border-md elevation-12 bg-grey-darken-4">
                        <v-list class="bg-grey-darken-4">
                            <v-list-group
                                v-for="(section, index) in data"
                                :key="index"
                                :value="section.title"
                            >
                                <template v-slot:activator="{ props }">
                                    <v-list-item
                                        v-bind="props"
                                        :title="section.title"
                                        class="font-weight-bold"
                                    ></v-list-item>
                                </template>
                                
                                <div class="pa-4 text-body-1 ml-5">
                                    <p
                                        v-for="(paragraph, pIndex) in section.paragraphs"
                                        :key="pIndex"
                                        class="mb-3"
                                        :class="{ 'font-weight-bold': isAllCaps(paragraph) }"
                                    >
                                        <v-icon :icon="mdiArrowRight" size="18" class="mr-3"></v-icon>{{ paragraph }}
                                    </p>
                                </div>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <ContactBannerFooter></ContactBannerFooter>
    </div>
</template>

<script setup>
import { mdiArrowRight } from '@mdi/js';
import ContactBannerFooter from '~/components/user/ContactBannerFooter.vue';

useSeoMeta({
    title: 'Termeni si conditii'
})

// Funcție ajutătoare pentru a detecta textul scris cu majuscule
const isAllCaps = (text) => {
    // Verifică dacă textul este un string și dacă este identic cu varianta sa cu majuscule
    // și are mai mult de 10 caractere pentru a evita boldarea abrevierilor
    return typeof text === 'string' && text.toUpperCase() === text && text.length > 10;
};

const data = ref([
    {
        title : '1. INTRODUCERE',
        paragraphs : [
            'Acești Termeni și Condiții (împreună cu documentele la care se face referire în acesta) vă informează cu privire la termenii în care puteți utiliza (i) site-ul web (www.brainlyphysio.ro) („Site-ul”); și (ii) toate informațiile de pe Site („Wiki-ul BrainlyPhysio Academy”) și serviciile conexe BrainlyPhysio Academy, (colectiv, „Serviciul BrainlyPhysio Academy”). Utilizarea Site-ului include vizualizarea, accesarea, navigarea, contribuția și descărcarea de Conținut (așa cum este definit mai jos).',
            'În acești Termeni și Condiții, „BrainlyPhysio Academy” se referă la organizația caritabilă și compania, BrainlyPhysio Academy, Site-ul și Serviciul BrainlyPhysio Academy.',
            'Vă rugăm să citiți cu atenție acești Termeni și Condiții și Politica noastră de Confidențialitate înainte de a începe să utilizați Site-ul și Serviciul BrainlyPhysio Academy, deoarece acestea se vor aplica utilizării de către dumneavoastră a Site-ului și a acestor servicii',
            'DACĂ NU SUNTEȚI DE ACORD CU ACEȘTI TERMENI ȘI CONDIȚII SAU CU POLITICA DE CONFIDENȚIALITATE, VĂ RUGĂM SĂ NU VIZUALIZAȚI, ACCESAȚI, NAVIGAȚI, CONTRIBUIȚI, UTILIZAȚI SAU DESCĂRCAȚI CONȚINUT DE PE SITE SAU SĂ UTILIZAȚI SERVICIUL BRAINLYPHYSIO ACADEMY.',
            'VĂ RUGĂM SĂ REȚINEȚI CĂ BRAINLYPHYSIO ACADEMY NU ESTE REGLEMENTATĂ DE CONSILIUL PROFESIILOR DIN SĂNĂTATE ȘI ÎNGRIJIRE SAU DE ORICE ALT ORGANISM SAU AGENȚIE DE REGLEMENTARE ȘI NU ESTE UN ORGANISM SAU O ASOCIAȚIE PROFESIONALĂ.',
            'Prin utilizarea Site-ului și a Serviciului BrainlyPhysio Academy, confirmați că ați citit, înțeles și sunteți de acord să fiți legat de acești Termeni și Condiții, indiferent dacă sunteți sau nu un Editor înregistrat al BrainlyPhysio Academy.',
            'Vă rugăm să acordați o atenție deosebită clauzelor de exonerare de răspundere stabilite la Secțiunile 1.6 (Fără furnizare de sfaturi medicale) și 1.7 (Clauză generală de exonerare de răspundere), garanției și despăgubirii de la Secțiunea 1.9.5 (Contribuții ale utilizatorilor – date personale, imagini, fișiere video, audio) și limitării pe care o plasăm asupra răspunderii noastre, stabilită la Secțiunea 1.17.4 (Limitarea răspunderii) și despăgubirilor pe care ni le acordați la Secțiunea 9.5 (Licența dumneavoastră către BrainlyPhysio Academy) și Secțiunea 1.17.2 (Despăgubire).',
            'De asemenea, vă rugăm să acordați o atenție deosebită actelor interzise și restricțiilor aplicabile utilizării de către dumneavoastră a Site-ului și a Conținutului, inclusiv cele stabilite în Secțiunile 10 (Conținutul BrainlyPhysio Academy; Interzicerea extragerii și exploatării datelor) și 11 (Acte interzise).',
            'Vă rugăm să rețineți că putem actualiza acești Termeni și Condiții din când în când, așa cum este stabilit în Secțiunea 1.4 (Modificări ale acestor Termeni și Condiții sau ale Serviciului BrainlyPhysio Academy).',
            'Vă rugăm să rețineți că termeni și condiții specifice se aplică achiziționării unui abonament la BrainlyPhysio Academy Plus.',
            'Diferite părți ale Site-ului pot avea termeni suplimentari postați, de exemplu, în ceea ce privește BrainlyPhysio Academy Plus și utilizarea Depozitului de Resurse de Reabilitare ReLAB-HS. Dacă există un conflict între acești Termeni și Condiții și termenii postați pentru o anumită zonă a Site-ului, termenii pentru zona specifică a Site-ului vor avea prioritate pentru utilizarea de către dumneavoastră a acelei zone a Site-ului.',
            'Dacă aveți întrebări cu privire la acești Termeni și Condiții, vă rugăm să contactați BrainlyPhysio Academy la pascu.aeduard@yahoo.com .'
        ]
    },
    {
        title: '2. ALȚI TERMENI APLICABILI',
        paragraphs: [
            'Politica de Confidențialitate a BrainlyPhysio Academy, care stabilește termenii în care BrainlyPhysio Academy prelucrează orice date cu caracter personal pe care le colectează de la dumneavoastră sau pe care le furnizați către BrainlyPhysio Academy. Prin utilizarea Serviciilor BrainlyPhysio Academy, consimțiți la o astfel de prelucrare și garantați că toate datele furnizate de dumneavoastră sunt corecte;',
            'Politica privind Cookie-urile a BrainlyPhysio Academy, care stabilește informații despre utilizarea cookie-urilor de către BrainlyPhysio Academy și utilizarea cookie-urilor de către terți.'
        ]
    },
    {
        title: '3. INFORMAȚII DESPRE NOI',
        paragraphs: [
            'Brainly este un proiect voluntar pe care noi (câțiva prieteni pasionați de fizioterapie) l am pornit , in primul rand pentru a avea mai multa motivație sa învățăm noi și mai apoi pentru a putea dezvolta comunitatea de fizioterapeuți din Romania. Brainly Physio este pentru cei ce caută sens, nu doar răspunsuri.'
        ]
    },
    {
        title: '4. MODIFICĂRI ALE ACESTOR TERMENI SAU ALE SERVICIULUI BRAINLYPHYSIO ACADEMY',
        paragraphs: [
            'BrainlyPhysio Academy poate modifica acești Termeni și Condiții în orice moment și fără notificare, așa că vă rugăm să le revizuiți periodic pentru a fi la curent cu orice astfel de modificare. Utilizarea continuă de către dumneavoastră a Site-ului și a Serviciului BrainlyPhysio Academy va însemna că acceptați aceste modificări și, prin urmare, astfel de modificări vor fi obligatorii pentru dumneavoastră.',
            'BrainlyPhysio Academy își rezervă dreptul de a modifica sau de a înceta Serviciul BrainlyPhysio Academy sau orice cont de Editor, și de a actualiza Site-ul și de a schimba sau elimina orice text, imagini, videoclipuri, grafice și alte informații (inclusiv articole, prelegeri, prezentări și materiale de cercetare), fie că sunt furnizate de BrainlyPhysio Academy sau de Editorii săi („Conținut”) în orice moment și pentru orice motiv sau fără motiv, fără notificare și fără nicio răspundere față de dumneavoastră',
            'Conținutul de pe Site poate fi neactualizat la un moment dat, iar BrainlyPhysio Academy nu este obligată să îl mențină la zi.'
        ]
    },
    {
        title: '5. ACCESAREA SITE-ULUI',
        paragraphs: [
            'Site-ul este disponibil gratuit.',
            'BrainlyPhysio Academy nu garantează că Site-ul sau orice Conținut de pe acesta va fi întotdeauna disponibil sau neîntrerupt. Accesul la Site este permis pe o bază temporară. BrainlyPhysio Academy poate suspenda, retrage, întrerupe sau schimba integral sau parțial Site-ul fără notificare. BrainlyPhysio Academy nu va fi răspunzătoare față de dumneavoastră dacă, din orice motiv, Site-ul (sau orice parte a acestuia, inclusiv, fără limitare, orice Conținut) este indisponibil în orice moment sau pentru orice perioadă.',
            'Sunteți responsabil pentru a face toate aranjamentele necesare pentru a avea acces la Site. De asemenea, sunteți responsabil pentru a vă asigura că toate persoanele care accesează Site-ul prin conexiunea dumneavoastră la internet sunt conștiente de acești Termeni și Condiții și de alți termeni și condiții aplicabile și că le respectă.'
        ]
    },
    {
        title: '6. FĂRĂ FURNIZARE DE SFATURI MEDICALE',
        paragraphs: [
            'BRAINLYPHYSIO ACADEMY NU OFERĂ SFATURI MEDICALE.',
            'Conținutul nu constituie sfaturi medicale de niciun fel și nu este destinat să fie și nu ar trebui să fie utilizat pentru a diagnostica sau identifica tratamentul pentru nicio afecțiune medicală.',
            'Conținutul nu ar trebui niciodată utilizat în locul sfatului medicului dumneavoastră sau al altui profesionist din domeniul medical, iar utilizarea de către dumneavoastră a BrainlyPhysio Academy indică acordul dumneavoastră de a nu face acest lucru.',
            'Nimic de pe Site sau inclus ca parte a oricărui proiect al BrainlyPhysio Academy, inclusiv Serviciul BrainlyPhysio Academy, nu ar trebui interpretat ca o încercare de a oferi sau de a emite o opinie medicală sau de a se angaja în alt mod în practica medicinei.',
            'Căutați întotdeauna sfatul medicului dumneavoastră sau al altui furnizor de servicii medicale calificat pentru orice întrebări pe care le aveți cu privire la o afecțiune medicală.',
            'Nu ignorați niciodată sfatul medical profesionist și nu amânați solicitarea acestuia din cauza a ceva ce ați citit pe Site.',
            'BrainlyPhysio Academy este concepută ca o resursă educațională pentru a învăța despre probleme legate de fizioterapie.',
            'Nu există absolut nicio asigurare că orice declarație conținută sau citată în Conținut care atinge probleme medicale este adevărată, corectă, precisă sau actualizată.',
            'Chiar dacă o declarație despre medicină este exactă, este posibil să nu se aplice dumneavoastră sau simptomelor dumneavoastră. Dacă sunteți pacient sau suspectați că suferiți de o afecțiune medicală, consultați medicul pentru sfaturi medicale și diagnostic. Dacă sunteți afectat de o potențială urgență medicală sau de sănătate, sunați imediat la serviciul local de urgență.',
            'BrainlyPhysio Academy nu recomandă și nu susține niciun tratament, instituție, produs, profesionist, medic, procedură, test, opinie sau alt serviciu sau informație care poate fi menționată pe Site sau ca parte a Serviciului BrainlyPhysio Academy. Prin utilizarea Serviciului BrainlyPhysio Academy, înțelegeți și sunteți de acord că Conținutul este scris și monitorizat într-un efort de colaborare de către o comunitate mare de oameni care nu sunt angajați ai BrainlyPhysio Academy și nici nu sunt controlați de BrainlyPhysio Academy, iar Conținutul se schimbă constant. BrainlyPhysio Academy nu validează și nu susține în alt mod Conținutul și nici nu validează acreditările persoanelor care contribuie la Site sau participă la Wiki-ul BrainlyPhysio Academy.',
            'Utilizarea Conținutului, a Site-ului și/sau a Serviciului BrainlyPhysio Academy de către dumneavoastră NU creează o relație medic-pacient între dumneavoastră și BrainlyPhysio Academy sau oricare dintre Editori sau personalul, angajații, voluntarii, ofițerii, directorii și administratorii BrainlyPhysio Academy, sau oricine altcineva afiliat, conectat sau asociat cu BrainlyPhysio Academy în orice mod („Membrii BrainlyPhysio Academy”).',
            'Informațiile și declarațiile referitoare la suplimentele alimentare nu au fost evaluate de Agenția de Reglementare a Medicamentelor și a Produselor de Sănătate, Agenția Europeană pentru Medicamente sau orice altă agenție sau organism de reglementare din lume și nu sunt destinate să diagnosticheze, să trateze, să vindece sau să prevină nicio boală.',
            'Site-ul poate conține materiale legate de sănătate sau medicale care sunt explicite sexual. Dacă considerați aceste materiale ofensive, este posibil să nu doriți să utilizați Site-ul nostru.'
        ]
    },
    {
        title: '7. CLAUZĂ GENERALĂ DE EXONERARE DE RĂSPUNDERE',
        paragraphs: [
            'UTILIZAȚI BRAINLYPHYSIO ACADEMY PE PROPRIUL RISC. NU VĂ BAZAȚI PE NICIO INFORMAȚIE GĂSITĂ ÎN BRAINLYPHYSIO ACADEMY FĂRĂ SFAT PROFESIONAL.',
            'VĂ RUGĂM SĂ FIȚI CONȘTIENȚI CĂ ORICE INFORMAȚIE PE CARE O PUTEȚI GĂSI ÎN BRAINLYPHYSIO ACADEMY POATE FI INEXACTĂ, ÎNȘELĂTOARE, PERICULOASĂ, ILEGALĂ SAU NU CORESPUNDE CU STADIUL CUNOȘTINȚELOR DIN DOMENIILE RELEVANTE.',
            'Wiki-ul BrainlyPhysio Academy este o enciclopedie online colaborativă cu conținut deschis, adică o asociație voluntară de indivizi și grupuri care lucrează pentru a dezvolta o resursă comună de cunoștințe de fizioterapie. Structura proiectului permite oricui cu o conexiune la internet să modifice Conținutul său. Prin urmare, BrainlyPhysio Academy nu poate garanta valabilitatea informațiilor furnizate pe Site și prin Serviciul BrainlyPhysio Academy. BrainlyPhysio Academy nu monitorizează, revizuiește, editează sau susține informațiile furnizate pe Site și prin Serviciul BrainlyPhysio Academy și nu își asumă nicio responsabilitate pentru aceste informații. Mai mult, nu susținem nicio opinie exprimată pe Site sau prin Serviciul BrainlyPhysio Academy și oferim doar acces la aceste informații.',
            'Anumite informații de pe BrainlyPhysio Academy pot crea un risc nerezonabil pentru acei utilizatori care aleg să aplice sau să utilizeze informațiile în propriile activități sau să promoveze informațiile pentru a fi utilizate de către terți.',
            'Autorii Conținutului pot să nu fie calificați pentru a vă oferi informații complete sau pentru a vă informa despre măsurile de siguranță adecvate sau pașii pe care îi puteți lua pentru a preveni rănirea, vătămarea corporală sau alte daune aduse persoanei, proprietății sau reputației dumneavoastră. Dacă aveți nevoie de sfaturi specifice, vă rugăm să căutați un profesionist licențiat sau cunoscător în acel domeniu.',
            'Niciunul dintre Membrii BrainlyPhysio Academy nu este responsabil pentru utilizarea de către dumneavoastră a informațiilor furnizate prin Serviciul BrainlyPhysio Academy și/sau conținute sau legate de pe Site.',
            'Conținutul furnizat de BrainlyPhysio Academy este oferit gratuit și, sub rezerva acestor Termeni și Condiții, nu se creează niciun acord sau contract între dumneavoastră și BrainlyPhysio Academy, proprietarii sau utilizatorii Site-ului, proprietarii serverelor pe care este găzduit, Membrii BrainlyPhysio Academy sau oricine altcineva care este în orice fel conectat sau asociat cu BrainlyPhysio Academy.',
            'Cu excepția cazului în care se prevede în mod expres în acești Termeni de Utilizare, nu puteți utiliza Conținutul de pe Site decât dacă obțineți permisiunea de la noi sau de la proprietarul acestuia, sau dacă sunteți altfel permis de lege.',
            'Numele, mărcile comerciale și de servicii și logo-urile BrainlyPhysio Academy aparțin BrainlyPhysio Academy și licențiatorilor săi. Nu aveți permisiunea de a le utiliza fără aprobarea noastră, cu excepția cazului în care fac parte din Conținutul pe care aveți permisiunea să îl utilizați conform acestor Termeni de Utilizare.',
            'Oricare dintre mărcile comerciale, mărcile de servicii, mărcile colective, drepturile de design sau drepturile similare ale terților care sunt menționate, utilizate sau citate pe Site și/sau în Conținut sunt proprietatea proprietarilor respectivi. Utilizarea lor pe Site sau în Conținut nu implică faptul că le puteți utiliza în orice alt scop. Cu excepția cazului în care se specifică altfel, Site-ul și BrainlyPhysio Academy nu sunt nici susținute, nici afiliate cu niciunul dintre deținătorii unor astfel de drepturi și, ca atare, BrainlyPhysio Academy nu poate acorda niciun drept de a utiliza materiale protejate în alt mod. Utilizarea de către dumneavoastră a oricărei astfel de proprietăți necorporale sau similare este pe propriul risc.',
            'Pe lângă toate celelalte drepturi acordate în acești Termeni și Condiții, acordați BrainlyPhysio Academy și tuturor celorlalte persoane sau entități implicate în operarea Site-ului dreptul de a transmite, monitoriza, prelua, stoca și utiliza informațiile dumneavoastră în legătură cu operarea Site-ului, de exemplu, pentru a analiza traficul site-ului. BrainlyPhysio Academy nu își poate asuma și nu își asumă nicio responsabilitate sau răspundere pentru nicio informație pe care o trimiteți sau pentru utilizarea sau utilizarea abuzivă de către dumneavoastră sau de către terți a informațiilor transmise sau primite folosind instrumentele și serviciile BrainlyPhysio Academy.',
            'Publicarea informațiilor găsite în BrainlyPhysio Academy poate încălca legile țării sau jurisdicției de unde vizualizați aceste informații. Baza de date a BrainlyPhysio Academy este stocată pe un server din Regatul Unit și este menținută în referire la protecțiile oferite de legislația engleză. Legile din țara sau jurisdicția dumneavoastră pot să nu protejeze sau să nu permită aceleași tipuri de discurs sau distribuție. BrainlyPhysio Academy nu încurajează încălcarea niciunei legi; și nu poate fi responsabilă pentru nicio încălcare a acestor legi, în cazul în care vă conectați la acest domeniu sau utilizați, reproduceți sau republicați informațiile conținute aici.'
        ]
    },
    {
        title: '8. EDITORI: CONTRIBUȚIA LA WIKI-UL BRAINLYPHYSIO ACADEMY',
        paragraphs: [
            'Cei care contribuie sunt oameni specializati in domeniu.',
            'un fizioterapeut sau kinetoterapeut, sau alt profesionist din domeniul sănătății care este înregistrat la organismul de reglementare relevant din țara aplicabilă;',
            'un student care urmează în prezent o formare în urma căreia veți deveni fizioterapeut sau kinetoterapeut, sau alt profesionist din domeniul sănătății înregistrat la organismul de reglementare relevant din țara aplicabilă',
            'Pentru a deveni Cursant, trebuie să urmați instrucțiunile de înregistrare de pe Site și să creați un profil cu un nume de utilizator și o parolă unice („Profilul dumneavoastră ni Cursant”), astfel încât utilizatorii să vă poată identifica.'
        ]
    },
    {
        title: '9. CONȚINUTUL BRAINLYPHYSIO ACADEMY; INTERZICEREA EXTRAGERII ȘI EXPLOATĂRII DATELOR',
        paragraphs: [
            'Conținutul, Site-ul și orice software asociat, precum și toate Drepturile de Proprietate Intelectuală (așa cum sunt definite mai jos) aferente acestora, sunt proprietatea exclusivă a BrainlyPhysio Academy și a licențiatorilor săi. Cu excepția cazului în care se prevede în mod explicit aici, nimic din acești Termeni și Condiții nu va fi considerat a crea o licență în sau sub astfel de Drepturi de Proprietate Intelectuală. Fără a aduce atingere celor de mai sus, nu veți face și în niciun moment, direct sau indirect, niciuna dintre următoarele, toate fiind strict interzise:',
            'vânzarea, licențierea, închirierea, modificarea, distribuirea, copierea, reproducerea, transmiterea, afișarea publică, executarea publică, publicarea, adaptarea, editarea sau crearea de lucrări derivate din orice Conținut, cu excepția cazului în care se prevede în mod expres în acești Termeni de Utilizare;',
            'efectuarea, facilitarea, autorizarea sau permiterea oricărei extrageri de text sau date sau web scraping în legătură cu Conținutul sau Site-ul. Aceasta include, fără limitare, utilizarea sau permiterea, autorizarea sau încercarea de utilizare a: oricărui "robot", "bot", "spider", "scraper" sau alt dispozitiv automat, program, instrument, algoritm, cod, proces sau metodologie pentru a accesa, obține, copia, monitoriza sau republica orice porțiune a Conținutului sau a Site-ului sau orice date, conținut, informații sau servicii accesate prin intermediul acestora;',
            'orice tehnică analitică automată menită să analizeze textul și datele în formă digitală pentru a genera informații care includ, dar nu se limitează la modele, tendințe și corelații;',
            'utilizarea oricărui Conținut, inclusiv, fără limitare, text, fotografii, imagini, clipuri audio/video, „aspect și stil”, metadate și/sau compilații în dezvoltarea oricărui program software, inclusiv, dar fără a se limita la, antrenarea unui sistem de învățare automată (machine learning) sau inteligență artificială (AI); sau pentru furnizarea de seturi de date arhivate sau stocate în cache care conțin Conținut către o altă persoană sau entitate.',
            'În sensul acestor Termeni și Condiții, „Drepturi de Proprietate Intelectuală” înseamnă toate brevetele, drepturile de autor și drepturile conexe și învecinate, drepturile morale, drepturile de publicitate, mărcile comerciale, mărcile de servicii, drepturile asupra aspectului comercial, fondul comercial, drepturile asupra desenelor și modelelor industriale, drepturile asupra software-ului de calculator, drepturile asupra bazelor de date, drepturile de a utiliza și de a proteja confidențialitatea informațiilor confidențiale (inclusiv know-how și secrete comerciale) și alte drepturi de proprietate intelectuală și de proprietate care pot exista acum sau pot apărea ulterior, și toate cererile de înregistrare, înregistrările, reînnoirile și extinderile acestora, în conformitate cu legile oricărui stat, țară, teritoriu sau altă jurisdicție, referitoare la Conținut sau la Site.'
        ]
    },
    {
        title: '10. ACTE INTERZISE',
        paragraphs: [
            'În considerarea permisiunii de a utiliza Site-ul și Serviciul BrainlyPhysio Academy, sunteți de acord că NU veti:',
            'utiliza Site-ul sau Serviciul BrainlyPhysio Academy în niciun scop care încalcă legile și reglementările;',
            'posta materiale care încalcă Drepturile de Proprietate Intelectuală ale altora sau drepturile la viață privată sau publicitate ale altora;',
            'posta materiale care sunt ilegale, obscene, defăimătoare, amenințătoare, hărțuitoare, abuzive, calomnioase, pline de ură sau jenante pentru orice altă persoană sau entitate, așa cum este determinat de BrainlyPhysio Academy la discreția sa;',
            'posta reclame sau solicitări de afaceri;',
            'după primirea unui avertisment, să continuați să perturbați fluxul normal al dialogului sau să postați comentarii care nu sunt legate de subiectul discutat (cu excepția cazului în care este clar că discuția este liberă);',
            'posta scrisori în lanț sau scheme piramidale;',
            'vă asuma identitatea unei alte persoane;',
            'distribui viruși sau alt cod de computer dăunător;',
            'recolta sau colecta în alt mod informații despre alții, inclusiv adrese de e-mail, fără consimțământul lor;',
            'permite oricărei alte persoane sau entități să utilizeze identificarea dumneavoastră pentru a posta sau vizualiza comentarii;',
            'desfășura, facilita, autoriza sau permite oricare dintre activitățile interzise de Secțiunea 9;',
            'posta aceeași notă de mai multe ori sau să întreprindeți "spamming"; ',
            'vă angaja în orice altă conduită care restricționează sau inhibă orice altă persoană de la utilizarea sau bucurarea de oricare dintre Serviciile BrainlyPhysio Academy și/sau Site, sau care, în opinia BrainlyPhysio Academy, expune BrainlyPhysio Academy sau oricare dintre clienții sau furnizorii săi la orice răspundere sau prejudiciu de orice tip.'
        ]
    },
    {
        title: '11. SITE-URI WEB TERȚE',
        paragraphs: [
            'Acolo unde Site-ul conține legături sau alte referințe la site-uri web și resurse terțe furnizate de terți, aceste legături și referințe sunt furnizate doar pentru informarea dumneavoastră. BrainlyPhysio Academy nu are control asupra conținutului acelor site-uri web sau resurse și nu își asumă nicio responsabilitate pentru conținutul unor astfel de site-uri web și resurse și nici nu face nicio declarație cu privire la conținutul sau acuratețea acestora.',
            'BrainlyPhysio Academy poate selecta, de asemenea, anumite site-uri ca răspunsuri prioritare la termenii de căutare pe care îi introduceți, iar BrainlyPhysio Academy poate conveni să permită agenților de publicitate să răspundă la anumite termene de căutare cu reclame sau conținut sponsorizat.',
            'BrainlyPhysio Academy nu susține niciun produs, serviciu sau tratament publicitar pe Site și nu susține conținutul de pe niciun site web terț. BrainlyPhysio Academy nu își asumă nicio responsabilitate pentru conținutul sau politicile de confidențialitate ale unor astfel de site-uri web și nu face nicio declarație cu privire la conținutul sau acuratețea acestora.',
            'Utilizarea de către dumneavoastră a site-urilor web terțe este pe propriul risc și este supusă termenilor și condițiilor de utilizare pentru astfel de site-uri. Prin utilizarea Site-ului, eliberați în mod expres BrainlyPhysio Academy de orice răspundere care decurge din utilizarea de către dumneavoastră a oricărui site web terț.'
        ]
    },
    {
        title: '12. ÎNCĂLCĂRI ALE ACESTOR TERMENI ȘI CONDIȚII',
        paragraphs : [
            'Orice utilizare a Serviciului BrainlyPhysio Academy care încalcă acești Termeni și Condiții poate duce, printre altele, la încetarea drepturilor dumneavoastră de a utiliza Site-ul și a licențelor acordate în acești Termeni și Condiții. Pentru a coopera cu solicitările legale legitime, citațiile sau ordinele judecătorești, BrainlyPhysio Academy poate accesa și dezvălui orice informații și conținut pe care BrainlyPhysio Academy le consideră necesare, inclusiv orice și toate informațiile, cum ar fi nume complete, adrese de e-mail, conținut, adresa IP, istoricul utilizării etc.',
            'BrainlyPhysio Academy are dreptul (dar nu și obligația) de a revizui orice Conținut și de a șterge sau schimba Conținutul care încalcă acest Acord sau care este Conținut Interzis, sau care poate încălca în alt mod drepturile, poate dăuna sau amenința siguranța oricărei alte persoane, sau poate crea răspundere pentru BrainlyPhysio Academy, așa cum este determinat de BrainlyPhysio Academy la discreția sa. BrainlyPhysio Academy își rezervă dreptul (dar nu are nicio obligație) de a investiga și de a lua măsuri corespunzătoare dacă încălcați acești Termeni și Condiții, inclusiv, fără limitare, eliminarea sau modificarea Conținutului, închiderea contului dumneavoastră, raportarea dumneavoastră autorităților de aplicare a legii sau luarea de măsuri legale împotriva dumneavoastră.'
        ]
    },
    {
        title: '13. ÎNCĂLCĂRI ALE DREPTURILOR DE AUTOR',
        paragraphs: [
            'BrainlyPhysio Academy va răspunde la notificările de presupusă încălcare a drepturilor de autor care respectă legislația aplicabilă. Dacă aveți dovezi, știți sau aveți o credință de bună-credință că drepturile dumneavoastră sau drepturile unui terț au fost încălcate de orice Conținut al BrainlyPhysio Academy și doriți ca BrainlyPhysio Academy să elimine un astfel de Conținut de pe Site, trebuie să furnizați BrainlyPhysio Academy următoarele informații:',
            'O semnătură fizică sau electronică a unei persoane autorizate să acționeze în numele proprietarului dreptului exclusiv care se presupune că a fost încălcat;',
            'Identificarea lucrării protejate de drepturi de autor care se pretinde că a fost încălcată sau, dacă mai multe lucrări protejate de drepturi de autor sunt acoperite de o singură notificare, o listă reprezentativă a acestor lucrări. Ar trebui să descrieți lucrarea și, acolo unde este posibil, să includeți o copie sau locația (de exemplu, URL) a unei versiuni autorizate a lucrării;',
            'Identificarea materialului care se pretinde că încalcă drepturile sau că face obiectul unei activități de încălcare și care trebuie eliminat sau la care trebuie dezactivat accesul;',
            'Informații rezonabil suficiente pentru a permite BrainlyPhysio Academy să vă contacteze, cum ar fi o adresă, un număr de telefon și, dacă este disponibil, o adresă de e-mail la care puteți fi contactat;',
            'O declarație că aveți o credință de bună-credință că utilizarea materialului în maniera reclamată nu este autorizată de proprietarul drepturilor de autor, de agentul său sau de lege; și',
            'O declarație că informațiile din notificare sunt exacte și că sunteți autorizat să acționați în numele proprietarului unui drept exclusiv care se presupune că a fost încălcat.',
            'Furnizarea se face la : pascu.aeduard@yahoo.com '
        ]
    },
    {
        title: '14. INCETARE',
        paragraphs : [
            'Recunoașteți și sunteți de acord că BrainlyPhysio Academy poate, fără notificare și din orice motiv, inclusiv, dar fără a se limita la, orice încălcare a acestor Termeni și Condiții, să închidă contul dumneavoastră BrainlyPhysio Academy, orice adresă de e-mail asociată și accesul dumneavoastră la Site și la Serviciul BrainlyPhysio Academy.'
        ]
    },
    {
        title: '15. DISPOZTII DIVERSE',
        paragraphs: [
            'SUNTETI DE ACORD CA:',
            'acești Termeni și Condiții, Politica de Confidențialitate și Cookie-uri a BrainlyPhysio Academy și toate chestiunile legate de accesul și utilizarea de către dumneavoastră a BrainlyPhysio Academy vor fi guvernate și interpretate în conformitate cu legislația engleză, fără a da efect dispozițiilor sale privind conflictul de legi;',
            'acești Termeni și Condiții, Politica de Confidențialitate și Cookie-uri și (dacă este cazul) termenii și condițiile BrainlyPhysio Academy Plus, constituie întregul acord între dumneavoastră și BrainlyPhysio Academy cu privire la obiectul prezentului și înlocuiesc și anulează toate înțelegerile sau acordurile anterioare sau contemporane, scrise sau orale, referitoare la acest subiect;',
            'dacă orice prevedere a acestor Termeni și Condiții este considerată invalidă de către o instanță competentă, invaliditatea unei astfel de prevederi nu va afecta valabilitatea celorlalte prevederi ale acestor Termeni și Condiții, care vor rămâne în vigoare și cu efect deplin și',
            'nicio renunțare la oricare dintre prevederile acestor Termeni și Condiții nu va fi considerată o renunțare ulterioară sau continuă la o astfel de prevedere sau la orice altă prevedere, iar eșecul BrainlyPhysio Academy de a revendica orice drept sau prevedere în conformitate cu acești Termeni și Condiții nu va constitui o renunțare la un astfel de drept sau prevedere.'
        ]
    }
])

</script>

<style scoped>
.overlay {
background-color: rgba(0, 0, 0, 0.4);
}
</style>