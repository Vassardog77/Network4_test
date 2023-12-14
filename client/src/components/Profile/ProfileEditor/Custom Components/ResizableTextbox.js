import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import '../../../../App.css';

function ResizableTextbox({ children }) {
  const [size, setSize] = useState({ width: 200, height: 200 }); // Default size
  const [rotation, setRotation] = useState(0); // State for rotation
  const textboxRef = useRef(null);
  const rotateRef = useRef(null); // Ref for the rotation handle

  const startResizing = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
  };

  const resize = (e) => {
    const dimensions = textboxRef.current.getBoundingClientRect();
    setSize({
      width: e.clientX - dimensions.left,
      height: e.clientY - dimensions.top
    });
  };

  const stopResizing = () => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResizing);
  };

  const startRotating = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', rotate);
    window.addEventListener('mouseup', stopRotating);
  };

  const rotate = (e) => {
    const rect = textboxRef.current.getBoundingClientRect();
    const center_x = rect.left + rect.width / 2;
    const center_y = rect.top + rect.height / 2;

    // Calculate the angle between the current mouse position and the center of the image
    const angle = Math.atan2(center_y - e.clientY, center_x - e.clientX);

    // Convert radians to degrees and update the rotation state
    const degree = (angle * (180 / Math.PI)) - 90;
    setRotation(degree);
};

  const stopRotating = () => {
    window.removeEventListener('mousemove', rotate);
    window.removeEventListener('mouseup', stopRotating);
  };

  return (
    <div 
      ref={textboxRef} 
      className="textbox" 
      style={{ width: size.width, height: size.height, transform: `rotate(${rotation}deg)` }}>
      {children}
      <div className="resize-handle" onMouseDown={startResizing}></div>
      <div 
        ref={rotateRef} 
        onMouseDown={startRotating} 
        className="rotate-handle" 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Center the icon
      >
        <FontAwesomeIcon icon={faArrowsSpin} size="2x" /> {/* FontAwesome icon for rotation */}
      </div>
    </div>
  );
}

export default ResizableTextbox;