**LABORATORY MANUAL**

**C Programming Laboratory**

Department of Information Technology

*List of Experiments 1 – 15*

**LIST OF EXPERIMENTS**

| **S.No** | **Title of the Experiment**                                                       |
| -------------- | --------------------------------------------------------------------------------------- |
| 1              | Distance Between Two Points                                                             |
| 2              | Temperature Conversion (Fahrenheit to Celsius and Vice Versa)                           |
| 3              | Count Zeros and Ones in a Binary Number                                                 |
| 4              | Armstrong Number Check                                                                  |
| 5              | Swapping of Two Numbers using Call by Value and Call by Reference                       |
| 6              | Recursive Programs: Fibonacci Series and GCD of Two Numbers                             |
| 7              | Matrix Addition, Multiplication, and Transpose using 2D Arrays                          |
| 8              | Largest, Smallest, Interchange, and Duplicate Count in an Array                         |
| 9              | String Operations: Palindrome Checking, Reverse a String, Extract Last N Characters     |
| 10             | Dynamic Array Creation and Manipulation using malloc(), calloc(), realloc(), and free() |
| 11             | Structures to Store and Display Student Information                                     |
| 12             | Compute a Person's Age using Structures and User-Defined Functions                      |
| 13             | File Handling: Create, Write, Read, and Append Data to a File                           |
| 14             | File-Based Application to Store Employee Details and Evaluate Performance               |
| 15             | Mini Inventory Management Application using File Handling                               |

|                                                     |
| --------------------------------------------------- |
| **Experiment 1: Distance Between Two Points** |

**Aim**

To develop a C program to calculate the distance between two points using the distance formula.

**Procedure / Algorithm**

1. Start the program.
2. Declare variables x1, y1, x2, y2 to store coordinates and dist to store the result.
3. Read the coordinates of the two points from the user.
4. Compute the distance using the formula: dist = sqrt((x2-x1)^2 + (y2-y1)^2).
5. Display the computed distance.
6. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>  #include <math.h>    int main() {  float x1, y1, x2, y2, dist;    printf("Enter coordinates of first point (x1 y1): ");  scanf("%f %f", &x1, &y1);    printf("Enter coordinates of second point (x2 y2): ");  scanf("%f %f", &x2, &y2);    dist = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));    printf("Distance between the two points = %.2f\n", dist);    return 0;  } |

**Output**

|                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------- |
| Enter coordinates of first point (x1 y1): 0 0  Enter coordinates of second point (x2 y2): 3 4  Distance between the two points = 5.00 |

**Result**

|                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------- |
| *The C program to calculate the distance between two points using the distance formula was developed, executed, and verified successfully.* |

|                                                                                       |
| ------------------------------------------------------------------------------------- |
| **Experiment 2: Temperature Conversion (Fahrenheit to Celsius and Vice Versa)** |

**Aim**

To write a C program to convert temperature from Fahrenheit to Celsius and vice versa.

**Procedure / Algorithm**

1. Start the program.
2. Display a menu to choose the type of conversion.
3. Read the choice and the temperature value from the user.
4. If choice is Fahrenheit to Celsius, apply C = (F - 32) \* 5/9.
5. If choice is Celsius to Fahrenheit, apply F = (C \* 9/5) + 32.
6. Display the converted temperature.
7. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>    int main() {  int choice;  float temp, result;    printf("1. Fahrenheit to Celsius\n");  printf("2. Celsius to Fahrenheit\n");  printf("Enter your choice: ");  scanf("%d", &choice);    if (choice == 1) {  printf("Enter temperature in Fahrenheit: ");  scanf("%f", &temp);  result = (temp - 32) \* 5.0 / 9.0;  printf("Temperature in Celsius = %.2f\n", result);  }  else if (choice == 2) {  printf("Enter temperature in Celsius: ");  scanf("%f", &temp);  result = (temp \* 9.0 / 5.0) + 32;  printf("Temperature in Fahrenheit = %.2f\n", result);  }  else {  printf("Invalid choice\n");  }    return 0;  } |

**Output**

|                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Fahrenheit to Celsius  2. Celsius to Fahrenheit  Enter your choice: 1  Enter temperature in Fahrenheit: 98.6  Temperature in Celsius = 37.00 |

**Result**

|                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------- |
| *The C program to convert temperature from Fahrenheit to Celsius and vice versa was developed, executed, and verified successfully.* |

|                                                                 |
| --------------------------------------------------------------- |
| **Experiment 3: Count Zeros and Ones in a Binary Number** |

