import { Component, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  screenHeight: number;
  screenWidth: number;

  contactForm: FormGroup = new FormGroup({});
  firstName: FormControl = new FormControl('');
  lastName: FormControl = new FormControl('');
  message: FormControl = new FormControl('');
  email: FormControl = new FormControl('');

  // Api Checks
  sent: boolean = false;
  jsonResponse: any;
  error: string = ""

  alphaPattern: string = "^[a-zA-Z]*$";

  choppingWood: string = "../../assets/images/choppingWood.png"

  constructor(private toastr: ToastrService, private form: FormBuilder, private api: ApiService) {

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    this.contactForm = this.form.group({
      'firstName': new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(this.alphaPattern)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'email': new FormControl('', [Validators.required, Validators.minLength(8), Validators.email]),
      'message': new FormControl('', [Validators.required, Validators.minLength(11)]),
    });

    this.reset();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  async submit() {
    console.log("Submitted");
    console.log(this.contactForm)

    let fName: string = this.contactForm.get('firstName')?.value;
    let lName: string = this.contactForm.get('lastName')?.value;
    let message: string = this.contactForm.get('message')?.value;
    let email: string = this.contactForm.get('email')?.value;

    let mail: any = { sender: email, firstName: fName, lastName: lName, message };

    if (mail.sender === 'undefined' || mail.sender === null) {
      this.error = "your email!"
    }
    if (mail.firstName === 'undefined' || mail.firstName === null) {
      this.error = "your first name!"
    }
    if (mail.lastName === 'undefined' || mail.lastName === null) {
      this.error = "your last name!"
    }
    if (mail.message === 'undefined' || mail.message === null) {
      this.error = "your message!"
    }

    if (this.error !== "") {
      this.toastr.error('You are missing ' + this.error, 'Error Sending Email', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true,
        positionClass: "toast-top-center"
      });
      return;
    } else {
      try {
        this.api.sendEmail(mail).subscribe(data => {
          console.log("Response from Api: ", data + "\n");
          this.sent = true;
          console.log("Was email sent?: " + this.sent);
          this.jsonResponse = JSON.parse(data);
          console.log("Response -> Json: ", this.jsonResponse);
        });
        this.toastr.success('Your email is on the way', 'Email Sent', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true,
          positionClass: "toast-top-center"
        });

        this.contactForm.reset();
        return this.jsonResponse;

      } catch (error) {
        console.log("Error on Api Call")
        return;
      }
    }
  }

  reset() {
    this.contactForm.reset();
  }
}
