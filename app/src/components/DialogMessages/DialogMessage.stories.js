import React from 'react';

import DialogMessage from './DialogMessage';

export default {
  title: 'Components/DialogMessage',
  component: DialogMessage,
  argTypes: {
    message: {
      control: 'text',
      defaultValue: 'Are you sure you want to delete this movie?',
      description: 'Text in dialog message',
    },
    buttonText: {
      control: 'text',
      defaultValue: 'Confirm',
      description: 'Button Text',
    },
    title: {
      control: 'text',
      defaultValue: 'CONGRATULATION!',
    },
    isDelete: {
      control: 'boolean',
      defaultValue: false,
    },
    handleConfirm: {
      action: 'clicked',
    },
  },
};

const divStyle = {
  maxWidth: '360px',
  backgroundColor: '#E4E4E4',
};

function Template(args) {
  return (
    <div style={divStyle}>
      <DialogMessage {...args} />
      {' '}
    </div>
  );
}

export const Default = Template.bind({});
