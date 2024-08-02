import { useMemo } from 'react';

// hook to format datetime
const useFormatDate = (isoString: any) => {
  try {
    return useMemo(() => {
      const date = new Date(isoString);
      return date.toLocaleDateString();
    }, [isoString]);
  } catch (error) {
    return '';
  }
};

export default useFormatDate;
