import React, { useState, useRef } from 'react';

function DraggableImages({ children }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const dragItemRef = useRef(null);
    const startPositionRef = useRef({ x: 0, y: 0 });

    const startDragging = (e) => {
        if (e.currentTarget === dragItemRef.current) {
            e.preventDefault();
            startPositionRef.current = {
                x: e.clientX - position.x,
                y: e.clientY - position.y,
            };
            window.addEventListener('mousemove', onDrag);
            window.addEventListener('mouseup', stopDragging);
        }
    };

    const onDrag = (e) => {
        // Adjust position based on the initial offset
        const newPosition = {
            x: e.clientX - startPositionRef.current.x,
            y: e.clientY - startPositionRef.current.y,
        };
        setPosition(newPosition);
    };

    const stopDragging = () => {
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDragging);
    };

    return (
        <div 
            ref={dragItemRef} 
            onMouseDown={startDragging} 
            style={{ position: 'absolute', left: position.x, top: position.y }}
        >
            {children}
        </div>
    );
}

export default DraggableImages;