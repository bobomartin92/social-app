import { useContext, useState } from "react";
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
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { AuthContext } from "../context/auth";
import { RESGISTER_USER } from "../util/graphql";

const Register = () => {
  const { onChange, onSubmit, values, handleClickShowPassword } = useForm(
    registerUser,
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
    }
  );

  const { username, email, password, confirmPassword } = values;

  const [inputErrors, setInputErrors] = useState({});

  const context = useContext(AuthContext);

  const navigate = useNavigate();

  const [addUser] = useMutation(RESGISTER_USER, {
    variables: { username, email, password, confirmPassword },
    onCompleted(data) {
      context.login(data.register);
      navigate("/");
    },
    onError(err) {
      setInputErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  function registerUser() {
    addUser();
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
                Register
              </Typography>
              <PersonAddAltRoundedIcon
                sx={{ paddingBottom: "5px" }}
                fontSize="large"
              />
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
            <InputLabel htmlFor="outlined-username">Email</InputLabel>
            <OutlinedInput
              id="outlined-email"
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={values.email}
              error={inputErrors.email ? true : false}
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
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={values.showPassword ? "text" : "password"}
              value={values.confirmPassword}
              error={inputErrors.confirmPassword ? true : false}
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
              Register
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

export default Register;
