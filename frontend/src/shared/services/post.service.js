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
    try {
        const fd = new FormData()
        fd.append('text', data.text)
        fd.append('image', data.image)
        const response = await fetch(`${BASE_URL}/${postId}`, {
            method: 'PUT',
            body: fd,
            headers: {
                'Authorization': 'Bearer ' + userToken,
            }
        });

        const post = await response.json()
        console.log(post);
    } catch (e) {
        throw e
    }

    // const posts = await response.json();
    // return posts;
}


// export async function updateUser(userId, userToken, data) {
//     try {

//         const fd = new FormData()

//         fd.append('firstName', data.firstName)
//         fd.append('lastName', data.lastName)
//         fd.append('email', data.email)
//         fd.append('password', data.password)
//         fd.append('description', data.description)
//         fd.append('image', data.image)
//         const response = await fetch(`${BASE_URL}/${userId}`, {
//             method: 'PUT',
//             body: fd,
//             headers: {
//                 'Authorization': 'Bearer ' + userToken,
//             }
//         });
//         const user = await response.json()
//         console.log(user);
//         if (response.ok) {

//             return user;
//         }
//         else {
//             throw user
//         }
//     } catch (e) {
//         throw e;
//     }
// }



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

//* fonction pour commenter un post
export async function commentPost(postId, data) {

    try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        const userToken = auth.token;

        const response = await fetch(`${BASE_URL}/comment/${postId}`, {
            method: 'POST',
            body: JSON.stringify({ text: data }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken,
            }
        });

        const post = await response.json();
        if (response.ok) {
            console.log(post);
            return post;
        }
    } catch (e) {
        console.log(e);
    }
}
