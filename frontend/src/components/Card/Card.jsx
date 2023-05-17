
import React from "react"

import './Card.css';

export default function Card() {
    return (
        <div className="card">
            <div className="img">
                <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPHyV03Deu-xnAG__C1xjV5QdwyOokeVcWrHs9H6fXmQkoJgz_kOlRn7DDRsdujE3SPhu_JvMbKqaIhwuGdbcH5VHWe7YrZojzWu1m0ChI2Zeg-_KFGeb0wJ_tsHseNOi6Y5n37V2aiQ5e4mFR-q4oQ4UyzzzHy-flB0X0fJbwNYJQN703vWaygSui/s425/Capa%20JavaScript.png" alt="" />
            </div>

            <div className="content">
                <span className="title">Titulo para teste</span>
                <p className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Ex magni dolorum praesentium mollitia deserunt aspernatur, 
                    a illum velit iste explicabo quos rem quia in corrupti eius, 
                    facere, amet impedit voluptates.
                </p>
            </div>

            <div className="arrow">
                <span>&#8673;</span>
            </div>
        </div>
    );
}