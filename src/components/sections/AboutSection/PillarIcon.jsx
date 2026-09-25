const PATHS = {
  beer: (
    <>
      <path d="M5 7h10v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
      <path d="M15 10h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2" />
      <path d="M5 7a3 3 0 0 1 3-3 3 3 0 0 1 5 0 2 2 0 0 1 2 3" />
    </>
  ),
  cocktail: (
    <>
      <path d="M4 4h16l-8 9z" />
      <path d="M12 13v7M8 20h8M15 4l3-2" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
};

/** PillarIcon — Stroke icon keyed by name ("beer" | "cocktail" | "music"). */
export default function PillarIcon({ name }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
