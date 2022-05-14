import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Data } from '../model/data';
import { DataService } from '../services/data.service';
import { Message, PrimeNGConfig } from "primeng/api";
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [MessageService]
})
export class CustomerComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  data: Data[] = [];
  moze = false;
  visibility: boolean = false;
  time!: Date;
  msgs: Message[] = [];
  datum: Date = new Date(2022, 1, 2, 0, 0, 1); //default vreme za izbor trajanja


  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private dat: DataService, private primengConfig: PrimeNGConfig) {

  }

  //Ng on Init doesnt wait for promises, so put call for GetData in constructor
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getData();


    this.form = this.formBuilder.group(
      {
        fullname: ['', [
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
        duration: [
          '',
          [Validators.required]
        ],

      }

    );



    //this.show();

  }
  setMessage() {
    if (this.data.length > 0) this.msgs = [];
    else this.msgs.push({ severity: 'info', summary: 'Info', detail: 'There are no records in database.' });
  }

  show() {
    this.msgs.push({ severity: 'info', summary: 'Info', detail: 'There are no records in database.' });
  }

  hide() {
    this.msgs = [];
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid);
  }

  showViaService() {
    this.getData();
    if (this.data.length == 0) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'No records in database.' });
    } else
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Records gathered.' });


  }

  onRowEditInit(data: Data) {
    console.log(data);
    console.log('Edit Init Event Called');
    //this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(data: Data) {
    this.Update(data, data.id);
    console.log(data);
    console.log('Edit Save Event Called');

  }

  onRowEditCancel(data: Data, index: number) {
    console.log(data);
    console.log(this.data[index]);
    console.log('Edit Cancel Event Called');
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.errors);
      return;
    }
    else {
      this.createData();
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

  checkNumber() {
    let num = this.data.length;
  }

  getData() {

    this.dat.getData().subscribe({
      next: (data: Data[]) => {
        this.data = data;
      },
      error: err => console.log(JSON.stringify(err))
    });


    this.moze = true;


  }


  createData() {
    let newRecord = new Data(this.f['fullname'].value, this.f['code'].value, this.f['duration'].value, this.f['number'].value)
    this.dat.createRecord(newRecord).subscribe((user: Data) => {
      console.log(JSON.stringify(user.Name) + 'is added to db.');
      window.location.reload();
    }, err => console.log(JSON.stringify(err)));



    //location.reload();
  }

  Delete(id: string) {
    this.dat.deleteRecord(id).subscribe(response => { console.log(response); window.location.reload(); }, err => console.log(err));

  }


  Update(data: Data, id: string) {
    this.dat.updateRecord(data, id).subscribe(response => { console.log(response); window.location.reload(); }, err => console.log(err));
  }




}
