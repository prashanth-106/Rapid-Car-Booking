import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isToday, isBefore } from 'date-fns';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.scss']
})
export class BookCarComponent {

  carId: number = this.activatedRoute.snapshot.params['id'];
  car: any;
  processedImage: any;
  validateForm!: FormGroup;
  isSpinning = false;
  dateFormat: string = 'yyyy-MM-dd';

  constructor(
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required],
    });
    this.getCarById();
  }

  getCarById() {
    this.service.getCarById(this.carId).subscribe((res) => {
      console.log(res);
      this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.car = res;
    });
  }

  // Disable past dates, but allow today's date
  disablePastDates = (current: Date): boolean => {
    // Disable dates before today, but allow today's date
    return isBefore(current, new Date()) && !isToday(current);
  };

  bookACar(data: any) {
    console.log(data);
    this.isSpinning = true;
    let bookACarDto = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      userId: StorageService.getUserId(),
      carId: this.carId,
    };

    this.service.bookACar(bookACarDto).subscribe(
      (res) => {
        console.log(res);
        this.message.success('Booking request submitted successfully!', { nzDuration: 5000 });
        this.router.navigateByUrl('/customer/dashboard');
      },
      (error) => {
        this.message.error('Something went wrong.', { nzDuration: 5000 });
      }
    );
  }
}
