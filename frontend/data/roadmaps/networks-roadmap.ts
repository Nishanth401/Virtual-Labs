import { DSACategory } from "../dsa-topic-data";

export const NETWORKS_ROADMAP_CATEGORIES: DSACategory[] = [
  {
    id: "cn-diagnostics-sockets",
    name: "1. Diagnostic Commands & TCP/UDP Sockets",
    shortDesc: "CLI diagnostic tools, TCP HTTP web clients, socket echo/chat, and UDP DNS.",
    iconName: "Network",
    topics: [
      {
        id: "cn-cli-tools-pdus",
        slug: "network-cli-commands-and-pdu-analysis",
        title: "Exp 1: Network Commands (tcpdump, netstat, ifconfig, traceroute) & PDU Capture",
        categoryId: "cn-diagnostics-sockets",
        categoryName: "1. Diagnostic Commands & TCP/UDP Sockets",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "tcpdump netstat ifconfig traceroute ping PDU capture",
        gfgUrl: "https://www.geeksforgeeks.org/basic-network-troubleshooting-commands-in-linux/",
        quickSummary: "Inspect interface configurations, active listening ports, route paths, and ICMP Echo Request/Reply PDUs.",
        keyPoints: [
          "ifconfig / ip addr inspects MAC, IP, netmask, and MTU packet limits.",
          "netstat -tuln displays active listening TCP/UDP ports and socket inodes.",
          "traceroute leverages incrementing TTL (Time to Live) values in IP headers."
        ],
        diagramTitle: "ICMP Echo PDU & TTL Route Discovery Packet Flow",
        diagram: `  Host A (Source)           Router 1 (TTL=1)         Router 2 (TTL=2)         Destination Host
    │                          │                        │                        │
    ├─ Ping (ICMP, TTL=1) ────►│ (Drops: Time Exceeded) │                        │
    │◄── ICMP TTL Expired ─────┤                        │                        │
    │                          │                        │                        │
    ├─ Ping (ICMP, TTL=2) ─────────────────────────────►│ (Drops: Time Exceeded) │
    │◄── ICMP TTL Expired ──────────────────────────────┤                        │
    │                          │                        │                        │
    ├─ Ping (ICMP, TTL=3) ──────────────────────────────────────────────────────►│ (Echo Reply)
    │◄── ICMP Echo Reply (RTT calculated) ───────────────────────────────────────┤`,
        complexities: [
          { operation: "ICMP Round Trip Time (RTT)", best: "O(1)", avg: "O(hops)", worst: "O(timeout)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "bash",
            label: "Linux CLI Commands",
            code: `# 1. Display interface IP, Netmask, Broadcast, MAC
ifconfig eth0 || ip addr show eth0

# 2. View active TCP/UDP listening ports and PIDs
netstat -tulpn

# 3. Trace route hops to destination using TTL incrementation
traceroute google.com

# 4. DNS resolution lookup via specific name server
nslookup -type=A github.com 8.8.8.8

# 5. Capture ICMP and TCP traffic on interface with tcpdump
sudo tcpdump -i eth0 -nn -c 10 icmp or port 80`
          }
        ],
        practiceProblems: [
          {
            title: "Network Diagnostic Commands",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/basic-network-troubleshooting-commands-in-linux/",
            platform: "GeeksforGeeks",
            topicTag: "Linux Networking"
          }
        ]
      },
      {
        id: "cn-http-web-client",
        slug: "http-web-client-tcp-socket",
        title: "Exp 2: HTTP Web Client using TCP Sockets",
        categoryId: "cn-diagnostics-sockets",
        categoryName: "1. Diagnostic Commands & TCP/UDP Sockets",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "HTTP web client TCP socket programming C Python",
        gfgUrl: "https://www.geeksforgeeks.org/socket-programming-cc/",
        quickSummary: "Establish raw TCP 3-way handshake on port 80, transmit HTTP/1.1 GET request, and parse response headers.",
        keyPoints: [
          "Establishes a raw TCP stream connection via socket(), connect(), send(), and recv().",
          "Transmits HTTP RFC-standard ASCII GET request terminated with \\r\\n\\r\\n.",
          "Parses Status-Line (HTTP/1.1 200 OK), Content-Length, and payload body."
        ],
        diagramTitle: "TCP 3-Way Handshake & HTTP GET Transaction",
        diagram: `  Client (Browser / Script)                     Web Server (Port 80)
    │                                                    │
    ├──── SYN (seq=x) ──────────────────────────────────►│ [SYN-RECEIVED]
    │◄─── SYN-ACK (seq=y, ack=x+1) ──────────────────────┤
    ├──── ACK (ack=y+1) ────────────────────────────────►│ [ESTABLISHED]
    │                                                    │
    ├──── "GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n" ────►│
    │◄─── "HTTP/1.1 200 OK\\r\\nContent-Type: text/html..." ─┤
    ├──── FIN ──────────────────────────────────────────►│ [CLOSING]`,
        complexities: [
          { operation: "TCP Connection Handshake", best: "O(1 RTT)", avg: "O(1 RTT)", worst: "O(timeout)", space: "O(buffer)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Raw TCP HTTP Client)",
            code: `import socket

host = "example.com"
port = 80

# 1. Create Stream TCP Socket
client_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_sock.connect((host, port))

# 2. Construct HTTP/1.1 GET Request
http_request = (
    f"GET / HTTP/1.1\\r\\n"
    f"Host: {host}\\r\\n"
    f"User-Agent: VirtualLabClient/1.0\\r\\n"
    f"Connection: close\\r\\n\\r\\n"
)
client_sock.sendall(http_request.encode('utf-8'))

# 3. Receive HTTP Response Stream
response = b""
while True:
    chunk = client_sock.recv(4096)
    if not chunk:
        break
    response += chunk

client_sock.close()
header_data, _, body_data = response.decode('utf-8', errors='ignore').partition("\\r\\n\\r\\n")
print("--- HTTP Headers ---\\n", header_data[:300])
print("\\n--- Body Length ---:", len(body_data), "bytes")`
          }
        ],
        practiceProblems: [
          {
            title: "TCP Socket Client Implementation",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/socket-programming-python/",
            platform: "GeeksforGeeks",
            topicTag: "TCP Sockets"
          }
        ]
      },
      {
        id: "cn-tcp-echo-chat",
        slug: "tcp-socket-echo-and-chat-applications",
        title: "Exp 3: TCP Socket Applications: Echo Server/Client & Multi-Client Chat",
        categoryId: "cn-diagnostics-sockets",
        categoryName: "1. Diagnostic Commands & TCP/UDP Sockets",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "TCP echo server client multi-threading chat socket",
        gfgUrl: "https://www.geeksforgeeks.org/simple-client-server-application-in-c/",
        quickSummary: "Build concurrent multi-threaded TCP server supporting Echo reflection and real-time broadcast chat rooms.",
        keyPoints: [
          "bind() assigns local IP and port; listen(backlog) configures pending connection queue.",
          "accept() returns a dedicated communication socket descriptor per connected client.",
          "Threaded message dispatching broadcasts chat messages across all active clients."
        ],
        diagramTitle: "Concurrent Multi-Client TCP Server Architecture",
        diagram: `┌────────────────────────────────────────────────────────┐
│ TCP Server Socket (bind: 0.0.0.0, port: 8080)          │
│ listen(backlog=10) ──► accept()                        │
├────────────────────────────┬───────────────────────────┤
│ Thread 1 (Client A: Alice) │ Thread 2 (Client B: Bob)  │
│ socket_fd = 4              │ socket_fd = 5             │
│ "Hello Everyone!"          │ Reads Broadcast Buffer    │
└─────────────┬──────────────┴─────────────▲─────────────┘
              │ Broadcast Event Dispatcher │
              └────────────────────────────┘`,
        complexities: [
          { operation: "Message Echo / Relay", best: "O(1)", avg: "O(active_clients)", worst: "O(active_clients)", space: "O(clients)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Threaded TCP Server)",
            code: `import socket
import threading

HOST = '127.0.0.1'
PORT = 8080
clients = []

def handle_client(conn, addr):
    print(f"[+] Client connected from {addr}")
    clients.append(conn)
    conn.sendall(b"Welcome to VLab Chat Server! Type exit to quit.\\n")
    
    while True:
        try:
            data = conn.recv(1024)
            if not data or data.strip() == b"exit":
                break
            # Broadcast message to all other connected peers
            broadcast_msg = f"[{addr[1]}]: ".encode() + data
            for c in clients:
                if c != conn:
                    c.sendall(broadcast_msg)
        except ConnectionResetError:
            break
            
    clients.remove(conn)
    conn.close()
    print(f"[-] Client {addr} disconnected.")

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind((HOST, PORT))
server.listen(5)
print(f"[*] Multi-threaded Chat Server listening on {HOST}:{PORT}")`
          }
        ],
        practiceProblems: [
          {
            title: "Multi-Client TCP Socket Server",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/socket-programming-in-java/",
            platform: "GeeksforGeeks",
            topicTag: "TCP Chat"
          }
        ]
      },
      {
        id: "cn-udp-dns",
        slug: "simulation-of-dns-using-udp-sockets",
        title: "Exp 4: Simulation of DNS using UDP Sockets",
        categoryId: "cn-diagnostics-sockets",
        categoryName: "1. Diagnostic Commands & TCP/UDP Sockets",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "DNS simulation UDP socket programming domain name resolution",
        gfgUrl: "https://www.geeksforgeeks.org/working-of-domain-name-system-dns-server/",
        quickSummary: "Simulate UDP Datagram DNS client-server translation from domain names to IPv4 addresses.",
        keyPoints: [
          "UDP is connectionless, low-overhead protocol (SOCK_DGRAM) ideal for rapid DNS lookup.",
          "sendto() and recvfrom() transmit datagram packets without 3-way handshake delay.",
          "DNS cache map returns IP records (e.g. www.vlab.edu -> 192.168.1.100)."
        ],
        diagramTitle: "UDP Datagram DNS Request-Response Cycle",
        diagram: `  DNS Client (UDP)                            DNS Server (Port 53)
    │                                                   │
    ├─ sendto("query: google.com") ────────────────────►│ Lookup in Domain Table
    │  (No Handshake, Port 53)                          │ {"google.com": "142.250.190.46"}
    │                                                   │
    │◄─ recvfrom("A: 142.250.190.46") ──────────────────┤
    ▼                                                   ▼
  Host resolves IP in 1-RTT                           Zero Session State Retained`,
        complexities: [
          { operation: "DNS UDP Lookup", best: "O(1)", avg: "O(1) Hash Map", worst: "O(n) Table Scan", space: "O(records)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (DNS Server & Client)",
            code: `import socket

DNS_TABLE = {
    "google.com": "142.250.190.46",
    "github.com": "140.82.121.4",
    "vsb.ac.in": "103.154.241.12",
    "virtuallabs.edu": "192.168.10.50"
}

# DNS Server Simulation
def run_dns_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server.bind(("127.0.0.1", 5353))
    print("[*] UDP DNS Server active on 127.0.0.1:5353")
    
    while True:
        domain_query, client_addr = server.recvfrom(512)
        domain = domain_query.decode('utf-8').strip()
        ip_response = DNS_TABLE.get(domain, "NXDOMAIN: Not Found")
        server.sendto(ip_response.encode('utf-8'), client_addr)
        print(f"[DNS] Resolved '{domain}' -> {ip_response} for {client_addr}")`
          }
        ],
        practiceProblems: [
          {
            title: "DNS Resolution with UDP Datagrams",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/working-of-domain-name-system-dns-server/",
            platform: "GeeksforGeeks",
            topicTag: "DNS UDP"
          }
        ]
      }
    ]
  },
  {
    id: "cn-protocols-routing",
    name: "2. Protocol Simulation, Routing & Error Control",
    shortDesc: "Wireshark sniffing, ARP/RARP translation, NS congestion, routing, and CRC.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "cn-wireshark-sniffing",
        slug: "wireshark-packet-capture-and-examination",
        title: "Exp 5: Packet Capture & Examination using Wireshark",
        categoryId: "cn-protocols-routing",
        categoryName: "2. Protocol Simulation, Routing & Error Control",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Wireshark packet capture analysis TCP flags filter",
        gfgUrl: "https://www.geeksforgeeks.org/packet-sniffing-using-wireshark/",
        quickSummary: "Capture live Ethernet frames, dissect TCP SYN/ACK flags, and inspect HTTP/DNS payloads.",
        keyPoints: [
          "Promiscuous mode captures all frames transmitted on the local collision domain.",
          "Display filters (tcp.flags.syn==1, ip.addr==x.x.x.x, http) isolate targeted flows.",
          "Inspects Ethernet II MAC headers, IPv4 TTL/Checksum, and TCP sequence numbers."
        ],
        diagramTitle: "Wireshark Packet Dissection Hierarchy",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Frame 12: 74 bytes on wire (Ethernet II)               │
├────────────────────────────────────────────────────────┤
│ Ethernet II: Src: 00:1a:2b:3c:4d:5e, Dst: f0:de:f1:... │
│ Internet Protocol Version 4: Src: 192.168.1.5, Dst:... │
│ Transmission Control Protocol: Src Port: 54321, Dst: 80│
│   Flags: 0x002 (SYN) [Window Size: 64240, MSS: 1460]   │
└────────────────────────────────────────────────────────┘`,
        complexities: [
          { operation: "Packet Capture & Filter", best: "O(1)", avg: "O(packet_rate)", worst: "O(packet_rate)", space: "O(buffer)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Raw Packet Sniffer)",
            code: `import socket
import struct

# Raw Socket Sniffer (Linux/Unix)
def sniff_packets():
    sniffer = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(0x0003))
    print("[*] Capturing raw Ethernet frames...")
    
    for _ in range(5):
        raw_data, _ = sniffer.recvfrom(65535)
        dest_mac, src_mac, proto = struct.unpack('! 6s 6s H', raw_data[:14])
        print(f"Ethernet Frame -> Proto: {socket.htons(proto):#04x}")
        # Parse IPv4 Packet if proto == 0x0800
        if socket.htons(proto) == 0x0800:
            ip_header = raw_data[14:34]
            iph = struct.unpack('!BBHHHBBH4s4s', ip_header)
            src_ip = socket.inet_ntoa(iph[8])
            dst_ip = socket.inet_ntoa(iph[9])
            print(f"  IPv4 Header -> Src: {src_ip} -> Dst: {dst_ip}, TTL: {iph[5]}")`
          }
        ],
        practiceProblems: [
          {
            title: "Packet Analysis & Wireshark Filters",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/packet-sniffing-using-wireshark/",
            platform: "GeeksforGeeks",
            topicTag: "Wireshark"
          }
        ]
      },
      {
        id: "cn-arp-rarp",
        slug: "simulation-of-arp-rarp-protocols",
        title: "Exp 6: Simulation of ARP / RARP Protocols",
        categoryId: "cn-protocols-routing",
        categoryName: "2. Protocol Simulation, Routing & Error Control",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "ARP RARP protocol simulation Address Resolution Protocol C Python",
        gfgUrl: "https://www.geeksforgeeks.org/how-address-resolution-protocol-arp-works/",
        quickSummary: "Simulate Address Resolution Protocol (IP -> MAC) and Reverse ARP (MAC -> IP) with ARP cache tables.",
        keyPoints: [
          "ARP Request is a broadcast frame (FF:FF:FF:FF:FF:FF) asking 'Who has IP X?'.",
          "ARP Reply is a unicast frame from target returning its hardware MAC address.",
          "ARP Cache prevents redundant broadcast flooding by storing IP-MAC mappings."
        ],
        diagramTitle: "ARP Request Broadcast & Unicast Reply Flow",
        diagram: `  Host A (192.168.1.10)        Switch / Broadcast Bus       Host B (192.168.1.20)
    │                                    │                                  │
    ├─ ARP Request (Who has .20?) ──────►│ ──── Broadcast to ALL ──────────►│
    │  [Broadcast: FF:FF:FF:FF:FF:FF]    │                                  │
    │                                    │                                  │
    │◄─ ARP Reply (I am .20, MAC=00:1A) ─┼───── Unicast directly to A ──────┤
    ▼                                                                       ▼
  Host A caches (.20 -> 00:1A)                                Host B caches (.10 -> MAC_A)`,
        complexities: [
          { operation: "ARP Cache Lookup", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(entries)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (ARP Simulation)",
            code: `class ARPSimulator:
    def __init__(self):
        # Network Topology IP to MAC Ground Truth
        self.network_hosts = {
            "192.168.1.1": "00:50:56:C0:00:01",
            "192.168.1.2": "00:50:56:C0:00:02",
            "192.168.1.3": "00:50:56:C0:00:03"
        }
        self.arp_cache = {}

    def resolve_ip(self, ip):
        # Check Cache
        if ip in self.arp_cache:
            print(f"[CACHE HIT] {ip} -> {self.arp_cache[ip]}")
            return self.arp_cache[ip]
        
        # Broadcast ARP Request
        print(f"[BROADCAST] ARP Request: Who has {ip}? Tell 192.168.1.1")
        if ip in self.network_hosts:
            mac = self.network_hosts[ip]
            print(f"[UNICAST] ARP Reply from {ip}: MAC is {mac}")
            self.arp_cache[ip] = mac
            return mac
        else:
            print(f"[ERROR] Destination host {ip} unreachable.")
            return None

arp = ARPSimulator()
arp.resolve_ip("192.168.1.2")
arp.resolve_ip("192.168.1.2")  # Cache hit`
          }
        ],
        practiceProblems: [
          {
            title: "Address Resolution Protocol Simulation",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/how-address-resolution-protocol-arp-works/",
            platform: "GeeksforGeeks",
            topicTag: "ARP/RARP"
          }
        ]
      },
      {
        id: "cn-ns-congestion",
        slug: "network-simulator-and-congestion-control",
        title: "Exp 7: Study of Network Simulator (NS) & Congestion Control Algorithms",
        categoryId: "cn-protocols-routing",
        categoryName: "2. Protocol Simulation, Routing & Error Control",
        difficulty: "Advanced",
        estimatedTime: "30 mins",
        gfgSearchQuery: "TCP congestion control slow start congestion avoidance AIMD NS2",
        gfgUrl: "https://www.geeksforgeeks.org/tcp-congestion-control/",
        quickSummary: "Simulate TCP Reno/Tahoe congestion control: Slow Start, Congestion Avoidance (AIMD), and Fast Recovery.",
        keyPoints: [
          "Slow Start doubles Congestion Window (cwnd) exponentially every RTT until ssthresh.",
          "Congestion Avoidance increases cwnd linearly (+1 MSS per RTT) (Additive Increase).",
          "Packet Drop triggers Multiplicative Decrease (ssthresh = cwnd / 2)."
        ],
        diagramTitle: "TCP AIMD Sawtooth Congestion Window Progression",
        diagram: `   cwnd (MSS) ▲
           32 │                    /\\ [Loss Event: Multiplicative Decrease]
           16 │          ssthresh ┌───┐
            8 │          /‾‾‾‾‾‾‾ │   \\
            4 │         /  Linear │    \\
            2 │   _--""   (AIMD)  │     \\
            1 └──┴────────────────┴──────┴────────► RTTs (Time)
                 Slow Start (Exponential)`,
        complexities: [
          { operation: "Window Update per ACK", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (TCP Congestion Simulator)",
            code: `class TCPCongestionSimulator:
    def __init__(self, ssthresh=16):
        self.cwnd = 1.0
        self.ssthresh = ssthresh
        self.history = []

    def on_ack(self):
        if self.cwnd < self.ssthresh:
            # Slow Start: Exponential Increase
            self.cwnd += 1.0
        else:
            # Congestion Avoidance: Additive Increase
            self.cwnd += 1.0 / self.cwnd
        self.history.append(self.cwnd)

    def on_loss(self):
        # Multiplicative Decrease
        self.ssthresh = max(2.0, self.cwnd / 2.0)
        self.cwnd = 1.0  # TCP Tahoe reset (or cwnd=ssthresh for Reno)
        self.history.append(self.cwnd)

sim = TCPCongestionSimulator(ssthresh=8)
for _ in range(15): sim.on_ack()
print("Cwnd before loss:", round(sim.cwnd, 2))
sim.on_loss()
print("Cwnd after packet loss event:", sim.cwnd, "New ssthresh:", sim.ssthresh)`
          }
        ],
        practiceProblems: [
          {
            title: "TCP Congestion Control Simulation",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/tcp-congestion-control/",
            platform: "GeeksforGeeks",
            topicTag: "Congestion Control"
          }
        ]
      },
      {
        id: "cn-tcp-udp-perf",
        slug: "tcp-udp-performance-study",
        title: "Exp 8: Study of TCP/UDP Performance using Simulation Tool",
        categoryId: "cn-protocols-routing",
        categoryName: "2. Protocol Simulation, Routing & Error Control",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "TCP vs UDP throughput latency jitter packet loss performance",
        gfgUrl: "https://www.geeksforgeeks.org/differences-between-tcp-and-udp/",
        quickSummary: "Compare Throughput (Mbps), Latency (ms), Jitter, and Packet Delivery Ratio between TCP and UDP streams.",
        keyPoints: [
          "TCP guarantees reliability, in-order delivery, and flow control at the cost of latency overhead.",
          "UDP prioritizes throughput and real-time delivery with zero acknowledgment handshakes.",
          "iperf3 / socket benchmarking quantifies bandwidth saturation."
        ],
        diagramTitle: "TCP vs UDP Throughput vs Latency Tradeoff",
        diagram: `┌────────────────────────────────────────────────────────┐
│ Metric Comparison: TCP (Reliable) vs UDP (Real-Time)   │
├─────────────────────┬──────────────────┬───────────────┤
│ Metric              │ TCP Stream       │ UDP Datagram  │
├─────────────────────┼──────────────────┼───────────────┤
│ Handshake Overhead  │ 3-Way SYN/ACK    │ Zero Overhead │
│ Flow & Congestion   │ Yes (Windowing)  │ None          │
│ Retransmission      │ ARQ on Loss      │ Drops Packets │
│ Latency Variance    │ Higher (Jitter)  │ Low & Uniform │
│ Best Suited For     │ HTTP, SSH, Files │ Video, Voice  │
└─────────────────────┴──────────────────┴───────────────┘`,
        complexities: [
          { operation: "UDP Packet Transmission", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "TCP Flow Tracking", best: "O(1)", avg: "O(window_size)", worst: "O(window_size)", space: "O(window)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Throughput Benchmark)",
            code: `import time
import socket

def benchmark_udp_throughput(host="127.0.0.1", port=9999, duration=1.0):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    payload = b"X" * 1024  # 1 KB packet
    bytes_sent = 0
    start_time = time.time()
    
    while time.time() - start_time < duration:
        try:
            sock.sendto(payload, (host, port))
            bytes_sent += len(payload)
        except Exception:
            break
            
    elapsed = time.time() - start_time
    mbps = (bytes_sent * 8) / (elapsed * 1_000_000)
    print(f"UDP Throughput: {mbps:.2f} Mbps ({bytes_sent / 1024 / 1024:.2f} MB transmitted in {elapsed:.2f}s)")

benchmark_udp_throughput()`
          }
        ],
        practiceProblems: [
          {
            title: "Socket Performance & Throughput Analysis",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/differences-between-tcp-and-udp/",
            platform: "GeeksforGeeks",
            topicTag: "Performance"
          }
        ]
      },
      {
        id: "cn-routing-algorithms",
        slug: "simulation-of-distance-vector-link-state-routing",
        title: "Exp 9: Simulation of Distance Vector / Link State Routing Algorithm",
        categoryId: "cn-protocols-routing",
        categoryName: "2. Protocol Simulation, Routing & Error Control",
        difficulty: "Advanced",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Distance Vector Routing Bellman Ford Link State Dijkstra routing algorithm",
        gfgUrl: "https://www.geeksforgeeks.org/routing-algorithms-in-computer-networks/",
        quickSummary: "Simulate Distance Vector (Bellman-Ford equation D_x(y) = min_v{c(x,v) + D_v(y)}) and Link State (Dijkstra) shortest path.",
        keyPoints: [
          "Distance Vector shares full routing tables periodically with direct neighbors.",
          "Link State broadcasts link state packets (LSPs) across the whole network for global topology calculation.",
          "Dijkstra builds Shortest Path Tree (SPT) rooted at the current router."
        ],
        diagramTitle: "Distance Vector Bellman-Ford Convergence",
        diagram: `      (1) Router A ──── 2 ──── Router B (2)
           │                        │
           7                        1
           │                        │
      (3) Router C ──── 3 ──── Router D (4)
      Bellman-Ford Equation:
      D_A(D) = min { c(A, B) + D_B(D), c(A, C) + D_C(D) }
             = min { 2 + 1, 7 + 3 } = 3 (Path: A -> B -> D)`,
        complexities: [
          { operation: "Distance Vector Update", best: "O(V)", avg: "O(V * E)", worst: "O(V * E)", space: "O(V^2)" },
          { operation: "Dijkstra Link State (Min-Heap)", best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)", space: "O(V + E)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (Distance Vector Simulator)",
            code: `def distance_vector_routing(cost_matrix, num_nodes):
    # Initialize Distance Tables: dist[i][j] is shortest dist from i to j
    dist = [row[:] for row in cost_matrix]
    
    # Bellman-Ford Dynamic Programming Relaxation
    for _ in range(num_nodes - 1):
        for i in range(num_nodes):
            for j in range(num_nodes):
                for k in range(num_nodes):
                    if dist[i][k] + cost_matrix[k][j] < dist[i][j]:
                        dist[i][j] = dist[i][k] + cost_matrix[k][j]
                        
    print("--- Converged Distance Vector Routing Table ---")
    for i in range(num_nodes):
        print(f"Router {chr(65+i)}:", [f"{chr(65+j)}: {dist[i][j]}" for j in range(num_nodes)])

INF = 999
graph = [
    [0, 2, 7, INF],
    [2, 0, INF, 1],
    [7, INF, 0, 3],
    [INF, 1, 3, 0]
]
distance_vector_routing(graph, 4)`
          }
        ],
        practiceProblems: [
          {
            title: "Shortest Path Routing in Networks",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/distance-vector-routing-dvr-protocol/",
            platform: "GeeksforGeeks",
            topicTag: "Routing"
          }
        ]
      },
      {
        id: "cn-crc-error-code",
        slug: "simulation-of-error-correction-code-crc",
        title: "Exp 10: Simulation of Error Correction & Detection Code (CRC)",
        categoryId: "cn-protocols-routing",
        categoryName: "2. Protocol Simulation, Routing & Error Control",
        difficulty: "Intermediate",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Cyclic Redundancy Check CRC polynomial division C Python",
        gfgUrl: "https://www.geeksforgeeks.org/cyclic-redundancy-check-python/",
        quickSummary: "Simulate Cyclic Redundancy Check (CRC-32/CRC-CCITT) modulo-2 polynomial division for transmission frame verification.",
        keyPoints: [
          "Transmitter appends (k - 1) zeros to dataword and divides by generator polynomial G(x) using XOR.",
          "The remainder (FCS / CRC checksum) replaces trailing zeros to form the transmitted codeword.",
          "Receiver verifies frame: dividing codeword by G(x) must yield zero remainder."
        ],
        diagramTitle: "Modulo-2 Binary Polynomial Division (XOR)",
        diagram: `   Dataword: 110100   Generator G(x): 1011 (Degree 3)
   Appended zeros: 110100 000

        111100 (Quotient)
   1011 ┌─────────────────
        │ 110100000
        │ 1011
        └───────
          01100
           1011
          ──────
           01110
            1011
           ──────
            01010
             1011
            ──────
             000100
                ... -> Remainder (CRC checksum) = 011`,
        complexities: [
          { operation: "CRC Calculation (Bitwise XOR)", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "Python (CRC Checksum Generator & Verifier)",
            code: `def xor(a, b):
    result = []
    for i in range(1, len(b)):
        result.append('0' if a[i] == b[i] else '1')
    return ''.join(result)

def mod2div(dividend, divisor):
    pick = len(divisor)
    tmp = dividend[0:pick]
    while pick < len(dividend):
        if tmp[0] == '1':
            tmp = xor(divisor, tmp) + dividend[pick]
        else:
            tmp = xor('0' * pick, tmp) + dividend[pick]
        pick += 1
    if tmp[0] == '1':
        tmp = xor(divisor, tmp)
    else:
        tmp = xor('0' * pick, tmp)
    return tmp

def encode_data(data, key):
    appended_data = data + '0' * (len(key) - 1)
    remainder = mod2div(appended_data, key)
    codeword = data + remainder
    print(f"Data: {data}, Key: {key}, Remainder: {remainder}, Codeword: {codeword}")
    return codeword

# Verification
codeword = encode_data("100100", "1101")
rx_remainder = mod2div(codeword, "1101")
print("Receiver Verification Remainder:", rx_remainder, "-> Error Free!" if int(rx_remainder) == 0 else "-> Corrupted!")`
          }
        ],
        practiceProblems: [
          {
            title: "Cyclic Redundancy Check Modulo-2 Division",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/cyclic-redundancy-check-python/",
            platform: "GeeksforGeeks",
            topicTag: "CRC Error Check"
          }
        ]
      }
    ]
  }
];
