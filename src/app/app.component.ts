import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  empForm:FormGroup=new FormGroup({});
  empObj:EmployeeModel=new EmployeeModel();
  empList:EmployeeModel[]=[];
  constructor(){
    this.createForm();
    debugger
     const oldData=localStorage.getItem("EmpData");
      if(oldData!=null){
         const parseData=JSON.parse(oldData);
         this.empList=parseData;
      }
  }
  createForm(){
    this.empForm=new FormGroup({
      empid:new FormControl(this.empObj.empId),
      name:new FormControl(this.empObj.name),
      city:new FormControl(this.empObj.city),
      address:new FormControl(this.empObj.address),
      contactno:new FormControl(this.empObj.contactNo),
      emailId:new FormControl(this.empObj.emailId),
      pincode:new FormControl(this.empObj.pinCode),
      state:new FormControl(this.empObj.state)

    })
    
  }
  onSave(){
    debugger
      const oldData=localStorage.getItem("EmpData");
      if(oldData!=null){
        const parseData=JSON.parse(oldData);
        this.empForm.controls['empid'].setValue(parseData.length+1);
        this.empList.unshift(this.empForm.value);
      }
      else{
        this.empList.unshift(this.empForm.value);
      }
      localStorage.setItem("EmpData",JSON.stringify(this.empList))
    }
    onEdit(item:EmployeeModel){
      this.empObj=item;
      this.createForm();
    }
    onUpdate(){
      const record=this.empList.find(m=>m.empId==this.empForm.controls['empid'].value)
      if(record!=undefined){
        record.address=this.empForm.controls['address'].value;
        record.name=this.empForm.controls['name'].value;
        record.contactNo=this.empForm.controls['contactno'].value;

      }
      localStorage.setItem("EmpData",JSON.stringify(this.empList));
      this.empObj=new EmployeeModel();
      this.createForm();
    }
}
