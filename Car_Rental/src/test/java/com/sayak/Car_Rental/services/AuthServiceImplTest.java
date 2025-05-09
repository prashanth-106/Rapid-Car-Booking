package com.sayak.Car_Rental.services;

import com.rcb.Car_Rental.dto.SignupRequest;
import com.rcb.Car_Rental.dto.UserDto;
import com.rcb.Car_Rental.entity.User;
import com.rcb.Car_Rental.enums.UserRole;
import com.rcb.Car_Rental.repository.UserRepository;
import com.rcb.Car_Rental.services.auth.AuthServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthServiceImplTest {

	@InjectMocks
	private AuthServiceImpl authService;

	@Mock
	private UserRepository userRepository;

	@BeforeEach
	public void setup() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void testCreateAdminAccount() {
		when(userRepository.findByUserRole(UserRole.ADMIN)).thenReturn(null);

		authService.createAdminAccount();

		verify(userRepository, times(1)).save(any(User.class));
	}

	@Test
	public void testCreateCustomer() {
		SignupRequest signupRequest = new SignupRequest();
		signupRequest.setName("Test");
		signupRequest.setEmail("test@test.com");
		signupRequest.setPassword("test123");

		User user = new User();
		user.setId(1L);
		user.setName(signupRequest.getName());
		user.setEmail(signupRequest.getEmail());
		user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
		user.setUserRole(UserRole.CUSTOMER);

		when(userRepository.save(any(User.class))).thenReturn(user);

		UserDto result = authService.createCustomer(signupRequest);

		assertEquals(user.getId(), result.getId());
	}

	@Test
	public void testHasCustomerWithEmail() {
		String email = "test@test.com";

		when(userRepository.findFirstByEmail(email)).thenReturn(Optional.of(new User()));

		boolean result = authService.hasCustomerWithEmail(email);

		assertTrue(result);
	}
}
