import React, { useState, useRef } from 'react';
import '../../../../App.css';

function DraggableTextbox({ children }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const dragItemRef = useRef(null);
    const startPositionRef = useRef(null);

    const startDragging = (e) => {
        let target = e.target;

        // Check if the target is an SVG element and adjust if necessary
        if (target.nodeName === 'svg' || target.nodeName === 'path') {
            target = target.parentNode; // Adjust to the parent node
        }

        // Ignore if the target is a resize handle or a rotate handle
        if (target.className.includes('resize-handle') || target.className.includes('rotate-handle')) {
            return;
        }

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
        if (!startPositionRef.current) {
            return;
        }

        const newPosition = {
            x: e.clientX - startPositionRef.current.x,
            y: e.clientY - startPositionRef.current.y,
        };
        setPosition(newPosition);
    };

    const stopDragging = () => {
        window.removeEventListener('mousemove', onDrag);
        window.removeEventListener('mouseup', stopDragging);
        startPositionRef.current = null; // Reset the start position reference
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

export default DraggableTextbox;
