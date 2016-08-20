/**
 * Created by strukov on 8/20/16.
 */
export function isLoggedin() {
    return !!localStorage.getItem('token');
}