import { useState } from 'react';
import Reveal from './Reveal';

const ITEMS = [
  {
    q: 'How fast can a therapist get to me?',
    a: 'Most bookings are matched with a nearby, verified therapist in under 30 minutes across Lagos. You can also schedule a session in advance for a specific time.',
  },
  {
    q: 'Is my therapist background-checked?',
    a: 'Yes. Every therapist on MassageNowNow passes an identity check, certification review and an in-person skills assessment before they can accept bookings.',
  },
  {
    q: 'What areas in Lagos do you cover?',
    a: 'We currently serve Lekki, Victoria Island, Ikoyi, Ikeja and most of the Mainland. Enter your address at checkout and we\'ll confirm coverage instantly.',
  },
  {
    q: 'How do I pay?',
    a: 'Fund your in-app wallet with Paystack or Flutterwave, or pay directly by card. Wallet payments also earn reward points on every session.',
  },
  {
    q: 'Can I book on the website and manage it in the app?',
    a: 'Absolutely — your account, wallet and booking history sync instantly between the website and the MassageNowNow app.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq">
      <div className="wrap">
        <Reveal className="services-head">
          <span className="eyebrow-script">Good To Know</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </Reveal>
        <Reveal className="faq-list">
          {ITEMS.map((item, i) => (
            <div className={`faq-item ${openIndex === i ? 'open' : ''}`} key={item.q}>
              <button className="faq-q" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
                {item.q}
                <span className="faq-plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
              <div className="faq-a"><p>{item.a}</p></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
