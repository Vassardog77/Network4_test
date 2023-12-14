import React, { useState, useEffect, useRef } from 'react';
import '../../../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';

function ResizableImage({ children, src }) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [rotation, setRotation] = useState(0);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // State to track the start position
    const imageContainerRef = useRef(null);

    useEffect(() => {
        if (src) {
            const img = new Image();
            img.onload = () => {
                const initialWidth = img.height > 600 ? (img.width / img.height) * 600 : img.width;
                const initialHeight = img.height > 600 ? 600 : img.height;
                setDimensions({ width: initialWidth, height: initialHeight });
            };
            img.src = src;
        }
    }, [src]);

    const startResizing = (e) => {
        if (e.target.className === 'resize-handle') {
            e.stopPropagation();
            const dimensions = imageContainerRef.current.getBoundingClientRect();
            // Calculate and store the start position relative to the image
            setStartPosition({ 
                x: e.clientX - dimensions.right,
                y: e.clientY - dimensions.bottom
            });
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        }
    };

    const resize = (e) => {
        // Apply the start position offset when resizing
        setDimensions({
            width: e.clientX - imageContainerRef.current.getBoundingClientRect().left + startPosition.x,
            height: e.clientY - imageContainerRef.current.getBoundingClientRect().top + startPosition.y
        });
    };

    const stopResizing = () => {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResizing);
    };

    const startRotating = (e) => {
        e.stopPropagation();
        setStartPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', rotate);
        window.addEventListener('mouseup', stopRotating);
    };

    const rotate = (e) => {
        const rect = imageContainerRef.current.getBoundingClientRect();
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
            ref={imageContainerRef} 
            className="image-container" 
            style={{ width: dimensions.width, height: dimensions.height, transform: `rotate(${rotation}deg)` }}>
            <div onMouseDown={startRotating} className="rotate-handle">
                <FontAwesomeIcon icon={faArrowsSpin} size="2x" /> {/* FontAwesome icon for rotation */}
            </div>
            {React.cloneElement(children, { width: dimensions.width, height: dimensions.height })}
            <div onMouseDown={startResizing} className="resize-handle" />
        </div>
    );
}

export default ResizableImage;
