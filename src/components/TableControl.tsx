import React, { FunctionComponent } from 'react';
import { Button, Inline } from '@sanity/ui';
import { AddIcon } from '@sanity/icons';

const TableControl: FunctionComponent<{
  create: () => any;
}> = (
  props,
) => {
  const padding = 3;
  const fontSize = 1;
  const space = 1;
  
    return (
      <Inline space={space}>
        <Button
          fontSize={fontSize}
          padding={padding}
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
