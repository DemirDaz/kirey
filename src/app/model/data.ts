import { Time } from "@angular/common";
import { DatePipe } from '@angular/common'

export class Data {
    id: string;
    Name: string;
    Code: string;
    Duration: string;
    NumberOfAccounts: number;
    DateOfCreation: string;

    constructor(Name: string,
        Code: string,
        Duration: Date,
        NumberOfAccounts: number) {
        this.id = '';
        this.Name = Name;
        this.Code = Code;
        var timepipe = new DatePipe("en-US")
        let formatedTime = timepipe.transform(Duration, 'hh:mm:ss');
        this.Duration = formatedTime != null ? formatedTime : "Time not assigned";
        this.NumberOfAccounts = NumberOfAccounts;
        var datepipe = new DatePipe("en-US");
        let date = new Date();
        let latest_date = datepipe.transform(date, 'dd-MM-yyyy');
        this.DateOfCreation = latest_date != null ? latest_date : "Date not assigned";

    }

}