**Aim**

To develop a C program to count the number of zeros and ones in a given binary number.

**Procedure / Algorithm**

1. Start the program.
2. Read a binary number as an integer (containing only digits 0 and 1).
3. Initialize counters countZero and countOne to zero.
4. Repeatedly extract the last digit of the number using the modulus operator.
5. If the digit is 0, increment countZero; if it is 1, increment countOne.
6. Remove the last digit by dividing the number by 10 and repeat until the number becomes 0.
7. Display the count of zeros and ones.
8. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #include <stdio.h>    int main() {  long int binNum;  int digit, countZero = 0, countOne = 0;    printf("Enter a binary number: ");  scanf("%ld", &binNum);    while (binNum != 0) {  digit = binNum % 10;  if (digit == 0)  countZero++;  else if (digit == 1)  countOne++;  binNum = binNum / 10;  }    printf("Number of zeros = %d\n", countZero);  printf("Number of ones = %d\n", countOne);    return 0;  } |

**Output**

|                                                                           |
| ------------------------------------------------------------------------- |
| Enter a binary number: 110100101  Number of zeros = 4  Number of ones = 5 |

**Result**

|                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------ |
| *The C program to count the number of zeros and ones in a given binary number was developed, executed, and verified successfully.* |

|                                                |
| ---------------------------------------------- |
| **Experiment 4: Armstrong Number Check** |

**Aim**

To write a C program to check whether a given number is an Armstrong number.

**Procedure / Algorithm**

1. Start the program.
2. Read an integer number from the user.
3. Store the original number in a temporary variable.
4. Find the number of digits n in the number.
5. For every digit, compute digit raised to the power n and add it to a sum variable.
6. Compare the sum with the original number.
7. If they are equal, display that it is an Armstrong number; otherwise display that it is not.
8. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>  #include <math.h>    int main() {  int num, original, digit, n = 0, sum = 0;    printf("Enter a number: ");  scanf("%d", &num);    original = num;    /\* Count number of digits \*/  int temp = num;  while (temp != 0) {  temp = temp / 10;  n++;  }    temp = num;  while (temp != 0) {  digit = temp % 10;  sum = sum + (int)pow(digit, n);  temp = temp / 10;  }    if (sum == original)  printf("%d is an Armstrong number\n", original);  else  printf("%d is NOT an Armstrong number\n", original);    return 0;  } |

**Output**

|                                                 |
| ----------------------------------------------- |
| Enter a number: 153  153 is an Armstrong number |

**Result**

|                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------- |
| *The C program to check whether a given number is an Armstrong number was developed, executed, and verified successfully.* |

|                                                                                           |
| ----------------------------------------------------------------------------------------- |
| **Experiment 5: Swapping of Two Numbers using Call by Value and Call by Reference** |

**Aim**

To implement swapping of two numbers using: (a) Call by Value, and (b) Call by Reference.

**Procedure / Algorithm**

1. Start the program.
2. Read two numbers a and b from the user.
3. Call the function swapByValue(a, b) which swaps the copies of the variables; observe that the original values remain unchanged after the call.
4. Call the function swapByReference(&a, &b), passing the addresses of a and b, which swaps the actual values using pointers.
5. Display the values before and after each function call.
6. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>    /\* Call by Value \*/  void swapByValue(int x, int y) {  int temp = x;  x = y;  y = temp;  printf("Inside swapByValue: x = %d, y = %d\n", x, y);  }    /\* Call by Reference \*/  void swapByReference(int \*x, int \*y) {  int temp = \*x;  \*x = \*y;  \*y = temp;  }    int main() {  int a, b;    printf("Enter two numbers a and b: ");  scanf("%d %d", &a, &b);    printf("\n--- Call by Value ---\n");  printf("Before call: a = %d, b = %d\n", a, b);  swapByValue(a, b);  printf("After call: a = %d, b = %d (unchanged)\n", a, b);    printf("\n--- Call by Reference ---\n");  printf("Before call: a = %d, b = %d\n", a, b);  swapByReference(&a, &b);  printf("After call: a = %d, b = %d (swapped)\n", a, b);    return 0;  } |

**Output**

|                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Enter two numbers a and b: 10 20    --- Call by Value ---  Before call: a = 10, b = 20  Inside swapByValue: x = 20, y = 10  After call: a = 10, b = 20 (unchanged)    --- Call by Reference ---  Before call: a = 10, b = 20  After call: a = 20, b = 10 (swapped) |

