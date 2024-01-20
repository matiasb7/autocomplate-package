import { useEffect, useRef, useState } from 'react';
import { KEYS } from '../constants.js';

const useAccessibleDropdown = ({ showDropdown, handleSelectItem, items }) => {
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
  const dropdownContainerRef = useRef(null);
  const scrollToFocusedItem = (index) => {
    const dropdownEl = dropdownContainerRef.current;
    const focusedItemEl = dropdownEl?.querySelector(`li:nth-child(${index + 1})`);

    if (focusedItemEl && dropdownEl) {
      const { top: itemTop, bottom: itemBottom } = focusedItemEl.getBoundingClientRect();
      const { top: containerTop, bottom: containerBottom } = dropdownEl.getBoundingClientRect();

      if (itemBottom > containerBottom) {
        // Scroll down
        dropdownEl.scrollTop += itemBottom - containerBottom;
      } else if (itemTop < containerTop) {
        // Scroll up
        dropdownEl.scrollTop -= containerTop - itemTop;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    if (e.key === KEYS.ENTER) {
      handleSelectItem(items[focusedOptionIndex].label);
      return;
    }

    const actions = {
      [KEYS.DOWN]: (prevItem, total) => (prevItem + 1) % total,
      [KEYS.UP]: (prevItem, total) => (prevItem - 1) % total,
    };

    if (e.key in actions && items.length > 0) {
      e.preventDefault();
      setFocusedOptionIndex((prevIndex) => {
        const newFocusedIndex = actions[e.key](prevIndex, items.length);
        scrollToFocusedItem(newFocusedIndex);
        return newFocusedIndex;
      });
    }
  };

  useEffect(() => {
    // Reset focused option when dropdown is closed
    if (!showDropdown) {
      dropdownContainerRef.current.scrollTop = 0;
      setFocusedOptionIndex(0);
    }
  }, [showDropdown]);

  return {
    dropdownContainerRef,
    handleKeyDown,
    focusedOptionIndex,
  };
};

export default useAccessibleDropdown;
