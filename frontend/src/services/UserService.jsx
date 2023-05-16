import axios from "axios"

export default class UserService {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:8080"
        })
    }

    async login (userData) {
        const { data } = await this.axios.post('/login', userData);

        if (data.status === true) {
            localStorage.setItem("id", data.user.id);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("email", data.user.email);
            alert(data.message);
            return data.status;
        }
        else {
            alert(data.message);
        }
    }

    async resgister (userData){
        return this.axios.post('/user', userData);
    }

}