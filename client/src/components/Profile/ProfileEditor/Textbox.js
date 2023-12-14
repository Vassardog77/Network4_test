import React, { useState, useEffect, useRef } from "react";
import '../../../App.css';

function Textbox({ initialText, onTextChange, size }) {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const [isFirstEdit, setIsFirstEdit] = useState(true);
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (isFirstEdit) {
      setText('');
      setIsFirstEdit(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onTextChange(text);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      handleFocus();
    }
  }, [isEditing]);

  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          className="textboxEdit"
          style={{ width: size?.width, height: size?.height }} // Inline styles for dynamic sizing
        />
      ) : (
        <span className="textboxDisplay">{text}</span>
      )}
    </div>
  );
}

export default Textbox;