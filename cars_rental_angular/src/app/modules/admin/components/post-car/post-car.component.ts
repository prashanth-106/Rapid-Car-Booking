import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  listOfBrands = ["MERCEDES", "MINI", "BMW", "MAZDA", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  postCarForm: any;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.postCarForm = this.fb.group({
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

  // Disable future years in the year picker
  disabledYear = (current: Date): boolean => {
    // Disable dates after the current year
    return current && current.getFullYear() > new Date().getFullYear();
  };

  postCar() {
    if (this.postCarForm.invalid || !this.selectedFile) {
      this.message.error("Please fill all required fields and select an image");
      return;
    }

    this.isSpinning = true;
    const formData: FormData = new FormData();

    // Convert Date object to year number
    const yearDate = this.postCarForm.get('year').value;
    const year = yearDate.getFullYear();

    formData.append('image', this.selectedFile);
    formData.append('brand', this.postCarForm.get('brand').value);
    formData.append('name', this.postCarForm.get('name').value);
    formData.append('type', this.postCarForm.get('type').value);
    formData.append('color', this.postCarForm.get('color').value);
    formData.append('year', year.toString());
    formData.append('transmission', this.postCarForm.get('transmission').value);
    formData.append('description', this.postCarForm.get('description').value);
    formData.append('price', this.postCarForm.get('price').value);

    this.adminService.postCar(formData).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.message.success("Car posted successfully!", { nzDuration: 5000 });
        this.router.navigateByUrl("/admin/dashboard");
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error("Error while posting car.", { nzDuration: 5000 });
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage();
    }
  }

  previewImage() {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
