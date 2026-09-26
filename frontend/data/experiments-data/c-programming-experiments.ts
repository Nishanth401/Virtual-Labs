import { Experiment } from "../experiments";

export const C_PROGRAMMING_EXPERIMENTS: Experiment[] = [
  {
    "id": "c-exp-1",
    "labId": "c-programming",
    "title": "Exp 1: Distance Between Two Points",
    "slug": "c-exp-1-distance-between-two-points",
    "difficulty": "Beginner",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 163,
    "simulator": "custom",
    "quizId": "quiz-c-1",
    "sections": {
      "introduction": "To develop a C program to calculate the distance between two points using the distance formula.",
      "objective": "To develop a C program to calculate the distance between two points using the distance formula.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Distance Between Two Points",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Distance Between Two Points. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Declare variables x1, y1, x2, y2 to store coordinates and dist to store the result.",
        "3. Read the coordinates of the two points from the user.",
        "4. Compute the distance using the formula: dist = sqrt((x2-x1)^2 + (y2-y1)^2).",
        "5. Display the computed distance.",
        "6. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  \n#include <math.h>\n  int main() {\n  float x1, y1, x2, y2, dist;\n  printf(\"Enter coordinates of first point (x1 y1): \");\n  scanf(\"%f %f\", &x1, &y1);\n  printf(\"Enter coordinates of second point (x2 y2): \");\n  scanf(\"%f %f\", &x2, &y2);\n  dist = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));\n  printf(\"Distance between the two points = %.2f\\n\", dist);\n  return 0;\n  }"
      },
      "expectedOutput": "Enter coordinates of first point (x1 y1): 0 0\nEnter coordinates of second point (x2 y2): 3 4\nDistance between the two points = 5.00",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-2",
    "labId": "c-programming",
    "title": "Exp 2: Temperature Conversion (Fahrenheit to Celsius and Vice Versa)",
    "slug": "c-exp-2-temperature-conversion-fahrenheit-to-celsius-and-vice-versa",
    "difficulty": "Beginner",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 166,
    "simulator": "custom",
    "quizId": "quiz-c-2",
    "sections": {
      "introduction": "To write a C program to convert temperature from Fahrenheit to Celsius and vice versa.",
      "objective": "To write a C program to convert temperature from Fahrenheit to Celsius and vice versa.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Temperature Conversion (Fahrenheit to Celsius and Vice Versa)",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Temperature Conversion (Fahrenheit to Celsius and Vice Versa). It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Display a menu to choose the type of conversion.",
        "3. Read the choice and the temperature value from the user.",
        "4. If choice is Fahrenheit to Celsius, apply C = (F - 32) \\* 5/9.",
        "5. If choice is Celsius to Fahrenheit, apply F = (C \\* 9/5) + 32.",
        "6. Display the converted temperature.",
        "7. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  int main() {\n  int choice;\n  float temp, result;\n  printf(\"1. Fahrenheit to Celsius\\n\");\n  printf(\"2. Celsius to Fahrenheit\\n\");\n  printf(\"Enter your choice: \");\n  scanf(\"%d\", &choice);\n  if (choice == 1) {\n  printf(\"Enter temperature in Fahrenheit: \");\n  scanf(\"%f\", &temp);\n  result = (temp - 32) \\* 5.0 / 9.0;\n  printf(\"Temperature in Celsius = %.2f\\n\", result);\n  }\n  else if (choice == 2) {\n  printf(\"Enter temperature in Celsius: \");\n  scanf(\"%f\", &temp);\n  result = (temp \\* 9.0 / 5.0) + 32;\n  printf(\"Temperature in Fahrenheit = %.2f\\n\", result);\n  }\n  else {\n  printf(\"Invalid choice\\n\");\n  }\n  return 0;\n  }"
      },
      "expectedOutput": "1. Fahrenheit to Celsius\n2. Celsius to Fahrenheit\nEnter your choice: 1\nEnter temperature in Fahrenheit: 98.6\nTemperature in Celsius = 37.00",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-3",
    "labId": "c-programming",
    "title": "Exp 3: Count Zeros and Ones in a Binary Number",
    "slug": "c-exp-3-count-zeros-and-ones-in-a-binary-number",
    "difficulty": "Beginner",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 169,
    "simulator": "custom",
    "quizId": "quiz-c-3",
    "sections": {
      "introduction": "To develop a C program to count the number of zeros and ones in a given binary number.",
      "objective": "To develop a C program to count the number of zeros and ones in a given binary number.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Count Zeros and Ones in a Binary Number",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Count Zeros and Ones in a Binary Number. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Read a binary number as an integer (containing only digits 0 and 1).",
        "3. Initialize counters countZero and countOne to zero.",
        "4. Repeatedly extract the last digit of the number using the modulus operator.",
        "5. If the digit is 0, increment countZero; if it is 1, increment countOne.",
        "6. Remove the last digit by dividing the number by 10 and repeat until the number becomes 0.",
        "7. Display the count of zeros and ones.",
        "8. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  int main() {\n  long int binNum;\n  int digit, countZero = 0, countOne = 0;\n  printf(\"Enter a binary number: \");\n  scanf(\"%ld\", &binNum);\n  while (binNum != 0) {\n  digit = binNum % 10;\n  if (digit == 0)\n  countZero++;\n  else if (digit == 1)\n  countOne++;\n  binNum = binNum / 10;\n  }\n  printf(\"Number of zeros = %d\\n\", countZero);\n  printf(\"Number of ones = %d\\n\", countOne);\n  return 0;\n  }"
      },
      "expectedOutput": "Enter a binary number: 110100101\nNumber of zeros = 4\nNumber of ones = 5",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-4",
    "labId": "c-programming",
    "title": "Exp 4: Armstrong Number Check",
    "slug": "c-exp-4-armstrong-number-check",
    "difficulty": "Beginner",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 172,
    "simulator": "custom",
    "quizId": "quiz-c-4",
    "sections": {
      "introduction": "To write a C program to check whether a given number is an Armstrong number.",
      "objective": "To write a C program to check whether a given number is an Armstrong number.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Armstrong Number Check",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Armstrong Number Check. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Read an integer number from the user.",
        "3. Store the original number in a temporary variable.",
        "4. Find the number of digits n in the number.",
        "5. For every digit, compute digit raised to the power n and add it to a sum variable.",
        "6. Compare the sum with the original number.",
        "7. If they are equal, display that it is an Armstrong number; otherwise display that it is not.",
        "8. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  \n#include <math.h>\n  int main() {\n  int num, original, digit, n = 0, sum = 0;\n  printf(\"Enter a number: \");\n  scanf(\"%d\", &num);\n  original = num;\n  /\\* Count number of digits \\*/\n  int temp = num;\n  while (temp != 0) {\n  temp = temp / 10;\n  n++;\n  }\n  temp = num;\n  while (temp != 0) {\n  digit = temp % 10;\n  sum = sum + (int)pow(digit, n);\n  temp = temp / 10;\n  }\n  if (sum == original)\n  printf(\"%d is an Armstrong number\\n\", original);\n  else\n  printf(\"%d is NOT an Armstrong number\\n\", original);\n  return 0;\n  }"
      },
      "expectedOutput": "Enter a number: 153\n153 is an Armstrong number",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-5",
    "labId": "c-programming",
    "title": "Exp 5: Swapping of Two Numbers using Call by Value and Call by Reference",
    "slug": "c-exp-5-swapping-of-two-numbers-using-call-by-value-and-call-by-reference",
    "difficulty": "Beginner",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 175,
    "simulator": "custom",
    "quizId": "quiz-c-5",
    "sections": {
      "introduction": "To implement swapping of two numbers using: (a) Call by Value, and (b) Call by Reference.",
      "objective": "To implement swapping of two numbers using: (a) Call by Value, and (b) Call by Reference.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Swapping of Two Numbers using Call by Value and Call by Reference",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Swapping of Two Numbers using Call by Value and Call by Reference. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Read two numbers a and b from the user.",
        "3. Call the function swapByValue(a, b) which swaps the copies of the variables; observe that the original values remain unchanged after the call.",
        "4. Call the function swapByReference(&a, &b), passing the addresses of a and b, which swaps the actual values using pointers.",
        "5. Display the values before and after each function call.",
        "6. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  /\\* Call by Value \\*/\n  void swapByValue(int x, int y) {\n  int temp = x;\n  x = y;\n  y = temp;\n  printf(\"Inside swapByValue: x = %d, y = %d\\n\", x, y);\n  }\n  /\\* Call by Reference \\*/\n  void swapByReference(int \\*x, int \\*y) {\n  int temp = \\*x;\n  \\*x = \\*y;\n  \\*y = temp;\n  }\n  int main() {\n  int a, b;\n  printf(\"Enter two numbers a and b: \");\n  scanf(\"%d %d\", &a, &b);\n  printf(\"\\n--- Call by Value ---\\n\");\n  printf(\"Before call: a = %d, b = %d\\n\", a, b);\n  swapByValue(a, b);\n  printf(\"After call: a = %d, b = %d (unchanged)\\n\", a, b);\n  printf(\"\\n--- Call by Reference ---\\n\");\n  printf(\"Before call: a = %d, b = %d\\n\", a, b);\n  swapByReference(&a, &b);\n  printf(\"After call: a = %d, b = %d (swapped)\\n\", a, b);\n  return 0;\n  }"
      },
      "expectedOutput": "Enter two numbers a and b: 10 20\n--- Call by Value ---\nBefore call: a = 10, b = 20\nInside swapByValue: x = 20, y = 10\nAfter call: a = 10, b = 20 (unchanged)\n--- Call by Reference ---\nBefore call: a = 10, b = 20\nAfter call: a = 20, b = 10 (swapped)",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-6",
    "labId": "c-programming",
    "title": "Exp 6: Recursive Programs: Fibonacci Series and GCD of Two Numbers",
    "slug": "c-exp-6-recursive-programs-fibonacci-series-and-gcd-of-two-numbers",
    "difficulty": "Intermediate",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 178,
    "simulator": "custom",
    "quizId": "quiz-c-6",
    "sections": {
      "introduction": "To develop recursive programs to: (a) generate the Fibonacci series, and (b) find the GCD of two numbers.",
      "objective": "To develop recursive programs to: (a) generate the Fibonacci series, and (b) find the GCD of two numbers.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Recursive Programs: Fibonacci Series and GCD of Two Numbers",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Recursive Programs: Fibonacci Series and GCD of Two Numbers. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Define a recursive function fibonacci(n) that returns the nth Fibonacci number using the base cases n=0 and n=1.",
        "3. Read the number of terms and print the Fibonacci series by calling fibonacci() repeatedly.",
        "4. Define a recursive function gcd(a, b) that returns b if a % b == 0, otherwise returns gcd(b, a % b).",
        "5. Read two numbers and display their GCD using the recursive function.",
        "6. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  /\\* Recursive function for Fibonacci series \\*/\n  int fibonacci(int n) {\n  if (n == 0)\n  return 0;\n  else if (n == 1)\n  return 1;\n  else\n  return fibonacci(n - 1) + fibonacci(n - 2);\n  }\n  /\\* Recursive function for GCD \\*/\n  int gcd(int a, int b) {\n  if (b == 0)\n  return a;\n  else\n  return gcd(b, a % b);\n  }\n  int main() {\n  int n, num1, num2, i;\n  printf(\"Enter number of terms for Fibonacci series: \");\n  scanf(\"%d\", &n);\n  printf(\"Fibonacci Series: \");\n  for (i = 0; i < n; i++)\n  printf(\"%d \", fibonacci(i));\n  printf(\"\\n\");\n  printf(\"\\nEnter two numbers to find GCD: \");\n  scanf(\"%d %d\", &num1, &num2);\n  printf(\"GCD of %d and %d = %d\\n\", num1, num2, gcd(num1, num2));\n  return 0;\n  }"
      },
      "expectedOutput": "Enter number of terms for Fibonacci series: 8\nFibonacci Series: 0 1 1 2 3 5 8 13\nEnter two numbers to find GCD: 36 60\nGCD of 36 and 60 = 12",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-7",
    "labId": "c-programming",
    "title": "Exp 7: Matrix Addition, Multiplication, and Transpose using 2D Arrays",
    "slug": "c-exp-7-matrix-addition-multiplication-and-transpose-using-2d-arrays",
    "difficulty": "Intermediate",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 181,
    "simulator": "custom",
    "quizId": "quiz-c-7",
    "sections": {
      "introduction": "To implement matrix addition, matrix multiplication, and transpose of a matrix using 2D arrays.",
      "objective": "To implement matrix addition, matrix multiplication, and transpose of a matrix using 2D arrays.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Matrix Addition, Multiplication, and Transpose using 2D Arrays",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Matrix Addition, Multiplication, and Transpose using 2D Arrays. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Read the order (rows and columns) and elements of the matrices from the user.",
        "3. For addition, read two matrices of the same order and add corresponding elements.",
        "4. For multiplication, read two matrices where the columns of the first equal the rows of the second, and compute the product using nested loops.",
        "5. For transpose, interchange the rows and columns of a matrix.",
        "6. Display the resultant matrices.",
        "7. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  int main() {\n  int a[10][10], b[10][10], sum[10][10], mul[10][10], trans[10][10];\n  int r1, c1, r2, c2, i, j, k;\n  /\\* Matrix Addition \\*/\n  printf(\"--- Matrix Addition ---\\n\");\n  printf(\"Enter rows and columns of matrix A (same order for B): \");\n  scanf(\"%d %d\", &r1, &c1);\n  printf(\"Enter elements of matrix A:\\n\");\n  for (i = 0; i < r1; i++)\n  for (j = 0; j < c1; j++)\n  scanf(\"%d\", &a[i][j]);\n  printf(\"Enter elements of matrix B:\\n\");\n  for (i = 0; i < r1; i++)\n  for (j = 0; j < c1; j++)\n  scanf(\"%d\", &b[i][j]);\n  for (i = 0; i < r1; i++)\n  for (j = 0; j < c1; j++)\n  sum[i][j] = a[i][j] + b[i][j];\n  printf(\"Sum of matrices:\\n\");\n  for (i = 0; i < r1; i++) {\n  for (j = 0; j < c1; j++)\n  printf(\"%d \", sum[i][j]);\n  printf(\"\\n\");\n  }\n  /\\* Matrix Multiplication \\*/\n  printf(\"\\n--- Matrix Multiplication ---\\n\");\n  printf(\"Enter rows and columns of matrix A: \");\n  scanf(\"%d %d\", &r1, &c1);\n  printf(\"Enter rows and columns of matrix B (rows = %d): \", c1);\n  scanf(\"%d %d\", &r2, &c2);\n  printf(\"Enter elements of matrix A:\\n\");\n  for (i = 0; i < r1; i++)\n  for (j = 0; j < c1; j++)\n  scanf(\"%d\", &a[i][j]);\n  printf(\"Enter elements of matrix B:\\n\");\n  for (i = 0; i < r2; i++)\n  for (j = 0; j < c2; j++)\n  scanf(\"%d\", &b[i][j]);\n  for (i = 0; i < r1; i++) {\n  for (j = 0; j < c2; j++) {\n  mul[i][j] = 0;\n  for (k = 0; k < c1; k++)\n  mul[i][j] += a[i][k] \\* b[k][j];\n  }\n  }\n  printf(\"Product of matrices:\\n\");\n  for (i = 0; i < r1; i++) {\n  for (j = 0; j < c2; j++)\n  printf(\"%d \", mul[i][j]);\n  printf(\"\\n\");\n  }\n  /\\* Matrix Transpose \\*/\n  printf(\"\\n--- Matrix Transpose ---\\n\");\n  for (i = 0; i < r1; i++)\n  for (j = 0; j < c1; j++)\n  trans[j][i] = a[i][j];\n  printf(\"Transpose of matrix A:\\n\");\n  for (i = 0; i < c1; i++) {\n  for (j = 0; j < r1; j++)\n  printf(\"%d \", trans[i][j]);\n  printf(\"\\n\");\n  }\n  return 0;\n  }"
      },
      "expectedOutput": "--- Matrix Addition ---\nEnter rows and columns of matrix A (same order for B): 2 2\nEnter elements of matrix A:\n1 2 3 4\nEnter elements of matrix B:\n5 6 7 8\nSum of matrices:\n6 8\n10 12\n--- Matrix Multiplication ---\nEnter rows and columns of matrix A: 2 2\nEnter rows and columns of matrix B (rows = 2): 2 2\nEnter elements of matrix A:\n1 2 3 4\nEnter elements of matrix B:\n5 6 7 8\nProduct of matrices:\n19 22\n43 50\n--- Matrix Transpose ---\nTranspose of matrix A:\n1 3\n2 4",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-8",
    "labId": "c-programming",
    "title": "Exp 8: Largest, Smallest, Interchange, and Duplicate Count in an Array",
    "slug": "c-exp-8-largest-smallest-interchange-and-duplicate-count-in-an-array",
    "difficulty": "Intermediate",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 184,
    "simulator": "custom",
    "quizId": "quiz-c-8",
    "sections": {
      "introduction": "To write a program to: (a) find the largest and smallest elements, (b) interchange the largest and smallest elements, and (c) count duplicate elements in an array.",
      "objective": "To write a program to: (a) find the largest and smallest elements, (b) interchange the largest and smallest elements, and (c) count duplicate elements in an array.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Largest, Smallest, Interchange, and Duplicate Count in an Array",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Largest, Smallest, Interchange, and Duplicate Count in an Array. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Read the size and elements of the array from the user.",
        "3. Traverse the array to find the index of the largest element and the index of the smallest element.",
        "4. Display the largest and smallest elements.",
        "5. Interchange the elements at the largest and smallest indices and display the updated array.",
        "6. Use nested loops to compare each element with every other element and count duplicate occurrences.",
        "7. Display the duplicate count.",
        "8. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  int main() {\n  int arr[50], n, i, j;\n  int maxIdx = 0, minIdx = 0, duplicates = 0;\n  printf(\"Enter number of elements: \");\n  scanf(\"%d\", &n);\n  printf(\"Enter %d elements: \", n);\n  for (i = 0; i < n; i++)\n  scanf(\"%d\", &arr[i]);\n  /\\* Find largest and smallest \\*/\n  for (i = 1; i < n; i++) {\n  if (arr[i] > arr[maxIdx])\n  maxIdx = i;\n  if (arr[i] < arr[minIdx])\n  minIdx = i;\n  }\n  printf(\"\\nLargest element = %d\\n\", arr[maxIdx]);\n  printf(\"Smallest element = %d\\n\", arr[minIdx]);\n  /\\* Interchange largest and smallest \\*/\n  int temp = arr[maxIdx];\n  arr[maxIdx] = arr[minIdx];\n  arr[minIdx] = temp;\n  printf(\"\\nArray after interchanging largest and smallest:\\n\");\n  for (i = 0; i < n; i++)\n  printf(\"%d \", arr[i]);\n  printf(\"\\n\");\n  /\\* Count duplicate elements \\*/\n  int visited[50] = {0};\n  for (i = 0; i < n; i++) {\n  if (visited[i] == 1)\n  continue;\n  int count = 1;\n  for (j = i + 1; j < n; j++) {\n  if (arr[i] == arr[j]) {\n  visited[j] = 1;\n  count++;\n  }\n  }\n  if (count > 1)\n  duplicates++;\n  }\n  printf(\"\\nNumber of duplicate elements (distinct values repeated) = %d\\n\", duplicates);\n  return 0;\n  }"
      },
      "expectedOutput": "Enter number of elements: 6\nEnter 6 elements: 4 8 2 8 4 9\nLargest element = 9\nSmallest element = 2\nArray after interchanging largest and smallest:\n4 8 9 8 4 2\nNumber of duplicate elements (distinct values repeated) = 2",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-9",
    "labId": "c-programming",
    "title": "Exp 9: String Operations: Palindrome Checking, Reverse a String, Extract Last N Characters",
    "slug": "c-exp-9-string-operations-palindrome-checking-reverse-a-string-extract-last-n-characters",
    "difficulty": "Intermediate",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 187,
    "simulator": "custom",
    "quizId": "quiz-c-9",
    "sections": {
      "introduction": "To implement string operations: (a) palindrome checking, (b) reverse a string, and (c) extract the last N characters from a string.",
      "objective": "To implement string operations: (a) palindrome checking, (b) reverse a string, and (c) extract the last N characters from a string.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: String Operations: Palindrome Checking, Reverse a String, Extract Last N Characters",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in String Operations: Palindrome Checking, Reverse a String, Extract Last N Characters. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Read a string from the user using gets()/fgets() or scanf with %s.",
        "3. To check palindrome, compare the string with its reverse; if equal, it is a palindrome.",
        "4. To reverse a string, swap characters from both ends moving towards the centre, or copy characters from the end into a new string.",
        "5. To extract the last N characters, find the length of the string and copy characters from position (length - N) to the end.",
        "6. Display the results of all three operations.",
        "7. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  \n#include <string.h>\n  int main() {\n  char str[100], rev[100], lastN[100];\n  int n, len, i, isPalindrome = 1;\n  printf(\"Enter a string: \");\n  scanf(\"%s\", str);\n  len = strlen(str);\n  /\\* Reverse the string \\*/\n  for (i = 0; i < len; i++)\n  rev[i] = str[len - 1 - i];\n  rev[len] = '\\0';\n  /\\* Palindrome check \\*/\n  for (i = 0; i < len; i++) {\n  if (str[i] != rev[i]) {\n  isPalindrome = 0;\n  break;\n  }\n  }\n  printf(\"\\nOriginal string : %s\\n\", str);\n  printf(\"Reversed string : %s\\n\", rev);\n  if (isPalindrome)\n  printf(\"The string is a palindrome\\n\");\n  else\n  printf(\"The string is NOT a palindrome\\n\");\n  /\\* Extract last N characters \\*/\n  printf(\"\\nEnter value of N to extract last N characters: \");\n  scanf(\"%d\", &n);\n  if (n > len) {\n  printf(\"N is greater than string length\\n\");\n  } else {\n  strcpy(lastN, str + (len - n));\n  printf(\"Last %d characters: %s\\n\", n, lastN);\n  }\n  return 0;\n  }"
      },
      "expectedOutput": "Enter a string: malayalam\nOriginal string : malayalam\nReversed string : malayalam\nThe string is a palindrome\nEnter value of N to extract last N characters: 4\nLast 4 characters: alam",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-10",
    "labId": "c-programming",
    "title": "Exp 10: Dynamic Array Creation and Manipulation using malloc(), calloc(), realloc(), and free()",
    "slug": "c-exp-10-dynamic-array-creation-and-manipulation-using-malloc-calloc-realloc-and-free",
    "difficulty": "Intermediate",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 190,
    "simulator": "custom",
    "quizId": "quiz-c-10",
    "sections": {
      "introduction": "To develop a program using malloc(), calloc(), realloc(), and free() for dynamic array creation and manipulation.",
      "objective": "To develop a program using malloc(), calloc(), realloc(), and free() for dynamic array creation and manipulation.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Dynamic Array Creation and Manipulation using malloc(), calloc(), realloc(), and free()",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Dynamic Array Creation and Manipulation using malloc(), calloc(), realloc(), and free(). It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Read the number of elements n from the user.",
        "3. Allocate memory for n integers using malloc() and read/display the elements.",
        "4. Free the memory and allocate memory again using calloc(), which also initializes all elements to zero, then read/display the elements.",
        "5. Use realloc() to resize the previously allocated memory block to a new size and display the resized array.",
        "6. Free all dynamically allocated memory using free() before the program ends.",
        "7. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  \n#include <stdlib.h>\n  int main() {\n  int \\*arr, n, i, newSize;\n  printf(\"Enter number of elements: \");\n  scanf(\"%d\", &n);\n  /\\* malloc() \\*/\n  arr = (int \\*)malloc(n \\* sizeof(int));\n  if (arr == NULL) {\n  printf(\"Memory allocation failed\\n\");\n  return 1;\n  }\n  printf(\"Enter %d elements (using malloc): \", n);\n  for (i = 0; i < n; i++)\n  scanf(\"%d\", &arr[i]);\n  printf(\"Elements using malloc: \");\n  for (i = 0; i < n; i++)\n  printf(\"%d \", arr[i]);\n  printf(\"\\n\");\n  free(arr);\n  /\\* calloc() \\*/\n  arr = (int \\*)calloc(n, sizeof(int));\n  printf(\"\\nElements using calloc (auto-initialized to 0): \");\n  for (i = 0; i < n; i++)\n  printf(\"%d \", arr[i]);\n  printf(\"\\n\");\n  for (i = 0; i < n; i++)\n  arr[i] = (i + 1) \\* 10;\n  printf(\"After assigning values: \");\n  for (i = 0; i < n; i++)\n  printf(\"%d \", arr[i]);\n  printf(\"\\n\");\n  /\\* realloc() \\*/\n  printf(\"\\nEnter new size to resize the array: \");\n  scanf(\"%d\", &newSize);\n  arr = (int \\*)realloc(arr, newSize \\* sizeof(int));\n  printf(\"Enter values for additional elements: \");\n  for (i = n; i < newSize; i++)\n  scanf(\"%d\", &arr[i]);\n  printf(\"Array after realloc: \");\n  for (i = 0; i < newSize; i++)\n  printf(\"%d \", arr[i]);\n  printf(\"\\n\");\n  /\\* free() \\*/\n  free(arr);\n  printf(\"\\nMemory freed successfully\\n\");\n  return 0;\n  }"
      },
      "expectedOutput": "Enter number of elements: 3\nEnter 3 elements (using malloc): 10 20 30\nElements using malloc: 10 20 30\nElements using calloc (auto-initialized to 0): 0 0 0\nAfter assigning values: 10 20 30\nEnter new size to resize the array: 5\nEnter values for additional elements: 40 50\nArray after realloc: 10 20 30 40 50\nMemory freed successfully",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-11",
    "labId": "c-programming",
    "title": "Exp 11: Structures to Store and Display Student Information",
    "slug": "c-exp-11-structures-to-store-and-display-student-information",
    "difficulty": "Advanced",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 193,
    "simulator": "custom",
    "quizId": "quiz-c-11",
    "sections": {
      "introduction": "To use structures to store and display student information such as Roll Number, Name, Department, and Marks.",
      "objective": "To use structures to store and display student information such as Roll Number, Name, Department, and Marks.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Structures to Store and Display Student Information",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Structures to Store and Display Student Information. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Define a structure Student with members rollNo, name, department, and marks.",
        "3. Declare an array of structures to store details of multiple students.",
        "4. Read the details of each student using dot operator through a loop.",
        "5. Display the details of all students in a tabular format.",
        "6. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  struct Student {\n  int rollNo;\n  char name[50];\n  char department[30];\n  float marks;\n  };\n  int main() {\n  int n, i;\n  printf(\"Enter number of students: \");\n  scanf(\"%d\", &n);\n  struct Student s[n];\n  for (i = 0; i < n; i++) {\n  printf(\"\\nEnter details of student %d\\n\", i + 1);\n  printf(\"Roll Number: \");\n  scanf(\"%d\", &s[i].rollNo);\n  printf(\"Name: \");\n  scanf(\"%s\", s[i].name);\n  printf(\"Department: \");\n  scanf(\"%s\", s[i].department);\n  printf(\"Marks: \");\n  scanf(\"%f\", &s[i].marks);\n  }\n  printf(\"\\n%-10s %-15s %-15s %-8s\\n\", \"Roll No\", \"Name\", \"Department\", \"Marks\");\n  printf(\"---------------------------------------------------\\n\");\n  for (i = 0; i < n; i++) {\n  printf(\"%-10d %-15s %-15s %-8.2f\\n\",\n  s[i].rollNo, s[i].name, s[i].department, s[i].marks);\n  }\n  return 0;\n  }"
      },
      "expectedOutput": "Enter number of students: 2\nEnter details of student 1\nRoll Number: 101\nName: Arun\nDepartment: IT\nMarks: 88.5\nEnter details of student 2\nRoll Number: 102\nName: Divya\nDepartment: IT\nMarks: 92.0\nRoll No Name Department Marks\n---------------------------------------------------\n101 Arun IT 88.50\n102 Divya IT 92.00",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-12",
    "labId": "c-programming",
    "title": "Exp 12: Compute a Person's Age using Structures and User-Defined Functions",
    "slug": "c-exp-12-compute-a-person-s-age-using-structures-and-user-defined-functions",
    "difficulty": "Advanced",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 196,
    "simulator": "custom",
    "quizId": "quiz-c-12",
    "sections": {
      "introduction": "To develop a program to compute a person's age using structures and user-defined functions.",
      "objective": "To develop a program to compute a person's age using structures and user-defined functions.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Compute a Person's Age using Structures and User-Defined Functions",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Compute a Person's Age using Structures and User-Defined Functions. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Define a structure Date with members day, month, and year.",
        "3. Read the birth date and the current date from the user into two structure variables.",
        "4. Pass both structure variables to a user-defined function calculateAge() by value.",
        "5. Inside the function, compute the age in years, months, and days by subtracting the birth date from the current date, borrowing from the previous month/year when required.",
        "6. Return/display the computed age.",
        "7. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  struct Date {\n  int day;\n  int month;\n  int year;\n  };\n  void calculateAge(struct Date birth, struct Date current) {\n  int days, months, years;\n  days = current.day - birth.day;\n  months = current.month - birth.month;\n  years = current.year - birth.year;\n  if (days < 0) {\n  months--;\n  int prevMonth = (current.month == 1) ? 12 : current.month - 1;\n  int daysInMonth[] = {31,28,31,30,31,30,31,31,30,31,30,31};\n  days += daysInMonth[prevMonth - 1];\n  }\n  if (months < 0) {\n  years--;\n  months += 12;\n  }\n  printf(\"\\nAge = %d years, %d months, %d days\\n\", years, months, days);\n  }\n  int main() {\n  struct Date birth, current;\n  printf(\"Enter birth date (dd mm yyyy): \");\n  scanf(\"%d %d %d\", &birth.day, &birth.month, &birth.year);\n  printf(\"Enter current date (dd mm yyyy): \");\n  scanf(\"%d %d %d\", &current.day, &current.month, &current.year);\n  calculateAge(birth, current);\n  return 0;\n  }"
      },
      "expectedOutput": "Enter birth date (dd mm yyyy): 15 6 2003\nEnter current date (dd mm yyyy): 2 9 2026\nAge = 23 years, 2 months, 18 days",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-13",
    "labId": "c-programming",
    "title": "Exp 13: File Handling: Create, Write, Read, and Append Data to a File",
    "slug": "c-exp-13-file-handling-create-write-read-and-append-data-to-a-file",
    "difficulty": "Advanced",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 199,
    "simulator": "custom",
    "quizId": "quiz-c-13",
    "sections": {
      "introduction": "To write a C program to: (a) create a file, (b) write data to the file, (c) read data from the file, and (d) append data to the file.",
      "objective": "To write a C program to: (a) create a file, (b) write data to the file, (c) read data from the file, and (d) append data to the file.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: File Handling: Create, Write, Read, and Append Data to a File",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in File Handling: Create, Write, Read, and Append Data to a File. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Open a file in write mode (\"w\") using fopen(); this creates the file if it does not exist.",
        "3. Write data into the file using fprintf() and close the file using fclose().",
        "4. Open the same file in read mode (\"r\") and read its contents using fscanf()/fgets(), displaying them on the screen.",
        "5. Open the file again in append mode (\"a\") and add new data to the end of the existing content without deleting it.",
        "6. Read the file once more to display the final content, confirming the appended data.",
        "7. Stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  \n#include <stdlib.h>\n  int main() {\n  FILE \\*fp;\n  char data[100];\n  /\\* Create and write to the file \\*/\n  fp = fopen(\"student.txt\", \"w\");\n  if (fp == NULL) {\n  printf(\"Error creating file\\n\");\n  exit(1);\n  }\n  fprintf(fp, \"Roll No: 101\\n\");\n  fprintf(fp, \"Name: Arun\\n\");\n  fprintf(fp, \"Department: IT\\n\");\n  fclose(fp);\n  printf(\"File created and data written successfully.\\n\");\n  /\\* Read from the file \\*/\n  fp = fopen(\"student.txt\", \"r\");\n  printf(\"\\n--- File Content ---\\n\");\n  while (fgets(data, sizeof(data), fp) != NULL)\n  printf(\"%s\", data);\n  fclose(fp);\n  /\\* Append to the file \\*/\n  fp = fopen(\"student.txt\", \"a\");\n  fprintf(fp, \"Marks: 88.5\\n\");\n  fclose(fp);\n  printf(\"\\nData appended successfully.\\n\");\n  /\\* Read final content \\*/\n  fp = fopen(\"student.txt\", \"r\");\n  printf(\"\\n--- Final File Content ---\\n\");\n  while (fgets(data, sizeof(data), fp) != NULL)\n  printf(\"%s\", data);\n  fclose(fp);\n  return 0;\n  }"
      },
      "expectedOutput": "File created and data written successfully.\n--- File Content ---\nRoll No: 101\nName: Arun\nDepartment: IT\nData appended successfully.\n--- Final File Content ---\nRoll No: 101\nName: Arun\nDepartment: IT\nMarks: 88.5",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-14",
    "labId": "c-programming",
    "title": "Exp 14: File-Based Application to Store Employee Details and Evaluate Performance",
    "slug": "c-exp-14-file-based-application-to-store-employee-details-and-evaluate-performance",
    "difficulty": "Advanced",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 202,
    "simulator": "custom",
    "quizId": "quiz-c-14",
    "sections": {
      "introduction": "To develop a file-based application to store employee details and evaluate performance based on predefined criteria.",
      "objective": "To develop a file-based application to store employee details and evaluate performance based on predefined criteria.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: File-Based Application to Store Employee Details and Evaluate Performance",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in File-Based Application to Store Employee Details and Evaluate Performance. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Define a structure Employee with members empId, name, department, and performanceScore.",
        "3. Open a file in write mode and store the details of multiple employees using fwrite() (binary file) or fprintf() (text file).",
        "4. Open the file in read mode and read back the employee records.",
        "5. For each employee, evaluate performance based on predefined criteria: score >= 85 as \"Excellent\", 70-84 as \"Good\", below 70 as \"Needs Improvement\".",
        "6. Display the employee details along with their performance category.",
        "7. Close the file and stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  struct Employee {\n  int empId;\n  char name[50];\n  char department[30];\n  float performanceScore;\n  };\n  char\\* evaluatePerformance(float score) {\n  if (score >= 85)\n  return \"Excellent\";\n  else if (score >= 70)\n  return \"Good\";\n  else\n  return \"Needs Improvement\";\n  }\n  int main() {\n  FILE \\*fp;\n  struct Employee emp;\n  int n, i;\n  fp = fopen(\"employees.dat\", \"wb\");\n  printf(\"Enter number of employees: \");\n  scanf(\"%d\", &n);\n  for (i = 0; i < n; i++) {\n  printf(\"\\nEnter details of employee %d\\n\", i + 1);\n  printf(\"Employee ID: \");\n  scanf(\"%d\", &emp.empId);\n  printf(\"Name: \");\n  scanf(\"%s\", emp.name);\n  printf(\"Department: \");\n  scanf(\"%s\", emp.department);\n  printf(\"Performance Score (0-100): \");\n  scanf(\"%f\", &emp.performanceScore);\n  fwrite(&emp, sizeof(struct Employee), 1, fp);\n  }\n  fclose(fp);\n  /\\* Read back and evaluate performance \\*/\n  fp = fopen(\"employees.dat\", \"rb\");\n  printf(\"\\n%-6s %-12s %-12s %-8s %-18s\\n\",\n  \"ID\", \"Name\", \"Department\", \"Score\", \"Performance\");\n  printf(\"---------------------------------------------------------\\n\");\n  while (fread(&emp, sizeof(struct Employee), 1, fp) == 1) {\n  printf(\"%-6d %-12s %-12s %-8.1f %-18s\\n\",\n  emp.empId, emp.name, emp.department,\n  emp.performanceScore, evaluatePerformance(emp.performanceScore));\n  }\n  fclose(fp);\n  return 0;\n  }"
      },
      "expectedOutput": "Enter number of employees: 2\nEnter details of employee 1\nEmployee ID: 1\nName: Kavin\nDepartment: IT\nPerformance Score (0-100): 90\nEnter details of employee 2\nEmployee ID: 2\nName: Priya\nDepartment: HR\nPerformance Score (0-100): 72\nID Name Department Score Performance\n---------------------------------------------------------\n1 Kavin IT 90.0 Excellent\n2 Priya HR 72.0 Good",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  },
  {
    "id": "c-exp-15",
    "labId": "c-programming",
    "title": "Exp 15: Mini Inventory Management Application using File Handling",
    "slug": "c-exp-15-mini-inventory-management-application-using-file-handling",
    "difficulty": "Advanced",
    "category": "C Programming",
    "estimatedMinutes": 30,
    "rating": 4.9,
    "ratingsCount": 205,
    "simulator": "custom",
    "quizId": "quiz-c-15",
    "sections": {
      "introduction": "To create a mini application using file handling to: (a) add products, (b) update stock, (c) search products, and (d) generate inventory reports.",
      "objective": "To create a mini application using file handling to: (a) add products, (b) update stock, (c) search products, and (d) generate inventory reports.",
      "videoUrl": "https://www.youtube-nocookie.com/embed/KJgsSFOSQv0",
      "videoTitle": "C Programming: Mini Inventory Management Application using File Handling",
      "videoChannel": "NPTEL & VLab Engineering",
      "prerequisites": [
        "Basic Computing Concepts",
        "C Syntax Fundamentals"
      ],
      "theory": {
        "overview": "This experiment develops practical proficiency in Mini Inventory Management Application using File Handling. It demonstrates ANSI C procedural design, memory variables, standard library mathematical/string functions, and runtime execution according to the V.S.B. Engineering College curriculum.",
        "keyConcepts": [
          {
            "title": "Procedural Logic",
            "desc": "Direct algorithmic problem decomposition in C."
          },
          {
            "title": "Variable Allocation",
            "desc": "Stack and heap memory management and type constraints."
          },
          {
            "title": "Compilation Pipeline",
            "desc": "Preprocessing, lexical analysis, code generation, and binary linkage."
          }
        ],
        "complexities": [
          {
            "operation": "Primary Execution",
            "best": "O(1)",
            "avg": "O(n)",
            "worst": "O(n)",
            "space": "O(1)"
          }
        ],
        "realWorldApplications": [
          "Embedded firmware and hardware micro-controller programming",
          "Operating system kernel modules and shell utilities",
          "Numerical computation engines used in AI/ML backend runtimes"
        ]
      },
      "procedure": [
        "1. Start the program.",
        "2. Define a structure Product with members productId, productName, quantity, and price.",
        "3. Display a menu with options: Add Product, Update Stock, Search Product, Generate Report, Exit.",
        "4. For Add Product, append a new product record to the inventory file using fwrite().",
        "5. For Update Stock, read the file, locate the product by ID, update its quantity, and rewrite the record using fseek() and fwrite().",
        "6. For Search Product, read the file sequentially and display the record matching the given product ID.",
        "7. For Generate Report, read all records from the file and display them along with the total inventory value.",
        "8. Repeat the menu until the user chooses Exit, then close the file and stop the program."
      ],
      "sampleCode": {
        "language": "c",
        "code": "#include <stdio.h>\n  \n#include <stdlib.h>\n  struct Product {\n  int productId;\n  char productName[30];\n  int quantity;\n  float price;\n  };\n  void addProduct() {\n  FILE \\*fp = fopen(\"inventory.dat\", \"ab\");\n  struct Product p;\n  printf(\"Enter Product ID: \");\n  scanf(\"%d\", &p.productId);\n  printf(\"Enter Product Name: \");\n  scanf(\"%s\", p.productName);\n  printf(\"Enter Quantity: \");\n  scanf(\"%d\", &p.quantity);\n  printf(\"Enter Price: \");\n  scanf(\"%f\", &p.price);\n  fwrite(&p, sizeof(struct Product), 1, fp);\n  fclose(fp);\n  printf(\"Product added successfully.\\n\");\n  }\n  void updateStock() {\n  FILE \\*fp = fopen(\"inventory.dat\", \"rb+\");\n  struct Product p;\n  int id, newQty, found = 0;\n  if (fp == NULL) { printf(\"No inventory file found.\\n\"); return; }\n  printf(\"Enter Product ID to update: \");\n  scanf(\"%d\", &id);\n  printf(\"Enter new quantity: \");\n  scanf(\"%d\", &newQty);\n  while (fread(&p, sizeof(struct Product), 1, fp) == 1) {\n  if (p.productId == id) {\n  p.quantity = newQty;\n  fseek(fp, -(long)sizeof(struct Product), SEEK\\_CUR);\n  fwrite(&p, sizeof(struct Product), 1, fp);\n  found = 1;\n  break;\n  }\n  }\n  fclose(fp);\n  printf(found ? \"Stock updated successfully.\\n\" : \"Product not found.\\n\");\n  }\n  void searchProduct() {\n  FILE \\*fp = fopen(\"inventory.dat\", \"rb\");\n  struct Product p;\n  int id, found = 0;\n  if (fp == NULL) { printf(\"No inventory file found.\\n\"); return; }\n  printf(\"Enter Product ID to search: \");\n  scanf(\"%d\", &id);\n  while (fread(&p, sizeof(struct Product), 1, fp) == 1) {\n  if (p.productId == id) {\n  printf(\"Found: ID=%d, Name=%s, Qty=%d, Price=%.2f\\n\",\n  p.productId, p.productName, p.quantity, p.price);\n  found = 1;\n  break;\n  }\n  }\n  if (!found) printf(\"Product not found.\\n\");\n  fclose(fp);\n  }\n  void generateReport() {\n  FILE \\*fp = fopen(\"inventory.dat\", \"rb\");\n  struct Product p;\n  float totalValue = 0;\n  if (fp == NULL) { printf(\"No inventory file found.\\n\"); return; }\n  printf(\"\\n%-6s %-15s %-10s %-8s\\n\", \"ID\", \"Name\", \"Quantity\", \"Price\");\n  printf(\"-----------------------------------------\\n\");\n  while (fread(&p, sizeof(struct Product), 1, fp) == 1) {\n  printf(\"%-6d %-15s %-10d %-8.2f\\n\",\n  p.productId, p.productName, p.quantity, p.price);\n  totalValue += p.quantity \\* p.price;\n  }\n  printf(\"-----------------------------------------\\n\");\n  printf(\"Total Inventory Value = %.2f\\n\", totalValue);\n  fclose(fp);\n  }\n  int main() {\n  int choice;\n  do {\n  printf(\"\\n----- Inventory Management Menu -----\\n\");\n  printf(\"1. Add Product\\n\");\n  printf(\"2. Update Stock\\n\");\n  printf(\"3. Search Product\\n\");\n  printf(\"4. Generate Report\\n\");\n  printf(\"5. Exit\\n\");\n  printf(\"Enter your choice: \");\n  scanf(\"%d\", &choice);\n  switch (choice) {\n  case 1: addProduct(); break;\n  case 2: updateStock(); break;\n  case 3: searchProduct(); break;\n  case 4: generateReport(); break;\n  case 5: printf(\"Exiting program.\\n\"); break;\n  default: printf(\"Invalid choice.\\n\");\n  }\n  } while (choice != 5);\n  return 0;\n  }"
      },
      "expectedOutput": "----- Inventory Management Menu -----\n1. Add Product\n2. Update Stock\n3. Search Product\n4. Generate Report\n5. Exit\nEnter your choice: 1\nEnter Product ID: 1\nEnter Product Name: Keyboard\nEnter Quantity: 50\nEnter Price: 450\nProduct added successfully.\n----- Inventory Management Menu -----\nEnter your choice: 4\nID Name Quantity Price\n-----------------------------------------\n1 Keyboard 50 450.00\n-----------------------------------------\nTotal Inventory Value = 22500.00\n----- Inventory Management Menu -----\nEnter your choice: 5\nExiting program.",
      "leetcodeProblems": [],
      "targetAudience": {
        "ug": [
          "B.E. CSE",
          "B.Tech AI&DS",
          "B.Tech IT - 1st Year"
        ],
        "pg": [
          "M.E. Computer Science"
        ]
      }
    }
  }
];
