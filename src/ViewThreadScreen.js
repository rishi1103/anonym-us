import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase'; // Import your Firebase configuration and initialize Firebase
import { collection, query, where, getDocs } from 'firebase/firestore';
import './css/ViewThreadScreen.css'

const ViewThreadScreen = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('This is the threadID ', threadId);

  useEffect(() => {
    const fetchThreadDetails = async () => {
      try {
        const threadsRef = collection(db, 'Threads');
        const q = query(threadsRef, where('createdAt', '==', Number(threadId)));
        const querySnapshot = await getDocs(q);


        if (!querySnapshot.empty) {
          const threadData = querySnapshot.docs[0].data();
          setThread(threadData);
        } else {
          setError('Thread not found');
        }

        setLoading(false);
      } catch (error) {
        console.log('Error fetching thread details:', error);
        setError('Failed to fetch thread details');
        setLoading(false);
      }
    };

    fetchThreadDetails();
  }, [threadId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="view-thread-container">
  <h2>Thread Details</h2>
  {thread && (
    <div className="thread-box">
      <div className="thread-content">
        <h3>{thread.title}</h3>
        <p>{thread.content}</p>
      </div>
    </div>
  )}
  <div className="comment-section">
    <h3>Comments</h3>
    {thread && thread.comments && thread.comments.length > 0 ? (
      thread.comments.map((comment, index) => (
        <div key={index} className="comment">
          <p>{comment}</p>
        </div>
      ))
    ) : (
      <p>No comments yet.</p>
    )}
  </div>
</div>

  );
};

export default ViewThreadScreen;
