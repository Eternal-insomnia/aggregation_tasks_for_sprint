package com.example.innohack.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TableReadDto {
    private ArrayList<TaskDto> dataSource = new ArrayList<TaskDto>();
}