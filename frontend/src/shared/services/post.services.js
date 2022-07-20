const BASE_URL = 'http://localhost:5000/api/post/';

//* fonction pour recuperer tout les posts
export async function getAllPost() {

    const response = await fetch(BASE_URL, {
        headers: {
            'content-Type': 'application/json',
        }
    });

    const posts = await response.json();
    console.log(posts);
    return posts;
}

//* fonction pour supprimer un post 
export async function deletePost(postId, userToken) {
    const response = await fetch(`${BASE_URL}/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + userToken,
        }
    });

    const posts = await response.json();
    return posts;
}

//* fonction pour mettre a jour un post
export async function updatePost(postId, userToken, data) {
    const response = await fetch(`${BASE_URL}/${postId}`, {
        method: 'PUT',
        body: data,
        headers: {
            'Authorization': 'Bearer ' + userToken,
        }
    });

    const posts = await response.json();
    return posts;
}

//* fonction pour ajouter un post
export async function createPost(userToken, data) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': 'Bearer ' + userToken,
        }
    });

    const posts = await response.json();
    return posts;
}