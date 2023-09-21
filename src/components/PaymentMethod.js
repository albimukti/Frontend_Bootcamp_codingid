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
import axios from 'axios';
import PropTypes from 'prop-types'

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
  const { onClose, selectedValue, open, totalPrice, totalCourse, orderDetail } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const id_user = 'd4e2a410-fd73-4e39-8ed2-9a14c9d9f6a9'
  const navigate = useNavigate()

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value, index) => {
    setSelectedIndex(index)
  };
  
  const scheduleConvert = (date) => {

    // Pisahkan tanggal dan waktu menggunakan spasi
    var parts = date.split(" ");

    // Pisahkan tanggal menjadi bagian-bagian
    var tanggalParts = parts[0].split("/");

    // Reformat tanggal menjadi format yang diinginkan (YYYY-MM-DD)
    var schedule = tanggalParts[2] + "-" + tanggalParts[1] + "-" + tanggalParts[0];

    return schedule// Output: 2022-07-27
  }

  const handleCheckout = async () => {
    const createOrder = {
      id_order : 0,
      date_create : new Date().toISOString(),
      total_course : totalCourse,
      total_price : totalPrice,
      fk_id_user : id_user,
      fk_id_payment : selectedIndex + 1
    }

    let dataOrder

    await axios.post(process.env.REACT_APP_API_URL + '/Order/CreateOrder', createOrder)
    .then(res => {
      dataOrder = orderDetail.map((item) => ({
        id_detail: 0,
        schedule: scheduleConvert(item.schedule),
        fk_id_order: res.data.id_order,
        fk_id_menu: item.id_menu
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
            <Button sx={{px:4, borderRadius:2, color:primary}} variant='contained' onClick={handleCheckout}>Pay Now</Button>
          </ThemeProvider>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

PaymentMethod.propTypes = {
  onClose: PropTypes.func, 
  selectedValue: PropTypes.func, 
  open: PropTypes.bool, 
  totalPrice: PropTypes.number.isRequired, 
  totalCourse: PropTypes.number.isRequired, 
  orderDetail: PropTypes.array.isRequired
}

export default PaymentMethod
