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

// const LoginPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     try {
//       setLoading(true);

//       // Simulate login API
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       // Navigate to home/dashboard
//       navigate("/home");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed!");
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
//         elevation={8}
//         sx={{
//           p: 5,
//           borderRadius: 3,
//           width: { xs: "90%", sm: 400 },
//           textAlign: "center",
//         }}
//       >
//         <LockOutlinedIcon sx={{ fontSize: 50, color: "#1976D2", mb: 2 }} />
//         <Typography variant="h5" mb={3}>
//           Login
//         </Typography>

//         <Stack spacing={2}>
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Password"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             fullWidth
//           />

//           <Button
//             variant="contained"
//             size="large"
//             sx={{
//               backgroundColor: "#0D47A1",
//               "&:hover": { backgroundColor: "#0B3C91" },
//             }}
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
//           </Button>
//         </Stack>

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
  TextField,
  Paper,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    console.log("formData",formData)
    if (!formData.userName || !formData.password) {
      alert("Please enter both userName and password");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(formData);

      if (res.data.status === 100) {
        // Save token in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.data.userName || "");
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.data)
        );
        if (res.data.data.role === "admin") {
          navigate("/home");
        } else if (res.data.data.role === "superAdmin") {
          navigate("/superadmin/home");
        }
        // navigate("/home");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    } finally {
      setLoading(false);
    }
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
          position: "relative",
        }}
      >
        <LockOutlinedIcon
          sx={{ fontSize: 50, color: "#0D47A1", mb: 2 }}
        />
        <Typography variant="h5" mb={3}>
          Login
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
            autoFocus
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#0D47A1",
              "&:hover": { backgroundColor: "#0B3C91" },
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Stack>

        <Typography variant="body2" mt={2} color="textSecondary">
          Forgot your password? Contact admin.
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
