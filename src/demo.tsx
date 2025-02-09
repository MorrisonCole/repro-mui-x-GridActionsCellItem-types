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

  // No issue
  const missingRequiredPropsShouldError = <GridActionsCellItem />;

  // No issue
  const requiredPropsShouldNotError = (
    <GridActionsCellItem label="some-label" showInMenu />
  );

  // Issue with type definition
  const unknownPropsShouldError = (
    <GridActionsCellItem
      label="some-label"
      showInMenu
      unknown="should-error" // Does not error. Issue with type definition.
    />
  );

  // Issue with type definition
  const componentPropsShouldNotError = (
    <GridActionsCellItem
      label="some-label"
      showInMenu
      component={TestComponent}
      // requiredProp is not passed, but is required by TestComponent. Issue with type definition.
    />
  );

  const buttonBaseWithUnknownProps = (
    <ButtonBase unknown="should-error-but-does-not!" />
  );

  const buttonBaseWithCustomComponent = (
    <ButtonBase component={TestComponent} requiredProp={true} />
  );

  return (
    <Box sx={{ height: 520, width: '100%' }}>
      <DataGrid
        {...data}
        loading={data.rows.length === 0}
        rowHeight={38}
        checkboxSelection
        disableRowSelectionOnClick
        rekt
      />
      <ButtonBase requiredProp={true} />
    </Box>
  );
}
