import React from "react";

import './SelectFilter.scss'

const SelectFilter = ({filterOptions,currentSelectedType, onChange}) => {

    return (
            <label className="select-label">
                <span className="select-label-text">SORT BY:</span>
                <select className="select-component" value={currentSelectedType} onChange={(e) => onChange(e.target.value)}>
                    {filterOptions.map((option) => (
                        <option key={option.id} className="select-option" value={option.value}>{option.label}</option>
                    ))}
                </select>
            </label>
    )
}

export default SelectFilter;