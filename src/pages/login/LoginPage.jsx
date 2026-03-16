/////////////////////FINAL/////////////////////////////////////////
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Paper,
//   Typography,
//   Stack,
//   CircularProgress
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../services/api";
// import ReCAPTCHA from "react-google-recaptcha";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// const SITE_KEY = "6LfWY20sAAAAAKwSmuNdUP--V0b0b8Y9SzHhCnAI"
// // "6LfWY20sAAAAAKwSmuNdUP--V0b0b8Y9SzHhCnAI"
// // process.env.SITE_KEY;
// // console.log("site key",SITE_KEY)
// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ userName: "", password: "" });
//   const [captchaValue, setCaptchaValue] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // const [setSnackbarOpen] = useState(false);
//   // const [setSnackbarMessage] = useState("");
//   // const [setSnackbarSeverity] = useState("success");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCaptchaChange = (value) => {
//     setCaptchaValue(value);
//   };

//   const handleLogin = async () => {
//     if (!formData.userName || !formData.password) {
//       alert("Please enter both userName and password");
//       return;
//     }

//     if (!captchaValue) {
//       alert("Please verify the captcha");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await loginUser({ ...formData, captcha: captchaValue });

//       if (res.data.status === 100) {
//         // Save token in localStorage
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("userName", res.data.data.userName || "");
//         localStorage.setItem("user", JSON.stringify(res.data.data));

//         const role = res.data.data.role;
//         console.log("roleeee",role)
//         if (role === "admin" || role === "viewer" || role === "expenseEditor") {
//           navigate("/home");
//         } else if (role === "superAdmin") {
//           navigate("/superadmin/home");
//         } else if (role === "executive") {
//           navigate("/executive/home");
//         }
//       } else {
//         alert(res.data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Login failed!");
//       // setSnackbarMessage(err.response?.data?.message || "Login failed!");
//       // setSnackbarSeverity("error");
//       // setSnackbarOpen(true);

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)",
//       }}
//     >
//       <Paper
//         elevation={10}
//         sx={{
//           p: 5,
//           borderRadius: 3,
//           width: { xs: "90%", sm: 400 },
//           textAlign: "center",
//           position: "relative",
//         }}
//       >
//         <LockOutlinedIcon
//           sx={{ fontSize: 50, color: "#0D47A1", mb: 2 }}
//         />
//         <Typography variant="h5" mb={3}>
//           Login
//         </Typography>

//         {/* <Box mt={2}>
//   <Button
//     variant="outlined"
//     fullWidth
//     size="medium"
//     sx={{
//       borderColor: "#0D47A1",
//       color: "#0D47A1",
//       borderRadius: 2,
//       fontWeight: 600,
//       textTransform: "none",
//       transition: "all 0.3s ease",
//       "&:hover": {
//         backgroundColor: "#E3F2FD",
//         borderColor: "#0B3C91",
//       },
//     }}
//     onClick={() => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("userName");
//       setFormData({ userName: "", password: "" });
//       navigate("/cost-calculation");
//     }}
//   >
//     Try Service Cost Calculator (No Login Required)
//   </Button>
// </Box> */}



// <Stack spacing={2}>
//   <TextField
//     label="userName"
//     name="userName"
//     value={formData.userName}
//     onChange={handleChange}
//     fullWidth
//     autoFocus
//   />

//   <TextField
//     label="Password"
//     type={showPassword ? "text" : "password"}
//     name="password"
//     value={formData.password}
//     onChange={handleChange}
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <IconButton
//             onClick={() => setShowPassword((prev) => !prev)}
//             onMouseDown={(e) => e.preventDefault()}
//             edge="end"
//           >
//             {showPassword ? <VisibilityOff /> : <Visibility />}
//           </IconButton>
//         </InputAdornment>
//       ),
//     }}
//   />

