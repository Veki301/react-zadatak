import { css } from '@emotion/css';
import React from 'react';

//////////////////////////
//  Consts and styles   //
//////////////////////////

const divCss = css`
  text-align: right;
`;

//////////////////
//  Interfaces  //
//////////////////

export interface ILabeledNumberDisplayOwnProps {
  prefix: string;
  number: number;
  suffix?: string;
}

//////////////////
//  Component   //
//////////////////

const LabeledNumberDisplay: React.FC<ILabeledNumberDisplayOwnProps> = (
  props
) => {
  return (
    <div className={divCss}>
      {props.prefix} {props.number} {props.suffix}
    </div>
  );
};

export default LabeledNumberDisplay;
