import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class Employee {
    public String grade;
    public String empSpec;
    public String empName;
    public Integer sprintPoints;

    Employee(String _grade, String _empSpec, String _empName) {
        grade = _grade;
        empSpec = _empSpec;
        empName = _empName;
        if (Objects.equals(grade, "Junior")) {
            sprintPoints = 6;
        } else if (Objects.equals(grade, "Middle")) {
            sprintPoints = 12;
        } else if (Objects.equals(grade, "Senior")) {
            sprintPoints = 20;
        } else {
            System.out.println("Ошибка в передаче данных работников");
            sprintPoints = -1;
        }
    }
}
