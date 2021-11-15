import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
// import logo from './logo.svg';
import "./App.css";

function App() {
  const WebcamRef = useRef(null);
  const CanvasRef = useRef(null);
  const runHandPose = async () => {
    handpose.load().then((net) => {
      console.log("Handpose model is loaded!");
      // Loop and Detect hands
      setInterval(() => {
        detect(net);
      }, 100);
    });
  };
  const detect = async (net) => {
    // Check if data is available
    if (
      typeof WebcamRef.current !== "undefined" &&
      WebcamRef.current !== null &&
      WebcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = WebcamRef.current.video;
      const videoHeight = WebcamRef.current.video.videoheight;
      const videoWidth = WebcamRef.current.video.videoWidth;

      // set video height and width
      WebcamRef.current.video.height = videoHeight;
      WebcamRef.current.video.width = videoWidth;

      // set canvas height and width
      CanvasRef.current.height = videoHeight;
      CanvasRef.current.width = videoWidth;

      // Make detections
      const hand = await net.estimateHands(video);
      console.log("HAND: ", hand);
      // Draw mesh
    }
  };
  runHandPose();
  return (
    <div className="App">
      <Webcam
        ref={WebcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          borderRadius: "50px",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={CanvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
}

export default App;
