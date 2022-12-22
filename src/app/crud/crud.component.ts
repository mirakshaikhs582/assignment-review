import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  title = 'registrationapp';
  submitted = false;
  updated = false;
  editedUser: any = {};
  editUserId: any;
  userForm: FormGroup;
  listitem: any;
  isEdit: boolean = false;
  myItem: any;
  field: any;
  hide =true;
  constructor(private fb: FormBuilder, private toastr: ToastrService,private router:Router) {
    this.listitem = [];
    this.userForm = this.fb.group({
      id: [1],
      firstname: [
        'Abdulkarim',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern("^[a-zA-Z '-]{3,}$")
        ]
      ],
      lastname: [
        'Shaikh',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.pattern("^[a-zA-Z '-]{3,}$")
        ]
      ],
      email: [
        'test@gmail.com',
        [
          Validators.required]],

      mobile: ['9594835456'],

    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
  get u(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  logout(){
    this.router.navigate(['login']);
  }
  addData() {
    this.updated = false;
    this.submitted = true;
    for (let index = 0; index < this.listitem.length; index++) {
      if (this.listitem[index].firstname.toLowerCase() == this.userForm.value.firstname.toLowerCase()) {
        this.toastr.warning('Firstname Already Exit, Try Different Firstname!!', 'Error Message', {
          timeOut: 3000,
          progressBar: false,
          positionClass: 'toast-bottom-right',
        })
        return
      }
    }
    if (this.userForm.valid) {
      this.toastr.success('Data Added Successfully', '', {
        timeOut: 3000,
        progressBar: false,
        positionClass: 'toast-bottom-right',
      })
      this.submitted = false;
      this.listitem.push(this.userForm.value);
      this.userForm.reset();
    }
  }


  updateData() {
    this.submitted = false;
    this.updated = true;
    if (this.userForm.invalid) {
      console.log("invalid")
      return
    }
    {
      this.submitted = false;
      this.updated = false;
      let myindex = this.listitem.indexOf(this.myItem);
      this.listitem[myindex] = this.userForm.value;
      this.userForm.reset();
      this.toastr.success('Data Updated Successfully', '', {
        timeOut: 3000,
        progressBar: false,
        positionClass: 'toast-bottom-right',
      })
    }
  }

  reset() {
    this.submitted = false;
    this.updated = false;
    this.userForm.reset();
  }

  removeitem(msg: string) {
    if (window.confirm('Are sure you want to delete this item ?')) {
      const index: number = this.listitem.indexOf(msg);
      if (index !== -1) {
        this.listitem.splice(index, 1);
      }
      this.toastr.error('Data Deleted Successfully!!', '', {
        timeOut: 2000,
        progressBar: false,
        positionClass: 'toast-bottom-right',
      })
    }
  }

  updateUser(item: any) {
    this.myItem = item;

    this.userForm.patchValue({
      "firstname": item.firstname,
      "lastname": item.lastname,
      "email": item.email,
      "mobile": item.mobile,
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }
  }

}