**Result**

|                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| *The C program to implement swapping of two numbers using Call by Value and Call by Reference was developed, executed, and verified successfully.* |

|                                                                                     |
| ----------------------------------------------------------------------------------- |
| **Experiment 6: Recursive Programs: Fibonacci Series and GCD of Two Numbers** |

**Aim**

To develop recursive programs to: (a) generate the Fibonacci series, and (b) find the GCD of two numbers.

**Procedure / Algorithm**

1. Start the program.
2. Define a recursive function fibonacci(n) that returns the nth Fibonacci number using the base cases n=0 and n=1.
3. Read the number of terms and print the Fibonacci series by calling fibonacci() repeatedly.
4. Define a recursive function gcd(a, b) that returns b if a % b == 0, otherwise returns gcd(b, a % b).
5. Read two numbers and display their GCD using the recursive function.
6. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>    /\* Recursive function for Fibonacci series \*/  int fibonacci(int n) {  if (n == 0)  return 0;  else if (n == 1)  return 1;  else  return fibonacci(n - 1) + fibonacci(n - 2);  }    /\* Recursive function for GCD \*/  int gcd(int a, int b) {  if (b == 0)  return a;  else  return gcd(b, a % b);  }    int main() {  int n, num1, num2, i;    printf("Enter number of terms for Fibonacci series: ");  scanf("%d", &n);    printf("Fibonacci Series: ");  for (i = 0; i < n; i++)  printf("%d ", fibonacci(i));  printf("\n");    printf("\nEnter two numbers to find GCD: ");  scanf("%d %d", &num1, &num2);    printf("GCD of %d and %d = %d\n", num1, num2, gcd(num1, num2));    return 0;  } |

**Output**

|                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Enter number of terms for Fibonacci series: 8  Fibonacci Series: 0 1 1 2 3 5 8 13    Enter two numbers to find GCD: 36 60  GCD of 36 and 60 = 12 |

**Result**

|                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| *The recursive C programs to generate the Fibonacci series and to find the GCD of two numbers were developed, executed, and verified successfully.* |

|                                                                                        |
| -------------------------------------------------------------------------------------- |
| **Experiment 7: Matrix Addition, Multiplication, and Transpose using 2D Arrays** |

**Aim**

To implement matrix addition, matrix multiplication, and transpose of a matrix using 2D arrays.

**Procedure / Algorithm**

1. Start the program.
2. Read the order (rows and columns) and elements of the matrices from the user.
3. For addition, read two matrices of the same order and add corresponding elements.
4. For multiplication, read two matrices where the columns of the first equal the rows of the second, and compute the product using nested loops.
5. For transpose, interchange the rows and columns of a matrix.
6. Display the resultant matrices.
7. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>    int main() {  int a[10][10], b[10][10], sum[10][10], mul[10][10], trans[10][10];  int r1, c1, r2, c2, i, j, k;    /\* Matrix Addition \*/  printf("--- Matrix Addition ---\n");  printf("Enter rows and columns of matrix A (same order for B): ");  scanf("%d %d", &r1, &c1);    printf("Enter elements of matrix A:\n");  for (i = 0; i < r1; i++)  for (j = 0; j < c1; j++)  scanf("%d", &a[i][j]);    printf("Enter elements of matrix B:\n");  for (i = 0; i < r1; i++)  for (j = 0; j < c1; j++)  scanf("%d", &b[i][j]);    for (i = 0; i < r1; i++)  for (j = 0; j < c1; j++)  sum[i][j] = a[i][j] + b[i][j];    printf("Sum of matrices:\n");  for (i = 0; i < r1; i++) {  for (j = 0; j < c1; j++)  printf("%d ", sum[i][j]);  printf("\n");  }    /\* Matrix Multiplication \*/  printf("\n--- Matrix Multiplication ---\n");  printf("Enter rows and columns of matrix A: ");  scanf("%d %d", &r1, &c1);  printf("Enter rows and columns of matrix B (rows = %d): ", c1);  scanf("%d %d", &r2, &c2);    printf("Enter elements of matrix A:\n");  for (i = 0; i < r1; i++)  for (j = 0; j < c1; j++)  scanf("%d", &a[i][j]);    printf("Enter elements of matrix B:\n");  for (i = 0; i < r2; i++)  for (j = 0; j < c2; j++)  scanf("%d", &b[i][j]);    for (i = 0; i < r1; i++) {  for (j = 0; j < c2; j++) {  mul[i][j] = 0;  for (k = 0; k < c1; k++)  mul[i][j] += a[i][k] \* b[k][j];  }  }    printf("Product of matrices:\n");  for (i = 0; i < r1; i++) {  for (j = 0; j < c2; j++)  printf("%d ", mul[i][j]);  printf("\n");  }    /\* Matrix Transpose \*/  printf("\n--- Matrix Transpose ---\n");  for (i = 0; i < r1; i++)  for (j = 0; j < c1; j++)  trans[j][i] = a[i][j];    printf("Transpose of matrix A:\n");  for (i = 0; i < c1; i++) {  for (j = 0; j < r1; j++)  printf("%d ", trans[i][j]);  printf("\n");  }    return 0;  } |

