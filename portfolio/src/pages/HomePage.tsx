import { Hero } from '../components/marketing/Hero';
import { CapabilityStrip } from '../components/marketing/CapabilityStrip';
import { WaveDivider } from '../components/marketing/WaveDivider';
import { FeatureBlocks } from '../components/marketing/FeatureBlocks';
import { DarkCurveSection } from '../components/marketing/DarkCurveSection';
import { AskCard } from '../components/marketing/AskCard';
import { BentoGrid } from '../components/marketing/BentoGrid';
import { TestimonialsGrid } from '../components/marketing/TestimonialsGrid';
import { ClosingCTA } from '../components/marketing/ClosingCTA';

export function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <WaveDivider from="#FDFBF7" to="#F5EDE3" />
      <FeatureBlocks />
      <DarkCurveSection aboveColor="#F5EDE3" belowColor="#FDFBF7" />
      <AskCard />
      <WaveDivider from="#FDFBF7" to="#F5EDE3" />
      <BentoGrid />
      <WaveDivider from="#F5EDE3" to="#FDFBF7" flip />
      <TestimonialsGrid />
      <ClosingCTA />
    </>
  );
}
