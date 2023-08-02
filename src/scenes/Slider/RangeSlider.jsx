import React from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const RangeSlider = ({ data }) => {
  const formatDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const formatPercentage = (percentage) => {
    return parseFloat(percentage).toFixed(2);
  };

  const getBackgroundColor = (value) => {
    if (value >= 70) {
      return '#4CAF50'; // Green color
    } else if (value >= 40) {
      return '#FFC107'; // Yellow color
    } else {
      return '#F44336'; // Red color
    }
  };

  // Define custom colors for the Slider
  const theme = createTheme({
    components: {
      MuiSlider: {
        styleOverrides: {
          root: {
            height: 4,
            color: 'transparent', // Set the slider track color to transparent
          },
          thumb: {
            height: 20,
            width: 20,
            backgroundColor: 'white', // Set the thumb color to white
            border: '2px solid currentColor',
            '&:hover': {
              boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.16)',
            },
            '&.Mui-active': {
              boxShadow: '0px 0px 0px 14px rgba(255, 255, 255, 0.16)',
            },
          },
          rail: {
            opacity: 0.38, // Set the rail (track) color to a semi-transparent color
            height: 4,
            borderRadius: 2,
          },
          track: {
            height: 4,
            borderRadius: 2,
            backgroundColor: 'currentColor', // Set the background color of the slider track based on the value using getBackgroundColor
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box className="container mx-auto my-auto py-2 px-2 bg-[#E7F1FA]">
        <div className="form-group" style={{ width: '100%', height: 'auto', fontFamily: 'Poppins' }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Date: {formatDate(data.Date)}
          </Typography>

          <label htmlFor={`rangeSlider-${data.id}-1`} style={{ marginTop: '10px' }}>
            Technical
          </label>
          <div>
            <Slider
              value={data.Tech_Prec?.toFixed(2)}
              max={100}
              valueLabelDisplay="auto"
              aria-label={`Technical - ${formatPercentage(data.Tech_Prec)}%`}
              sx={{ '& .MuiSlider-track': { backgroundColor: getBackgroundColor(data.Tech_Prec) } }}
            />
          </div>
          <span style={{ fontWeight: 'bold', float: 'right' }}>
            {data.Tech_Prec && formatPercentage(data?.Tech_Prec)}%
          </span>

          <label htmlFor={`rangeSlider-${data.id}-2`}>Aptitude</label>
          <div>
            <Slider
              value={data.Apti_Prec.toFixed(2)}
              max={100}
              valueLabelDisplay="auto"
              aria-label={`Aptitude - ${formatPercentage(data.Apti_Prec)}%`}
              sx={{ '& .MuiSlider-track': { backgroundColor: getBackgroundColor(data.Apti_Prec) } }}
            />
          </div>
          <span style={{ fontWeight: 'bold', float: 'right' }}>{formatPercentage(data.Apti_Prec)}%</span>

          <label htmlFor={`rangeSlider-${data.id}-3`}>English</label>
          <div>
            <Slider
              value={data.English_Prec.toFixed(2)}
              max={100}
              valueLabelDisplay="auto"
              aria-label={`English - ${formatPercentage(data.English_Prec)}%`}
              sx={{ '& .MuiSlider-track': { backgroundColor: getBackgroundColor(data.English_Prec) } }}
            />
          </div>
          <span style={{ fontWeight: 'bold', float: 'right' }}>{formatPercentage(data.English_Prec)}%</span>
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default RangeSlider;