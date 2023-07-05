import React, { useState } from 'react';
import './css/CreateThreadScreen.css';
import app from './firebase.js'

const CreateThreadScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  var ThreadsDB = app.database().ref('Threads');

  const handleCreateThread = () => {
    // Perform thread creation logic here
    if (title && content) {
      var newThread = ThreadsDB.push();

      newThread.set({
        id : ThreadsDB.length + 1,
        title : title,
        comments: null,
      });
      // Process the thread data, for example, send a request to an API or save to the database
      console.log('Thread created successfully!');
      // Optionally, you can redirect the user to a different page after successful thread creation
    } else {
      console.log('Please fill in all the required fields');
    }
  };

  return (
    <div className="create-thread-container">
      <h2>Create Thread</h2>
      <form className="create-thread-form">
        <input
          type="text"
          placeholder="Thread Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="create-thread-input"
        />
        <textarea
          placeholder="Thread Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="create-thread-textarea"
        />
        <button onClick={handleCreateThread} className="create-thread-button">Create Thread</button>
      </form>
    </div>
  );
};

export default CreateThreadScreen;
