import React from 'react';

import Counter from '../../components/Counter/Counter';

export default {
  title: 'Components/Counter',
  component: Counter,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    defaultValue: {
      control: 'number',
      description: 'Default counter value',
      defaultValue: 2
    }
  }
};

const Template = (args) => <Counter {...args} />;

export const Default = Template.bind({});
