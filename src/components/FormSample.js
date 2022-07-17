import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Button } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { descargaService } from "./../services/descarga";

//import { DateTimePicker } from "@mui/x-date-pickers";
//import moment from "moment";
//import { useState } from "react";

const paises = [
  {
    value: 'ESPAÑA',
    label: 'España',
  },
];

export default function BasicTextFields() {
  //const [pais, setPais] = React.useState(null);

  const [datos, setDatos] = React.useState({
      pais : '',
      campana : ''
  })

  const handleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
    //setPais(event.target.value);
  };  

  const [fecha1, setFecha1] = React.useState(null);
  const [fecha2, setFecha2] = React.useState(null);

  const formatDate = (current_datetime)=>{
    let formatted_date = current_datetime.getDate() + "/" + (current_datetime.getMonth() + 1) + "/" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    return formatted_date;
}

  const enviarDatos = (event) => {
      event.preventDefault();
      var pais = datos.pais;
      var campana = datos.campana;
      var fechaInicio = formatDate(fecha1);
      var fechaFin = formatDate(fecha2);
      const datosx = {pais, campana, fechaInicio, fechaFin }
      console.log(datosx)
  }

  return (
    <Box
      component="form"
      sx={{'& > :not(style)': { m: 1, width: '35ch' },}}
      noValidate
      autoComplete="off"
    >
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <h1> Form Sample</h1>
        </Grid>
        
        <Grid item> 
          <TextField
              id="outlined-select-currency"
              select
              label="Pais"
              //value={pais}
              name = "pais"
              onChange={handleChange}
              //helperText="Please select your currency"
            >
              {paises.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        <Grid item>
          <TextField id="filled-basic" label="ID Campaña" type="number" name="campana" variant="outlined" onChange={handleChange} />
        </Grid>  

        <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Fecha Inicio"
              value={fecha1}
              name="fechaInicio"
              onChange={(newValue) => {
                setFecha1(newValue);
              }}
            />
        </LocalizationProvider>         
        </Grid>

        <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Fecha Fin"
                value={fecha2}
                name="fechaFin"
                onChange={(newValue) => {
                  setFecha2(newValue);
                }}
              />  
            </LocalizationProvider>
        </Grid>       

        <Grid item>
          <Button variant="contained" onClick={enviarDatos}>
            Enviar 
          </Button>
        </Grid>  
        <Grid item>
          <h1> {datos.pais} - {datos.campana} </h1>
        </Grid>

     </Grid>   
    </Box>
  );
}