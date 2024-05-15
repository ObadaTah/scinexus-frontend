import AuthPagesHeader from "../../Components/Generic/AuthPagesHeader";
import RegisterAcadenicStep2 from "../../Components/Generic/RegisterAcademicStep2.jsx";
import styles from "../../Components/Generic/Register.module.css";
import GoogleLoginButton from "../Auth/GoogleLoginButton.jsx";
import GitHubLoginButton from "./GithubLoginButton.jsx";
import { useEffect, useState } from "react";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import Key from "@mui/icons-material/Key";
import { Link } from "react-router-dom";

const userInfo = {
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  password: null,
  bio: null,
  phoneNumber: null,
  fieldOfWork: null,
  role: null,
  education: null,
  badge: null,
  position: null,
};

function Register({
  step,
  setStep,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  isInputFocused,
  setIsInputFocused,
  isClicked,
  setIsClicked,
}) {
  const minLength = 12;

  const inputStyle = {
    "--Input-radius": "3px",
    height: "50px",
  };

  const getPasswordColor = (passwordLength) => {
    if (passwordLength < 3) {
      return "hsl(0 80% 40%)"; // red
    }
    if (passwordLength >= 3 && passwordLength < 6) {
      return "hsl(30 80% 40%)"; // orange
    }
    if (passwordLength >= 6 && passwordLength < 10) {
      return "hsl(120 80% 40%)"; // green
    }
    if (passwordLength >= 10) {
      return "hsl(180 80% 40%)"; // blue
    }
  };
  useEffect(() => {
    if (!isClicked) return;

    async function sendUserData() {
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    }
  }, [isClicked]);

  function handleSubmit(event) {
    event.preventDefault();
    setFirstName(event.target.FirstName.value);
    setLastName(event.target.LastName.value);
    setEmail(event.target.email.value);
    setPassword(event.target.password.value);
    incrementStep();
  }
  function incrementStep() {
    setStep((step) => 3);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AuthPagesHeader />
        <div className={styles.oauth}>
          <GoogleLoginButton label="Sign up with Google" />
          <GitHubLoginButton label="Sign up with Github" />
        </div>
        <div className={styles.horizontalLine}>
          <span className={styles.text}>or</span>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Stack spacing={5} direction="row">
            <Input
              placeholder="First Name"
              required
              name="FirstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              sx={{
                ...inputStyle,
                width: "50%",
                backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                transition: "background-color 0.2s ease-in-out",
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <Input
              placeholder="Last Name"
              required
              name="LastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              sx={{
                ...inputStyle,
                width: "50%",
                backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                transition: "background-color 0.2s ease-in-out",
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </Stack>
          <Stack spacing="35px">
            <Input
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              sx={{
                ...inputStyle,
                backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                transition: "background-color 0.2s ease-in-out",
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <Input
              type="password"
              name="password"
              required
              placeholder="password"
              startDecorator={<Key />}
              value={password}
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              sx={{
                ...inputStyle,
                backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                transition: "background-color 0.2s ease-in-out",
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />

            {password.length >= 1 && (
              <LinearProgress
                determinate
                size="sm"
                value={Math.min((password.length * 100) / minLength, 100)}
                sx={{
                  bgcolor: "background.level3",
                  color: getPasswordColor(password.length),
                  flexGrow: 1,
                  width: "150px",
                  borderRadius: "3px",
                }}
              />
            )}

            <Typography
              level="body-xs"
              sx={{ alignSelf: "flex-start", color: "hsl(var(--hue) 80% 30%)" }}
            >
              {password.length < 3 && password.length >= 1 && "Very weak"}
              {password.length >= 3 && password.length < 6 && "Weak"}
              {password.length >= 6 && password.length < 10 && "Strong"}
              {password.length >= 10 && "Very strong"}
            </Typography>
          </Stack>

          <div className={styles.footer}>
            <Link to="/login" style={{ textDecoration: "underline" }}>
              already have an account ?
            </Link>
            <Button type="submit" sx={{ width: "100px", borderRadius: "3px" }}>
              SIGN UP
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Register;

// export default function Register() {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             email: data.get("email"),
//             password: data.get("password"),
//         });
//     };

//     return (
//         <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <Box
//                 sx={{
//                     marginTop: 8,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                 }}
//             >
//                 <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//                     <LockOutlinedIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Sign up
//                 </Typography>
//                 <Box
//                     component="form"
//                     noValidate
//                     onSubmit={handleSubmit}
//                     sx={{ mt: 3 }}
//                 >
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 autoComplete="given-name"
//                                 name="firstName"
//                                 required
//                                 fullWidth
//                                 id="firstName"
//                                 label="First Name"
//                                 autoFocus
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 required
//                                 fullWidth
//                                 id="lastName"
//                                 label="Last Name"
//                                 name="lastName"
//                                 autoComplete="family-name"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Email Address"
//                                 name="email"
//                                 autoComplete="email"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 id="password"
//                                 autoComplete="new-password"
//                             />
//                         </Grid>
//                     </Grid>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                     >
//                         Sign Up
//                     </Button>
//                     <Grid container justifyContent="flex-end">
//                         <Grid item>
//                             <Link href="/login" variant="body2">
//                                 Already have an account? Sign in
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Box>
//         </Container>
//     );
// }
