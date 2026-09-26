import { useState, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../utils/cn";
import { FORM_SUBJECTS } from "./contactContent";

// ── Variants (outside component — stable references) ────────────────────────────
const feedbackVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const spinnerVariants = {
  animate: { rotate: 360, transition: { duration: 1, repeat: Infinity, ease: "linear" } },
};

// ── Validation helpers ──────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-\+\(\)]{7,20}$/;

function validateFields(fields) {
  const errors = {};

  if (!fields.name.trim() || fields.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres.";
  }
  if (!EMAIL_RE.test(fields.email.trim())) {
    errors.email = "Ingresá un email válido.";
  }
  if (fields.phone && !PHONE_RE.test(fields.phone.trim())) {
    errors.phone = "Ingresá un teléfono válido.";
  }
  if (!fields.subject) {
    errors.subject = "Seleccioná un asunto.";
  }
  if (!fields.message.trim() || fields.message.trim().length < 10) {
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  }
  if (!fields.privacy) {
    errors.privacy = "Debés aceptar la política de privacidad.";
  }

  return errors;
}

// ── Shared input classes ────────────────────────────────────────────────────────
const inputBase =
  "w-full px-4 py-3 rounded-xl glass border border-brand-border " +
  "text-brand-text placeholder:text-brand-muted bg-transparent " +
  "focus:outline-none focus:border-brand-gold/50 focus:shadow-gold-glow " +
  "transition-all duration-300";

const inputError =
  "border-red-500/60 focus:border-red-500/70 focus:shadow-none";

const labelBase =
  "block text-xs font-semibold uppercase tracking-[0.18em] text-brand-subtle mb-2";

// ── Field wrapper ───────────────────────────────────────────────────────────────
function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="error"
            variants={feedbackVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-1.5 text-xs text-red-400"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────────
/**
 * ContactForm — Contact form with 4 states: idle | loading | success | error.
 * Client-side validation runs before the async mock submit.
 * No dangerouslySetInnerHTML. All inputs sanitized with trim().
 */
export default function ContactForm() {
  // Unique ID prefix for accessibility (React 18 useId)
  const uid = useId();

  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    privacy: false,
  });

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear field-level error on edit
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (status === "loading") return;

      // Client-side validation
      const validationErrors = validateFields(fields);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        // Focus first error field
        const firstKey = Object.keys(validationErrors)[0];
        document.getElementById(`${uid}-${firstKey}`)?.focus();
        return;
      }

      setErrors({});
      setStatus("loading");

      try {
        // Mock async submission — replace with real API call
        await new Promise((resolve) => setTimeout(resolve, 1600));
        setStatus("success");
        setFields({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          privacy: false,
        });
      } catch {
        setStatus("error");
      }
    },
    [fields, status, uid]
  );

  const handleReset = useCallback(() => {
    setStatus("idle");
    setErrors({});
  }, []);

  const isLoading = status === "loading";

  return (
    <div className="glass-dark rounded-[22px] border border-brand-border p-8 md:p-10 shadow-glass-lg">
      <div className="mb-8">
        <h2
          id="contact-form-title"
          className="font-heading text-2xl font-bold text-brand-heading"
        >
          Envianos un mensaje
        </h2>
        <p className="mt-2 text-sm text-brand-subtle">
          Te respondemos dentro de las 24 hs.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* ── SUCCESS STATE ── */}
        {status === "success" && (
          <motion.div
            key="success"
            variants={feedbackVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alert"
            aria-live="polite"
            className="flex flex-col items-center gap-5 py-10 text-center"
          >
            {/* Checkmark circle */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <svg
                className="h-8 w-8 text-emerald-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-brand-heading">
                ¡Mensaje enviado!
              </p>
              <p className="mt-2 text-sm text-brand-subtle">
                Gracias por escribirnos. Te respondemos pronto.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-2 text-sm font-medium text-brand-gold hover:text-brand-gold-light transition-colors duration-200 gold-underline"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        )}

        {/* ── ERROR STATE ── */}
        {status === "error" && (
          <motion.div
            key="error"
            variants={feedbackVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alert"
            aria-live="assertive"
            className="flex flex-col items-center gap-5 py-10 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30">
              <svg
                className="h-8 w-8 text-red-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-brand-heading">
                Algo salió mal
              </p>
              <p className="mt-2 text-sm text-brand-subtle">
                No se pudo enviar tu mensaje. Intentá de nuevo o escribinos por WhatsApp.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
                         bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-sm font-semibold
                         hover:bg-brand-gold hover:text-brand-bg hover:shadow-gold-glow
                         transition-all duration-300"
            >
              Reintentar
            </button>
          </motion.div>
        )}

        {/* ── IDLE / LOADING STATE ── */}
        {(status === "idle" || status === "loading") && (
          <motion.form
            key="form"
            variants={feedbackVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
            aria-label="Formulario de contacto"
            aria-labelledby="contact-form-title"
            noValidate
            className="flex flex-col gap-5"
          >
            {/* Row: Name + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-name`} label="Nombre *" error={errors.name}>
                <input
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  disabled={isLoading}
                  className={cn(inputBase, errors.name && inputError)}
                />
              </Field>

              <Field id={`${uid}-email`} label="Email *" error={errors.email}>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  maxLength={254}
                  autoComplete="email"
                  disabled={isLoading}
                  className={cn(inputBase, errors.email && inputError)}
                />
              </Field>
            </div>

            {/* Row: Phone + Subject */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${uid}-phone`} label="Teléfono" error={errors.phone}>
                <input
                  id={`${uid}-phone`}
                  name="phone"
                  type="tel"
                  value={fields.phone}
                  onChange={handleChange}
                  placeholder="+54 381 000-0000"
                  maxLength={20}
                  autoComplete="tel"
                  disabled={isLoading}
                  className={cn(inputBase, errors.phone && inputError)}
                />
              </Field>

              <Field id={`${uid}-subject`} label="Asunto *" error={errors.subject}>
                <select
                  id={`${uid}-subject`}
                  name="subject"
                  value={fields.subject}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={cn(
                    inputBase,
                    "appearance-none cursor-pointer",
                    // Match select option bg to page background
                    "[&>option]:bg-brand-card [&>option]:text-brand-text",
                    errors.subject && inputError,
                    !fields.subject && "text-brand-muted"
                  )}
                >
                  <option value="" disabled>
                    Seleccioná un asunto
                  </option>
                  {FORM_SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Message */}
            <Field id={`${uid}-message`} label="Mensaje *" error={errors.message}>
              <textarea
                id={`${uid}-message`}
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="Contanos qué necesitás..."
                required
                minLength={10}
                maxLength={1000}
                rows={5}
                disabled={isLoading}
                className={cn(inputBase, "resize-none", errors.message && inputError)}
              />
              <p className="mt-1 text-right text-[11px] text-brand-muted">
                {fields.message.length}/1000
              </p>
            </Field>

            {/* Privacy checkbox */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor={`${uid}-privacy`}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <input
                  id={`${uid}-privacy`}
                  name="privacy"
                  type="checkbox"
                  checked={fields.privacy}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={cn(
                    "mt-0.5 h-4 w-4 flex-shrink-0 rounded cursor-pointer",
                    "accent-brand-gold bg-transparent border-brand-border",
                    errors.privacy && "outline outline-1 outline-red-500/60"
                  )}
                />
                <span className="text-sm text-brand-subtle group-hover:text-brand-text transition-colors duration-200">
                  Acepto la{" "}
                  <a
                    href="/privacidad"
                    className="text-brand-gold hover:text-brand-gold-light transition-colors duration-200 gold-underline"
                  >
                    Política de Privacidad
                  </a>{" "}
                  y el tratamiento de mis datos.
                </span>
              </label>
              <AnimatePresence>
                {errors.privacy && (
                  <motion.p
                    key="privacy-error"
                    variants={feedbackVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-xs text-red-400 pl-7"
                    role="alert"
                  >
                    {errors.privacy}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit */}
            <button
              id="contact-form-submit"
              type="submit"
              disabled={isLoading}
              aria-disabled={isLoading}
              aria-busy={isLoading}
              className={cn(
                "relative mt-2 inline-flex items-center justify-center gap-2.5",
                "px-8 py-3.5 rounded-xl font-semibold text-sm will-transform",
                "transition-all duration-300",
                isLoading
                  ? "bg-brand-gold/60 text-brand-bg cursor-not-allowed"
                  : "bg-brand-gold text-brand-bg shadow-gold-glow hover:shadow-gold-strong hover:bg-brand-gold-light"
              )}
            >
              {isLoading ? (
                <>
                  <motion.svg
                    variants={spinnerVariants}
                    animate="animate"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </motion.svg>
                  <span>Enviando…</span>
                </>
              ) : (
                <>
                  <span>Enviar mensaje</span>
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2 8h12M9 3l5 5-5 5" />
                  </svg>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
