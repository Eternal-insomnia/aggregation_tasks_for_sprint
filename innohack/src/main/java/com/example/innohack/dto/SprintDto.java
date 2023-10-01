package com.example.innohack.dto;

import com.example.innohack.entity.Task;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class SprintDto {

    private Long id;

    private int people;
    private Date startDate;

    private List<Task> tasks = new ArrayList<>();
}
