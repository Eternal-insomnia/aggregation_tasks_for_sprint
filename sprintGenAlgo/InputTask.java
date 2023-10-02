import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InputTask {
    public String description;
    public String taskSpec;
    public Integer sprintPoints;
    public Integer priority;

    InputTask(String _desc, String _taskSpec, Integer _sprintPoints, Integer _prior) {
        description = _desc;
        priority = _prior;
        taskSpec = _taskSpec;
        sprintPoints = _sprintPoints;
    }
}
