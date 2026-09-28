'use client'

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '1rem 100px',
  width : '100%',
  border: '1px solid',
  lineHeight: 1.5,
  outline : 'none',
  backgroundColor: '#3c6553',
  borderColor: '#3c6553',
  borderRadius : '50px',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#335647',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#335647',
    borderColor: '#335647',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(64, 255, 185, 0.5)',
    backgroundColor: '#335647',
  },
});

type Prop = {
    text : string,
    onClick ?: any
}

export default function SubmitButton({text, onClick} : Prop) {
  return (
    <BootstrapButton  onClick={onClick} variant="contained" disableRipple type='submit'>
        {text}
    </BootstrapButton>
  );
}
