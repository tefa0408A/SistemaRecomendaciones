import { Separator } from "../ui/separator";
import { Link} from "react-router";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background/95 mt-auto">
      <section className="w-full">
        <Separator />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Cafemanía. Todos los derechos reservados.</div>
          <div className="flex gap-4">
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Términos
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacidad
            </Link>
          </div>
        </div>
      </section>
    </footer>

  );
};

export default Footer;
