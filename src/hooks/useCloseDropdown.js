import { useEffect, useRef } from 'react';

export function useCloseDropdown(callback) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if user clicks outside of dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, callback]);

  return { dropdownRef };
}
