import React from 'react';

export function Table({ children, className }) {
  return <table className={`min-w-full ${className}`}>{children}</table>;
}

export function TableHead({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableRow({ children }) {
  return <tr className="hover:bg-gray-50">{children}</tr>;
}

export function TableCell({ children, className }) {
  return <td className={`px-4 py-2 border-b ${className}`}>{children}</td>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}
