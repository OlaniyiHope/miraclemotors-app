import { PassengersData } from './../../interfaces/passenger.interface';
import { Helpers } from 'src/app/app.helpers';
import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/enums/pages.enum';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.page.html',
  styleUrls: ['./passenger-details.page.scss'],
})
export class PassengerDetailsPage implements OnInit {

  passengersForm: FormGroup;
  passengers: PassengersData;
  constructor(private fb: FormBuilder, private helpers: Helpers) {
    this.passengers = this.helpers.getNavParams('passengers');
    this.initializeForms();
  }

  ngOnInit() {
  }

  initializeForms() {

    const controls = [
      this.fb.group({
        name: [null, Validators.required],
        ageBracket: ['adult', Validators.required],
        gender: ['male', Validators.required]
      })
    ];

    for (let index = 1; index < this.passengers.adults; index++) {
      controls.push(this.fb.group({
        name: [null, Validators.required],
        ageBracket: ['adult', Validators.required],
        gender: [null, Validators.required]
      }));
    }

    for (let index = 0; index < this.passengers.children; index++) {
      controls.push(this.fb.group({
        name: [null, Validators.required],
        ageBracket: ['child', Validators.required],
        gender: [null, Validators.required]
      }));
    }

    this.passengersForm = this.fb.group({
      passengers: this.fb.array(controls, [Validators.required])
    });

    console.log(this.passengersForm.value);
  }

  passengersFormControls() {
    return (this.passengersForm.get('passengers') as FormArray).controls;
  }

  gotoSummary() {
    const passengers = this.passengersForm.controls.passengers.value;
    this.helpers.navPush(Pages.bookingSummary, { ...this.helpers.getNavParams(), passengers });
  }
}
