
package com.example.fullstackapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.fullstackapp.model.Habit;
import com.example.fullstackapp.repository.HabitRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/habits")
public class HabitController {

    private final HabitRepository habitRepository;

    public HabitController(HabitRepository habitRepository) {
        this.habitRepository = habitRepository;
    }

    @GetMapping
    public List<Habit> getAllHabits() {
        return habitRepository.findAll();
    }

    @PostMapping
    public Habit createHabit(@RequestBody Habit habit) {
        return habitRepository.save(habit);
    }

    @PatchMapping("/{id}/increment")
    public Habit incrementHabit(@PathVariable Long id) {
        Habit habit = habitRepository.findById(id).orElseThrow();
        habit.setCount(habit.getCount() + 1);
        return habitRepository.save(habit);
    }
}
