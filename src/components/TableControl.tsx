import React, { FunctionComponent } from 'react';
import { Button, Inline } from '@sanity/ui';
import { AddIcon } from '@sanity/icons';

const TableControl: FunctionComponent<{
  create: () => any;
}> = props => {
  return (
    <Inline space={1}>
      <Button
        fontSize={1}
        padding={3}
        icon={AddIcon}
        text="Create Table"
        tone="primary"
        mode="ghost"
        onClick={props.create}
      />
    </Inline>
  );
};

export default TableControl;
