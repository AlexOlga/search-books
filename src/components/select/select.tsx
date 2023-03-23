import React from 'react';
import { type Filter, type Order } from '../../baseTypes';
import './select.scss';
type TSearchProps = {
    name: string
    options: string[];
    labelText: string;
    value: Order | Filter;
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
const Select = (props: TSearchProps) => {
    const { name, options, labelText, handleSelect,value } = props;   
    return (
        <div className='select__contener'>
            <label className='select__label' >{labelText}
                <select className='select' defaultValue={value}  name={name} onChange={handleSelect} >
                    {options.map((item, i) => <option key={i} value={item}  >{item}</option>)}
                </select>
            </label>
        </div>
    );
};

export default Select;