import { Time } from "@angular/common";
import { DatePipe } from '@angular/common'

export class Data {
    
    Name: string;
    Code: string;
    Duration: Time;
    NumberOfAccounts : number;
    DateOfCreation: string;

    constructor(Name: string,
        Code: string,
        Duration: Time,
        NumberOfAccounts : number) {
            
            this.Name = Name;
            this.Code = Code;
            this.Duration = Duration;
            this.NumberOfAccounts = NumberOfAccounts;
            var datepipe = new DatePipe("en-US");
            let date=new Date();
            let latest_date = datepipe.transform(date, 'dd-MM-yyyy');
            this.DateOfCreation = latest_date!=null?latest_date:"Date not assigned";
            
    }
    
}
