import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import DrawingCanvas from "./DrawingCanvas";
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
function Profile() {
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  let [savedGallery, setSavedGallery] = useState([]);
  let [imageIndex, setImageIndex] = useState(-1);
  let [isCanvasActive, setIsCanvasActive] = useState(false);
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  });
  useEffect(() => {
    if (picture != "") setSavedGallery([...savedGallery, picture]);
  }, [picture]);
  useEffect(() => {
    // console.log(savedGallery);
  }, [savedGallery]);
  const handleRetake = () => {
    setPicture(""); // Reset the picture state to an empty string
  };
  function deleteImage(index) {
    setSavedGallery((preImg) => preImg.filter((img, idx) => idx !== index));
  }
  function drawImage(img, idx) {
    setIsCanvasActive(true);
    setImageIndex(idx);
    console.log(savedGallery[idx]);
    // console.log(savedGallery);
  }
  function saveChanges(currentImage) {}
  return (
    <div>
      <h1 className=" relative z-50 text-center bg-blue-500 text-white text-5xl p-2">
        Image Capturing
      </h1>
      <div className="flex  h-full w-full">
        <div className="w-60 h-screen flex flex-col bg-red-500 gap-4 p-4 overflow-y-auto fixed top-16">
          {savedGallery.map((img, index) => {
            return (
              <div key={index}>
                <img
                  onClick={(e) => {
                    setImageIndex(index);
                  }}
                  src={img}
                  alt="Image"
                />
                <div className="flex flex-col">
                  <div className="flex ">
                    <button
                      className="flex-1  bg-yellow-400 my-2 p-2"
                      onClick={(e) => deleteImage(index)}
                    >
                      Delete
                    </button>
                    <a
                      className="flex-1"
                      href={savedGallery[index]}
                      download={index}
                    >
                      <button className="  bg-green-400 m-2 p-2">
                        Download
                      </button>
                    </a>
                  </div>
                  <button
                    className=" bg-yellow-400 my-2 p-2"
                    onClick={(e) => drawImage(img, index)}
                  >
                    Draw
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className=" w-full absolute top-16 left-60 bg-green-500">
          <div className="w-full z-50">
            {isCanvasActive ? (
              <div>
                <DrawingCanvas
                  image={savedGallery[imageIndex]}
                  setSavedGallery={setSavedGallery}
                  savedGallery={savedGallery}
                  imgIdx={imageIndex}
                />
                <button
                  onClick={() => saveChanges(savedGallery[imageIndex])}
                  className="bg-blue-400 px-4 py-2 m-4 "
                >
                  Save Changes
                </button>
              </div>
            ) : (
              ""
            )}
            {/* <img src={savedGallery[imageIndex]} alt="" /> */}
          </div>
          <div>
            {picture === "" ? (
              <Webcam
                className="h-96 p-4"
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            ) : (
              <div className="w-2/3 p-4"></div>
            )}
            <div>
              {picture !== "" ? (
                <div className="w-2/3 p-4">
                  <button
                    onClick={handleRetake}
                    className="bg-blue-400 px-4 py-2 m-4 "
                  >
                    Retake
                  </button>
                </div>
              ) : (
                <button onClick={capture} className="bg-red-400 px-4 py-2 m-4 ">
                  Capture
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
