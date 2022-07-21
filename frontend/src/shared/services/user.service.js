const BASE_URL = 'http://localhost:5000/api/auth/';

//* fonction pour recuperer tout les posts
export async function getUserProfil(userId) {

    try {
        const response = await fetch(`${BASE_URL}/${userId}`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
            }
        });

        const user = await response.json();
        console.log(user);
        return user;
    } catch (e) {
        console.log(e);
    }
}
