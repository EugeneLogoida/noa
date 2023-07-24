import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/roles.contstant';



@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  public adminAuthForm!: FormGroup;
  
  public loginSubscription!: Subscription
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initAdminForm()
  }
  ngOnDestroy(): void {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe()
    }
  }

  initAdminForm(){
    this.adminAuthForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }
  login(){
    const {email, password} = this.adminAuthForm.value;
    this.log(email, password).then(() => {
      console.log('login done');
    }).catch(e => {
      console.log('login error', e);
    })
  }

  async log(email:string, password:string): Promise<void>{
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    console.log(credential.user.uid);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {

    
    const currentUser = {...user, uid: credential.user.uid};
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    if(user && user.role === ROLE.ADMIN) {
      this.router.navigate(['/admin'])
    }
    
  })

  }
}
