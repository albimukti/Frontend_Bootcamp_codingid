import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, DialogActions, Stack, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const primary = createTheme({
    palette: {
      primary: {
        main: '#5B4947'
      },
    },
  });

  const secondary = createTheme({
    palette: {
      primary: {
        main: '#FABC1D'
      },
    },
  });

const payments = [
  {type : 'Gopay', image : 'Gopay.png'},
  {type : 'Ovo', image : 'Ovo.png'},
  {type : 'Dana', image : 'Dana.png'},
  {type : 'Mandiri', image : 'Mandiri.png'},
  {type : 'BCA', image : 'BCA.png'},
  {type : 'BNI', image : 'BNI.png'}
]

const PaymentMethod = (props) => {
  const { onClose, selectedValue, open } = props;
  const [selectedPayment, setSelectedPayment] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate()

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value, index) => {
    setSelectedPayment(value)
    setSelectedIndex(index)
  };

  const handlePayNow = () => {
    console.log(selectedPayment);
    navigate('/success-purchase')
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{fontWeight:'bold', px:7, pb:0}}>Select Payment Method</DialogTitle>
      <List sx={{ px:1 }}>
        {payments.map((item, index) => (
          <ListItem sx={{py:0}} disableGutters key={index}>
            <ListItemButton selected={selectedIndex === index} onClick={() => handleListItemClick(item.type, index)}>
              <Box component='img' sx={{height:'50px'}} src = {`/images/Soup Image/Payment Methods/${item.image}`}/>
              <ListItemText sx={{px:2}} primary={item.type} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <DialogActions sx={{justifyContent:'center', py:2}}>
        <Stack direction={{lg:'row', xs:'column'}} spacing={2}>
          <ThemeProvider theme={primary}>
            <Button sx={{px:4, borderRadius:2}} variant='outlined' onClick={handleClose}>Cancel</Button>
          </ThemeProvider>
          <ThemeProvider theme={secondary}>
            <Button sx={{px:4, borderRadius:2, color:primary}} variant='contained' onClick={handlePayNow}>Pay Now</Button>
          </ThemeProvider>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentMethod
