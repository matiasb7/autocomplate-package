import React, { useCallback, useEffect, useState } from "react";
import { useCloseDropdown } from "./hooks/useCloseDropdown.js";
import "./styles/styles.css";
const Autocomplete = ({
  inputKey,
  placeholder,
  listToFilter,
  modifierClass,
  initValue,
  isRestrictedToOption,
  onChange,
}) => {
  const [value, setValue] = useState(initValue || "");
  const [items, setItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { dropdownRef } = useCloseDropdown(() => {
    setShowDropdown(false);

    if (isRestrictedToOption) {
      // Check if value is in list, if not, remove it.
      const isValueInList = listToFilter.some(
        (item) => item.label.toUpperCase() === value.toUpperCase(),
      );
      if (!isValueInList) setValue("");
    }
  });

  useEffect(() => {
    if (value && value !== initValue) {
      const filteredList = listToFilter.filter((item) => {
        return item.label.toLowerCase().includes(value);
      });
      setShowDropdown(filteredList.length > 0);
      setItems(filteredList);
    } else if (showDropdown) {
      setShowDropdown(false);
    }

    if (onChange) onChange(value);
  }, [value]);

  const handleOptionClick = useCallback((e) => {
    setValue(e.target.innerText);
    setShowDropdown(false);
  }, []);

  const handleFocus = useCallback(() => {
    if (items.length === 0) setItems(listToFilter);
    setShowDropdown(true);
  }, []);

  return (
    <div
      className={`autocomplete ${
        modifierClass ? `autocomplete--${modifierClass}` : ""
      }`}
      ref={dropdownRef}
    >
      <label htmlFor={inputKey} className="visually-hidden">
        Start typing to see all the related options.
      </label>
      <input
        onFocus={handleFocus}
        id={inputKey}
        type="text"
        className={`autocomplete__input ${!value ? "--empty" : ""}`}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        aria-expanded={showDropdown}
        value={value}
      />
      <div className="autocomplete__container">
        <ul
          className={`autocomplete__search ${
            showDropdown ? "--show" : "--hide"
          }`}
        >
          {items.map((item) => {
            return (
              <li
                role="button"
                onClick={handleOptionClick}
                key={item.key}
                className="autocomplete__search-item"
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
