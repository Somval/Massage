import './PulseWave.css';

/**
 * The site's one signature visual motif.
 * The app's core pitch is "live availability" — a therapist is either
 * available or busy, shown as a pulse on a map. This line reworks that
 * idea: it reads as a heartbeat on the left, then resolves into a slow,
 * calm wave on the right — on-demand urgency settling into relaxation.
 * Used once, in the Home hero, and nowhere else.
 */
export default function PulseWave({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 900 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 60
           L110 60
           L130 20
           L150 100
           L170 40
           L190 60
           L260 60
           C 320 60, 340 20, 400 60
           C 460 100, 480 20, 540 60
           C 610 106, 660 14, 720 60
           C 780 100, 830 40, 900 60"
        stroke="url(#pulseGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        className="pulse-path"
      />
      <defs>
        <linearGradient id="pulseGradient" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D62828" />
          <stop offset="45%" stopColor="#D62828" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>
    </svg>
  );
}
