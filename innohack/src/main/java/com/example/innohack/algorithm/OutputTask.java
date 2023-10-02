package com.example.innohack.algorithm;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
@AllArgsConstructor
public class OutputTask {

    public int id;
    public int key;
    public String description;
    public String empName;
    public String empSpec;
    public Integer priority;

    OutputTask(String _desc, Integer _prior, String _empSpec, String _empName) {
        description = _desc;
        empSpec = _empSpec;
        empName = _empName;
        priority = _prior;
    }


}
