"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Server,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Box,
  Layers,
  Code2,
  Clock,
  Car,
  DollarSign,
  ArrowUpDown,
  Crown,
  HelpCircle,
  ShieldCheck,
  Zap,
  Split,
  Copy,
  Check,
  Sparkles
} from "lucide-react";
import { AiReviewModal } from "@/components/prep-suite/ai-review-modal";
import { evaluateMachineCodingCode, CodeReviewResult } from "@/lib/ai-evaluation-engine";

export type LldSubmode = "uml-builder" | "design-patterns" | "machine-coding";

interface LldProblem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  timeLimitMinutes: number;
  description: string;
  requirements: string[];
  classes: {
    name: string;
    type: "Class" | "Interface" | "Enum";
    attributes: string[];
    methods: string[];
  }[];
  solidChecklist: { principle: string; howItApplies: string }[];
  starterCode: {
    java: string;
    python: string;
    typescript: string;
  };
}

const MACHINE_CODING_PROBLEMS: LldProblem[] = [
  {
    id: "parking-lot",
    title: "Design a Parking Lot System",
    category: "Object-Oriented Design",
    icon: Car,
    timeLimitMinutes: 60,
    description: "Design a multi-floor parking lot supporting different vehicle types (Motorcycle, Car, Truck), dynamic spot allocation, and hourly billing rates with ticket generation.",
    requirements: [
      "Multi-floor parking lot with configurable capacity per floor",
      "Support distinct vehicle types: Motorcycle, Car, Bus/Truck",
      "Dynamic spot assignment: Nearest available spot to entry gate",
      "Ticket issued upon entry; fare calculated upon exit based on vehicle type and duration",
      "Support multiple entry and exit gates operating concurrently"
    ],
    classes: [
      {
        name: "ParkingLot",
        type: "Class",
        attributes: ["id: String", "floors: List<ParkingFloor>", "entryGates: List<Gate>", "exitGates: List<Gate>"],
        methods: ["parkVehicle(Vehicle): Ticket", "unparkVehicle(Ticket): Receipt", "isFull(): Boolean"]
      },
      {
        name: "ParkingFloor",
        type: "Class",
        attributes: ["floorNumber: Int", "spots: Map<SpotType, List<ParkingSpot>>"],
        methods: ["getAvailableSpot(SpotType): ParkingSpot", "vacateSpot(ParkingSpot): Void"]
      },
      {
        name: "Vehicle",
        type: "Class",
        attributes: ["licensePlate: String", "type: VehicleType"],
        methods: ["getType(): VehicleType"]
      },
      {
        name: "Ticket",
        type: "Class",
        attributes: ["ticketNumber: String", "entryTime: Long", "spot: ParkingSpot", "vehicle: Vehicle"],
        methods: ["calculateDuration(): Long"]
      },
      {
        name: "FeeStrategy",
        type: "Interface",
        attributes: [],
        methods: ["calculateFee(ticket: Ticket): Double"]
      }
    ],
    solidChecklist: [
      { principle: "Single Responsibility (SRP)", howItApplies: "FeeStrategy only calculates pricing, while ParkingLot manages spot availability." },
      { principle: "Open/Closed (OCP)", howItApplies: "New vehicle types (e.g. Electric Vehicle) can be added without modifying existing ticket logic." },
      { principle: "Strategy Pattern", howItApplies: "FeeStrategy (HourlyFeeStrategy, FlatRateStrategy) allows swappable pricing models at runtime." }
    ],
    starterCode: {
      java: `// PARKING LOT SYSTEM - JAVA SKELETON
import java.util.*;

enum VehicleType { MOTORCYCLE, CAR, TRUCK }
enum SpotType { COMPACT, LARGE, MOTORBIKE }

class Vehicle {
    private String licensePlate;
    private VehicleType type;
    public Vehicle(String licensePlate, VehicleType type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }
    public VehicleType getType() { return type; }
}

interface FeeStrategy {
    double calculateFee(long durationMillis, VehicleType type);
}

class HourlyFeeStrategy implements FeeStrategy {
    public double calculateFee(long durationMillis, VehicleType type) {
        long hours = Math.max(1, durationMillis / (1000 * 60 * 60));
        return switch (type) {
            case MOTORCYCLE -> hours * 10.0;
            case CAR -> hours * 20.0;
            case TRUCK -> hours * 40.0;
        };
    }
}

class ParkingSpot {
    private int spotNumber;
    private SpotType spotType;
    private boolean isOccupied;
    // ... Constructor and getters
}

class ParkingLot {
    private static ParkingLot instance;
    private ParkingLot() {}
    public static synchronized ParkingLot getInstance() {
        if (instance == null) instance = new ParkingLot();
        return instance;
    }
    // Main parking orchestration methods
}`,
      python: `# PARKING LOT SYSTEM - PYTHON SKELETON
from enum import Enum
import time

class VehicleType(Enum):
    MOTORCYCLE = 1
    CAR = 2
    TRUCK = 3

class Vehicle:
    def __init__(self, license_plate: str, vehicle_type: VehicleType):
        self.license_plate = license_plate
        self.vehicle_type = vehicle_type

class FeeStrategy:
    def calculate_fee(self, duration_hours: float, vehicle_type: VehicleType) -> float:
        raise NotImplementedError

class FlatHourlyFeeStrategy(FeeStrategy):
    RATES = {VehicleType.MOTORCYCLE: 10, VehicleType.CAR: 20, VehicleType.TRUCK: 40}
    def calculate_fee(self, duration_hours: float, vehicle_type: VehicleType) -> float:
        return max(1.0, duration_hours) * self.RATES[vehicle_type]

class ParkingLot:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ParkingLot, cls).__new__(cls)
        return cls._instance
`,
      typescript: `// PARKING LOT SYSTEM - TYPESCRIPT SKELETON
export enum VehicleType { MOTORCYCLE, CAR, TRUCK }

export interface Vehicle {
  licensePlate: string;
  type: VehicleType;
}

export interface FeeStrategy {
  calculateFee(durationHours: number, type: VehicleType): number;
}

export class StandardFeeStrategy implements FeeStrategy {
  private rates = {
    [VehicleType.MOTORCYCLE]: 10,
    [VehicleType.CAR]: 20,
    [VehicleType.TRUCK]: 40
  };

  calculateFee(durationHours: number, type: VehicleType): number {
    return Math.max(1, durationHours) * this.rates[type];
  }
}
`
    }
  },
  {
    id: "splitwise",
    title: "Design Splitwise (Expense Sharing)",
    category: "Financial System Design",
    icon: DollarSign,
    timeLimitMinutes: 60,
    description: "Design an expense sharing service like Splitwise. Support splitting expenses equally, by exact amounts, or by percentages, with debt simplification graph algorithms.",
    requirements: [
      "Add users and group memberships",
      "Support EQUAL, EXACT, and PERCENT split types",
      "Verify that split sum matches total expense amount (e.g. 100% or total dollars)",
      "Maintain pairwise user balances (e.g. User A owes User B $20)",
      "Simplify balances within a group to minimize total financial transactions"
    ],
    classes: [
      {
        name: "ExpenseManager",
        type: "Class",
        attributes: ["userMap: Map<String, User>", "balanceSheet: Map<String, Map<String, Double>>"],
        methods: ["addExpense(type: ExpenseType, amount: Double, paidBy: User, splits: List<Split>): Void", "showBalances(): Void"]
      },
      {
        name: "Expense",
        type: "Class",
        attributes: ["id: String", "amount: Double", "paidBy: User", "splits: List<Split>", "metadata: ExpenseMetadata"],
        methods: ["validate(): Boolean"]
      },
      {
        name: "Split",
        type: "Class",
        attributes: ["user: User", "amount: Double"],
        methods: ["getAmount(): Double"]
      }
    ],
    solidChecklist: [
      { principle: "Factory Pattern", howItApplies: "ExpenseFactory creates EqualExpense, ExactExpense, or PercentExpense based on ExpenseType." },
      { principle: "Open/Closed (OCP)", howItApplies: "Can add new split types (e.g. Share-based split) without altering balance ledger logic." }
    ],
    starterCode: {
      java: `// SPLITWISE SYSTEM - JAVA SKELETON
import java.util.*;

enum ExpenseType { EQUAL, EXACT, PERCENT }

class User {
    private String id;
    private String name;
    public User(String id, String name) { this.id = id; this.name = name; }
    public String getId() { return id; }
}

abstract class Split {
    protected User user;
    protected double amount;
    public Split(User user) { this.user = user; }
    public User getUser() { return user; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}

class EqualSplit extends Split {
    public EqualSplit(User user) { super(user); }
}

class ExpenseManager {
    private Map<String, User> users = new HashMap<>();
    private Map<String, Map<String, Double>> balances = new HashMap<>();
    // ... Methods for addExpense and simplifyDebts
}`,
      python: `# SPLITWISE - PYTHON SKELETON
from enum import Enum
from typing import List, Dict

class ExpenseType(Enum):
    EQUAL = 1
    EXACT = 2
    PERCENT = 3

class User:
    def __init__(self, user_id: str, name: str):
        self.id = user_id
        self.name = name

class Split:
    def __init__(self, user: User, amount: float = 0.0):
        self.user = user
        self.amount = amount
`,
      typescript: `// SPLITWISE - TYPESCRIPT SKELETON
export enum ExpenseType { EQUAL, EXACT, PERCENT }

export interface User {
  id: string;
  name: string;
}

export interface Split {
  user: User;
  amount: number;
}
`
    }
  },
  {
    id: "elevator",
    title: "Design an Elevator Control System",
    category: "Hardware & Concurrency LLD",
    icon: ArrowUpDown,
    timeLimitMinutes: 60,
    description: "Design a dispatcher controlling N elevator cars across M floors. Optimize request scheduling using the LOOK (Elevator) algorithm with concurrent door safety.",
    requirements: [
      "Dispatcher manages N elevator cars across M building floors",
      "Support internal floor selections and external hall calls (UP / DOWN buttons)",
      "Elevator state machine: IDLE, MOVING_UP, MOVING_DOWN, EMERGENCY_STOP",
      "LOOK / SCAN dispatching algorithm minimizing total passenger wait time",
      "Overload sensor and emergency door safety triggers"
    ],
    classes: [
      {
        name: "ElevatorController",
        type: "Class",
        attributes: ["elevators: List<ElevatorCar>", "dispatchStrategy: DispatchStrategy"],
        methods: ["handleExternalRequest(floor: Int, direction: Direction): Void", "stepSimulation(): Void"]
      },
      {
        name: "ElevatorCar",
        type: "Class",
        attributes: ["id: Int", "currentFloor: Int", "state: ElevatorState", "upRequests: TreeSet<Int>", "downRequests: TreeSet<Int>"],
        methods: ["moveNext(): Void", "openDoors(): Void", "addDestination(floor: Int): Void"]
      }
    ],
    solidChecklist: [
      { principle: "State Pattern", howItApplies: "ElevatorCar delegates movement decisions to ElevatorState (IdleState, MovingUpState, MovingDownState)." },
      { principle: "Strategy Pattern", howItApplies: "DispatchStrategy allows pluggable algorithms (Nearest Car, LOOK SCAN, Round Robin)." }
    ],
    starterCode: {
      java: `// ELEVATOR SYSTEM - JAVA SKELETON
enum Direction { UP, DOWN, IDLE }
enum ElevatorState { MOVING, STOPPED, IDLE, MAINTENANCE }

class ElevatorCar {
    private int id;
    private int currentFloor = 0;
    private Direction currentDirection = Direction.IDLE;
    // LOOK algorithm priority queues
    private java.util.TreeSet<Integer> upStops = new java.util.TreeSet<>();
    private java.util.TreeSet<Integer> downStops = new java.util.TreeSet<>(java.util.Collections.reverseOrder());
}`,
      python: `# ELEVATOR CONTROLLER - PYTHON SKELETON
from enum import Enum
import heapq

class Direction(Enum):
    UP = 1
    DOWN = 2
    IDLE = 3

class ElevatorCar:
    def __init__(self, car_id: int):
        self.car_id = car_id
        self.current_floor = 0
        self.direction = Direction.IDLE
        self.up_stops = []
        self.down_stops = []
`,
      typescript: `// ELEVATOR CONTROLLER - TYPESCRIPT SKELETON
export enum Direction { UP, DOWN, IDLE }

export class ElevatorCar {
  public currentFloor = 0;
  public direction = Direction.IDLE;
  // stop lists
}
`
    }
  },
  {
    id: "chess",
    title: "Design a Chess Game Engine",
    category: "Game State & Polymorphism",
    icon: Crown,
    timeLimitMinutes: 60,
    description: "Design an object-oriented 8x8 Chess game engine. Implement polymorphic piece movements (King, Queen, Rook, Bishop, Knight, Pawn), checkmate detection, and move validation.",
    requirements: [
      "8x8 Board consisting of 64 squares with coordinates A1 to H8",
      "Abstract Piece class with polymorphic canMove(board, start, end) validation",
      "Special rules: Castling, En Passant, Pawn Promotion",
      "Check, Checkmate, and Stalemate game terminal conditions",
      "Move history tracking with undo / replay support"
    ],
    classes: [
      {
        name: "Board",
        type: "Class",
        attributes: ["boxes: Cell[8][8]"],
        methods: ["getCell(x: Int, y: Int): Cell", "resetBoard(): Void"]
      },
      {
        name: "Piece",
        type: "Class",
        attributes: ["color: Color", "isKilled: Boolean"],
        methods: ["canMove(board: Board, start: Cell, end: Cell): Boolean"]
      },
      {
        name: "Game",
        type: "Class",
        attributes: ["players: Player[2]", "board: Board", "status: GameStatus", "moves: List<Move>"],
        methods: ["playerMove(player: Player, startX: Int, startY: Int, endX: Int, endY: Int): Boolean"]
      }
    ],
    solidChecklist: [
      { principle: "Polymorphism / LSP", howItApplies: "Each piece (Knight, Bishop, Rook) overrides canMove() adhering to Liskov Substitution." },
      { principle: "Command Pattern", howItApplies: "Move objects encapsulate player commands, facilitating undo/redo and move replay." }
    ],
    starterCode: {
      java: `// CHESS GAME - JAVA SKELETON
enum Color { WHITE, BLACK }

abstract class Piece {
    protected Color color;
    public Piece(Color color) { this.color = color; }
    public abstract boolean canMove(Board board, Cell start, Cell end);
}

class Knight extends Piece {
    public Knight(Color color) { super(color); }
    public boolean canMove(Board board, Cell start, Cell end) {
        int dx = Math.abs(start.getX() - end.getX());
        int dy = Math.abs(start.getY() - end.getY());
        return (dx * dy == 2); // L-shaped 2x1 or 1x2 jump
    }
}`,
      python: `# CHESS GAME - PYTHON SKELETON
class Color:
    WHITE = 1
    BLACK = 2

class Piece:
    def __init__(self, color):
        self.color = color
    def can_move(self, board, start, end) -> bool:
        raise NotImplementedError
`,
      typescript: `// CHESS GAME - TYPESCRIPT SKELETON
export enum PieceColor { WHITE, BLACK }

export abstract class Piece {
  constructor(public color: PieceColor) {}
  abstract canMove(startX: number, startY: number, endX: number, endY: number): boolean;
}
`
    }
  }
];

