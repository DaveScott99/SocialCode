import React from "react";

export default function FormNewPost(){
    return(
        <section id="form-section" className="form-container">
            <div className="card-form">
                <form name="newPost">
                    <div>
                        <label htmlFor="title" className="post_label">Titulo</label> 
                        <input name="title" id="title" className="form-input" type="text" />
                    </div>
                    <div> 
                        <label htmlFor="imgUrl" className="post_label">URL Imagem da capa</label>
                        <input name="imgUrl" id="imgUrl" className="form-input" type="text" />
                    </div>
                    <div> 
                        <label htmlFor="content" className="post_label">Conteúdo</label>
                        <textarea name="content" id="content" rows="4" cols="55" className="form-input"></textarea>
                    </div>
                    <div className="btn-container">
                        <button name="btnNewPost" className="btn" type="submit">Salvar</button>
                    </div>
                    
                </form>
            </div>
        </section>
    );
}