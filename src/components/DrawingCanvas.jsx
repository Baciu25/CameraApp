import React, { useRef, useEffect } from "react";

const DrawingCanvas = ({ image, setSavedGallery, imgIdx, savedGallery }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  let isDrawing = false;
  let context = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    context = canvas.getContext("2d");

    const loadImage = () => {
      const { naturalWidth, naturalHeight } = imageRef.current;
      canvas.width = naturalWidth;
      canvas.height = naturalHeight;

      context.drawImage(imageRef.current, 0, 0, naturalWidth, naturalHeight);
    };

    if (image) {
      imageRef.current = new Image();
      imageRef.current.addEventListener("load", loadImage);
      imageRef.current.src = image;
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", loadImage);
      }
    };
  }, [image]);

  const startDrawing = (e) => {
    isDrawing = true;
    context.beginPath();
    context.moveTo(
      e.nativeEvent.offsetX *
        (canvasRef.current.width / canvasRef.current.offsetWidth),
      e.nativeEvent.offsetY *
        (canvasRef.current.height / canvasRef.current.offsetHeight)
    );
  };

  const continueDrawing = (e) => {
    if (!isDrawing) return;
    context.lineTo(
      e.nativeEvent.offsetX *
        (canvasRef.current.width / canvasRef.current.offsetWidth),
      e.nativeEvent.offsetY *
        (canvasRef.current.height / canvasRef.current.offsetHeight)
    );
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
