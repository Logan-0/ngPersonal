import { Component, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  sent: boolean = false;

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
  onResize(event: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  async submit() {
    console.log("Submitted");
    console.log(this.contactForm)

    let fName: string = this.contactForm.get('firstName')?.value || undefined;
    let lName: string = this.contactForm.get('lastName')?.value || undefined;
    let message: string = this.contactForm.get('message')?.value || undefined;
    let email: string = this.contactForm.get('email')?.value || undefined;

    let mail = { sender: email, firstName: fName, lastName: lName, message };

    if (mail.sender === 'undefined' || mail.firstName === 'undefined' || mail.lastName === 'undefined' || mail.message === 'undefined') {
      return;
    } else {
      try {
        let response = this.api.sendEmail(mail).subscribe(data => {
          console.log(data + "\n\n");
          this.sent = true;
          console.log("Was email sent: " + this.sent);
        });
        console.log("Response from Api: ", response);

        // let json = await response.json();
        // console.log("Response -> Json: ", json);

        // console.log("Success: ", json.data);
        this.contactForm.reset();

        // return JSON.data;
        return;

      } catch (error) {
        console.log("Error on Api Call")
        return;
      }
    }

    // Find a way to SEND EMAIL and reinstate api call
    // this.api.sendEmail(email, fName, lName, message).subscribe(data => {
    //   console.log(data + "\n\n")
    //   this.sent = true
    //   console.log(this.sent)
    // })
  }

  async reset() {
    this.contactForm.reset();
  }
}