//   <ReCAPTCHA
//     sitekey={SITE_KEY}
//     onChange={handleCaptchaChange}
//     style={{ alignSelf: "center" }}
//   />

//   <Button
//     variant="contained"
//     size="large"
//     sx={{
//       backgroundColor: "#0D47A1",
//       "&:hover": { backgroundColor: "#0B3C91" },
//     }}
//     onClick={handleLogin}
//     disabled={loading}
//   >
//     {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//   </Button>

//   {/* 👇 Properly spaced secondary action */}
//   <Button
//     variant="outlined"
//     fullWidth
//     sx={{
//       mt: 1,
//       borderColor: "#0D47A1",
//       color: "#0D47A1",
//       borderRadius: 2,
//       fontWeight: 600,
//       textTransform: "none",
//       "&:hover": {
//         backgroundColor: "#E3F2FD",
//       },
//     }}
//     onClick={() => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("userName");
//       setFormData({ userName: "", password: "" });
//       navigate("/cost-calculation");
//     }}
//   >
//     Try Service Cost Calculator
//   </Button>
// </Stack>

//         <Typography variant="body2" mt={2} color="textSecondary">
//           Forgot your password? Contact admin.
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../../services/api"; // your backend API call

// const CLIENT_ID = "707824241932-rvlucrlqm4h1oe8vnggh7sp2ie3ccilf.apps.googleusercontent.com"; // replace with your Google OAuth Client ID

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success"
    });

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      setLoading(true);

      // Decode JWT to get email
      const decoded = jwtDecode(credentialResponse.credential);
      const email = decoded.email;

      // Call backend to check if user is registered
      const res = await loginUser({ googleEmail: email });

      if (res.data.status === 100) {
        // Save user info & token
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.data.userName || "");
        localStorage.setItem("user", JSON.stringify(res.data.data));

        // Navigate based on role
        const role = res.data.data.role;
        if (role === "admin" || role === "viewer" || role === "editor") {
          navigate("/home");
        } else if (role === "superAdmin") {
          navigate("/superadmin/home");
        } else if (role === "executive") {
          navigate("/executive/home");
        } else if (role === "bot") {
          navigate("/tender/home");
        }
      } else {
        setSnackbar({
          open: true,
          message: res.data.message || "User not registered",
          severity: "success"
        });
        // alert(res.data.message || "User not registered");
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
          open: true,
          message:err.response?.data?.message||"Login failed!",
          severity: "error"
        });
      // alert(err.response?.data?.message||"Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    // alert("Google login failed!");
    setSnackbar({
          open: true,
          message:"Google login failed!",
          severity: "error"
        });

  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          borderRadius: 3,
          width: { xs: "90%", sm: 400 },
          textAlign: "center",
        }}
      >
        <LockOutlinedIcon
          sx={{ fontSize: 50, color: "#0D47A1", mb: 2 }}
        />
        <Typography variant="h5" mb={3}>
          Login with Google
        </Typography>

        <Stack spacing={2}>
          {/* Google Login Button */}
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap
          />

          {loading && <CircularProgress sx={{ alignSelf: "center" }} />}

          {/* Service Cost Calculator Button */}
          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 1,
              borderColor: "#0D47A1",
              color: "#0D47A1",
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { backgroundColor: "#E3F2FD" },
            }}
            // onClick={() => navigate("/cost-calculation")}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("userName");
              setFormData({ userName: "", password: "" });
              navigate("/cost-calculation");
            }}
          >
            Try Service Cost Calculator
          </Button>
        </Stack>

            <Snackbar
              open={snackbar.open}
              autoHideDuration={3000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                severity={snackbar.severity}
                // sx={{ width: "100%" }}
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  boxShadow: 6,
                  minWidth: "300px",
                  justifyContent: "center",
                }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
        {/* <Typography variant="body2" mt={2} color="textSecondary">
          Forgot your password? Contact admin.
        </Typography> */}
      </Paper>
    </Box>
  );
};

export default LoginPage;