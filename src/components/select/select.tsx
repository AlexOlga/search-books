import React from 'react';
import './select.scss';
type TSearchProps = {
    name: string
    options: string[];
    labelText: string;
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
const Select = (props: TSearchProps) => {
    const { name, options, labelText, handleSelect } = props;

    return (
        <div className='select__contener'>
            <label className='select__label' >{labelText}
                <select className='select' name={name} onChange={handleSelect} >
                    {options.map((item, i) => <option key={i}>{item}</option>)}
                </select>
            </label>
        </div>
    );
};

export default Select;