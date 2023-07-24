import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/roles.contstant';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit {
  public authGroup!: FormGroup;
  public registerGroup!: FormGroup;
  public register = false;

  public loginSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    private auth: Auth,
    private router: Router,
    
    private dialogRef: MatDialogRef<AuthDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegisterForm();
  }
  initAuthForm() {
    this.authGroup = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  initRegisterForm() {
    this.registerGroup = this.fb.group({
      fName: [null, Validators.required],
      lName: [null, Validators.required],
      number: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }

  changeRegisterBool() {
    this.register = !this.register;
  }

  login() {
    const { email, password } = this.authGroup.value;
    this.log(email, password)
      .then(() => {
        console.log('login done');
      })
      .catch((e) => {
        console.log('login error', e);
      });
  }

  async log(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    console.log(credential.user.uid);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe((user) => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      if (user && user.role === ROLE.USER) {
        this.router.navigate(['/cabinet']);
        this.dialogRef.close();
      }
    });
  }


  registerUser():void{
    const{ email, password } = this.registerGroup.value;
    this.emailSignUp(email, password).then(() => {
      console.log('sing up done');
      this.registerGroup.reset();
      this.changeRegisterBool()

    }).catch(e => {
      console.log('sing up error', e);

    })
  }

  async emailSignUp(email:string, password:string): Promise<any>{
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    console.log(credential);
    const user = {
      email: credential.user.email,
      fName: this.registerGroup.value.fName,
      lName: this.registerGroup.value.lName,
      number: this.registerGroup.value.number,
      address: '',
      orders: [],
      favorites: [],
      role: 'USER'
    };

    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }
}
