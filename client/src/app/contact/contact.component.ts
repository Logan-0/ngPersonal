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

    if (mail.sender === 'undefined' || mail.firstName === 'undefined' || mail.lastName === 'undefined' || mail.message === 'undefined') {
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
        this.contactForm.reset();

        return this.jsonResponse;
        return;

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
