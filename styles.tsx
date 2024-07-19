import styled from "styled-components";
import {
  styled as muiStyled, alpha, FormLabel as MuiFormLabel, TextField,
  Button, OutlinedInputProps, TextFieldProps, Radio as MuiRadio,
  FormHelperText as FormHelper, Button as MuiButton
} from '@mui/material';

export const RedditTextField = muiStyled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    inputProps={{ maxLength: 10 }}
    InputLabelProps={{
      style: {
        color: 'black',
        fontFamily: 'FontRegular',
        fontWeight: 'normal',
      },
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    overflow: 'hidden',
    borderRadius: 4,
    paddingRight: 2,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1A2027',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: '#fff',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    },
  },
  width: '50%',
  backgroundColor: '#fff',
  mt: 1,
  "& input": {
    padding: '50px 10px',
    fontSize: '22px',
    fontFamily: 'FontDemiBold',
  },
  "& .MuiInputAdornment-root": {
    paddingLeft: '50px',
    fontSize: '10px',
  },
}));

export const StyledRadio = muiStyled(MuiRadio)(({ theme }) => ({
  '&.Mui-checked': {
    color: 'green',
  },
}));

export const FormHelperText = muiStyled(FormHelper)(({ theme }) => ({
  color: 'red'
}));

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  width: '35%',
  height: '55px',
  backgroundColor: '#027F4D',
  textTransform: 'capitalize',
  '&.MuiButton-root:hover': {
    backgroundColor: '#027F4D',
  },
}));

export const MainHeading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const FormLabel = muiStyled(MuiFormLabel)(({ theme }) => ({
  fontWeight: 'normal',
  fontSize: '18px',
  fontFamily: "FontDemiBold",
  color: 'black',
  '&.Mui-focused': {
    color: 'black',
  },
}));

export const MainContainer = styled.form`
  background-color: #f5f5f5;
  padding: 20px 40px;
  border-radius: 24px;
  background: #f8f8f8 0% 0% no-repeat padding-box;
  //   border-radius: 24px;
    background-image: url("./assets/calculator.svg");
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: bottom; /* Adjust the position here */
    background-size:400px 300px;
    //   height: 20%;
  //   padding: 3% 3% 3% 5%;
  //   display: flex;
  //   gap: 1rem;
  
    @media screen and (max-width: 768px) {
      background-image: none;
    }
`;

export const RadioContainer = styled.div`

`;
export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

export const ButtonsWrapper = styled.div`
padding: 25px 0px;
`;

export const SubDiv = styled.div`
padding: 20px 0px;

`;
