import React from 'react';
import { PageLayout, NavPage } from '../../layouts';
import { DescriptiveHeader, Meta } from '../../components';
import { getPageDetails } from '../../utils';

const title = 'Resources';
const topic = getPageDetails(title);

const Resources = () => {
  const descriptiveHeader = (
    <DescriptiveHeader
      background={topic.color}
      subText={topic.description}
      icon={topic.icon}
      title={title}
    />
  );

  return (
    <PageLayout descriptiveHeader={descriptiveHeader} title={title} isNavPage>
      <Meta
        title={title}
        description={topic.seoDescription}
        canonicalUrl="https://aries.hpe.design/resources"
      />
      <NavPage items={topic.pages} topic={topic.name.toLowerCase()} />
    </PageLayout>
  );
};

export default Resources;
