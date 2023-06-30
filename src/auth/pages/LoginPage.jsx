import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth"
import { useMemo } from "react"

export const LoginPage = () => {

  const dispatch = useDispatch();

  const { status } = useSelector(state => state.auth)

  const { email, password, onInputChange } = useForm({
    email: 'richard@gmail.com',
    password: '123456'
  })

  const isAuthenticating = useMemo(() => status == 'cheking', [status])

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password })
    dispatch(checkingAuthentication());
  }

  const onGoogleSignInd = () => {
    console.log('ongooglesignin')
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
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
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6} >
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>Login</Button>
            </Grid>

            <Grid item xs={12} sm={6} >
              <Button disabled={isAuthenticating}  variant="contained" fullWidth onClick={onGoogleSignInd}>
                <Google /><Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
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
