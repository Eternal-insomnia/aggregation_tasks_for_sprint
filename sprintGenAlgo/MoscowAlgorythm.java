import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Objects;


public class MoscowAlgorythm {
    static public void sortArrayList(ArrayList<InputTask> tasks) {
        boolean isSorted = false;
        while(!isSorted) {
            isSorted = true;
            for (int i = 0; i < tasks.size() - 1; i++) {
                if (tasks.get(i).priority > tasks.get(i + 1).priority) {
                    isSorted = false;
                    Collections.swap(tasks, i,i + 1);
                }
            }
        }
    }

    static public ArrayList<OutputTask> generateOutputTasks(ArrayList<InputTask> taskList, ArrayList<Employee> empList) {
        empList.sort(Comparator.comparing(Employee::getGrade, Collections.reverseOrder()));
        taskList.sort(Comparator.comparing(InputTask::getPriority, Collections.reverseOrder()).thenComparing(InputTask::getSprintPoints, Collections.reverseOrder()));
        ArrayList<OutputTask> outputTasks = new ArrayList<>();
        // jun - 6
        // mid - 12
        // sen - 20
        for (Employee employer : empList) {
            if (Objects.equals(employer.empSpec, "UI/UX-разработчик")) {
                for (InputTask task : taskList) {
                    if (task.taskSpec.equals("Frontend")) {
                        if (employer.sprintPoints >= task.sprintPoints) {
                            OutputTask new_task = new OutputTask(task.description, task.priority, employer.empSpec, employer.empName);
                            outputTasks.add(new_task);
                            employer.setSprintPoints(employer.getSprintPoints() - task.getSprintPoints());
                        }
                    }
                }
            } else if (Objects.equals(employer.empSpec, "Backend-разработчик")) {
                for (InputTask task : taskList) {
                    if (task.taskSpec.equals("Backend")) {
                        if (employer.sprintPoints >= task.sprintPoints) {
                            OutputTask new_task = new OutputTask(task.description, task.priority, employer.empSpec, employer.empName);
                            outputTasks.add(new_task);
                            employer.setSprintPoints(employer.getSprintPoints() - task.getSprintPoints());
                        }
                    }
                }
            } else if (Objects.equals(employer.empSpec, "Специалист по БД")) {
                for (InputTask task : taskList) {
                    if (task.taskSpec.equals("Базы данных")) {
                        if (employer.sprintPoints >= task.sprintPoints) {
                            OutputTask new_task = new OutputTask(task.description, task.priority, employer.empSpec, employer.empName);
                            outputTasks.add(new_task);
                            employer.setSprintPoints(employer.getSprintPoints() - task.getSprintPoints());
                        }
                    }
                }
            } else if (Objects.equals(employer.empSpec, "Дизайнер")) {
                for (InputTask task : taskList) {
                    if (task.taskSpec.equals("Дизайн")) {
                        if (employer.sprintPoints >= task.sprintPoints) {
                            OutputTask new_task = new OutputTask(task.description, task.priority, employer.empSpec, employer.empName);
                            outputTasks.add(new_task);
                            employer.setSprintPoints(employer.getSprintPoints() - task.getSprintPoints());
                        }
                    }
                }
            } else if (Objects.equals(employer.empSpec, "Android/iOS разработчик")) {
                for (InputTask task : taskList) {
                    if (task.taskSpec.equals("Мобильная разработка")) {
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

