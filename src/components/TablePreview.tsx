import { Box, Card, Grid, Inline, Label, Text } from '@sanity/ui';
import type { PreviewProps } from 'sanity';

import type { TableRow } from './TableComponent';
import { TableIcon } from './TableIcon';

interface ValueProps {
  rows?: TableRow[];
  title?: string;
}

const Table = ({ rows }: { rows: TableRow[] }) => {
  const numCols = rows.length === 0 ? 0 : rows[0].cells.length;

  return (
    <Grid columns={numCols} padding={2}>
      {rows.map(row =>
        row.cells.map((cell, i) => (
          <Card
            key={row._key + i}
            padding={2}
            style={{ outline: '1px solid #DFE2E9' }}
          >
            <Text style={{ textOverflow: 'elipsis' }}>{cell}</Text>
          </Card>
        ))
      )}
    </Grid>
  );
};

export const TablePreview = (props: ValueProps & PreviewProps) => {
  const { schemaType, rows = [], title = 'Title missing' } = props;

  return (
    <>
      <Box padding={3}>
        <Inline space={3}>
          <Card>
            <Label size={4}>
              <TableIcon />
            </Label>
          </Card>
          <Card>
            <Text>{schemaType?.title ?? title}</Text>
          </Card>
        </Inline>
      </Box>
      <Box padding={2}>
        {rows.length === 0 ? (
          <Label muted>Empty Table</Label>
        ) : (
          <Table rows={rows} />
        )}
      </Box>
    </>
  );
};
