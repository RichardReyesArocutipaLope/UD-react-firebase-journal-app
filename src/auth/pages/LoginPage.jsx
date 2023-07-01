import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { useMemo, useState } from "react"

const formData = {
  email: 'richard@gmail.com',
  password: '123456'
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener un @'],
  password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
}

export const LoginPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { status, errorMessage } = useSelector(state => state.auth)

  const { formState, email, password, onInputChange,
    isFormValid, emailValid, passwordValid } = useForm(formData, formValidations)

  const isAuthenticating = useMemo(() => status == 'cheking', [status])

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startLoginWithEmailPassword(formState));
  }

  const onGoogleSignInd = () => {
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
      <h1>FormValid {isFormValid ? 'Válido' : 'Incorrecto'}</h1>
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Correo'
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label='Contraseña'
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6} >
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>Login</Button>
            </Grid>

            <Grid item xs={12} sm={6} >
              <Button disabled={isAuthenticating} variant="contained" fullWidth onClick={onGoogleSignInd}>
                <Google /><Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent="end">
            <Link component={RouterLink} color='inherit' to="/auth/register">Crear una cuenta</Link>

          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
