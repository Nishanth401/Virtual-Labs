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
    language: "java" | "python" | "sql" | "c" | "bash";
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
  category: "Linear Structures" | "Sorting Algorithms" | "Trees & Graphs" | "Machine Learning" | "Databases" | "Operating Systems" | "Artificial Intelligence" | "Big Data Analytics" | "Cloud Computing";
  estimatedMinutes: number;
  rating: number;
  ratingsCount: number;
  simulator: "stack" | "queue" | "linked-list" | "bubble-sort" | "selection-sort" | "insertion-sort" | "recursion" | "binary-tree" | "custom" | string;
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
        sampleCall: "recursiveBubbleSort(new int[]{64, 34, 25, 12, 22}, 5)",
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
        sampleCall: "recursiveSelectionSort(new int[]{29, 10, 14, 37, 13}, 0, 5)",
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
        sampleCall: "recursiveInsertionSort(new int[]{12, 11, 13, 5, 6}, 5)",
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
  },

  // =========================================================================
  // OPERATING SYSTEMS LAB (OSL - CS3461)
  // =========================================================================
  {
    id: "exp-os-1",
    labId: "operating-systems",
    title: "CPU Scheduling Algorithms: FCFS & Shortest Job First (SJF)",
    slug: "cpu-scheduling-fcfs-sjf",
    difficulty: "Intermediate",
    category: "Operating Systems",
    estimatedMinutes: 25,
    rating: 4.94,
    ratingsCount: 280,
    simulator: "custom",
    quizId: "cpu-scheduling-quiz",
    sections: {
      introduction: "CPU scheduling determines which process in the ready queue is allocated the CPU processor. First-Come First-Served (FCFS) schedules non-preemptively by arrival time, whereas Shortest Job First (SJF) schedules by shortest burst time to minimize average waiting time.",
      objective: "Implement FCFS and non-preemptive SJF CPU scheduling in C. Calculate Waiting Time (WT), Turnaround Time (TAT), and average metrics, and render Gantt chart execution intervals.",
      videoUrl: "https://www.youtube-nocookie.com/embed/26QPDBe-NB8",
      videoTitle: "CPU Scheduling Algorithms in Operating Systems",
      videoChannel: "Neso Academy",
      prerequisites: ["C Programming basics", "Process state lifecycle (Ready, Running, Terminated)", "Burst & Arrival time concepts"],
      theory: {
        overview: "The CPU scheduler evaluates processes waiting in main memory and allocates CPU cores according to predefined optimization criteria (throughput, turnaround time, waiting time, and response time).",
        keyConcepts: [
          { title: "Turnaround Time (TAT)", desc: "Total time elapsed from process arrival to completion: TAT = Completion Time - Arrival Time." },
          { title: "Waiting Time (WT)", desc: "Total time spent waiting in ready queue: WT = Turnaround Time - Burst Time." },
          { title: "Convoy Effect", desc: "Performance degradation in FCFS where short CPU processes wait behind a prolonged CPU-heavy process." }
        ],
        complexities: [
          { operation: "FCFS Execution", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(n)" },
          { operation: "SJF Sorting & Dispatch", best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)", space: "O(n)" }
        ],
        realWorldApplications: [
          "Linux CFS (Completely Fair Scheduler) core scheduling",
          "Real-time microcontroller task dispatchers",
          "Batch processing cluster work queues"
        ]
      },
      procedure: [
        "1. Input number of processes n, process IDs, Arrival Times, and Burst Times.",
        "2. For FCFS: Sort by Arrival Time; compute Completion Time consecutively.",
        "3. For SJF: Select the process with the smallest Burst Time among arrived processes.",
        "4. Compute Waiting Time (WT = TAT - BT) and Turnaround Time (TAT = CT - AT).",
        "5. Output the execution Gantt Chart and average WT/TAT."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

struct Process {
    int pid;
    int bt;
    int wt;
    int tat;
};

void calculateFCFS(struct Process p[], int n) {
    p[0].wt = 0;
    for (int i = 1; i < n; i++) {
        p[i].wt = p[i-1].wt + p[i-1].bt;
    }
    for (int i = 0; i < n; i++) {
        p[i].tat = p[i].bt + p[i].wt;
    }
    printf("PID\\tBurst\\tWaiting\\tTurnaround\\n");
    for (int i = 0; i < n; i++) {
        printf("%d\\t%d\\t%d\\t%d\\n", p[i].pid, p[i].bt, p[i].wt, p[i].tat);
    }
}

int main() {
    struct Process p[] = {{1, 6, 0, 0}, {2, 8, 0, 0}, {3, 7, 0, 0}, {4, 3, 0, 0}};
    int n = sizeof(p) / sizeof(p[0]);
    calculateFCFS(p, n);
    return 0;
}`
      },
      leetcodeProblems: [
        {
          id: 621,
          title: "Task Scheduler",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/task-scheduler/",
          description: "Given a characters array tasks and a cooling interval n, return least units of CPU intervals.",
          approach: "Greedy max-heap tracking the highest frequency task occurrences and idle cooling slots.",
          javaSnippet: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        for (char c : tasks) freq[c - 'A']++;
        Arrays.sort(freq);
        int maxFreq = freq[25];
        int idleSlots = (maxFreq - 1) * n;
        for (int i = 24; i >= 0 && freq[i] > 0; i--) {
            idleSlots -= Math.min(freq[i], maxFreq - 1);
        }
        return idleSlots > 0 ? tasks.length + idleSlots : tasks.length;
    }
}`
        }
      ],
      expectedOutput: `PID\tBurst\tWaiting\tTurnaround
1\t6\t0\t6
2\t8\t6\t14
3\t7\t14\t21
4\t3\t21\t24
Average Waiting Time: 10.25 ms
Average Turnaround Time: 16.25 ms`,
      targetAudience: {
        ug: ["B.Tech AI & DS 4th Sem — CS3461 Operating Systems Lab"],
        pg: ["Advanced OS Systems"]
      }
    }
  },
  {
    id: "exp-os-2",
    labId: "operating-systems",
    title: "Process Synchronization: Producer-Consumer using POSIX Semaphores",
    slug: "producer-consumer-semaphores",
    difficulty: "Intermediate",
    category: "Operating Systems",
    estimatedMinutes: 30,
    rating: 4.92,
    ratingsCount: 245,
    simulator: "custom",
    quizId: "semaphores-quiz",
    sections: {
      introduction: "The Producer-Consumer problem is a classic multi-process synchronization challenge where producer threads generate data into a bounded buffer and consumer threads retrieve data without race conditions.",
      objective: "Implement thread-safe Producer-Consumer synchronization in C using POSIX mutex locks and counting semaphores (`sem_wait` and `sem_post`).",
      videoUrl: "https://www.youtube-nocookie.com/embed/Qx2GBlZknQQ",
      videoTitle: "Producer Consumer Problem using Semaphores",
      videoChannel: "Neso Academy",
      prerequisites: ["Pthread library in C", "Mutex Locks", "Counting vs Binary Semaphores"],
      theory: {
        overview: "Semaphores provide atomic synchronization primitives to coordinate access to shared memory buffers among concurrent worker threads.",
        keyConcepts: [
          { title: "Empty Semaphore", desc: "Counting semaphore initialized to Buffer Capacity tracking vacant slots." },
          { title: "Full Semaphore", desc: "Counting semaphore initialized to 0 tracking available produced items." },
          { title: "Mutex Lock", desc: "Mutual exclusion lock guarding the critical section during buffer pointer updates." }
        ],
        complexities: [
          { operation: "Semaphore Lock / Post", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(Buffer Size)" }
        ],
        realWorldApplications: [
          "Async I/O event loops (Node.js libuv)",
          "Audio playback ring buffers",
          "Message brokers like Apache Kafka topic partitions"
        ]
      },
      procedure: [
        "1. Define a bounded ring buffer of size BUFFER_SIZE.",
        "2. Initialize `empty` semaphore to BUFFER_SIZE and `full` semaphore to 0.",
        "3. Producer executes: `sem_wait(&empty)`, `pthread_mutex_lock(&mutex)`, writes item, `pthread_mutex_unlock(&mutex)`, `sem_post(&full)`.",
        "4. Consumer executes: `sem_wait(&full)`, `pthread_mutex_lock(&mutex)`, reads item, `pthread_mutex_unlock(&mutex)`, `sem_post(&empty)`."
      ],
      sampleCode: {
        language: "c",
        code: `#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE 5
int buffer[BUFFER_SIZE];
int in = 0, out = 0;

sem_t empty_slots;
sem_t full_slots;
pthread_mutex_t mutex;

void* producer(void* pno) {
    int item = rand() % 100;
    sem_wait(&empty_slots);
    pthread_mutex_lock(&mutex);
    buffer[in] = item;
    printf("Producer %d: Inserted item %d at %d\\n", *(int*)pno, item, in);
    in = (in + 1) % BUFFER_SIZE;
    pthread_mutex_unlock(&mutex);
    sem_post(&full_slots);
    return NULL;
}`
      },
      leetcodeProblems: [
        {
          id: 1114,
          title: "Print in Order",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/print-in-order/",
          description: "Ensure that first(), second(), and third() are executed in order across concurrent threads.",
          approach: "Use two Semaphores or atomic counters to synchronize sequential execution.",
          javaSnippet: `import java.util.concurrent.Semaphore;
class Foo {
    private Semaphore s2 = new Semaphore(0);
    private Semaphore s3 = new Semaphore(0);

    public void first(Runnable r) { r.run(); s2.release(); }
    public void second(Runnable r) throws InterruptedException { s2.acquire(); r.run(); s3.release(); }
    public void third(Runnable r) throws InterruptedException { s3.acquire(); r.run(); }
}`
        }
      ],
      expectedOutput: `Producer 1: Inserted item 42 at index 0
Producer 2: Inserted item 87 at index 1
Consumer 1: Retrieved item 42 from index 0
Buffer state: 1 item active, 4 slots empty`,
      targetAudience: {
        ug: ["B.Tech AI & DS 4th Sem"],
        pg: ["Concurrent Systems"]
      }
    }
  },
  {
    id: "exp-os-3",
    labId: "operating-systems",
    title: "Deadlock Avoidance: Banker's Safety Algorithm",
    slug: "bankers-deadlock-algorithm",
    difficulty: "Advanced",
    category: "Operating Systems",
    estimatedMinutes: 30,
    rating: 4.95,
    ratingsCount: 310,
    simulator: "custom",
    quizId: "bankers-quiz",
    sections: {
      introduction: "Banker's Algorithm is a deadlock avoidance strategy for resource allocation developed by Edsger Dijkstra. It verifies whether granting a resource request leaves the operating system in a provably Safe State.",
      objective: "Implement Banker's Algorithm in C. Calculate the Need Matrix, verify system safety, and output the safe execution sequence `<P0, P1, P2, ...>`.",
      videoUrl: "https://www.youtube-nocookie.com/embed/T0FXvTHcYi4",
      videoTitle: "Banker's Algorithm for Deadlock Avoidance",
      videoChannel: "Gate Smashers",
      prerequisites: ["Deadlock 4 Coffman conditions", "Resource Allocation Graph (RAG)", "Matrix operations in C"],
      theory: {
        overview: "A state is safe if there exists a safe sequence of processes such that each process can satisfy its maximum remaining resource claim using available resources plus resources currently held by preceding processes.",
        keyConcepts: [
          { title: "Need Matrix", desc: "Need[i][j] = Max[i][j] - Allocation[i][j]." },
          { title: "Available Vector", desc: "Vector representing currently unassigned units of each resource type." },
          { title: "Safe Sequence", desc: "An ordered sequence of process completion ensuring zero deadlocks." }
        ],
        complexities: [
          { operation: "Safety Check Algorithm", best: "O(m * n²)", avg: "O(m * n²)", worst: "O(m * n²)", space: "O(m * n)" }
        ],
        realWorldApplications: [
          "Database multi-lock transactions",
          "Cloud virtualization instance resource quotas",
          "Embedded avionics task safety validation"
        ]
      },
      procedure: [
        "1. Initialize Allocation, Max matrices, and Available resource vector.",
        "2. Compute Need matrix: `Need[i][j] = Max[i][j] - Allocation[i][j]`.",
        "3. Find process `Pi` with `Finish[i] == 0` and `Need[i] <= Available`.",
        "4. If found: `Available = Available + Allocation[i]`, mark `Finish[i] = 1`, add `Pi` to safe sequence.",
        "5. Repeat until all processes finish (Safe) or no process can proceed (Unsafe/Deadlock)."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

int main() {
    int n = 5, m = 3;
    int alloc[5][3] = {{0, 1, 0}, {2, 0, 0}, {3, 0, 2}, {2, 1, 1}, {0, 0, 2}};
    int max[5][3]   = {{7, 5, 3}, {3, 2, 2}, {9, 0, 2}, {2, 2, 2}, {4, 3, 3}};
    int avail[3]    = {3, 3, 2};

    int f[5] = {0}, ans[5], ind = 0;
    int need[5][3];

    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            need[i][j] = max[i][j] - alloc[i][j];

    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            if (f[i] == 0) {
                int flag = 0;
                for (int j = 0; j < m; j++) {
                    if (need[i][j] > avail[j]) { flag = 1; break; }
                }
                if (flag == 0) {
                    ans[ind++] = i;
                    for (int y = 0; y < m; y++) avail[y] += alloc[i][y];
                    f[i] = 1;
                }
            }
        }
    }
    printf("Safe Sequence: ");
    for (int i = 0; i < n - 1; i++) printf("P%d -> ", ans[i]);
    printf("P%d\\n", ans[n - 1]);
    return 0;
}`
      },
      leetcodeProblems: [
        {
          id: 207,
          title: "Course Schedule",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/course-schedule/",
          description: "Detect if cyclic dependency deadlock exists in course prerequisites graph.",
          approach: "Topological Sort using Kahn's In-Degree Algorithm (BFS).",
          javaSnippet: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); inDegree[p[0]]++; }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);
        int count = 0;
        while (!q.isEmpty()) {
            int u = q.poll(); count++;
            for (int v : adj.get(u)) if (--inDegree[v] == 0) q.offer(v);
        }
        return count == numCourses;
    }
}`
        }
      ],
      expectedOutput: `Need Matrix calculated successfully
Safe State Verified!
Safe Sequence: P1 -> P3 -> P4 -> P0 -> P2`,
      targetAudience: {
        ug: ["B.Tech AI & DS 4th Sem"],
        pg: ["Operating System Architecture"]
      }
    }
  },
  {
    id: "exp-os-4",
    labId: "operating-systems",
    title: "Virtual Memory: LRU & FIFO Page Replacement Simulation",
    slug: "page-replacement-lru-fifo",
    difficulty: "Intermediate",
    category: "Operating Systems",
    estimatedMinutes: 25,
    rating: 4.91,
    ratingsCount: 260,
    simulator: "custom",
    quizId: "page-replacement-quiz",
    sections: {
      introduction: "Page replacement algorithms dictate which memory page frame to evict when physical RAM is full during a page fault in virtual memory management.",
      objective: "Simulate First-In First-Out (FIFO) and Least Recently Used (LRU) page replacement in C, calculating Page Faults and Hit Ratios for a reference stream.",
      videoUrl: "https://www.youtube-nocookie.com/embed/dYIoWGoNdho",
      videoTitle: "Page Replacement Algorithms (FIFO, LRU, Optimal)",
      videoChannel: "Neso Academy",
      prerequisites: ["Paging and Translation Lookaside Buffer (TLB)", "Page Fault Interrupt", "Queue & Hash Set data structures"],
      theory: {
        overview: "Demand paging loads pages into memory on reference. If no free frame exists, a victim page is swapped out based on temporal locality.",
        keyConcepts: [
          { title: "FIFO Anomaly (Belady's Anomaly)", desc: "A phenomenon where increasing page frames causes more page faults in FIFO." },
          { title: "LRU Replacement", desc: "Exploits temporal locality by evicting the page unused for the longest past time." },
          { title: "Page Fault Rate", desc: "Ratio of page faults to total memory references." }
        ],
        complexities: [
          { operation: "LRU Cache Replacement", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(Frames)" }
        ],
        realWorldApplications: [
          "Linux kernel Swappiness memory subsystem",
          "Web browser cache eviction (HTTP caching)",
          "Database query buffer pool (InnoDB buffer)"
        ]
      },
      procedure: [
        "1. Input the page reference string and number of physical frames.",
        "2. For FIFO: Use circular queue to replace the oldest frame on page fault.",
        "3. For LRU: Maintain timestamp counters to replace the frame with the oldest reference time.",
        "4. Print frame state after each reference step and calculate total Page Faults."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

int main() {
    int frames = 3, pages[] = {7, 0, 1, 2, 0, 3, 0, 4, 2, 3};
    int n = sizeof(pages)/sizeof(pages[0]);
    int temp[3] = {-1, -1, -1}, faults = 0;

    for (int i = 0; i < n; i++) {
        int page = pages[i], found = 0;
        for (int j = 0; j < frames; j++) {
            if (temp[j] == page) { found = 1; break; }
        }
        if (!found) {
            temp[faults % frames] = page;
            faults++;
        }
    }
    printf("Total FIFO Page Faults: %d\\n", faults);
    return 0;
}`
      },
      leetcodeProblems: [
        {
          id: 146,
          title: "LRU Cache",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/lru-cache/",
          description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache in O(1) time.",
          approach: "Doubly Linked List + HashMap for O(1) get and put operations.",
          javaSnippet: `class LRUCache {
    private class Node { int k, v; Node prev, next; Node(int k, int v){this.k=k; this.v=v;} }
    private Map<Integer, Node> map = new HashMap<>();
    private int cap;
    private Node head = new Node(0,0), tail = new Node(0,0);

    public LRUCache(int capacity) { this.cap = capacity; head.next = tail; tail.prev = head; }
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key); remove(node); insert(node);
        return node.v;
    }
    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        if (map.size() == cap) remove(tail.prev);
        insert(new Node(key, value));
    }
    private void remove(Node n) { map.remove(n.k); n.prev.next = n.next; n.next.prev = n.prev; }
    private void insert(Node n) { map.put(n.k, n); n.next = head.next; n.next.prev = n; head.next = n; n.prev = head; }
}`
        }
      ],
      expectedOutput: `Page Stream: [7, 0, 1, 2, 0, 3, 0, 4, 2, 3]
Physical Frames: 3
Total FIFO Page Faults: 8
Total LRU Page Faults: 6
Hit Ratio: 40.0%`,
      targetAudience: {
        ug: ["B.Tech AI & DS 4th Sem"],
        pg: ["Memory Systems"]
      }
    }
  },
  {
    id: "exp-os-5",
    labId: "operating-systems",
    title: "File Systems: Indexed and Linked File Allocation",
    slug: "file-allocation-table",
    difficulty: "Intermediate",
    category: "Operating Systems",
    estimatedMinutes: 20,
    rating: 4.89,
    ratingsCount: 220,
    simulator: "custom",
    quizId: "file-allocation-quiz",
    sections: {
      introduction: "File allocation strategies define how disk blocks are assigned to files on storage devices, balancing direct access speed, external fragmentation, and index block overhead.",
      objective: "Simulate Sequential, Linked, and Indexed file allocation in C, handling direct block pointers and file directory tables.",
      videoUrl: "https://www.youtube-nocookie.com/embed/vYp4OmD3Zz8",
      videoTitle: "File Allocation Methods in OS",
      videoChannel: "Neso Academy",
      prerequisites: ["Disk block addressing", "Inodes and Directory structures", "Dynamic linked lists"],
      theory: {
        overview: "Operating systems allocate secondary storage blocks to maximize read/write throughput while preventing file fragmentation.",
        keyConcepts: [
          { title: "Contiguous Allocation", desc: "Fast sequential access but causes severe external disk fragmentation." },
          { title: "Linked Allocation", desc: "Eliminates fragmentation by chaining blocks with pointers; slow random seeking." },
          { title: "Indexed Allocation (Inode)", desc: "Brings all block pointers into an Index Block for fast direct random access." }
        ],
        complexities: [
          { operation: "Indexed Block Seek", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(File Size / Block Size)" }
        ],
        realWorldApplications: [
          "Linux Ext4 Inode file allocation",
          "Windows NTFS Master File Table (MFT)",
          "FAT32 File Allocation Tables in flash storage"
        ]
      },
      procedure: [
        "1. Create a simulated disk storage array of N contiguous sectors.",
        "2. For Indexed allocation: Allocate an Index Block containing pointers to scattered data blocks.",
        "3. Verify no block collision occurs during multi-file allocation.",
        "4. Print the File Allocation Table mapping each file to its assigned disk blocks."
      ],
      sampleCode: {
        language: "c",
        code: `#include <stdio.h>

struct File {
    char name[20];
    int index_block;
    int blocks[10];
    int size;
};

int main() {
    struct File f1 = {"student_grades.dat", 4, {12, 13, 14, 18}, 4};
    printf("File Name: %s\\n", f1.name);
    printf("Index Block: %d\\n", f1.index_block);
    printf("Allocated Disk Blocks: ");
    for (int i = 0; i < f1.size; i++) printf("%d ", f1.blocks[i]);
    printf("\\nDirect Access Seek Time: O(1)\\n");
    return 0;
}`
      },
      leetcodeProblems: [
        {
          id: 588,
          title: "Design In-Memory File System",
          difficulty: "Hard",
          url: "https://leetcode.com/problems/design-in-memory-file-system/",
          description: "Design a data structure that simulates a file system with ls, mkdir, addContentToFile, and readContentFromFile.",
          approach: "Trie / Tree structure where nodes represent directories or files with content strings.",
          javaSnippet: `class FileSystem {
    class Node {
        boolean isFile;
        String content = "";
        Map<String, Node> children = new TreeMap<>();
    }
    private Node root = new Node();
}`
        }
      ],
      expectedOutput: `File Name: student_grades.dat
Index Block Sector: 4
Assigned Blocks: [12, 13, 14, 18]
File Allocation Table updated with zero fragmentation`,
      targetAudience: {
        ug: ["B.Tech AI & DS 4th Sem"],
        pg: ["Storage Architecture"]
      }
    }
  },

  // =========================================================================
  // ARTIFICIAL INTELLIGENCE LAB (AIL - AI3401)
  // =========================================================================
  {
    id: "exp-ai-1",
    labId: "artificial-intelligence",
    title: "Heuristic Search: A* Algorithm on 8-Puzzle Problem",
    slug: "astar-search-8puzzle",
    difficulty: "Intermediate",
    category: "Artificial Intelligence",
    estimatedMinutes: 30,
    rating: 4.97,
    ratingsCount: 390,
    simulator: "custom",
    quizId: "astar-search-quiz",
    sections: {
      introduction: "The A* search algorithm is an informed state-space graph search algorithm that finds the shortest path to a goal using evaluation function f(n) = g(n) + h(n).",
      objective: "Implement A* Search in Python to solve the 8-Puzzle sliding tile problem using Manhattan Distance heuristic and print optimal state moves.",
      videoUrl: "https://www.youtube-nocookie.com/embed/Jc7vlAzOigA",
      videoTitle: "A* Search Algorithm Tutorial",
      videoChannel: "Computerphile",
      prerequisites: ["Python OOP", "State space graph representation", "Priority Queues / Min-Heaps"],
      theory: {
        overview: "A* guarantees completeness and optimality when the heuristic function h(n) is admissible (never overestimates remaining distance) and consistent.",
        keyConcepts: [
          { title: "Evaluation Function f(n)", desc: "f(n) = g(n) (cost from start state) + h(n) (estimated cost to goal)." },
          { title: "Manhattan Distance Heuristic", desc: "Sum of absolute horizontal and vertical offsets for all misplaced tiles." },
          { title: "Open & Closed Lists", desc: "Open list stores candidate frontier nodes; Closed list tracks visited states to avoid cycles." }
        ],
        complexities: [
          { operation: "A* Priority Queue Step", best: "O(d)", avg: "O(b^d)", worst: "O(b^d)", space: "O(b^d)" }
        ],
        realWorldApplications: [
          "GPS Navigation & Google Maps shortest route computation",
          "Robotics path planning in obstacle grids",
          "NPC movement in video game engines (Unity / Unreal)"
        ]
      },
      procedure: [
        "1. Define initial 3x3 board state and goal 3x3 state.",
        "2. Compute Manhattan distance heuristic for the start node.",
        "3. Push start state into priority queue with priority `f = g + h`.",
        "4. Pop minimum-cost state, generate valid sliding tile successor moves (Up, Down, Left, Right).",
        "5. Repeat until goal state is reached, and reconstruct the solution trajectory."
      ],
      sampleCode: {
        language: "python",
        code: `import heapq

class PuzzleState:
    def __init__(self, board, g=0, parent=None):
        self.board = board
        self.g = g
        self.parent = parent
        self.h = self.calculate_manhattan()
        self.f = self.g + self.h

    def calculate_manhattan(self):
        dist = 0
        for i in range(3):
            for j in range(3):
                val = self.board[i][j]
                if val != 0:
                    tx, ty = divmod(val - 1, 3)
                    dist += abs(i - tx) + abs(j - ty)
        return dist

    def __lt__(self, other):
        return self.f < other.f

print("A* Heuristic Search Engine Initialized")`
      },
      leetcodeProblems: [
        {
          id: 773,
          title: "Sliding Puzzle",
          difficulty: "Hard",
          url: "https://leetcode.com/problems/sliding-puzzle/",
          description: "Solve a 2x3 sliding puzzle board returning the least number of moves.",
          approach: "BFS or A* search exploring state transitions using string hashing.",
          javaSnippet: `class Solution {
    public int slidingPuzzle(int[][] board) {
        String target = "123450";
        StringBuilder sb = new StringBuilder();
        for (int[] r : board) for (int n : r) sb.append(n);
        String start = sb.toString();
        int[][] dirs = {{1,3},{0,2,4},{1,5},{0,4},{1,3,5},{2,4}};
        Queue<String> q = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        q.offer(start); visited.add(start);
        int steps = 0;
        while (!q.isEmpty()) {
            int sz = q.size();
            while (sz-- > 0) {
                String cur = q.poll();
                if (cur.equals(target)) return steps;
                int zero = cur.indexOf('0');
                for (int next : dirs[zero]) {
                    char[] arr = cur.toCharArray();
                    arr[zero] = arr[next]; arr[next] = '0';
                    String nextStr = new String(arr);
                    if (visited.add(nextStr)) q.offer(nextStr);
                }
            }
            steps++;
        }
        return -1;
    }
}`
        }
      ],
      expectedOutput: `Initial State Manhattan Distance: 4
Step 1: Move Blank Right -> f(n) = 3
Step 2: Move Blank Down  -> f(n) = 2
Step 3: Move Blank Right -> f(n) = 0 (Goal State Achieved!)
Optimal Solution Steps: 3`,
      targetAudience: {
        ug: ["B.Tech AI & DS 5th Sem — AI3401 Artificial Intelligence Lab"],
        pg: ["Autonomous Intelligence"]
      }
    }
  },
  {
    id: "exp-ai-2",
    labId: "artificial-intelligence",
    title: "Game Theory: Minimax Algorithm with Alpha-Beta Pruning",
    slug: "minimax-alpha-beta-tictactoe",
    difficulty: "Advanced",
    category: "Artificial Intelligence",
    estimatedMinutes: 30,
    rating: 4.96,
    ratingsCount: 350,
    simulator: "custom",
    quizId: "minimax-quiz",
    sections: {
      introduction: "Adversarial game trees model decision-making in 2-player zero-sum perfect information games. Minimax explores optimal outcomes while Alpha-Beta pruning eliminates subtrees that cannot influence the final decision.",
      objective: "Implement an unbeatable Tic-Tac-Toe AI player in Python using Minimax and Alpha-Beta pruning branch cutoffs.",
      videoUrl: "https://www.youtube-nocookie.com/embed/l-hh51ncgDI",
      videoTitle: "Minimax Algorithm with Alpha Beta Pruning",
      videoChannel: "Sebastian Lague",
      prerequisites: ["Recursive tree traversal", "Game theory utility functions", "Zero-sum game concepts"],
      theory: {
        overview: "MAX player chooses moves that maximize the payoff utility; MIN player chooses moves that minimize MAX's payoff.",
        keyConcepts: [
          { title: "Alpha (α)", desc: "The highest utility choice found so far along the path for MAX (initialized to -∞)." },
          { title: "Beta (β)", desc: "The lowest utility choice found so far along the path for MIN (initialized to +∞)." },
          { title: "Pruning Condition", desc: "Whenever α >= β, the current branch is pruned immediately." }
        ],
        complexities: [
          { operation: "Alpha-Beta Search", best: "O(b^(d/2))", avg: "O(b^(3d/4))", worst: "O(b^d)", space: "O(d)" }
        ],
        realWorldApplications: [
          "Chess engines (Stockfish evaluation trees)",
          "Checkers / Connect-4 AI agents",
          "Automated financial trading strategy hedging"
        ]
      },
      procedure: [
        "1. Model Tic-Tac-Toe 3x3 board state with symbols 'X', 'O', and ' '.",
        "2. Define utility terminal evaluator (+10 for AI win, -10 for Human win, 0 for Draw).",
        "3. Recursively simulate all valid moves for MAX and MIN players.",
        "4. Apply Alpha-Beta pruning: terminate loop early when `beta <= alpha`.",
        "5. Select move with the maximum minimax score."
      ],
      sampleCode: {
        language: "python",
        code: `def minimax(board, depth, is_max, alpha, beta):
    score = evaluate(board)
    if score == 10: return score - depth
    if score == -10: return score + depth
    if not is_moves_left(board): return 0

    if is_max:
        best = -1000
        for r in range(3):
            for c in range(3):
                if board[r][c] == ' ':
                    board[r][c] = 'X'
                    best = max(best, minimax(board, depth + 1, False, alpha, beta))
                    board[r][c] = ' '
                    alpha = max(alpha, best)
                    if beta <= alpha: break
        return best
    else:
        best = 1000
        for r in range(3):
            for c in range(3):
                if board[r][c] == ' ':
                    board[r][c] = 'O'
                    best = min(best, minimax(board, depth + 1, True, alpha, beta))
                    board[r][c] = ' '
                    beta = min(beta, best)
                    if beta <= alpha: break
        return best`
      },
      leetcodeProblems: [
        {
          id: 292,
          title: "Nim Game",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/nim-game/",
          description: "Determine if you can win the Nim game given n stones.",
          approach: "Game theory modular arithmetic: return n % 4 != 0.",
          javaSnippet: `class Solution {
    public boolean canWinNim(int n) { return n % 4 != 0; }
}`
        }
      ],
      expectedOutput: `Board State:
X | O | X
O | X |  
  |   | O
AI (X) Evaluates best move: Row 1, Col 2 (Score: +9)
Total nodes visited: 142 (Pruned 68% of search tree)`,
      targetAudience: {
        ug: ["B.Tech AI & DS 5th Sem"],
        pg: ["Game Theory & AI"]
      }
    }
  },
  {
    id: "exp-ai-3",
    labId: "artificial-intelligence",
    title: "Constraint Satisfaction: N-Queens Backtracking Problem",
    slug: "nqueens-backtracking-csp",
    difficulty: "Intermediate",
    category: "Artificial Intelligence",
    estimatedMinutes: 25,
    rating: 4.95,
    ratingsCount: 320,
    simulator: "custom",
    quizId: "nqueens-quiz",
    sections: {
      introduction: "Constraint Satisfaction Problems (CSP) identify variable assignments from discrete domains that satisfy a collection of mutual constraints simultaneously.",
      objective: "Implement N-Queens CSP solver in Python using recursive backtracking and constraint propagation to place N non-attacking queens on an N×N grid.",
      videoUrl: "https://www.youtube-nocookie.com/embed/wGbuCyNpxIg",
      videoTitle: "N Queens Problem using Backtracking",
      videoChannel: "Abdul Bari",
      prerequisites: ["Backtracking recursion", "Bitmasking or Set operations", "Constraint satisfaction concepts"],
      theory: {
        overview: "N-Queens assigns queen coordinates such that no two queens share the same row, column, positive diagonal (r + c = constant), or negative diagonal (r - c = constant).",
        keyConcepts: [
          { title: "Column Constraint", desc: "No two queens occupy the same column index c." },
          { title: "Diagonal Constraints", desc: "Pos Diag (r + c) and Neg Diag (r - c) must remain distinct." },
          { title: "Backtracking Pruning", desc: "Aborts recursive branch immediately upon detecting constraint conflict." }
        ],
        complexities: [
          { operation: "N-Queens Backtracking", best: "O(N)", avg: "O(N!)", worst: "O(N!)", space: "O(N)" }
        ],
        realWorldApplications: [
          "VLSI circuit chip component placement",
          "University exam timetabling & class scheduling",
          "Airline flight crew roster scheduling"
        ]
      },
      procedure: [
        "1. Initialize N×N board with empty dots.",
        "2. Maintain sets for occupied columns, positive diagonals (r + c), and negative diagonals (r - c).",
        "3. For row r from 0 to N-1, iterate column c from 0 to N-1.",
        "4. If column and diagonals are unconstrained, place Queen 'Q' and recurse to row `r + 1`.",
        "5. Upon reaching row N, record board configuration; backtrack to explore alternative placements."
      ],
      sampleCode: {
        language: "python",
        code: `def solve_n_queens(n):
    board = [["."] * n for _ in range(n)]
    solutions = []
    cols, pos_diag, neg_diag = set(), set(), set()

    def backtrack(r):
        if r == n:
            solutions.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:
                continue
            cols.add(c); pos_diag.add(r + c); neg_diag.add(r - c)
            board[r][c] = "Q"
            backtrack(r + 1)
            cols.remove(c); pos_diag.remove(r + c); neg_diag.remove(r - c)
            board[r][c] = "."

    backtrack(0)
    return solutions

print("Found", len(solve_n_queens(4)), "distinct solutions for N=4")`
      },
      leetcodeProblems: [
        {
          id: 51,
          title: "N-Queens",
          difficulty: "Hard",
          url: "https://leetcode.com/problems/n-queens/",
          description: "Return all distinct board solutions to the N-Queens puzzle.",
          approach: "Recursive backtracking maintaining column and diagonal constraint sets.",
          javaSnippet: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] r : board) Arrays.fill(r, '.');
        backtrack(0, board, res, new boolean[n], new boolean[2*n], new boolean[2*n]);
        return res;
    }
    private void backtrack(int r, char[][] b, List<List<String>> res, boolean[] c, boolean[] d1, boolean[] d2) {
        if (r == b.length) {
            List<String> s = new ArrayList<>();
            for (char[] row : b) s.add(new String(row));
            res.add(s); return;
        }
        for (int col = 0; col < b.length; col++) {
            int id1 = r + col, id2 = r - col + b.length;
            if (c[col] || d1[id1] || d2[id2]) continue;
            b[r][col] = 'Q'; c[col] = d1[id1] = d2[id2] = true;
            backtrack(r + 1, b, res, c, d1, d2);
            b[r][col] = '.'; c[col] = d1[id1] = d2[id2] = false;
        }
    }
}`
        }
      ],
      expectedOutput: `4-Queens Solution 1:
. Q . .
. . . Q
Q . . .
. . Q .

4-Queens Solution 2:
. . Q .
Q . . .
. . . Q
. Q . .
Total Solutions: 2`,
      targetAudience: {
        ug: ["B.Tech AI & DS 5th Sem"],
        pg: ["Constraint Programming"]
      }
    }
  },
  {
    id: "exp-ai-4",
    labId: "artificial-intelligence",
    title: "Knowledge Representation: Forward & Backward Chaining Expert System",
    slug: "expert-system-forward-chaining",
    difficulty: "Intermediate",
    category: "Artificial Intelligence",
    estimatedMinutes: 25,
    rating: 4.93,
    ratingsCount: 290,
    simulator: "custom",
    quizId: "expert-systems-quiz",
    sections: {
      introduction: "Expert systems simulate human subject-matter expert reasoning using a knowledge base of production rules (IF-THEN) and an inference engine.",
      objective: "Build a Medical Diagnostic Expert System in Python using Forward Chaining to deduce patient diagnoses from observed clinical symptoms.",
      videoUrl: "https://www.youtube-nocookie.com/embed/fI8b_k_H6n4",
      videoTitle: "Expert Systems and Inference Engines in AI",
      videoChannel: "Gate Smashers",
      prerequisites: ["Propositional Logic", "Set theory in Python", "Production Rule architectures"],
      theory: {
        overview: "Inference engines apply logical modus ponens on observed facts to fire matched production rules until a final goal hypothesis is reached.",
        keyConcepts: [
          { title: "Knowledge Base", desc: "Declarative rules: IF (Fever AND Rash) THEN Chickenpox." },
          { title: "Working Memory", desc: "Dynamic list of verified symptoms and facts currently observed." },
          { title: "Forward Chaining", desc: "Data-driven bottom-up inference deriving conclusions from initial facts." }
        ],
        complexities: [
          { operation: "Rule Fire Loop", best: "O(1)", avg: "O(Rules * Facts)", worst: "O(Rules * Facts)", space: "O(Facts)" }
        ],
        realWorldApplications: [
          "Automated medical symptom checker systems",
          "Automotive diagnostic trouble code (OBD-II) analyzers",
          "Loan credit risk automated underwriting engines"
        ]
      },
      procedure: [
        "1. Define domain production rules containing condition sets and inferred conclusions.",
        "2. Input patient symptom facts into working memory.",
        "3. Forward chaining loop: scan rules whose conditions are a subset of working memory.",
        "4. Add newly derived conclusions to working memory; fire matching downstream rules.",
        "5. Terminate when no new rules fire and output the final diagnosis."
      ],
      sampleCode: {
        language: "python",
        code: `class ExpertSystem:
    def __init__(self):
        self.rules = [
            ({"fever", "cough"}, "respiratory_infection"),
            ({"respiratory_infection", "loss_of_taste"}, "covid_19"),
            ({"fever", "rash"}, "measles"),
            ({"fever", "chills", "sweating"}, "malaria")
        ]

    def diagnose(self, patient_symptoms):
        facts = set(patient_symptoms)
        inferred = True
        while inferred:
            inferred = False
            for conditions, result in self.rules:
                if conditions.issubset(facts) and result not in facts:
                    facts.add(result)
                    print(f"Rule Fired: {conditions} -> Diagnosed: {result}")
                    inferred = True
        return facts

es = ExpertSystem()
results = es.diagnose(["fever", "cough", "loss_of_taste"])
print("Final Inferred Knowledge Base:", results)`
      },
      leetcodeProblems: [
        {
          id: 399,
          title: "Evaluate Division",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/evaluate-division/",
          description: "Given equations and values, evaluate queries using transitive graph path products.",
          approach: "Graph DFS / Union-Find tracking ratio weights between connected variable nodes.",
          javaSnippet: `class Solution {
    public double[] calcEquation(List<List<String>> eq, double[] val, List<List<String>> q) {
        Map<String, Map<String, Double>> g = new HashMap<>();
        for (int i = 0; i < eq.size(); i++) {
            String u = eq.get(i).get(0), v = eq.get(i).get(1);
            g.computeIfAbsent(u, k -> new HashMap<>()).put(v, val[i]);
            g.computeIfAbsent(v, k -> new HashMap<>()).put(u, 1.0 / val[i]);
        }
        double[] ans = new double[q.size()];
        for (int i = 0; i < q.size(); i++) ans[i] = dfs(q.get(i).get(0), q.get(i).get(1), new HashSet<>(), g);
        return ans;
    }
    private double dfs(String src, String dst, Set<String> vis, Map<String, Map<String, Double>> g) {
        if (!g.containsKey(src)) return -1.0;
        if (src.equals(dst)) return 1.0;
        vis.add(src);
        for (Map.Entry<String, Double> nxt : g.get(src).entrySet()) {
            if (!vis.contains(nxt.getKey())) {
                double sub = dfs(nxt.getKey(), dst, vis, g);
                if (sub != -1.0) return nxt.getValue() * sub;
            }
        }
        return -1.0;
    }
}`
        }
      ],
      expectedOutput: `Patient Symptoms: ['fever', 'cough', 'loss_of_taste']
Rule Fired: {'fever', 'cough'} -> Inferred: respiratory_infection
Rule Fired: {'respiratory_infection', 'loss_of_taste'} -> Inferred: covid_19
Final Confirmed Diagnosis: covid_19 (Confidence: 98.5%)`,
      targetAudience: {
        ug: ["B.Tech AI & DS 5th Sem"],
        pg: ["Knowledge Engineering"]
      }
    }
  },
  {
    id: "exp-ai-5",
    labId: "artificial-intelligence",
    title: "State Space Search: Water Jug Problem with Production Rules",
    slug: "water-jug-problem-ai",
    difficulty: "Beginner",
    category: "Artificial Intelligence",
    estimatedMinutes: 20,
    rating: 4.91,
    ratingsCount: 260,
    simulator: "custom",
    quizId: "water-jug-quiz",
    sections: {
      introduction: "The Water Jug problem is a foundational state-space problem requiring measuring an exact target volume of water using two jugs of fixed integer capacities.",
      objective: "Formulate water jug production rules and implement BFS/DFS search in Python to find the minimal sequence of pouring operations.",
      videoUrl: "https://www.youtube-nocookie.com/embed/09_LlHjoEiY",
      videoTitle: "Water Jug Problem in AI",
      videoChannel: "Gate Smashers",
      prerequisites: ["Breadth-First Search", "GCD and Bezout's identity", "State hashing"],
      theory: {
        overview: "A solution exists if and only if the target capacity d is a multiple of gcd(jug1_capacity, jug2_capacity).",
        keyConcepts: [
          { title: "State Space Representation", desc: "Ordered tuple (x, y) where x in [0, Jug1] and y in [0, Jug2]." },
          { title: "Production Operations", desc: "Fill Jug 1, Fill Jug 2, Empty Jug 1, Empty Jug 2, Pour 1->2, Pour 2->1." },
          { title: "Optimal Path", desc: "Shortest step path to state (d, _) or (_, d)." }
        ],
        complexities: [
          { operation: "BFS State Space", best: "O(1)", avg: "O(Jug1 * Jug2)", worst: "O(Jug1 * Jug2)", space: "O(Jug1 * Jug2)" }
        ],
        realWorldApplications: [
          "Discrete event simulation modeling",
          "Automated chemical reagent batching in pharmaceutical plants",
          "Logic puzzle solver algorithms"
        ]
      },
      procedure: [
        "1. Define capacities J1 (e.g. 4L), J2 (e.g. 3L), and target (e.g. 2L).",
        "2. Queue initial state `(0, 0)`.",
        "3. For each state, generate all 6 production rule transitions.",
        "4. Filter out previously visited `(x, y)` states using a set.",
        "5. Terminate when either jug contains the target amount."
      ],
      sampleCode: {
        language: "python",
        code: `from collections import deque

def water_jug_bfs(cap1, cap2, target):
    visited = set()
    queue = deque([((0, 0), [])])

    while queue:
        (j1, j2), path = queue.popleft()
        if j1 == target or j2 == target:
            return path + [(j1, j2)]
        if (j1, j2) in visited:
            continue
        visited.add((j1, j2))

        transitions = [
            ((cap1, j2), "Fill Jug 1"),
            ((j1, cap2), "Fill Jug 2"),
            ((0, j2), "Empty Jug 1"),
            ((j1, 0), "Empty Jug 2"),
            ((j1 - min(j1, cap2 - j2), j2 + min(j1, cap2 - j2)), "Pour 1 -> 2"),
            ((j1 + min(j2, cap1 - j1), j2 - min(j2, cap1 - j1)), "Pour 2 -> 1")
        ]

        for next_state, action in transitions:
            if next_state not in visited:
                queue.append((next_state, path + [(j1, j2)]))

print("Water Jug Solution Steps:", water_jug_bfs(4, 3, 2))`
      },
      leetcodeProblems: [
        {
          id: 365,
          title: "Water and Jug Problem",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/water-and-jug-problem/",
          description: "Determine if it is possible to measure exactly targetCapacity liters using two jugs.",
          approach: "Math Bezout identity: return target <= j1 + j2 && target % gcd(j1, j2) == 0.",
          javaSnippet: `class Solution {
    public boolean canMeasureWater(int j1, int j2, int target) {
        if (target > j1 + j2) return false;
        if (target == 0 || target == j1 + j2) return true;
        return target % gcd(j1, j2) == 0;
    }
    private int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
}`
        }
      ],
      expectedOutput: `Target: 2 Liters using Jug1(4L) & Jug2(3L)
Step 0: (0, 0) - Initial state
Step 1: (0, 3) - Fill Jug 2
Step 2: (3, 0) - Pour Jug 2 -> Jug 1
Step 3: (3, 3) - Fill Jug 2
Step 4: (4, 2) - Pour Jug 2 -> Jug 1 (Target 2L achieved in Jug 2!)`,
      targetAudience: {
        ug: ["B.Tech AI & DS 5th Sem"],
        pg: ["AI Problem Solving"]
      }
    }
  },

  // =========================================================================
  // BIG DATA ANALYTICS LAB (BDAL - CS8711)
  // =========================================================================
  {
    id: "exp-bd-1",
    labId: "big-data-analytics",
    title: "Hadoop HDFS Architecture & Distributed File Management",
    slug: "hadoop-hdfs-cluster-management",
    difficulty: "Intermediate",
    category: "Big Data Analytics",
    estimatedMinutes: 25,
    rating: 4.92,
    ratingsCount: 260,
    simulator: "custom",
    quizId: "hdfs-quiz",
    sections: {
      introduction: "Hadoop Distributed File System (HDFS) provides scalable, fault-tolerant, high-throughput data access across clusters of commodity hardware nodes.",
      objective: "Configure HDFS cluster nodes, ingest multi-gigabyte datasets, inspect block allocation metadata across DataNodes, and adjust replication factors.",
      videoUrl: "https://www.youtube-nocookie.com/embed/1vbXmCrkT3Y",
      videoTitle: "Hadoop HDFS Architecture Tutorial",
      videoChannel: "Edureka",
      prerequisites: ["Linux CLI commands", "SSH keys setup", "Distributed file system concepts"],
      theory: {
        overview: "HDFS splits files into 128MB block chunks and distributes them across DataNodes with automated 3x replication for fault resilience.",
        keyConcepts: [
          { title: "NameNode Master", desc: "Maintains file metadata, inode directory trees, and block-to-DataNode mappings in RAM." },
          { title: "DataNode Worker", desc: "Stores physical data blocks on local disk and sends periodic Heartbeat / Block Reports." },
          { title: "Rack Awareness", desc: "Places block replicas across distinct network racks to survive power/switch failures." }
        ],
        complexities: [
          { operation: "Block Streaming Read", best: "O(1)", avg: "O(Block Size)", worst: "O(Block Size)", space: "O(Metadata RAM)" }
        ],
        realWorldApplications: [
          "Petabyte-scale data lakes at Uber & Netflix",
          "Genomic sequencing raw data storage",
          "Financial audit log compliance archiving"
        ]
      },
      procedure: [
        "1. Format NameNode via `hdfs namenode -format`.",
        "2. Start DFS daemons using `start-dfs.sh`.",
        "3. Ingest data: `hdfs dfs -mkdir /data && hdfs dfs -put sample.csv /data/`.",
        "4. Inspect block distribution via `hdfs fsck /data/sample.csv -files -blocks -locations`.",
        "5. Dynamically change replication factor via `hdfs dfs -setrep -w 3 /data/sample.csv`."
      ],
      sampleCode: {
        language: "bash",
        code: `#!/bin/bash
# HDFS Cluster Verification Script
echo "=== Checking HDFS Daemons ==="
jps | grep -E "NameNode|DataNode|SecondaryNameNode"

echo "=== Creating HDFS Directory ==="
hdfs dfs -mkdir -p /user/analytics/datasets

echo "=== Uploading Dataset with 3x Replication ==="
hdfs dfs -put -f ./transactions_2026.csv /user/analytics/datasets/
hdfs dfs -setrep -w 3 /user/analytics/datasets/transactions_2026.csv

echo "=== Cluster Block Health Report ==="
hdfs dfsadmin -report | head -n 15`
      },
      leetcodeProblems: [
        {
          id: 1166,
          title: "Design File System",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/design-file-system/",
          description: "Design a path-based file system supporting createPath and get.",
          approach: "Trie with HashMap children representing path segment directories.",
          javaSnippet: `class FileSystem {
    Map<String, Integer> paths = new HashMap<>();
    public FileSystem() { paths.put("", 0); }
    public boolean createPath(String path, int value) {
        int idx = path.lastIndexOf('/');
        String parent = path.substring(0, idx);
        if (!paths.containsKey(parent) || paths.containsKey(path)) return false;
        paths.put(path, value); return true;
    }
    public int get(String path) { return paths.getOrDefault(path, -1); }
}`
        }
      ],
      expectedOutput: `HDFS NameNode Status: HEALTHY
Total Capacity: 2.40 TB
Configured DataNodes: 4 Active
Block size: 128 MB | Total Blocks Created: 8
Block Status: HEALTHY (Replication factor: 3x verified)`,
      targetAudience: {
        ug: ["B.Tech AI & DS 7th Sem — CS8711 Big Data Analytics Lab"],
        pg: ["Distributed Computing Systems"]
      }
    }
  },
  {
    id: "exp-bd-2",
    labId: "big-data-analytics",
    title: "Distributed Computing: MapReduce Word Count & Matrix Aggregation",
    slug: "mapreduce-wordcount-processing",
    difficulty: "Intermediate",
    category: "Big Data Analytics",
    estimatedMinutes: 30,
    rating: 4.94,
    ratingsCount: 295,
    simulator: "custom",
    quizId: "mapreduce-quiz",
    sections: {
      introduction: "MapReduce is a distributed programming paradigm that processes massive unstructured datasets in parallel across thousands of cluster nodes.",
      objective: "Write and execute MapReduce Mapper and Reducer programs in Python streaming to perform distributed tokenization, word count, and inverted indexing.",
      videoUrl: "https://www.youtube-nocookie.com/embed/j1u9P4z9h7E",
      videoTitle: "MapReduce Explained with Example",
      videoChannel: "Edureka",
      prerequisites: ["Python standard I/O (sys.stdin)", "Key-Value pairs", "Hadoop Streaming jar"],
      theory: {
        overview: "MapReduce splits input splits, invokes user Mappers in parallel, Shuffles and Sorts keys across the network, and aggregates outputs via Reducers.",
        keyConcepts: [
          { title: "Map Phase", desc: "Transforms raw lines into key-value pairs (e.g. `(word, 1)`)." },
          { title: "Shuffle & Sort", desc: "Clusters and sorts all values sharing identical keys before dispatching to Reducers." },
          { title: "Reduce Phase", desc: "Aggregates values for each unique key to produce final summarized results." }
        ],
        complexities: [
          { operation: "MapReduce Cluster Job", best: "O(N/K)", avg: "O(N/K + log K)", worst: "O(N)", space: "O(K)" }
        ],
        realWorldApplications: [
          "Web search engine web-crawler inverted indexing (Google)",
          "Log analysis and security threat correlation",
          "Large-scale TF-IDF natural language scoring"
        ]
      },
      procedure: [
        "1. Write `mapper.py` reading lines from standard input and emitting `word\\t1`.",
        "2. Write `reducer.py` aggregating counts for consecutive identical keys.",
        "3. Test locally using Linux pipeline: `cat input.txt | python3 mapper.py | sort | python3 reducer.py`.",
        "4. Execute on Hadoop Cluster using `hadoop-streaming.jar`."
      ],
      sampleCode: {
        language: "python",
        code: `# mapper.py
import sys

for line in sys.stdin:
    words = line.strip().split()
    for word in words:
        clean_word = word.lower().strip(".,!?:;\\"'")
        if clean_word:
            print(f"{clean_word}\\t1")

# reducer.py
import sys

current_word = None
current_count = 0

for line in sys.stdin:
    word, count = line.strip().split('\\t')
    count = int(count)
    if current_word == word:
        current_count += count
    else:
        if current_word:
            print(f"{current_word}\\t{current_count}")
        current_word = word
        current_count = count

if current_word:
    print(f"{current_word}\\t{current_count}")`
      },
      leetcodeProblems: [
        {
          id: 692,
          title: "Top K Frequent Words",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/top-k-frequent-words/",
          description: "Given an array of strings, return the k most frequent words.",
          approach: "HashMap for frequencies + Min-Heap PriorityQueue with alphabetical tie-breaking.",
          javaSnippet: `class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> map = new HashMap<>();
        for (String w : words) map.put(w, map.getOrDefault(w, 0) + 1);
        PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> 
            map.get(a).equals(map.get(b)) ? b.compareTo(a) : map.get(a) - map.get(b));
        for (String w : map.keySet()) {
            pq.offer(w);
            if (pq.size() > k) pq.poll();
        }
        List<String> res = new ArrayList<>();
        while (!pq.isEmpty()) res.add(pq.poll());
        Collections.reverse(res);
        return res;
    }
}`
        }
      ],
      expectedOutput: `MapReduce Job Submitted to YARN
Job ID: job_1725001928_0001
Map 100% | Reduce 100%
analytics\t4182
bigdata\t3920
hadoop\t3410
pyspark\t3102
Total Processed Lines: 1,000,000 in 4.2 seconds`,
      targetAudience: {
        ug: ["B.Tech AI & DS 7th Sem"],
        pg: ["Big Data Processing"]
      }
    }
  },
  {
    id: "exp-bd-3",
    labId: "big-data-analytics",
    title: "In-Memory Analytics: PySpark DataFrames & Spark SQL",
    slug: "pyspark-dataframe-ecommerce",
    difficulty: "Intermediate",
    category: "Big Data Analytics",
    estimatedMinutes: 30,
    rating: 4.96,
    ratingsCount: 330,
    simulator: "custom",
    quizId: "pyspark-quiz",
    sections: {
      introduction: "Apache Spark is an ultra-fast in-memory distributed compute framework that outperforms legacy MapReduce by up to 100x through resilient DAG execution.",
      objective: "Perform large-scale e-commerce transaction analytics using PySpark DataFrames, grouped aggregations, and Spark SQL window queries.",
      videoUrl: "https://www.youtube-nocookie.com/embed/cLO7sQc1uoc",
      videoTitle: "PySpark Full Course for Beginners",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Python / Pandas syntax", "SQL GroupBy and Joins", "SparkSession initialization"],
      theory: {
        overview: "PySpark leverages the Catalyst query optimizer and Tungsten execution engine to compile DataFrame transformations into optimized Java bytecode.",
        keyConcepts: [
          { title: "Lazy Evaluation", desc: "Transformations build a DAG logical plan; computation executes only when an Action (e.g. `collect()`, `show()`) is called." },
          { title: "DataFrame API", desc: "Distributed structured collection of data organized into named columns with schema enforcement." },
          { title: "Spark Catalyst Optimizer", desc: "Automatically performs predicate pushdown, column pruning, and join reordering." }
        ],
        complexities: [
          { operation: "PySpark In-Memory Scan", best: "O(1)", avg: "O(N/Cores)", worst: "O(N)", space: "O(RAM Cache)" }
        ],
        realWorldApplications: [
          "Real-time fraud detection pipelines in banking",
          "Customer churn predictive modeling",
          "Ad-click attribution analytics at scale"
        ]
      },
      procedure: [
        "1. Initialize `SparkSession` with cluster configurations.",
        "2. Read 10GB CSV into DataFrame with `inferSchema=True`.",
        "3. Filter records, impute missing values, and group by category.",
        "4. Calculate average order value (AOV) and customer lifetime value (CLV).",
        "5. Write results into partitioned Parquet format."
      ],
      sampleCode: {
        language: "python",
        code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum, avg, count, desc

spark = SparkSession.builder \\
    .appName("ECommerceAnalytics") \\
    .config("spark.executor.memory", "4g") \\
    .getOrCreate()

# Load dataset
df = spark.read.csv("/data/ecommerce_orders.csv", header=True, inferSchema=True)

# Grouped Aggregation
category_stats = df.groupBy("category") \\
    .agg(
        count("order_id").alias("total_orders"),
        sum("amount").alias("total_revenue"),
        avg("amount").alias("avg_order_value")
    ) \\
    .filter(col("total_revenue") > 50000) \\
    .orderBy(desc("total_revenue"))

category_stats.show(5)
spark.stop()`
      },
      leetcodeProblems: [
        {
          id: 1429,
          title: "First Unique Number",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/first-unique-number/",
          description: "Given a stream of integers, implement a data structure to retrieve the first unique number in O(1).",
          approach: "Queue + Frequency HashMap to track uniqueness dynamically.",
          javaSnippet: `class FirstUnique {
    Queue<Integer> q = new LinkedList<>();
    Map<Integer, Integer> map = new HashMap<>();
    public FirstUnique(int[] nums) { for (int n : nums) add(n); }
    public int showFirstUnique() {
        while (!q.isEmpty() && map.get(q.peek()) > 1) q.poll();
        return q.isEmpty() ? -1 : q.peek();
    }
    public void add(int value) {
        map.put(value, map.getOrDefault(value, 0) + 1);
        q.offer(value);
    }
}`
        }
      ],
      expectedOutput: `+---------------+------------+---------------+---------------+
|category       |total_orders|total_revenue  |avg_order_value|
+---------------+------------+---------------+---------------+
|Electronics    |184200      |14205000.50    |77.11          |
|Fashion        |312500      |9450200.00     |30.24          |
|Home & Kitchen |94200       |4120300.25     |43.74          |
+---------------+------------+---------------+---------------+
Catalyst Physical Plan: HashAggregate -> Exchange -> HashAggregate`,
      targetAudience: {
        ug: ["B.Tech AI & DS 7th Sem"],
        pg: ["Data Engineering Systems"]
      }
    }
  },
  {
    id: "exp-bd-4",
    labId: "big-data-analytics",
    title: "Data Warehousing: Apache Hive Partitioned Tables & HQL",
    slug: "hive-data-warehousing-queries",
    difficulty: "Intermediate",
    category: "Big Data Analytics",
    estimatedMinutes: 25,
    rating: 4.88,
    ratingsCount: 230,
    simulator: "custom",
    quizId: "hive-quiz",
    sections: {
      introduction: "Apache Hive is a distributed data warehouse software built on top of Apache Hadoop for querying and managing petabytes of data using SQL-like HiveQL.",
      objective: "Design partitioned and bucketed Hive external tables, execute complex HQL analytical aggregations, and optimize query latency using partition pruning.",
      videoUrl: "https://www.youtube-nocookie.com/embed/5aQW7v573iU",
      videoTitle: "Apache Hive Architecture and Tutorial",
      videoChannel: "Edureka",
      prerequisites: ["SQL DDL/DML syntax", "HDFS storage paths", "Metastore concepts"],
      theory: {
        overview: "Hive converts declarative SQL queries into directed acyclic graphs of MapReduce, Tez, or Spark execution jobs automatically.",
        keyConcepts: [
          { title: "External vs Managed Tables", desc: "External tables preserve underlying HDFS data upon table DROP; managed tables delete data." },
          { title: "Partitioning", desc: "Divides table into sub-directories (e.g. `country=US/year=2026`) for rapid partition pruning." },
          { title: "Bucketing", desc: "Hashes columns into fixed number of files for accelerated Map-Side Joins." }
        ],
        complexities: [
          { operation: "Partition Pruned Scan", best: "O(1)", avg: "O(Partition Size)", worst: "O(Total Data)", space: "O(Metastore)" }
        ],
        realWorldApplications: [
          "Enterprise data warehousing reporting (OLAP)",
          "Daily ETL data lake ingestion pipelines",
          "Business Intelligence dashboard backend queries"
        ]
      },
      procedure: [
        "1. Create Hive external partitioned table with HDFS storage location.",
        "2. Load data dynamically into partitioned folders.",
        "3. Execute analytical queries using Window Functions (`RANK()`, `ROW_NUMBER()`).",
        "4. Inspect query plan via `EXPLAIN SELECT ...` to verify partition pruning."
      ],
      sampleCode: {
        language: "sql",
        code: `-- Create Partitioned Hive External Table
CREATE EXTERNAL TABLE IF NOT EXISTS customer_logs (
    user_id STRING,
    session_time INT,
    event_type STRING,
    device STRING
)
PARTITIONED BY (country STRING, log_date STRING)
STORED AS PARQUET
LOCATION '/user/hive/warehouse/customer_logs';

-- Analytical HiveQL Query with Window Function
SELECT 
    country,
    user_id,
    session_time,
    DENSE_RANK() OVER (PARTITION BY country ORDER BY session_time DESC) as rank
FROM customer_logs
WHERE country = 'IN' AND log_date = '2026-08-30'
LIMIT 10;`
      },
      leetcodeProblems: [
        {
          id: 185,
          title: "Department Top Three Salaries",
          difficulty: "Hard",
          url: "https://leetcode.com/problems/department-top-three-salaries/",
          description: "Find the employees who earn the top three unique salaries in each department.",
          approach: "SQL DENSE_RANK() window function partitioned by department.",
          javaSnippet: `SELECT Department, Employee, Salary
FROM (
    SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary,
           DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rnk
    FROM Employee e
    JOIN Department d ON e.departmentId = d.id
) ranked
WHERE rnk <= 3;`
        }
      ],
      expectedOutput: `Query ID = hive_20260830_0912
Total Map Tasks = 4, Total Reduce Tasks = 1
+---------+----------+--------------+-----+
| country | user_id  | session_time | rank|
+---------+----------+--------------+-----+
| IN      | usr_9812 | 4200         | 1   |
| IN      | usr_3141 | 3890         | 2   |
| IN      | usr_1102 | 3400         | 3   |
+---------+----------+--------------+-----+
Time taken: 3.14 seconds, Fetched: 3 row(s)`,
      targetAudience: {
        ug: ["B.Tech AI & DS 7th Sem"],
        pg: ["Data Warehousing"]
      }
    }
  },
  {
    id: "exp-bd-5",
    labId: "big-data-analytics",
    title: "NoSQL Analytics: MongoDB Aggregation Pipelines & Document Sharding",
    slug: "mongodb-bigdata-aggregations",
    difficulty: "Advanced",
    category: "Big Data Analytics",
    estimatedMinutes: 25,
    rating: 4.91,
    ratingsCount: 250,
    simulator: "custom",
    quizId: "mongodb-quiz",
    sections: {
      introduction: "MongoDB is a high-performance distributed NoSQL document database designed for high availability, automatic horizontal sharding, and real-time aggregations.",
      objective: "Deploy MongoDB document collections, configure cluster shard keys, and construct multi-stage aggregation pipelines for big data analytics.",
      videoUrl: "https://www.youtube-nocookie.com/embed/ofme2o29ngU",
      videoTitle: "MongoDB Aggregation Framework Tutorial",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["JSON / BSON structures", "Document database fundamentals", "Aggregation stages"],
      theory: {
        overview: "The MongoDB Aggregation Framework processes data records through declarative pipeline stages ($match, $group, $project, $lookup, $sort, $limit).",
        keyConcepts: [
          { title: "Sharding", desc: "Distributes collection documents across multiple replica shards using a Shard Key." },
          { title: "Pipeline Architecture", desc: "Data flows sequentially through stages, filtering and aggregating efficiently in RAM." },
          { title: "Compound Indexes", desc: "Accelerates multi-key document queries and aggregation sorts." }
        ],
        complexities: [
          { operation: "Indexed Sharded Query", best: "O(log N)", avg: "O(log N)", worst: "O(N)", space: "O(Index RAM)" }
        ],
        realWorldApplications: [
          "IoT sensor telematics time-series ingestion",
          "Real-time social media user feed aggregation",
          "Gaming player session analytics & leaderboards"
        ]
      },
      procedure: [
        "1. Connect to MongoDB instance via mongosh.",
        "2. Insert 500,000 simulated IoT telemetry documents.",
        "3. Construct multi-stage aggregation: `$match` active devices -> `$group` by location -> `$sort` by temperature.",
        "4. Create compound index to optimize pipeline execution speed."
      ],
      sampleCode: {
        language: "sql",
        code: `// MongoDB Aggregation Pipeline Script
db.sensor_telemetry.aggregate([
  {
    $match: {
      status: "ACTIVE",
      timestamp: { $gte: ISODate("2026-08-01T00:00:00Z") }
    }
  },
  {
    $group: {
      _id: "$sensor_location",
      avg_temperature: { $avg: "$temperature" },
      max_humidity: { $max: "$humidity" },
      reading_count: { $sum: 1 }
    }
  },
  {
    $project: {
      location: "$_id",
      avg_temperature: { $round: ["$avg_temperature", 2] },
      max_humidity: 1,
      reading_count: 1,
      _id: 0
    }
  },
  { $sort: { avg_temperature: -1 } },
  { $limit: 5 }
]);`
      },
      leetcodeProblems: [
        {
          id: 380,
          title: "Insert Delete GetRandom O(1)",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/insert-delete-getrandom-o1/",
          description: "Design a data structure that supports insert, delete, and getRandom in average O(1) time.",
          approach: "ArrayList + HashMap mapping value to array index.",
          javaSnippet: `class RandomizedSet {
    List<Integer> list = new ArrayList<>();
    Map<Integer, Integer> map = new HashMap<>();
    Random rand = new Random();
    public boolean insert(int val) {
        if (map.containsKey(val)) return false;
        map.put(val, list.size()); list.add(val); return true;
    }
    public boolean remove(int val) {
        if (!map.containsKey(val)) return false;
        int idx = map.get(val), last = list.get(list.size() - 1);
        list.set(idx, last); map.put(last, idx);
        list.remove(list.size() - 1); map.remove(val); return true;
    }
    public int getRandom() { return list.get(rand.nextInt(list.size())); }
}`
        }
      ],
      expectedOutput: `[
  { location: "Warehouse_North", avg_temperature: 32.45, max_humidity: 88, reading_count: 124000 },
  { location: "Warehouse_East",  avg_temperature: 29.10, max_humidity: 74, reading_count: 118000 },
  { location: "Server_Room_A",   avg_temperature: 18.20, max_humidity: 45, reading_count: 240000 }
]
Query execution time: 18ms (Utilized index: idx_status_timestamp)`,
      targetAudience: {
        ug: ["B.Tech AI & DS 7th Sem"],
        pg: ["NoSQL Databases"]
      }
    }
  },

  // =========================================================================
  // CLOUD SERVICE MANAGEMENT LAB (CSML - CS8811)
  // =========================================================================
  {
    id: "exp-csm-1",
    labId: "cloud-service-management",
    title: "Cloud Infrastructure: AWS EC2 Provisioning, Custom VPC & Security Groups",
    slug: "aws-ec2-vpc-infrastructure",
    difficulty: "Intermediate",
    category: "Cloud Computing",
    estimatedMinutes: 25,
    rating: 4.92,
    ratingsCount: 270,
    simulator: "custom",
    quizId: "aws-ec2-quiz",
    sections: {
      introduction: "Amazon Elastic Compute Cloud (Amazon EC2) provides scalable virtual computing capacity in the AWS cloud, allowing rapid deployment without upfront server hardware investments.",
      objective: "Provision an isolated Virtual Private Cloud (VPC), configure public/private subnets, launch an Ubuntu EC2 instance, and configure stateful Security Group firewall rules.",
      videoUrl: "https://www.youtube-nocookie.com/embed/2LaAJq1lB1Q",
      videoTitle: "AWS EC2 Tutorial for Beginners",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Basic networking (IP addresses, CIDR blocks, Subnets)", "SSH Keypair authentication", "AWS Console or CLI"],
      theory: {
        overview: "AWS Global Infrastructure spans Regions and Availability Zones. VPC isolates private workloads while Internet Gateways route public traffic.",
        keyConcepts: [
          { title: "EC2 Instance Types", desc: "Categorized by workload: General Purpose (t3, m5), Compute Optimized (c6g), Memory Optimized (r5)." },
          { title: "Security Groups", desc: "Virtual stateful firewalls controlling inbound and outbound traffic at the instance level." },
          { title: "Elastic IP (EIP)", desc: "Static IPv4 addresses allocated to cloud accounts for dynamic DNS routing." }
        ],
        complexities: [
          { operation: "Instance Launch", best: "O(1) (~60s)", avg: "90s", worst: "180s", space: "O(EBS Volume)" }
        ],
        realWorldApplications: [
          "Enterprise web application hosting",
          "High-performance computing (HPC) simulations",
          "Continuous Integration / Continuous Deployment (CI/CD) runners"
        ]
      },
      procedure: [
        "1. Create a custom VPC with CIDR `10.0.0.0/16` and Internet Gateway.",
        "2. Create Public Subnet `10.0.1.0/24` with automated public IP assignment.",
        "3. Configure Security Group allowing inbound SSH (port 22) and HTTP (port 80).",
        "4. Launch `t3.micro` instance using Ubuntu 22.04 LTS AMI.",
        "5. Connect via SSH: `ssh -i keypair.pem ubuntu@<Public-IP>` and deploy Nginx web server."
      ],
      sampleCode: {
        language: "bash",
        code: `#!/bin/bash
# AWS CLI Automated EC2 Provisioning
VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query 'Vpc.VpcId' --output text)
SUBNET_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.1.0/24 --query 'Subnet.SubnetId' --output text)

# Create Security Group
SG_ID=$(aws ec2 create-security-group --group-name "vlab-web-sg" --description "HTTP & SSH" --vpc-id $VPC_ID --query 'GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id $SG_ID --protocol tcp --port 80 --cidr 0.0.0.0/0

# Launch Instance
INSTANCE_ID=$(aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --count 1 --instance-type t3.micro --key-name vlab-key --security-group-ids $SG_ID --subnet-id $SUBNET_ID --query 'Instances[0].InstanceId' --output text)

echo "EC2 Instance launched: $INSTANCE_ID"`
      },
      leetcodeProblems: [
        {
          id: 535,
          title: "Encode and Decode TinyURL",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/encode-and-decode-tinyurl/",
          description: "Design a URL shortening service URL shortener mapping long URLs to short aliases.",
          approach: "Two-way HashMap mapping random alphanumeric keys to original URLs.",
          javaSnippet: `public class Codec {
    Map<String, String> map = new HashMap<>();
    public String encode(String longUrl) {
        String key = "http://tinyurl.com/" + longUrl.hashCode();
        map.put(key, longUrl); return key;
    }
    public String decode(String shortUrl) { return map.get(shortUrl); }
}`
        }
      ],
      expectedOutput: `VPC created: vpc-08129fa1 (CIDR 10.0.0.0/16)
Subnet created: subnet-0192a (Public 10.0.1.0/24)
Security Group created: sg-071a82 (Inbound: 22, 80)
Instance i-081b29a state: RUNNING (Public IP: 13.234.19.42)
Nginx default landing page responding with HTTP 200 OK`,
      targetAudience: {
        ug: ["B.Tech AI & DS 8th Sem — CS8811 Cloud Service Management Lab"],
        pg: ["Cloud Architecture"]
      }
    }
  },
  {
    id: "exp-csm-2",
    labId: "cloud-service-management",
    title: "Cloud Storage: AWS S3 Object Storage & Lifecycle Management Policies",
    slug: "aws-s3-lifecycle-management",
    difficulty: "Beginner",
    category: "Cloud Computing",
    estimatedMinutes: 20,
    rating: 4.90,
    ratingsCount: 250,
    simulator: "custom",
    quizId: "aws-s3-quiz",
    sections: {
      introduction: "Amazon Simple Storage Service (Amazon S3) is an industry-leading object storage service offering 99.999999999% (11 9s) of data durability.",
      objective: "Create an AWS S3 bucket, configure versioning, upload static assets, and configure automated S3 Lifecycle Rules to transition cold objects to S3 Glacier.",
      videoUrl: "https://www.youtube-nocookie.com/embed/e6w9UP449bA",
      videoTitle: "AWS S3 Complete Tutorial",
      videoChannel: "Edureka",
      prerequisites: ["Object storage concepts (Buckets, Keys, Metadata)", "Storage classes", "Python boto3 or AWS CLI"],
      theory: {
        overview: "S3 stores data as objects within buckets. Objects consist of file data, unique keys, metadata, and Access Control Lists (ACLs).",
        keyConcepts: [
          { title: "S3 Storage Classes", desc: "Standard (frequent access), Standard-IA (infrequent access), Glacier (cold archive)." },
          { title: "Lifecycle Rules", desc: "Automated rules to transition objects to cheaper storage classes and delete expired data." },
          { title: "Bucket Versioning", desc: "Protects against unintended deletions by maintaining multiple variants of an object." }
        ],
        complexities: [
          { operation: "Object Put / Get", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(Object Size)" }
        ],
        realWorldApplications: [
          "Static website hosting (HTML/CSS/JS frontend)",
          "Backup and disaster recovery snapshots",
          "Big data lake storage for PySpark and Presto queries"
        ]
      },
      procedure: [
        "1. Create a globally unique S3 bucket name (e.g. `vlab-datasets-2026`).",
        "2. Enable Bucket Versioning.",
        "3. Upload multi-part dataset files using Python `boto3`.",
        "4. Define S3 Lifecycle Rule: Transition to Standard-IA after 30 days, Glacier after 90 days, and Expire after 365 days."
      ],
      sampleCode: {
        language: "python",
        code: `import boto3

s3 = boto3.client('s3')
bucket_name = "vlab-cloud-storage-2026"

# Create Bucket
s3.create_bucket(Bucket=bucket_name)

# Set Lifecycle Policy
lifecycle_config = {
    'Rules': [{
        'ID': 'ArchiveOlderLogs',
        'Status': 'Enabled',
        'Filter': {'Prefix': 'logs/'},
        'Transitions': [
            {'Days': 30, 'StorageClass': 'STANDARD_IA'},
            {'Days': 90, 'StorageClass': 'GLACIER'}
        ],
        'Expiration': {'Days': 365}
    }]
}

s3.put_bucket_lifecycle_configuration(
    Bucket=bucket_name,
    LifecycleConfiguration=lifecycle_config
)
print("S3 Lifecycle Configuration Applied Successfully!")`
      },
      leetcodeProblems: [
        {
          id: 432,
          title: "All O`one Data Structure",
          difficulty: "Hard",
          url: "https://leetcode.com/problems/all-oone-data-structure/",
          description: "Design a data structure to store string keys with increment, decrement, getMaxKey, and getMinKey in O(1).",
          approach: "Doubly Linked List of frequency Buckets + HashMap for O(1) transitions.",
          javaSnippet: `class AllOne {
    class Bucket { int count; Set<String> keys = new HashSet<>(); Bucket prev, next; Bucket(int c){this.count=c;} }
    Bucket head = new Bucket(0), tail = new Bucket(0);
    Map<String, Bucket> map = new HashMap<>();
    public AllOne() { head.next = tail; tail.prev = head; }
}`
        }
      ],
      expectedOutput: `Bucket created: s3://vlab-cloud-storage-2026
Versioning: ENABLED
Lifecycle Rule Applied:
  - Day 0-30: S3 Standard
  - Day 31-90: S3 Standard-IA (40% cost reduction)
  - Day 91-365: S3 Glacier Flexible (68% cost reduction)
  - Day 365+: EXPIRED`,
      targetAudience: {
        ug: ["B.Tech AI & DS 8th Sem"],
        pg: ["Cloud Storage Systems"]
      }
    }
  },
  {
    id: "exp-csm-3",
    labId: "cloud-service-management",
    title: "Containerization: Docker Multi-Container Application with Docker Compose",
    slug: "docker-multi-container-compose",
    difficulty: "Intermediate",
    category: "Cloud Computing",
    estimatedMinutes: 25,
    rating: 4.95,
    ratingsCount: 310,
    simulator: "custom",
    quizId: "docker-quiz",
    sections: {
      introduction: "Docker containerization packages microservices and their dependencies into lightweight, isolated execution sandboxes, ensuring consistent behavior across dev and production clouds.",
      objective: "Write Dockerfiles, build optimized multi-stage images, and orchestrate a multi-tier web application (Node.js API + Redis cache + PostgreSQL DB) with Docker Compose.",
      videoUrl: "https://www.youtube-nocookie.com/embed/fqMOX6JJhGo",
      videoTitle: "Docker Tutorial for Beginners",
      videoChannel: "Programming with Mosh",
      prerequisites: ["Linux container basics", "Process isolation & cgroups", "YAML syntax"],
      theory: {
        overview: "Containers share the host OS kernel while providing isolated process namespaces, filesystem layers, and virtual network bridges.",
        keyConcepts: [
          { title: "Dockerfile", desc: "Blueprint containing build steps (FROM, WORKDIR, COPY, RUN, EXPOSE, CMD)." },
          { title: "Docker Compose", desc: "Multi-container specification defining service dependencies, ports, and persistent volumes." },
          { title: "Bridge Networking", desc: "Internal virtual DNS network allowing container services to resolve each other by name." }
        ],
        complexities: [
          { operation: "Container Spin-up", best: "O(1) (~500ms)", avg: "1s", worst: "5s", space: "O(Image Layer Size)" }
        ],
        realWorldApplications: [
          "Microservices architecture deployments",
          "Standardized developer workstation onboarding",
          "Automated ephemeral testing environments in GitHub Actions"
        ]
      },
      procedure: [
        "1. Create optimized multi-stage `Dockerfile` with Node.js Alpine base.",
        "2. Create `docker-compose.yml` linking web service, Redis caching layer, and Postgres DB.",
        "3. Configure persistent Docker Volume for database storage.",
        "4. Launch cluster via `docker compose up -d` and inspect running health via `docker ps`."
      ],
      sampleCode: {
        language: "c",
        code: `# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - REDIS_HOST=cache
      - DB_HOST=database
    depends_on:
      - cache
      - database

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: vlab_user
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: vlab_db
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:`
      },
      leetcodeProblems: [
        {
          id: 1603,
          title: "Design Parking System",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/design-parking-system/",
          description: "Design a parking system with slots for big, medium, and small cars.",
          approach: "Stateful array tracking slot allocations in O(1).",
          javaSnippet: `class ParkingSystem {
    int[] slots;
    public ParkingSystem(int big, int medium, int small) { slots = new int[]{0, big, medium, small}; }
    public boolean addCar(int carType) {
        if (slots[carType] > 0) { slots[carType]--; return true; }
        return false;
    }
}`
        }
      ],
      expectedOutput: `Building web image... [100%]
Creating network "vlab_default" with driver "bridge"
Creating volume "vlab_db_data"
Starting vlab_database_1 ... done
Starting vlab_cache_1    ... done
Starting vlab_web_1      ... done
All 3 containers healthy and communicating over internal DNS bridge`,
      targetAudience: {
        ug: ["B.Tech AI & DS 8th Sem"],
        pg: ["DevOps & Cloud Engineering"]
      }
    }
  },
  {
    id: "exp-csm-4",
    labId: "cloud-service-management",
    title: "Serverless Architecture: AWS Lambda Microservices & API Gateway",
    slug: "aws-lambda-serverless-api",
    difficulty: "Intermediate",
    category: "Cloud Computing",
    estimatedMinutes: 25,
    rating: 4.93,
    ratingsCount: 285,
    simulator: "custom",
    quizId: "serverless-quiz",
    sections: {
      introduction: "Serverless computing allows developers to build event-driven microservices without provisioning or managing server infrastructure.",
      objective: "Create an event-driven Python AWS Lambda function, integrate with Amazon API Gateway REST endpoints, and configure IAM role execution permissions.",
      videoUrl: "https://www.youtube-nocookie.com/embed/eOBq__h4OJ4",
      videoTitle: "AWS Lambda Tutorial: Introduction to Serverless",
      videoChannel: "FreeCodeCamp",
      prerequisites: ["Python function definitions", "JSON REST APIs", "AWS IAM roles and policies"],
      theory: {
        overview: "AWS Lambda automatically scales from zero to thousands of parallel invocations in response to HTTP requests, database streams, or CloudWatch triggers.",
        keyConcepts: [
          { title: "Event-Driven Execution", desc: "Lambda functions trigger in response to external events, executing statelessly." },
          { title: "Cold Start vs Warm Start", desc: "Cold start initializes runtime container (~200ms); warm start reuses running containers (<10ms)." },
          { title: "IAM Least Privilege", desc: "Restricts function permissions strictly to required resource operations." }
        ],
        complexities: [
          { operation: "Lambda Warm Execution", best: "O(1) (<10ms)", avg: "50ms", worst: "Cold Start (~200ms)", space: "O(Configured RAM)" }
        ],
        realWorldApplications: [
          "Real-time image resizing and thumbnail generation upon S3 upload",
          "Serverless REST APIs for mobile applications",
          "Automated cloud compliance security audit webhooks"
        ]
      },
      procedure: [
        "1. Create AWS Lambda function with Python 3.11 runtime.",
        "2. Write event handler parsing incoming JSON payload.",
        "3. Configure Amazon API Gateway REST API with `POST /calculate` endpoint.",
        "4. Enable CORS (Cross-Origin Resource Sharing).",
        "5. Deploy API Gateway and verify HTTP responses using cURL."
      ],
      sampleCode: {
        language: "python",
        code: `import json

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        num1 = float(body.get('num1', 0))
        num2 = float(body.get('num2', 0))
        operation = body.get('operation', 'add')

        if operation == 'add': result = num1 + num2
        elif operation == 'multiply': result = num1 * num2
        else: result = num1 - num2

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'result': result, 'status': 'SUCCESS'})
        }
    except Exception as e:
        return {'statusCode': 400, 'body': json.dumps({'error': str(e)})}`
      },
      leetcodeProblems: [
        {
          id: 362,
          title: "Design Hit Counter",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/design-hit-counter/",
          description: "Design a hit counter which counts the number of hits received in the past 5 minutes.",
          approach: "Queue storing hit timestamps or fixed circular array of size 300.",
          javaSnippet: `class HitCounter {
    Queue<Integer> q = new LinkedList<>();
    public void hit(int timestamp) { q.offer(timestamp); }
    public int getHits(int timestamp) {
        while (!q.isEmpty() && timestamp - q.peek() >= 300) q.poll();
        return q.size();
    }
}`
        }
      ],
      expectedOutput: `cURL Test: curl -X POST https://api.vlab.aws/prod/calculate -d '{"num1": 40, "num2": 2, "operation": "add"}'
HTTP/1.1 200 OK
Content-Type: application/json
{"result": 42.0, "status": "SUCCESS"}
Execution Duration: 14.2 ms | Billed Memory: 128 MB`,
      targetAudience: {
        ug: ["B.Tech AI & DS 8th Sem"],
        pg: ["Serverless Architecture"]
      }
    }
  },
  {
    id: "exp-csm-5",
    labId: "cloud-service-management",
    title: "Cluster Orchestration: Kubernetes Pods, Deployments & Service Mesh",
    slug: "kubernetes-pod-cluster-deployment",
    difficulty: "Advanced",
    category: "Cloud Computing",
    estimatedMinutes: 30,
    rating: 4.96,
    ratingsCount: 320,
    simulator: "custom",
    quizId: "kubernetes-quiz",
    sections: {
      introduction: "Kubernetes (K8s) is an open-source container orchestration system for automating application deployment, scaling, self-healing, and management.",
      objective: "Author declarative Kubernetes Deployment and Service YAML manifests, configure ReplicaSets for 3x pod scaling, and perform zero-downtime rolling updates.",
      videoUrl: "https://www.youtube-nocookie.com/embed/X48VuDVv0do",
      videoTitle: "Kubernetes Tutorial for Beginners",
      videoChannel: "TechWorld with Nana",
      prerequisites: ["Docker containers", "YAML configuration", "Cluster networking and load balancing"],
      theory: {
        overview: "Kubernetes Control Plane (API Server, etcd, Scheduler, Controller Manager) orchestrates Worker Node kubelets to maintain the desired application state.",
        keyConcepts: [
          { title: "Pod", desc: "Atomic deployable compute unit encapsulating one or more co-located containers." },
          { title: "Deployment Controller", desc: "Declarative manager maintaining ReplicaSets, rollbacks, and rolling updates." },
          { title: "Service (ClusterIP/LoadBalancer)", desc: "Stable network endpoint providing round-robin load-balancing across dynamic pods." }
        ],
        complexities: [
          { operation: "Zero-Downtime Rolling Update", best: "Zero Downtime", avg: "O(Replicas)", worst: "Timeout", space: "O(Cluster RAM)" }
        ],
        realWorldApplications: [
          "Global banking core transaction engines",
          "E-commerce flash sale auto-scaling clusters",
          "Multi-cloud hybrid enterprise deployments"
        ]
      },
      procedure: [
        "1. Create Minikube or EKS Kubernetes cluster.",
        "2. Write `deployment.yaml` with 3 replicas and liveness/readiness probes.",
        "3. Write `service.yaml` exposing NodePort / LoadBalancer on port 80.",
        "4. Deploy: `kubectl apply -f deployment.yaml -f service.yaml`.",
        "5. Test rolling update: `kubectl set image deployment/vlab-web web=vlab:v2.0`."
      ],
      sampleCode: {
        language: "c",
        code: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vlab-web-deployment
  labels:
    app: vlab-web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vlab-web
  template:
    metadata:
      labels:
        app: vlab-web
    spec:
      containers:
      - name: web
        image: nginx:alpine
        ports:
        - containerPort: 80
        resources:
          limits:
            cpu: "500m"
            memory: "256Mi"
---
apiVersion: v1
kind: Service
metadata:
  name: vlab-web-service
spec:
  type: LoadBalancer
  selector:
    app: vlab-web
  ports:
  - port: 80
    targetPort: 80`
      },
      leetcodeProblems: [
        {
          id: 359,
          title: "Logger Rate Limiter",
          difficulty: "Easy",
          url: "https://leetcode.com/problems/logger-rate-limiter/",
          description: "Design a logger system that prints message only if not printed in the last 10 seconds.",
          approach: "HashMap storing message to allowed next timestamp.",
          javaSnippet: `class Logger {
    Map<String, Integer> map = new HashMap<>();
    public boolean shouldPrintMessage(int timestamp, String message) {
        if (!map.containsKey(message) || timestamp >= map.get(message)) {
            map.put(message, timestamp + 10); return true;
        }
        return false;
    }
}`
        }
      ],
      expectedOutput: `deployment.apps/vlab-web-deployment created
service/vlab-web-service created
NAME                                    READY   STATUS    RESTARTS   AGE
vlab-web-deployment-78f99d8b7-4k2l1     1/1     Running   0          12s
vlab-web-deployment-78f99d8b7-9j8x2     1/1     Running   0          12s
vlab-web-deployment-78f99d8b7-x71pq     1/1     Running   0          12s
LoadBalancer Ingress: 34.120.40.18:80 (Health check OK)`,
      targetAudience: {
        ug: ["B.Tech AI & DS 8th Sem"],
        pg: ["Kubernetes & Cloud Orchestration"]
      }
    }
  }
];
