package com.example.fullstackapp.controller;

import com.example.fullstackapp.model.Habit;
import com.example.fullstackapp.repository.HabitRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "http://localhost:5173") // Required for frontend requests
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
