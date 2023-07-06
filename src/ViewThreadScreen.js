import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { collection, query, where, getDocs, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import './css/ViewThreadScreen.css';
import incognito from './incognito.png';
import { useNavigate } from 'react-router'

const ViewThreadScreen = () => {
  const navigate = useNavigate();
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

const handleSubmitComment = async (event) => {
  event.preventDefault();

  if (!comment) {
    return;
  }

  try {
    const threadsRef = collection(db, 'Threads');
    const q = query(threadsRef, where('createdAt', '==', Number(threadId)));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const threadDoc = querySnapshot.docs[0];
      const threadRef = doc(db, 'Threads', threadDoc.id);
      
      const commentData = {
        text: comment,
        timestamp: Date.now(),
      };

      await updateDoc(threadRef, {
        comments: arrayUnion(commentData),
      });

      setComment('');
    } else {
      setError('Thread not found');
    }
  } catch (error) {
    console.log('Error adding comment:', error);
  }
  navigate(0);
};



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
        <div className="view-thread-box">
          <div className="view-thread-content">
            <h3>{thread.title}</h3>
            <p>{thread.content}</p>
          </div>
        </div>
      )}
      <div className="view-comment-section">
        <form className="comment-form" onSubmit={handleSubmitComment}>
          <div className="comment-input-container">
            <textarea
              className="comment-input"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
            ></textarea>
          </div>
          <button className="comment-submit" type="submit">Add Comment</button>
        </form>
        <div className="existing-comments">
          {thread && thread.comments && thread.comments.length > 0 ? (
            thread.comments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-icon">
                  <img src={incognito} alt="Comment Icon" width="30" />
                </div>
                <div className="comment-content">
                  <p>{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewThreadScreen;
