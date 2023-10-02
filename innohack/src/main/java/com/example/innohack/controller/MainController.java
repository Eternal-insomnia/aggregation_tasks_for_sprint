package com.example.innohack.controller;

import com.example.innohack.algorithm.*;
import com.example.innohack.dto.*;
import org.springframework.http.ResponseEntity;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@CrossOrigin (origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class MainController {
    String taskSource;
    ArrayList<OutputTask> outputTasks;


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/")
    public List<TaskDto> getAllUsers() {
        List<TaskDto> tasks = new ArrayList<>();
        return tasks;
    }

    @GetMapping("/stepone")
    public void start() {
        return;
    }
    @PostMapping("/stepone")
    public String stepone(@RequestBody String tasks) throws IOException {
        taskSource = tasks;

        return tasks;
    }

    @PostMapping("/save")
    public String starttwo(@RequestBody String employees) throws IOException {
        Gson gson = new Gson();
        EmployeeTableDto dataSource = gson.fromJson(employees, EmployeeTableDto.class);
        TableReadDto tasksSources = gson.fromJson(taskSource, TableReadDto.class);

        ArrayList<InputTask> inputTasks = new ArrayList<>();
        for (TaskDto task : tasksSources.getDataSource()) {
            InputTask intask = new InputTask(task.getTask(), task.getPosition(), task.getDifficulty(), task.getPriority());
            inputTasks.add(intask);
        }
        ArrayList<Employee> algEmployees = new ArrayList<>();
        for (EmployeesDto employee : dataSource.getDataSource()) {
            Employee inemployee = new Employee(employee.getGrade(), employee.getPosition(), employee.getUser(), employee.getEmail());
            algEmployees.add(inemployee);
        }
        outputTasks = MoscowAlgorythm.generateOutputTasks(inputTasks, algEmployees);
        int i = 0;
        for (OutputTask task : outputTasks) {
            i += 1;
            task.setId(i);
            task.setKey(i);
        }

        return employees;
    }

    @GetMapping("/final")
    public ArrayList<OutputTask> main() {
        return outputTasks;
    }

    @PostMapping("/gpt")
    public String gpt(@RequestBody String gpt) {
        Gson gson = new Gson();
        GptDto gptSource = gson.fromJson(gpt, GptDto.class);
        System.out.println(gptSource.getGpt().get(0));
        String answer = ChatGPTAssistant.getAnswer(gptSource.getGpt().get(0));
        return answer;
    }

}

