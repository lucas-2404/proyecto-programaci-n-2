import { motion } from "framer-motion";

// Badge styles por tag — extensible para nuevos tags
const TAG_STYLES = {
  Popular:   "bg-brand-gold/20 text-brand-gold border border-brand-gold/30",
  Signature: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
  Nuevo:     "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  Vegano:    "bg-lime-500/20 text-lime-300 border border-lime-500/30",
};
const DEFAULT_TAG_STYLE = "bg-white/5 text-brand-subtle border border-white/10";

// Tarjeta de producto premium
export default function MenuProductCard({ product, index }) {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <motion.article
      initial={{ y: 18 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      aria-label={`${product.name}, ${formattedPrice}`}
      className="
        group relative flex flex-col w-full h-full
        rounded-2xl overflow-hidden
        border border-brand-border
        bg-brand-card
        hover:border-brand-gold/40
        transition-all duration-300
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,160,23,0.15)]
      "
    >
      {/* Top gold line reveal on hover */}
      <span
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        aria-hidden="true"
      />
      {/* Shimmer effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none z-10 transition-opacity duration-500 overflow-hidden rounded-2xl"
        aria-hidden="true"
      >
        {/* El brillo solo se anima en hover */}
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(105deg,transparent_20%,rgba(212,160,23,0.08)_25%,transparent_30%)] bg-[length:200%_100%] group-hover:animate-shimmer" />
      </div>

      {/* Visual hero block (Image or Emoji fallback) */}
      <div
        className="
          relative flex items-center justify-center
          h-40
          bg-gradient-to-br from-brand-surface via-brand-card to-[#0d0d14]
          overflow-hidden
          select-none
        "
        aria-hidden="true"
      >
        {product.image ? (
          <motion.img
            src={product.image}
            alt=""
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-brand-gold/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute w-24 h-24 rounded-full bg-brand-gold/10 blur-2xl group-hover:bg-brand-gold/20 transition-colors duration-500" />
            <motion.span
              className="relative z-10 text-6xl leading-none"
              whileHover={{ scale: 1.15, rotate: [-3, 3, -3, 0] }}
              transition={{ duration: 0.4 }}
            >
              {product.emoji}
            </motion.span>
          </>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Tags row */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="Etiquetas">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full ${TAG_STYLES[tag] ?? DEFAULT_TAG_STYLE}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Name */}
        <h3 className="font-heading font-bold text-[15px] leading-snug text-brand-heading group-hover:text-white transition-colors duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-brand-muted text-xs leading-relaxed flex-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between pt-3 border-t border-brand-border mt-auto">
          <span className="text-brand-gold font-bold text-xl tracking-tight font-mono">
            {formattedPrice}
          </span>
          <motion.span
            className="w-7 h-7 flex items-center justify-center rounded-full border border-brand-border text-brand-subtle text-xs group-hover:border-brand-gold/50 group-hover:text-brand-gold transition-all duration-300"
            aria-hidden="true"
          >
            ✦
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}
