import { Route, Routes } from "react-router"
import HomePage from "./pages/home"
import CafeDetailPage from "./pages/cafe-detail"
import { ThemeProvider } from "./context/theme-context"
import { AuthProvider } from "./context/auth-context";
import CafePhotoUploadPage from "./pages/cafe-photoshare"

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cafe/:id" element={<CafeDetailPage />} />
          <Route path="/cafe/photos/upload" element={<CafePhotoUploadPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
