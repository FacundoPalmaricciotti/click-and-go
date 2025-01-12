import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports:[ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  contacForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.contacForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(100)]],
      message: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.contacForm.valid) {
      const name = this.contacForm.value.name;
      const message = this.contacForm.value.message;

      this.router.navigate(['/thank-you', { name: name, message: message }]);
    } else {
      console.log("Formulario no válido");
    }
  }
}

