import React from 'react';

import Counter from './Counter';

export default {
  title: 'Components/Counter',
  component: Counter,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    defaultValue: {
      control: 'number',
      description: 'Default counter value',
      defaultValue: 2,
    },
  },
};

function Template(args) {
  return <Counter {...args} />;
}

export const Default = Template.bind({});
