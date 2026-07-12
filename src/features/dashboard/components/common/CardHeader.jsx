// ─── Reusable Card Header Component ────────────────────────────────────

/**
 * CardHeader - A reusable header for dashboard cards
 * Shows a title and optionally a subtitle/action indicator
 *
 * @param {object} props
 * @param {string} props.title - The header title
 * @param {string} [props.subtitle] - Optional subtitle or action text (defaults to "...")
 */
function CardHeader({ title, subtitle = "..." }) {
  return (
    <div className="flex justify-between items-center h-10">
      <h2 className="font-bold text-lg">{title}</h2>
      {subtitle && <p className="font-bold text-lg">{subtitle}</p>}
    </div>
  );
}

export default CardHeader;