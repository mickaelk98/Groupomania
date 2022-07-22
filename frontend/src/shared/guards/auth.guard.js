import { useUser } from "../stores";

//* verifie si l'utilisateur est connecter
export function isAuthenticatedGuard() {
    const userStore = useUser();
    //* si il n'est pas conecter
    if (!userStore.isAuthenticated) {
        return '/login';
    }
}


//* verifie si l'utilisateur n'est pas connecter
export function isNotAuthenticatedGuard() {
    const userStore = useUser();
    //* si il est pas conecter
    if (userStore.isAuthenticated) {
        return '/home';
    }
}