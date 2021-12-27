import { ThemeProvider } from "@mui/material";
import App from "components/App";
import { theme } from "../theme";

const Root = () => {
    return <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
}

export default Root