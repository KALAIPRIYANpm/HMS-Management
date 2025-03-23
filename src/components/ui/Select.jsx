import React from 'react';

export function Select({ value, onChange, children }) {
  return (
    <select
      className="px-3 py-2 border rounded-lg w-full"
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
}

export function SelectTrigger({ children, className }) {
  return <div className={`cursor-pointer ${className}`}>{children}</div>;
}

export function SelectContent({ children }) {
  return <div className="bg-white border rounded-lg shadow">{children}</div>;
}

export function SelectItem({ value, children }) {
  return (
    <option value={value} className="p-2 hover:bg-gray-100">
      {children}
    </option>
  );
}
