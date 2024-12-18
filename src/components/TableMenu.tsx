import { AddIcon, ControlsIcon, WarningOutlineIcon } from '@sanity/icons';
import {
  Box,
  Button,
  Card,
  Dialog,
  Inline,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Placement,
  TextInput,
} from '@sanity/ui';
import { type FormEventHandler, useState } from 'react';

interface TableMenuProps {
  addColumns: (count: number) => void;
  addColumnAt: (index: number) => void;
  addRows: (count: number) => void;
  addRowAt: (index: number) => void;
  remove: () => void;
  placement: Placement;
}

export const TableMenu = (props: TableMenuProps) => {
  const { remove: handleRemove } = props;
  const [dialog, setDialog] = useState<{
    type: string;
    callback: (count: number) => void;
  } | null>(null);

  const [count, setCount] = useState<string | undefined>('');

  const updateCount: FormEventHandler<HTMLInputElement> = e => {
    setCount(e.currentTarget.value);
  };

  const addRows = () => {
    setDialog({ type: 'rows', callback: c => props.addRows(c) });
  };

  const addRowAt = () => {
    setDialog({ type: 'rows', callback: index => props.addRowAt(index) });
  };

  const addColumns = () => {
    setDialog({
      type: 'columns',
      callback: c => props.addColumns(c),
    });
  };

  const addColumnsAt = () => {
    setDialog({ type: 'columns', callback: index => props.addColumnAt(index) });
  };

  const onConfirm = () => {
    const parsedCount = parseInt(count ?? '0', 10);

    if (parsedCount < 100) {
      setDialog(null);
      dialog?.callback(parsedCount);
      setCount(undefined);
    }
  };

  return (
    <>
      {dialog && (
        <Dialog
          header={`Add ${dialog.type}`}
          id="dialog-add"
          onClose={() => setDialog(null)}
          zOffset={1000}
        >
          <Card padding={4}>
            <TextInput
              style={{ textAlign: 'left' }}
              fontSize={2}
              padding={3}
              type="number"
              value={count}
              onChange={updateCount}
            />
            <Box marginTop={4}>
              <Inline space={1} style={{ textAlign: 'right' }}>
                <Button
                  text="Cancel"
                  mode="ghost"
                  onClick={() => setDialog(null)}
                />
                <Button text="Confirm" tone="critical" onClick={onConfirm} />
              </Inline>
            </Box>
          </Card>
        </Dialog>
      )}
      <MenuButton
        button={
          <Button icon={ControlsIcon} fontSize={1} padding={2} mode="ghost" />
        }
        id="menu-button-example"
        menu={
          <Menu>
            <MenuItem
              icon={AddIcon}
              fontSize={1}
              text="Add Row(s)"
              onClick={addRows}
            />
            <MenuItem
              icon={AddIcon}
              fontSize={1}
              text="Add Row At Index"
              onClick={addRowAt}
            />
            <MenuItem
              icon={AddIcon}
              fontSize={1}
              text="Add Column(s)"
              onClick={addColumns}
            />
            <MenuItem
              icon={AddIcon}
              fontSize={1}
              text="Add Column At Index"
              onClick={addColumnsAt}
            />
            <MenuDivider />
            <MenuItem
              icon={WarningOutlineIcon}
              fontSize={1}
              text="Remove"
              tone="critical"
              onClick={handleRemove}
            />
          </Menu>
        }
        popover={{ placement: props.placement }}
      />
    </>
  );
};
