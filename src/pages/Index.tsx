import { useState } from 'react';
import { LoadingScreen } from '@/components/landing/LoadingScreen';
import { FrameSequenceBackground } from '@/components/landing/FrameSequenceBackground';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSpotlight } from '@/components/landing/HeroSpotlight';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { ProjectsSectionV2 } from '@/components/landing/ProjectsSectionV2';
import { ExperienceSection } from '@/components/landing/ExperienceSection';
import { CoursesSectionV2 } from '@/components/landing/CoursesSectionV2';
import { VisualWorkSection } from '@/components/landing/VisualWorkSection';
import { ContactSectionV2 } from '@/components/landing/ContactSectionV2';
import { InfoStrip } from '@/components/landing/InfoStrip';
import { GrainOverlay } from '@/components/landing/GrainOverlay';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative bg-black" style={{ overflowX: 'clip' }}>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
          <FrameSequenceBackground />
          <GrainOverlay />
          <Navbar />
          <main className="relative z-10">
            <HeroSpotlight />
            <InfoStrip />
            <ServicesSection />
            <ProjectsSectionV2 />
            <ExperienceSection />
            <CoursesSectionV2 />
            <VisualWorkSection />
            <ContactSectionV2 />
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
