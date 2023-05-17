import React from 'react';
import Card from '../../components/Card/Card';

import './Home.css'

export default function Home() {
    return (
        <div className='home'>
            <h1>Home</h1>
            <div className='card-wrapper'>
                <Card />
            </div>
        </div>
    );
};