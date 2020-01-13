import React, { useEffect } from 'react';
import { initialize, pageview } from 'react-ga';

import { Box, Image, ResponsiveContext } from 'grommet';
import { Tile, Tiles } from 'aries-core';

import { Config } from '../../config';
import { PageLayout } from '../layouts';
import { Meta } from '../components';
import { TileContent, IntroTile } from '../components/home';
import { getPageDetails } from '../utils';

const HomeTiles = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Tiles
      gap={size !== 'small' ? 'large' : 'medium'}
      columns={{ count: 'fit', size: size !== 'small' ? 'medium' : 'fill' }}
      rows="medium"
      {...rest}
    />
  );
};

const title = 'Home';
const pageDetails = getPageDetails(title);
const topicList = pageDetails.pages.map(topic => getPageDetails(topic));

const Index = () => {
  useEffect(() => {
    if (Config.gaId) {
      initialize(Config.gaId);
      pageview(document.location.pathname);
    }
  }, []);

  return (
    <PageLayout title={title} isLanding>
      <Meta title={title} description={pageDetails.seoDescription} />
      <Box gap="large">
        <HomeTiles>
          <Tile background="white">
            <Image src="/image-hands.png" alt="HPE Hands Image" fit="cover" />
          </Tile>
          <IntroTile background="white" />
        </HomeTiles>
        <HomeTiles>
          {topicList.map(topic => (
            <Tile
              pad="medium"
              background={topic.color}
              key={topic.color}
              onClick={() =>
                (window.location.href = `/${topic.name.toLowerCase()}`)
              }
            >
              <TileContent
                key={topic.name}
                title={topic.name}
                subTitle={topic.description}
                icon={topic.icon('xlarge')}
              />
            </Tile>
          ))}
        </HomeTiles>
      </Box>
    </PageLayout>
  );
};

export default Index;
