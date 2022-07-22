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

import { descargaService } from "./../services/descarga";


export default function BasicTextFields() {

  const enviarDatos = () => {
      const pais = formik.values.pais;
      const fechaInicio = formik.values.fechaInicio;
      const fechaFin = formik.values.fechaFin;
      const campana = formik.values.campana;
      const cantidad = formik.values.cantidad;
      const descarga = {pais, fechaInicio, fechaFin, campana, cantidad }
      console.log(descarga)
      //descargaService.create(descarga)
  }

  const initialValues = {
    pais: "España",
    campana: "",
    fechaInicio: "",
    fechaFin: "",
    cantidad: "",
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
    cantidad: yup.number().max(500, "La cantidad no puede superar los 500").required("la campaña es requerida").positive("la cantidad debe ser positiva").integer(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => { 
      enviarDatos();
      alert(JSON.stringify(values, null, 2));

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
        
        <Grid item>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
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
          <Button variant="contained" type="submit" >
            Enviar 
          </Button>
        </Grid>
     </Grid> 
    </Box>
  );
}