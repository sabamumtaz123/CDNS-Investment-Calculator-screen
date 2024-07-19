import React, { useEffect, useState } from "react";
import Layout from "../../../components/AppLayout";
import {
  MainHeading, MainContainer, SubDiv, Label,
  ButtonsWrapper, RadioContainer, 
  // RedditTextField,
  FormLabel, StyledRadio, FormHelperText,StyledButton
} from "./styles";
import {
  Button, MenuItem, OutlinedInputProps, Select, SelectChangeEvent, TextField, TextFieldProps, alpha, styled,
} from "@mui/material";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const RedditTextField = styled((props: TextFieldProps) => (
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

export const InvestmentCalculatorScreen1 = () => {
  const [tenure, setTenure] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      tenureInMonths: '',
      investmentAmount: '',
      nature: 'conventional',
    },
    validationSchema: Yup.object().shape({
      tenureInMonths: Yup.string().required("Required*"),
      investmentAmount: Yup.number().transform((_value, originalValue) => Number(originalValue.replace(/,/g, '')))
        .required("Required*")
        .min(100, "Investment Amount must be greater or equal to 100")
        .max(99999999, "Investment Amount must be less or equal to 99,999,999"),
    }),
    onSubmit: (values) => {
      const transferValues = {
        tenureInMonths: values.tenureInMonths,
        investmentAmount: values.investmentAmount,
        nature: values.nature,
      };
      console.log("transferValues", transferValues);
      navigate('/review-investment-calculator', {
        state: {
          transferValues: transferValues
        },
      });
    },
  });
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/,/g, ''); // Remove existing commas
    const re = /^[0-9]+$/;
    if (inputValue === "" || re.test(inputValue)) {
      const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
      formik.setFieldValue("investmentAmount", formattedValue);
    }
  };

  const [nature, setNature] = useState('conventional');
  const handleChange = (event: any) => {
    setNature(event.target.value);
    formik.setFieldValue("nature", event.target.value); // Update the formik value

  };

  useEffect(() => {
    formik.setFieldValue("tenureInMonths", tenure);
  }, [tenure]);
  return (
    <Layout>
      <MainHeading>Investment Calculator</MainHeading>
      <MainContainer onSubmit={formik.handleSubmit}>
        <RadioContainer>
          <FormControl>
            <FormLabel
              id="nature">
              Scheme
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="nature"
              name="nature"
              value={nature}
              onChange={handleChange}
            >
              <FormControlLabel
                value="conventional"
                control={
                  <StyledRadio />

                }
                label="Conventional"
              />
              <FormControlLabel
                value="islamic"
                control={
                  <StyledRadio />

                }
                label="Islamic"
              />
              <FormControlLabel
                value="any"
                control={
                  <StyledRadio />

                }
                label="Any"
              />
            </RadioGroup>
          </FormControl>
          <SubDiv>
            <Label>Investing Tenure</Label>
            <Select
              labelId="tenureInMonths"
              id="tenureInMonths"
              name="tenureInMonths"
              value={formik.values.tenureInMonths}
              error={
                !!formik.errors.tenureInMonths && !!formik.touched.tenureInMonths
              }
              onChange={(event: SelectChangeEvent<string>) =>
                setTenure(event.target.value)
              }
              sx={{ width: "50%", backgroundColor: "#fff" }}
            >
              <MenuItem key={3} value="3">3 Months</MenuItem>
              <MenuItem key={6} value="6">6 Months</MenuItem>
              <MenuItem key={12} value="12">1 Years</MenuItem>
              <MenuItem key={36} value="36">3 Years</MenuItem>
              <MenuItem key={60} value="60">5 Years</MenuItem>
              <MenuItem key={120} value="120">10 Years</MenuItem>
              <MenuItem key={0} value="120">Others</MenuItem>
            </Select>
            <FormHelperText>
              {!!formik.errors.tenureInMonths &&
                !!formik.touched.tenureInMonths &&
                formik.errors.tenureInMonths}
            </FormHelperText>
          </SubDiv>
          <Label>Investment Amount</Label>
          <RedditTextField
            variant="outlined"
            id="investmentAmount"
            name="investmentAmount"
            value={formik.values.investmentAmount}
            onChange={handleNumberChange}
            onBlur={formik.handleBlur}
            error={
              !!formik.errors.investmentAmount && !!formik.touched.investmentAmount
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">PKR.</InputAdornment>
              ),

            }}
          />
          <FormHelperText>
            {!!formik.errors.investmentAmount &&
              !!formik.touched.investmentAmount &&
              formik.errors.investmentAmount}
          </FormHelperText>
          <ButtonsWrapper>
            <StyledButton
              variant="contained"
              type="submit"
            >
              Calculate
            </StyledButton>
          </ButtonsWrapper>
        </RadioContainer>

      </MainContainer>
    </Layout>
  );
};

export default InvestmentCalculatorScreen1;
