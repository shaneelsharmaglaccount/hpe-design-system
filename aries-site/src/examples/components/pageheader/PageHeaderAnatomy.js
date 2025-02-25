import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Diagram, Grid, ResponsiveContext, Stack } from 'grommet';
import { Annotation } from '../../../layouts';
import { PageHeaderContentRegions } from '.';

const color = 'border';
const anchor = 'horizontal';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1a',
    toTarget: 'title-region',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1b',
    toTarget: 'subtitle-region',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'parent',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'actions',
  },
];

export const PageHeaderAnatomy = ({ background }) => {
  const breakpoint = useContext(ResponsiveContext);

  const mobileLayout = ['xsmall', 'small'].includes(breakpoint);

  return (
    <Stack>
      <Grid
        align="center"
        columns={['auto', 'flex', 'auto']}
        rows={
          mobileLayout
            ? ['auto', 'auto', 'auto', 'auto']
            : ['31px', '58px', '30px']
        }
        areas={
          mobileLayout
            ? [
                ['annotation-2', 'pageheader', 'null'],
                ['annotation-1a', 'pageheader', 'null'],
                ['annotation-1b', 'pageheader', 'null'],
                ['null-2', 'pageheader', 'annotation-3'],
              ]
            : [
                ['annotation-2', 'pageheader', 'null'],
                ['annotation-1a', 'pageheader', 'annotation-3'],
                ['annotation-1b', 'pageheader', 'null-2'],
              ]
        }
        gap={{ column: 'large' }}
      >
        <Annotation id={2} target="2" gridArea="annotation-2" />
        <Annotation id="1a" target="1a" gridArea="annotation-1a" />
        <Annotation id="1b" target="1b" gridArea="annotation-1b" />
        <Annotation id={3} target="3" gridArea="annotation-3" />
        <PageHeaderContentRegions
          gridArea="pageheader"
          background={background}
          pad="none" // removing pad from anatomy diagram
        />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};

PageHeaderAnatomy.propTypes = {
  background: PropTypes.string,
};
