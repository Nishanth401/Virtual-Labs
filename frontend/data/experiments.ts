export interface ComplexityEntry {
  operation: string;
  best: string;
  avg: string;
  worst: string;
  space: string;
}

export interface LeetCodeProblem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
  description: string;
  approach: string;
  javaSnippet: string;
}

export interface ExperimentSection {
  introduction: string;
  objective: string;
  videoUrl: string;
  videoTitle: string;
  videoChannel: string;
  prerequisites: string[];
  theory: {
    overview: string;
    keyConcepts: { title: string; desc: string }[];
    complexities: ComplexityEntry[];
    realWorldApplications: string[];
  };
  procedure: string[];
  sampleCode: {
    language: "java" | "python" | "sql";
    code: string;
  };
  recursionPreset?: {
    functionName: string;
    sampleCall: string;
    javaCode: string;
    description: string;
  };
  leetcodeProblems: LeetCodeProblem[];
  expectedOutput: string;
  targetAudience: {
    ug: string[];
    pg: string[];
  };
}

export interface Experiment {
  id: string;
  labId: string;
  title: string;
  slug: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "Linear Structures" | "Sorting Algorithms" | "Trees & Graphs" | "Machine Learning" | "Databases";
  estimatedMinutes: number;
  rating: number;
  ratingsCount: number;
  simulator: "stack" | "queue" | "linked-list" | "bubble-sort" | "selection-sort" | "insertion-sort" | "recursion" | "binary-tree";
  quizId: string;
  sections: ExperimentSection;
}

export interface MLPrerequisiteTopic {
  id: string;
  title: string;
  category: "NumPy" | "Pandas" | "Matplotlib" | "Math Foundations";
  duration: string;
  videoUrl: string;
  summary: string;
  keyFunctions: string[];
}

export const ML_PREREQUISITES_DATA: MLPrerequisiteTopic[] = [
  // 12 NumPy Master Modules
  {
    id: "numpy-1",
    title: "Module 1: Introduction to NumPy & ndarray Basics",
    category: "NumPy",
    duration: "14 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Understand why NumPy is 50x faster than Python lists due to contiguous C-memory buffers and homogeneous typing.",
    keyFunctions: ["np.array()", "arr.ndim", "arr.shape", "arr.dtype"],
  },
  {
    id: "numpy-2",
    title: "Module 2: Array Creation Routines & Constants",
    category: "NumPy",
    duration: "18 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Generate zeros, ones, identity matrices, linear ranges, and logarithmically spaced tensors.",
    keyFunctions: ["np.zeros()", "np.ones()", "np.eye()", "np.arange()", "np.linspace()"],
  },
  {
    id: "numpy-3",
    title: "Module 3: 1D & Multi-Dimensional Array Indexing",
    category: "NumPy",
    duration: "20 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Master row/column sub-matrix access, negative indexing, and dimensional slicing syntax.",
    keyFunctions: ["arr[i, j]", "arr[:, 0]", "arr[1:4, 2:5]"],
  },
  {
    id: "numpy-4",
    title: "Module 4: Array Slicing & Views vs Deep Copies",
    category: "NumPy",
    duration: "16 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Prevent unintended memory mutation by mastering NumPy views vs copy operations.",
    keyFunctions: ["arr.copy()", "arr.base", "arr.view()"],
  },
  {
    id: "numpy-5",
    title: "Module 5: Boolean Masking & Conditional Filtering",
    category: "NumPy",
    duration: "22 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Filter matrices with logical predicates, bitwise & / | conditions, and conditional assignment.",
    keyFunctions: ["arr[arr > 0]", "np.where()", "np.logical_and()"],
  },
  {
    id: "numpy-6",
    title: "Module 6: Array Reshaping, Flattening & Transposition",
    category: "NumPy",
    duration: "19 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Reshape dimensions for ML input layers, transpose tensors, and flatten feature matrices.",
    keyFunctions: ["arr.reshape(-1, 1)", "arr.T", "arr.ravel()", "arr.flatten()"],
  },
  {
    id: "numpy-7",
    title: "Module 7: Vectorized Arithmetic & NumPy Broadcasting Rules",
    category: "NumPy",
    duration: "25 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Execute fast C-speed elementwise math and comprehend trailing dimensional broadcasting.",
    keyFunctions: ["arr + scalar", "arr1 * arr2", "np.add()", "np.exp()"],
  },
  {
    id: "numpy-8",
    title: "Module 8: Statistical Aggregations & Axis Computations",
    category: "NumPy",
    duration: "18 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Compute mean, variance, standard deviation, argmin, argmax, and cumulative sums across axes.",
    keyFunctions: ["np.mean(arr, axis=0)", "np.std()", "np.argmax()", "np.sum()"],
  },
  {
    id: "numpy-9",
    title: "Module 9: Linear Algebra & Matrix Multiplication (Dot Product)",
    category: "NumPy",
    duration: "24 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Perform matrix products, determinant evaluations, and solve linear systems Ax = b.",
    keyFunctions: ["np.dot(A, B)", "A @ B", "np.linalg.inv()", "np.linalg.det()"],
  },
  {
    id: "numpy-10",
    title: "Module 10: Array Stacking, Concatenation & Splitting",
    category: "NumPy",
    duration: "17 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Horizontally and vertically stack training features and split datasets into folds.",
    keyFunctions: ["np.vstack()", "np.hstack()", "np.concatenate()", "np.split()"],
  },
  {
    id: "numpy-11",
    title: "Module 11: Random Number Generation & Distributions for ML",
    category: "NumPy",
    duration: "21 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Initialize neural network weights with Gaussian normal distributions and seeded permutations.",
    keyFunctions: ["np.random.randn()", "np.random.seed(42)", "np.random.choice()"],
  },
  {
    id: "numpy-12",
    title: "Module 12: Fast I/O, Saving Arrays & Performance Profiling",
    category: "NumPy",
    duration: "15 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/QUT1VHiLmmI",
    summary: "Save binary .npy / .npz tensors to disk and benchmark vectorization against standard Python loops.",
    keyFunctions: ["np.save()", "np.load()", "np.savez_compressed()"],
  },

  // Pandas Series
  {
    id: "pandas-1",
    title: "Pandas Master: Series, DataFrames & Reading CSV/JSON",
    category: "Pandas",
    duration: "30 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
    summary: "Structured data representations, index labels, column selection, and CSV data ingestion.",
    keyFunctions: ["pd.read_csv()", "df.head()", "df.info()", "df.describe()"],
  },
  {
    id: "pandas-2",
    title: "Pandas Master: Data Cleaning, Missing Values & GroupBy",
    category: "Pandas",
    duration: "35 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/vmEHCJofslg",
    summary: "Handle NaNs with imputation, drop duplicates, encode categorical values, and execute GroupBy aggregations.",
    keyFunctions: ["df.dropna()", "df.fillna()", "df.groupby()", "pd.get_dummies()"],
  },

  // Matplotlib / Seaborn
  {
    id: "plot-1",
    title: "Matplotlib & Seaborn: Data Exploration & Heatmaps",
    category: "Matplotlib",
    duration: "28 mins",
    videoUrl: "https://www.youtube-nocookie.com/embed/UO98lJQ3QGI",
    summary: "Visualize distributions with histograms, scatter plots, feature correlations with heatmaps, and pair plots.",
    keyFunctions: ["plt.scatter()", "sns.heatmap()", "sns.pairplot()", "plt.show()"],
  },
];

