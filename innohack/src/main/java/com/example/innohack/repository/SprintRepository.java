package com.example.innohack.repository;

import com.example.innohack.entity.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SprintRepository extends JpaRepository<Sprint, Long> {
    Sprint findById(long id);
}
