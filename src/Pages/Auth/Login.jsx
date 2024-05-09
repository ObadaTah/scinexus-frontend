import AuthPagesHeader from "../../Components/Generic/AuthPagesHeader";
import styles from "../../Components/Generic/Login.module.css";
import GoogleLoginButton from "../Auth/GoogleLoginButton.jsx";
import GitHubLoginButton from "./GithubLoginButton.jsx";
import { useState } from "react";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import Key from "@mui/icons-material/Key";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputStyle = {
    "--Input-radius": "3px",
    height: "50px",
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // TO DO: Implement login logic here
    console.log("Login button clicked!");
  };

  const handleSubmit = (even) => {
    event.preventDefault();
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AuthPagesHeader />
        <div className={styles.oauth}>
          <GoogleLoginButton label="Login With Google" />
          <GitHubLoginButton label="Login With Github" />
        </div>
        <div className={styles.horizontalLine}>
          <span className={styles.text}>or</span>
        </div>

        <form className={styles.form}>
          <Stack spacing={2}>
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              placeholder="password"
              startDecorator={<Key />}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              sx={{
                ...inputStyle,
                backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                transition: "background-color 0.2s ease-in-out",
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </Stack>
        </form>
        <div className={styles.footer}>
          <Link to="/register" style={{ textDecoration: "underline" }}>
            Don't have an account ?
          </Link>
          <Button sx={{ width: "100px", borderRadius: "3px" }}>LOG IN</Button>
        </div>
      </main>
    </div>
  );
}
// export default function Login() {
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
//                     {/* <LockOutlinedIcon /> */}
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Sign in
//                 </Typography>
//                 <Box
//                     component="form"
//                     onSubmit={handleSubmit}
//                     noValidate
//                     sx={{ mt: 1 }}
//                 >
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="email"
//                         label="Email Address"
//                         name="email"
//                         autoComplete="email"
//                         autoFocus
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         name="password"
//                         label="Password"
//                         type="password"
//                         id="password"
//                         autoComplete="current-password"
//                     />
//                     <FormControlLabel
//                         control={<Checkbox value="remember" color="primary" />}
//                         label="Remember me"
//                     />
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                     >
//                         Sign In
//                     </Button>

//                     <Grid container>
//                         <Grid item xs>
//                             <Link href="#" variant="body2">
//                                 Forgot password?
//                             </Link>
//                         </Grid>
//                         <Grid item>
//                             <Link href="/register" variant="body2">
//                                 {"Don't have an account? Sign Up"}
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Box>
//         </Container>
//     );
// }
