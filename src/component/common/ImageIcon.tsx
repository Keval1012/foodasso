import React from 'react';

interface ImageIconProps {
  src: string;             // The source of the image (icon)
  alt?: string;            // Alternative text for accessibility
  width?: number | string; // Width of the image (can be number or string for Tailwind classes)
  height?: number | string;// Height of the image (can be number or string for Tailwind classes)
  className?: string;      // Additional custom classes for styling
  handleClick?: any;
}

const ImageIcon: React.FC<ImageIconProps> = ({ src, alt, width = 22, height = 22, className = '', handleClick }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={typeof width === 'number' ? `${width}px` : width}
      height={typeof height === 'number' ? `${height}px` : height}
      className={`inline-block ${className}`}
      onClick={handleClick}
    />
  );
};

export default ImageIcon;
