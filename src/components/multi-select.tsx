'use client';

import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
  options: string[];
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

  const handleOptionToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="relative w-full">
      {/* Trigger */}
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
            value.join(', ')
          ) : (
            <span className="text-muted">{placeholder}</span>
          )}
        </span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-10 mt-2 w-full bg-card border rounded-md shadow-md text-card-foreground',
            'border-border',
          )}
        >
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center p-2 cursor-pointer hover:bg-muted"
            >
              <input
                type="checkbox"
                checked={value.includes(option)}
                onChange={() => handleOptionToggle(option)}
                className="mr-2"
              />
              <span className="flex-1">{option}</span>
              {value.includes(option) && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
