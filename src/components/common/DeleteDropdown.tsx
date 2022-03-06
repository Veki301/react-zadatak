import React from 'react';

//////////////////////////
//  Consts and styles   //
//////////////////////////

//////////////////
//  Interfaces  //
//////////////////

export interface IDeleteDropdownOwnProps {
    dropdownOptions: IDropdownOption[];
    onDelete: (id: string) => void;
}

export interface IDropdownOption {
    id: string;
    name: string;
}

//////////////////
//  Component   //
//////////////////

/** Delete dropdown component */
const DeleteDropdown: React.FC<IDeleteDropdownOwnProps> = (props) => {
    const handleChange = () => {
        // next.js logger is unhappy select is uncontrolled, but we are keeping value "message" fixed to have desired design
        // so logger gets what he asks for
    }

    return (
        props.dropdownOptions.length ?
        <select value="message" onChange={handleChange}>
            <option hidden value="message">Delete category</option>
            {
                props.dropdownOptions.map((option) => {
                    return <option key={option.id} onClick={() => props.onDelete(option.id)}>{option.name}</option>
                })
            } 
        </select>
        :
        null
    );
}

export default DeleteDropdown;