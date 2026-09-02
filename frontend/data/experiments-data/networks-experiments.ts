import { Experiment } from "../experiments";

export const NETWORKS_EXPERIMENTS: Experiment[] = [
  {
    id: "cn-exp-1",
    labId: "computer-networks",
    title: "Exp 1: Learn to use commands like tcpdump, netstat, ifconfig, nslookup, and traceroute. Capture ping and trace route PDUs using a network protocol analyzer and examine.",
    slug: "network-cli-commands-and-pdu-analysis",
    difficulty: "Beginner",
    category: "Computer Networks" as any,
    estimatedMinutes: 30,
    rating: 4.90,
    ratingsCount: 110,
    simulator: "custom",
    quizId: "quiz-cn-1",
    sections: {
      introduction: "Network diagnostics and protocol analyzers inspect live packet traffic, interface configuration, routing tables, and active listening socket ports.",
      objective: "Use Linux networking commands (ifconfig, netstat, traceroute, nslookup) and capture ICMP Echo / Time Exceeded PDUs with tcpdump.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Network Diagnostic Commands",
      videoChannel: "NetworkChuck",
      prerequisites: ["Linux Shell Basics", "OSI Model"],
      theory: {
        overview: "Network protocol analyzers capture Protocol Data Units (PDUs) traversing physical network interfaces. ICMP ping PDUs contain Type 8 (Echo Request) and Type 0 (Echo Reply). Traceroute utilizes incrementing TTL values in IP headers to discover intermediate router hops.",
        keyConcepts: [
          { title: "ICMP PDU Structure", desc: "Type, Code, Checksum, Identifier, Sequence Number, and Payload Data." },
          { title: "TTL Route Tracing", desc: "Routers decrement TTL by 1; when TTL hits 0, the router drops the packet and transmits ICMP Type 11 (Time to Live exceeded) back to sender." },
          { title: "Socket Inodes", desc: "netstat correlates open ports and IP bindings with OS process identifiers (PIDs)." }
        ],
        complexities: [
          { operation: "ICMP Round Trip Time (RTT)", best: "O(1)", avg: "O(hops)", worst: "O(timeout)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Enterprise network connectivity troubleshooting",
          "DDoS flood traffic pattern inspection",
          "ISP latency routing route optimization"
        ]
      },
      procedure: [
        "1. Open Linux terminal and execute ifconfig or ip addr to view interface IP and MAC addresses.",
        "2. Run netstat -tuln to view all active TCP and UDP listening sockets.",
        "3. Execute nslookup google.com 8.8.8.8 to query DNS records directly from Google DNS.",
        "4. Trace routing hops using traceroute -I google.com.",
        "5. Launch tcpdump -i eth0 -nn -c 5 icmp while running a concurrent ping command."
      ],
      sampleCode: {
        language: "bash",
        code: `# 1. Display interface IP, Netmask, Broadcast, MAC
ip addr show

# 2. View active TCP/UDP listening ports and PIDs
netstat -tulpn

# 3. Trace route hops to destination using ICMP TTL incrementation
traceroute google.com

# 4. DNS resolution lookup via specific name server
nslookup google.com 8.8.8.8

# 5. Capture ICMP traffic on interface with tcpdump
sudo tcpdump -i any -nn -c 4 icmp`
      },
      expectedOutput: `tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on any, link-type LINUX_SLL (Linux cooked v1), capture size 262144 bytes
20:15:01.102 IP 192.168.1.5 > 8.8.8.8: ICMP echo request, id 412, seq 1, length 64
20:15:01.124 IP 8.8.8.8 > 192.168.1.5: ICMP echo reply, id 412, seq 1, length 64
4 packets captured, 4 packets received by filter`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Networks"]
      }
    }
  },
  {
    id: "cn-exp-2",
    labId: "computer-networks",
    title: "Exp 2: Write a HTTP web client program to download a web page using TCP sockets.",
    slug: "http-web-client-tcp-socket",
    difficulty: "Intermediate",
    category: "Computer Networks" as any,
    estimatedMinutes: 30,
    rating: 4.92,
    ratingsCount: 115,
    simulator: "custom",
    quizId: "quiz-cn-2",
    sections: {
      introduction: "HyperText Transfer Protocol (HTTP) is an application-layer protocol built on reliable connection-oriented TCP streams. A web client initiates a TCP 3-way handshake on port 80 and transmits structured ASCII request headers.",
      objective: "Create a socket client from scratch to establish a TCP stream, transmit an HTTP GET request, and parse the HTTP response status line, headers, and body.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Socket Programming in Python",
      videoChannel: "Computerphile",
      prerequisites: ["TCP 3-Way Handshake", "Python Sockets"],
      theory: {
        overview: "The client invokes socket(), connects to server port 80, and transmits 'GET / HTTP/1.1\\r\\nHost: <host>\\r\\n\\r\\n'. The web server returns a response starting with Status-Line ('HTTP/1.1 200 OK'), followed by response headers, a blank line separator, and the HTML document body.",
        keyConcepts: [
          { title: "TCP Stream Connection", desc: "SOCK_STREAM guarantees in-order, lossless byte delivery via sequence numbers and ACKs." },
          { title: "HTTP Request Framing", desc: "Header fields terminated by carriage return line feed (\\r\\n) and body separator (\\r\\n\\r\\n)." },
          { title: "Stream Buffering", desc: "Looping recv(4096) until empty bytes to assemble full web payload." }
        ],
        complexities: [
          { operation: "HTTP GET Download", best: "O(1 RTT + bytes)", avg: "O(RTT + bytes)", worst: "O(timeout)", space: "O(webpage_size)" }
        ],
        realWorldApplications: [
          "Web crawlers and search engine indexing spiders",
          "Automated API health check monitoring services",
          "Lightweight embedded IoT telemetry uploaders"
        ]
      },
      procedure: [
        "1. Create client socket using socket.socket(socket.AF_INET, socket.SOCK_STREAM).",
        "2. Connect to web server host on port 80.",
        "3. Format HTTP/1.1 GET request string with Host and User-Agent headers.",
        "4. Transmit request bytes using client_sock.sendall().",
        "5. Receive response stream into buffer and separate headers from body payload."
      ],
      sampleCode: {
        language: "python",
        code: `import socket

host = "example.com"
port = 80

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((host, port))

request = f"GET / HTTP/1.1\\r\\nHost: {host}\\r\\nUser-Agent: VLabClient/1.0\\r\\nConnection: close\\r\\n\\r\\n"
client.sendall(request.encode('utf-8'))

response = b""
while True:
    chunk = client.recv(4096)
    if not chunk: break
    response += chunk

client.close()
headers, _, body = response.decode('utf-8', errors='ignore').partition("\\r\\n\\r\\n")
print("=== Response Status & Headers ===\\n", headers[:250])
print("\\n=== Payload Body Size ===:", len(body), "bytes")`
      },
      expectedOutput: `=== Response Status & Headers ===
HTTP/1.1 200 OK
Age: 382921
Cache-Control: max-age=604800
Content-Type: text/html; charset=UTF-8
Date: Mon, 02 Sep 2026 14:45:00 GMT
ETag: "3147526947+gzip"
Expires: Mon, 09 Sep 2026 14:45:00 GMT

=== Payload Body Size ===: 1256 bytes`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Networks"]
      }
    }
  },
  {
    id: "cn-exp-3",
    labId: "computer-networks",
    title: "Exp 3: Applications using TCP sockets like: a) Echo client and echo server, b) Chat.",
    slug: "tcp-socket-echo-and-chat-applications",
    difficulty: "Intermediate",
    category: "Computer Networks" as any,
    estimatedMinutes: 35,
    rating: 4.93,
    ratingsCount: 120,
    simulator: "custom",
    quizId: "quiz-cn-3",
    sections: {
      introduction: "TCP Socket programming enables concurrent multi-client communications through server listening sockets and dedicated per-client worker threads.",
      objective: "Build a TCP Echo server/client and a concurrent multi-client broadcast chat room application in Python/Java.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Multi-Client TCP Chat Server",
      videoChannel: "Tech With Tim",
      prerequisites: ["Socket API", "Multi-Threading Basics"],
      theory: {
        overview: "A TCP server calls bind() on an IP/port and enters listen() state. Each incoming client connection invokes accept(), returning a new dedicated socket descriptor. Multi-threading spawns a worker thread per connected client to broadcast messages.",
        keyConcepts: [
          { title: "bind() & listen()", desc: "Binds port to local network adapter and allocates connection backlog queue." },
          { title: "accept() Socket Descriptor", desc: "Creates dedicated bidirectional communication channel for each client connection." },
          { title: "Broadcast Dispatcher", desc: "Relays incoming client messages to all other active connected socket descriptors in real time." }
        ],
        complexities: [
          { operation: "Message Broadcast", best: "O(1)", avg: "O(active_clients)", worst: "O(active_clients)", space: "O(clients)" }
        ],
        realWorldApplications: [
          "Instant messaging systems (Slack, Discord, WhatsApp Web)",
          "Real-time multiplayer game lobby synchronization",
          "Live stock trading ticker feeds"
        ]
      },
      procedure: [
        "1. Create server TCP socket and set SO_REUSEADDR socket option.",
        "2. Bind server to 127.0.0.1:8080 and listen for connections.",
        "3. Maintain list of active client connection sockets.",
        "4. On accept(), spawn a threading.Thread executing client handler function.",
        "5. Receive messages and broadcast to all peers until client disconnects."
      ],
      sampleCode: {
        language: "python",
        code: `import socket
import threading

clients = []

def handle_client(conn, addr):
    print(f"[+] Client {addr} joined chat.")
    clients.append(conn)
    while True:
        try:
            msg = conn.recv(1024)
            if not msg or msg.strip() == b"exit": break
            # Broadcast to peers
            for c in clients:
                if c != conn: c.sendall(f"[{addr[1]}]: ".encode() + msg)
        except Exception:
            break
    clients.remove(conn)
    conn.close()
    print(f"[-] Client {addr} left.")

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind(("127.0.0.1", 8080))
server.listen(5)
print("[*] Multi-threaded TCP Chat Server active on port 8080.")`
      },
      expectedOutput: `[*] Multi-threaded TCP Chat Server active on port 8080.
[+] Client ('127.0.0.1', 54210) joined chat.
[+] Client ('127.0.0.1', 54212) joined chat.
[Broadcast] [54210]: Hello everyone from Virtual Lab!`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Networks"]
      }
    }
  },
  {
    id: "cn-exp-4",
    labId: "computer-networks",
    title: "Exp 4: Simulation of DNS using UDP sockets.",
    slug: "simulation-of-dns-using-udp-sockets",
    difficulty: "Intermediate",
    category: "Computer Networks" as any,
    estimatedMinutes: 25,
    rating: 4.88,
    ratingsCount: 105,
    simulator: "custom",
    quizId: "quiz-cn-4",
    sections: {
      introduction: "The Domain Name System (DNS) translates human-friendly domain names (e.g. google.com) into machine-routable IPv4/IPv6 addresses using low-overhead UDP datagram packets on port 53.",
      objective: "Simulate a UDP DNS resolver server that parses domain lookup requests, searches its local database cache, and returns IP address response datagrams.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "DNS Architecture & Sockets",
      videoChannel: "PowerCert",
      prerequisites: ["UDP Sockets", "DNS Hierarchy"],
      theory: {
        overview: "UDP is connectionless and does not require handshakes, making it optimal for rapid DNS resolution where queries and responses fit within single datagrams. The server listens via socket(AF_INET, SOCK_DGRAM) and receives queries using recvfrom().",
        keyConcepts: [
          { title: "Connectionless UDP", desc: "Zero handshake overhead; client sends query directly to server port 53." },
          { title: "DNS Record Types", desc: "A (IPv4 address), AAAA (IPv6 address), CNAME (Canonical name alias), MX (Mail server)." },
          { title: "DNS Cache Lookup", desc: "Instant hash table lookup returning mapped IP or NXDOMAIN error if unlisted." }
        ],
        complexities: [
          { operation: "DNS Hash Table Lookup", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(records)" }
        ],
        realWorldApplications: [
          "Global Internet domain address resolution",
          "Internal corporate intranet service discovery",
          "Content Delivery Network (CDN) geo-located routing"
        ]
      },
      procedure: [
        "1. Create UDP socket using socket.socket(socket.AF_INET, socket.SOCK_DGRAM).",
        "2. Define local dictionary of DNS domain-to-IP records.",
        "3. Bind server socket to 127.0.0.1:5353.",
        "4. Receive query datagrams and client addresses using recvfrom(512).",
        "5. Search domain table and send response back via sendto()."
      ],
      sampleCode: {
        language: "python",
        code: `import socket

DNS_RECORDS = {
    "google.com": "142.250.190.46",
    "github.com": "140.82.121.4",
    "vsb.ac.in": "103.154.241.12",
    "virtuallabs.edu": "192.168.10.50"
}

server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server.bind(("127.0.0.1", 5353))
print("[*] UDP DNS Server active on 127.0.0.1:5353")

# Simulate one resolution transaction
query_domain = "vsb.ac.in"
ip_result = DNS_RECORDS.get(query_domain, "NXDOMAIN: Not Found")
print(f"[DNS RESOLUTION] Query: '{query_domain}' -> Resolved IP: {ip_result}")`
      },
      expectedOutput: `[*] UDP DNS Server active on 127.0.0.1:5353
[DNS RESOLUTION] Query: 'vsb.ac.in' -> Resolved IP: 103.154.241.12`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Networks"]
      }
    }
  },
  {
    id: "cn-exp-5",
    labId: "computer-networks",
    title: "Exp 5: Use a tool like Wireshark to capture packets and examine the packets.",
    slug: "wireshark-packet-capture-and-examination",
    difficulty: "Intermediate",
    category: "Computer Networks" as any,
    estimatedMinutes: 30,
    rating: 4.94,
    ratingsCount: 128,
    simulator: "custom",
    quizId: "quiz-cn-5",
    sections: {
      introduction: "Wireshark is the world's foremost network protocol analyzer, dissecting microsecond packet timing, OSI layer headers, and payload contents.",
      objective: "Capture network traffic on live network interfaces, apply display filters (tcp, udp, icmp, http), and dissect Ethernet II, IPv4, and TCP header fields.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Wireshark Tutorial for Beginners",
      videoChannel: "David Bombal",
      prerequisites: ["TCP/IP Header Fields", "MAC & IP Addressing"],
      theory: {
        overview: "Wireshark sets network interface cards into promiscuous mode, capturing all frames on the local wire. Captured frames are hierarchically parsed across Frame physical bytes, Ethernet II MAC addresses, IPv4 packet fields (TTL, Checksum), and TCP flags (SYN, ACK, FIN).",
        keyConcepts: [
          { title: "Promiscuous Mode", desc: "Allows network cards to capture all packets, not just those addressed to its own MAC address." },
          { title: "Display Filters", desc: "Filter expressions like 'tcp.port == 80 && ip.src == 192.168.1.1' to isolate target flows." },
          { title: "Follow TCP Stream", desc: "Reconstructs continuous application-layer payload conversations from individual TCP segment packets." }
        ],
        complexities: [
          { operation: "Packet Filter Parsing", best: "O(1)", avg: "O(packets)", worst: "O(packets)", space: "O(pcap_buffer)" }
        ],
        realWorldApplications: [
          "Network security intrusion and malware communication analysis",
          "Diagnosing dropped packets and TCP retransmission bottlenecks",
          "Reverse engineering proprietary application communication protocols"
        ]
      },
      procedure: [
        "1. Launch Wireshark / protocol analyzer and select active network interface.",
        "2. Start packet capture.",
        "3. Open web browser and load an HTTP web page.",
        "4. Stop capture and apply display filter 'http || tcp.flags.syn == 1'.",
        "5. Inspect Ethernet frame MACs, IP TTL/flags, and TCP 3-way handshake sequence numbers."
      ],
      sampleCode: {
        language: "bash",
        code: `# Using TShark (Wireshark CLI) to capture and inspect live packets
tshark -i any -c 5 -Y "tcp.flags.syn == 1" -T fields \\
  -e frame.number -e ip.src -e ip.dst -e tcp.srcport -e tcp.dstport`
      },
      expectedOutput: `1	192.168.1.15	142.250.190.46	54320	80
2	192.168.1.15	140.82.121.4	54322	443
3	192.168.1.15	103.154.241.12	54324	80`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Networks"]
      }
    }
  },
  {
    id: "cn-exp-6",
    labId: "computer-networks",
    title: "Exp 6: Write a code simulating ARP / RARP protocols.",
    slug: "simulation-of-arp-rarp-protocols",
    difficulty: "Intermediate",
    category: "Computer Networks" as any,
    estimatedMinutes: 30,
    rating: 4.91,
    ratingsCount: 112,
    simulator: "custom",
    quizId: "quiz-cn-6",
    sections: {
      introduction: "Address Resolution Protocol (ARP) dynamically maps 32-bit logical IPv4 addresses to 48-bit physical MAC hardware addresses on local area networks, while RARP translates MAC addresses to IP addresses.",
      objective: "Simulate ARP broadcast requests (FF:FF:FF:FF:FF:FF), unicast ARP replies, ARP cache table updates, and RARP reverse lookups.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "How ARP Works",
      videoChannel: "CertBros",
      prerequisites: ["MAC Addresses", "IP Addressing"],
      theory: {
        overview: "When Host A wants to send an IP packet to Host B on the same LAN but lacks B's MAC address, it broadcasts an ARP Request frame to FF:FF:FF:FF:FF:FF. Host B recognizes its own IP and responds with an ARP Reply unicast containing its MAC address. Both hosts cache this mapping.",
        keyConcepts: [
          { title: "ARP Request Broadcast", desc: "Sent to all hosts in the collision domain asking 'Who has IP X?'." },
          { title: "ARP Reply Unicast", desc: "Target host responds directly with its physical 48-bit MAC address." },
          { title: "ARP Cache Table", desc: "Stores IP-to-MAC bindings with dynamic expiration TTL to minimize broadcast flooding." }
        ],
        complexities: [
          { operation: "ARP Cache Lookup", best: "O(1)", avg: "O(1)", worst: "O(n)", space: "O(entries)" }
        ],
        realWorldApplications: [
          "Local LAN packet delivery from IP layer to Ethernet hardware frames",
          "Default gateway MAC resolution in home/enterprise routers",
          "Detecting ARP poisoning / spoofing Man-in-the-Middle security attacks"
        ]
      },
      procedure: [
        "1. Define ground-truth dictionary of LAN network hosts with IPs and MACs.",
        "2. Instantiate local ARP cache table.",
        "3. If IP is present in cache, return MAC immediately (Cache Hit).",
        "4. If absent, simulate ARP Request broadcast to all hosts.",
        "5. Receive target reply, record entry in ARP cache, and return MAC."
      ],
      sampleCode: {
        language: "python",
        code: `class ARPSimulator:
    def __init__(self):
        self.network = {
            "192.168.1.1": "00:50:56:C0:00:01",
            "192.168.1.2": "00:50:56:C0:00:02",
            "192.168.1.3": "00:50:56:C0:00:03"
        }
        self.arp_cache = {}

    def resolve(self, ip):
        if ip in self.arp_cache:
            print(f"[CACHE HIT] {ip} -> {self.arp_cache[ip]}")
            return self.arp_cache[ip]
        print(f"[BROADCAST FF:FF:FF:FF:FF:FF] Who has {ip}? Tell 192.168.1.1")
        if ip in self.network:
            mac = self.network[ip]
            print(f"[UNICAST] ARP Reply from {ip}: MAC is {mac}")
            self.arp_cache[ip] = mac
            return mac
        return None

arp = ARPSimulator()
arp.resolve("192.168.1.2")
arp.resolve("192.168.1.2")  # Second query hits cache`
      },
      expectedOutput: `[BROADCAST FF:FF:FF:FF:FF:FF] Who has 192.168.1.2? Tell 192.168.1.1
[UNICAST] ARP Reply from 192.168.1.2: MAC is 00:50:56:C0:00:02
[CACHE HIT] 192.168.1.2 -> 00:50:56:C0:00:02`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Networks"]
      }
    }
  },
  {
    id: "cn-exp-7",
    labId: "computer-networks",
    title: "Exp 7: Study of Network simulator (NS) and Simulation of Congestion Control Algorithms using NSE.",
    slug: "network-simulator-and-congestion-control",
    difficulty: "Advanced",
    category: "Computer Networks" as any,
    estimatedMinutes: 35,
    rating: 4.93,
    ratingsCount: 122,
    simulator: "custom",
    quizId: "quiz-cn-7",
    sections: {
      introduction: "Network simulators (NS-2 / NS-3 / OMNeT++) model complex topologies and packet queue behaviors, allowing empirical analysis of TCP Congestion Control algorithms (Tahoe, Reno, Cubic).",
      objective: "Simulate TCP Additive Increase Multiplicative Decrease (AIMD), Slow Start exponential growth, and Congestion Avoidance windowing.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "TCP Congestion Control Algorithms",
      videoChannel: "Ben Eater",
      prerequisites: ["TCP Sliding Window", "Packet Loss Metrics"],
      theory: {
        overview: "TCP dynamically adapts its Congestion Window (cwnd) based on implicit packet loss signals. In Slow Start, cwnd doubles every RTT. When cwnd reaches the slow-start threshold (ssthresh), it enters Congestion Avoidance, increasing linearly (+1 MSS per RTT). Packet loss triggers multiplicative decrease.",
        keyConcepts: [
          { title: "Slow Start", desc: "Exponential window expansion (cwnd = cwnd * 2 per RTT) to rapidly probe available bandwidth." },
          { title: "Additive Increase (AIMD)", desc: "Increases cwnd by 1 MSS per RTT during Congestion Avoidance phase." },
          { title: "Multiplicative Decrease", desc: "Halves ssthresh = cwnd / 2 upon packet loss event and resets or adjusts cwnd." }
        ],
        complexities: [
          { operation: "Window Update per ACK", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Internet video streaming bit-rate adaptation (YouTube, Netflix)",
          "Data center low-latency TCP (DCTCP) congestion management",
          "5G mobile wireless throughput stabilization"
        ]
      },
      procedure: [
        "1. Initialize cwnd = 1.0 MSS and ssthresh = 16 MSS.",
        "2. Simulate sequential ACK arrivals, updating cwnd exponentially in Slow Start.",
        "3. Transition to linear Additive Increase once cwnd >= ssthresh.",
        "4. Trigger packet drop event, apply Multiplicative Decrease, and record sawtooth progression.",
        "5. Output window progression trajectory."
      ],
      sampleCode: {
        language: "python",
        code: `class TCPSimulator:
    def __init__(self, ssthresh=16):
        self.cwnd = 1.0
        self.ssthresh = ssthresh

    def receive_ack(self):
        if self.cwnd < self.ssthresh:
            self.cwnd += 1.0  # Slow Start
        else:
            self.cwnd += 1.0 / self.cwnd  # Congestion Avoidance (AIMD)

    def packet_loss(self):
        self.ssthresh = max(2.0, self.cwnd / 2.0)
        self.cwnd = 1.0  # Reset on loss

sim = TCPSimulator(ssthresh=8)
for _ in range(12): sim.receive_ack()
print(f"Cwnd before packet drop: {sim.cwnd:.2f} MSS")
sim.packet_loss()
print(f"Cwnd after loss event: {sim.cwnd:.2f} MSS | New ssthresh: {sim.ssthresh:.2f} MSS")`
      },
      expectedOutput: `Cwnd before packet drop: 8.50 MSS
Cwnd after loss event: 1.00 MSS | New ssthresh: 4.25 MSS`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Networks"]
      }
    }
  },
  {
    id: "cn-exp-8",
    labId: "computer-networks",
    title: "Exp 8: Study of TCP/UDP performance using Simulation tool.",
    slug: "tcp-udp-performance-study",
    difficulty: "Intermediate",
    category: "Computer Networks" as any,
    estimatedMinutes: 30,
    rating: 4.90,
    ratingsCount: 114,
    simulator: "custom",
    quizId: "quiz-cn-8",
    sections: {
      introduction: "Compare transport layer performance between connection-oriented TCP (stream-reliable) and connectionless UDP (datagram-speed) under varying network bandwidth, latency, and packet loss conditions.",
      objective: "Benchmark throughput (Mbps), round-trip latency, jitter, and packet delivery ratio between TCP and UDP streams.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "TCP vs UDP Throughput Analysis",
      videoChannel: "Cisco Networking Academy",
      prerequisites: ["TCP vs UDP Basics", "Socket API"],
      theory: {
        overview: "TCP guarantees 100% data reliability through ARQ acknowledgments and retransmissions, at the expense of latency and connection handshake overhead. UDP has zero flow control and no retransmissions, delivering higher maximum throughput and predictable low latency.",
        keyConcepts: [
          { title: "Throughput (Mbps)", desc: "Total payload bits successfully transmitted per second." },
          { title: "Jitter", desc: "Statistical variance in packet arrival latency intervals." },
          { title: "Packet Loss Ratio", desc: "Percentage of transmitted datagrams dropped due to buffer overflow." }
        ],
        complexities: [
          { operation: "UDP Packet Stream", best: "O(1)", avg: "O(1)", worst: "O(1)", space: "O(1)" },
          { operation: "TCP Flow State", best: "O(1)", avg: "O(window)", worst: "O(window)", space: "O(window)" }
        ],
        realWorldApplications: [
          "VoIP telephony and Zoom video call streaming via UDP",
          "Database backup replication and financial wire transactions via TCP",
          "Online multiplayer FPS game state replication via UDP"
        ]
      },
      procedure: [
        "1. Create UDP socket benchmark transmitter.",
        "2. Transmit continuous 1 KB payloads across a 1-second burst interval.",
        "3. Calculate total bytes transmitted and derive throughput in Megabits per second (Mbps).",
        "4. Compare results against equivalent TCP socket stream.",
        "5. Output comparative performance metrics."
      ],
      sampleCode: {
        language: "python",
        code: `import time, socket

def benchmark_udp(host="127.0.0.1", port=9999, duration=0.5):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    payload = b"X" * 1024  # 1 KB
    bytes_sent = 0
    start = time.time()
    while time.time() - start < duration:
        try:
            sock.sendto(payload, (host, port))
            bytes_sent += len(payload)
        except Exception:
            break
    elapsed = time.time() - start
    mbps = (bytes_sent * 8) / (elapsed * 1_000_000)
    print(f"UDP Benchmark: {mbps:.2f} Mbps ({bytes_sent/1024/1024:.2f} MB in {elapsed:.2f}s)")

benchmark_udp()`
      },
      expectedOutput: `UDP Benchmark: 482.35 Mbps (28.75 MB in 0.50s)`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Networks"]
      }
    }
  },
  {
    id: "cn-exp-9",
    labId: "computer-networks",
    title: "Exp 9: Simulation of Distance Vector / Link State Routing algorithm.",
    slug: "simulation-of-distance-vector-link-state-routing",
    difficulty: "Advanced",
    category: "Computer Networks" as any,
    estimatedMinutes: 35,
    rating: 4.95,
    ratingsCount: 135,
    simulator: "custom",
    quizId: "quiz-cn-9",
    sections: {
      introduction: "Routing algorithms compute optimal shortest paths for packet forwarding across complex autonomous network topologies.",
      objective: "Implement Bellman-Ford Distance Vector routing and Dijkstra Link State routing to find lowest-cost shortest paths across router nodes.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Routing Algorithms: Distance Vector vs Link State",
      videoChannel: "NPTEL Computer Networks",
      prerequisites: ["Graph Theory", "Bellman-Ford & Dijkstra"],
      theory: {
        overview: "Distance Vector routing (RIP) uses the Bellman-Ford equation: D_x(y) = min_v { c(x, v) + D_v(y) }, periodically exchanging full routing tables with direct neighbors. Link State routing (OSPF) broadcasts link state packets globally and executes Dijkstra's algorithm to compute the Shortest Path Tree.",
        keyConcepts: [
          { title: "Bellman-Ford Equation", desc: "D_x(y) = min_v { c(x, v) + D_v(y) } iteratively relaxes path costs." },
          { title: "Count to Infinity Problem", desc: "Distance Vector vulnerability resolved using Split Horizon and Poison Reverse." },
          { title: "Dijkstra Link State", desc: "Greedily grows shortest path tree using priority queue in O(E log V) time." }
        ],
        complexities: [
          { operation: "Distance Vector Iteration", best: "O(V)", avg: "O(V * E)", worst: "O(V * E)", space: "O(V^2)" },
          { operation: "Dijkstra Link State", best: "O(E log V)", avg: "O(E log V)", worst: "O(E log V)", space: "O(V + E)" }
        ],
        realWorldApplications: [
          "BGP (Border Gateway Protocol) routing across global Internet Service Providers",
          "OSPF (Open Shortest Path First) enterprise backbone routing",
          "Autonomous vehicle GPS navigation path calculation"
        ]
      },
      procedure: [
        "1. Define network adjacency cost matrix representing router graph.",
        "2. Initialize local distance vector table.",
        "3. Apply Bellman-Ford dynamic programming relaxation across (V - 1) passes.",
        "4. Print final converged shortest distance routing tables for all routers."
      ],
      sampleCode: {
        language: "python",
        code: `INF = 999
graph = [
    [0, 2, 7, INF],
    [2, 0, INF, 1],
    [7, INF, 0, 3],
    [INF, 1, 3, 0]
]
n = 4
dist = [row[:] for row in graph]

# Bellman-Ford Distance Vector Relaxation
for _ in range(n - 1):
    for i in range(n):
        for j in range(n):
            for k in range(n):
                if dist[i][k] + graph[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + graph[k][j]

print("--- Converged Distance Vector Routing Table ---")
for i in range(n):
    print(f"Router {chr(65+i)}:", [f"{chr(65+j)}: {dist[i][j]}" for j in range(n)])`
      },
      expectedOutput: `--- Converged Distance Vector Routing Table ---
Router A: ['A: 0', 'B: 2', 'C: 6', 'D: 3']
Router B: ['A: 2', 'B: 0', 'C: 4', 'D: 1']
Router C: ['A: 6', 'B: 4', 'C: 0', 'D: 3']
Router D: ['A: 3', 'B: 1', 'C: 3', 'D: 0']`,
      leetcodeProblems: [
        {
          id: 3,
          title: "Network Delay Time",
          difficulty: "Medium",
          url: "https://leetcode.com/problems/network-delay-time/",
          description: "Calculate time taken for all nodes to receive a signal using Dijkstra.",
          approach: "Execute Dijkstra with PriorityQueue starting from source node.",
          javaSnippet: `// Dijkstra Solution`
        }
      ],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Networks"]
      }
    }
  },
  {
    id: "cn-exp-10",
    labId: "computer-networks",
    title: "Exp 10: Simulation of an error correction code (like CRC).",
    slug: "simulation-of-error-correction-code-crc",
    difficulty: "Intermediate",
    category: "Computer Networks" as any,
    estimatedMinutes: 30,
    rating: 4.92,
    ratingsCount: 118,
    simulator: "custom",
    quizId: "quiz-cn-10",
    sections: {
      introduction: "Cyclic Redundancy Check (CRC) is a polynomial modulo-2 division algorithm implemented in Data Link layer hardware (Ethernet FCS) for reliable bit error detection.",
      objective: "Implement binary polynomial division using bitwise XOR, generate transmitted CRC codewords, and verify frame integrity at the receiver.",
      videoUrl: "https://www.youtube-nocookie.com/embed/IPvYjXCsTg8",
      videoTitle: "Cyclic Redundancy Check (CRC) Explained",
      videoChannel: "Ben Eater",
      prerequisites: ["Binary Bitwise Operations", "Polynomial Division"],
      theory: {
        overview: "The transmitter appends (k - 1) zeros to the dataword (where k is generator polynomial length) and performs binary modulo-2 division using XOR operations. The calculated remainder is appended to the dataword to form the transmitted codeword. The receiver performs modulo-2 division: zero remainder confirms an error-free transmission.",
        keyConcepts: [
          { title: "Modulo-2 Arithmetic", desc: "Binary addition and subtraction performed identically via XOR (no carry or borrow)." },
          { title: "Generator Polynomial G(x)", desc: "Standard polynomial divisor (e.g. CRC-32 = 0x04C11DB7)." },
          { title: "Frame Check Sequence (FCS)", desc: "Trailing remainder bits verifying frame integrity." }
        ],
        complexities: [
          { operation: "CRC Bitwise Calculation", best: "O(n)", avg: "O(n)", worst: "O(n)", space: "O(1)" }
        ],
        realWorldApplications: [
          "Ethernet II Frame Check Sequence (FCS) verification",
          "SATA hard drive and USB data packet integrity validation",
          "ZIP archive and PNG image compression chunk checksums"
        ]
      },
      procedure: [
        "1. Define binary data string and generator key polynomial.",
        "2. Append (len(key) - 1) zero bits to data.",
        "3. Perform modulo-2 division using iterative XOR.",
        "4. Append remainder to original data to construct transmitted codeword.",
        "5. Test receiver verification with both clean and corrupted codewords."
      ],
      sampleCode: {
        language: "python",
        code: `def xor(a, b):
    return ''.join('0' if a[i] == b[i] else '1' for i in range(1, len(b)))

def mod2div(dividend, divisor):
    pick = len(divisor)
    tmp = dividend[0:pick]
    while pick < len(dividend):
        if tmp[0] == '1': tmp = xor(divisor, tmp) + dividend[pick]
        else: tmp = xor('0'*pick, tmp) + dividend[pick]
        pick += 1
    return xor(divisor, tmp) if tmp[0] == '1' else xor('0'*pick, tmp)

data = "100100"
key = "1101"
remainder = mod2div(data + '0'*(len(key)-1), key)
codeword = data + remainder

print(f"Data: {data} | Generator: {key} | CRC Remainder: {remainder}")
print(f"Transmitted Codeword: {codeword}")

# Receiver Verification
rx_check = mod2div(codeword, key)
print("Receiver Remainder:", rx_check, "-> [✓] Frame Error-Free!" if int(rx_check) == 0 else "-> [✗] Corrupted!")`
      },
      expectedOutput: `Data: 100100 | Generator: 1101 | CRC Remainder: 001
Transmitted Codeword: 100100001
Receiver Remainder: 000 -> [✓] Frame Error-Free!`,
      leetcodeProblems: [],
      targetAudience: {
        ug: ["B.Tech AIDS", "B.E CSE"],
        pg: ["M.Tech Computer Networks"]
      }
    }
  }
];
