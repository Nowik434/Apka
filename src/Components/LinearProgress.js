import React from 'react'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


function BorderLinearProgressBar({value}) {

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'light' ? '#d2ab67' : '#308fe8',
        },
      }));


  return (
    <Box sx={{ flexGrow: 1 }}>
        <BorderLinearProgress variant="determinate" value={value}/>
    </Box>
  )
}

export default BorderLinearProgressBar