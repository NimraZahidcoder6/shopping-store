const ITEMS = [
  "Outerwear",
  "Knitwear",
  "Dresses",
  "Denim",
  "Accessories",
  "New Arrivals",
  "Archive Sale",
];

export default function CategoryTicker() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ink py-3">
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-widest text-bone/70"
          >
            {item} <span className="text-clay">&mdash;</span>
          </span>
        ))}
      </div>
    </div>
  );
}