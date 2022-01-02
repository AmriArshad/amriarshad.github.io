import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center>
        Welcome To <br />
        My Personal Portfolio
      </SectionTitle>
      <SectionText>
      ☪️ | Computer Science Student | Digital Artist | Creative Coder
      </SectionText>
      <Button onClick={() => window.location = 'https://linktr.ee/TheMel0n'}>Learn more</Button>
    </LeftSection>
  </Section>
);

export default Hero;