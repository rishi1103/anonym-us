import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/HomeScreen.css';
import { db } from './firebase'; // Import your Firebase configuration and initialize Firebase
import { collection, getDocs } from 'firebase/firestore';

const TrendingThreads = ({ trendingThreads }) => {
  const currentTime = new Date().getTime();
  const twentyFourHoursAgo = currentTime - 24 * 60 * 60 * 1000;

  const sortedThreads = trendingThreads.sort((a, b) => {
    const aRecentComments = a.comments ? a.comments.filter(
      (comment) => comment.timestamp >= twentyFourHoursAgo
    ) : [];
    const bRecentComments = b.comments ? b.comments.filter(
      (comment) => comment.timestamp >= twentyFourHoursAgo
    ) : [];
    return bRecentComments.length - aRecentComments.length;
  });

  return (
    <div>
      <h2>Trending Threads</h2>
      {sortedThreads.map((thread) => {
        const threadRecentComments = thread.comments ? thread.comments.filter(
          (comment) => comment.timestamp >= twentyFourHoursAgo
        ) : [];
        return (
        <Link to={`/threads/${thread.createdAt}`} style={{ textDecoration: 'none' }}>
          <div className="thread-box" key={thread.id}>
            <div className="comment-count-box">
              <p>{threadRecentComments.length}</p>
            </div>
            <div className="thread-details">
              <div className="thread-title-container">
                  <h3>{thread.title}</h3>
              </div>
              <p>{thread.content.slice(0, 100)}</p>
            </div>
          </div>
         </Link>
        );
      })}
    </div>
  );


};


const LatestThreads = ({ latestThreads }) => {
  const sortedThreads = latestThreads.sort((a, b) => b.createdAt - a.createdAt);

  return (
  <div>
    <h2>Latest Threads</h2>
    {sortedThreads.map((thread) => {
      return (
        <Link to={`/threads/${thread.createdAt}`} style={{ textDecoration: 'none' }}>
          <div className="thread-box" key={thread.id}>
            <div className="comment-count-box">
              <p>{thread.comments ? thread.comments.length : 0}</p>
            </div>
            <div className="thread-details">
              <div className="thread-title-container">
                <h3>{thread.title}</h3>
              </div>
              <p>{thread.content.slice(0, 100)}</p>
            </div>
          </div>
        </Link>
      );
    })}
  </div>
);


};

const HomeScreen = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrending, setShowTrending] = useState(true);

  const handleToggle = () => {
    setShowTrending(!showTrending);
  };

  const fetchThreadsData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Threads'));
      const threadsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setThreads(threadsData);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching threads data:', error);
      setError('Failed to fetch threads');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreadsData();
  }, []);

if (loading) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
}

if (error) {
  return (
    <div className="error-container">
      <div className="error-text">Oops, Some Error Occurred</div>
    </div>
  );
}


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

      {showTrending ? <TrendingThreads trendingThreads={threads} /> : <LatestThreads latestThreads={threads} />}
    </div>
  );
};

export default HomeScreen;
