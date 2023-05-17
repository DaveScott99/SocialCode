import axios from "axios";

export default class PostService {
    constructor(){
        this.axios = axios.create({
            baseURL: "http://localhost:8080"
        })
    }

    async findAll() {
        this.axios.get("/post")
            .then((response) => console.log(response.data))
            .catch(err => console.log("ops, ocorreu um erro" + err));
    }
}