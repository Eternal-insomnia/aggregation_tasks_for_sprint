package com.example.innohack.repository;

import com.example.innohack.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Task findById(long id);
}