import { useState } from "react";
import { useAuth } from "../../infrastructure/authContext";
import { useNavigate } from "react-router-dom";
import { Box,  Button, Card, CardContent, CardMedia, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AuthForm = ({ isRegister = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await register(name, email, password);
      resetForm();
      navigate("/auth");
    } else {
      const userRol = await login(email, password);
      resetForm();
      const path = userRol === "administrador" ? "/dashboard" : userRol === "usuario" ? "/dashboardCliente" : '/';
      navigate(path)
    }
  };

  const resetForm = () => {
    setPassword("");
    setName("");
    setEmail("");
  };

  const redirecRegister = () => {
    const route = !isRegister ? "/register" : "/auth";
    navigate(route);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card sx={{ display: "flex" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size="grow" style={{ margin: "auto" }}>
            <CardMedia
              component="img"
              sx={{ width: 500 }}
              image="src/assets/Login.png"
              alt="Live from space album cover"
            />
          </Grid>
          <Grid
            size="grow"
            style={{ margin: "auto" }}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {/* <Box sx={{ display: "flex", flexDirection: "column" }}> */}
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {isRegister ? "Registrarme" : "Iniciar sesion"}
              </Typography>

              <form onSubmit={handleSubmit}>
                <Stack sx={{ "& .MuiTextField-root": { m: 1, width: "35ch" } }}>
                  {isRegister && (
                    <div>
                      <TextField
                        size="medium"
                        name="nombre"
                        label="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div>
                    <TextField
                      size="medium"
                      name="email"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <FormControl
                      size="medium"
                      sx={{ m: 1, width: "35ch" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Contraseña
                      </InputLabel>
                      <OutlinedInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>{" "}
                  </div>
                  <Stack spacing={2}>
                    <Button variant="contained" type="submit">
                      {isRegister ? "Registrarme" : "Iniciar sesion"}
                    </Button>

                    <Button color="success" onClick={redirecRegister}>
                      {!isRegister ? "ir a registarme" : "Ir a iniciar sesion"}
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </CardContent>
            {/* </Box> */}
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default AuthForm;
