package com.rcb.Car_Rental.dto;

import com.rcb.Car_Rental.enums.UserRole;

import lombok.Data;

@Data

public class AuthenticationResponse {

    private String jwt;
    private UserRole userRole;
    private Long userId;
}
