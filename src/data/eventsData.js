/**
 * eventsData.js — Datos de eventos de Los Amigos Bar.
 *
 * Estructura desacoplada de la UI para facilitar:
 *   - Mantenimiento (agregar eventos sin tocar componentes)
 *   - Migración futura a API/backend (solo reemplazar este módulo)
 *   - Testing unitario de datos independiente de la presentación
 *
 * imageUnsplashId: ID de Unsplash (la parte después de "photo-").
 * Se usa junto con unsplashUrl() / unsplashSrcSet() del utils/unsplash.js.
 */

import imgPayaso from "../img/Payaso.jpg";
import imgBlues from "../img/Blues.jpg";
import imgHouse from "../img/House.jpg";
import img80s from "../img/80s.webp";
import imgJazz from "../img/Jazz.jfif";
import imgAniversario from "../img/5 Años.jpg";
import imgReggaeton from "../img/Reggaeton.jpg";
import imgTango from "../img/Tango.jpg";

export const EVENT_CATEGORIES = [
  "Todos",
  "Música en Vivo",
  "DJ Set",
  "Noche Temática",
  "Especial",
];

export const events = [
  {
    id: "noche-blues-bourbon",
    title: "Noche de Blues & Bourbon",
    category: "Música en Vivo",
    date: new Date("2026-10-04"),
    time: "22:00",
    doorTime: "21:00",
    price: 3500,
    capacity: 80,
    spotsLeft: 18,
    description:
      "El blues más crudo acompañado de los mejores bourbones de la casa. Una noche para el alma.",
    longDescription:
      "Los Amigos abre sus puertas para una velada íntima donde el blues argentino se encuentra con los mejores bourbones americanos. La banda Río Oscuro sube al escenario para tocar tres sets de clásicos y composiciones propias. La barra ofrecerá una carta especial de maridaje bourbon + sour que no vas a querer perderte. Cupos limitados.",
    tags: ["Blues", "En Vivo", "Bourbon"],
    featured: true,
    imageUnsplashId: null,
    imageLocal: imgBlues,
    artist: {
      name: "Río Oscuro",
      genre: "Blues Argentino",
      bio: "Trío tucumano con más de 10 años recorriendo el circuito de blues del NOA. Su sonido mezcla tradición americana con influencias del folclore norteño.",
      instagramHandle: "@riooscuroband",
    },
  },
  {
    id: "dj-set-house-friday",
    title: "DJ Set: House Music Friday",
    category: "DJ Set",
    date: new Date("2026-10-10"),
    time: "23:00",
    doorTime: "22:00",
    price: 2500,
    capacity: 120,
    spotsLeft: 42,
    description:
      "Viernes de house music profundo con los mejores DJs de la escena local. La pista te espera.",
    longDescription:
      "Arranca el fin de semana con el mejor deep house y tech house de la escena tucumana. MNML Crew presenta una noche de tres horas con dos DJs que se turnarán para llevar la pista desde los sonidos más etéreos hasta los más dancefloor. Cocktails especiales de bienvenida para los primeros 30 en entrar.",
    tags: ["House", "DJ", "Electrónica"],
    featured: true,
    imageUnsplashId: null,
    imageLocal: imgHouse,
    artist: {
      name: "MNML Crew",
      genre: "Deep House / Tech House",
      bio: "Colectivo de DJs tucumanos especializados en deep y tech house. Residentes del circuito underground del NOA desde 2021.",
      instagramHandle: "@mnmlcrew_tuc",
    },
  },
  {
    id: "noche-80s-retro",
    title: "Noche 80s Retro",
    category: "Noche Temática",
    date: new Date("2026-10-17"),
    time: "22:30",
    doorTime: "21:30",
    price: 2000,
    capacity: 100,
    spotsLeft: 55,
    description:
      "Revivimos la mejor década con un viaje en el tiempo: hits de los 80s, tragos vintage y looks de época.",
    longDescription:
      "Llegá con tu look más retro y prepárate para una noche donde los 80s cobran vida. DJ Flashback pondrá los clásicos de la década —desde new wave hasta synth pop— mientras la barra sirve cócteles inspirados en la época. Premio al mejor disfraz de la noche con consumición libre por 2 horas.",
    tags: ["Retro", "80s", "Temática"],
    featured: true,
    imageUnsplashId: null,
    imageLocal: img80s,
    artist: {
      name: "DJ Flashback",
      genre: "80s / New Wave / Synth Pop",
      bio: "Especialista en música de los 80s con una colección de más de 5000 tracks de la época. Sus sets son un viaje de ida a la mejor década.",
      instagramHandle: "@djflashback80s",
    },
  },
  {
    id: "jazz-cocteleria",
    title: "Jazz & Coctelería",
    category: "Música en Vivo",
    date: new Date("2026-10-25"),
    time: "21:30",
    doorTime: "20:30",
    price: 4000,
    capacity: 60,
    spotsLeft: 12,
    description:
      "Una velada de jazz estándar con el Cuarteto Azul y una carta de coctelería diseñada para maridarlo.",
    longDescription:
      "Para los amantes del jazz y los cócteles de autor, Los Amigos presenta una noche exclusiva con el Cuarteto Azul. Cuatro músicos de primer nivel interpretarán estándares de Miles Davis, Coltrane y Bill Evans mientras el bartender Marcos Castro presenta su carta especial de jazz cocktails, cada uno inspirado en un músico icónico. Reserva anticipada recomendada: los cupos son muy limitados.",
    tags: ["Jazz", "En Vivo", "Coctelería"],
    featured: false,
    imageUnsplashId: null,
    imageLocal: imgJazz,
    artist: {
      name: "Cuarteto Azul",
      genre: "Jazz Estándar",
      bio: "Cuarteto de jazz tucumano formado en 2019. Piano, contrabajo, batería y saxo. Ganadores del Premio NOA Jazz 2024.",
      instagramHandle: "@cuartetoazul_tuc",
    },
  },
  {
    id: "cumpleanos-bar-5-anos",
    title: "5 Años de Los Amigos",
    category: "Especial",
    date: new Date("2026-11-01"),
    time: "21:00",
    doorTime: "20:00",
    price: 0,
    capacity: 150,
    spotsLeft: null,
    description:
      "Celebramos 5 años junto a ustedes con entrada libre, tragos especiales y bandas en vivo toda la noche.",
    longDescription:
      "Cinco años de noches compartidas merecen una celebración a la altura. El 1° de noviembre, Los Amigos abre sus puertas con entrada completamente libre para festejar este aniversario con toda la comunidad. Habrá tres bandas en vivo, una barra de tragos especiales a precio de aniversario y sorpresas que anunciaremos esa noche. Traé a todos tus amigos — literalmente.",
    tags: ["Aniversario", "Entrada Libre", "Especial"],
    featured: false,
    imageUnsplashId: null,
    imageLocal: imgAniversario,
    artist: {
      name: "Varios Artistas",
      genre: "Variado",
      bio: "Una noche especial con artistas residentes y amigos del bar que han pasado por nuestro escenario estos cinco años.",
      instagramHandle: null,
    },
  },
  {
    id: "reggaeton-viernes",
    title: "Reggaeton Viernes",
    category: "DJ Set",
    date: new Date("2026-10-31"),
    time: "23:30",
    doorTime: "22:30",
    price: 1500,
    capacity: 120,
    spotsLeft: 70,
    description:
      "El mejor reggaeton y trap latino con DJ Moreno. La noche que todos esperan cada viernes.",
    longDescription:
      "El cierre de semana que no puede faltar. DJ Moreno lleva cuatro años siendo el residente de los viernes de Los Amigos y esta noche promete ser especial. Reggaeton clásico, nueva generación, trap latino y dembow para que la pista no pare. Promoción de 2x1 en cervezas hasta la medianoche.",
    tags: ["Reggaeton", "DJ", "Trap Latino"],
    featured: false,
    imageUnsplashId: null,
    imageLocal: imgReggaeton,
    artist: {
      name: "DJ Moreno",
      genre: "Reggaeton / Trap Latino",
      bio: "Residente de Los Amigos desde 2022. Sus viernes son el evento semanal más esperado de la escena nocturna tucumana.",
      instagramHandle: "@djmoreno_tuc",
    },
  },
  {
    id: "noche-de-tangos",
    title: "Noche de Tangos",
    category: "Música en Vivo",
    date: new Date("2026-11-08"),
    time: "21:00",
    doorTime: "20:00",
    price: 3000,
    capacity: 70,
    spotsLeft: 30,
    description:
      "Un homenaje al tango argentino con la orquesta La Milonga y pareja de bailarines en vivo.",
    longDescription:
      "Cuando el bandoneón llora y el fuelle suspira, solo queda bailar. Los Amigos presenta una noche dedicada al tango con La Milonga Orquesta —seis músicos en escena— y la pareja de bailarines Sofía & Mateo que abrirá la noche con una demostración y luego invitará al público a la pista. Milonga libre de 23:00 en adelante.",
    tags: ["Tango", "En Vivo", "Milonga"],
    featured: false,
    imageUnsplashId: null,
    imageLocal: imgTango,
    artist: {
      name: "La Milonga Orquesta",
      genre: "Tango Argentino",
      bio: "Orquesta típica de seis integrantes especializada en el repertorio de la Guardia Vieja y el tango de la época de oro.",
      instagramHandle: "@lamilonga_orquesta",
    },
  },
  {
    id: "open-bar-halloween",
    title: "Open Bar Halloween",
    category: "Noche Temática",
    date: new Date("2026-10-30"),
    time: "22:00",
    doorTime: "21:00",
    price: 5000,
    capacity: 100,
    spotsLeft: 35,
    description:
      "La noche de terror más esperada del año: disfraz obligatorio, open bar de cócteles oscuros y DJ toda la noche.",
    longDescription:
      "El 30 de octubre, Los Amigos se transforma. Disfraz obligatorio o no entrás: esta es la regla de la noche más oscura del año. El ticket incluye open bar de cócteles temáticos (Sangre de Murciélago, Poción Verde, El Último Shot) de 22:00 a 02:00. DJ Death Drop pondrá la música más oscura del año. Premio al disfraz más aterrador con botella de whisky premium.",
    tags: ["Halloween", "Open Bar", "Temática"],
    featured: false,
    imageUnsplashId: null,
    imageLocal: imgPayaso,
    artist: {
      name: "DJ Death Drop",
      genre: "Industrial / Dark Electronic",
      bio: "Especialista en música oscura y electrónica industrial. El único artista que hace bailar y asustar al mismo tiempo.",
      instagramHandle: "@dj_deathdrop",
    },
  },
];

/** Mapa rápido por id para O(1) lookup */
export const eventsMap = Object.fromEntries(events.map((e) => [e.id, e]));

/** Próximos eventos ordenados por fecha ascendente */
export const upcomingEvents = [...events].sort((a, b) => a.date - b.date);

/** Solo eventos destacados */
export const featuredEvents = events.filter((e) => e.featured);
