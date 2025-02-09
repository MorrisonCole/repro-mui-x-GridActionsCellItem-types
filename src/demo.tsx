import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const TestComponent: React.FC<{ requiredProp: string }> = ({
  requiredProp,
}) => <div>{requiredProp}</div>;

export default function Demo() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
    editable: true,
  });

  // No issue, should error.
  const missingRequiredPropsShouldError = <GridActionsCellItem />;

  // No issue
  const requiredPropsShouldNotError = (
    <GridActionsCellItem label="some-label" showInMenu />
  );

  // No issue, should error.
  const unknownPropsShouldError = (
    <GridActionsCellItem
      label="some-label"
      showInMenu
      unknown="should-error"
    />
  );

  // Issue. Should not error - requiredProp is required by TestComponent!
  const requiredComponentPropsShouldNotError = (
    <GridActionsCellItem
      label="some-label"
      showInMenu
      component={TestComponent}
      requiredProp={'should-not-error'}
    />
  )

  // Issue. Should error -  requiredProp is required by TestComponent!
  const missingRequiredComponentPropsShouldError = (
    <GridActionsCellItem
      label="some-label"
      showInMenu
      component={TestComponent}
    />
  );

  // No issue with ButtonBase - correctly infers requiredProp is required.
  const missingRequiredComponentPropsShouldErrorButtonBase = (
    <ButtonBase component={TestComponent} />
  );

  // No issue with ButtonBase - correctly infers requiredProp is required.
  const requiredComponentPropsShouldNotErrorButtonBase = (
    <ButtonBase component={TestComponent} requiredProp={'should-not-error'} />
  );

  return (
    <Box sx={{ height: 520, width: '100%' }}>
      <DataGrid
        {...data}
        loading={data.rows.length === 0}
        rowHeight={38}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
