import axios from "axios";

export default class PostService {
    constructor(){
        this.axios = axios.create({
            baseURL: "http://localhost:8080"
        })
    }

    // Função para resgatar todos os POSTS que vem do BACKEND
    async findAll() {
        try {
            const { data } = await this.axios.get("/post");
            if (data) {
                return data;
            }
            else {
                return null;
            }
        }
        catch (err) {
            alert("ops, algo deu errado ao carregar os posts");
        }
    }
}