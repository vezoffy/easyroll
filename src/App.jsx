import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./routes/AppRoutes";
import theme from "./themes/muiTheme";
//import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <div>
    <h1>EasyRoll</h1>
    
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/**<AuthProvider> */}
          <AppRoutes />
         {/**</AuthProvider>*/}
      </BrowserRouter>
    </ThemeProvider>
    </div>
  );
}
