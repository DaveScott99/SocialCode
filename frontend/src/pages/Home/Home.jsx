import React from 'react';
import Timeline from '../../components/Timeline/Timeline';

import './Home.css'
import NewPost from '../../components/NewPost/NewPost';

export default function Home() {
    return (
        <div className='home'>
            <div className='card-wrapper'>
                <header className="container-header-timeline">
                    <h1>Página Inicial</h1>
                </header>

                <NewPost />
                
                <Timeline />
            </div>
        </div>
    );
};