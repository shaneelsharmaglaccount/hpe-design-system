import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  DataTable,
  DropButton,
  Header,
  Heading,
  Menu,
  Page,
  PageContent,
} from 'grommet';
import { Splits } from 'grommet-icons';

import { ColumnSettings } from './ColumnSettings';
import {
  FilterControls,
  FiltersProvider,
  useFilters,
} from '../../FilterControls';

const COLUMNS = [
  { property: 'name', header: 'Name', primary: true, pin: true },
  { property: 'status', header: 'Status' },
  { property: 'role', header: 'Role' },
  { property: 'location', header: 'Location' },
  { property: 'hoursAvailable', header: 'Hours Available', align: 'end' },
];

const allData = [
  {
    location: 'San Jose, CA',
    hoursAvailable: 10,
    role: 'Engineer',
    name: 'Eric Soderberg',
    status: 'Online',
  },
  {
    location: 'San Jose, CA',
    hoursAvailable: 30,
    role: 'Engineer',
    name: 'Taylor Seamans',
    status: 'Online',
  },
  {
    location: 'Fort Collins, CO',
    hoursAvailable: 25,
    role: 'Engineer',
    name: 'Matthew Glissmann',
    status: 'Offline',
  },
  {
    location: 'Fort Collins, CO',
    hoursAvailable: 5,
    role: 'Designer',
    name: 'Greg Furuiye',
    status: 'Online',
  },
  {
    location: 'San Jose, CA',
    hoursAvailable: 25,
    role: 'Designer',
    name: 'Vicky Avalos',
    status: 'Offline',
  },
  {
    location: 'Fort Collins, CO',
    hoursAvailable: 12,
    role: 'Engineer',
    name: 'Shimi Yacobi',
    status: 'Online',
  },
];

// Define which attributes should be made available for the user
// to filter upon
const filtersConfig = [
  { property: 'role', label: 'Role', filterType: 'CheckBoxGroup' },
  { property: 'status', label: 'Status', filterType: 'CheckBoxGroup' },
  {
    property: 'location',
    label: 'Location',
    filterType: 'CheckBoxGroup',
  },
  {
    property: 'hoursAvailable',
    label: 'Remaining Hours Available',
    filterType: 'RangeSelector',
    inputProps: {
      min: 0,
      max: 40,
      valueRange: '0 - 40 hours',
    },
  },
  { property: 'name', label: 'Name', filterType: 'CheckBoxGroup' },
];

export const TableCustomizationExample = () => {
  const [visibleColumns, setVisibleColumns] = useState(COLUMNS);
  const [open, setOpen] = useState(false);

  return (
    <Page background="background" fill>
      <PageContent>
        <FiltersProvider>
          <Box gap="medium">
            <Header pad={{ top: 'medium' }}>
              <Box gap="xsmall" fill="horizontal">
                <Heading id="users-heading" level={2} margin="none">
                  Users
                </Heading>
                <Box direction="row" justify="between" align="start" wrap>
                  <FilterControls
                    // Table column configuration should be grouped on right
                    // side with other actions to separate it from filtering.
                    // If grouped to the left with the Filter control, it
                    // becomes confusing what the "Clear filters" button will
                    // do with regards to any column configurations that have
                    // been applied.
                    configure={
                        <DropButton
                          a11yTitle="Configure columns button"
                          icon={<Splits />}
                          kind="toolbar"
                          dropAlign={{ top: 'bottom', right: 'right' }}
                          onClose={() => setOpen(false)}
                          onOpen={() => setOpen(true)}
                          dropContent={
                            <ColumnSettings
                              columns={COLUMNS}
                              visibleColumns={visibleColumns}
                              setVisibleColumns={setVisibleColumns}
                              open={open}
                            />
                          }
                          tip="Configure columns"
                        />
                    }
                    actions={<Menu kind="toolbar" label="Actions" items={[]} />}
                    data={allData}
                    filters={filtersConfig}
                    searchFilter={{ placeholder: 'Search' }}
                  />
                </Box>
              </Box>
            </Header>
            <Results columns={visibleColumns} />
          </Box>
        </FiltersProvider>
      </PageContent>
    </Page>
  );
};

const Results = ({ columns }) => {
  const [select, setSelect] = useState([]);
  const { filteredResults } = useFilters();

  return (
    <Box fill overflow="auto">
      <DataTable
        aria-describedby="users-heading"
        data={filteredResults}
        background="background"
        columns={columns}
        select={select}
        onSelect={setSelect}
        pin
      />
    </Box>
  );
};

Results.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({ property: PropTypes.string, header: PropTypes.string }),
  ),
};
