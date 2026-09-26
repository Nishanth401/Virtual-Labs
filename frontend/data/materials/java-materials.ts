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
  }
};
