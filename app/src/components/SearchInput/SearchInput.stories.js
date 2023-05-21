import React from 'react';
import SearchInput from './SearchInput';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    defaultValue: {
      control: {
        type: 'text',
        defaultValue: '',
      },
    },
    onSearch: {
      action: 'searched',
    },
  },
};

function Template(args) {
  return <SearchInput {...args} />;
}

export const Default = Template.bind({});
Default.args = {};
