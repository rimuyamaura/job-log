import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface Alert {
  id: number;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface AlertContextType {
  addAlert: (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback(
    (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
      const id = Date.now();
      setAlerts((prevAlerts) => [...prevAlerts, { id, message, severity }]);
      setTimeout(() => {
        setAlerts((prevAlerts) =>
          prevAlerts.filter((alert) => alert.id !== id)
        );
      }, 5000);
    },
    []
  );

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      {alerts.map(({ id, message, severity }) => (
        <Snackbar
          key={id}
          open
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={() =>
            setAlerts((prevAlerts) =>
              prevAlerts.filter((alert) => alert.id !== id)
            )
          }
          sx={{ width: '100%', justifyContent: 'center' }}
        >
          <Alert
            onClose={() =>
              setAlerts((prevAlerts) =>
                prevAlerts.filter((alert) => alert.id !== id)
              )
            }
            severity={severity}
            sx={{
              width: '18rem',
              fontSize: '1rem',
              padding: '1rem',
            }}
          >
            <strong>{message}</strong>
          </Alert>
        </Snackbar>
      ))}
    </AlertContext.Provider>
  );
};

const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};

export default useAlertContext;
