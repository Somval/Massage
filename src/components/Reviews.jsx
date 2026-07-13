import { useState } from 'react';

const REVIEWS = [
  { quote: "Booked at 9pm, therapist was at my door in 20 minutes. Genuinely better than most spas I've paid double for.", name: 'Amara O.', loc: 'Lekki Phase 1' },
  { quote: 'The live tracking took all the anxiety out of having someone come to my hotel room. Felt safe the whole time.', name: 'Tunde A.', loc: 'Victoria Island' },
  { quote: 'Diana has fixed my back more than three physios combined. I book her every other week now.', name: 'Ngozi E.', loc: 'Ikeja GRA' },
];

export default function Reviews() {
  const [active, setActive] = useState(0);
  const r = REVIEWS[active];

  return (
    <section className="testimonial-section" id="reviews">
      <div className="hero-bg">
        <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1600&h=1000&fit=crop" alt="Spa ambience" />
      </div>
      <div className="testimonial-inner">
        <div className="quote-mark">"</div>
        <div className="t-stars">★★★★★</div>
        <p className="quote">{r.quote}</p>
        <div className="testimonial-person">
          {r.name}
          <span>{r.loc}</span>
        </div>
        <div className="testimonial-dots">
          {REVIEWS.map((_, i) => (
            <span key={i} className={i === active ? 'active' : ''} onClick={() => setActive(i)} style={{ cursor: 'pointer' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
