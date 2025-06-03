package com.example.fullstackapp.repository;

import com.example.fullstackapp.model.Habit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitRepository extends JpaRepository<Habit, Long> {
}
