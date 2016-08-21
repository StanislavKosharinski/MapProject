/**
 * Created by strukov on 8/20/16.
 */
import {Component, OnInit} from "@angular/core";
import {Authenticator} from "../utils/Authentificator";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";

@Component({
    selector: 'login',
    templateUrl:'app/blocks/login.html',
    styleUrls: ['app/blocks/login_style.css'],
    directives: [REACTIVE_FORM_DIRECTIVES]
})

export class LoginDirective implements OnInit{
    form: FormGroup;
    error:boolean = false;
    constructor(private fb: FormBuilder, private auth:Authenticator, private router:Router){

    }


    ngOnInit(){
        this.form = this.fb.group({
            username: ['', [<any>Validators.required]],
            password: ['', [<any>Validators.required]]
        });
    }

    onSubmit(value:any){
        this.auth.login(value.username, value.password)
            .subscribe(
                (token: any) => this.router.navigate(['/map']),
                () => { this.error = true; }
            );
    }


}