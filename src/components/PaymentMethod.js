import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, DialogActions, Stack, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth';

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

const PaymentMethod = (props) => {
  const { onClose, selectedValue, open, totalPrice, totalCourse, orderDetail } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedPayment, setSelectedPayment] = useState()
  const [paymentItem, setPaymentItem] = useState([])
  const navigate = useNavigate()
  const { payload, isLoggedIn } = useAuth()

  useEffect(() => {
    payments()
    if (isLoggedIn) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
    } else {
      return navigate('/login')
    }
  },[])

  const payments = () => {
    axios.get(process.env.REACT_APP_API_URL + '/Payment/GetActivePayments')
    .then(res => setPaymentItem(res.data))
    .catch(error => console.log(error))
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value, index) => {
    setSelectedIndex(index)
    setSelectedPayment(value)
  };

  const handleCheckout = async () => {
    const createOrder = {
      total_course : totalCourse,
      total_price : totalPrice,
      fk_id_payment : selectedPayment
    }

    let dataOrder

    await axios.post(process.env.REACT_APP_API_URL + '/Order/CreateOrder', createOrder)
    .then(res => {
      dataOrder = orderDetail.map((item) => ({
        fk_id_order: res.data.id_order,
        fk_id_schedule: item.id_schedule
      }));
    })
    .catch(error => console.log(error))

    const axiosPromises = dataOrder && dataOrder.map((item) => {
      return axios.post(process.env.REACT_APP_API_URL + '/OrderDetail/AddOrderDetail', item, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });

    try {
      const responses = await Promise.all(axiosPromises);

      responses.forEach((res) => {
        console.log(res.status);
      });
    } catch (error) {
      console.error(error);
    }

    orderDetail.forEach((item) => {
      axios.delete(process.env.REACT_APP_API_URL + `/Cart/DeleteCart?id_cart=${item.id_cart}`)
      .then(res => console.log(res.status))
      .catch(error => {
          console.error(error);
      })
    })
    
    navigate('/success-purchase')
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{fontWeight:'bold', px:7, pb:0}}>Select Payment Method</DialogTitle>
      <List sx={{ px:1 }}>
        {paymentItem && paymentItem.map((item, index) => (
          <ListItem sx={{py:0}} disableGutters key={index}>
            <ListItemButton selected={selectedIndex === index} onClick={() => handleListItemClick(item.id_payment, index)}>
              <Box component='img' sx={{height:'50px'}} src={`data:image/png;base64,${item.logo}`}/>
              <ListItemText sx={{px:2}} primary={item.payment_name} />
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
            <Button sx={{px:4, borderRadius:2, color:primary}} variant='contained' onClick={handleCheckout}>Pay Now</Button>
          </ThemeProvider>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

PaymentMethod.propTypes = {
  onClose: PropTypes.func.isRequired, 
  selectedValue: PropTypes.func, 
  open: PropTypes.bool.isRequired, 
  totalPrice: PropTypes.number.isRequired, 
  totalCourse: PropTypes.number.isRequired, 
  orderDetail: PropTypes.array.isRequired
}

export default PaymentMethod
