import React from 'react';

import './Home.css'
import Post from '../../components/Post/Post';

export default function Home() {
    return (
        <div className='home'>
            <h1>Home</h1>
            <div className='card-wrapper'>
                <Post />
            </div>
        </div>
    );
};