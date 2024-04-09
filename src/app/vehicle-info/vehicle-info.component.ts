import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  vehicleForm!: FormGroup;
  selectedVehicleTypeImage: string = './assets/auto.jpg';
  vehicles = [
    { displayValue: 'Auto', value: 'Auto' },
    { displayValue: 'Motor', value: 'Motor' },
    { displayValue: 'Scooter', value: 'Scooter' },
  ]
  vehicleSubtypes: { [key: string]: { displayValue: string; value: string }[] } = {
    Auto: [
      { displayValue: 'Hatchback', value: 'hatchback' },
      { displayValue: 'Sedan', value: 'sedan' },
      { displayValue: 'Station', value: 'station' },
      { displayValue: 'Cabriolet', value: 'cabriolet' },
      { displayValue: 'Coupé', value: 'coupé' },
      { displayValue: 'Multi Purpose Vehicle (MVP)', value: 'mvp' },
      { displayValue: 'Terreinauto', value: 'terreinauto' }
    ],
    Motor: [
      { displayValue: 'All-road', value: 'all-road' },
      { displayValue: 'Naked', value: 'naked' },
      { displayValue: 'Enduro', value: 'enduro' },
      { displayValue: 'Race', value: 'race' },
      { displayValue: 'Toermotor', value: 'toermotor' },
      { displayValue: 'Chopper', value: 'chopper' },
      { displayValue: 'Zijspan', value: 'zijspan' }
    ],
    Scooter: []
  };

  licensePlateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const validFormat = /^[A-Z]{2}-[A-Z]{2}-\d{2}$/i.test(control.value);
      return validFormat ? null : { 'invalidLicensePlate': { value: control.value } };
    };
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicleType: ['Auto', Validators.required],
      vehicleSubtype: ['', Validators.required],
      kenteken: ['', [Validators.required, this.licensePlateValidator()]]
    });

    this.vehicleForm.get('vehicleType')?.valueChanges.subscribe(value => {
      this.updateVehicleImage(value);
      this.updateVehicleSubtypes(value);
    });

    this.vehicleForm.get('vehicleType')?.valueChanges.subscribe(value => {
      this.updateVehicleImage(value);
      this.updateVehicleSubtypes(value);
    });
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      console.log(this.vehicleForm.value);
    } else {
      this.vehicleForm.markAllAsTouched();
    }
  }

  updateVehicleImage(vehicleType: string) {
    switch (vehicleType) {
      case 'Auto':
        this.selectedVehicleTypeImage = './assets/auto.jpg';
        break;
      case 'Motor':
        this.selectedVehicleTypeImage = './assets/motor.jpg';
        break;
      case 'Scooter':
        this.selectedVehicleTypeImage = './assets/scooter.jpg';
        break;
      default:
        this.selectedVehicleTypeImage = './assets/auto.jpg';
    }
  }

  updateVehicleSubtypes(vehicleType: string) {
    const subtypes = this.vehicleSubtypes[vehicleType] || [];
    this.vehicleForm.get('vehicleSubtype')?.setValue('');
    this.vehicleForm.get('vehicleSubtype')?.setValidators(subtypes.length ? Validators.required : null);
    this.vehicleForm.get('vehicleSubtype')?.updateValueAndValidity();
  }
}
