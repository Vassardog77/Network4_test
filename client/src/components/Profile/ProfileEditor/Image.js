import React from 'react';
import '../../../App.css';

function Image({ src, width, height }) {
    // Apply the width and height props to the image style
    const imageStyle = {
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
    };

    return <img src={src} alt="Uploaded" style={imageStyle} className="importedImage" />;
}

export default Image;
