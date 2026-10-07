# Los Amigos Bar & Coctelería

Sitio web de un bar de Tucumán hecho con **React 19**, **Vite**, **React Router** y **Tailwind CSS**.
Tiene tres páginas: Inicio, Carta y Contacto.

## Instalación y ejecución

Necesitás tener instalado [Node.js](https://nodejs.org) (versión 20 o superior).

```bash
npm install        # instala las dependencias (solo la primera vez)
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # genera la versión de producción en /dist
npm run preview    # prueba la versión de producción
npm run lint       # revisa el código con ESLint
```

## Estructura de carpetas

```
src/
├── main.jsx            Punto de entrada: monta <App /> en el HTML
├── App.jsx             Solo habilita el router y muestra <Rutas />
├── router/
│   └── Rutas.jsx       Todas las rutas del sitio en un único lugar
├── pages/              Una por ruta. Importan los datos y los reparten por props
│   ├── HomePage.jsx
│   ├── MenuPage.jsx
│   ├── ContactPage.jsx
│   └── NotFoundPage.jsx
├── data/               Datos (textos, listas, precios). Sin JSX
│   ├── homeData.js  aboutData.js  contactData.js  menuData.js  siteData.js
├── components/
│   ├── layout/         Navbar, Footer y Layout (estructura común)
│   ├── sections/       Secciones grandes: Hero, About y Contact
│   ├── menu/           Componentes de la carta
│   ├── seo/Seo.jsx     Título y meta etiquetas de cada página
│   └── ui/             Piezas reutilizables y de animación
├── hooks/              Hooks propios
└── utils/              Funciones auxiliares
```

### ¿Por qué `router/Rutas.jsx`?

Antes las rutas estaban escritas dentro de `App.jsx`, mezcladas con el componente de la página 404.
Separarlas tiene dos ventajas:

1. **`App.jsx` queda con una sola responsabilidad**: arrancar el router.
2. **Agregar una página es una línea**: se suma un objeto a la lista `RUTAS` y no hace falta
   tocar nada más.

## Estrategias SEO implementadas

SEO (*Search Engine Optimization*) es el conjunto de prácticas para que Google entienda de qué trata
cada página y la muestre bien en los resultados.

| Estrategia | Dónde está | Por qué importa |
|---|---|---|
| **`<title>` distinto por página** | `components/seo/Seo.jsx` | Es el texto azul del resultado de Google y de la pestaña. Si todas las páginas tienen el mismo, no se distinguen. |
| **`meta description` por página** | `Seo.jsx` | Es el resumen que aparece bajo el título. Una buena descripción hace que más gente haga clic. |
| **Open Graph** (`og:title`, `og:description`...) | `Seo.jsx` | Controla cómo se ve el link al compartirlo en WhatsApp o redes sociales. |
| **`noindex` en la página 404** | `NotFoundPage.jsx` | Evita que Google guarde páginas que no existen. |
| **Un único `<h1>` por página** | Cada página | Le dice a Google cuál es el tema principal. |
| **Etiquetas HTML5 semánticas** | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` | Describen el rol de cada bloque, a diferencia de un `div`. También ayudan a lectores de pantalla. |
| **`lang="es"`** en el HTML | `index.html` | Indica el idioma del contenido. |

**Sin React Helmet.** React 19 permite escribir `<title>` y `<meta>` dentro de cualquier componente
y los mueve solos al `<head>`. Por eso `Seo` es un componente común y no hace falta instalar nada.

```jsx
<Seo title="Carta" description="Cócteles, cervezas y picadas..." />
```

## Cómo se pasan las props (prop drilling)

Los datos viven en `src/data/`. **Solo la página** los importa y los baja, nivel por nivel,
hasta el componente que los usa. Ningún componente de más abajo importa datos por su cuenta,
así que siempre se puede seguir el camino con el dedo:

```
ContactPage  ──hero, infoItems, socialLinks, formSubjects, mapUrl──▶  ContactSection
ContactSection ──hero──▶ ContactHero      ──items──▶ ContactInfo     ──mapUrl──▶ ContactMap
               ──subjects──▶ ContactForm  ──links──▶ ContactSocial

MenuPage  ──categories──▶  Menu  ──▶  MenuCategories / MenuProductGrid  ──product──▶  MenuProductCard

Layout  ──navLinks, socialLinks──▶ Navbar        HomePage ──tonight──▶ HeroSection ──▶ HeroContent
        ──links, socialLinks, contactInfo──▶ Footer       ──story, stats, gallery, ...──▶ AboutSection
```

Los componentes reciben las props como parámetro y las desestructuran:

```jsx
export default function ContactInfo({ items }) { ... }
```

Para ver qué props recibe un componente, mirá los parámetros de su función: están desestructurados ahí mismo.

**Estado:** no hay Context ni librerías de estado. `Menu` guarda con `useState` qué categoría
está elegida (`selectedCategoryId`) y se la pasa a sus hijos junto con la función para cambiarla
(`onSelect`). Eso se llama *levantar el estado* (lifting state up).

## Renderizado de listas con `.map()`

Cuando hay varios elementos iguales (enlaces, tarjetas, filas) **no se escriben a mano**: se guardan
en un arreglo y se recorre con `.map()`, que devuelve un elemento por cada dato.

```jsx
{items.map((item) => (
  <RevealItem as="li" key={item.id}>
    <InfoCard {...item} />
  </RevealItem>
))}
```

- **`key`**: React la usa para saber qué elemento es cuál cuando la lista cambia. Tiene que ser
  **única y estable**: un `id` o un texto que no se repite. Se evita usar el índice (`i`) salvo cuando
  no hay otra opción (por ejemplo, los dígitos de un número, que pueden repetirse).
- Las listas están en `data/`, así que cambiar un precio o agregar un enlace no requiere tocar JSX.
- Hasta las rutas se generan con `.map()` (ver `router/Rutas.jsx`).

## Fidelidad visual

Esta refactorización **no cambia el diseño**: no se tocaron clases de Tailwind, estilos ni el orden
visual. El HTML renderizado de las páginas Carta, Contacto y Eventos (404) y de la sección About
se comparó antes y después y es idéntico, salvo el cambio de `div` por `header`/`section` en dos
bloques de Contacto, que no tienen estilos propios.
