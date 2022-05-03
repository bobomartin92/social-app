import React, { useState, useContext } from "react";
import { useForm } from "../util/customHooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Button,
  CssBaseline,
  Container,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../util/graphql";

const Login = () => {
  const [inputErrors, setInputErrors] = useState({});
  const context = useContext(AuthContext);

  const { onChange, onSubmit, values, handleClickShowPassword } = useForm(
    loginUser,
    {
      username: "",
      password: "",
      showPassword: false,
    }
  );
  const { username, password } = values;

  const navigate = useNavigate();

  const [login] = useMutation(LOGIN_USER, {
    variables: { username, password },
    onCompleted(data) {
      context.login(data.login);
      navigate("/");
    },
    onError(err) {
      setInputErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  function loginUser() {
    login();
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: "100vh" }}>
          <Box
            sx={{ margin: "20px 0" }}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" gutterBottom component="div">
                Login
              </Typography>
              <PersonIcon sx={{ paddingBottom: "5px" }} fontSize="large" />
            </Box>
            <InputLabel htmlFor="outlined-username">Username</InputLabel>
            <OutlinedInput
              id="outlined-username"
              fullWidth
              label="Username"
              name="username"
              type="text"
              value={values.username}
              error={inputErrors.username ? true : false}
              onChange={onChange}
            />
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              fullWidth
              label="Username"
              name="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              error={inputErrors.password ? true : false}
              onChange={onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button sx={{ margin: "5px 0" }} variant="contained" type="submit">
              Login
            </Button>
            {Object.keys(inputErrors).length > 0 && (
              <div className="ui errors message">
                <ul className="list">
                  {Object.values(inputErrors).map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
