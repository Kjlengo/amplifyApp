import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Grid,
  Box,
  TextField,
  FormControl,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Container } from "@mui/system";
import { useFormik } from "formik";
import React, { useState } from "react"; 
import ButtonLogin from "../styled/ButtonLogin";
import { ReactComponent as FrontPanel } from "../images/front-panel.svg"
import {USERADMIN, PASSWORD} from '../consts/credentials';
import useAuthContext from '../hooks/useAuthContext';
import Alert from '@mui/material/Alert';
import * as yup from "yup";


export const Login = () => {
  const {login} = useAuthContext();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object({
    username: yup.string().required('El usuario es obligatorio'),
    password: yup.string().required('La contraseña es requerida'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => { 
      if(values.username === USERADMIN && values.password === PASSWORD){
        console.log("paso...")
        login();
        // auth.login(values.username, ()=>{
        //   navigate(from, {replace:true})
        // })
      }
      else {
        setErrorCredentials(true);
        setTimeout(()=>{
          setErrorCredentials(false);
        },2000)
      }
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  const [errorCredentials, setErrorCredentials] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Container maxWidth="xl">
      <Grid container columns={12} sx={{ height: "100vh" }}>
        <Box
          component={Grid}
          item
          lg={6}
          md={6}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
            bgcolor: "#ffffff",
          }}
        >
          <Box
            sx={{
              color: "#002855",
              height: "100%",
              display: "flex",
              alignItems : "center"
            }}
          >
            <Box sx={{
              width: "100%",
            }}>
              <FrontPanel />
            </Box>
          </Box>
        </Box>
        <Box component={Grid} item lg={6} md={6} xs={12}>
          <Box
            sx={{
              color: "#002855",
              height: "100%",
            }}
          >
            <Container
              sx={{
                height: "100%"
              }}
            >
              <Stack spacing={3}
                alignItems={"normal"}
                justifyContent={"center"}
                direction={"column"}
                sx={{
                  height: "100%"
                }}
              >
                <Box
                  component="img"
                  src="https://uploads-ssl.webflow.com/62163e8c328ad285342080f0/621642b049155333353ec220_logo.svg"
                  sx={{
                    height: 100,
                    width: 200,
                    maxHeight: {},
                    maxWidth: {},
                    margin: "0 auto"
                  }}
                />
                <Box component="span"
                  sx={{
                    fontSize : 22,
                    mt: 3,
                    color: "#d3d3d3",
                    fontWeight: "400",
                    textAlign: "center"
                  }}
                >
                  Bienvenido
                </Box>

                <Box
                  component="span"
                  sx={{
                    fontSize: 34,
                    fontWeight: 600,
                    textAlign: "center"
                  }}
                >
                  Iniciar Sesion
                </Box>

                <Box component={"form"} onSubmit={formik.handleSubmit}>
                  <Stack spacing={6}>
                    <FormControl>
                      <TextField
                        label="Usuario"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                      />
                    </FormControl>
                    <FormControl>
                      <TextField
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    </FormControl>
                    <ButtonLogin variant="contained" type="submit" disableRipple>Iniciar sesion</ButtonLogin>

                    <FormControl>
                        {errorCredentials? (
                        <Alert severity="error">Usuario o password incorrecto</Alert>
                        ): null }
                    </FormControl>

                  </Stack>
                </Box>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
};