import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

const VideoRecordingComponent = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Request access to the media devices
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        // Start recording
        recorder.start();
        console.log('Recording started');
      })
      .catch(error => console.error('Error accessing media devices:', error));
  }, []);

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log('Recording stopped');

      // Handle the recorded data
      mediaRecorder.ondataavailable = (e) => {
        const videoData = e.data;
        const url = URL.createObjectURL(videoData);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = 'recording.webm';
        a.click();
        window.URL.revokeObjectURL(url);
      };
    }
  };

  return (
    <div>
      <Webcam ref={videoRef} audio={true} videoConstraints={{ width: 300, height: 300 }}
        style={{ width: '300px', height: '300px' }}/>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
};

export default VideoRecordingComponent;
