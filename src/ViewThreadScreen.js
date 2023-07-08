import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { collection, query, where, getDocs, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import './css/ViewThreadScreen.css';
import incognito from './incognito.png';
import { useNavigate } from 'react-router';
import replyicon from './reply.png'

const ViewThreadScreen = () => {
  const navigate = useNavigate();
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [comment, setComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleReplyCommentChange = (event) => {
    setReplyComment(event.target.value);
  };

  const handleSubmitComment = async (event) => {
  event.preventDefault();

  if (!comment && !replyComment) {
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
        id: new Date().getTime(),
        text: replyingTo !== null ? replyComment : comment,
        timestamp: Date.now(),
        repliedTo: replyingTo !== null ? replyingTo : null,
      };

      await updateDoc(threadRef, {
        comments: arrayUnion(commentData),
      });

      setComment('');
      setReplyComment('');
      setReplyingTo(null);
    } else {
      setError('Thread not found');
    }
  } catch (error) {
    console.log('Error adding comment:', error);
  }
  navigate(0);
};


  const handleReply = (commentIndex) => {
    setReplyingTo((prevReplyingTo) => (prevReplyingTo === commentIndex ? null : commentIndex));
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



const renderComments = (comments, indentLevel = 0) => {
  return comments.map((comment) => {
    const replies = thread.comments.filter((c) => c.repliedTo === comment.id);

    return (
      <div key={comment.id} className="comment" style={{ marginLeft: `${20}px` }}>
        <div className="comment-content">
          <div className="comment-icon">
            <img src={incognito} alt="Comment Icon" width="30" />
          </div>
          <div className="comment-text">
            <p>{comment.text}</p>
            {comment.id === replyingTo && (
              <form
                className="comment-form reply-form"
                onSubmit={(e) => handleSubmitComment(e, comment.id)}
              >
                <div className="comment-input-container">
                  <textarea
                    className="comment-input"
                    value={replyComment}
                    onChange={handleReplyCommentChange}
                    placeholder="Reply to comment..."
                  ></textarea>
                </div>
                <button className="comment-submit" type="submit">
                  Submit Reply
                </button>
              </form>
            )}
          </div>
          <div className="comment-actions">
            <button className="reply-button" onClick={() => handleReply(comment.id)}>
              <img src={replyicon} alt="Reply Icon" width="20" />
            </button>
          </div>
        </div>
        {replies.length > 0 && (
          <div className="comment-replies">
            {renderComments(replies, indentLevel + 1)}
          </div>
        )}
      </div>
    );
  });
};




const renderThreadComments = () => {
  if (thread && thread.comments && thread.comments.length > 0) {
    const rootComments = thread.comments.filter((comment) => comment.repliedTo === null);
    return renderComments(rootComments);
  } else {
    return <p>No comments yet.</p>;
  }
};



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
      <form className="comment-form" onSubmit={(e) => handleSubmitComment(e, null)}>
        <div className="comment-input-container">
          <textarea
            className="comment-input"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
          ></textarea>
        </div>
        <button className="comment-submit" type="submit">
          Add Comment
        </button>
      </form>
      <div className="existing-comments">{renderThreadComments()}</div>
    </div>
  </div>
);


};

export default ViewThreadScreen;
