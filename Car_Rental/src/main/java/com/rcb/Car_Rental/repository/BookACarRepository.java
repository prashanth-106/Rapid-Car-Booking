package com.rcb.Car_Rental.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rcb.Car_Rental.entity.BookACar;

import java.util.List;

@Repository

public interface BookACarRepository extends JpaRepository<BookACar,Long> {
    List<BookACar> findAllByUserId(Long userId);
}
