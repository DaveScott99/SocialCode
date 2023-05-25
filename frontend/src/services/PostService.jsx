import axios from "axios";

export default class PostService {
    constructor(){
        this.axios = axios.create({
            baseURL: "http://localhost:8080"
        })
    }


    async findPostById(id) {
        try {
            const { data } = await this.axios.get(`/post/findById/${id}`);
            if (data) {
                return data
            }
            else {
                return null;
            }
        }
        catch(err) {
            alert("ops, algo deu errado ao carregar os posts");
        }
    }

    // Função para resgatar todos os POSTS que vem do BACKEND
    async findAll() {
        try {
            const { data } = await this.axios.get("/post/findAll");
            return data;
        }
        catch (err) {
            alert("ops, algo deu errado ao carregar os posts");
        }
    }

    async findPostsByUserId(userId) {
        try {
            const { data } = await this.axios.get(`/post/findPostsByUser/${userId}`);
            if (data) {
                return data
            }
            else {
                return null;
            }
        }
        catch(err) {
            alert("ops, algo deu errado ao carregar os posts");
        }
        
    }

    async insert(post) {
        return this.axios.post('/post', post);
    }
}