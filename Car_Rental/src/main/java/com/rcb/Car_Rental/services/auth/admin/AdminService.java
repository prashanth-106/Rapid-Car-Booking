package com.rcb.Car_Rental.services.auth.admin;

import com.rcb.Car_Rental.dto.BookACarDto;
import com.rcb.Car_Rental.dto.CarDto;
import com.rcb.Car_Rental.dto.CarDtoListDto;
import com.rcb.Car_Rental.dto.SearchCarDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {

	boolean postCar(CarDto carDto) throws IOException;

	List<CarDto> getAllCars();

	void deleteCar(Long id);

	CarDto getCarById(Long id);

	boolean updateCar(Long carId, CarDto carDto) throws IOException;

	List<BookACarDto> getBookings();

	boolean changeBookingStatus(Long bookingId, String status);

	CarDtoListDto searchCar(SearchCarDto searchCarDto);

}
