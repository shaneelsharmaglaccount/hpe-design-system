import React from 'react';
import { Header, Box, Main, ResponsiveContext, Text } from 'grommet';

export const HeaderOnlyExample = () => (
  <AppContainer>
    <Box flex overflow="auto">
      <Box height={{ min: '100%' }}>
        <Header
          background="background-front"
          fill="horizontal"
          pad="small"
          // remove dashed border in prod, for demo purposes only
          border={{ color: 'border', style: 'dashed' }}
          // remove height="xxsmall" in prod, for demo purposes only
          height="xxsmall"
        >
          <Text weight="bold" color="text-strong">
            Header
          </Text>
        </Header>
        <Main
          fill={undefined}
          flex={false}
          pad="small"
          // remove dashed border in prod, for demo purposes only
          border={{ color: 'border', style: 'dashed' }}
          // remove height="xlarge" in prod, for demo purposes only
          height="xlarge"
        >
          <Text weight="bold" color="text-strong">
            Main
          </Text>
        </Main>
      </Box>
    </Box>
  </AppContainer>
);

const AppContainer = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Box
      direction={['xsmall', 'small'].includes(size) ? 'column-reverse' : 'row'}
      fill
      margin="auto"
      width={{ max: 'xxlarge' }}
      {...rest}
    />
  );
};
