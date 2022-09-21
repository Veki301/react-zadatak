import { css } from '@emotion/css';
import React, { PropsWithChildren } from 'react';
import commonStyleVariables from '../../styles/variables';

//////////////////////////
//  Consts and styles   //
//////////////////////////

const appLayoutCss = css`
  text-align: center;
  margin: ${commonStyleVariables.margins.small} 15vw;
  padding: ${commonStyleVariables.paddings.small} 0;
`;

//////////////////
//  Interfaces  //
//////////////////

export interface IAppLayoutOwnProps {}

//////////////////
//  Component   //
//////////////////

const AppLayout: React.FC<PropsWithChildren<IAppLayoutOwnProps>> = (props) => {
  return <div className={appLayoutCss}>{props.children}</div>;
};

export default AppLayout;
