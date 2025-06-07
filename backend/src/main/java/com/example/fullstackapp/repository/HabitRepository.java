
package com.example.fullstackapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fullstackapp.model.Habit;

public interface HabitRepository extends JpaRepository<Habit, Long> {
}
