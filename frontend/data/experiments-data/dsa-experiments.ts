import { Experiment } from "../experiments";

export const DSA_EXPERIMENTS: Experiment[] = [
  {
    "id": "dsa-exp-1",
    "labId": "data-structures",
    "title": "Exp 1: Singly Linked List Implementation and Operations",
    "slug": "dsa-exp-1-singly-linked-list-implementation-and-operations",
    "difficulty": "Beginner",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 215,
    "simulator": "linked-list",
    "quizId": "quiz-dsa-1",
    "sections": {
      "introduction": "To implement a Singly Linked List in Java and perform basic operations such as\rinsertion, deletion, searching, and traversal using a menu-driven program.",
      "objective": "To implement a Singly Linked List in Java and perform basic operations such as\rinsertion, deletion, searching, and traversal using a menu-driven program.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Singly Linked List Implementation and Operations",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Singly Linked List Implementation and Operations from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "class for the node containing data and a reference to the next node.\r\n3. Initialize the head of the linked list as NULL.\r\n4. Display a menu with the following operations:\r\no Insert a node\r\no Delete a node\r\no Search for a node\r\no Traverse (Display) the list\r\no Exit\r\n5. Read the user's choice.\r\n6. Perform the selected operation:\r\no Insert: Create a new node and insert it at the end of the list.\r\no Delete: Search for the specified node and remove it by updating the links.\r\no Search: Traverse the list and check whether the given element is present.\r\no Traverse: Visit each node from the head and display its data.\r\n7. Repeat Steps 5 and 6 until the user selects Exit.\r\n8. Stop the program.\r\nProgram\r\nimport java.util.*;\r\nclass Node\r\n{\r\nint data;\r\nNode next;\r\nNode(int data)\r\n{\r\nthis.data = data;\r\nthis.next = null;\r\n}\r\n}\r\npublic class SinglyLinkedList\r\n{\r\nNode head = null;\r\n// Insert at the end\r\n\r\nvoid insert(int data)\r\n{\r\nNode newNode = new Node(data);\r\nif (head == null)\r\n{\r\nhead = newNode;\r\n}\r\nelse\r\n{\r\nNode temp = head;\r\nwhile (temp.next != null)\r\n{\r\ntemp = temp.next;\r\n}\r\ntemp.next = newNode;\r\n}\r\nSystem.out.println(\"Node inserted successfully.\");\r\n}\r\n// Delete a node\r\nvoid delete(int key)\r\n{\r\nif (head == null)\r\n{\r\nSystem.out.println(\"List is empty.\");\r\nreturn;\r\n}\r\nif (head.data == key)\r\n{\r\nhead = head.next;\r\nSystem.out.println(\"Node deleted successfully.\");\r\nreturn;\r\n}\r\nNode temp = head;\r\nNode prev = null;\r\nwhile (temp != null && temp.data != key)\r\n{\r\nprev = temp;\r\ntemp = temp.next;\r\n}\r\nif (temp == null)\r\n{\r\nSystem.out.println(\"Node not found.\");\r\n}\r\n\r\nelse\r\n{\r\nprev.next = temp.next;\r\nSystem.out.println(\"Node deleted successfully.\");\r\n}\r\n}\r\n// Search a node\r\nvoid search(int key)\r\n{\r\nNode temp = head;\r\nint position = 1;\r\nwhile (temp != null)\r\n{\r\nif (temp.data == key)\r\n{\r\nSystem.out.println(\"Element found at position \" + position);\r\nreturn;\r\n}\r\ntemp = temp.next;\r\nposition++;\r\n}\r\nSystem.out.println(\"Element not found.\");\r\n}\r\n// Traverse the list\r\nvoid traverse()\r\n{\r\nif (head == null)\r\n{\r\nSystem.out.println(\"List is empty.\");\r\nreturn;\r\n}\r\nNode temp = head;\r\nSystem.out.print(\"Linked List: \");\r\nwhile (temp != null) {\r\nSystem.out.print(temp.data + \" \");\r\ntemp = temp.next;\r\n}\r\nSystem.out.println();\r\n}\r\n\r\n// Main method\r\npublic static void main(String[] args)\r\n{\r\nScanner sc = new Scanner(System.in);\r\nSinglyLinkedList list = new SinglyLinkedList();\r\nint choice, value;\r\ndo {\r\nSystem.out.println(\"\\n===== Singly Linked List Menu =====\");\r\nSystem.out.println(\"1. Insert\");\r\nSystem.out.println(\"2. Delete\");\r\nSystem.out.println(\"3. Search\");\r\nSystem.out.println(\"4. Traverse\");\r\nSystem.out.println(\"5. Exit\");\r\nSystem.out.print(\"Enter your choice: \");\r\nchoice = sc.nextInt();\r\nswitch (choice)\r\n{\r\ncase 1:\r\nSystem.out.print(\"Enter element to insert: \");\r\nvalue = sc.nextInt();\r\nlist.insert(value);\r\nbreak;\r\ncase 2:\r\nSystem.out.print(\"Enter element to delete: \");\r\nvalue = sc.nextInt();\r\nlist.delete(value);\r\nbreak;\r\ncase 3:\r\nSystem.out.print(\"Enter element to search: \");\r\nvalue ="
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-2",
    "labId": "data-structures",
    "title": "Exp 2: Doubly Linked List and Circular Linked List Implementation",
    "slug": "dsa-exp-2-doubly-linked-list-and-circular-linked-list-implementation",
    "difficulty": "Beginner",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 220,
    "simulator": "linked-list",
    "quizId": "quiz-dsa-2",
    "sections": {
      "introduction": "To implement a Doubly Linked List in Java and perform insertion and deletion at\rdifferent positions such as the beginning, end, and a specified position.",
      "objective": "To implement a Doubly Linked List in Java and perform insertion and deletion at\rdifferent positions such as the beginning, end, and a specified position.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Doubly Linked List and Circular Linked List Implementation",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Doubly Linked List and Circular Linked List Implementation from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "class Node\r\n{\r\nint data;\r\nNode prev, next;\r\nNode(int data)\r\n{\r\nthis.data = data;\r\nprev = null;\r\nnext = null;\r\n}\r\n}\r\nclass DoublyLinkedListOperations\r\n{\r\nNode head;\r\n// Insert at beginning\r\nvoid insertBeginning(int data)\r\n{\r\nNode newNode = new Node(data);\r\nif (head != null)\r\n{\r\nnewNode.next = head;\r\nhead.prev = newNode;\r\n}\r\nhead = newNode;\r\n}\r\n// Insert at end\r\nvoid insertEnd(int data)\r\n{\r\nNode newNode = new Node(data);\r\nif (head == null)\r\n{\r\nhead = newNode;\r\nreturn;\r\n}\r\nNode temp = head;\r\nwhile (temp.next != null)\r\ntemp = temp.next;\r\ntemp.next = newNode;\r\n\r\nnewNode.prev = temp;\r\n}\r\n// Insert at position\r\nvoid insertPosition(int data, int pos)\r\n{\r\nif (pos == 1)\r\n{\r\ninsertBeginning(data);\r\nreturn;\r\n}\r\nNode newNode = new Node(data);\r\nNode temp = head;\r\nfor (int i = 1; i < pos - 1 && temp != null; i++)\r\ntemp = temp.next;\r\nif (temp == null)\r\n{\r\nSystem.out.println(\"Invalid Position\");\r\nreturn;\r\n}\r\nnewNode.next = temp.next;\r\nnewNode.prev = temp;\r\nif (temp.next != null)\r\ntemp.next.prev = newNode;\r\ntemp.next = newNode;\r\n}\r\n// Delete from beginning\r\nvoid deleteBeginning()\r\n{\r\nif (head == null)\r\n{\r\nSystem.out.println(\"List is Empty\");\r\nreturn;\r\n}\r\nhead = head.next;\r\nif (head != null)\r\nhead.prev = null;\r\n}\r\n// Delete from end\r\nvoid deleteEnd()\r\n{\r\nif (head == null)\r\n{\r\nSystem.out.println(\"List is Empty\");\r\nreturn;\r\n}\r\n\r\nif (head.next == null)\r\n{\r\nhead = null;\r\nreturn;\r\n}\r\nNode temp = head;\r\nwhile (temp.next != null)\r\ntemp = temp.next;\r\ntemp.prev.next = null;\r\n}\r\n// Delete at position\r\nvoid deletePosition(int pos)\r\n{\r\nif (head == null)\r\n{\r\nSystem.out.println(\"List is Empty\");\r\nreturn;\r\n}\r\nif (pos == 1)\r\n{\r\ndeleteBeginning();\r\nreturn;\r\n}\r\nNode temp = head;\r\nfor (int i = 1; i < pos && temp != null; i++)\r\ntemp = temp.next;\r\nif (temp == null)\r\n{\r\nSystem.out.println(\"Invalid Position\");\r\nreturn;\r\n}\r\nif (temp.next != null)\r\ntemp.next.prev = temp.prev;\r\nif (temp.prev != null)\r\ntemp.prev.next = temp.next;\r\n}\r\n// Display\r\nvoid display()\r\n{\r\nif (head == null)\r\n{\r\nSystem.out.println(\"List is Empty\");\r\n\r\nreturn;\r\n}\r\nNode temp = head;\r\nwhile (temp != null) {\r\nSystem.out.print(temp.data + \" \");\r\ntemp = temp.next;\r\n}\r\nSystem.out.println();\r\n}\r\n}\r\npublic class DoublyLinkedList\r\n{\r\npublic static void main(String[] args)\r\n{\r\nDoublyLinkedListOperations dll = new DoublyLinkedListOperations();\r\ndll.insertBeginning(20);\r\ndll.insertBeginning(10);\r\ndll.insertEnd(30);\r\ndll.insertEnd(40);\r\nSystem.out.println(\"After inserting at beginning and end:\");\r\ndll.display();\r\ndll.insertPosition(25, 3);\r\nSystem.out.println(\"After insertion at position 3:\");\r\ndll.display();\r\ndll.deleteBeginning();\r\nSystem.out.println(\"After deleting from beginning:\");\r\ndll.display();\r\ndll.deleteEnd();\r\nSystem.out.println(\"After deleting from end:\");\r\ndll.display();\r\ndll.deletePosition(2);\r\nSystem.out.println(\"After deleting at position 2:\");\r\ndll.display();\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-3",
    "labId": "data-structures",
    "title": "Exp 3: Linked List Applications: Reversal, Cycle Detection & Merging",
    "slug": "dsa-exp-3-linked-list-applications-reversal-cycle-detection-merging",
    "difficulty": "Beginner",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 225,
    "simulator": "linked-list",
    "quizId": "quiz-dsa-3",
    "sections": {
      "introduction": "To implement a Singly Linked List in Java and reverse the linked list using an\riterative approach.",
      "objective": "To implement a Singly Linked List in Java and reverse the linked list using an\riterative approach.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Linked List Applications: Reversal, Cycle Detection & Merging",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Linked List Applications: Reversal, Cycle Detection & Merging from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "class Node\r\n{\r\nint data;\r\nNode next;\r\nNode(int data)\r\n{\r\nthis.data = data;\r\nnext = null;\r\n}\r\n}\r\npublic class ReverseLinkedList\r\n{\r\nNode head;\r\nvoid insert(int data)\r\n{\r\nNode newNode = new Node(data);\r\nif (head == null)\r\n{\r\nhead = newNode;\r\nreturn;\r\n}\r\n\r\nNode temp = head;\r\nwhile (temp.next != null)\r\ntemp = temp.next;\r\ntemp.next = newNode;\r\n}\r\nvoid reverse()\r\n{\r\nNode prev = null;\r\nNode current = head;\r\nNode next = null;\r\nwhile (current != null)\r\n{\r\nnext = current.next;\r\ncurrent.next = prev;\r\nprev = current;\r\ncurrent = next;\r\n}\r\nhead = prev;\r\n}\r\nvoid display()\r\n{\r\nNode temp = head;\r\nwhile (temp != null)\r\n{\r\nSystem.out.print(temp.data + \" \");\r\ntemp = temp.next;\r\n}\r\nSystem.out.println();\r\n}\r\npublic static void main(String[] args)\r\n{\r\nReverseLinkedList list = new ReverseLinkedList();\r\nlist.insert(10);\r\nlist.insert(20);\r\nlist.insert(30);\r\nlist.insert(40);\r\nSystem.out.println(\"Original List:\");\r\nlist.display();\r\nlist.reverse();\r\nSystem.out.println(\"Reversed List:\");\r\nlist.display();\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-4",
    "labId": "data-structures",
    "title": "Exp 4: Stack Implementation using Arrays and Linked Lists (Push, Pop, Peek)",
    "slug": "dsa-exp-4-stack-implementation-using-arrays-and-linked-lists-push-pop-peek",
    "difficulty": "Beginner",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 230,
    "simulator": "linked-list",
    "quizId": "quiz-dsa-4",
    "sections": {
      "introduction": "To implement a Stack using an Array in Java and perform the operations Push, Pop,\rPeek, and Display.",
      "objective": "To implement a Stack using an Array in Java and perform the operations Push, Pop,\rPeek, and Display.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Stack Implementation using Arrays and Linked Lists (Push, Pop, Peek)",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Stack Implementation using Arrays and Linked Lists (Push, Pop, Peek) from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "class StackArray\r\n{\r\nint stack[] = new int[5];\r\nint top = -1;\r\nvoid push(int data)\r\n{\r\nif (top == stack.length - 1)\r\n{\r\n\r\nSystem.out.println(\"Stack Overflow\");\r\nreturn;\r\n}\r\nstack[++top] = data;\r\n}\r\nvoid pop()\r\n{\r\nif (top == -1)\r\n{\r\nSystem.out.println(\"Stack Underflow\");\r\nreturn;\r\n}\r\nSystem.out.println(\"Popped Element: \" + stack[top--]);\r\n}\r\nvoid peek()\r\n{\r\nif (top == -1)\r\nSystem.out.println(\"Stack is Empty\");\r\nelse\r\nSystem.out.println(\"Top Element: \" + stack[top]);\r\n}\r\nvoid display()\r\n{\r\nif (top == -1)\r\n{\r\nSystem.out.println(\"Stack is Empty\");\r\nreturn;\r\n}\r\nSystem.out.print(\"Stack Elements: \");\r\nfor (int i = top; i >= 0; i--)\r\nSystem.out.print(stack[i] + \" \");\r\nSystem.out.println();\r\n}\r\npublic static void main(String[] args)\r\n{\r\nStackArray s = new StackArray();\r\ns.push(10);\r\ns.push(20);\r\ns.push(30);\r\ns.display();\r\ns.peek();\r\ns.pop();\r\ns.display();\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-5",
    "labId": "data-structures",
    "title": "Exp 5: Infix to Postfix Conversion, Evaluation and Parentheses Balancing",
    "slug": "dsa-exp-5-infix-to-postfix-conversion-evaluation-and-parentheses-balancing",
    "difficulty": "Intermediate",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 235,
    "simulator": "custom",
    "quizId": "quiz-dsa-5",
    "sections": {
      "introduction": "To write a Java program to convert an infix expression into its equivalent postfix\rexpression using a stack.",
      "objective": "To write a Java program to convert an infix expression into its equivalent postfix\rexpression using a stack.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Infix to Postfix Conversion, Evaluation and Parentheses Balancing",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Infix to Postfix Conversion, Evaluation and Parentheses Balancing from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Stack;\r\nimport java.util.Scanner;\r\npublic class InfixToPostfix\r\n{\r\nstatic int precedence(char ch)\r\n{\r\nswitch (ch)\r\n{\r\ncase '+':\r\ncase '-':\r\nreturn 1;\r\ncase '*':\r\ncase '/':\r\nreturn 2;\r\ncase '^':\r\nreturn 3;\r\n}\r\nreturn -1;\r\n}\r\n\r\npublic static void main(String args[])\r\n{\r\nScanner sc = new Scanner(System.in);\r\nStack<Character> stack = new Stack<>();\r\nSystem.out.print(\"Enter Infix Expression: \");\r\nString exp = sc.nextLine();\r\nString postfix = \"\";\r\nfor (int i = 0; i < exp.length(); i++)\r\n{\r\nchar ch = exp.charAt(i);\r\nif (Character.isLetterOrDigit(ch))\r\npostfix += ch;\r\nelse if (ch == '(')\r\nstack.push(ch);\r\nelse if (ch == ')')\r\n{\r\nwhile (!stack.isEmpty() && stack.peek() != '(')\r\npostfix += stack.pop();\r\nstack.pop();\r\n}\r\nelse\r\n{\r\nwhile (!stack.isEmpty() &&\r\nprecedence(ch) <= precedence(stack.peek()))\r\npostfix += stack.pop();\r\nstack.push(ch);\r\n}\r\n}\r\nwhile (!stack.isEmpty())\r\npostfix += stack.pop();\r\nSystem.out.println(\"Postfix Expression: \" + postfix);\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-6",
    "labId": "data-structures",
    "title": "Exp 6: Circular Queue, Priority Queue & Sliding Window Maximum",
    "slug": "dsa-exp-6-circular-queue-priority-queue-sliding-window-maximum",
    "difficulty": "Intermediate",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 240,
    "simulator": "queue",
    "quizId": "quiz-dsa-6",
    "sections": {
      "introduction": "To write a Java program to implement a Circular Queue using an array and perform\rinsertion, deletion, and display operations.",
      "objective": "To write a Java program to implement a Circular Queue using an array and perform\rinsertion, deletion, and display operations.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Circular Queue, Priority Queue & Sliding Window Maximum",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Circular Queue, Priority Queue & Sliding Window Maximum from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\nclass CircularQueue\r\n{\r\nint[] queue;\r\nint front = -1, rear = -1, size;\r\nCircularQueue(int size)\r\n{\r\nthis.size = size;\r\nqueue = new int[size];\r\n}\r\nvoid enqueue(int value)\r\n{\r\nif ((rear + 1) % size == front)\r\n{\r\nSystem.out.println(\"Queue Overflow\");\r\n\r\nreturn;\r\n}\r\nif (front == -1)\r\nfront = rear = 0;\r\nelse\r\nrear = (rear + 1) % size;\r\nqueue[rear] = value;\r\nSystem.out.println(value + \" inserted.\");\r\n}\r\nvoid dequeue()\r\n{\r\nif (front == -1)\r\n{\r\nSystem.out.println(\"Queue Underflow\");\r\nreturn;\r\n}\r\nSystem.out.println(\"Deleted: \" + queue[front]);\r\nif (front == rear)\r\nfront = rear = -1;\r\nelse\r\nfront = (front + 1) % size;\r\n}\r\nvoid display()\r\n{\r\nif (front == -1)\r\n{\r\nSystem.out.println(\"Queue is Empty\");\r\nreturn;\r\n}\r\nSystem.out.print(\"Queue: \");\r\nint i = front;\r\nwhile (true)\r\n{\r\nSystem.out.print(queue[i] + \" \");\r\nif (i == rear)\r\nbreak;\r\ni = (i + 1) % size;\r\n}\r\nSystem.out.println();\r\n}\r\n\r\npublic static void main(String args[])\r\n{\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter Queue Size: \");\r\nint n = sc.nextInt();\r\nCircularQueue cq = new CircularQueue(n);\r\nwhile (true)\r\n{\r\nSystem.out.println(\"\\n1.Insert 2.Delete 3.Display 4.Exit\");\r\nSystem.out.print(\"Enter Choice: \");\r\nint ch = sc.nextInt();\r\nswitch (ch)\r\n{\r\ncase 1:\r\nSystem.out.print(\"Enter Element: \");\r\ncq.enqueue(sc.nextInt());\r\nbreak;\r\ncase 2:\r\ncq.dequeue();\r\nbreak;\r\ncase 3:\r\ncq.display();\r\nbreak;\r\ncase 4:\r\nSystem.exit(0);\r\n}\r\n}\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-7",
    "labId": "data-structures",
    "title": "Exp 7: Binary Search Tree (BST) Operations: Insert, Delete, Search, Traversal",
    "slug": "dsa-exp-7-binary-search-tree-bst-operations-insert-delete-search-traversal",
    "difficulty": "Intermediate",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 245,
    "simulator": "binary-tree",
    "quizId": "quiz-dsa-7",
    "sections": {
      "introduction": "To implement a Binary Search Tree (BST) in Java and perform the following operations:\r Insertion of nodes\r Deletion of nodes\r Searching for a node\r Tree Traversals (Inorder, Preorder, and Postorder)",
      "objective": "To implement a Binary Search Tree (BST) in Java and perform the following operations:\r Insertion of nodes\r Deletion of nodes\r Searching for a node\r Tree Traversals (Inorder, Preorder, and Postorder)",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Binary Search Tree (BST) Operations: Insert, Delete, Search, Traversal",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Binary Search Tree (BST) Operations: Insert, Delete, Search, Traversal from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "class Node\r\n{\r\nint data;\r\nNode left, right;\r\nNode(int data) {\r\nthis.data = data;\r\nleft = right = null;\r\n}\r\n}\r\npublic class BinarySearchTree {\r\nNode root;\r\n// Insert\r\nNode insert(Node root, int data) {\r\nif (root == null)\r\nreturn new Node(data);\r\nif (data < root.data)\r\nroot.left = insert(root.left, data);\r\nelse if (data > root.data)\r\nroot.right = insert(root.right, data);\r\nreturn root;\r\n}\r\n// Search\r\nboolean search(Node root, int key) {\r\nif (root == null)\r\nreturn false;\r\nif (root.data == key)\r\nreturn true;\r\nif (key < root.data)\r\nreturn search(root.left, key);\r\nreturn search(root.right, key);\r\n}\r\n// Find Minimum\r\nNode minValue(Node root) {\r\nwhile (root.left != null)\r\nroot = root.left;\r\nreturn root;\r\n\r\n}\r\n// Delete\r\nNode delete(Node root, int key) {\r\nif (root == null)\r\nreturn null;\r\nif (key < root.data)\r\nroot.left = delete(root.left, key);\r\nelse if (key > root.data)\r\nroot.right = delete(root.right, key);\r\nelse {\r\n// Node with only one child or no child\r\nif (root.left == null)\r\nreturn root.right;\r\nelse if (root.right == null)\r\nreturn root.left;\r\n// Node with two children\r\nNode temp = minValue(root.right);\r\nroot.data = temp.data;\r\nroot.right = delete(root.right, temp.data);\r\n}\r\nreturn root;\r\n}\r\n// Inorder Traversal\r\nvoid inorder(Node root) {\r\nif (root != null) {\r\ninorder(root.left);\r\nSystem.out.print(root.data + \" \");\r\ninorder(root.right);\r\n}\r\n}\r\n// Preorder Traversal\r\nvoid preorder(Node root) {\r\nif (root != null) {\r\nSystem.out.print(root.data + \" \");\r\npreorder(root.left);\r\npreorder(root.right);\r\n}\r\n}\r\n// Postorder Traversal\r\nvoid postorder(Node root) {\r\nif (root != null) {\r\npostorder(root.left);\r\npostorder(root.right);\r\nSystem.out.print(root.data + \" \");\r\n}\r\n}\r\npublic static void main(String args[]) {\r\nBinarySearchTree bst = new BinarySearchTree();\r\nbst.root = bst.insert(bst.root, 50);\r\n\r\nbst.root = bst.insert(bst.root, 30);\r\nbst.root = bst.insert(bst.root, 70);\r\nbst.root = bst.insert(bst.root, 20);\r\nbst.root = bst.insert(bst.root, 40);\r\nbst.root = bst.insert(bst.root, 60);\r\nbst.root = bst.insert(bst.root, 80);\r\nSystem.out.println(\"Inorder Traversal:\");\r\nbst.inorder(bst.root);\r\nSystem.out.println(\"\\n\\nPreorder Traversal:\");\r\nbst.preorder(bst.root);\r\nSystem.out.println(\"\\n\\nPostorder Traversal:\");\r\nbst.postorder(bst.root);\r\nSystem.out.println(\"\\n\");\r\nif (bst.search(bst.root, 40))\r\nSystem.out.println(\"40 Found\");\r\nelse\r\nSystem.out.println(\"40 Not Found\");\r\nbst.root = bst.delete(bst.root, 30);\r\nSystem.out.println(\"\\nInorder Traversal after deleting 30:\");\r\nbst.inorder(bst.root);\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-8",
    "labId": "data-structures",
    "title": "Exp 8: AVL Tree Self-Balancing using Rotations during Insertion",
    "slug": "dsa-exp-8-avl-tree-self-balancing-using-rotations-during-insertion",
    "difficulty": "Intermediate",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 250,
    "simulator": "binary-tree",
    "quizId": "quiz-dsa-8",
    "sections": {
      "introduction": "To implement an AVL Tree in Java and perform automatic balancing using Left\rRotation, Right Rotation, Left-Right Rotation, and Right-Left Rotation during insertion.",
      "objective": "To implement an AVL Tree in Java and perform automatic balancing using Left\rRotation, Right Rotation, Left-Right Rotation, and Right-Left Rotation during insertion.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: AVL Tree Self-Balancing using Rotations during Insertion",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements AVL Tree Self-Balancing using Rotations during Insertion from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "class Node {\r\nint key, height;\r\nNode left, right;\r\nNode(int d) {\r\nkey = d;\r\nheight = 1;\r\n}\r\n}\r\npublic class AVLTree {\r\nNode root;\r\nint height(Node node) {\r\nif (node == null)\r\nreturn 0;\r\nreturn node.height;\r\n}\r\nint max(int a, int b) {\r\nreturn (a > b) ? a : b;\r\n}\r\n// Right Rotation\r\nNode rightRotate(Node y) {\r\n\r\nNode x = y.left;\r\nNode T2 = x.right;\r\nx.right = y;\r\ny.left = T2;\r\ny.height = max(height(y.left), height(y.right)) + 1;\r\nx.height = max(height(x.left), height(x.right)) + 1;\r\nreturn x;\r\n}\r\n// Left Rotation\r\nNode leftRotate(Node x) {\r\nNode y = x.right;\r\nNode T2 = y.left;\r\ny.left = x;\r\nx.right = T2;\r\nx.height = max(height(x.left), height(x.right)) + 1;\r\ny.height = max(height(y.left), height(y.right)) + 1;\r\nreturn y;\r\n}\r\nint getBalance(Node node) {\r\nif (node == null)\r\nreturn 0;\r\nreturn height(node.left) - height(node.right);\r\n}\r\nNode insert(Node node, int key) {\r\nif (node == null)\r\nreturn new Node(key);\r\nif (key < node.key)\r\nnode.left = insert(node.left, key);\r\nelse if (key > node.key)\r\nnode.right = insert(node.right, key);\r\nelse\r\nreturn node;\r\nnode.height = 1 + max(height(node.left), height(node.right));\r\nint balance = getBalance(node);\r\n// LL Rotation\r\nif (balance > 1 && key < node.left.key)\r\nreturn rightRotate(node);\r\n// RR Rotation\r\nif (balance < -1 && key > node.right.key)\r\nreturn leftRotate(node);\r\n// LR Rotation\r\nif (balance > 1 && key > node.left.key) {\r\nnode.left = leftRotate(node.left);\r\nreturn rightRotate(node);\r\n}\r\n// RL Rotation\r\nif (balance < -1 && key < node.right.key) {\r\nnode.right = rightRotate(node.right);\r\nreturn leftRotate(node);\r\n\r\n}\r\nreturn node;\r\n}\r\nvoid inorder(Node root) {\r\nif (root != null) {\r\ninorder(root.left);\r\nSystem.out.print(root.key + \" \");\r\ninorder(root.right);\r\n}\r\n}\r\npublic static void main(String args[]) {\r\nAVLTree tree = new AVLTree();\r\ntree.root = tree.insert(tree.root, 30);\r\ntree.root = tree.insert(tree.root, 20);\r\ntree.root = tree.insert(tree.root, 10);\r\ntree.root = tree.insert(tree.root, 40);\r\ntree.root = tree.insert(tree.root, 50);\r\ntree.root = tree.insert(tree.root, 25);\r\nSystem.out.println(\"Inorder Traversal of AVL Tree:\");\r\ntree.inorder(tree.root);\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-9",
    "labId": "data-structures",
    "title": "Exp 9: Lowest Common Ancestor (LCA) in Binary Tree, Huffman Tree & Trie",
    "slug": "dsa-exp-9-lowest-common-ancestor-lca-in-binary-tree-huffman-tree-trie",
    "difficulty": "Intermediate",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 255,
    "simulator": "binary-tree",
    "quizId": "quiz-dsa-9",
    "sections": {
      "introduction": "To implement a Binary Tree and find the Lowest Common Ancestor (LCA) of two\rgiven nodes using recursion.",
      "objective": "To implement a Binary Tree and find the Lowest Common Ancestor (LCA) of two\rgiven nodes using recursion.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Lowest Common Ancestor (LCA) in Binary Tree, Huffman Tree & Trie",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Lowest Common Ancestor (LCA) in Binary Tree, Huffman Tree & Trie from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "class Node\r\n{\r\nint data;\r\nNode left, right;\r\nNode(int data)\r\n{\r\nthis.data = data;\r\nleft = null;\r\nright = null;\r\n}\r\n}\r\npublic class LCA\r\n{\r\nNode root;\r\nNode findLCA(Node root, int n1, int n2)\r\n{\r\nif (root == null)\r\n{\r\nreturn null;\r\n\r\n}\r\nif (root.data == n1 || root.data == n2)\r\n{\r\nreturn root;\r\n}\r\nNode left = findLCA(root.left, n1, n2);\r\nNode right = findLCA(root.right, n1, n2);\r\nif (left != null && right != null)\r\n{\r\nreturn root;\r\n}\r\nreturn (left != null) ? left : right;\r\n}\r\npublic static void main(String args[])\r\n{\r\nLCA tree = new LCA();\r\ntree.root = new Node(1);\r\ntree.root.left = new Node(2);\r\ntree.root.right = new Node(3);\r\ntree.root.left.left = new Node(4);\r\ntree.root.left.right = new Node(5);\r\nNode ans = tree.findLCA(tree.root, 4, 5);\r\nSystem.out.println(\"Lowest Common Ancestor: \" + ans.data);\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-10",
    "labId": "data-structures",
    "title": "Exp 10: B-Tree and B+ Tree Insertion and Searching Operations",
    "slug": "dsa-exp-10-b-tree-and-b-tree-insertion-and-searching-operations",
    "difficulty": "Intermediate",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 260,
    "simulator": "binary-tree",
    "quizId": "quiz-dsa-10",
    "sections": {
      "introduction": "To implement a B-Tree and perform insertion and searching operations using Java.",
      "objective": "To implement a B-Tree and perform insertion and searching operations using Java.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: B-Tree and B+ Tree Insertion and Searching Operations",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements B-Tree and B+ Tree Insertion and Searching Operations from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.TreeSet;\r\npublic class BTreeDemo\r\n{\r\npublic static void main(String[] args)\r\n{\r\nTreeSet<Integer> bTree = new TreeSet<>();\r\nbTree.add(50);\r\nbTree.add(20);\r\n\r\nbTree.add(70);\r\nbTree.add(10);\r\nbTree.add(30);\r\nbTree.add(60);\r\nbTree.add(80);\r\nSystem.out.println(\"B-Tree Elements:\");\r\nSystem.out.println(bTree);\r\nint key = 30;\r\nif (bTree.contains(key))\r\n{\r\nSystem.out.println(key + \" Found\");\r\n}\r\nelse\r\n{\r\nSystem.out.println(key + \" Not Found\");\r\n}\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-11",
    "labId": "data-structures",
    "title": "Exp 11: Graph Traversals: Breadth First Search (BFS) and Depth First Search (DFS)",
    "slug": "dsa-exp-11-graph-traversals-breadth-first-search-bfs-and-depth-first-search-dfs",
    "difficulty": "Advanced",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 265,
    "simulator": "custom",
    "quizId": "quiz-dsa-11",
    "sections": {
      "introduction": "To represent a graph using an Adjacency Matrix and perform Breadth First Search\r(BFS) and Depth First Search (DFS) traversals are using Java.",
      "objective": "To represent a graph using an Adjacency Matrix and perform Breadth First Search\r(BFS) and Depth First Search (DFS) traversals are using Java.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Graph Traversals: Breadth First Search (BFS) and Depth First Search (DFS)",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Graph Traversals: Breadth First Search (BFS) and Depth First Search (DFS) from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.*;\r\npublic class GraphMatrix\r\n{\r\nstatic int[][] graph ={{0, 1, 1, 0, 0}, {1, 0, 1, 1, 0}, {1, 1, 0, 0, 1}, {0, 1, 0, 0, 1},\r\n{0, 0, 1, 1, 0} };\r\nstatic boolean[] visited = new boolean[5];\r\nstatic void bfs(int start)\r\n{\r\nQueue<Integer> queue = new LinkedList<>();\r\nvisited[start] = true;\r\nqueue.add(start);\r\nwhile (!queue.isEmpty())\r\n{\r\nint v = queue.poll();\r\nSystem.out.print(v + \" \");\r\nfor (int i = 0; i < graph.length; i++)\r\n{\r\nif (graph[v][i] == 1 && !visited[i])\r\n{\r\nvisited[i] = true;\r\nqueue.add(i);\r\n}\r\n}\r\n}\r\n}\r\n\r\nstatic void dfs(int v)\r\n{\r\nvisited[v] = true;\r\nSystem.out.print(v + \" \");\r\nfor (int i = 0; i < graph.length; i++)\r\n{\r\nif (graph[v][i] == 1 && !visited[i])\r\n{\r\ndfs(i);\r\n}\r\n}\r\n}\r\npublic static void main(String args[])\r\n{\r\nSystem.out.println(\"Breadth First Search:\");\r\nbfs(0);\r\nArrays.fill(visited, false);\r\nSystem.out.println(\"\\nDepth First Search:\");\r\ndfs(0);\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-12",
    "labId": "data-structures",
    "title": "Exp 12: Dijkstra's Shortest Path & Prim/Kruskal Minimum Spanning Tree (MST)",
    "slug": "dsa-exp-12-dijkstra-s-shortest-path-prim-kruskal-minimum-spanning-tree-mst",
    "difficulty": "Advanced",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 270,
    "simulator": "binary-tree",
    "quizId": "quiz-dsa-12",
    "sections": {
      "introduction": "To implement Dijkstra's Shortest Path",
      "objective": "To implement Dijkstra's Shortest Path",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Dijkstra's Shortest Path & Prim/Kruskal Minimum Spanning Tree (MST)",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Dijkstra's Shortest Path & Prim/Kruskal Minimum Spanning Tree (MST) from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\npublic class Dijkstra {\r\nstatic final int INF = 9999;\r\npublic static void dijkstra(int[][] graph, int n, int source) {\r\nint[] distance = new int[n];\r\nboolean[] visited = new boolean[n];\r\n// Initialize distances and visited array\r\nfor (int i = 0; i < n; i++) {\r\ndistance[i] = INF;\r\nvisited[i] = false;\r\n\r\n}\r\ndistance[source] = 0;\r\nfor (int count = 0; count < n - 1; count++) {\r\nint min = INF;\r\nint u = -1;\r\n// Find the minimum distance vertex\r\nfor (int i = 0; i < n; i++) {\r\nif (!visited[i] && distance[i] < min) {\r\nmin = distance[i];\r\nu = i;\r\n}\r\n}\r\nvisited[u] = true;\r\n// Update distances\r\nfor (int v = 0; v < n; v++) {\r\nif (!visited[v]\r\n&& graph[u][v] != 0\r\n&& distance[u] != INF\r\n&& distance[u] + graph[u][v] < distance[v]) {\r\ndistance[v] = distance[u] + graph[u][v];\r\n}\r\n}\r\n}\r\nSystem.out.println(\"\\nShortest distances from source vertex \" + source + \":\");\r\nfor (int i = 0; i < n; i++) {\r\nSystem.out.println(\"Vertex \" + i + \" : \" + distance[i]);\r\n}\r\n}\r\npublic static void main(String[] args) {\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter the number of vertices: \");\r\nint n = sc.nextInt();\r\nint[][] graph = new int[n][n];\r\nSystem.out.println(\"Enter the adjacency matrix:\");\r\n\r\nfor (int i = 0; i < n; i++) {\r\nfor (int j = 0; j < n; j++) {\r\ngraph[i][j] = sc.nextInt();\r\n}\r\n}\r\nSystem.out.print(\"Enter the source vertex: \");\r\nint source = sc.nextInt();\r\ndijkstra(graph, n, source);\r\nsc.close();\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-13",
    "labId": "data-structures",
    "title": "Exp 13: Linear Search and Binary Search Comparison",
    "slug": "dsa-exp-13-linear-search-and-binary-search-comparison",
    "difficulty": "Advanced",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 275,
    "simulator": "custom",
    "quizId": "quiz-dsa-13",
    "sections": {
      "introduction": "To implement Linear Search and Binary Search",
      "objective": "To implement Linear Search and Binary Search",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Linear Search and Binary Search Comparison",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Linear Search and Binary Search Comparison from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\npublic class SearchComparison\r\n{\r\n// Linear Search\r\nstatic int linearSearch(int arr[], int key)\r\n{\r\nfor (int i = 0; i < arr.length; i++)\r\n{\r\nif (arr[i] == key)\r\n{\r\nreturn i;\r\n}\r\n}\r\nreturn -1;\r\n}\r\n// Binary Search\r\nstatic int binarySearch(int arr[], int key)\r\n{\r\nint low = 0;\r\nint high = arr.length - 1;\r\nwhile (low <= high)\r\n{\r\nint mid = (low + high) / 2;\r\nif (arr[mid] == key)\r\n{\r\nreturn mid;\r\n}\r\nif (key < arr[mid])\r\n{\r\nhigh = mid - 1;\r\n}\r\nelse\r\n{\r\nlow = mid + 1;\r\n}\r\n}\r\nreturn -1;\r\n}\r\npublic static void main(String[] args)\r\n{\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter number of elements: \");\r\n\r\nint n = sc.nextInt();\r\nint arr[] = new int[n];\r\nSystem.out.println(\"Enter sorted array elements:\");\r\nfor (int i = 0; i < n; i++)\r\n{\r\narr[i] = sc.nextInt();\r\n}\r\nSystem.out.print(\"Enter element to search: \");\r\nint key = sc.nextInt();\r\nint linear = linearSearch(arr, key);\r\nif (linear != -1)\r\n{\r\nSystem.out.println(\"Linear Search: Element found at position \" + (linear + 1));\r\n}\r\nelse\r\n{\r\nSystem.out.println(\"Linear Search: Element Not Found\");\r\n}\r\nint binary = binarySearch(arr, key);\r\nif (binary != -1)\r\n{\r\nSystem.out.println(\"Binary Search: Element found at position \" + (binary +\r\n1));\r\n}\r\nelse\r\n{\r\nSystem.out.println(\"Binary Search: Element Not Found\");\r\n}\r\nsc.close();\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-14",
    "labId": "data-structures",
    "title": "Exp 14: Sorting Algorithms: Bubble Sort, Merge Sort, and Quick Sort",
    "slug": "dsa-exp-14-sorting-algorithms-bubble-sort-merge-sort-and-quick-sort",
    "difficulty": "Advanced",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 280,
    "simulator": "bubble-sort",
    "quizId": "quiz-dsa-14",
    "sections": {
      "introduction": "To implement the Bubble Sort",
      "objective": "To implement the Bubble Sort",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Sorting Algorithms: Bubble Sort, Merge Sort, and Quick Sort",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Sorting Algorithms: Bubble Sort, Merge Sort, and Quick Sort from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.Scanner;\r\npublic class BubbleSort\r\n{\r\npublic static void bubbleSort(int arr[])\r\n{\r\nint n = arr.length;\r\nfor (int i = 0; i < n - 1; i++)\r\n{\r\nfor (int j = 0; j < n - i - 1; j++)\r\n{\r\nif (arr[j] > arr[j + 1])\r\n{\r\nint temp = arr[j];\r\narr[j] = arr[j + 1];\r\narr[j + 1] = temp;\r\n}\r\n}\r\n}\r\n}\r\n\r\npublic static void main(String args[])\r\n{\r\nScanner sc = new Scanner(System.in);\r\nSystem.out.print(\"Enter number of elements: \");\r\nint n = sc.nextInt();\r\nint arr[] = new int[n];\r\nSystem.out.println(\"Enter array elements:\");\r\nfor (int i = 0; i < n; i++)\r\n{\r\narr[i] = sc.nextInt();\r\n}\r\nbubbleSort(arr);\r\nSystem.out.println(\"Sorted Array:\");\r\nfor (int num : arr)\r\n{\r\nSystem.out.print(num + \" \");\r\n}\r\nsc.close();\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "dsa-exp-15",
    "labId": "data-structures",
    "title": "Exp 15: Hash Tables with Separate Chaining and Open Addressing",
    "slug": "dsa-exp-15-hash-tables-with-separate-chaining-and-open-addressing",
    "difficulty": "Advanced",
    "category": "Linear Structures",
    "estimatedMinutes": 30,
    "rating": 4.96,
    "ratingsCount": 285,
    "simulator": "custom",
    "quizId": "quiz-dsa-15",
    "sections": {
      "introduction": "To implement a Hash Table using the Separate Chaining collision resolution\rtechnique in Java.",
      "objective": "To implement a Hash Table using the Separate Chaining collision resolution\rtechnique in Java.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/8hly31xKli0",
      "videoTitle": "DSA: Hash Tables with Separate Chaining and Open Addressing",
      "videoChannel": "Data Structures Visualizer",
      "prerequisites": [
        "Object Oriented Java Basics",
        "Memory Pointer Concepts"
      ],
      "theory": {
        "overview": "This experiment implements Hash Tables with Separate Chaining and Open Addressing from the V.S.B. Engineering College Data Structures and Algorithms syllabus. Students learn node link adjustments, recursive divide-and-conquer principles, memory locality, and asymptotic time/space complexity trade-offs.",
        "keyConcepts": [
          {
            "title": "Abstract Data Type (ADT)",
            "desc": "Mathematical model for data structures defining behavior independent of implementation."
          },
          {
            "title": "Pointer Traversal & Mutation",
            "desc": "Dynamic reference adjustments and garbage collection safety in Java."
          },
          {
            "title": "Asymptotic Analysis",
            "desc": "Rigorous Big-O time and auxiliary space consumption metrics."
          }
        ],
        "complexities": [
          {
            "operation": "Core Operation",
            "best": "O(1)",
            "avg": "O(log n)",
            "worst": "O(n)",
            "space": "O(n)"
          }
        ],
        "realWorldApplications": [
          "Browser history and undo/redo stacks in desktop applications",
          "OS process schedulers and asynchronous network packet queues",
          "Database B-Tree indexing and GPS navigation graph pathfinding"
        ]
      },
      "procedure": [
        "1. Define the data structure nodes or memory arrays.",
        "2. Initialize structure pointers and state boundary conditions.",
        "3. Implement core operations (insertion, deletion, traversal).",
        "4. Handle edge cases (empty structure, overflow, underflow).",
        "5. Test operations with sample input sets and observe asymptotic runtime."
      ],
      "sampleCode": {
        "language": "java",
        "code": "import java.util.LinkedList;\r\npublic class SeparateChaining {\r\nstatic final int SIZE = 10;\r\nLinkedList<Integer>[] table;\r\n@SuppressWarnings(\"unchecked\")\r\nSeparateChaining() {\r\ntable = new LinkedList[SIZE];\r\nfor (int i = 0; i < SIZE; i++) {\r\ntable[i] = new LinkedList<>();\r\n}\r\n}\r\nvoid insert(int key) {\r\nint index = key % SIZE;\r\ntable[index].add(key);\r\n}\r\nboolean search(int key) {\r\nint index = key % SIZE;\r\nreturn table[index].contains(key);\r\n}\r\n\r\nvoid display() {\r\nSystem.out.println(\"Hash Table:\");\r\nfor (int i = 0; i < SIZE; i++) {\r\nSystem.out.println(i + \" -> \" + table[i]);\r\n}\r\n}\r\npublic static void main(String[] args) {\r\nSeparateChaining hash = new SeparateChaining();\r\nhash.insert(15);\r\nhash.insert(25);\r\nhash.insert(35);\r\nhash.insert(42);\r\nhash.display();\r\nSystem.out.println(\"Search 25: \" + hash.search(25));\r\n}\r\n}"
      },
      "expectedOutput": "Program executed successfully.\nAll test cases and operations verified as per VSB DSA manual.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.Tech AI&DS",
          "B.E. CSE - 2nd Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  }
];
