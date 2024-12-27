'use client';
import React from 'react';
import { Button } from '../ui/button';
import Loader from '../loader';

const ActionButton = ({
  variant,
  disabled,
  handleClick,
  id,
}: {
  variant?: string;
  disabled: boolean;
  handleClick: ({ id }: { id: string }) => void;
  id: string;
}) => {
  return (
    <Button
      disabled={disabled}
      size={'sm'}
      onClick={() => handleClick({ id })}
      className={`${variant === 'edit' ? 'bg-green-600 hover:bg-green-700 transition-colors duration-150' : 'bg-red-600 hover:bg-red-700 transition-colors duration-150'}`}
    >
      {disabled ? <Loader></Loader> : variant === 'edit' ? 'Edit' : 'Delete'}
    </Button>
  );
};

export default ActionButton;
