import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { promise } from 'protractor';
import { database } from 'firebase';
import { error } from 'util';
import { map } from 'rxjs/operators';
import { resolve } from 'url';

@Injectable()
export class LoginService {
    constructor(private authService: AngularFireAuth){}

    login(email:string, password: string){
        return new Promise((resolve,reject)=>{
            this.authService.auth.signInWithEmailAndPassword(email, password)
            .then(datos => resolve(datos),
                error => reject(error)
            )
        });
    }

    getAuth(){
        return this.authService.authState.pipe(
            map(auth => auth)
        )
    }

    logout(){
        this.authService.auth.signOut();
    }

    registrarse(email: string, password: string){
        return new Promise((resolve, reject) =>{
            this.authService.auth.createUserWithEmailAndPassword(email,password)
            .then(datos => resolve(datos),
            error => reject(error))
        });
    }
}