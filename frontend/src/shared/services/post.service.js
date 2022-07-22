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
export async function deletePost(postId) {
    try {
        // recuperation du userId et du token 
        const auth = JSON.parse(localStorage.getItem('auth'));
        const userToken = auth.token;

        const response = await fetch(`${BASE_URL}/${postId}`, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken,
            }
        });

        const post = await response.json();
        console.log(post);

        return post;
    } catch (e) {
        console.log(e);
    }
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

    try {
        console.log(data.image);
        const fd = new FormData()

        fd.append('text', data.text)
        fd.append('image', data.image)
        const response = await fetch('http://localhost:5000/api/post/',
            {
                method: 'POST',
                body: fd,
                headers: {
                    'Authorization': 'Bearer ' + userToken,
                }
            });

        const post = await response.json();

        if (response.ok) {
            return post;
        } else {
            throw post
        }

    } catch (e) {
        throw e
    }
}

//* fonction pour liké un post
export async function likePost(postId) {

    try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const userToken = auth.token;

        const response = await fetch(`${BASE_URL}/like/${postId}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken,
            }
        });

        const post = await response.json();
        if (response.ok) {
            console.log(post);
            return post;
        }
    } catch (e) {
        throw e
    }
}
