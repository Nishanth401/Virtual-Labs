"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  ShieldCheck,
  Network,
  Search,
  Radio,
  Play,
  RotateCcw,
  CheckCircle2,
  Lock,
  Key,
  Server,
  Laptop,
  ArrowRight,
  Wifi,
  Activity,
  ChevronRight,
  ShieldAlert,
  Info
} from "lucide-react";

export type NetworksModule =
  | "http"
  | "tls"
  | "tcp"
  | "dns"
  | "realtime";

export function NetworksVisualizer({ initialModule = "http" }: { initialModule?: NetworksModule }) {
  const [activeModule, setActiveModule] = useState<NetworksModule>(initialModule);

  // 1. HTTP Protocol State
  const [httpVersion, setHttpVersion] = useState<"1.1" | "2" | "3">("2");

  // 2. TLS Handshake Step
  const [tlsStep, setTlsStep] = useState<number>(0);

  // 3. TCP 3-Way Handshake Step
  const [tcpStep, setTcpStep] = useState<number>(0);

  // 4. DNS Query Trace Step
  const [dnsStep, setDnsStep] = useState<number>(0);

  // 5. Real-Time Comms
  const [realtimeProto, setRealtimeProto] = useState<"ws" | "sse" | "polling">("ws");

  return (
    <div className="space-y-6">
      {/* Module Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 font-mono font-bold">
            Networks Suite
          </Badge>
          <span className="text-base font-bold font-heading text-foreground">
            Computer Networks &amp; Web Protocols Studio
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-muted/70 p-1 rounded-xl border border-border/50 text-xs">
          <Button
            variant={activeModule === "http" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("http")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Globe className="h-3.5 w-3.5 mr-1" />
            HTTP/1 vs 2 vs 3
          </Button>
          <Button
            variant={activeModule === "tls" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("tls")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <ShieldCheck className="h-3.5 w-3.5 mr-1" />
            TLS 1.3 Handshake
          </Button>
          <Button
            variant={activeModule === "tcp" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("tcp")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Network className="h-3.5 w-3.5 mr-1" />
            TCP 3-Way Handshake
          </Button>
          <Button
            variant={activeModule === "dns" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("dns")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Search className="h-3.5 w-3.5 mr-1" />
            DNS Resolution
          </Button>
          <Button
            variant={activeModule === "realtime" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveModule("realtime")}
            className="h-8 text-xs font-semibold rounded-lg"
          >
            <Radio className="h-3.5 w-3.5 mr-1" />
            WebSockets vs SSE
          </Button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 1. HTTP/1.1 vs HTTP/2 vs HTTP/3            */}
      {/* ========================================== */}
      {activeModule === "http" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  HTTP Protocol Evolution &amp; Head-of-Line Multiplexing
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Compare HTTP/1.1 sequential head-of-line blocking, HTTP/2 binary streams, and HTTP/3 QUIC over UDP.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border text-xs">
                {(["1.1", "2", "3"] as const).map((v) => (
                  <Button
                    key={v}
                    size="sm"
                    variant={httpVersion === v ? "default" : "ghost"}
                    onClick={() => setHttpVersion(v)}
                    className="h-7 text-xs font-mono font-bold rounded-lg"
                  >
                    HTTP/{v}
                  </Button>
                ))}
              </div>
            </div>

            {/* Architecture Comparison Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Transport Layer */}
              <div className="p-5 rounded-2xl bg-muted/20 border border-border flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-muted-foreground font-bold uppercase block">Transport Protocol</span>
                  <span className="text-xl font-bold font-mono text-foreground mt-2 block">
                    {httpVersion === "3" ? "QUIC over UDP" : "TCP Socket"}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground mt-4 block leading-relaxed">
                  {httpVersion === "3"
                    ? "Eliminates TCP head-of-line blocking by multiplexing streams over UDP with connection IDs."
                    : "Reliable, ordered byte-stream delivery with congestion control and 3-way handshake."}
                </span>
              </div>

              {/* Stream Multiplexing */}
              <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-blue-400 font-bold uppercase block">Stream Concurrency</span>
                  <span className="text-xl font-bold font-mono text-blue-300 mt-2 block">
                    {httpVersion === "1.1" ? "Sequential HOL" : "Binary Streams"}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground mt-4 block leading-relaxed">
                  {httpVersion === "1.1"
                    ? "Requires multiple TCP connections (6 per domain) to fetch assets concurrently."
                    : "All CSS, JS, and image frames interleaved concurrently on a single connection."}
                </span>
              </div>

              {/* Handshake Overhead */}
              <div className="p-5 rounded-2xl bg-muted/20 border border-border flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-muted-foreground font-bold uppercase block">Handshake Latency</span>
                  <span className="text-xl font-bold font-mono text-emerald-400 mt-2 block">
                    {httpVersion === "3" ? "0-RTT / 1-RTT" : httpVersion === "2" ? "2-RTT (TCP+TLS)" : "3-RTT"}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground mt-4 block leading-relaxed">
                  {httpVersion === "3"
                    ? "Combined cryptographic and transport handshake saves round-trip connection times."
                    : "Standard TCP 3-way handshake followed by separate TLS negotiation."}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. TLS/SSL 1.3 HANDSHAKE & HTTPS           */}
      {/* ========================================== */}
      {activeModule === "tls" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  TLS 1.3 Cryptographic Handshake (1 RTT)
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Diffie-Hellman Key Exchange with Forward Secrecy &amp; Symmetric AES-256 Session Cipher.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTlsStep((s) => (s + 1) % 4)}
                  className="h-8 text-xs font-mono font-bold"
                >
                  Step Forward ({tlsStep + 1} / 4)
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setTlsStep(0)}
                  className="h-8 text-xs font-mono"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Visual Handshake Progression */}
            <div className="space-y-3">
              {[
                {
                  step: 0,
                  sender: "Client ──→ Server",
                  name: "ClientHello",
                  desc: "Client sends supported cipher suites (e.g. TLS_AES_256_GCM_SHA384) and KeyShare public parameters."
                },
                {
                  step: 1,
                  sender: "Server ──→ Client",
                  name: "ServerHello & Certificate",
                  desc: "Server picks cipher suite, returns its Diffie-Hellman KeyShare, and supplies X.509 Certificate."
                },
                {
                  step: 2,
                  sender: "Client + Server Computation",
                  name: "Shared Secret Derivation",
                  desc: "Both parties compute the identical symmetric Master Secret without ever transmitting keys over the wire."
                },
                {
                  step: 3,
                  sender: "Full Duplex Stream",
                  name: "Encrypted Application Data",
                  desc: "HTTPS communication begins: all HTTP requests and responses encrypted with symmetric AES-GCM session key."
                }
              ].map((item) => {
                const isActive = tlsStep === item.step;
                const isPassed = tlsStep >= item.step;
                return (
                  <div
                    key={item.step}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-blue-500/15 border-blue-500 shadow-md scale-[1.01]"
                        : isPassed
                        ? "bg-muted/30 border-border/80 text-muted-foreground"
                        : "bg-muted/10 border-border/40 opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground"}`}>
                        <Lock className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-foreground block">{item.name}</span>
                        <span className="text-[11px] text-muted-foreground mt-0.5 block">{item.desc}</span>
                      </div>
                    </div>
                    <Badge variant={isActive ? "default" : "outline"} className="text-[10px] font-mono">
                      {item.sender}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. TCP 3-WAY HANDSHAKE & FLOW CONTROL      */}
      {/* ========================================== */}
      {activeModule === "tcp" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  TCP 3-Way Handshake Connection Establishment
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Synchronizes Initial Sequence Numbers (ISN) between Client and Server.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTcpStep((s) => (s + 1) % 4)}
                  className="h-8 text-xs font-mono font-bold"
                >
                  Advance Step ({tcpStep + 1} / 4)
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setTcpStep(0)}
                  className="h-8 text-xs font-mono"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Visual Client / Server Ladder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/20 rounded-2xl border border-border items-center">
              {/* Client Terminal */}
              <div className="p-5 rounded-2xl bg-card border-2 border-primary/40 flex flex-col items-center text-center space-y-2">
                <Laptop className="h-8 w-8 text-primary" />
                <span className="font-bold text-sm text-foreground">Client Node</span>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {tcpStep === 0 ? "CLOSED" : tcpStep === 1 ? "SYN_SENT" : "ESTABLISHED"}
                </Badge>
              </div>

              {/* Server Terminal */}
              <div className="p-5 rounded-2xl bg-card border-2 border-border flex flex-col items-center text-center space-y-2">
                <Server className="h-8 w-8 text-blue-500" />
                <span className="font-bold text-sm text-foreground">Server Listener (Port 443)</span>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {tcpStep === 0 ? "LISTEN" : tcpStep === 2 ? "SYN_RCVD" : "ESTABLISHED"}
                </Badge>
              </div>
            </div>

            {/* Sequence Packet Log */}
            <div className="p-4 bg-muted/30 rounded-xl border border-border text-xs font-mono text-muted-foreground space-y-2">
              <span className="font-bold text-foreground block">Active Packet Exchange:</span>
              <p>
                {tcpStep === 0 && "Ready. Press Advance to initiate SYN packet."}
                {tcpStep === 1 && "1. Client ──→ Server: [SYN, Seq=100]. Client requests connection."}
                {tcpStep === 2 && "2. Server ──→ Client: [SYN-ACK, Seq=300, Ack=101]. Server acknowledges and synchronizes."}
                {tcpStep === 3 && "3. Client ──→ Server: [ACK, Ack=301]. Handshake completed! Full duplex TCP stream ready."}
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. DNS RESOLUTION HIERARCHY TRACE          */}
      {/* ========================================== */}
      {activeModule === "dns" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Recursive DNS Lookup Flow: <code>example.com</code>
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Hierarchical name resolution: Local Cache ──→ Recursive Resolver ──→ Root (.) ──→ TLD (.com) ──→ Authoritative NS.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDnsStep((s) => (s + 1) % 5)}
                  className="h-8 text-xs font-mono font-bold"
                >
                  Next DNS Query ({dnsStep + 1} / 5)
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDnsStep(0)}
                  className="h-8 text-xs font-mono"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* DNS Nodes List */}
            <div className="space-y-3">
              {[
                { step: 0, name: "1. Local Resolver & Browser Cache", desc: "Checks memory TTL cache and /etc/hosts file." },
                { step: 1, name: "2. Recursive Resolver (8.8.8.8)", desc: "ISP or Public DNS resolver receives request on cache miss." },
                { step: 2, name: "3. Root Name Server (a.root-servers.net)", desc: "Directs query to the .com Top-Level Domain (TLD) server." },
                { step: 3, name: "4. TLD Name Server (.com TLD)", desc: "Delegates to Authoritative Name Server for example.com." },
                { step: 4, name: "5. Authoritative NS (ns1.example.com)", desc: "Returns final A Record: 93.184.216.34 (TTL = 3600s)." }
              ].map((item) => {
                const isActive = dnsStep === item.step;
                return (
                  <div
                    key={item.step}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isActive
                        ? "bg-blue-500/20 border-blue-500 shadow-md scale-[1.01]"
                        : "bg-muted/20 border-border"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-foreground block">{item.name}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 block">{item.desc}</span>
                    </div>
                    {isActive && (
                      <Badge className="bg-blue-500 text-white font-mono text-[10px] animate-pulse">
                        Querying...
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. REAL-TIME COMMS: WEBSOCKETS VS SSE      */}
      {/* ========================================== */}
      {activeModule === "realtime" && (
        <div className="space-y-6">
          <Card className="p-6 bg-card border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold font-heading text-foreground">
                  Real-Time Communication Protocols Architecture
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Compare WebSockets (full-duplex), Server-Sent Events (unidirectional push), and Long Polling.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-xl border border-border text-xs">
                {(["ws", "sse", "polling"] as const).map((proto) => (
                  <Button
                    key={proto}
                    size="sm"
                    variant={realtimeProto === proto ? "default" : "ghost"}
                    onClick={() => setRealtimeProto(proto)}
                    className="h-7 text-xs font-mono font-bold rounded-lg uppercase"
                  >
                    {proto === "ws" ? "WebSockets" : proto === "sse" ? "SSE" : "Long Polling"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Protocol Characteristic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-2">
                <span className="text-xs font-mono text-muted-foreground font-bold uppercase block">Directionality</span>
                <span className="text-xl font-bold font-mono text-primary block">
                  {realtimeProto === "ws" ? "Full Duplex" : realtimeProto === "sse" ? "Server ──→ Client" : "Half Duplex"}
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {realtimeProto === "ws" && "Both client and server can send data frames at any time with minimal header overhead."}
                  {realtimeProto === "sse" && "Unidirectional HTTP stream ideal for live tickers, stock prices, and AI text streaming."}
                  {realtimeProto === "polling" && "Repeated HTTP GET requests create significant TCP/TLS handshake overhead."}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-2">
                <span className="text-xs font-mono text-muted-foreground font-bold uppercase block">Wire Format</span>
                <span className="text-xl font-bold font-mono text-blue-400 block">
                  {realtimeProto === "ws" ? "Binary / UTF-8 Frames" : realtimeProto === "sse" ? "text/event-stream" : "application/json"}
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {realtimeProto === "ws" && "Uses 2-10 byte framing headers over raw TCP socket after HTTP 101 Upgrade."}
                  {realtimeProto === "sse" && "Standard HTTP text responses formatted with 'data:' fields and built-in reconnect."}
                  {realtimeProto === "polling" && "Full standard HTTP headers transmitted with every single request."}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/20 border border-border space-y-2">
                <span className="text-xs font-mono text-muted-foreground font-bold uppercase block">Ideal Use Case</span>
                <span className="text-xl font-bold font-mono text-emerald-400 block">
                  {realtimeProto === "ws" ? "Multiplayer & Chat" : realtimeProto === "sse" ? "LLM Streaming" : "Legacy Fallback"}
                </span>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {realtimeProto === "ws" && "High-frequency bidirectional messaging: gaming, real-time whiteboards, collaborative editing."}
                  {realtimeProto === "sse" && "ChatGPT streaming responses, live notification feeds, and dashboard charts."}
                  {realtimeProto === "polling" && "When firewall restrictions block persistent WebSocket connections."}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
