import React, { useState } from 'react';
import './css/HomeScreen.css';
import threadsData from './data/threads.json';


const TrendingThreads = () => {
  // Access the trendingThreads array from the threadsData object
  const trendingThreads = threadsData.Threads;
  const currentTime = new Date().getTime();
  const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;

  // Sort the trendingThreads based on the number of recent comments
  const sortedThreads = trendingThreads.sort((a, b) => {

    const aRecentComments = a.comments.filter(comment => comment.timestamp >= twentyFourHoursAgo);
    const bRecentComments = b.comments.filter(comment => comment.timestamp >= twentyFourHoursAgo);

    return bRecentComments.length - aRecentComments.length;
  });

  return (
    <div>
      <h2>Trending Threads</h2>
      {sortedThreads.map(thread => {
        const threadRecentComments = thread.comments.filter(comment => comment.timestamp >= twentyFourHoursAgo);
        return (
          <div key={thread.id}>
            <h3>{thread.title}</h3>
            <p>Number of recent comments: {threadRecentComments.length}</p>
          </div>
        );
      })}
    </div>
  );
};


const LatestThreads = () => {
  const latestThreads = threadsData.Threads;

  const sortedThreads = latestThreads.sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      <h2>Latest Threads</h2>
      {sortedThreads.map((thread) => (
        <div key={thread.id}>
          <h3>{thread.title}</h3>
          <p>Comments: {thread.comments.length}</p>
        </div>
      ))}
    </div>
  );
};

const HomeScreen = () => {
  const [showTrending, setShowTrending] = useState(true);

  const handleToggle = () => {
    setShowTrending(!showTrending);
  };

  return (
    <div>
      <div className="heading-container">
        <h1>Current Threads</h1>
        <div className="toggle-container">
          <div className={`toggle ${showTrending ? 'left' : 'right'}`} onClick={handleToggle}>
            <div className="toggle-switch"></div>
          </div>
        </div>
      </div>

      {showTrending ? <TrendingThreads /> : <LatestThreads />}
    </div>
  );
};

export default HomeScreen;
