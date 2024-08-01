import { useMemo } from 'react';

// hook to format datetime
const useFormatDate = (isoString: string) => {
  if (!isoString) return '';
  return useMemo(() => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  }, [isoString]);
};

export default useFormatDate;