export const EXPERIMENTS_DATA: Experiment[] = [
  // ==========================================
  // DSA LAB EXPERIMENT 1: BUBBLE SORT (JAVA)
  // ==========================================
  {
    id: "bubble-sort",
    labId: "data-structures",
    title: "Bubble Sort Algorithm",
    slug: "bubble-sort",
    difficulty: "Beginner",
    category: "Sorting Algorithms",
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 380,
    simulator: "bubble-sort",
    quizId: "bubble-sort-quiz",
    sections: {
      introduction: "Bubble Sort is an intuitive comparison-based sorting algorithm. It repeatedly steps through the array, compares adjacent elements in pairs, and swaps them if they are in the wrong order. In each outer pass, the largest unsorted element 'bubbles up' to its final position at the end of the array.",
      objective: "To simulate step-by-step adjacent element comparisons in Java, analyze the pass-by-pass bubbling mechanism, examine recursive vs iterative implementations, and observe the O(n) early termination optimization.",
      videoUrl: "https://www.youtube-nocookie.com/embed/zWg7U0OEAoE",
      videoTitle: "Bubble Sort in Java — Complete Deep Dive & Visualization",
      videoChannel: "Code with Harry / Kunal Kushwaha Java DSA",
      prerequisites: [
        "Java primitive arrays (int[]), length property, and zero-based indexing",
        "Nested loop execution (outer pass and inner pair scan)",
        "Pass-by-value and swapping logic in Java"
      ],
      theory: {
        overview: "In pass i (0 to n-2), the algorithm iterates from j = 0 to n - i - 2. If arr[j] > arr[j + 1], they are swapped. After pass i, the largest element in the unsorted portion is locked at position n - 1 - i. A boolean swapped flag allows early termination in O(n) time for already-sorted inputs.",
        keyConcepts: [
          {
            title: "Adjacent Comparison",
            desc: "Only neighboring elements arr[j] and arr[j+1] are compared at each step, making the algorithm naturally stable."
          },
          {
            title: "Bubbling Effect",
            desc: "In each outer loop pass, the largest unsorted element moves to its final position at the right end of the array."
          },
          {
            title: "Pass Optimization",
            desc: "Tracking whether any swap occurred during a pass enables early termination in O(n) time for already-sorted arrays."
          },
          {
            title: "In-Place & Stable",
            desc: "Requires O(1) auxiliary space and maintains the relative order of identical elements."
          }
        ],
        complexities: [
          { operation: "Best Case (Sorted)", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Average Case", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
          { operation: "Worst Case (Reversed)", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
          { operation: "Auxiliary Memory", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Educational foundation for sorting invariant proofs and loop boundary analysis",
          "Detecting nearly sorted arrays with minimal inversion count",
          "Embedded microcontrollers with extreme RAM constraints requiring zero extra memory overhead"
        ]
      },
      procedure: [
        "1. Watch the concept video tutorial explaining Java array loops and swapping.",
        "2. Launch the interactive Visualizer: click 'Generate Random Array' or enter custom numbers (e.g., 64, 34, 25, 12, 22, 11, 90).",
        "3. Click 'Play' or 'Step Next' to observe the color-coded state transitions: Blue (Comparing), Amber (Swapping), Green (Sorted).",
        "4. Adjust the speed slider (0.5x to 2x) to observe runtime comparisons and swap counters.",
        "5. Switch to the 'Java Code & Recursion Call Stack' tab to inspect the line-by-line execution trace and call frames.",
        "6. Practice the curated LeetCode problems (LeetCode 75, 912) and take the self-assessment quiz."
      ],
      sampleCode: {
        language: "java",
        code: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            // If no two elements were swapped by inner loop, array is already sorted
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] data = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(data);
        for (int num : data) {
            System.out.print(num + " ");
        }
    }
}`
      },
      recursionPreset: {
        functionName: "recursiveBubbleSort",
        sampleCall: "bubbleSort(arr, arr.length)",
        javaCode: `public static void recursiveBubbleSort(int[] arr, int n) {
    if (n <= 1) return; // Base Case
    
    // One pass of bubble sort for largest element
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            int temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
        }
    }
    // Largest element is fixed, recur for remaining array
    recursiveBubbleSort(arr, n - 1);
}`,
        description: "Recursive Bubble Sort fixes the largest element at the end of the array during each call frame, then recursively calls itself with size n - 1 until base case n == 1 is reached."
      },
      leetcodeProblems: [
        {
          id: 912,
          title: "Sort an Array",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/sort-an-array/",
          description: "Given an array of integers nums, sort the array in ascending order and return it.",
          approach: "Analyze the trade-offs between O(n²) Bubble/Selection sort and O(n log n) divide-and-conquer algorithms.",
          javaSnippet: `class Solution {
    public int[] sortArray(int[] nums) {
        // Implement Java In-Place Sort
        return nums;
    }
}`
        },
        {
          id: 75,
          title: "Sort Colors (Dutch National Flag)",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/sort-colors/",
          description: "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent.",
          approach: "Single-pass 3-pointer partition or in-place adjacent swapping.",
          javaSnippet: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low++, mid++);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high--);
            }
        }
    }
}`
        },
        {
          id: 283,
          title: "Move Zeroes",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/move-zeroes/",
          description: "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of non-zero elements.",
          approach: "Similar to bubble sort pass: bubble non-zero elements forward or swap 0s backward.",
          javaSnippet: `class Solution {
    public void moveZeroes(int[] nums) {
        int insertPos = 0;
        for (int num : nums) {
            if (num != 0) nums[insertPos++] = num;
        }
        while (insertPos < nums.length) {
            nums[insertPos++] = 0;
        }
    }
}`
        }
      ],
      expectedOutput: `Sorted Array: [11, 12, 22, 25, 34, 64, 90]
Total Passes: 5
Comparisons: 18, Swaps: 6`,
      targetAudience: {
        ug: ["B.Tech AI & DS, CSE Sem 3 — AD8381 Data Structures Lab"],
        pg: ["MCA, M.Tech Data Science algorithmic foundation"]
      }
    }
  },

  // ==========================================
  // DSA LAB EXPERIMENT 2: SELECTION SORT (JAVA)
  // ==========================================
  {
    id: "selection-sort",
    labId: "data-structures",
    title: "Selection Sort Algorithm",
    slug: "selection-sort",
    difficulty: "Beginner",
    category: "Sorting Algorithms",
    estimatedMinutes: 30,
    rating: 4.92,
    ratingsCount: 340,
    simulator: "selection-sort",
    quizId: "selection-sort-quiz",
    sections: {
      introduction: "Selection Sort is an in-place comparison sort that divides the array into a sorted sublist at the left and an unsorted sublist at the right. In each pass, it finds the smallest element in the unsorted portion and exchanges it with the leftmost unsorted element.",
      objective: "To observe minimum index scanning across the unsorted partition in Java, analyze the minimal swap characteristic (at most n-1 swaps), and verify time complexity invariance across all inputs.",
      videoUrl: "https://www.youtube-nocookie.com/embed/g-PGLbMth_g",
      videoTitle: "Selection Sort in Java — Step-by-Step Code & Complexity",
      videoChannel: "Kunal Kushwaha / Striver A2Z DSA",
      prerequisites: [
        "Linear scanning to locate minimum element index",
        "Array subarray partitioning concepts",
        "Java method modularization"
      ],
      theory: {
        overview: "In pass i (from 0 to n - 2), min_idx is initialized to i. The algorithm scans j from i + 1 to n - 1. If arr[j] < arr[min_idx], min_idx = j. At the end of the pass, if min_idx != i, arr[i] and arr[min_idx] are swapped.",
        keyConcepts: [
          {
            title: "Subarray Partitioning",
            desc: "Array is divided into Sorted (0 to i-1) and Unsorted (i to n-1)."
          },
          {
            title: "Minimum Index Tracking",
            desc: "Scans the unsorted partition to find the smallest value before performing a single swap."
          },
          {
            title: "Minimal Swap Advantage",
            desc: "Performs at most n - 1 swaps in total, making it ideal when memory writes (EEPROM / Flash) are expensive."
          },
          {
            title: "Always O(n²) Comparisons",
            desc: "Always executes n(n-1)/2 comparisons regardless of whether the initial array is sorted or reversed."
          }
        ],
        complexities: [
          { operation: "Best Case", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
          { operation: "Average Case", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
          { operation: "Worst Case", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
          { operation: "Maximum Swaps", best: "0", avg: "O(n)", worst: "n - 1", space: "O(1)" }
        ],
        realWorldApplications: [
          "Flash memory / EEPROM embedded devices where write cycles degrade hardware lifespan",
          "Small datasets where code simplicity and zero recursion overhead are prioritized",
          "Bounded memory write validation"
        ]
      },
      procedure: [
        "1. Watch the video breakdown of Selection Sort partition pointers.",
        "2. Launch the interactive visualizer and click 'Step Next' to watch the purple pointer scan for the minimum unsorted value.",
        "3. Observe how a single swap occurs at the end of each pass to lock the minimum element in the sorted partition.",
        "4. Trace the Java recursive selection sort call frames in Part 3.",
        "5. Solve LeetCode problems (LeetCode 215, 414) and submit the evaluation quiz."
      ],
      sampleCode: {
        language: "java",
        code: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap smallest element with first element of unsorted partition
            if (minIdx != i) {
                int temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
            }
        }
    }

    public static void main(String[] args) {
        int[] data = {29, 10, 14, 37, 13};
        selectionSort(data);
        for (int val : data) System.out.print(val + " ");
    }
}`
      },
      recursionPreset: {
        functionName: "recursiveSelectionSort",
        sampleCall: "selectionSort(arr, 0, arr.length)",
        javaCode: `public static void recursiveSelectionSort(int[] arr, int startIdx, int n) {
    if (startIdx >= n - 1) return; // Base Case
    
    int minIdx = startIdx;
    for (int j = startIdx + 1; j < n; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
    }
    
    if (minIdx != startIdx) {
        int temp = arr[startIdx];
        arr[startIdx] = arr[minIdx];
        arr[minIdx] = temp;
    }
    
    // Recur for remaining unsorted subarray
    recursiveSelectionSort(arr, startIdx + 1, n);
}`,
        description: "Recursive Selection Sort finds the minimum item in the range [startIdx..n-1], swaps it to startIdx, and makes a recursive call on the subarray starting at startIdx + 1."
      },
      leetcodeProblems: [
        {
          id: 414,
          title: "Third Maximum Number",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/third-maximum-number/",
          description: "Given an integer array nums, return the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.",
          approach: "Scan 3 distinct maximum tracking variables analogous to selection sort min tracking.",
          javaSnippet: `class Solution {
    public int thirdMax(int[] nums) {
        Integer m1 = null, m2 = null, m3 = null;
        for (Integer n : nums) {
            if (n.equals(m1) || n.equals(m2) || n.equals(m3)) continue;
            if (m1 == null || n > m1) { m3 = m2; m2 = m1; m1 = n; }
            else if (m2 == null || n > m2) { m3 = m2; m2 = n; }
            else if (m3 == null || n > m3) { m3 = n; }
        }
        return m3 == null ? m1 : m3;
    }
}`
        },
        {
          id: 215,
          title: "Kth Largest Element in an Array",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
          description: "Given an integer array nums and an integer k, return the kth largest element in the array.",
          approach: "Quickselect or Min-Heap priority queue.",
          javaSnippet: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) minHeap.poll();
        }
        return minHeap.peek();
    }
}`
        }
      ],
      expectedOutput: `Initial: [29, 10, 14, 37, 13]
Pass 1: min=10 -> Swap(29, 10) -> [10 | 29, 14, 37, 13]
Pass 2: min=13 -> Swap(29, 13) -> [10, 13 | 14, 37, 29]
Pass 3: min=14 -> No swap      -> [10, 13, 14 | 37, 29]
Pass 4: min=29 -> Swap(37, 29) -> [10, 13, 14, 29, 37]`,
      targetAudience: {
        ug: ["B.Tech AI & DS / CSE 3rd Sem"],
        pg: ["Competitive Programming Aspirants"]
      }
    }
  },

  // ==========================================
  // DSA LAB EXPERIMENT 3: INSERTION SORT (JAVA)
  // ==========================================
  {
    id: "insertion-sort",
    labId: "data-structures",
    title: "Insertion Sort Algorithm",
    slug: "insertion-sort",
    difficulty: "Beginner",
    category: "Sorting Algorithms",
    estimatedMinutes: 30,
    rating: 4.94,
    ratingsCount: 310,
    simulator: "insertion-sort",
    quizId: "insertion-sort-quiz",
    sections: {
      introduction: "Insertion Sort is an adaptive, in-place sorting algorithm that builds the final sorted array one item at a time. It works similarly to sorting playing cards in your hands: you take an unsorted card and shift greater cards rightward until finding its correct insertion slot.",
      objective: "To visualize key extraction, backward element shifting, and slot insertion in Java, observing O(n) adaptive behavior on nearly-sorted data.",
      videoUrl: "https://www.youtube-nocookie.com/embed/By_5-RRqVeE",
      videoTitle: "Insertion Sort in Java — Step-by-Step Explanation & Code",
      videoChannel: "Kunal Kushwaha / CodeWithHarry",
      prerequisites: [
        "While loop backward decrementing pointers",
        "Array shifting and temporary value holding",
        "Adaptive algorithm design concepts"
      ],
      theory: {
        overview: "Starting at index i = 1, key = arr[i] is extracted. The algorithm shifts all elements in the sorted partition (0 to i - 1) that are greater than key one position to the right. Once the proper position is reached, key is dropped at arr[j + 1].",
        keyConcepts: [
          {
            title: "Online / Incremental",
            desc: "Can sort real-time streaming data as items arrive sequentially."
          },
          {
            title: "Adaptive Linear Time",
            desc: "Runs in O(n) time on already sorted inputs because inner while-loop halts immediately."
          },
          {
            title: "Cache Friendly",
            desc: "High spatial locality makes it faster than O(n log n) algorithms for small arrays (n < 30)."
          },
          {
            title: "Stable & In-Place",
            desc: "Maintains original ordering of duplicate values with zero auxiliary memory."
          }
        ],
        complexities: [
          { operation: "Best Case (Sorted)", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" },
          { operation: "Average Case", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
          { operation: "Worst Case (Reversed)", best: "O(n²)", avg: "O(n²)", worst: "O(n²)", space: "O(1)" },
          { operation: "Auxiliary Space", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Base-case sub-routine in Java's standard Dual-Pivot Quicksort and Timsort (Arrays.sort())",
          "Real-time sensor telemetry sorting",
          "Nearly-sorted database log reconciliations"
        ]
      },
      procedure: [
        "1. Watch the video lecture on insertion sort shifting logic in Java.",
        "2. Open the simulator, select 'Nearly Sorted' array, and click 'Play' to observe fast linear sorting.",
        "3. Inspect the Java code execution pointer and call stack trace.",
        "4. Solve curated LeetCode challenges (LeetCode 147, 912) and complete the quiz."
      ],
      sampleCode: {
        language: "java",
        code: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Shift elements of arr[0..i-1] that are greater than key
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] data = {12, 11, 13, 5, 6};
        insertionSort(data);
        for (int val : data) System.out.print(val + " ");
    }
}`
      },
      recursionPreset: {
        functionName: "recursiveInsertionSort",
        sampleCall: "insertionSort(arr, arr.length)",
        javaCode: `public static void recursiveInsertionSort(int[] arr, int n) {
    if (n <= 1) return; // Base Case
    
    // Sort first n-1 elements
    recursiveInsertionSort(arr, n - 1);
    
    // Insert last element at its correct position in sorted array
    int last = arr[n - 1];
    int j = n - 2;
    
    while (j >= 0 && arr[j] > last) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = last;
}`,
        description: "Recursive Insertion Sort sorts the first n - 1 elements recursively, then shifts elements to insert the n-th element into its sorted location."
      },
      leetcodeProblems: [
        {
          id: 147,
          title: "Insertion Sort List",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/insertion-sort-list/",
          description: "Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.",
          approach: "Maintain a sorted sublist pointer and splice nodes into their sorted relative position.",
          javaSnippet: `class Solution {
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode(0);
        ListNode curr = head;
        while (curr != null) {
            ListNode prev = dummy;
            ListNode next = curr.next;
            while (prev.next != null && prev.next.val < curr.val) {
                prev = prev.next;
            }
            curr.next = prev.next;
            prev.next = curr;
            curr = next;
        }
        return dummy.next;
    }
}`
        }
      ],
      expectedOutput: `Initial: [12, 11, 13, 5, 6]
i=1, key=11: [11, 12, 13, 5, 6]
i=2, key=13: [11, 12, 13, 5, 6]
i=3, key=5:  [5, 11, 12, 13, 6]
i=4, key=6:  [5, 6, 11, 12, 13]
Sorted:      [5, 6, 11, 12, 13]`,
      targetAudience: {
        ug: ["B.Tech AI & DS, CSE Sem 3"],
        pg: ["MCA Algorithms Course"]
      }
    }
  },

  // ==========================================
  // DSA LAB EXPERIMENT 4: STACK OPERATIONS (JAVA)
  // ==========================================
  {
    id: "stack-operations",
    labId: "data-structures",
    title: "Stack Operations & Applications",
    slug: "stack-operations",
    difficulty: "Beginner",
    category: "Linear Structures",
    estimatedMinutes: 35,
    rating: 4.96,
    ratingsCount: 410,
    simulator: "stack",
    quizId: "stack-quiz",
    sections: {
      introduction: "A Stack is a fundamental linear data structure operating under the Last-In, First-Out (LIFO) discipline. Elements are pushed and popped exclusively at the Top pointer endpoint. In this experiment, you will simulate Stack Push, Pop, Peek, Overflow, and Underflow in pure Java.",
      objective: "To implement an array and linked list-based Stack in Java, verify O(1) constant-time operations, and explore expression evaluation and syntax validation.",
      videoUrl: "https://www.youtube-nocookie.com/embed/A3ZUpyrnCbM",
      videoTitle: "Stack Data Structure in Java — Complete Guide & Visual Operations",
      videoChannel: "Kunal Kushwaha / Apna College Java",
      prerequisites: [
        "Java 1D Arrays & Class encapsulation",
        "Stack Overflow and Underflow exception handling",
        "JVM call stack execution model"
      ],
      theory: {
        overview: "All insertions and deletions are restricted to the Top index. Initialized to top = -1. Push increments top and stores data. Pop retrieves arr[top] and decrements top. Underflow occurs when popping from top == -1; Overflow occurs when pushing beyond capacity.",
        keyConcepts: [
          { title: "LIFO Principle", desc: "Last item inserted is the first item removed." },
          { title: "Top Pointer", desc: "Tracks the highest active element index. Initialized to -1." },
          { title: "O(1) Push & Pop", desc: "Constant time memory operations without element shifting." },
          { title: "Applications", desc: "Function call stacks, balanced parenthesis parsing, and browser history." }
        ],
        complexities: [
          { operation: "Push", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Pop", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Peek / Top", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Search", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "JVM Execution Call Stack & Exception Stack Traces",
          "Balanced parentheses compiler parsers",
          "Infix to Postfix arithmetic calculation (Shunting-yard algorithm)",
          "Undo / Redo action buffers in text editors"
        ]
      },
      procedure: [
        "1. Watch the Stack architecture video tutorial.",
        "2. Use the interactive Stack simulator: enter an integer and click 'Push' to see the element animate onto the stack.",
        "3. Push up to 8 elements to test Stack Overflow; click 'Pop' repeatedly to test Stack Underflow.",
        "4. Trace Java recursive call frames in the Recursion Visualizer panel.",
        "5. Solve LeetCode 20 (Valid Parentheses) and LeetCode 155 (Min Stack), then submit the quiz."
      ],
      sampleCode: {
        language: "java",
        code: `public class CustomStack {
    private int maxSize;
    private int top;
    private int[] stackArray;

    public CustomStack(int size) {
        this.maxSize = size;
        this.stackArray = new int[maxSize];
        this.top = -1;
    }

    public void push(int value) {
        if (isFull()) {
            System.out.println("Stack Overflow! Cannot push " + value);
            return;
        }
        stackArray[++top] = value;
        System.out.println("Pushed: " + value);
    }

    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow! Stack is empty.");
            return -1;
        }
        return stackArray[top--];
    }

    public int peek() {
        if (isEmpty()) return -1;
        return stackArray[top];
    }

    public boolean isEmpty() { return (top == -1); }
    public boolean isFull() { return (top == maxSize - 1); }

    public static void main(String[] args) {
        CustomStack stack = new CustomStack(5);
        stack.push(10);
        stack.push(20);
        stack.push(30);
        System.out.println("Top Element: " + stack.peek());
        System.out.println("Popped: " + stack.pop());
    }
}`
      },
      recursionPreset: {
        functionName: "reverseStackRecursive",
        sampleCall: "reverse(stack)",
        javaCode: `public static void insertAtBottom(Stack<Integer> s, int item) {
    if (s.isEmpty()) {
        s.push(item);
        return;
    }
    int top = s.pop();
    insertAtBottom(s, item);
    s.push(top);
}

