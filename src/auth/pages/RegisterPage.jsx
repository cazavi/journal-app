import { useForm } from "../../hooks";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography, Alert } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";

const formData= {
  email: 'carolina@google.com',
  password: '123456',
  displayName: 'Carolina Zapata'
}

const formValidations = {
  email:[(value)=> value.includes('@'),'El correo debe tener un @'],
  password:[(value)=> value.length >=6,'El password debe tener más de 6 letras'],
  displayName:[(value)=> value.length>=1,'El nombre es obligatorio']
}

export const RegisterPage = () => {
  const dispatch= useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {status, errorMessage}= useSelector(state => state.auth);

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, emailValid, passwordValid, displayNameValid
  }= useForm(formData, formValidations);



  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  }

  return (
    <AuthLayout title="Crear cuenta">
      <h1>Form {isFormValid ? 'Valido' : 'Incorrecto'}</h1>
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Nombre completo"
                type="text"
                placeholder="Carolina Zapata"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
              />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
              />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>
            <Grid container spacing={2} sx={{mb:2, mt:1}}>
              <Grid 
                item 
                xs={12}
                display={!!errorMessage ? '' : 'none'}
              >
                <Alert severity="error"> {errorMessage} </Alert>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={isCheckingAuthentication}
                  variant="contained" 
                  fullWidth
                  type="submit"  
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end">
              <Typography sx={{mr:1}}>¿Ya tienes una cuenta?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}