export function MachineCodingStudio() {
  const [submode, setSubmode] = useState<LldSubmode>("machine-coding");
  const [activeProblem, setActiveProblem] = useState<LldProblem>(MACHINE_CODING_PROBLEMS[0]);
  const [selectedLang, setSelectedLang] = useState<"java" | "python" | "typescript">("java");
  const [copied, setCopied] = useState<boolean>(false);

  // 60-minute timer state
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(60 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Design Patterns Sandbox state
  const [activePattern, setActivePattern] = useState<"strategy" | "observer" | "factory" | "singleton">("strategy");
  const [strategyOption, setStrategyOption] = useState<"credit-card" | "crypto" | "upi">("credit-card");

  // AI Code Review Modal state
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [codeReviewResult, setCodeReviewResult] = useState<CodeReviewResult | null>(null);

  const handleRunAiReview = () => {
    const result = evaluateMachineCodingCode(
      activeProblem.starterCode[selectedLang],
      selectedLang,
      activeProblem.title
    );
    setCodeReviewResult(result);
    setIsAiModalOpen(true);
  };

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Submode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 font-mono font-bold">
            LLD Suite
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Low-Level Design &amp; Machine Coding Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={submode === "machine-coding" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSubmode("machine-coding")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Clock className="h-3.5 w-3.5 mr-1" />
            60-Min Machine Coding
          </Button>
          <Button
            variant={submode === "design-patterns" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSubmode("design-patterns")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Zap className="h-3.5 w-3.5 mr-1" />
            Design Patterns Playground
          </Button>
          <Button
            variant={submode === "uml-builder" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSubmode("uml-builder")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Layers className="h-3.5 w-3.5 mr-1" />
            UML Diagram Visualizer
          </Button>
        </div>
      </div>

      {/* ========================================== */}
      {/* SUBMODE 1: 60-MIN TIMED MACHINE CODING     */}
      {/* ========================================== */}
      {submode === "machine-coding" && (
        <div className="space-y-6">
          {/* Problem Picker & 60-Min Countdown Timer */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {MACHINE_CODING_PROBLEMS.map((problem) => {
              const isSelected = activeProblem.id === problem.id;
              const IconComp = problem.icon;
              return (
                <div
                  key={problem.id}
                  onClick={() => {
                    setActiveProblem(problem);
                    setTimeLeftSeconds(problem.timeLimitMinutes * 60);
                    setIsTimerRunning(false);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-cyan-500/15 border-cyan-500 shadow-md scale-[1.02]"
                      : "bg-card border-border/80 hover:border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <IconComp className={`h-6 w-6 ${isSelected ? "text-cyan-500" : "text-muted-foreground"}`} />
                    <Badge variant={isSelected ? "default" : "outline"} className="text-[10px] font-mono">
                      {problem.timeLimitMinutes} Mins
                    </Badge>
                  </div>
                  <div className="my-2">
                    <span className="text-sm font-bold font-heading text-foreground block">{problem.title}</span>
                    <span className="text-[11px] text-muted-foreground mt-0.5 block">{problem.category}</span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      ACTIVE CHALLENGE
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Timed Session Bar */}
          <Card className="p-5 bg-card border-border/80 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-muted/60 rounded-2xl border border-border flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary animate-pulse" />
                <div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase font-bold block">Interview Timer</span>
                  <span className="text-2xl font-black font-mono text-foreground tracking-wider">
                    {formatTimer(timeLeftSeconds)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`h-9 px-4 font-mono font-bold text-xs gap-1.5 ${
                    isTimerRunning ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-primary text-primary-foreground"
                  }`}
                >
                  {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isTimerRunning ? "Pause" : "Start 60m Sprint"}</span>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimeLeftSeconds(activeProblem.timeLimitMinutes * 60);
                  }}
                  className="h-9 w-9 rounded-xl"
                  title="Reset Timer"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border text-xs">
              {(["java", "python", "typescript"] as const).map((lang) => (
                <Button
                  key={lang}
                  size="sm"
                  variant={selectedLang === lang ? "default" : "ghost"}
                  onClick={() => setSelectedLang(lang)}
                  className="h-7 text-xs font-mono font-bold rounded-lg uppercase"
                >
                  {lang}
                </Button>
              ))}
            </div>
          </Card>

          {/* Problem Breakdown & Code Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Requirements & SOLID checklist */}
            <div className="space-y-6">
              <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-base font-bold font-heading text-foreground flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Functional Requirements Checklist
                </h3>
                <ul className="space-y-2">
                  {activeProblem.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* SOLID Architecture Audit */}
              <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-3">
                <h3 className="text-base font-bold font-heading text-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  SOLID Principles Compliance Audit
                </h3>
                <div className="space-y-2.5">
                  {activeProblem.solidChecklist.map((solid, sIdx) => (
                    <div key={sIdx} className="p-3 bg-muted/30 rounded-xl border border-border text-xs space-y-1">
                      <span className="font-mono font-bold text-primary block">{solid.principle}</span>
                      <p className="text-muted-foreground leading-relaxed">{solid.howItApplies}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right: Starter Code Skeleton */}
            <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="text-xs font-mono text-muted-foreground font-bold uppercase tracking-wider">
                    {selectedLang.toUpperCase()} Starter Boilerplate
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={handleRunAiReview}
                      className="h-7 text-xs font-mono gap-1.5 bg-primary text-primary-foreground font-bold shadow-xs"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Run AI Review</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyCode(activeProblem.starterCode[selectedLang])}
                      className="h-7 text-xs font-mono gap-1"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? "Copied" : "Copy Code"}</span>
                    </Button>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-muted/40 border border-border font-mono text-xs overflow-x-auto max-h-[420px] text-foreground leading-relaxed">
                  <pre>{activeProblem.starterCode[selectedLang]}</pre>
                </div>
              </div>

              <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                <Code2 className="h-4 w-4 shrink-0" />
                <span>Interview Tip: Focus on loose coupling, interfaces, and exception handling before business logic.</span>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* SUBMODE 2: DESIGN PATTERNS PLAYGROUND      */}
      {/* ========================================== */}
      {submode === "design-patterns" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Interactive Gang of Four (GoF) Patterns Playground
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Visualize why design patterns solve tight coupling: Strategy, Observer, Factory, and Singleton.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border text-xs">
                {(["strategy", "observer", "factory", "singleton"] as const).map((pat) => (
                  <Button
                    key={pat}
                    size="sm"
                    variant={activePattern === pat ? "default" : "ghost"}
                    onClick={() => setActivePattern(pat)}
                    className="h-7 text-xs font-mono font-bold rounded-lg uppercase"
                  >
                    {pat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Strategy Pattern Interactive Sandbox */}
            {activePattern === "strategy" && (
              <div className="space-y-4">
                <div className="p-4 bg-muted/20 rounded-2xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono text-muted-foreground font-bold uppercase block">Runtime Strategy Swapping</span>
                    <span className="text-sm font-bold text-foreground">PaymentContext.setPaymentStrategy()</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {(["credit-card", "crypto", "upi"] as const).map((opt) => (
                      <Button
                        key={opt}
                        size="sm"
                        variant={strategyOption === opt ? "default" : "outline"}
                        onClick={() => setStrategyOption(opt)}
                        className="h-8 text-xs font-mono font-bold"
                      >
                        {opt.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl border ${strategyOption === "credit-card" ? "bg-cyan-500/20 border-cyan-500 shadow-md" : "bg-muted/30 border-border"}`}>
                    <span className="text-xs font-mono font-bold text-foreground block">CreditCardStrategy</span>
                    <span className="text-[11px] text-muted-foreground mt-1 block">Fee: 2.5% • Auth: 3D Secure</span>
                  </div>
                  <div className={`p-4 rounded-xl border ${strategyOption === "crypto" ? "bg-cyan-500/20 border-cyan-500 shadow-md" : "bg-muted/30 border-border"}`}>
                    <span className="text-xs font-mono font-bold text-foreground block">CryptoStrategy</span>
                    <span className="text-[11px] text-muted-foreground mt-1 block">Fee: Network Gas • Auth: Wallet Signature</span>
                  </div>
                  <div className={`p-4 rounded-xl border ${strategyOption === "upi" ? "bg-cyan-500/20 border-cyan-500 shadow-md" : "bg-muted/30 border-border"}`}>
                    <span className="text-xs font-mono font-bold text-foreground block">UpiStrategy</span>
                    <span className="text-[11px] text-muted-foreground mt-1 block">Fee: 0% • Auth: Virtual Payment Address</span>
                  </div>
                </div>
              </div>
            )}

            {/* Observer / PubSub Pattern Sandbox */}
            {activePattern === "observer" && (
              <div className="p-6 bg-muted/20 rounded-2xl border border-border text-center space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-primary">Subject ──→ 1-to-Many Observers</span>
                <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  When OrderState changes to 'SHIPPED', OrderSubject calls notifyObservers(). EmailNotifier, SMSNotifier, and AnalyticsService update automatically without coupling to Order.
                </p>
              </div>
            )}

            {/* Factory Pattern Sandbox */}
            {activePattern === "factory" && (
              <div className="p-6 bg-muted/20 rounded-2xl border border-border text-center space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-primary">Decoupled Object Instantiation</span>
                <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  NotificationFactory.createNotification("SMS") returns SMSNotification. Client code relies strictly on the INotification interface, adhering to Dependency Inversion.
                </p>
              </div>
            )}

            {/* Singleton Pattern Sandbox */}
            {activePattern === "singleton" && (
              <div className="p-6 bg-muted/20 rounded-2xl border border-border text-center space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-primary">Thread-Safe Double-Checked Locking</span>
                <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed font-mono">
                  DatabaseConnection.getInstance(): Guarantees only one connection pool exists throughout the JVM lifecycle.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* SUBMODE 3: UML DIAGRAM VISUALIZER          */}
      {/* ========================================== */}
      {submode === "uml-builder" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold font-heading text-foreground">
                UML Class Diagram &amp; Relationship Visualizer
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Visual representation of classes, fields, methods, and OOP associations for {activeProblem.title}.
              </p>
            </div>

            {/* Class Diagram Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeProblem.classes.map((cls, idx) => (
                <div key={idx} className="border-2 border-border/80 rounded-2xl overflow-hidden bg-muted/20 font-mono text-xs shadow-xs">
                  {/* Class Header */}
                  <div className="bg-primary/15 p-3 border-b border-border/80 text-center">
                    <span className="text-[10px] text-primary font-bold uppercase block">&lt;&lt;{cls.type}&gt;&gt;</span>
                    <span className="text-sm font-bold text-foreground font-heading">{cls.name}</span>
                  </div>

                  {/* Attributes Section */}
                  <div className="p-3 border-b border-border/60 space-y-1 bg-card">
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground block font-bold">Attributes</span>
                    {cls.attributes.length > 0 ? (
                      cls.attributes.map((attr, aIdx) => (
                        <div key={aIdx} className="text-[11px] text-muted-foreground truncate">
                          - {attr}
                        </div>
                      ))
                    ) : (
                      <span className="text-[10px] text-muted-foreground italic">None</span>
                    )}
                  </div>

                  {/* Methods Section */}
                  <div className="p-3 space-y-1 bg-card">
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground block font-bold">Methods</span>
                    {cls.methods.map((meth, mIdx) => (
                      <div key={mIdx} className="text-[11px] text-primary truncate font-bold">
                        + {meth}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* AI Review Modal */}
      <AiReviewModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        reviewType="code"
        codeReview={codeReviewResult || undefined}
      />
    </div>
  );
}
