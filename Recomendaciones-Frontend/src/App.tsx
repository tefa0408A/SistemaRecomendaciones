import { Route, Routes } from "react-router"
import HomePage from "./pages/home"
import CafeDetailPage from "./pages/cafe-detail"
import CafeOpinionPage from "./pages/cafe-opinion"
import { ThemeProvider } from "./context/theme-context"
import { AuthProvider } from "./context/auth-context";
import CafePhotoUploadPage from "./pages/cafe-photoshare"

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cafe/opinion" element={<CafeOpinionPage />} />
          <Route path="/cafe/:id" element={<CafeDetailPage />} />
          <Route path="/cafe/photos/upload" element={<CafePhotoUploadPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
