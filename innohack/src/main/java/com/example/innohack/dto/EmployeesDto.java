package com.example.innohack.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeesDto {
    private Integer key;
    private Integer id;
    private String user;
    private String position;
    private String grade;
    private String email;
}
