import React from "react";
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from "react-router-dom";

import './Footer.css';

export default function Footer() {
    return(
        <footer className="border-top bg-light">
            <div className="container">
                <div className="row py-4 ">
                    <div className="col-12 col-md-4 text-center">
                        <Link to="/privacy" className="text-decoration-none text-dark">
                            Política de Privacidade
                        </Link>
                        <br />
                        <Link to="/terms" className="text-decoration-none text-dark">
                            Termos de Uso
                        </Link>
                        <br />
                        <Link to="/aboutus" className="text-decoration-none text-dark">
                            Quem Somos
                        </Link>
                        <br />
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        &copy; 2023 - ParaCodar
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        <ul className="social_list">
                            <li>
                                <FaInstagram />
                            </li>
                            <li>
                                <FaYoutube />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
      </footer>
    );
};