import React from "react";
import { styled } from '@mui/material/styles';
import shadowLogo from '../assets/shadowLogo.png'

export const Logo = () => {
  const CustomizedLogo = styled('div')`
    width: 100%;
    height: 152px;

    background: url(${shadowLogo});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    flex: none;
    order: 0;
    flex-grow: 0;
    :hover {
      color: #2e8b57;
    }
  `;

  return <CustomizedLogo />;
};
