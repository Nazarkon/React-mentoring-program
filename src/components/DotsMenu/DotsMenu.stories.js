import React from "react";

import DotsMenu from "./DotsMenu";

export default {
  title: "Components/DotsMenu",
  component: DotsMenu,
  argTypes: {},
};

function Template(args) {
  return <DotsMenu {...args} />;
}

export const Default = Template.bind({});
