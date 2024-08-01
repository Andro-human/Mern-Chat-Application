// import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import backgroundImage from "../assets/loginBackground.jpeg";
import { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div style={{backgroundImage: `url(${backgroundImage})`, backgroundSize:'cover'}}>
      
      <Container
        component={"main"}
        maxWidth="sm"
        sx={{
          justifyContent: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            margin: "auto",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h3" component="h1">
                Login
              </Typography>
              <form>
                {/* <Typography variant="span" label='Email'>Email</Typography> */}
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  variant="filled"
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  variant="filled"
                  margin="normal"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ display: "flex", margin: "1rem auto" }}
                >
                  Login
                </Button>
                <Typography variant="text">
                  Don&apos;t have an account?
                </Typography>
                <Button color="secondary" onClick={() => setIsLogin(false)} style={{paddingBottom:'1.2vh'}}>
                  Register
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h3">Register</Typography>
              <form>
                {/* <Typography variant="span" label='Email'>Email</Typography> */}
                <Stack>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      margin: "1rem auto",
                      objectFit: "contain",
                      // opacity:0.2
                    }}
                    src={previewUrl}
                    alt="Avatar"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  ></input>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() =>
                      document.querySelector("input[type='file']").click()
                    }
                    sx={{ display: "flex", margin: "0rem auto" }}
                  >
                    Upload Photo
                  </Button>
                </Stack>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  variant="filled"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  variant="filled"
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  variant="filled"
                  margin="normal"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  id="bio"
                  label="Bio"
                  variant="filled"
                  margin="normal"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ display: "flex", margin: "1rem auto" }}
                >
                  Register
                </Button>
                <Typography variant="text">Already have an account?</Typography>
                <Button color="secondary" onClick={() => setIsLogin(true)} style={{paddingBottom:'1.2vh'}}>
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
      </div>
    </>
  );
};

export default Login;
