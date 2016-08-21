/**
 * Created by strukov on 8/20/16.
 */
export function isLoggedIn() {
    return !!localStorage.getItem('token');
}