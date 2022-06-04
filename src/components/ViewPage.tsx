import React from 'react';

type ViewPageProps = {
    post: string;
};

export const ViewPage = (props: ViewPageProps) => {
    const { post } = props;
    return (
        <div>
            <h2>Mini Blog</h2>
            <h3>View</h3>
            <p id="view-container">{post}</p>
        </div>
    );
};

