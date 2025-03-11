import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

const VideoPlayer = ({ video, onClose }) => {
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    axios.get(`/api/video/${video._id}`)
      .then(res => setStreamUrl(res.data.url))
      .catch(err => console.error(err));
  }, [video]);

  return (
    <div className="video-player">
      <button onClick={onClose}>Close</button>
      {streamUrl && <Plyr source={{ type: 'video', sources: [{ src: streamUrl }]}} />}
    </div>
  );
};

export default VideoPlayer;
