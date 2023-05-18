import Button  from "../Button/Button";
import React from "react";

import './FormNewPost.css';

export default function FormNewPost({ btn, onChange, insertPost }){
    return(
        <section id="form-section" className="form-container">
            <div className="card-form">
                <form name="newPost" className="newPost">
                    <div>
                        <input name="title" id="title" className="form-control" type="text" placeholder="Titulo" onChange={onChange} />
                    </div>
                    <div> 
                        <input name="coverImg" id="imgUrl" className="form-control" type="text" placeholder="URL Imagem da capa" onChange={onChange}/>
                    </div>
                    <div> 
                        <textarea name="body" id="content" rows="4" cols="55" className="form-control" placeholder="Conteúdo" onChange={onChange}/>
                    </div>
                    <div className="btn-container">
                        {
                            btn 
                                ?
                                    <Button type="button" text="Salvar" className="btn btn-primary" onClick={insertPost} />
                                :
                                <div>
                                    <Button type="button" text="Alterar" className="btn btn-warning" />
                                    <Button type="button" text="Remover" className="btn btn-danger" />
                                    <Button type="button" text="Cancelar" className="btn btn-secondary" />
                                </div>
                        }                  
                    </div>
                    
                </form>
            </div>
        </section>
    );
}