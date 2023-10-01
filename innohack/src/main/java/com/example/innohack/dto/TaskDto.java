package com.example.innohack.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class TaskDto {
    private Integer key;
    private Integer id;
    private String task;
    private Integer difficulty;
    private String position;
    private Integer priority;
    private String link;
}