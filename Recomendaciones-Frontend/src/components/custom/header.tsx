import { Button } from "../ui/button";
import { NavLink, useNavigate } from "react-router";
import { Menu, Moon, Sun, Camera, Pencil, Home } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/theme-context";
import { useAuth } from "../../context/auth-context";
import Authenticacion from "../modal/authenticacion-modal";
import UserLoggedIn from "./user";
import SearchBox from "../funcionalidad/search-box";
import { cn } from "../lib/utils";

const Header = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSearch = (id: number) => {
    navigate(`/cafe/${id}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full hover:bg-accent/90 transition-all"
          >
            <img
              src="/logo.svg"
              alt="logo"
              className="hover:scale-105 transition-transform"
            />
          </Button>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <SearchBox handleSearch={handleSearch} />
        </div>

        <nav className={cn(
          "md:flex md:justify-end md:items-center md:gap-1",
          "fixed md:static inset-x-0 top-[3.5rem] p-4 border-b md:border-none bg-background/95 backdrop-blur md:backdrop-blur-none md:bg-transparent",
          "flex-col md:flex-row gap-2 md:gap-1",
          !isMenuOpen && "hidden"
        )}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <Home className="h-4 w-4" />
            <span>Inicio</span>
          </NavLink>

          {/* <NavLink
            to="/cafe/opinion"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <Pencil className="h-4 w-4" />
            <span>Escribir Opinión</span>
          </NavLink> */}

          <NavLink
            to="/cafe/photos/upload"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <Camera className="h-4 w-4" />
            <span>Subir Fotos</span>
          </NavLink>

          {isLoggedIn ? (
            <UserLoggedIn/>
          ) : (
            <Authenticacion/>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
          >
            {theme === "light" ? (
              <>
                <Moon className="h-4 w-4" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                <span>Light Mode</span>
              </>
            )}
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full hidden md:flex"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
