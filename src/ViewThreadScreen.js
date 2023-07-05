import React, { useEffect } from 'react';

const ViewThreadScreen = ({ match }) => {
  const threadId = match.params.threadId;

  useEffect(() => {
    // Fetch thread details based on threadId from the database
    console.log(`Fetching thread details for thread ID: ${threadId}`);
  }, [threadId]);

  return (
    <div>
      <h2>Thread Details</h2>
      <p>Thread ID: {threadId}</p>
      {/* Display thread content and replies */}
    </div>
  );
};

export default ViewThreadScreen;
