import { MaterialContent } from "./types";

export const NETWORKS_MATERIALS: Record<string, MaterialContent> = {
  "networks-architecture-gfg": {
    id: "networks-architecture-gfg",
    title: "Computer Network Architecture & Protocol Guide",
    subject: "Computer Networks Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Network Architecture & OSI",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/computer-networks",
    simulatorName: "Networks Packet & Socket Lab",
    overview:
      "A comprehensive guide to the architecture of computer communication networks. Covers the OSI 7-Layer Reference Model and TCP/IP protocol suite, packet encapsulation/decapsulation, MAC framing, ARP/RARP address resolution, and Cyclic Redundancy Check (CRC) polynomial error detection.",
    learningObjectives: [
      "Differentiate the responsibilities of each layer in the 7-layer OSI model",
      "Trace packet encapsulation and header overhead from Application to Physical layer",
      "Understand Address Resolution Protocol (ARP) cache tables and broadcast request cycles",
      "Implement the Cyclic Redundancy Check (CRC-32) binary polynomial division algorithm",
      "Analyze network packet captures using Wireshark and tcpdump"
    ],
    keyConcepts: [
      {
        title: "1. The OSI 7-Layer vs TCP/IP 4-Layer Hierarchy",
        description:
          "Layering abstracts hardware complexity into standardized logical tiers where each layer communicates with its peer on the remote host via PDUs (Protocol Data Units).",
        points: [
          "Application (Layer 7): User processes (HTTP, SMTP, DNS, FTP) -> PDU: Data.",
          "Presentation (Layer 6): Data representation, TLS/SSL encryption, compression.",
          "Session (Layer 5): Session dialog management, synchronization checkpoints.",
          "Transport (Layer 4): Process-to-process delivery (TCP ports, UDP) -> PDU: Segment.",
          "Network (Layer 3): Host-to-host routing (IPv4, IPv6, ICMP) -> PDU: Packet.",
          "Data Link (Layer 2): Hop-to-hop framing & MAC addressing (Ethernet, Wi-Fi) -> PDU: Frame.",
          "Physical (Layer 1): Raw bitstream transmission across copper/fiber/radio -> PDU: Bits."
        ]
      },
      {
        title: "2. Address Resolution Protocol (ARP)",
        description:
          "ARP resolves known 32-bit IPv4 logical network addresses into 48-bit physical MAC hardware addresses on the local broadcast link.",
        points: [
          "ARP Request: Broadcast frame (FF:FF:FF:FF:FF:FF) sent to all nodes on the LAN subnet.",
          "ARP Reply: Unicast response sent directly by the target machine containing its hardware MAC address.",
          "ARP Cache: Dynamic in-memory lookup table with TTL timeouts to prevent broadcast floods."
        ]
      },
      {
        title: "3. Cyclic Redundancy Check (CRC) Error Detection",
        description:
          "CRC treats bit sequences as binary polynomials and uses modulo-2 polynomial division (XOR) to verify data integrity across noisy channels.",
        points: [
          "Generator Polynomial: Standard shared divisor (e.g. CRC-32).",
          "Sender: Appends R zeros to data, divides by generator, and replaces zeros with remainder.",
          "Receiver: Divides received frame by generator; if remainder is 0, frame is intact; else corrupted."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Append Zero Bits",
        description: "Append (degree of generator polynomial G) zero bits to the original data bitstream D."
      },
      {
        step: 2,
        title: "Modulo-2 Binary Division",
        description: "Perform XOR binary division of the appended data by polynomial G to obtain remainder R."
      },
      {
        step: 3,
        title: "Construct Transmitted Frame",
        description: "Combine original data D with remainder R; transmit frame over physical medium."
      }
    ],
    codeSnippets: {
      python: `def crc_remainder(data: str, generator: str) -> str:
    """Computes CRC remainder using Modulo-2 XOR division."""
    n = len(generator)
    # Append n-1 zeros to data
    padded_data = list(data + '0' * (n - 1))
    
    for i in range(len(data)):
        if padded_data[i] == '1':
            for j in range(n):
                # XOR operation
                padded_data[i + j] = '0' if padded_data[i + j] == generator[j] else '1'
                
    return "".join(padded_data[-(n - 1):])

# Test CRC Implementation
data_bits = "11010011101100"
crc_poly = "1011" # Generator (degree 3)
remainder = crc_remainder(data_bits, crc_poly)
transmitted_frame = data_bits + remainder

print(f"Data: {data_bits}")
print(f"Generator: {crc_poly}")
print(f"CRC Remainder: {remainder}")
print(f"Transmitted Frame: {transmitted_frame}")

# Receiver Verification
check = crc_remainder(transmitted_frame, crc_poly)
print(f"Receiver Remainder Check: {check} -> {'NO ERROR' if set(check) == {'0'} else 'CORRUPT'}")`,
      c: `#include <stdio.h>
#include <string.h>

void xorDivision(char data[], char gen[], char rem[]) {
    int dataLen = strlen(data);
    int genLen = strlen(gen);
    char temp[128];
    strcpy(temp, data);

    for (int i = 0; i <= dataLen - genLen; i++) {
        if (temp[i] == '1') {
            for (int j = 0; j < genLen; j++) {
                temp[i + j] = (temp[i + j] == gen[j]) ? '0' : '1';
            }
        }
    }
    strncpy(rem, temp + dataLen - genLen + 1, genLen - 1);
    rem[genLen - 1] = '\\0';
}`
    },
    complexityAnalysis: {
      timeComplexity: "O(N * M) for software polynomial division where N is bit count, M is polynomial length",
      spaceComplexity: "O(N) bit buffer in memory; executed in hardware via shift registers in O(N) clock cycles",
      bestCase: "O(N) hardware shift-register throughput",
      worstCase: "O(N * M) in non-vectorized software",
      notes: "Ethernet cards implement CRC-32 in dedicated ASIC hardware with zero CPU cycle penalty."
    },
    vivaQuestions: [
      {
        question: "Why does the Data Link Layer use MAC addresses while the Network Layer uses IP addresses?",
        answer: "IP addresses provide logical hierarchical routing across heterogeneous interconnected networks globally, while MAC addresses provide flat physical interface identification on the local single broadcast segment."
      },
      {
        question: "What is an ARP spoofing (cache poisoning) attack?",
        answer: "An attacker sends forged gratuitous ARP replies associating their MAC address with the default gateway's IP, intercepting all LAN outbound traffic (Man-In-The-Middle attack)."
      }
    ],
    realWorldApplications: [
      "Ethernet 802.3 frame error checking and Wi-Fi 802.11 FCS",
      "Network packet routing across tier-1 internet backbones",
      "Wireshark deep packet inspection in cybersecurity operations centers"
    ],
    practiceProblems: [
      {
        title: "Hamming Code Single-Bit Error Correction",
        difficulty: "Medium",
        description: "Implement a 7-4 Hamming Code encoder in Python that generates 3 parity bits and detects/corrects any single bit flip."
      }
    ]
  },

  "networks-sockets-gfg": {
    id: "networks-sockets-gfg",
    title: "Socket Programming in Java & Python (TCP/UDP)",
    subject: "Computer Networks Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Socket Programming",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/computer-networks",
    simulatorName: "Networks Packet & Socket Lab",
    overview:
      "Network socket programming provides the programming interface (API) for inter-process communication (IPC) across an IP network. This reference covers Berkeley socket abstractions, TCP stream sockets (connection-oriented, 3-way handshake, full duplex streams), and UDP datagram sockets (connectionless, lightweight, low-latency).",
    learningObjectives: [
      "Understand socket address structures: IP address + Port number = Endpoint",
      "Construct multi-threaded TCP Client-Server echo applications in Java and Python",
      "Implement connectionless UDP datagram communication via DatagramSocket and DatagramPacket",
      "Analyze the TCP 3-Way Handshake (SYN, SYN-ACK, ACK) and 4-Way Connection Teardown (FIN, ACK)",
      "Manage socket timeouts, buffer sizes, and concurrent thread pools"
    ],
    keyConcepts: [
      {
        title: "1. The TCP Client-Server Lifecycle",
        description:
          "TCP provides reliable, ordered, and error-checked delivery of a stream of octets.",
        points: [
          "Server: socket() -> bind(ip, port) -> listen(backlog) -> accept() [blocks until client connects].",
          "Client: socket() -> connect(server_ip, port) [triggers 3-way handshake].",
          "Data Transfer: send() / write() and recv() / read() full-duplex byte streams.",
          "Teardown: close() initiates FIN -> ACK -> FIN -> ACK four-way handshake."
        ]
      },
      {
        title: "2. TCP vs UDP Socket Tradeoffs",
        description:
          "Different application requirements dictate transport protocol selection.",
        points: [
          "TCP (SOCK_STREAM): Guarantees delivery via sequence numbers and ACK packets. Features sliding window flow control and congestion collapse avoidance. Best for Web (HTTP), Email (SMTP), and File Transfer (FTP).",
          "UDP (SOCK_DGRAM): Zero connection overhead, no retransmissions, low latency. Packets can arrive out-of-order or drop. Best for DNS lookup, VoIP, and real-time multiplayer gaming."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Bind Server Port",
        description: "Instantiate ServerSocket on designated port and start listening for inbound TCP connections."
      },
      {
        step: 2,
        title: "Accept Connection & Spawn Worker",
        description: "Call accept() to obtain client Socket handle; pass handle to worker thread for concurrency."
      },
      {
        step: 3,
        title: "Stream I/O & Graceful Close",
        description: "Read client payload, process business logic, write response buffer, and flush streams."
      }
    ],
    codeSnippets: {
      python: `import socket
import threading

def handle_client(conn, addr):
    print(f"[NEW CONNECTION] Connected by {addr}")
    with conn:
        while True:
            data = conn.recv(1024)
            if not data:
                break
            message = data.decode('utf-8')
            print(f"[{addr}] Received: {message}")
            conn.sendall(f"ECHO: {message}".encode('utf-8'))
    print(f"[DISCONNECTED] {addr} closed connection.")

def start_tcp_server(host='127.0.0.1', port=65432):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((host, port))
    server.listen(5)
    print(f"[LISTENING] Server is listening on {host}:{port}")
    
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.start()

# For lab test: Run in separate terminal or thread
# start_tcp_server()`,
      java: `import java.io.*;
import java.net.*;

public class EchoServer {
    public static void main(String[] args) throws IOException {
        int port = 65432;
        ServerSocket serverSocket = new ServerSocket(port);
        System.out.println("Java Server listening on port " + port);

        while (true) {
            Socket clientSocket = serverSocket.accept();
            new Thread(() -> {
                try (
                    BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                    PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
                ) {
                    String inputLine;
                    while ((inputLine = in.readLine()) != null) {
                        out.println("ECHO: " + inputLine);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }
}`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) connection setup (1 RTT for TCP handshake); O(M) transmission where M is bytes",
      spaceComplexity: "O(K) memory where K is active concurrent client sockets and buffer allocations",
      bestCase: "O(1) non-blocking event-driven socket poll",
      worstCase: "O(N) thread overhead in naive 1-thread-per-client architectures",
      notes: "High-concurrency servers use non-blocking I/O multiplexing (epoll in Linux, select/kqueue, Netty in Java)."
    },
    vivaQuestions: [
      {
        question: "Explain the TCP 3-Way Handshake step by step.",
        answer: "Step 1: Client sends SYN packet with initial sequence number x. Step 2: Server responds with SYN-ACK with its own sequence number y and ACK = x + 1. Step 3: Client sends ACK packet with ACK = y + 1. Connection is now ESTABLISHED."
      },
      {
        question: "What is the purpose of the TIME_WAIT state in TCP?",
        answer: "TIME_WAIT ensures the final ACK reaches the remote host (allowing retransmission if lost) and prevents delayed duplicate packets from an old connection from interfering with a newly opened connection on the same port."
      }
    ],
    realWorldApplications: [
      "Web servers (Nginx, Apache) handling millions of concurrent HTTP/HTTPS requests",
      "Financial trading systems using low-latency UDP multicast for market quotes",
      "Microservice RPC frameworks (gRPC) communicating over HTTP/2 TCP sockets"
    ],
    practiceProblems: [
      {
        title: "Multi-Client Chat Room Server",
        difficulty: "Hard",
        description: "Build a multi-client broadcast chat server where messages sent by any client are forwarded to all other active connected clients."
      }
    ]
  },

  "networks-routing-gfg": {
    id: "networks-routing-gfg",
    title: "Routing Algorithms: Distance Vector & Dijkstra Link State",
    subject: "Computer Networks Laboratory",
    provider: "GeeksforGeeks Reference",
    category: "Routing & Switching",
    readTime: "25 mins",
    difficulty: "Intermediate",
    simulatorUrl: "/labs/computer-networks",
    simulatorName: "Networks Packet & Socket Lab",
    overview:
      "Routing is the process of selecting paths across a network to deliver packets from source to destination. This guide covers Distance Vector Routing (Bellman-Ford algorithm, periodic neighboring routing table exchange, count-to-infinity problem) and Link State Routing (Dijkstra algorithm, link state broadcast advertisements, shortest path trees).",
    learningObjectives: [
      "Understand the difference between decentralized (Distance Vector) and global (Link State) routing",
      "Implement the Bellman-Ford algorithm and detect negative weight cycles",
      "Implement Dijkstra Shortest Path algorithm using an adjacency list and min-heap",
      "Analyze the Count-to-Infinity problem and solutions (Split Horizon, Poisoned Reverse)",
      "Compare Open Shortest Path First (OSPF) against Routing Information Protocol (RIP)"
    ],
    keyConcepts: [
      {
        title: "1. Distance Vector Routing (Bellman-Ford)",
        description:
          "Each router maintains a vector of shortest distances to all destinations and periodically advertises this vector only to its immediate physical neighbors.",
        points: [
          "Bellman-Ford Equation: D_x(y) = min_v { c(x, v) + D_v(y) } for all neighbors v.",
          "RIP Protocol: Uses Distance Vector with hop count metric (max 15 hops; 16 = infinity).",
          "Count to Infinity: Routing loops caused by slow propagation of link failure information."
        ]
      },
      {
        title: "2. Link State Routing (Dijkstra)",
        description:
          "Every router has complete global knowledge of the network topology by receiving Link State Advertisements (LSAs) flooded by all routers.",
        points: [
          "OSPF Protocol: Industry standard link-state protocol using bandwidth cost metrics.",
          "Algorithm: Computes Shortest Path Tree (SPT) with local router as root using Dijkstra's algorithm.",
          "Fast Convergence: Zero risk of routing loops; immediate recalculation upon link state change."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Initialize Distance Table",
        description: "Set distance to start node = 0, all other nodes = infinity; push start node to min-priority queue."
      },
      {
        step: 2,
        title: "Greedy Relaxation",
        description: "Extract node u with minimum distance; for each neighbor v, if dist[u] + weight(u, v) < dist[v], update dist[v] and push to queue."
      },
      {
        step: 3,
        title: "Construct Routing Table",
        description: "Trace back parent pointers to construct next-hop forwarding entries."
      }
    ],
    codeSnippets: {
      python: `import heapq

def dijkstra_routing(graph, start_node):
    # graph: dict of {node: [(neighbor, cost), ...]}
    distances = {node: float('infinity') for node in graph}
    previous = {node: None for node in graph}
    distances[start_node] = 0
    pq = [(0, start_node)]
    
    while pq:
        current_dist, u = heapq.heappop(pq)
        
        if current_dist > distances[u]:
            continue
            
        for neighbor, weight in graph[u]:
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = u
                heapq.heappush(pq, (distance, neighbor))
                
    return distances, previous

# Example Router Topology
topology = {
    'R1': [('R2', 2), ('R3', 5)],
    'R2': [('R1', 2), ('R3', 1), ('R4', 4)],
    'R3': [('R1', 5), ('R2', 1), ('R4', 2)],
    'R4': [('R2', 4), ('R3', 2)]
}

dists, prevs = dijkstra_routing(topology, 'R1')
print("Shortest Distances from R1:", dists)`
    },
    complexityAnalysis: {
      timeComplexity: "Dijkstra: O((V + E) log V) with min-heap; Bellman-Ford: O(V * E)",
      spaceComplexity: "O(V) for distances array and priority queue",
      bestCase: "O((V + E) log V)",
      worstCase: "O(V^2) with unindexed linear array",
      notes: "OSPF routers divide large enterprise networks into Areas (Area 0 Backbone) to constrain LSA flooding."
    },
    vivaQuestions: [
      {
        question: "What is the Count-to-Infinity problem and how does Split Horizon address it?",
        answer: "When a link goes down, neighbors may keep updating each other with stale circular distances that increment to infinity. Split Horizon prevents this by specifying that a router never advertises a route back out of the interface through which it learned that route."
      },
      {
        question: "Compare RIP and OSPF in terms of convergence speed and metric.",
        answer: "RIP uses hop count (max 15), converges slowly (30s periodic updates), and is prone to loops. OSPF uses link bandwidth cost, converges almost instantly via event-driven LSAs, and scales to massive enterprise networks."
      }
    ],
    realWorldApplications: [
      "BGP (Border Gateway Protocol) routing inter-domain traffic across global autonomous systems",
      "OSPF intra-datacenter spine-leaf network packet delivery",
      "GPS navigation road routing (Google Maps, Waze)"
    ],
    practiceProblems: [
      {
        title: "Bellman-Ford Negative Cycle Detector",
        difficulty: "Medium",
        description: "Implement Bellman-Ford in Python and detect if a network topology contains a negative cost cycle."
      }
    ]
  },

  "networks-w3schools": {
    id: "networks-w3schools",
    title: "W3Schools Networking & Protocols Reference",
    subject: "Computer Networks Laboratory",
    provider: "W3Schools Reference",
    category: "Network Fundamentals & Subnetting",
    readTime: "20 mins",
    difficulty: "Beginner",
    simulatorUrl: "/labs/computer-networks",
    simulatorName: "Networks Packet & Socket Lab",
    overview:
      "A hands-on, practical guide to computer network addressing, subnetting with CIDR masks, port allocations, and packet dissection. Master the calculation of Network ID, Broadcast ID, and usable host capacity across Class A, B, and C address spaces.",
    learningObjectives: [
      "Understand IPv4 32-bit dotted-decimal notation and binary bitmasks",
      "Calculate Subnet Masks, Network Addresses, and Broadcast Addresses for any CIDR prefix (/24, /26, /30)",
      "Distinguish public IP addresses from private IP ranges (RFC 1918)",
      "Identify common well-known application port numbers (HTTP: 80, HTTPS: 443, SSH: 22, DNS: 53)",
      "Understand Network Address Translation (NAT) and PAT (Port Address Translation)"
    ],
    keyConcepts: [
      {
        title: "1. CIDR Subnetting & Bitmask Mathematics",
        description:
          "CIDR replaces rigid Class A/B/C addressing with arbitrary prefix lengths /N indicating the number of fixed network bits.",
        points: [
          "Host Bits: H = 32 - N.",
          "Total Addresses: 2^H.",
          "Usable Host Capacity: 2^H - 2 (subtract Network ID [all host bits 0] and Broadcast ID [all host bits 1]).",
          "Example /26: H = 6 bits -> 2^6 = 64 total addresses -> 62 usable hosts. Subnet Mask: 255.255.255.192."
        ]
      },
      {
        title: "2. Private IP Ranges (RFC 1918) & NAT",
        description:
          "Private IPs are non-routable over the public internet and must be translated by a NAT router.",
        points: [
          "Class A Private: 10.0.0.0 to 10.255.255.255 (/8).",
          "Class B Private: 172.16.0.0 to 172.31.255.255 (/12).",
          "Class C Private: 192.168.0.0 to 192.168.255.255 (/16).",
          "NAT / PAT: Maps multiple private internal hosts to a single public IP using unique source port numbers."
        ]
      }
    ],
    algorithmSteps: [
      {
        step: 1,
        title: "Determine Host Bits",
        description: "Given CIDR prefix /N, calculate host bit count H = 32 - N."
      },
      {
        step: 2,
        title: "Compute Network Address",
        description: "Perform bitwise AND between IP address and Subnet Mask."
      },
      {
        step: 3,
        title: "Calculate Broadcast Address",
        description: "Set all H host bits to binary 1; add to network address."
      }
    ],
    codeSnippets: {
      python: `import ipaddress

def analyze_subnet(cidr_str: str):
    network = ipaddress.ip_network(cidr_str, strict=False)
    print(f"CIDR: {cidr_str}")
    print(f"Netmask: {network.netmask}")
    print(f"Network Address: {network.network_address}")
    print(f"Broadcast Address: {network.broadcast_address}")
    print(f"Total Addresses: {network.num_addresses}")
    print(f"Usable Host Range: {network.network_address + 1} - {network.broadcast_address - 1}")
    print(f"Usable Hosts Count: {network.num_addresses - 2}")

# Test Subnet Analysis
analyze_subnet("192.168.1.100/26")`
    },
    complexityAnalysis: {
      timeComplexity: "O(1) 32-bit bitwise AND/OR operations",
      spaceComplexity: "O(1) memory buffer",
      bestCase: "O(1)",
      worstCase: "O(1)",
      notes: "Subnet masking is executed at wire speed by hardware ternary content-addressable memory (TCAM) inside core network switches."
    },
    vivaQuestions: [
      {
        question: "Why do we subtract 2 when calculating usable hosts in a subnet?",
        answer: "The first address (where all host bits are 0) is reserved as the Network Address to identify the entire network. The last address (where all host bits are 1) is reserved as the Directed Broadcast Address to message all hosts on that subnet."
      },
      {
        question: "What is a /30 subnet typically used for?",
        answer: "A /30 subnet has 4 total addresses and exactly 2 usable hosts (2^2 - 2 = 2). It is universally used for point-to-point router links to conserve IPv4 address space."
      }
    ],
    realWorldApplications: [
      "VPC (Virtual Private Cloud) subnet design in AWS and Azure",
      "Enterprise LAN segmentation and VLAN security isolation",
      "Home Wi-Fi router DHCP IP lease configuration"
    ],
    practiceProblems: [
      {
        title: "Subnet Calculator",
        difficulty: "Easy",
        description: "Given IP 172.16.50.120 and mask 255.255.255.224 (/27), calculate the Network Address and Broadcast Address."
      }
    ]
  }
};
