import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
