import ContactSection from "../components/sections/ContactSection";
import Seo from "../components/seo/Seo";
// La página es la única que importa los datos. De acá bajan por props.
import {
  CONTACT_HERO,
  CONTACT_INFO,
  SOCIAL_LINKS,
  FORM_SUBJECTS,
  MAP_EMBED_URL,
} from "../data/contactData";

// Página /contacto
export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contacto"
        description="Escribinos, reservá tu mesa o encontranos en Tucumán. Dirección, teléfono, horarios y formulario de contacto de Los Amigos Bar & Coctelería."
      />
      <ContactSection
        hero={CONTACT_HERO}
        infoItems={CONTACT_INFO}
        socialLinks={SOCIAL_LINKS}
        formSubjects={FORM_SUBJECTS}
        mapUrl={MAP_EMBED_URL}
      />
    </>
  );
}
