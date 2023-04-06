import React from "react";
import SearchInput from "./SearchInput";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {
    defaultValue: {
      control: {
        type: "text",
        defaultValue: "",
      },
    },
    onSearch: {
      action: "searched",
    },
  },
};

const Template = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {};