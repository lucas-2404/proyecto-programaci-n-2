/**
 * menuData.js — Fuente de datos del menu de "Los Amigos".
 *
 * Estructura desacoplada de la UI para facilitar:
 *   - Mantenimiento (agregar categorias/productos sin tocar componentes)
 *   - Migracion futura a API/backend (solo reemplazar este modulo)
 *   - Testing unitario de datos independiente de la presentacion
 *
 * categoryImage: imagen hero de la categoria (publica en /menu/{id}.jpg)
 */

import imgMojito from "../img/bebida-ron.avif";
import imgNegroni from "../img/negroni.webp";
import imgAperol from "../img/Aperol.webp";
import imgMargarita from "../img/Spicy-Honey.jpg";
import imgOldFashioned from "../img/Old Fashioned.avif";
import imgDaiquiri from "../img/Daiquiri de Mango.webp";

import imgIpa from "../img/Cerveja-India-Pale-Ale-Louvada-500-Ml.png";
import imgStout from "../img/stout-oscura.webp";
import imgGolden from "../img/golden.webp";
import imgHeineken from "../img/heineken.webp";
import imgCorona from "../img/corona.jpg";

import imgPicadaClasica from "../img/picada comun.jpg";
import imgPicadaPremium from "../img/picada premiun.webp";
import imgAlitas from "../img/alitas de pollo.avif";
import imgPapas from "../img/papas rusticas.webp";
import imgBruschetta from "../img/Bruschetta.webp";

import imgTequila from "../img/tequila blanco.webp";
import imgJagermeister from "../img/Jagermeister.jpg";
import imgFernet from "../img/fernet.jpg";
import imgVodka from "../img/Vodka Premium.webp";

