import React, { useState } from "react";
import html2canvas from 'html2canvas';
import Textbox from "./Textbox";
import ImageComponent from "./Image"; 
import ResizableImage from "./Custom Components/ResizableImage";
import ResizableTextbox from "./Custom Components/ResizableTextbox";
import DraggableImages from "./Custom Components/DraggableImages";
import DraggableTextbox from "./Custom Components/DraggableTextbox";
import { useDispatch } from 'react-redux';
import { postProfile } from '../../../actions/profileActions';

function EditorVisuals() {
  const [elements, setElements] = useState([]);
  const fileInputRef = React.useRef(null);
  const dispatch = useDispatch();
  const current_user = JSON.parse(localStorage.getItem('user'));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setElements([...elements, { type: "image", src: url }]);
  };

  const addTextBox = () => {
    setElements([...elements, { type: "text", text: "New Text Box" }]);
  };

  const handleTextChange = (index, newText) => {
    const newElements = [...elements];
    newElements[index].text = newText;
    setElements(newElements);
  };

  const saveImage = () => {
    const displayArea = document.querySelector('.display-area');
    const resizableElements = document.querySelectorAll('.resizable-element');
    const resizeHandles = document.querySelectorAll('.resize-handle');
    const rotateHandles = document.querySelectorAll('.rotate-handle');

    // Hide resize and rotate handles
    resizeHandles.forEach(handle => handle.style.display = 'none');
    rotateHandles.forEach(handle => handle.style.display = 'none');

    html2canvas(displayArea).then((canvas) => {
      // Convert canvas to base64 string
      const base64Image = canvas.toDataURL('image/png');

      // Dispatch profile with screenshot
      const profile = {
        "user": current_user.email,
        "img1": base64Image,
        "org_name": null,
        "img2": null,
        "contact": null,
        "img3": null,
        "description": null,
        "img4": null
      };

      dispatch(postProfile(profile));
      alert("Profile Updated!");

      // Show resize and rotate handles again
      resizeHandles.forEach(handle => handle.style.display = '');
      rotateHandles.forEach(handle => handle.style.display = '');
    });
  };

  return (
    <div className="background">
      <div className="top-bar">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button onClick={() => fileInputRef.current.click()}>Import Image</button>
        <button onClick={addTextBox}>Add Text Box</button>
        <button onClick={saveImage}>Update Profile</button>
        <span>*to delete something simply drag it off the page</span>
      </div>
      <div className="display-area">
        {elements.map((element, index) =>
          element.type === "image" ? (
            <DraggableImages key={index}>
                <ResizableImage className="resizable-element" src={element.src}>
                    <ImageComponent src={element.src} />
                </ResizableImage>
            </DraggableImages>
          ) : (
            <DraggableTextbox key={index}>
            <ResizableTextbox className="resizable-element">
              <Textbox
                initialText={element.text}
                onTextChange={(newText) => handleTextChange(index, newText)}
              />
            </ResizableTextbox>
          </DraggableTextbox>
          )
        )}
      </div>
    </div>
  );
}

export default EditorVisuals;
