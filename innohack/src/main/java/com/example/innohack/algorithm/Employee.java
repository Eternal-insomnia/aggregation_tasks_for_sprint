package com.example.innohack.algorithm;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class Employee {
    public String grade;
    public String empSpec;
    public String empName;

    public String email;
    public Integer sprintPoints;

    public Employee(String _grade, String _empSpec, String _empName) {
        grade = _grade;
        empSpec = _empSpec;
        empName = _empName;
        if (Objects.equals(grade, "junior")) {
            sprintPoints = 6;
        } else if (Objects.equals(grade, "middle")) {
            sprintPoints = 12;
        } else if (Objects.equals(grade, "senior")) {
            sprintPoints = 20;
        } else {
            System.out.println("Ошибка в передаче данных работников");
            sprintPoints = -1;
        }
    }

    public Employee(String _grade, String _empSpec, String _empName, String _email) {
        grade = _grade;
        empSpec = _empSpec;
        empName = _empName;
        if (Objects.equals(grade, "junior")) {
            sprintPoints = 6;
        } else if (Objects.equals(grade, "middle")) {
            sprintPoints = 12;
        } else if (Objects.equals(grade, "senior")) {
            sprintPoints = 20;
        } else {
            System.out.println("Ошибка в передаче данных работников");
            sprintPoints = -1;
        }
        email = _email;
    }
}
