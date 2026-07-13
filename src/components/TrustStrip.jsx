const ITEMS = [
  { text: 'Background-Checked Therapists', icon: 'M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { text: 'Arrives In Under 30 Minutes', icon: 'M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { text: 'Licensed & Insured', icon: 'M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z' },
  { text: '4.9★ Average Rating', icon: 'M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 17l-5.5 4L8 13.5 3 9l6.5-.5z' },
];

export default function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="wrap">
        {ITEMS.map((it) => (
          <div className="trust-item" key={it.text}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={it.icon} /></svg>
            <span>{it.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