public static void reverseStack(Stack<Integer> s) {
    if (s.isEmpty()) return;
    int top = s.pop();
    reverseStack(s);
    insertAtBottom(s, top);
}`,
        description: "Reversing a Stack recursively using call frames: pops the top element, recursively reverses the remaining stack, and inserts the popped element at the bottom using call stack memory."
      },
      leetcodeProblems: [
        {
          id: 20,
          title: "Valid Parentheses",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/valid-parentheses/",
          description: "Given a string s containing '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
          approach: "Push opening brackets onto stack. For closing brackets, check if stack.pop() matches.",
          javaSnippet: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
        },
        {
          id: 155,
          title: "Min Stack",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/min-stack/",
          description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).",
          approach: "Store pairs of (value, current_min) or maintain an auxiliary minStack.",
          javaSnippet: `class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) minStack.push(val);
    }
    public void pop() {
        if (stack.pop().equals(minStack.peek())) minStack.pop();
    }
    public int top() { return stack.peek(); }
    public int getMin() { return minStack.peek(); }
}`
        }
      ],
      expectedOutput: `Pushed: 10
Pushed: 20
Pushed: 30
Top Element: 30
Popped: 30
Current Top: 20`,
      targetAudience: {
        ug: ["B.Tech AI & DS / CSE 3rd Sem"],
        pg: ["GATE CSE & Coding Interview Candidates"]
      }
    }
  },

  // ==========================================
  // DSA LAB EXPERIMENT 5: QUEUE & CIRCULAR QUEUE (JAVA)
  // ==========================================
  {
    id: "queue-operations",
    labId: "data-structures",
    title: "Queue & Circular Queue Operations",
    slug: "queue-operations",
    difficulty: "Beginner",
    category: "Linear Structures",
    estimatedMinutes: 35,
    rating: 4.93,
    ratingsCount: 360,
    simulator: "queue",
    quizId: "queue-quiz",
    sections: {
      introduction: "A Queue is a linear collection operating under the First-In, First-Out (FIFO) principle. Elements enter at the Rear pointer and exit at the Front pointer. A Circular Queue connects the last index back to the first using modulo arithmetic (rear + 1) % size, eliminating memory waste.",
      objective: "To simulate Enqueue and Dequeue operations on linear and circular queues in Java, examine Front/Rear pointer wrapping, and analyze queue buffers.",
      videoUrl: "https://www.youtube-nocookie.com/embed/YqsVEYTbC4c",
      videoTitle: "Queue & Circular Queue in Java — Complete Tutorial",
      videoChannel: "Kunal Kushwaha / Apna College Java",
      prerequisites: [
        "Array indexing and modular arithmetic (idx % capacity)",
        "FIFO buffer mechanics",
        "Java constructor and class methods"
      ],
      theory: {
        overview: "In a standard queue, repeated dequeues leave empty slots at the front that cannot be reused. A Circular Queue uses modulo arithmetic: rear = (rear + 1) % capacity and front = (front + 1) % capacity to reuse vacated positions in O(1) time.",
        keyConcepts: [
          { title: "FIFO Discipline", desc: "First item enqueued is the first item served." },
          { title: "Front & Rear", desc: "Front indicates the next item to dequeue; Rear indicates the last item enqueued." },
          { title: "Circular Wrap", desc: "Modulo math (idx + 1) % N enables continuous circular reuse." },
          { title: "Boundary Conditions", desc: "Empty when front == -1; Full when (rear + 1) % N == front." }
        ],
        complexities: [
          { operation: "Enqueue", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Dequeue", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Peek Front", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Search", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Operating System CPU Scheduling (Round-Robin time slices)",
          "Asynchronous message streaming buffers (Kafka / RabbitMQ queues)",
          "Print job spoolers and network packet socket buffers",
          "Breadth-First Search (BFS) graph frontier exploration"
        ]
      },
      procedure: [
        "1. Watch the Circular Queue video tutorial.",
        "2. Input integers and click 'Enqueue' to advance the Rear pointer.",
        "3. Click 'Dequeue' to remove items from Front and observe circular wrapping.",
        "4. Inspect Java code trace and solve LeetCode 225 (Implement Stack using Queues).",
        "5. Complete the self-assessment quiz."
      ],
      sampleCode: {
        language: "java",
        code: `public class CircularQueue {
    private int[] arr;
    private int front, rear, size, capacity;

    public CircularQueue(int capacity) {
        this.capacity = capacity;
        this.arr = new int[capacity];
        this.front = -1;
        this.rear = -1;
        this.size = 0;
    }

    public boolean enqueue(int item) {
        if (isFull()) {
            System.out.println("Queue is Full!");
            return false;
        }
        if (isEmpty()) front = 0;
        rear = (rear + 1) % capacity;
        arr[rear] = item;
        size++;
        System.out.println("Enqueued: " + item);
        return true;
    }

    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue is Empty!");
            return -1;
        }
        int val = arr[front];
        if (front == rear) {
            front = -1;
            rear = -1;
        } else {
            front = (front + 1) % capacity;
        }
        size--;
        return val;
    }

    public boolean isFull() { return ((rear + 1) % capacity == front); }
    public boolean isEmpty() { return (front == -1); }
}`
      },
      leetcodeProblems: [
        {
          id: 225,
          title: "Implement Stack using Queues",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/implement-stack-using-queues/",
          description: "Implement a last-in-first-out (LIFO) stack using only standard FIFO queues.",
          approach: "On push, add to queue and rotate the previous elements behind the newly added element.",
          javaSnippet: `class MyStack {
    private Queue<Integer> q = new LinkedList<>();
    public void push(int x) {
        q.add(x);
        for (int i = 1; i < q.size(); i++) q.add(q.remove());
    }
    public int pop() { return q.remove(); }
    public int top() { return q.peek(); }
    public boolean empty() { return q.isEmpty(); }
}`
        },
        {
          id: 622,
          title: "Design Circular Queue",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/design-circular-queue/",
          description: "Design your implementation of the circular queue with fixed size buffer.",
          approach: "Array with front, rear, and count variables using modulo arithmetic.",
          javaSnippet: `class MyCircularQueue {
    int[] arr; int front = 0, rear = -1, len = 0;
    public MyCircularQueue(int k) { arr = new int[k]; }
    public boolean enQueue(int value) {
        if (isFull()) return false;
        rear = (rear + 1) % arr.length;
        arr[rear] = value; len++; return true;
    }
    public boolean deQueue() {
        if (isEmpty()) return false;
        front = (front + 1) % arr.length;
        len--; return true;
    }
    public int Front() { return isEmpty() ? -1 : arr[front]; }
    public int Rear() { return isEmpty() ? -1 : arr[rear]; }
    public boolean isEmpty() { return len == 0; }
    public boolean isFull() { return len == arr.length; }
}`
        }
      ],
      expectedOutput: `Enqueued: 10
