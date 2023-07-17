import axios from "axios";

const PostService = {

    api: axios.create({
        baseURL: process.env.REACT_APP_API
    }),

    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },

    searchPostsByUser: async function(userId) {
        
        try {
            return await this.api.get(`/post/findPostsByOwner/${userId}`, {
                headers : this.header
            });
        }
        catch(error) {
            console.log(error)
        }

    }

}

export default PostService;