**Output**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --- Matrix Addition ---  Enter rows and columns of matrix A (same order for B): 2 2  Enter elements of matrix A:  1 2 3 4  Enter elements of matrix B:  5 6 7 8  Sum of matrices:  6 8  10 12    --- Matrix Multiplication ---  Enter rows and columns of matrix A: 2 2  Enter rows and columns of matrix B (rows = 2): 2 2  Enter elements of matrix A:  1 2 3 4  Enter elements of matrix B:  5 6 7 8  Product of matrices:  19 22  43 50    --- Matrix Transpose ---  Transpose of matrix A:  1 3  2 4 |

**Result**

|                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| *The C program to perform matrix addition, matrix multiplication, and transpose using 2D arrays was developed, executed, and verified successfully.* |

|                                                                                         |
| --------------------------------------------------------------------------------------- |
| **Experiment 8: Largest, Smallest, Interchange, and Duplicate Count in an Array** |

**Aim**

To write a program to: (a) find the largest and smallest elements, (b) interchange the largest and smallest elements, and (c) count duplicate elements in an array.

**Procedure / Algorithm**

1. Start the program.
2. Read the size and elements of the array from the user.
3. Traverse the array to find the index of the largest element and the index of the smallest element.
4. Display the largest and smallest elements.
5. Interchange the elements at the largest and smallest indices and display the updated array.
6. Use nested loops to compare each element with every other element and count duplicate occurrences.
7. Display the duplicate count.
8. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>    int main() {  int arr[50], n, i, j;  int maxIdx = 0, minIdx = 0, duplicates = 0;    printf("Enter number of elements: ");  scanf("%d", &n);    printf("Enter %d elements: ", n);  for (i = 0; i < n; i++)  scanf("%d", &arr[i]);    /\* Find largest and smallest \*/  for (i = 1; i < n; i++) {  if (arr[i] > arr[maxIdx])  maxIdx = i;  if (arr[i] < arr[minIdx])  minIdx = i;  }    printf("\nLargest element = %d\n", arr[maxIdx]);  printf("Smallest element = %d\n", arr[minIdx]);    /\* Interchange largest and smallest \*/  int temp = arr[maxIdx];  arr[maxIdx] = arr[minIdx];  arr[minIdx] = temp;    printf("\nArray after interchanging largest and smallest:\n");  for (i = 0; i < n; i++)  printf("%d ", arr[i]);  printf("\n");    /\* Count duplicate elements \*/  int visited[50] = {0};  for (i = 0; i < n; i++) {  if (visited[i] == 1)  continue;  int count = 1;  for (j = i + 1; j < n; j++) {  if (arr[i] == arr[j]) {  visited[j] = 1;  count++;  }  }  if (count > 1)  duplicates++;  }    printf("\nNumber of duplicate elements (distinct values repeated) = %d\n", duplicates);    return 0;  } |

**Output**

|                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enter number of elements: 6  Enter 6 elements: 4 8 2 8 4 9    Largest element = 9  Smallest element = 2    Array after interchanging largest and smallest:  4 8 9 8 4 2    Number of duplicate elements (distinct values repeated) = 2 |

**Result**

|                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *The program to find the largest and smallest elements, interchange them, and count duplicate elements in an array was developed, executed, and verified successfully.* |

|                                                                                                             |
| ----------------------------------------------------------------------------------------------------------- |
| **Experiment 9: String Operations: Palindrome Checking, Reverse a String, Extract Last N Characters** |

**Aim**

To implement string operations: (a) palindrome checking, (b) reverse a string, and (c) extract the last N characters from a string.

**Procedure / Algorithm**

