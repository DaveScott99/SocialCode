import React from 'react';

import './Home.css'
import Post from '../../components/Post/Post';

export default function Home() {
    return (
        <div className='home'>
            <div className='card-wrapper'>
                <Post />
            </div>
        </div>
    );
};