package com.rcb.Car_Rental.services.auth;

import com.rcb.Car_Rental.dto.SignupRequest;
import com.rcb.Car_Rental.dto.UserDto;

public interface AuthService {

    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);

}