1. Start the program.
2. Read a string from the user using gets()/fgets() or scanf with %s.
3. To check palindrome, compare the string with its reverse; if equal, it is a palindrome.
4. To reverse a string, swap characters from both ends moving towards the centre, or copy characters from the end into a new string.
5. To extract the last N characters, find the length of the string and copy characters from position (length - N) to the end.
6. Display the results of all three operations.
7. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>  #include <string.h>    int main() {  char str[100], rev[100], lastN[100];  int n, len, i, isPalindrome = 1;    printf("Enter a string: ");  scanf("%s", str);    len = strlen(str);    /\* Reverse the string \*/  for (i = 0; i < len; i++)  rev[i] = str[len - 1 - i];  rev[len] = '\0';    /\* Palindrome check \*/  for (i = 0; i < len; i++) {  if (str[i] != rev[i]) {  isPalindrome = 0;  break;  }  }    printf("\nOriginal string : %s\n", str);  printf("Reversed string : %s\n", rev);    if (isPalindrome)  printf("The string is a palindrome\n");  else  printf("The string is NOT a palindrome\n");    /\* Extract last N characters \*/  printf("\nEnter value of N to extract last N characters: ");  scanf("%d", &n);    if (n > len) {  printf("N is greater than string length\n");  } else {  strcpy(lastN, str + (len - n));  printf("Last %d characters: %s\n", n, lastN);  }    return 0;  } |

**Output**

|                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enter a string: malayalam    Original string : malayalam  Reversed string : malayalam  The string is a palindrome    Enter value of N to extract last N characters: 4  Last 4 characters: alam |

**Result**

|                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *The C program to perform palindrome checking, string reversal, and extraction of the last N characters from a string was developed, executed, and verified successfully.* |

|                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------- |
| **Experiment 10: Dynamic Array Creation and Manipulation using malloc(), calloc(), realloc(), and free()** |

**Aim**

To develop a program using malloc(), calloc(), realloc(), and free() for dynamic array creation and manipulation.

**Procedure / Algorithm**

1. Start the program.
2. Read the number of elements n from the user.
3. Allocate memory for n integers using malloc() and read/display the elements.
4. Free the memory and allocate memory again using calloc(), which also initializes all elements to zero, then read/display the elements.
5. Use realloc() to resize the previously allocated memory block to a new size and display the resized array.
6. Free all dynamically allocated memory using free() before the program ends.
7. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>  #include <stdlib.h>    int main() {  int \*arr, n, i, newSize;    printf("Enter number of elements: ");  scanf("%d", &n);    /\* malloc() \*/  arr = (int \*)malloc(n \* sizeof(int));  if (arr == NULL) {  printf("Memory allocation failed\n");  return 1;  }    printf("Enter %d elements (using malloc): ", n);  for (i = 0; i < n; i++)  scanf("%d", &arr[i]);    printf("Elements using malloc: ");  for (i = 0; i < n; i++)  printf("%d ", arr[i]);  printf("\n");    free(arr);    /\* calloc() \*/  arr = (int \*)calloc(n, sizeof(int));  printf("\nElements using calloc (auto-initialized to 0): ");  for (i = 0; i < n; i++)  printf("%d ", arr[i]);  printf("\n");    for (i = 0; i < n; i++)  arr[i] = (i + 1) \* 10;    printf("After assigning values: ");  for (i = 0; i < n; i++)  printf("%d ", arr[i]);  printf("\n");    /\* realloc() \*/  printf("\nEnter new size to resize the array: ");  scanf("%d", &newSize);    arr = (int \*)realloc(arr, newSize \* sizeof(int));    printf("Enter values for additional elements: ");  for (i = n; i < newSize; i++)  scanf("%d", &arr[i]);    printf("Array after realloc: ");  for (i = 0; i < newSize; i++)  printf("%d ", arr[i]);  printf("\n");    /\* free() \*/  free(arr);  printf("\nMemory freed successfully\n");    return 0;  } |

**Output**

|                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enter number of elements: 3  Enter 3 elements (using malloc): 10 20 30  Elements using malloc: 10 20 30    Elements using calloc (auto-initialized to 0): 0 0 0  After assigning values: 10 20 30    Enter new size to resize the array: 5  Enter values for additional elements: 40 50  Array after realloc: 10 20 30 40 50    Memory freed successfully |

**Result**

|                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *The C program demonstrating dynamic array creation and manipulation using malloc(), calloc(), realloc(), and free() was developed, executed, and verified successfully.* |

|                                                                              |
| ---------------------------------------------------------------------------- |
| **Experiment 11: Structures to Store and Display Student Information** |

**Aim**

To use structures to store and display student information such as Roll Number, Name, Department, and Marks.

