import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Employee> list1 = new ArrayList<Employee>();
        ArrayList<InputTask> list2 = new ArrayList<InputTask>();

        Employee e = new Employee("Junior", "UI/UX-разработчик", "Вася");
        list1.add(e);
        Employee e2 = new Employee("Middle", "Backend-разработчик", "Петя");
        list1.add(e2);
        Employee e3 = new Employee("Junior", "Дизайнер", "Коля");
        list1.add(e3);
        Employee e4 = new Employee("Senior", "Android/iOS разработчик", "Оля");
        list1.add(e4);
        Employee e5 = new Employee("Junior", "Специалист по БД", "Валя");
        list1.add(e5);

        InputTask it = new InputTask("Task1", "Frontend", 1, 2);
        list2.add(it);
        InputTask it2 = new InputTask("Task2", "Базы данных", 3, 5);
        list2.add(it2);
        InputTask it3 = new InputTask("Task3", "Backend", 1, 2);
        list2.add(it3);
        InputTask it4 = new InputTask("Task4", "Дизайн", 5, 2);
        list2.add(it4);
        InputTask it5 = new InputTask("Task5", "Frontend", 2, 1);
        list2.add(it5);
        InputTask it6 = new InputTask("Task6", "Backend", 4, 4);
        list2.add(it6);
        InputTask it7 = new InputTask("Task7", "Мобильная разработка", 1, 1);
        list2.add(it7);
        InputTask it8 = new InputTask("Task8", "Мобильная разработка", 3, 3);
        list2.add(it8);
        InputTask it9 = new InputTask("Task9", "Базы данных", 5, 2);
        list2.add(it9);
        InputTask it11 = new InputTask("Task10", "Frontend", 1, 2);
        list2.add(it11);
        InputTask it12 = new InputTask("Task11", "Дизайн", 1, 5);
        list2.add(it12);
        InputTask it13 = new InputTask("Task12", "Backend", 2, 2);
        list2.add(it13);
        InputTask it14 = new InputTask("Task13", "Базы данных", 3, 1);
        list2.add(it14);
        InputTask it15 = new InputTask("Task14", "Frontend", 5, 2);
        list2.add(it15);
        InputTask it21 = new InputTask("Task15", "Мобильная разработка", 1, 3);
        list2.add(it21);
        InputTask it22 = new InputTask("Task16", "Backend", 4, 2);
        list2.add(it22);
        InputTask it23 = new InputTask("Task17", "Дизайн", 2, 4);
        list2.add(it23);
        InputTask it24 = new InputTask("Task18", "Frontend", 1, 3);
        list2.add(it24);
        InputTask it25 = new InputTask("Task19", "Мобильная разработка", 1, 5);
        list2.add(it25);
        InputTask it26 = new InputTask("Task20", "Backend", 3, 5);
        list2.add(it26);
        InputTask it33 = new InputTask("Task21", "Базы данных", 3, 5);
        list2.add(it33);
        InputTask it34 = new InputTask("Task22", "Мобильная разработка", 4, 3);
        list2.add(it34);
        InputTask it35 = new InputTask("Task23", "Базы данных", 2, 1);
        list2.add(it35);
        InputTask it36 = new InputTask("Task24", "Frontend", 1, 2);
        list2.add(it36);
        InputTask it37 = new InputTask("Task25", "Frontend", 5, 4);
        list2.add(it37);

//        System.out.println(list2);
//        for (InputTask task : list2) {
//            System.out.print(task.priority + " ");
//        }
//        MoscowAlgorythm.sortArrayList(list2);
//        System.out.println(list2);
//        for (InputTask task : list2) {
//            System.out.print(task.priority + " ");
//        }

//        System.out.println(list1);
//        for (Employee employee : list1) {
//            System.out.print(employee.grade + " ");
//        }
//        list1.sort(Comparator.comparing(Employee::getGrade));
//        System.out.println(list1);
//        for (Employee employee : list1) {
//            System.out.print(employee.grade + " ");
//        }

        System.out.println("employee");
        for (Employee employee : list1) {
            System.out.println(employee.grade + " " + employee.empSpec + " " + employee.empName);
        }

        System.out.println("tasks");
        for (InputTask t : list2) {
            System.out.println(t.description + " " + t.sprintPoints + " " + t.taskSpec + " " + t.priority);
        }

        System.out.println("output");
        ArrayList<OutputTask> l = MoscowAlgorythm.generateOutputTasks(list2, list1);
        for (OutputTask t : l) {
            System.out.println(t.description + " " + t.priority + " " + t.empName + " " + t.empSpec);
        }

    }
}