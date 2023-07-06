import React, { useRef, useEffect } from "react";
const DrawingCanvas = ({ image, setSavedGallery, imgIdx, savedGallery }) => {
  const canvasRef = useRef(null);
  let isDrawing = false;
  let context = null;
  const drawingData = []; // Store drawing data
  useEffect(() => {
    const canvas = canvasRef.current;
    context = canvas.getContext("2d");
    context.lineJoin = "round";
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dataUrl = canvas.toDataURL(); // Store the current drawing as an image
      canvas.width = width;
      canvas.height = height;
      const imageObj = new Image();
      imageObj.onload = () => {
        context.clearRect(0, 0, width, height);
        context.drawImage(imageObj, 0, 0, width, height);
      };
      imageObj.src = image;
    };
    const redrawImage = () => {
      drawingData.forEach((point) => {
        const { x, y } = point;
        context.lineTo(x, y);
        context.stroke();
      });
    };
    resizeCanvas();
    redrawImage();
    window.addEventListener("resize", resizeCanvas);
  }, [image]);
  const startDrawing = (e) => {
    isDrawing = true;
    context.strokeStyle = "rgb(0, 0, 255)";
    context.lineWidth = 10;
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
    <div className=" flex flex-col justify-center items-center">
      <canvas
        key={image}
        className="aspect-auto w-[500px] h-[500px] "
        // height={500}
        // width={500}
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
