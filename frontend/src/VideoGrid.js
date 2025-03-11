import React from 'react';

const VideoGrid = ({ videos, onSelect }) => (
  <div className="video-grid">
    {videos.map(video => (
      <div key={video._id} className="video-card" onClick={() => onSelect(video)}>
        <img src={video.thumbnail} alt={video.title} />
        <h3>{video.title}</h3>
      </div>
    ))}
  </div>
);

export default VideoGrid;
