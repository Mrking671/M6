import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoGrid from './VideoGrid';
import VideoPlayer from './VideoPlayer';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    axios.get('/api/videos')
      .then(res => setVideos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      {selectedVideo ? (
        <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      ) : (
        <VideoGrid videos={videos} onSelect={setSelectedVideo} />
      )}
    </div>
  );
}

export default App;
