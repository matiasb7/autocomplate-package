import React, { useEffect, useState } from 'react';
import { useCloseDropdown } from './hooks/useCloseDropdown.js';
import './styles/styles.css';
import useAccessibleDropdown from './hooks/useAccessibleDropdown.js';
const Autocomplete = ({
  inputKey,
  placeholder,
  listToFilter,
  modifierClass,
  initValue,
  isRestrictedToOption,
  onChange,
  notFoundMessage,
}) => {
  const [inputValue, setInputValue] = useState(initValue || '');
  const [currentValue, setCurrentValue] = useState(null);
  const [items, setItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectItem = (label, key) => {
    setInputValue(label);
    setCurrentValue({ label, key });
    setShowDropdown(false);
  };

  const { handleKeyDown, dropdownContainerRef, focusedOptionIndex } = useAccessibleDropdown({
    showDropdown,
    handleSelectItem,
    items,
  });

  const { dropdownRef } = useCloseDropdown(() => {
    setShowDropdown(false);

    if (isRestrictedToOption) {
      // Check if value is in list, if not, remove it.
      const isValueInList = listToFilter.some(
        (item) => item.label.toUpperCase() === inputValue.toUpperCase(),
      );
      if (!isValueInList) {
        setInputValue('');
        if (currentValue) setCurrentValue(null);
      }
    }
  });

  useEffect(() => {
    console.log('cond: ', inputValue && inputValue !== initValue);
    if (inputValue && inputValue !== initValue) {
      const filteredList = listToFilter.filter((item) => {
        return item.label.toLowerCase().includes(inputValue);
      });

      if (filteredList.length > 0 && !showDropdown) setShowDropdown(true);
      if (!notFoundMessage) setShowDropdown(filteredList.length > 0);
      setItems(filteredList);
    } else if (showDropdown) {
      setShowDropdown(false);
    }

    if (!isRestrictedToOption && onChange) {
      onChange(inputValue, currentValue);
    }
  }, [inputValue]);

  useEffect(() => {
    if (isRestrictedToOption && onChange) onChange(currentValue);
  }, [currentValue]);

  const handleOptionClick = (label, key) => handleSelectItem(label, key);
  const handleFocus = () => {
    if (items.length === 0) setItems(listToFilter);
    setShowDropdown(true);
  };

  return (
    <div
      className={`autocomplete ${modifierClass ? `autocomplete--${modifierClass}` : ''}`}
      ref={dropdownRef}
    >
      <label htmlFor={inputKey} className='visually-hidden'>
        Start typing to see all the related options.
      </label>
      <input
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        id={inputKey}
        type='text'
        className={`autocomplete__input ${!inputValue ? '--empty' : ''}`}
        placeholder={placeholder}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => setShowDropdown(false)}
        aria-expanded={showDropdown}
        value={inputValue}
      />
      <div className='autocomplete__container'>
        <ul
          className={`autocomplete__search ${showDropdown ? '--show' : '--hide'}`}
          ref={dropdownContainerRef}
        >
          {items.map((item, index) => {
            return (
              <li
                role='option'
                onMouseDown={() => handleOptionClick(item.label, item.key)}
                key={item.key}
                aria-selected={focusedOptionIndex === index}
                className={`autocomplete__search-item ${index === focusedOptionIndex ? 'focused' : ''}`}
              >
                {item.label}
              </li>
            );
          })}
          {notFoundMessage && items.length === 0 && (
            <li className='autocomplete__search-item'>{notFoundMessage}</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
