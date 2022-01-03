import React from 'react';

import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { Box, Boxes, BoxNum, BoxText } from './AcomplishmentsStyles';
import { accomplishmentsData } from '../../constants/constants';

const Accomplishments = () => (
  <Section>
    <SectionDivider />
    <br />
    <SectionTitle>Achievements</SectionTitle>
    <Boxes>
      {accomplishmentsData.map((card, index) => (
        <Box key={index}>
          <BoxNum>{card.number}</BoxNum>
          <BoxText>{card.text}</BoxText>
        </Box>
      ))}
    </Boxes>
  </Section>
);

export default Accomplishments;
