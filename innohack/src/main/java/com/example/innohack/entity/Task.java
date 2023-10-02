package com.example.innohack.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int difficulty;

    @Column(nullable = false)
    @Min(1)
    @Max(5)
    private int priority;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="sprint_id")
    private Sprint sprint;




}
