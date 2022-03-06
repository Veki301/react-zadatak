import { css } from '@emotion/css';
import React from 'react';
import commonStyleVariables from '../../styles/variables';

//////////////////////////
//  Consts and styles   //
//////////////////////////

const appLayoutCss = css`
    text-align: center;
    margin: ${commonStyleVariables.margins.small} ${commonStyleVariables.margins.large};
    padding: ${commonStyleVariables.paddings.small} 0;
`

//////////////////
//  Interfaces  //
//////////////////

export interface IAppLayoutOwnProps {}

//////////////////
//  Component   //
//////////////////

const AppLayout: React.FC<IAppLayoutOwnProps> = (props) => {
    return (
        <div className={appLayoutCss}>
            {props.children}
        </div>
    );
}

export default AppLayout;