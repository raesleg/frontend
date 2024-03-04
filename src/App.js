import './App.css';
import { useState, useEffect } from 'react';
import { Recorder } from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';
import axios from 'axios';

// const assemblyApi = axios.create({
//   baseURL: 'https://api.assemblyai.com/v2',
//   headers: {
//     authorization: process.env.REACT_APP_ASSEMBLY_API_KEY,
//     'content-type': 'application/json',
//   },
// });

const initialState = {
  url: null,
  blob: null,
  chunks: null,
  duration: {
    h:0,
    m:0,
    s:0
  },
}

function App() {
  const [audioDetails, setAudioDetails] = useState(initialState);
  const [transcript, setTranscript] = useState({ id: ''});
  const [isLoading, setIsLoading] = useState(false);

  const handleAudioStop = (data) => {
    setAudioDetails(data);
  };

  const handleReset = () => {
    setAudioDetails({...initialState});
    setTranscript({ id: ''})
  }

  const handleAudioUpload = async (audioFile) => {
    setIsLoading(true);

    const {data: uploadResponse} = await assemblyApi.post('/upload',audioFile);

    const {data} = await assemblyApi.post('/transcript', {
      audio_url: uploadResponse.upload_url,
      sentiment_analysis: true,
      entity_detection: true,
      iab_categories: true,
    });

    setTranscript({ id: data.id });
  }

  return (
    <div className="container">
      <Recorder
        record = {true}
        audioURL= {audioDetails.url}
        handleAudioStop = {handleAudioStop}
        handleAudioUpload = {handleAudioUpload}
        handleReset = {handleReset}
        />
    </div>
  );
}

export default App;
