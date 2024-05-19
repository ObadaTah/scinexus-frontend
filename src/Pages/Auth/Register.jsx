import AuthPagesHeader from "../../Components/Generic/AuthPagesHeader";
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
import { object, string, number, date } from "yup";
import Alert from "@mui/joy/Alert";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCricleIcon from "@mui/icons-material/CheckCircle";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import IconButton from "@mui/joy/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

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
  let message = "";
  // Schema for user information
  const userSchema = object({
    firstName: string().required(),
    lastName: string().required(),
  });

  // Schema for password validation
  const passwordSchema = string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required();

  // Schema for email validation
  const emailSchema = string()
    .matches(
      /^[a-zA-Z0-9]+[._-]*[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      "Invalid email address"
    )
    .required();

  const [isValid, setIsValid] = useState(false);
  const [isFLNameValid, setIsFLNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (password === confirmPassword) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  }, [password, confirmPassword]);
  useEffect(() => {
    setIsFLNameValid(userSchema.isValidSync({ firstName, lastName }));
  }, [firstName, lastName]);

  useEffect(() => {
    setIsEmailValid(emailSchema.isValidSync(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(passwordSchema.isValidSync(password));
  }, [password]);

  useEffect(() => {
    if (isFLNameValid && isEmailValid && isPasswordValid && isPasswordMatch) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isFLNameValid, isEmailValid, isPasswordValid, isPasswordMatch]);

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /\W|_/.test(password);
  const strength = hasUpperCase + hasLowerCase + hasNumber + hasSpecialChar;

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
          <Stack
            spacing={5}
            direction="row"
            sx={{
              paddingBottom: "20px",
            }}
          >
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
          <Stack spacing="25px">
            <Input
              placeholder="Email"
              required
              name="email"
              value={email}
              autoComplete="username"
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
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="password"
              startDecorator={<Key />}
              endDecorator={
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <RemoveRedEyeOutlinedIcon />
                  )}
                </IconButton>
              }
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
            <Input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirm Password"
              startDecorator={<ReplayRoundedIcon />}
              value={confirmPassword}
              autoComplete="current-password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              sx={{
                ...inputStyle,
                backgroundColor: isInputFocused ? "#fff" : "#f8f8f8",
                transition: "background-color 0.2s ease-in-out",
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </Stack>
          <Stack spacing={1}>
            {email.length >= 1 && !isEmailValid && (
              <Alert
                sx={{ height: "40px", fontSize: "15px" }}
                variant={"soft"}
                color="warning"
                startDecorator={<WarningIcon />}
              >
                Email is not valid.
              </Alert>
            )}
            {email.length >= 1 && isEmailValid && (
              <Alert
                sx={{ height: "40px", fontSize: "15px" }}
                variant={"soft"}
                color="success"
                startDecorator={<CheckCricleIcon />}
              >
                Email is valid.
              </Alert>
            )}
            {password.length >= 1 && !isPasswordValid && (
              <Alert
                sx={{ height: "44px", fontSize: "13px" }}
                variant={"soft"}
                color="warning"
                startDecorator={<WarningIcon />}
              >
                Password must contain at least 8 characters, one uppercase
                letter, one lowercase letter, one number, and one special
                character
              </Alert>
            )}
            {password.length >= 1 && isPasswordValid && (
              <Alert
                sx={{ height: "40px", fontSize: "15px" }}
                variant={"soft"}
                color="success"
                startDecorator={<CheckCricleIcon />}
              >
                Password is valid.
              </Alert>
            )}
            {confirmPassword.length >= 1 && !isPasswordMatch && (
              <Alert
                sx={{ height: "40px", fontSize: "15px" }}
                variant={"soft"}
                color="warning"
                startDecorator={<WarningIcon />}
              >
                Password is not confirmed
              </Alert>
            )}
            {confirmPassword.length >= 1 && isPasswordMatch && (
              <Alert
                sx={{ height: "40px", fontSize: "15px" }}
                variant={"soft"}
                color="success"
                startDecorator={<CheckCricleIcon />}
              >
                Password is Confirmed
              </Alert>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              {password.length >= 1 && (
                <LinearProgress
                  determinate
                  size="sm"
                  value={Math.min(strength * 25, 100)}
                  sx={{
                    bgcolor: "background.level3",
                    color: getPasswordColor(strength * 1.5),
                    flexGrow: 1,
                    width: "150px",
                    borderRadius: "3px",
                  }}
                />
              )}

              <Typography
                level="body-xs"
                sx={{
                  alignSelf: "flex-end",
                  color: "hsl(var(--hue) 80% 30%)",
                }}
              >
                {strength === 1 && "Very weak"}
                {strength === 2 && "Weak"}
                {strength === 3 && "Strong"}
                {strength === 4 && "Very strong"}
              </Typography>
            </div>
          </Stack>

          <div className={styles.footer}>
            <Button
              onClick={() => {
                setStep((step) => step - 1);
              }}
              sx={{
                width: "100px",
                borderRadius: "3px",
                backgroundColor: "white",
                color: "#e60b2f",
                border: "1px solid #e60b2f",
                "&:hover": {
                  backgroundColor: "white",
                  color: "#e60b2f",
                  border: "1px solid #e60b2f",
                },
              }}
            >
              &larr; Back
            </Button>
            <Button
              type="submit"
              sx={{ width: "100px", borderRadius: "3px" }}
              disabled={!isValid}
            >
              Sign Up
            </Button>
          </div>
          <Link to="/login" style={{ textDecoration: "underline" }}>
            already have an account ?
          </Link>
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
