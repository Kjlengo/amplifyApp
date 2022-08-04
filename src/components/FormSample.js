import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Button } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from "moment";

import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';

import { descargaService } from "./../services/descarga";


export default function BasicTextFields() {

  const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef();

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  const handleClickQuery = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== 'idle') {
      setQuery('idle');
      return;
    }

    setQuery('progress'); 
    await enviarDatos();

    timerRef.current = window.setTimeout(() => {
      setQuery('idle');
      formik.resetForm();
    }, 8000);
  };

  const enviarDatos = async () => {
      const pais = formik.values.pais;
      const fecha1 = formik.values.fechaInicio;
      const fecha2 = formik.values.fechaFin;
      const idCampanya = formik.values.campana;
      const cantidad = formik.values.cantidad;
      const email = formik.values.email;
      const descarga = {idCampanya,  fecha1, fecha2, pais ,cantidad, email}
      
      setTimeout(async () => {
        try{
          let descargaR = await descargaService.create(descarga);
          console.log(descargaR);
          setQuery('success');
        }catch(err){
          console.log(err);
          setQuery('error');
        }
      }, 2000);
      
  }

  const initialValues = {
    pais: "",
    campana: "",
    fechaInicio: "",
    fechaFin: "",
    cantidad: "",
    email: "",
  };

  const validationSchema = yup.object({
    pais: yup.string().required("El pais es obligatorio"),
    campana: yup.string().required("La Campaña es requerida"),
    fechaInicio: yup.date().nullable()
              .min(new Date('01-01-2000'))
              .max(new Date())
              .required("La fecha de inicio es requerida"),
    fechaFin: yup.date().nullable()
              .min(yup.ref('fechaInicio'), "Fecha Fin menor a fecha inicio")
              .max(new Date() , "La fecha fin no puede ser mayor a la fecha y hora actual")
              .required("La fecha de Fin es requerida")
              .when("fechaInicio",
                    (fechaInicio, yup) => fechaInicio && yup.max(moment(fechaInicio).add(2,'days'), "Maximo 2 dias de descargas")),
    cantidad: yup.number().max(2000, "La cantidad no puede superar las 2000 descargas").required("la campaña es requerida").positive("la cantidad debe ser positiva").integer(),
    email: yup.string().email('Ingrese un email valido').required('El email es requerido'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => { 
      handleClickQuery();
      
    },
  });

  return (
    <Box
      display="flex"
      sx={{'& > :not(style)': { m: 1, width: '50ch' },}}
      autoComplete="off"
      justifyContent="center"
      component = "form"
      onSubmit={formik.handleSubmit}      
    >
      
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
    
        <Grid container item justifyContent="center" alignItems="center">
          <h1> Descarga de Grabaciones</h1>
        </Grid>
        
        <Grid item >
          <Box >
            <FormControl sx={{ minWidth: 260 }} size="medium">
              <InputLabel id="demo-simple-select-label">Pais</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="pais"
                  label="Pais"
                  value={formik.values.pais}
                  onChange={formik.handleChange}
                  error = {formik.touched.pais && Boolean(formik.errors.pais)}
                  helperText={formik.touched.pais && formik.errors.pais}
                >
                  <MenuItem value={"España"}>España</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item>
          <TextField 
            sx={{ minWidth: 260 }}
            id="filled-basic" 
            label="ID Campaña" 
            type="number" 
            name="campana" 
            variant="outlined" 
            value={formik.values.campana}
            onChange={formik.handleChange}
            error = {formik.touched.campana && Boolean(formik.errors.campana)}
            helperText={formik.touched.campana && formik.errors.campana}
          />
        </Grid>  

        <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disableFuture
                renderInput={(props) => <TextField {...props} 
                                          error = {formik.touched.fechaInicio && Boolean(formik.errors.fechaInicio)}
                                          helperText={formik.touched.fechaInicio && formik.errors.fechaInicio} />}
                label="Fecha Inicio"
                value={formik.values.fechaInicio}
                name="fechaInicio"
                onChange={(value) => {
                  formik.setFieldValue('fechaInicio', moment(value).format("YYYY-MM-DD HH:mm:ss"));
                  }}
                
              />
            </LocalizationProvider>         
        </Grid>

        <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disableFuture
                renderInput={(props) => <TextField {...props} 
                                        error = {formik.touched.fechaFin && Boolean(formik.errors.fechaFin)}
                                        helperText={formik.touched.fechaFin && formik.errors.fechaFin}/>}
                label="Fecha Fin"
                value={formik.values.fechaFin}
                name="fechaFin"
                onChange={(value) => {
                  formik.setFieldValue('fechaFin', moment(value).format("YYYY-MM-DD HH:mm:ss"));
                  }}
              />  
            </LocalizationProvider>
        </Grid>       

        <Grid item>
          <TextField
            sx={{minWidth: 260 }} 
            id="cantidadID" 
            label="Cantidad" 
            name="cantidad"
            variant="outlined"
            type="number" 
            value={formik.values.cantidad}
            onChange={formik.handleChange}
            error = {formik.touched.cantidad && Boolean(formik.errors.cantidad)}
            helperText={formik.touched.cantidad && formik.errors.cantidad}
          />
        </Grid>
        
        <Grid item>
          <TextField
              sx={{minWidth: 260 }} 
              id="emailId" 
              label="Email" 
              name="email"
              variant="outlined"
              type="email" 
              value={formik.values.email}
              onChange={formik.handleChange}
              error = {formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

        <Grid item>
          <Button variant="contained" type="submit"  sx={{ minWidth: 260 }}>
            Enviar 
          </Button>
        </Grid>

        <Grid container item justifyContent="center" alignItems="center">
        {query === 'success' ? (
          <Alert style={{width:'56%'}}
          severity="success">La descarga se registro correctamente</Alert>
        ) : (
          <Fade
            in={query === 'progress'}
            style={{
              transitionDelay: query === 'progress' ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        )}
        </Grid>

           
        <Grid container item justifyContent="center" alignItems="center">          
            {query === 'success' ? (
              <Alert style={{width:'56%'}}
              severity="info">Al finalizar las descargas será notificado al correo {formik.values.email}  </Alert>
            ) : null
            }          
        </Grid>   

        <Grid container item justifyContent="center" alignItems="center">
        {query === 'error' ? (
          <Alert style={{width:'56%'}}
          severity="error">La descarga no se pudo registrar</Alert>
        ) : null
        }
        </Grid>

     </Grid> 
    </Box>
  );
}