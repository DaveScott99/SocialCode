import axios from "axios"
import { toast } from "react-toastify";

export default class UserService {
    constructor() {
        this.axios = axios.create({
            baseURL: "http://localhost:8080"
        })
    }

    async findUserById (id) {
        const { data } = await this.axios.get(`/user/findById/${id}`);
        return data;
    }

    /* Função que enviará as credenciais de LOGIN para o BACKEND e se caso exista o usuário cadastrado
    armazena no localStorage as credenciais*/
    async login (userData) {
        const { data } = await this.axios.post('/login', userData);

        if (data.status === true) {
            localStorage.setItem("id", data.user.id);
            localStorage.setItem("name", data.user.name);
            localStorage.setItem("email", data.user.email);
            return data.status;
        }
        else {
            toast.warning(data.message)
        }
    }

    logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
    }

    /* Função para registrar um novo usuário na plataforma */
    async resgister (userData) {
    
        if (userData != null) {

            this.axios.post('/user/insert', userData)
                      .then((response) => console.log(response.data))
                      .catch((err) => {
                                        const listError = [err.response.data.errors];

                                        console.log(listError)

                                        for (var i = 0; i < listError[0].length; i++) {
                                            toast.warning(listError[0][i].message)
                                        }
                                        
                                    });

        }
        else {
            toast.warning('Preencha todos os campos');
        }

      
        
    }

    /* Função verificar se existe um usuário logado na plataforma */
    authenticatedUser() {
        // eslint-disable-next-line eqeqeq
        return localStorage.getItem("email") != undefined ? true : false;
    }

}