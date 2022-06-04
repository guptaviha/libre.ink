import React, { useState } from 'react';

export const EditPage = () => {
    const [postContent, setPostContent] = useState('');

    return (
        <div>
            <h2>Mini Blog</h2>
            <h3>Edit</h3>
            <textarea
                id="edit-container"
                value={postContent}
                onChange={(event) => setPostContent(event.target.value)}
            />
            <button id="publish-btn" onClick={() => {
                const encodedPost = btoa(postContent);
                window.location.search = `?post=${encodedPost}`
            }}>
                Publish
            </button>
        </div>
    );
};

