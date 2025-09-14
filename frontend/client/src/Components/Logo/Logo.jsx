import React from 'react';

const Logo = ({ 
  className = "", 
  textColor = "text-kyrogreen", 
  size = "text-2xl",
  weight = "font-bold"
}) => {
  return (
    <span className={`${size} ${weight} ${textColor} ${className}`}>
      KyroChat
    </span>
  );
};

export default Logo;