**Procedure / Algorithm**

1. Start the program.
2. Define a structure Student with members rollNo, name, department, and marks.
3. Declare an array of structures to store details of multiple students.
4. Read the details of each student using dot operator through a loop.
5. Display the details of all students in a tabular format.
6. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>    struct Student {  int rollNo;  char name[50];  char department[30];  float marks;  };    int main() {  int n, i;    printf("Enter number of students: ");  scanf("%d", &n);    struct Student s[n];    for (i = 0; i < n; i++) {  printf("\nEnter details of student %d\n", i + 1);  printf("Roll Number: ");  scanf("%d", &s[i].rollNo);  printf("Name: ");  scanf("%s", s[i].name);  printf("Department: ");  scanf("%s", s[i].department);  printf("Marks: ");  scanf("%f", &s[i].marks);  }    printf("\n%-10s %-15s %-15s %-8s\n", "Roll No", "Name", "Department", "Marks");  printf("---------------------------------------------------\n");  for (i = 0; i < n; i++) {  printf("%-10d %-15s %-15s %-8.2f\n",  s[i].rollNo, s[i].name, s[i].department, s[i].marks);  }    return 0;  } |

**Output**

|                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Enter number of students: 2    Enter details of student 1  Roll Number: 101  Name: Arun  Department: IT  Marks: 88.5    Enter details of student 2  Roll Number: 102  Name: Divya  Department: IT  Marks: 92.0    Roll No Name Department Marks  ---------------------------------------------------  101 Arun IT 88.50  102 Divya IT 92.00 |

**Result**

|                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- |
| *The C program to store and display student information using structures was developed, executed, and verified successfully.* |

|                                                                                             |
| ------------------------------------------------------------------------------------------- |
| **Experiment 12: Compute a Person's Age using Structures and User-Defined Functions** |

**Aim**

To develop a program to compute a person's age using structures and user-defined functions.

**Procedure / Algorithm**

1. Start the program.
2. Define a structure Date with members day, month, and year.
3. Read the birth date and the current date from the user into two structure variables.
4. Pass both structure variables to a user-defined function calculateAge() by value.
5. Inside the function, compute the age in years, months, and days by subtracting the birth date from the current date, borrowing from the previous month/year when required.
6. Return/display the computed age.
7. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>    struct Date {  int day;  int month;  int year;  };    void calculateAge(struct Date birth, struct Date current) {  int days, months, years;    days = current.day - birth.day;  months = current.month - birth.month;  years = current.year - birth.year;    if (days < 0) {  months--;  int prevMonth = (current.month == 1) ? 12 : current.month - 1;  int daysInMonth[] = {31,28,31,30,31,30,31,31,30,31,30,31};  days += daysInMonth[prevMonth - 1];  }    if (months < 0) {  years--;  months += 12;  }    printf("\nAge = %d years, %d months, %d days\n", years, months, days);  }    int main() {  struct Date birth, current;    printf("Enter birth date (dd mm yyyy): ");  scanf("%d %d %d", &birth.day, &birth.month, &birth.year);    printf("Enter current date (dd mm yyyy): ");  scanf("%d %d %d", &current.day, &current.month, &current.year);    calculateAge(birth, current);    return 0;  } |

**Output**

|                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------ |
| Enter birth date (dd mm yyyy): 15 6 2003  Enter current date (dd mm yyyy): 2 9 2026    Age = 23 years, 2 months, 18 days |

**Result**

|                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------- |
| *The C program to compute a person's age using structures and user-defined functions was developed, executed, and verified successfully.* |

|                                                                                        |
| -------------------------------------------------------------------------------------- |
| **Experiment 13: File Handling: Create, Write, Read, and Append Data to a File** |

**Aim**

To write a C program to: (a) create a file, (b) write data to the file, (c) read data from the file, and (d) append data to the file.

**Procedure / Algorithm**

