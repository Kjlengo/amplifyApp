import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Grid, Button } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { descargaService } from "./../services/descarga";

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
      const pais = datos.pais;
      const campana = datos.campana;
      const fechaInicio = formatDate(fecha1);
      const fechaFin = formatDate(fecha2);
      const descarga = {pais, campana, fechaInicio, fechaFin }
      console.log(descarga)
      descargaService.create(descarga);
  }

  return (
    <Box
      display="flex"
      component="form"
      sx={{'& > :not(style)': { m: 1, width: '50ch' },}}
      noValidate
      autoComplete="off"
      justifyContent="center"
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
     </Grid>   
    </Box>
  );
}