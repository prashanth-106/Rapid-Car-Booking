package com.rcb.Car_Rental.services.auth.customer;

import javax.swing.*;

import com.rcb.Car_Rental.dto.BookACarDto;
import com.rcb.Car_Rental.dto.CarDto;
import com.rcb.Car_Rental.dto.CarDtoListDto;
import com.rcb.Car_Rental.dto.SearchCarDto;

import java.util.List;

public interface CustomerService {

    List<CarDto> getAllCars();

    boolean bookACar(BookACarDto bookACarDto);

    CarDto getCarById(Long carId);

    List<BookACarDto> getBookingsByUserId(Long userId);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);

}