Enqueued: 20
Enqueued: 30
Dequeued: 10
Front index now at: 1, Rear index at: 2`,
      targetAudience: {
        ug: ["B.Tech AI & DS, CSE 3rd Sem"],
        pg: ["Operating Systems & Distributed Systems Students"]
      }
    }
  },

  // ==========================================
  // DSA LAB EXPERIMENT 6: SINGLY LINKED LIST (JAVA)
  // ==========================================
  {
    id: "singly-linked-list",
    labId: "data-structures",
    title: "Singly Linked List Operations",
    slug: "singly-linked-list",
    difficulty: "Beginner",
    category: "Linear Structures",
    estimatedMinutes: 40,
    rating: 4.97,
    ratingsCount: 450,
    simulator: "linked-list",
    quizId: "linked-list-quiz",
    sections: {
      introduction: "A Linked List is a dynamic linear data structure composed of nodes. Each node contains a data payload and a reference pointer pointing to the next node in memory. This experiment visualizes dynamic node allocation, Head/Tail insertion, element deletion, and list reversal in Java.",
      objective: "To master Java object reference manipulation, dynamic memory allocation without contiguous array limits, O(1) head insertion, and linked list traversal.",
      videoUrl: "https://www.youtube-nocookie.com/embed/58YbpRDc4yw",
      videoTitle: "Linked List in Java — Node Creation, Insertion, Deletion & Reversal",
      videoChannel: "Kunal Kushwaha / Striver A2Z DSA",
      prerequisites: [
        "Java Object References & Garbage Collection",
        "Static vs Dynamic memory trade-offs",
        "Pointer rewiring and NULL safety"
      ],
      theory: {
        overview: "Unlike static arrays requiring contiguous RAM, linked list nodes are allocated on the JVM heap on demand. Insertion at Head takes O(1) time. Deletion involves finding the target's predecessor and updating pred.next = target.next.",
        keyConcepts: [
          { title: "Node Class", desc: "Contains int data and Node next reference." },
          { title: "Head Pointer", desc: "Reference to the first node; null if list is empty." },
          { title: "Insert at Head", desc: "newNode.next = head; head = newNode; executes in O(1) time." },
          { title: "Delete by Value", desc: "Rewires predecessor's next pointer to bypass the deleted node." }
        ],
        complexities: [
          { operation: "Insert at Head", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Insert at Tail", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Delete Head", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "Search Value", best: "O(1)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Implementation of dynamic Stacks and Queues without size constraints",
          "Music and video playlist Next/Previous track chaining",
          "Operating system kernel memory free-list chaining",
          "Polynomial arithmetic representations in computer algebra systems"
        ]
      },
      procedure: [
        "1. Watch the video breakdown on Java linked list references.",
        "2. Use the visualizer: click 'Insert Head' to connect a new node to Head in O(1) time.",
        "3. Use 'Search' to watch traversal pointers step node-by-node from Head.",
        "4. Trace Java recursive linked list reversal in the Recursion Panel.",
        "5. Solve LeetCode 206 (Reverse Linked List) and LeetCode 21 (Merge Two Sorted Lists)."
      ],
      sampleCode: {
        language: "java",
        code: `public class SinglyLinkedList {
    static class Node {
        int data;
        Node next;
        Node(int data) { this.data = data; this.next = null; }
    }

    private Node head;

    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }

    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        if (head == null) { head = newNode; return; }
        Node temp = head;
        while (temp.next != null) temp = temp.next;
        temp.next = newNode;
    }

    public void deleteValue(int val) {
        if (head == null) return;
        if (head.data == val) { head = head.next; return; }
        Node temp = head;
        while (temp.next != null && temp.next.data != val) {
            temp = temp.next;
        }
        if (temp.next != null) temp.next = temp.next.next;
    }

    public void printList() {
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("null");
    }
}`
      },
      recursionPreset: {
        functionName: "reverseListRecursive",
        sampleCall: "reverse(head)",
        javaCode: `public static Node reverseList(Node head) {
    // Base Case: empty list or single node
    if (head == null || head.next == null) return head;
    
    // Reverse rest of the list
    Node newHead = reverseList(head.next);
    
    // Rewire next node's pointer back to current head
    head.next.next = head;
    head.next = null;
    
    return newHead;
}`,
        description: "Recursive Linked List Reversal traverses to the last node (which becomes newHead), then as call frames return, rewires head.next.next = head and breaks the forward link."
      },
      leetcodeProblems: [
        {
          id: 206,
          title: "Reverse Linked List",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/reverse-linked-list/",
          description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
          approach: "Iterative 3-pointer (prev, curr, next) or recursive call frame return.",
          javaSnippet: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`
        },
        {
          id: 21,
          title: "Merge Two Sorted Lists",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/merge-two-sorted-lists/",
          description: "Merge two sorted linked lists and return it as a sorted list.",
          approach: "Dummy head pointer or recursive merge.",
          javaSnippet: `class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;
        if (l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
}`
        }
      ],
      expectedOutput: `List: 10 -> 25 -> 40 -> null
Inserted 5 at Head: 5 -> 10 -> 25 -> 40 -> null
Deleted 25: 5 -> 10 -> 40 -> null
Reversed List: 40 -> 10 -> 5 -> null`,
      targetAudience: {
        ug: ["B.Tech AI & DS 3rd Sem"],
        pg: ["Data Structures Master Class"]
      }
    }
  },

  // ==========================================
  // ML LAB EXPERIMENT 1: LINEAR REGRESSION
  // ==========================================
  {
    id: "linear-regression-exp",
    labId: "ai-machine-learning",
    title: "Linear Regression with Gradient Descent",
    slug: "linear-regression",
    difficulty: "Beginner",
    category: "Machine Learning",
    estimatedMinutes: 40,
    rating: 4.94,
    ratingsCount: 290,
    simulator: "stack",
    quizId: "ai-ml-quiz",
    sections: {
      introduction: "Linear Regression is the foundation of supervised machine learning. It models the linear relationship between continuous target variables y and explanatory feature vector X by minimizing Mean Squared Error (MSE) loss using Gradient Descent.",
      objective: "To implement vectorized Gradient Descent, understand learning rate hyperparameter alpha, derivative calculation of MSE loss, and monitor convergence curves.",
      videoUrl: "https://www.youtube-nocookie.com/embed/aircAruvnKk",
      videoTitle: "Linear Regression & Gradient Descent from Scratch in Python/NumPy",
      videoChannel: "3Blue1Brown / StatQuest / Krish Naik",
      prerequisites: [
        "NumPy Prerequisite Modules 1-9 (Vectorization & Dot Products)",
        "Partial Derivatives & Gradient Vector calculus",
        "Convex optimization principles"
      ],
      theory: {
        overview: "Hypothesis: h(x) = X · W + b. Cost function MSE: J(W, b) = (1/2m) Σ (h(x) - y)². Weights update rule: W := W - α (1/m) Xᵀ(h(x) - y).",
        keyConcepts: [
          { title: "Supervised Learning", desc: "Trained on labeled (X, y) data pairs." },
          { title: "MSE Loss", desc: "Measures average squared residual difference." },
          { title: "Learning Rate (α)", desc: "Controls step size along negative gradient." },
          { title: "Vectorized Training", desc: "C-speed batch gradient matrix calculations." }
        ],
        complexities: [
          { operation: "Batch GD Iteration", best: "O(n · m)", avg: "O(n · m)", worst: "O(n · m)", space: "O(m)" },
          { operation: "Inference Prediction", best: "O(m)", avg: "O(m)", worst: "O(m)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Real estate property valuation and economic pricing models",
          "Financial stock trend forecasting and risk metrics",
          "Medical recovery rate estimation"
        ]
      },
      procedure: [
        "1. Complete the prerequisite NumPy 12-Module series.",
        "2. Load training dataset into NumPy feature matrix X and target y.",
        "3. Initialize weights to zeros, set learning rate alpha (0.01) and epochs (1000).",
        "4. Run Gradient Descent loop to compute loss minimization and inspect convergence.",
        "5. Complete the self-assessment quiz."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np

class LinearRegression:
    def __init__(self, lr=0.01, n_iters=1000):
        self.lr = lr
        self.n_iters = n_iters
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0.0

        for _ in range(self.n_iters):
            y_predicted = np.dot(X, self.weights) + self.bias
            
            # Compute Gradients
            dw = (1 / n_samples) * np.dot(X.T, (y_predicted - y))
            db = (1 / n_samples) * np.sum(y_predicted - y)

            # Update Parameters
            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict(self, X):
        return np.dot(X, self.weights) + self.bias`
      },
      leetcodeProblems: [],
      expectedOutput: `Trained Weights: [2.014], Bias: 1.008
MSE Loss: 0.0024 after 1000 epochs
Prediction for X=[5.0]: y=11.078`,
      targetAudience: {
        ug: ["B.Tech AI & DS 4th Sem — AD8481 ML Lab"],
        pg: ["M.Tech Machine Intelligence"]
      }
    }
  },

  // ==========================================
  // ML LAB EXPERIMENT 2: KNN CLASSIFIER
  // ==========================================
  {
    id: "knn-classifier-exp",
    labId: "ai-machine-learning",
    title: "K-Nearest Neighbors (KNN) Classifier",
    slug: "knn-classification",
    difficulty: "Intermediate",
    category: "Machine Learning",
    estimatedMinutes: 40,
    rating: 4.91,
    ratingsCount: 260,
    simulator: "queue",
    quizId: "ai-ml-quiz",
    sections: {
      introduction: "K-Nearest Neighbors (KNN) is an instance-based non-parametric supervised learning algorithm. It classifies unseen queries by calculating Euclidean distance to all stored training samples and taking the majority class label among the K closest neighbors.",
      objective: "To implement Euclidean distance vectorization in NumPy, observe decision boundary changes with odd K values, and evaluate classification metrics.",
      videoUrl: "https://www.youtube-nocookie.com/embed/HVXime0nQeI",
      videoTitle: "K-Nearest Neighbors (KNN) Algorithm Explained from Scratch",
      videoChannel: "StatQuest / Krish Naik",
      prerequisites: [
        "Vector distance metrics (Euclidean, Manhattan)",
        "Feature scaling (Min-Max normalization)",
        "Majority voting mechanisms"
      ],
      theory: {
        overview: "Euclidean distance d(p, q) = √Σ(pᵢ - qᵢ)². Given query x, compute distances to all training points, sort distances in ascending order, pick top K labels, and assign mode(labels).",
        keyConcepts: [
          { title: "Non-Parametric", desc: "Makes no explicit assumptions regarding underlying data distribution." },
          { title: "Lazy Learning", desc: "Zero training phase; all computation occurs during query inference." },
          { title: "Hyperparameter K", desc: "Small K leads to overfitting/high variance; large K leads to high bias." }
        ],
        complexities: [
          { operation: "Training Phase", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(n · d)" },
          { operation: "Inference Query", best: "O(n · d)", avg: "O(n · d + n log K)", worst: "O(n · d)", space: "O(K)" }
        ],
        realWorldApplications: [
          "Recommendation engines (collaborative user similarity)",
          "Handwritten digit recognition (MNIST dataset)",
          "Credit risk classification"
        ]
      },
      procedure: [
        "1. Normalize input features using Z-score standardization.",
        "2. Compute pairwise Euclidean distance matrix.",
        "3. Extract K nearest neighbor indices and perform majority voting.",
        "4. Evaluate Accuracy, Precision, Recall, and Confusion Matrix.",
        "5. Complete the self-assessment quiz."
      ],
      sampleCode: {
        language: "python",
        code: `import numpy as np
from collections import Counter

class KNN:
    def __init__(self, k=3):
        self.k = k

    def fit(self, X, y):
        self.X_train = X
        self.y_train = y

    def predict(self, X):
        return np.array([self._predict(x) for x in X])

    def _predict(self, x):
        # Compute Euclidean distances
        distances = [np.sqrt(np.sum((x - x_train)**2)) for x_train in self.X_train]
        # Get K nearest sample indices
        k_indices = np.argsort(distances)[:self.k]
        k_nearest_labels = [self.y_train[i] for i in k_indices]
        # Majority vote
        most_common = Counter(k_nearest_labels).most_common(1)
        return most_common[0][0]`
      },
      leetcodeProblems: [],
      expectedOutput: `Classification Accuracy: 96.67% on Iris Dataset
K=3 optimal decision boundary achieved
Confusion Matrix: [[10, 0, 0], [0, 9, 1], [0, 0, 10]]`,
      targetAudience: {
        ug: ["B.Tech AI & DS 4th Sem"],
        pg: ["Pattern Recognition Course"]
      }
    }
  }
];
