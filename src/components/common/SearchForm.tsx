import { css } from '@emotion/css';
import React, { ChangeEvent, useState, SyntheticEvent, useEffect } from 'react';
import commonStyleVariables from '../../styles/variables';

//////////////////////////
//  Consts and styles   //
//////////////////////////

const minSearchLength = 3;
const searchFormCss = css`
    margin: ${commonStyleVariables.margins.xs} 0;
`

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
    }, [props.value])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValue(value);
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        props.onSubmit?.(value);
    }
    
    return (
        <form className={searchFormCss} onSubmit={handleSubmit}>
            <input onChange={handleChange} placeholder={'Your search term...'} minLength={minSearchLength} value={value} />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;