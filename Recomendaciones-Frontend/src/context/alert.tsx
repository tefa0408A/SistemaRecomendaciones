import { createContext, useContext, useState, ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertContextType {
  showAlert: (message: string, type?: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("info");

  const showAlert = (msg: string, alertType: AlertType = "info") => {
    setMessage(msg);
    setType(alertType);
    setOpen(true);
  };

  const alertStyles: Record<AlertType, string> = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <Toast.Provider>
        <Toast.Root open={open} onOpenChange={setOpen} className={`p-4 rounded-lg shadow-lg ${alertStyles[type]}`}>
          <Toast.Title className="font-bold capitalize">{type}</Toast.Title>
          <Toast.Description>{message}</Toast.Description>
        </Toast.Root>

        <Toast.Viewport className="fixed bottom-4 right-4 w-96" />
      </Toast.Provider>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe usarse dentro de un AlertProvider");
  }
  return context;
}