1. Start the program.
2. Open a file in write mode ("w") using fopen(); this creates the file if it does not exist.
3. Write data into the file using fprintf() and close the file using fclose().
4. Open the same file in read mode ("r") and read its contents using fscanf()/fgets(), displaying them on the screen.
5. Open the file again in append mode ("a") and add new data to the end of the existing content without deleting it.
6. Read the file once more to display the final content, confirming the appended data.
7. Stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #include <stdio.h>  #include <stdlib.h>    int main() {  FILE \*fp;  char data[100];    /\* Create and write to the file \*/  fp = fopen("student.txt", "w");  if (fp == NULL) {  printf("Error creating file\n");  exit(1);  }  fprintf(fp, "Roll No: 101\n");  fprintf(fp, "Name: Arun\n");  fprintf(fp, "Department: IT\n");  fclose(fp);  printf("File created and data written successfully.\n");    /\* Read from the file \*/  fp = fopen("student.txt", "r");  printf("\n--- File Content ---\n");  while (fgets(data, sizeof(data), fp) != NULL)  printf("%s", data);  fclose(fp);    /\* Append to the file \*/  fp = fopen("student.txt", "a");  fprintf(fp, "Marks: 88.5\n");  fclose(fp);  printf("\nData appended successfully.\n");    /\* Read final content \*/  fp = fopen("student.txt", "r");  printf("\n--- Final File Content ---\n");  while (fgets(data, sizeof(data), fp) != NULL)  printf("%s", data);  fclose(fp);    return 0;  } |

**Output**

|                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| File created and data written successfully.    --- File Content ---  Roll No: 101  Name: Arun  Department: IT    Data appended successfully.    --- Final File Content ---  Roll No: 101  Name: Arun  Department: IT  Marks: 88.5 |

**Result**

|                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------- |
| *The C program to create, write, read, and append data to a file was developed, executed, and verified successfully.* |

|                                                                                                    |
| -------------------------------------------------------------------------------------------------- |
| **Experiment 14: File-Based Application to Store Employee Details and Evaluate Performance** |

**Aim**

To develop a file-based application to store employee details and evaluate performance based on predefined criteria.

**Procedure / Algorithm**

1. Start the program.
2. Define a structure Employee with members empId, name, department, and performanceScore.
3. Open a file in write mode and store the details of multiple employees using fwrite() (binary file) or fprintf() (text file).
4. Open the file in read mode and read back the employee records.
5. For each employee, evaluate performance based on predefined criteria: score >= 85 as "Excellent", 70-84 as "Good", below 70 as "Needs Improvement".
6. Display the employee details along with their performance category.
7. Close the file and stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #include <stdio.h>    struct Employee {  int empId;  char name[50];  char department[30];  float performanceScore;  };    char\* evaluatePerformance(float score) {  if (score >= 85)  return "Excellent";  else if (score >= 70)  return "Good";  else  return "Needs Improvement";  }    int main() {  FILE \*fp;  struct Employee emp;  int n, i;    fp = fopen("employees.dat", "wb");  printf("Enter number of employees: ");  scanf("%d", &n);    for (i = 0; i < n; i++) {  printf("\nEnter details of employee %d\n", i + 1);  printf("Employee ID: ");  scanf("%d", &emp.empId);  printf("Name: ");  scanf("%s", emp.name);  printf("Department: ");  scanf("%s", emp.department);  printf("Performance Score (0-100): ");  scanf("%f", &emp.performanceScore);    fwrite(&emp, sizeof(struct Employee), 1, fp);  }  fclose(fp);    /\* Read back and evaluate performance \*/  fp = fopen("employees.dat", "rb");  printf("\n%-6s %-12s %-12s %-8s %-18s\n",  "ID", "Name", "Department", "Score", "Performance");  printf("---------------------------------------------------------\n");    while (fread(&emp, sizeof(struct Employee), 1, fp) == 1) {  printf("%-6d %-12s %-12s %-8.1f %-18s\n",  emp.empId, emp.name, emp.department,  emp.performanceScore, evaluatePerformance(emp.performanceScore));  }  fclose(fp);    return 0;  } |

**Output**

|                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Enter number of employees: 2    Enter details of employee 1  Employee ID: 1  Name: Kavin  Department: IT  Performance Score (0-100): 90    Enter details of employee 2  Employee ID: 2  Name: Priya  Department: HR  Performance Score (0-100): 72    ID Name Department Score Performance  ---------------------------------------------------------  1 Kavin IT 90.0 Excellent  2 Priya HR 72.0 Good |

**Result**

|                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *The file-based C application to store employee details and evaluate performance based on predefined criteria was developed, executed, and verified successfully.* |

|                                                                                    |
| ---------------------------------------------------------------------------------- |
| **Experiment 15: Mini Inventory Management Application using File Handling** |

**Aim**

To create a mini application using file handling to: (a) add products, (b) update stock, (c) search products, and (d) generate inventory reports.

**Procedure / Algorithm**

