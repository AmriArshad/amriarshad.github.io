import React from 'react';

import { BlogCard, CardInfo, ExternalLinks, GridContainer, HeaderThree, Hr, Tag, TagList, TitleContent, UtilityList, Img } from './ProjectsStyles';
import { Section, SectionDivider, SectionTitle } from '../../styles/GlobalComponents';
import { projects } from '../../constants/constants';

const Projects = () => (
  <Section id="projects">
    <SectionDivider />
    <SectionTitle main>Projects</SectionTitle>
    <GridContainer>
      {projects.map(({ id, image, title, description, tags, source, live }) => {
        return (
          <BlogCard key={id}>
            <Img src={image} />
            <TitleContent>
              <HeaderThree>{title}</HeaderThree>
              <Hr />
            </TitleContent>
            <CardInfo>{description}</CardInfo>
            <div>
              <TagList>{tags.map((tag, i) => (
                <Tag key={i}>{tag}</Tag>
              ))}</TagList>
            </div>
            <UtilityList>
              <ExternalLinks href={source}>Code</ExternalLinks>
              {live !== '' ? (
                <ExternalLinks href={live}>Live</ExternalLinks>
              ) : null}
            </UtilityList>
          </BlogCard>
        );
      })}
    </GridContainer>
    <br />
  </Section>
);

export default Projects;