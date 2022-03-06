import React from 'react';

//////////////////////////
//  Consts and styles   //
//////////////////////////

//////////////////
//  Interfaces  //
//////////////////

export interface ILabeledNumberDisplayOwnProps {
    label: string;
    number: number;
}

//////////////////
//  Component   //
//////////////////

const LabeledNumberDisplay: React.FC<ILabeledNumberDisplayOwnProps> = (props) => {
    return <div>{props.label} {props.number}</div>
}

export default LabeledNumberDisplay;