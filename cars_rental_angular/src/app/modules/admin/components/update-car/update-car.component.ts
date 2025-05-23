import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent {
  isSpinning = false;
  carId: number = this.activatedRoute.snapshot.params["id"];
  imgChanged: boolean = false;
  selectedFile: any;
  imagePreview!: string | ArrayBuffer | null;
  existingImage: string | null = null;
  updateForm: FormGroup;

  // Option lists
  listOfBrands = ["MERCEDES", "MINI", "BMW", "MAZDA", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getCarById();
  }

  getCarById() {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      this.isSpinning = false;
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;

      // Convert numeric year to Date object for the picker
      const yearDate = new Date(carDto.year, 0, 1);
      this.updateForm.patchValue({
        ...carDto,
        year: yearDate
      });
    });
  }

  updateCar() {
    this.isSpinning = true;
    const formData: FormData = new FormData();

    if (this.imgChanged && this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Convert Date object back to numeric year
    const yearDate = this.updateForm.get('year')?.value;
    const year = yearDate.getFullYear();

    formData.append('brand', this.updateForm.get('brand')?.value);
    formData.append('name', this.updateForm.get('name')?.value);
    formData.append('type', this.updateForm.get('type')?.value);
    formData.append('color', this.updateForm.get('color')?.value);
    formData.append('year', year.toString());
    formData.append('transmission', this.updateForm.get('transmission')?.value);
    formData.append('description', this.updateForm.get('description')?.value);
    formData.append('price', this.updateForm.get('price')?.value);

    this.adminService.updateCar(this.carId, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success("Car updated successfully!", { nzDuration: 5000 });
        this.router.navigateByUrl("/admin/dashboard");
      },
      (error) => {
        this.message.error("Error while updating car.", { nzDuration: 5000 });
        this.isSpinning = false;
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}