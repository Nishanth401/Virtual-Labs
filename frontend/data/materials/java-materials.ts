import { MaterialContent } from "./types";

export const JAVA_MATERIALS: Record<string, MaterialContent> = {
  "java-oop-gfg": {
    id: "java-oop-gfg",
    title: "Java Object-Oriented Programming (OOP) Master Guide",
    subject: "Java OOP Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Object-Oriented Programming",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/oops-java",
    simulatorName: "Java OOP Sandbox",
    overview:
      "Object-Oriented Programming (OOP) is a software design paradigm structured around data objects and class definitions rather than procedural functions. This comprehensive GeeksforGeeks guide examines the four foundational pillars: Encapsulation (data hiding), Inheritance (code reusability), Polymorphism (compile-time overloading and runtime dynamic dispatch), and Abstraction (abstract classes and interfaces).",
    learningObjectives: [
      "Implement Encapsulation with private instance attributes, getters, and setters",
      "Construct multi-level class inheritance hierarchies using extends and super",
      "Differentiate Compile-Time Polymorphism (Overloading) from Runtime Polymorphism (Overriding)",
      "Design flexible architectures using abstract classes and Java 8 interfaces with default methods",
      "Implement robust Exception Handling using try-catch-finally and custom checked exceptions"
    ],
    keyConcepts: [
      {
        title: "1. The Four Pillars of OOP",
        description:
          "The core architectural principles governing enterprise software design.",
        points: [
          "Encapsulation: Bundling data and methods into a single unit; restricting direct access to object internals via access specifiers.",
          "Inheritance: Creating new classes that reuse, extend, and modify the behavior of existing parent classes.",
          "Polymorphism: The ability of an object to take many forms (e.g. Animal reference pointing to a Dog instance).",
          "Abstraction: Hiding complex implementation details and exposing only essential functional interfaces."
        ]
      },
      {
        title: "2. Dynamic Method Dispatch & Virtual Table (vtable)",
        description:
          "Runtime polymorphism allows Java to resolve overridden method calls dynamically at execution time.",
        points: [
          "Mechanism: An overridden method is called through a parent reference variable.",
          "JVM Resolution: The JVM determines which version of the method to execute based on the actual object being referred to at runtime, not the reference type.",
          "VTable: An internal array of method pointers used by the JVM to lookup virtual method addresses in O(1)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Define Abstract Blueprint",
        description: "Declare abstract superclass or interface with contract method signatures."
      },
      {
        step: 2,
        title: "Implement Concrete Subclasses",
        description: "Extend superclass, override methods using @Override annotation, and invoke super() constructor."
      },
      {
        step: 3,
        title: "Polymorphic Invocation",
        description: "Instantiate concrete objects using superclass reference types; verify runtime method dispatch."
      }
    ],
    codeSnippets: {
      java: `// 1. Abstract Base Class
abstract class BankAccount {
    private String accountNumber;
    protected double balance;

    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public abstract void withdraw(double amount) throws Exception;

    public double getBalance() {
        return balance;
    }
}

// 2. Concrete Subclass (Inheritance + Polymorphism)
class SavingsAccount extends BankAccount {
    private static final double MIN_BALANCE = 500.0;

    public SavingsAccount(String accNo, double bal) {
        super(accNo, bal);
    }

    @Override
    public void withdraw(double amount) throws Exception {
        if (balance - amount < MIN_BALANCE) {
            throw new Exception("Withdrawal denied: Minimum balance violation!");
        }
        balance -= amount;
        System.out.println("Withdrawal successful! New balance: $" + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            // Polymorphic Reference
            BankAccount acc = new SavingsAccount("SA-1002", 2000.0);
            acc.withdraw(1200.0);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) dynamic method dispatch resolution via virtual method table (vtable)",
      spaceComplexity: "O(1) object header memory overhead in JVM heap (Mark Word + Klass Word)",
      bestCase: "O(1)",
      worstCase: "O(1)",
      notes: "The JVM JIT compiler can inline monomorphic call sites, eliminating virtual dispatch overhead completely."
    },
    vivaQuestions: [
      {
        question: "Why does Java not support multiple inheritance with classes?",
        answer: "To prevent the 'Diamond Problem', where ambiguity arises when two parent classes implement the same method with different logic and a subclass inherits both. Java achieves multiple inheritance safely via interfaces."
      },
      {
        question: "What is the difference between method overloading and method overriding?",
        answer: "Method overloading happens in the same class at compile time (same method name, different parameter types/count). Method overriding happens across a parent-child inheritance relationship at runtime (exact same name, parameters, and return type)."
      }
    ],
    realWorldApplications: [
      "Spring Boot enterprise REST API service architecture",
      "Android mobile app View component hierarchy and event listeners",
      "Banking transaction processing and account security models"
    ],
    practiceProblems: [
      {
        title: "Shape Hierarchy with Polymorphism",
        difficulty: "Easy",
        description: "Create an abstract class Shape with getArea() and implement Circle and Rectangle subclasses, computing total area across an array of shapes."
      }
    ]
  },

  "java-collections-gfg": {
    id: "java-collections-gfg",
    title: "Java Collections Framework: ArrayList, LinkedList, HashMap & HashSet",
    subject: "Java OOP Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Java Collections Framework",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/oops-java",
    simulatorName: "Java OOP Sandbox",
    overview:
      "The Java Collections Framework (JCF) provides a unified architecture for representing and manipulating collections of objects. This reference covers ArrayList (dynamic resizable array), LinkedList (doubly linked list), HashSet (hash table backed set), and HashMap (high-performance key-value mapping with red-black tree bucket collision resolution).",
    learningObjectives: [
      "Understand the JCF hierarchy: Collection, List, Set, Queue, and Map interfaces",
      "Compare ArrayList vs LinkedList time complexities for random access and node insertions",
      "Analyze the internal architecture of HashMap: hashing, bucket indexing, and treeification",
      "Implement custom sorting using Comparable and Comparator interfaces",
      "Understand Fail-Fast vs Fail-Safe iterator mechanisms and ConcurrentModificationException"
    ],
    keyConcepts: [
      {
        title: "1. ArrayList vs LinkedList Architecture",
        description:
          "Two primary implementations of the List interface with opposing performance profiles.",
        points: [
          "ArrayList: Backed by a continuous Object[] array. Default initial capacity = 10; grows by 50% (newCapacity = oldCapacity + (oldCapacity >> 1)). O(1) random get(index); O(N) insertion/deletion due to element shifting.",
          "LinkedList: Doubly linked list of Node objects. O(N) access traversal; O(1) node insertion/deletion once the pointer is reached."
        ]
      },
      {
        title: "2. HashMap Internal Hashing & Treeification",
        description:
          "How HashMap achieves amortized O(1) key lookup in modern Java.",
        points: [
          "Hashing: Computes hash = key.hashCode() ^ (hash >>> 16) and bucket index = (n - 1) & hash.",
          "Collision Resolution: Collisions are initially stored as a singly linked list in the bucket.",
          "Treeification (Java 8+): When a single bucket exceeds 8 entries (TREEIFY_THRESHOLD) and total capacity >= 64, the linked list converts into a Red-Black Tree, bounding worst-case search to O(log N) instead of O(N)."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Hash Key & Index Bucket",
        description: "Call hashCode() on key; spread bits and compute bucket index via bitwise AND."
      },
      {
        step: 2,
        title: "Inspect Bucket Chain",
        description: "Iterate bucket linked list / tree. If key equals existing key via equals(), update value."
      },
      {
        step: 3,
        title: "Insert & Rehash Check",
        description: "Append new Node; if total entries exceed capacity * load_factor (0.75), double capacity and rehash all keys."
      }
    ],
    codeSnippets: {
      java: `import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        // 1. HashMap: Word Frequency Counter
        String[] words = {"apple", "banana", "apple", "cherry", "banana", "apple"};
        Map<String, Integer> freqMap = new HashMap<>();

        for (String w : words) {
            freqMap.put(w, freqMap.getOrDefault(w, 0) + 1);
        }
        System.out.println("Word Frequencies: " + freqMap);

        // 2. Custom Sorting via Comparator
        List<Map.Entry<String, Integer>> list = new ArrayList<>(freqMap.entrySet());
        list.sort((a, b) -> b.getValue().compareTo(a.getValue())); // Descending

        System.out.println("Ranked by Frequency: " + list);

        // 3. HashSet: Unique deduplication
        Set<String> uniqueFruits = new HashSet<>(Arrays.asList(words));
        System.out.println("Unique fruits count: " + uniqueFruits.size());
    }
}`
    },
    complexityAnalysis: {
      timeComplexity: "ArrayList: O(1) get, O(N) add; HashMap: O(1) average put/get, O(log N) worst-case treeified",
      spaceComplexity: "O(N) memory with load factor capacity padding (default 0.75)",
      bestCase: "O(1) average lookup",
      worstCase: "O(log N) for HashMap with severe hash collisions",
      notes: "For thread-safe concurrent access, use ConcurrentHashMap rather than synchronized Hashtable."
    },
    vivaQuestions: [
      {
        question: "Explain the contract between hashCode() and equals() in Java.",
        answer: "If two objects are equal according to equals(), they MUST have the same hashCode(). However, if two objects have the same hashCode(), they are not necessarily equal (a hash collision). Violating this contract causes HashMap and HashSet to lose or duplicate elements."
      },
      {
        question: "What causes a ConcurrentModificationException?",
        answer: "Fail-Fast iterators check an internal modCount variable. If a collection is modified structurally (adding or removing elements) directly while an iterator is actively traversing it without using the iterator's own remove() method, it immediately throws ConcurrentModificationException."
      }
    ],
    realWorldApplications: [
      "In-memory session caching and token validation in web frameworks",
      "High-speed routing table lookup by destination IP",
      "Full-text search inverted index token indexing"
    ],
    practiceProblems: [
      {
        title: "Two Sum using HashMap",
        difficulty: "Easy",
        description: "Given an array of integers and a target sum, use a HashMap to return the indices of the two numbers that add up to target in O(N) time."
      }
    ]
  },

  "java-oop-w3schools": {
    id: "java-oop-w3schools",
    title: "W3Schools Java OOP & Methods Interactive Tutorial",
    subject: "Java OOP Laboratory",
    provider: "W3Schools Reference",
    category: "Java Foundations & OOP",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/oops-java",
    simulatorName: "Java OOP Sandbox",
    overview:
      "A hands-on, beginner-friendly W3Schools-curated laboratory guide to Java classes, methods, constructors, access modifiers (public, private, protected), and package organization. Provides practical foundations for building modular object-oriented applications.",
    learningObjectives: [
      "Define Java classes and instantiate objects using the new keyword",
      "Implement parameterized constructors and understand default zero-argument constructors",
      "Differentiate static class variables/methods from instance members",
      "Apply access modifiers to enforce information hiding and security",
      "Understand package import structures and CLASSPATH configuration"
    ],
    keyConcepts: [
      {
        title: "1. Classes, Objects & The Constructor",
        description:
          "A class is a blueprint; an object is a live instance allocated in heap memory.",
        points: [
          "Constructor: A special method with the same name as the class and no return type; executes automatically upon object creation.",
          "this Keyword: Refers to the current object instance to resolve namespace shadowing between parameters and instance fields."
        ]
      },
      {
        title: "2. The static Keyword in Java",
        description:
          "Static members belong to the class itself rather than any specific instance.",
        points: [
          "Static Variables: Single memory copy shared across all instances of the class.",
          "Static Methods: Can be invoked without creating an instance (e.g. Math.sqrt()); cannot access instance this or super."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Declare Class Template",
        description: "Define class attributes and parameterized constructor."
      },
      {
        step: 2,
        title: "Add Instance & Static Methods",
        description: "Write business logic methods and static utility helpers."
      },
      {
        step: 3,
        title: "Instantiate & Test",
        description: "Instantiate objects, invoke methods, and print state."
      }
    ],
    codeSnippets: {
      java: `public class Student {
    private String name;
    private int id;
    private static int totalStudents = 0; // Shared static counter

    // Parameterized Constructor
    public Student(String name, int id) {
        this.name = name;
        this.id = id;
        totalStudents++;
    }

    public void displayProfile() {
        System.out.println("ID: " + id + ", Name: " + name);
    }

    public static int getTotalEnrollment() {
        return totalStudents;
    }

    public static void main(String[] args) {
        Student s1 = new Student("Alice", 101);
        Student s2 = new Student("Bob", 102);

        s1.displayProfile();
        s2.displayProfile();
        System.out.println("Total Students Enrolled: " + Student.getTotalEnrollment());
    }
}`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) object instantiation and field assignment",
      spaceComplexity: "O(1) memory per student object in JVM heap",
      bestCase: "O(1)",
      worstCase: "O(1)",
      notes: "Java objects are garbage-collected automatically using generational tracing algorithms (G1GC, ZGC)."
    },
    vivaQuestions: [
      {
        question: "Can a static method access a non-static variable directly?",
        answer: "No. A static method belongs to the class and exists even when no instances have been instantiated. Therefore, it has no 'this' context and cannot refer to instance variables directly without creating an object."
      },
      {
        question: "What is constructor chaining?",
        answer: "Constructor chaining is the practice of calling one constructor from another within the same class using this(...) or from a subclass using super(...)."
      }
    ],
    realWorldApplications: [
      "Singleton logger services in enterprise software",
      "Utility helper classes (java.lang.Math, java.util.Collections)"
    ],
    practiceProblems: [
      {
        title: "Book Library Management Class",
        difficulty: "Easy",
        description: "Create a Book class with title, author, isbn, and isAvailable flag, with methods to borrowBook() and returnBook()."
      }
    ]
  },
  "oops-java-manual": {
    id: "oops-java-manual",
    title: "Object-Oriented Programming (Java) Laboratory Manual",
    subject: "Java OOP Lab",
    provider: "Department of Artificial Intelligence and Data Science",
    source: "VSB Engineering College Autonomous Curriculum (R2023 / R2021)",
    subtitle: "Complete Manual: Classes, Encapsulation, Inheritance, Interfaces, Packages, Multithreading & Exception Handling",
    category: "Academic Laboratory Manual",
    readTime: "50 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/oops-java",
    simulatorName: "Java Code Runner",
    overview:
      "This official laboratory manual for Object-Oriented Programming in Java provides comprehensive practical exercises aligned with the Anna University and Autonomous curriculum. Students master the 4 pillars of OOP (Encapsulation, Inheritance, Polymorphism, Abstraction), interface-driven architecture, modular packages, robust exception handling, multithreaded concurrency, and generic collections.",
    learningObjectives: [
      "Design robust object-oriented software architectures using classes, constructors, and encapsulation access specifiers",
      "Implement single, multilevel, and hierarchical inheritance hierarchies utilizing the 'super' keyword",
      "Apply runtime polymorphism via method overriding and interface contracts",
      "Construct custom exception hierarchies and enforce defensive programming via try-catch-finally blocks",
      "Develop multithreaded applications leveraging thread synchronization and inter-thread communication (wait, notify)"
    ],
    tags: ["Java", "OOP", "Inheritance", "Polymorphism", "Multithreading", "Exceptions", "Lab Manual", "VSB Engineering College"],
    keyConcepts: [
      {
        title: "1. The 4 Pillars of Object-Oriented Programming",
        description:
          "Core software engineering paradigm structuring systems into cooperating objects.",
        points: [
          "Encapsulation: Bundling data attributes and manipulating methods together while hiding internal state via private access.",
          "Inheritance: Reusing code attributes and behaviors from base superclasses using the 'extends' keyword.",
          "Polymorphism: Compile-time (method overloading) and dynamic runtime dispatch (method overriding).",
          "Abstraction: Representing essential features without including background implementation details via abstract classes and interfaces."
        ]
      },
      {
        title: "2. Interface Contracts & Modular Packages",
        description:
          "Interfaces declare pure API contracts allowing multiple interface inheritance, while packages structure namespaces.",
        points: [
          "Interface: All methods are public abstract by default (prior to Java 8); supports default/static methods.",
          "Packages: Organized namespace avoiding class naming collisions; compiled into matching directory hierarchies."
        ]
      },
      {
        title: "3. Concurrency & Exception Handling",
        description:
          "Multithreading maximizes CPU utilization while structured exception handling maintains system stability.",
        points: [
          "Checked vs Unchecked Exceptions: Checked (IOException, SQLException) enforced at compile-time; Unchecked (NullPointerException, ArithmeticException) inherit from RuntimeException.",
          "Synchronized Blocks: Prevents race conditions on shared memory resources by acquiring intrinsic object monitor locks."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Domain Model Abstraction",
        description: "Identify real-world entities, model private attributes with public getters/setters, and establish superclass/subclass relationships."
      },
      {
        step: 2,
        title: "Interface Contract Definition",
        description: "Specify interface methods that enforce uniform behavior across diverse business service implementations."
      },
      {
        step: 3,
        title: "Exception Boundary Guarding",
        description: "Wrap high-risk operations in try-catch-finally blocks, throwing custom application exceptions when domain rules are violated."
      },
      {
        step: 4,
        title: "Multithreaded Thread Safety",
        description: "Implement Runnable or extend Thread, applying the 'synchronized' keyword to critical sections to guarantee thread-safe execution."
      }
    ],
    codeSnippets: {
      java: `// 1. Employee Hierarchy Demonstrating Inheritance & Polymorphism
abstract class Employee {
    protected int empId;
    protected String name;
    protected double baseSalary;

    public Employee(int empId, String name, double baseSalary) {
        this.empId = empId;
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public abstract double calculatePay();

    public void displaySlip() {
        System.out.printf("ID: %d | Name: %-15s | Net Pay: $%.2f%n", 
            empId, name, calculatePay());
    }
}

class FullTimeEmployee extends Employee {
    private double bonus;

    public FullTimeEmployee(int empId, String name, double baseSalary, double bonus) {
        super(empId, name, baseSalary);
        this.bonus = bonus;
    }

    @Override
    public double calculatePay() {
        return baseSalary + bonus;
    }
}

class PartTimeEmployee extends Employee {
    private int hoursWorked;
    private double hourlyRate;

    public PartTimeEmployee(int empId, String name, int hoursWorked, double hourlyRate) {
        super(empId, name, 0);
        this.hoursWorked = hoursWorked;
        this.hourlyRate = hourlyRate;
    }

    @Override
    public double calculatePay() {
        return hoursWorked * hourlyRate;
    }
}`
    },
    complexityAnalysis: {
      timeComplexity: "Dynamic method dispatch: O(1) via virtual method table (vtable) resolution",
      spaceComplexity: "O(1) stack frame allocation per method invocation",
      notes: "JVM HotSpot JIT compiler optimizes monomorphic call sites via inline caching, eliminating vtable lookup overhead."
    },
    vivaQuestions: [
      {
        question: "What is the difference between method overloading and method overriding?",
        answer: "Method overloading occurs in the same class with identical method names but different parameter signatures (resolved at compile-time). Method overriding occurs between superclass and subclass with identical signatures and return types (resolved at runtime).",
        category: "OOP"
      },
      {
        question: "Can an abstract class have constructors in Java?",
        answer: "Yes. Even though an abstract class cannot be instantiated directly with 'new', its constructor is invoked by subclass constructors via super(...) to initialize inherited fields.",
        category: "Classes"
      },
      {
        question: "What is the role of the 'finally' block?",
        answer: "The 'finally' block always executes when the try block exits, regardless of whether an exception was thrown or caught, making it ideal for releasing resources like file handles and database connections.",
        category: "Exceptions"
      }
    ],
    realWorldApplications: [
      "Enterprise Spring Boot microservices architected with Dependency Injection and interface layers",
      "Banking transaction processing pipelines utilizing synchronized thread pools and custom exceptions",
      "Android application UI event listeners implementing interface contracts"
    ],
    practiceProblems: [
      {
        title: "Custom InsufficientFundsException Banking System",
        difficulty: "Medium",
        description: "Implement a BankAccount class with synchronized withdraw() and deposit() methods that throws a custom checked InsufficientFundsException when withdrawal exceeds balance."
      },
      {
        title: "Producer-Consumer Queue with wait() and notify()",
        difficulty: "Hard",
        description: "Implement a thread-safe bounded buffer queue where producer threads call wait() on a full buffer and consumer threads call notify() after consumption."
      }
    ]
  }
};