1. Start the program.
2. Define a structure Product with members productId, productName, quantity, and price.
3. Display a menu with options: Add Product, Update Stock, Search Product, Generate Report, Exit.
4. For Add Product, append a new product record to the inventory file using fwrite().
5. For Update Stock, read the file, locate the product by ID, update its quantity, and rewrite the record using fseek() and fwrite().
6. For Search Product, read the file sequentially and display the record matching the given product ID.
7. For Generate Report, read all records from the file and display them along with the total inventory value.
8. Repeat the menu until the user chooses Exit, then close the file and stop the program.

**Program**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #include <stdio.h>  #include <stdlib.h>    struct Product {  int productId;  char productName[30];  int quantity;  float price;  };    void addProduct() {  FILE \*fp = fopen("inventory.dat", "ab");  struct Product p;    printf("Enter Product ID: ");  scanf("%d", &p.productId);  printf("Enter Product Name: ");  scanf("%s", p.productName);  printf("Enter Quantity: ");  scanf("%d", &p.quantity);  printf("Enter Price: ");  scanf("%f", &p.price);    fwrite(&p, sizeof(struct Product), 1, fp);  fclose(fp);  printf("Product added successfully.\n");  }    void updateStock() {  FILE \*fp = fopen("inventory.dat", "rb+");  struct Product p;  int id, newQty, found = 0;    if (fp == NULL) { printf("No inventory file found.\n"); return; }    printf("Enter Product ID to update: ");  scanf("%d", &id);  printf("Enter new quantity: ");  scanf("%d", &newQty);    while (fread(&p, sizeof(struct Product), 1, fp) == 1) {  if (p.productId == id) {  p.quantity = newQty;  fseek(fp, -(long)sizeof(struct Product), SEEK\_CUR);  fwrite(&p, sizeof(struct Product), 1, fp);  found = 1;  break;  }  }  fclose(fp);  printf(found ? "Stock updated successfully.\n" : "Product not found.\n");  }    void searchProduct() {  FILE \*fp = fopen("inventory.dat", "rb");  struct Product p;  int id, found = 0;    if (fp == NULL) { printf("No inventory file found.\n"); return; }    printf("Enter Product ID to search: ");  scanf("%d", &id);    while (fread(&p, sizeof(struct Product), 1, fp) == 1) {  if (p.productId == id) {  printf("Found: ID=%d, Name=%s, Qty=%d, Price=%.2f\n",  p.productId, p.productName, p.quantity, p.price);  found = 1;  break;  }  }  if (!found) printf("Product not found.\n");  fclose(fp);  }    void generateReport() {  FILE \*fp = fopen("inventory.dat", "rb");  struct Product p;  float totalValue = 0;    if (fp == NULL) { printf("No inventory file found.\n"); return; }    printf("\n%-6s %-15s %-10s %-8s\n", "ID", "Name", "Quantity", "Price");  printf("-----------------------------------------\n");    while (fread(&p, sizeof(struct Product), 1, fp) == 1) {  printf("%-6d %-15s %-10d %-8.2f\n",  p.productId, p.productName, p.quantity, p.price);  totalValue += p.quantity \* p.price;  }  printf("-----------------------------------------\n");  printf("Total Inventory Value = %.2f\n", totalValue);  fclose(fp);  }    int main() {  int choice;    do {  printf("\n----- Inventory Management Menu -----\n");  printf("1. Add Product\n");  printf("2. Update Stock\n");  printf("3. Search Product\n");  printf("4. Generate Report\n");  printf("5. Exit\n");  printf("Enter your choice: ");  scanf("%d", &choice);    switch (choice) {  case 1: addProduct(); break;  case 2: updateStock(); break;  case 3: searchProduct(); break;  case 4: generateReport(); break;  case 5: printf("Exiting program.\n"); break;  default: printf("Invalid choice.\n");  }  } while (choice != 5);    return 0;  } |

**Output**

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ----- Inventory Management Menu -----  1. Add Product  2. Update Stock  3. Search Product  4. Generate Report  5. Exit  Enter your choice: 1  Enter Product ID: 1  Enter Product Name: Keyboard  Enter Quantity: 50  Enter Price: 450  Product added successfully.    ----- Inventory Management Menu -----  Enter your choice: 4    ID Name Quantity Price  -----------------------------------------  1 Keyboard 50 450.00  -----------------------------------------  Total Inventory Value = 22500.00    ----- Inventory Management Menu -----  Enter your choice: 5  Exiting program. |

**Result**

|                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *The mini inventory management application using file handling (add, update, search, and generate reports) was developed, executed, and verified successfully.* |
