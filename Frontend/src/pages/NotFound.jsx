import { Container, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import {Error as ErrorIcon} from "@mui/icons-material"
const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{height:"100vh"}}>
      <Stack alignItems={"center"} spacing={"2rem"} justifyContent={"center"} height={"100vh"}>
        <ErrorIcon sx={{fontSize:"8rem"}}/>
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">Page Not Found</Typography>
        <Link to="/">Go back to Home</Link>
      </Stack>
    </Container>
  )
}

export default NotFound
