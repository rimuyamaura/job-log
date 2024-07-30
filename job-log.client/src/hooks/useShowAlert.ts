import { useAlertContext } from '../components';

// Hook to call alerts
const useShowAlert = () => {
  const { addAlert } = useAlertContext();

  const showAlert = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ) => {
    addAlert(message, severity);
  };

  return showAlert;
};

export default useShowAlert;
