import { css } from '@emotion/css';
import React, { ChangeEvent, useState, SyntheticEvent, useEffect } from 'react';
import commonStyleVariables from '../../styles/variables';

//////////////////////////
//  Consts and styles   //
//////////////////////////

const minSearchLength = 3;
const searchFormCss = css`
  display: flex;
  margin: ${commonStyleVariables.margins.large} auto;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
`;
const inputCss = css`
  height: 100%;
  width: 100%;
  padding: 0 ${commonStyleVariables.paddings.large};
  border: none;
  &:focus {
    outline: none;
  }
`;
const buttonCss = css`
  height: 100%;
  padding: 0 20px;
  border: none;
  color: white;
  background-color: lightblue;
  &:hover {
    cursor: pointer;
  }
`;

//////////////////
//  Interfaces  //
//////////////////

export interface ISearchFormOwnProps {
  value?: string;
  onSubmit?: (data?: string) => void;
}

//////////////////
//  Component   //
//////////////////

const SearchForm: React.FC<ISearchFormOwnProps> = (props) => {
  const [value, setValue] = useState(props.value ?? '');

  useEffect(() => {
    if (!props.value) return;
    setValue(props.value);
  }, [props.value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    props.onSubmit?.(value);
  };

  return (
    <form className={searchFormCss} onSubmit={handleSubmit}>
      <input
        className={inputCss}
        onChange={handleChange}
        placeholder={'...search article title or excerpt...'}
        minLength={minSearchLength}
        required={true}
        value={value}
      />
      <button className={buttonCss} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
