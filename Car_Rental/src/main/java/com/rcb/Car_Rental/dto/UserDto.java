package com.rcb.Car_Rental.dto;
import com.rcb.Car_Rental.enums.UserRole;

import lombok.Data;


@Data
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private UserRole userRole;
}
