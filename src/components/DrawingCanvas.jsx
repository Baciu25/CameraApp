import React, { useRef, useEffect } from "react";
const DrawingCanvas = ({ image, setSavedGallery, imgIdx, savedGallery }) => {
  const canvasRef = useRef(null);
  // const imageRef = useRef(null);
  let isDrawing = false;
  let context = null;
  useEffect(() => {
    const canvas = canvasRef.current;
    context = canvas.getContext("2d");
    context.strokeStyle = "rgb(256,0,0)";
    context.lineJoin = "round";
    context.lineWidth = 1;
    const imageObj = new Image();
    imageObj.onload = () => {
      context.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
    };
    imageObj.src = image;
  }, [image]);
  const startDrawing = (e) => {
    isDrawing = true;
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };
  const continueDrawing = (e) => {
    if (!isDrawing) return;
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };
  const stopDrawing = () => {
    isDrawing = false;
  };
  const saveCanvasImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    const updateEditingImg = [...savedGallery];
    updateEditingImg[imgIdx] = dataUrl;
    setSavedGallery(updateEditingImg);
  };
  return (
    <div>
      <canvas
        key={image}
        height={400}
        width={400}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={continueDrawing}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      <button onClick={saveCanvasImage}>Save Image</button>
    </div>
  );
};
export default DrawingCanvas;
