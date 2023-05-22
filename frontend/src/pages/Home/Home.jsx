import React from 'react';
import Timeline from '../../components/Timeline/Timeline';

import './Home.css'

export default function Home() {
    return (
        <div className='home'>
            <div className='card-wrapper'>
                <Timeline />
            </div>
        </div>
    );
};