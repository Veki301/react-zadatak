import React, { SyntheticEvent } from 'react';

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
  const handleChange = (e: SyntheticEvent<HTMLSelectElement>) => {
    props.onDelete(e.currentTarget.value);
  };

  return props.dropdownOptions.length ? (
    <select value="message" onChange={handleChange}>
      <option hidden value="message">
        Delete category
      </option>
      {props.dropdownOptions.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </select>
  ) : null;
};

export default DeleteDropdown;