import imgLimonada from "../img/limonada con menta.webp";
import imgMocktail from "../img/Mocktail de Frutilla.jpg";
import imgSanPellegrino from "../img/San Pellegrino.webp";
import imgJugoNaranja from "../img/jugo de naranja.jpg";
export const menuCategories = [
  {
    id: "cocteles",
    name: "Cockteles",
    description: "Creaciones artesanales con los mejores destilados",
    icon: "🍸",
    categoryImage: "/menu/cocteles.jpg",
    products: [
      {
        id: "coctel-mojito-amigos",
        name: "Mojito Los Amigos",
        description: "Ron blanco, menta fresca, limon, azucar y soda artesanal",
        price: 4500,
        tags: ["Popular"],
        emoji: "🍹",
        image: imgMojito,
      },
      {
        id: "coctel-negroni-rosario",
        name: "Negroni Rosario",
        description: "Gin premium, Campari, vermu rojo y twist de naranja",
        price: 5200,
        tags: ["Signature"],
        emoji: "🍊",
        image: imgNegroni,
      },
      {
        id: "coctel-aperol-spritz",
        name: "Aperol Spritz",
        description: "Aperol, Prosecco italiano y un toque de soda",
        price: 4800,
        tags: [],
        emoji: "🥂",
        image: imgAperol,
      },
      {
        id: "coctel-margarita-picante",
        name: "Margarita Picante",
        description: "Tequila reposado, triple sec, limon y jalapeno fresco",
        price: 5500,
        tags: ["Nuevo"],
        emoji: "🌶️",
        image: imgMargarita,
      },
      {
        id: "coctel-old-fashioned",
        name: "Old Fashioned",
        description: "Bourbon premium, azucar morena, bitters angostura y naranja",
        price: 5800,
        tags: ["Signature"],
        emoji: "🥃",
        image: imgOldFashioned,
      },
      {
        id: "coctel-daiquiri-mango",
        name: "Daiquiri de Mango",
        description: "Ron blanco, mango fresco, limon y azucar de cana",
        price: 4600,
        tags: [],
        emoji: "🥭",
        image: imgDaiquiri,
      },
    ],
  },
  {
    id: "cervezas",
    name: "Cervezas",
    description: "Artesanales y de importacion seleccionadas",
    icon: "🍺",
    categoryImage: "/menu/cervezas.jpg",
    products: [
      {
        id: "cerveza-ipa-local",
        name: "IPA Artesanal",
        description: "India Pale Ale local, lupulada y aromatica. 500ml",
        price: 3200,
        tags: ["Popular"],
        emoji: "🍺",
        image: imgIpa,
      },
      {
        id: "cerveza-stout-oscura",
        name: "Stout Oscura",
        description: "Notas de cafe y chocolate amargo. Cuerpo denso y cremoso. 500ml",
        price: 3500,
        tags: [],
        emoji: "🖤",
        image: imgStout,
      },
      {
        id: "cerveza-golden-ale",
        name: "Golden Ale",
        description: "Clara, suave y refrescante. Ideal para comenzar la noche. 500ml",
        price: 2900,
        tags: [],
        emoji: "✨",
        image: imgGolden,
      },
      {
        id: "cerveza-heineken",
        name: "Heineken",
        description: "Lager holandesa premium. Fria y clasica. 330ml",
        price: 2600,
        tags: [],
        emoji: "🟢",
        image: imgHeineken,
      },
      {
        id: "cerveza-corona",
        name: "Corona",
        description: "Lager mexicana con rodaja de limon. Refrescante. 355ml",
        price: 2800,
        tags: [],
        emoji: "🌅",
        image: imgCorona,
      },
    ],
  },
  {
    id: "picadas",
    name: "Picadas",
    description: "Para compartir y maridar perfectamente",
    icon: "🧀",
    categoryImage: "/menu/picadas.jpg",
    products: [
      {
        id: "picada-clasica",
        name: "Picada Clasica",
        description: "Quesos blandos y duros, jamon crudo, salame y aceitunas",
        price: 8500,
        tags: ["Popular"],
        emoji: "🧀",
        image: imgPicadaClasica,
      },
      {
        id: "picada-premium",
        name: "Picada Premium",
        description: "Quesos gourmet, prosciutto, chorizo iberico, pepinillos y mostaza artesanal",
        price: 13500,
        tags: ["Signature"],
        emoji: "⭐",
        image: imgPicadaPremium,
      },
      {
        id: "alitas-buffalo",
        name: "Alitas Buffalo",
        description: "12 alitas con salsa buffalo casera y aderezo de queso azul",
        price: 7200,
        tags: ["Popular"],
        emoji: "🍗",
        image: imgAlitas,
      },
      {
        id: "papas-rusticas",
        name: "Papas Rusticas",
        description: "Con piel, condimentadas con romero y sal gruesa. Salsas a eleccion",
        price: 4800,
        tags: [],
        emoji: "🍟",
        image: imgPapas,
      },
      {
        id: "bruschetta-tomate",
        name: "Bruschetta",
        description: "Pan artesanal tostado, tomate perita, albahaca y aceite de oliva",
        price: 4200,
        tags: ["Vegano"],
        emoji: "🍅",
        image: imgBruschetta,
      },
    ],
  },
  {
    id: "shots",
    name: "Shots",
    description: "Para los que quieren empezar bien la noche",
    icon: "🥃",
    categoryImage: "/menu/shots.jpg",
    products: [
      {
        id: "shot-tequila",
        name: "Tequila Blanco",
        description: "Shot de tequila 100% agave con sal y limon",
        price: 1800,
        tags: [],
        emoji: "🥃",
        image: imgTequila,
      },
      {
        id: "shot-jagermeister",
        name: "Jagermeister",
        description: "El clasico digestivo aleman. Frio directo",
        price: 2200,
        tags: ["Popular"],
        emoji: "🦌",
        image: imgJagermeister,
      },
      {
        id: "shot-fernet-cola",
        name: "Fernet con Cola",
        description: "Fernet Branca con Coca-Cola. El favorito argentino",
        price: 2000,
        tags: ["Popular"],
        emoji: "🇦🇷",
        image: imgFernet,
      },
      {
        id: "shot-vodka-premium",
        name: "Vodka Premium",
        description: "Vodka destilado cinco veces. Limpio y suave",
        price: 2400,
        tags: [],
        emoji: "❄️",
        image: imgVodka,
      },
    ],
  },
  {
    id: "sin-alcohol",
    name: "Sin Alcohol",
    description: "Opciones refrescantes para todos",
    icon: "🧃",
    categoryImage: "/menu/sin-alcohol.jpg",
    products: [
      {
        id: "limonada-menta",
        name: "Limonada de Menta",
        description: "Limones frescos, menta, azucar y soda. Servida con hielo",
        price: 2800,
        tags: [],
        emoji: "🍋",
        image: imgLimonada,
      },
      {
        id: "mocktail-frutilla",
        name: "Mocktail de Frutilla",
        description: "Frutillas frescas, albahaca, limon y agua con gas",
        price: 3200,
        tags: ["Nuevo"],
        emoji: "🍓",
        image: imgMocktail,
      },
      {
        id: "agua-san-pellegrino",
        name: "San Pellegrino",
        description: "Agua mineral con gas italiana. 500ml",
        price: 1800,
        tags: [],
        emoji: "💧",
        image: imgSanPellegrino,
      },
      {
        id: "jugo-naranja",
        name: "Jugo de Naranja",
        description: "Exprimido en el momento. Natural y sin azucar agregada",
        price: 2200,
        tags: [],
        emoji: "🍊",
        image: imgJugoNaranja,
      },
    ],
  },
];

export const menuCategoriesMap = Object.fromEntries(
  menuCategories.map((category) => [category.id, category])
);
