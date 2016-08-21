/**
 * Created by strukov on 8/20/16.
 */
export class User{

    static isLoggedIn(): boolean{
        return localStorage.getItem('token') != null;
    }
}