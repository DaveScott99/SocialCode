import axios from "axios"

export const UseApi = () => ({

    registry: async (userRegistry) => {
        const { name, email, password } = userRegistry;
        await axios.post('http://localhost:8080/user', { name, email, password})
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error.response.data.errors))
    }

})