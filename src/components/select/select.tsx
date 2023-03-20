import React from 'react';
type TSearchProps = {
    name: string
    options: string[];
    labelText: string;
    handleSelect: () => void;
};
const Select = (props: TSearchProps) => {
    const { name, options, labelText, handleSelect } = props;

    return (
        <div>
            <label >{labelText}
                <select name={name} onChange={handleSelect} >
                    {options.map((item, i) => <option key={i}>{item}</option>)}
                </select>
            </label>
        </div>
    );
};

export default Select;