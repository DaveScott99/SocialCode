import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: process.env.REACT_APP_TOKEN_GITHUB_API
})

export async function searchLanguagesOnRepos(username, repositoryName) {

    try {
        if (username !== null && repositoryName !== null) {
            return await octokit.request("GET /repos/{owner}/{repo}/languages", {
                owner: username,
                repo: repositoryName
            })
        }
    }
    catch (error) {
        console.log(error);
    }

}

export async function searchRepositoriesByUser(username, page) {
    try {
        if (username !== null) {
            return await octokit.request("GET /users/{owner}/repos?page={page}", {
                owner: username,
                page: page,
                sort: "created",
                per_page: 10
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const searchUserOnGitByUsename = async(username) => {
    try {
        return await octokit.request("GET /users/{username}", {
            username: username
        });
    }
    catch (error) {
        console.log(error)
    }
}