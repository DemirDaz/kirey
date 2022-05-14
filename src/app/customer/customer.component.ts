import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from '../utils/validation';
import { Data } from '../model/data';
import { DataService } from '../services/data.service';
import { PrimeNGConfig } from "primeng/api";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  data:Data[] = [];
  moze=false;
  visibility: boolean = false;
  time!: Date;
  datum:Date = new Date(2022,1,2,0,0,1); //default vreme za izbor trajanja

  constructor(private formBuilder: FormBuilder, private dat:DataService,private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getData();
    this.form = this.formBuilder.group(
      {
        fullname:  ['',[
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$')]
        ],
        code: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        number: ['', [Validators.required, Validators.min(1)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        timeonly: ['',[Validators.required]],
      },
      /*
      {
        validators: [Validation.match('password', 'confirmPassword')]
      } */
    );
  
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  
  gfg() {
    this.visibility = true;
  }

  getData() {
    this.dat.getData().subscribe((data:Data[]) =>{
    this.data=data
    },err => console.log(JSON.stringify(err)));
    this.moze=true;
    
    }

   
    Update(data:Data){
     /* this.registruje=true;
      if(this.signupForm.invalid) {
        return;
      }
      this.newUser = new Konobar(radn.idRadnika,this.scs.name.value,this.scs.address.value,this.scs.phoneNum.value,
      this.scs.email.value,this.scs.password.value);
      this.adm.updateRadnik(this.newUser)
      .subscribe((user: Konobar) => {console.log(JSON.stringify("Uspšno izmenjen radnik!"+user.pIme))
     },err => console.log(JSON.stringify(err)))
      this.registruje=false;
      location.reload(); */
    }
    Delete(Name:string){
     /* this.dat.deleteRecord(Name).subscribe(response =>
        {console.log(response);},err => console.log(err));
        location.reload(); */
    }

}
