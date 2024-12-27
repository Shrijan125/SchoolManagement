'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  placeholder?: string;
  value: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = 'Select options',
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className={cn(
          'flex items-center justify-between w-full px-4 py-2 border rounded-md text-muted-foreground',
          'bg-card border-border focus:outline-none focus:ring-2 focus:ring-ring',
        )}
      >
        <span>
          {value.length > 0 ? (
            options
              .filter((option) => value.includes(option.value))
              .map((option) => option.label)
              .join(', ')
          ) : (
            <span>{placeholder}</span>
          )}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute z-10 mt-2 w-full bg-card border rounded-md shadow-md text-card-foreground',
            'border-border',
          )}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center p-2 cursor-pointer hover:bg-muted"
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => handleOptionToggle(option.value)}
                className="mr-2"
              />
              <span className="flex-1 select-none">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
