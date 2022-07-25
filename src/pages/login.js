import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Grid,
  Paper,
  Box,
  TextField,
  FormControl,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Container } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react"; 
import ButtonLogin from "../styled/ButtonLogin";
import { ReactComponent as FrontPanel } from "../images/front-panel.svg"
import * as yup from "yup";


export const Login = () => {
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
    validationSchema
  })

  const {handleSubmit, 
    errors, 
    touched, 
    getFieldProps, 
    dirty, 
    isValid,
    values,
    handleChange} = formik

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword);
const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // const { handleSubmit, values, errors, touched, handleChange } = useFormik({
  //   initialValues,
  // });
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

                <Box component={"form"} onSubmit={handleSubmit}>
                  <Stack spacing={6}>
                    <FormControl>
                      <TextField
                        label="Usuario"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        error={errors.username ? true : false}
                        helperText={errors.username && touched.username ? `${errors.username}`: null}
                                  {...getFieldProps('username')}
                      />
                    </FormControl>
                    <FormControl>
                      <TextField
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password ? true : false}
                        helperText={errors.password && touched.password ? `${errors.password}`: null}
                                  {...getFieldProps('password')}
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
                    <ButtonLogin variant="contained" disableRipple>Iniciar sesion</ButtonLogin>
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