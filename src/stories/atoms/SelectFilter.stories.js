import React, {useState} from "react";

import SelectFilter from './SelectFilter'

export default {
    title: 'atoms/SelectFilter',
    component: SelectFilter,
    argTypes: {
        filterOptions: {
            control: 'array',
            description: "Array of filter options",
            defaultValue: [
                {
                    label: 'RELEASE DATE',
                    value: 'date',
                },
                {
                    label: 'TITLE',
                    value: 'title',
                },
                
            ]
        },
        currentSelectedType: {
            control: 'text',
            description: "Current selected sort type",
            defaultValue: "title",
        }
    }
}

const Template = (args) => {
    const [currentItem, setCurrentItem] = useState(args.currentSelectedType);

    const handleChange = (value) => {
        setCurrentItem(value);
      };

    return <SelectFilter {...args} currentSelectedType={currentItem} onChange={handleChange}/>;
}


export const Default = Template.bind({});
