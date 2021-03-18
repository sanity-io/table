interface RootProps {
  level: number;
  markers: any[];
  type: {
    title: string;
    description: string;
    options: Record<string, any>;
  };
  value: {
    rows: TableRow[];
  };
  onChange: (...any) => any;
}

interface TableRow {
  _type: string;
  _key: string;
  cells: string[];
}