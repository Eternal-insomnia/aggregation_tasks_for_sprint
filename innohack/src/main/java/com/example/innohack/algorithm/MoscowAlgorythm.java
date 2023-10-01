package com.example.innohack.algorithm;

import com.example.innohack.algorithm.OutputTask;
import com.example.innohack.algorithm.Employee;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Objects;


public class MoscowAlgorythm {
    static public ArrayList<OutputTask> generateOutputTasks(ArrayList<InputTask> taskList, ArrayList<Employee> empList) {
        empList.sort(Comparator.comparing(Employee::getGrade, Collections.reverseOrder()));
        taskList.sort(Comparator.comparing(InputTask::getPriority, Collections.reverseOrder()).thenComparing(InputTask::getSprintPoints, Collections.reverseOrder()));
        ArrayList<OutputTask> outputTasks = new ArrayList<>();
        // jun - 6
        // mid - 12
        // sen - 20
        for (Employee employer : empList) {
            if (Objects.equals(employer.empSpec, "UI")) {
                for (InputTask task : taskList) {
                    if (task.taskSpec.equals("frontend")) {
                        if (employer.sprintPoints >= task.sprintPoints) {
                            OutputTask new_task = new OutputTask(task.description, task.priority, employer.empSpec, employer.empName);
                            outputTasks.add(new_task);
                            employer.setSprintPoints(employer.getSprintPoints() - task.getSprintPoints());
                        }
                    }
                }
            } else if (Objects.equals(employer.empSpec, "backend")) {
                for (InputTask task : taskList) {
                    if (task.taskSpec.equals("backend")) {
                        if (employer.sprintPoints >= task.sprintPoints) {
                            OutputTask new_task = new OutputTask(task.description, task.priority, employer.empSpec, employer.empName);
                            outputTasks.add(new_task);
                            employer.setSprintPoints(employer.getSprintPoints() - task.getSprintPoints());
                        }
                    }
                }
            } else if (Objects.equals(employer.empSpec, "DB")) {
                for (InputTask task : taskList) {
                    if (task.taskSpec.equals("database")) {
                        if (employer.sprintPoints >= task.sprintPoints) {
                            OutputTask new_task = new OutputTask(task.description, task.priority, employer.empSpec, employer.empName);
                            outputTasks.add(new_task);
                            employer.sprintPoints = employer.getSprintPoints() - task.sprintPoints;
                        }
                    }
                }
            } else if (Objects.equals(employer.empSpec, "design")) {
                for (InputTask task : taskList) {
                    if (task.taskSpec.equals("design")) {
                        if (employer.sprintPoints >= task.sprintPoints) {
                            OutputTask new_task = new OutputTask(task.description, task.priority, employer.empSpec, employer.empName);
                            outputTasks.add(new_task);
                            employer.setSprintPoints(employer.getSprintPoints() - task.getSprintPoints());
                        }
                    }
                }
            } else if (Objects.equals(employer.empSpec, "mobile")) {
                for (InputTask task : taskList) {
                    if (task.taskSpec.equals("mobile")) {
                        if (employer.sprintPoints >= task.sprintPoints) {
                            OutputTask new_task = new OutputTask(task.description, task.priority, employer.empSpec, employer.empName);
                            outputTasks.add(new_task);
                            employer.setSprintPoints(employer.getSprintPoints() - task.getSprintPoints());
                        }
                    }
                }
            } else {
               System.out.println("Ошибка идентификации специальности разработчика");
            }
        }
        return outputTasks;
    }
}

