package com.rcb.Car_Rental.exception;

public class InvalidRequestException extends Exception {
	private static final long serialVersionUID = 1L;
	
	public InvalidRequestException(String message) {
		super(message);
	}
}
