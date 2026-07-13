import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import About from '../components/About';
import Services from '../components/Services';
import Therapists from '../components/Therapists';
import HowItWorks from '../components/HowItWorks';
import Manifesto from '../components/Manifesto';
import LiveTracking from '../components/LiveTracking';
import AppShowcase from '../components/AppShowcase';
import ReferralBanner from '../components/ReferralBanner';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import HomeCta from '../components/HomeCta';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <Services />
      <Therapists />
      <HowItWorks />
      <Manifesto />
      <LiveTracking />
      <AppShowcase />
      <ReferralBanner />
      <Reviews />
      <FAQ />
      <HomeCta />
    </>
  );
}
