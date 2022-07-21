const BASE_URL = 'http://localhost:5000/api/auth/';

// recuperation du userId et du token 
// const auth = JSON.parse(localStorage.getItem('auth'));
// const localUserId = auth.userId;
// const userToken = auth.token;

//* fonction pour authentifier un utilisateur
export async function login(data) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-Type': 'application/json'
        }
    });

    const user = await response.json();

    console.log(user);
    //* si la connexion a été reussi
    if (response.ok) {
        const auth = {
            token: user.token,
            userId: user.user._id
        }
        localStorage.setItem("auth", JSON.stringify(auth))
        return user.user;
    }
    else {
        throw user
    }
}

export async function fetchCurrentUser() {
    try {
        console.log(localStorage.getItem('auth'));
        if (localStorage.getItem('auth')) {

            const auth = JSON.parse(localStorage.getItem('auth'));
            const localUserId = auth.userId;
            const userToken = auth.token;

            const response = await fetch(`${BASE_URL}/${localUserId}`, {
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken,
                }
            });

            const user = response.json();
            return user;
        } else {
            return null
        }

    } catch (e) {
        console.log(e);
        return null;
    }
}