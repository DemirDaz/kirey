import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../model/data';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  data:Data[] = [];
  moze=false;

  constructor(private dat:DataService) { }

  ngOnInit(): void {
    this.getData();
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
