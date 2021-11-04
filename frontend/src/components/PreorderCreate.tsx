import { SetStateAction, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";


import { UsersInterface } from "../models/IUser";
import { ProductsInterface } from "../models/IProduct";
import { PaymentmethodsInterface } from "../models/IPaymentmethod";
import { PreorderInterface } from "../models/IPreorder";
import { TextField } from "@material-ui/core";




const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function PreorderCreate() {
  const classes = useStyles();
  const [users, setUsers] = useState<Partial<UsersInterface>>({});
  const [products, setProducts] = useState<ProductsInterface[]>([]);
  const [paymentmethods, setPaymentmethods] = useState<PaymentmethodsInterface[]>([]);
  const [preorder, setPreorder] = useState<Partial<PreorderInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof preorder;
    setPreorder({
      ...preorder,
      [name]: event.target.value,
    });
  };


  const getUsers = async () => {
    const uid = Number(localStorage.getItem("uid"));
    fetch(`${apiUrl}/user/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUsers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getProducts = async () => {
    fetch(`${apiUrl}/products`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPaymentmethods = async () => {
    fetch(`${apiUrl}/paymentmethods`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPaymentmethods(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getUsers();
    getProducts();
    getPaymentmethods();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      UserID: convertType(users?.ID),
      ProductID: convertType(preorder.ProductID),
      PaymentmethodID: convertType(preorder.PaymentmethodID),
      Amount: convertType(preorder.Amount),
    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/preorders`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
        }
      });
  }


  return (
    
<Container className={classes.container} maxWidth="md">

      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          สั่งจองสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          สั่งจองไม่สำเร็จ
        </Alert>
      </Snackbar>
      
      <br></br>

        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              สั่งจองสินค้า
            </Typography>
          </Box>
        </Box>
        <Divider />


        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สมาชิก</p>
              <Select
                native
                disabled
                value={preorder.UserID}
                // onChange={handleChange}
                // inputProps={{
                //   name: "UserID",
                // }}
              >
                <option aria-label="None" value="">
                    {users?.Email}
                  </option>
             
              </Select>
            </FormControl>
          </Grid>

        
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สินค้า</p>
              <Select
                native
                value={preorder.ProductID}
                onChange={handleChange}
                inputProps={{
                  name: "ProductID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสินค้า
                </option>
                {products.map((item: ProductsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

           <br></br>  

          <Grid item xs={6}>
             <FormControl fullWidth variant="outlined">
              <option aria-label="None" value="">
              จำนวนสินค้าที่ต้องการจอง
              </option>
              <br></br>  

            <TextField
              id="Amount"
              name="Amount"
              label="กรุณาใส่จำนวนสินค้าที่ต้องการจอง"
              type="number"
              variant="outlined"
              fullWidth
              multiline
              value={preorder.Amount || ""}
              onChange={handleChange}
            />
            </FormControl>
          </Grid>            
                
           
          
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ช่องทางการชำระเงิน</p>
              <Select
                native
                value={preorder.PaymentmethodID}
                onChange={handleChange}
                inputProps={{
                  name: "PaymentmethodID",
                }}
              >    
                <option aria-label="None" value="">
                  กรุณาเลือกช่องทางชำระเงิน
                </option>
                {paymentmethods.map((item: PaymentmethodsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Method}
                  </option>
                ))}
              </Select>
            </FormControl>
            </Grid>   

            <br></br>        

            <Button
              style={{ float: "left" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              สั่งจองสินค้า
            </Button>
           
    </Container>

  );
}

export default PreorderCreate;