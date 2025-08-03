# id
tcp-ip-internet-protocol-suite-1973

# title
TCP/IP Internet Protocol Suite

# what
The Transmission Control Protocol/Internet Protocol (TCP/IP), developed by Vint Cerf and Bob Kahn. This protocol suite became the foundation of the modern internet, enabling different networks to interconnect and communicate regardless of their underlying hardware.

# impact
- Created the technical foundation for the modern internet
- Enabled global connectivity between different types of networks
- Established the end-to-end principle that became fundamental to internet design
- Made possible the World Wide Web, email, and all internet applications
- Influenced the design of virtually all modern networking protocols
- Remains the core protocol suite of the internet after 50+ years

# when
1973

# category
Integration

# language
C

# codeSnippet
```c
// Simplified TCP/IP protocol implementation concepts
// Based on the original RFC specifications by Cerf and Kahn

#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

// IP Header structure - the foundation of internet routing
struct ip_header {
    unsigned char version_ihl;      // Version (4 bits) + Internet Header Length (4 bits)
    unsigned char type_of_service;  // Type of service
    unsigned short total_length;    // Total length of IP packet
    unsigned short identification;  // Identification for fragmentation
    unsigned short flags_fragment;  // Flags (3 bits) + Fragment offset (13 bits)
    unsigned char ttl;             // Time to live (hop count)
    unsigned char protocol;        // Protocol (TCP=6, UDP=17, ICMP=1)
    unsigned short header_checksum; // Header checksum
    unsigned int source_ip;        // Source IP address
    unsigned int dest_ip;          // Destination IP address
    // Options and data follow...
};

// TCP Header structure - reliable, ordered data delivery
struct tcp_header {
    unsigned short source_port;     // Source port number
    unsigned short dest_port;       // Destination port number
    unsigned int sequence_number;   // Sequence number
    unsigned int ack_number;        // Acknowledgment number
    unsigned char data_offset;      // Data offset (4 bits) + Reserved (4 bits)
    unsigned char flags;           // Control flags (URG, ACK, PSH, RST, SYN, FIN)
    unsigned short window_size;     // Window size for flow control
    unsigned short checksum;        // Checksum
    unsigned short urgent_pointer;  // Urgent pointer
    // Options and data follow...
};

// TCP Control flags
#define TCP_FIN  0x01    // Finish - no more data
#define TCP_SYN  0x02    // Synchronize - establish connection
#define TCP_RST  0x04    // Reset - abort connection
#define TCP_PSH  0x08    // Push - deliver data immediately
#define TCP_ACK  0x10    // Acknowledge - acknowledgment valid
#define TCP_URG  0x20    // Urgent - urgent pointer valid

// Connection state machine - TCP's reliability mechanism
enum tcp_state {
    TCP_CLOSED,
    TCP_LISTEN,
    TCP_SYN_SENT,
    TCP_SYN_RECEIVED,
    TCP_ESTABLISHED,
    TCP_FIN_WAIT_1,
    TCP_FIN_WAIT_2,
    TCP_CLOSE_WAIT,
    TCP_CLOSING,
    TCP_LAST_ACK,
    TCP_TIME_WAIT
};

// TCP Connection Control Block
struct tcp_connection {
    enum tcp_state state;
    unsigned int local_ip;
    unsigned int remote_ip;
    unsigned short local_port;
    unsigned short remote_port;
    unsigned int send_sequence;     // Next sequence number to send
    unsigned int recv_sequence;     // Next sequence number expected
    unsigned int send_window;       // Send window size
    unsigned int recv_window;       // Receive window size
    unsigned char *send_buffer;     // Send buffer
    unsigned char *recv_buffer;     // Receive buffer
    int send_buffer_size;
    int recv_buffer_size;
};

// IP routing table entry
struct route_entry {
    unsigned int network;           // Network address
    unsigned int netmask;          // Network mask
    unsigned int gateway;          // Gateway IP address
    char interface[16];            // Network interface name
    int metric;                    // Route cost
    struct route_entry *next;      // Next route in table
};

// Core IP packet forwarding function
int ip_forward_packet(unsigned char *packet, int packet_length) {
    struct ip_header *ip_hdr = (struct ip_header *)packet;
    
    // Convert from network byte order
    unsigned int dest_ip = ntohl(ip_hdr->dest_ip);
    
    // Decrement TTL to prevent infinite loops
    ip_hdr->ttl--;
    if (ip_hdr->ttl == 0) {
        // Send ICMP Time Exceeded message
        send_icmp_time_exceeded(packet);
        return -1;  // Drop packet
    }
    
    // Look up route to destination
    struct route_entry *route = lookup_route(dest_ip);
    if (route == NULL) {
        // Send ICMP Destination Unreachable
        send_icmp_dest_unreachable(packet);
        return -1;
    }
    
    // Recalculate header checksum
    ip_hdr->header_checksum = 0;
    ip_hdr->header_checksum = calculate_ip_checksum(ip_hdr);
    
    // Forward packet to next hop
    if (route->gateway != 0) {
        // Send to gateway
        return send_packet_to_gateway(packet, packet_length, route->gateway, route->interface);
    } else {
        // Direct delivery to destination
        return send_packet_direct(packet, packet_length, dest_ip, route->interface);
    }
}

// TCP three-way handshake for connection establishment
int tcp_connect(struct tcp_connection *conn, unsigned int server_ip, unsigned short server_port) {
    
    // Step 1: Send SYN packet
    conn->state = TCP_SYN_SENT;
    conn->send_sequence = generate_initial_sequence();
    
    struct tcp_header syn_header = {0};
    syn_header.source_port = htons(conn->local_port);
    syn_header.dest_port = htons(server_port);
    syn_header.sequence_number = htonl(conn->send_sequence);
    syn_header.flags = TCP_SYN;
    syn_header.window_size = htons(8192);  // Advertise receive window
    
    if (send_tcp_packet(conn, &syn_header, NULL, 0) < 0) {
        conn->state = TCP_CLOSED;
        return -1;
    }
    
    // Step 2: Wait for SYN+ACK response
    struct tcp_header response;
    if (receive_tcp_packet(conn, &response, 30000) < 0) {  // 30 second timeout
        conn->state = TCP_CLOSED;
        return -1;
    }
    
    if (!(response.flags & TCP_SYN) || !(response.flags & TCP_ACK)) {
        conn->state = TCP_CLOSED;
        return -1;  // Invalid response
    }
    
    // Step 3: Send ACK to complete handshake
    conn->recv_sequence = ntohl(response.sequence_number) + 1;
    conn->send_sequence++;
    
    struct tcp_header ack_header = {0};
    ack_header.source_port = htons(conn->local_port);
    ack_header.dest_port = htons(server_port);
    ack_header.sequence_number = htonl(conn->send_sequence);
    ack_header.ack_number = htonl(conn->recv_sequence);
    ack_header.flags = TCP_ACK;
    ack_header.window_size = htons(8192);
    
    if (send_tcp_packet(conn, &ack_header, NULL, 0) < 0) {
        conn->state = TCP_CLOSED;
        return -1;
    }
    
    conn->state = TCP_ESTABLISHED;
    return 0;  // Connection successful
}

// TCP reliable data transmission with acknowledgments
int tcp_send_data(struct tcp_connection *conn, unsigned char *data, int data_length) {
    if (conn->state != TCP_ESTABLISHED) {
        return -1;  // Connection not established
    }
    
    int bytes_sent = 0;
    int max_segment_size = 1460;  // Typical MSS for Ethernet
    
    while (bytes_sent < data_length) {
        int segment_size = (data_length - bytes_sent > max_segment_size) ? 
                          max_segment_size : (data_length - bytes_sent);
        
        struct tcp_header data_header = {0};
        data_header.source_port = htons(conn->local_port);
        data_header.dest_port = htons(conn->remote_port);
        data_header.sequence_number = htonl(conn->send_sequence);
        data_header.ack_number = htonl(conn->recv_sequence);
        data_header.flags = TCP_ACK | TCP_PSH;
        data_header.window_size = htons(conn->recv_window);
        
        // Send data segment
        if (send_tcp_packet(conn, &data_header, data + bytes_sent, segment_size) < 0) {
            return -1;
        }
        
        // Wait for acknowledgment
        struct tcp_header ack_response;
        if (receive_tcp_packet(conn, &ack_response, 5000) < 0) {  // 5 second timeout
            // Retransmit on timeout
            continue;
        }
        
        if (ack_response.flags & TCP_ACK) {
            unsigned int ack_num = ntohl(ack_response.ack_number);
            if (ack_num == conn->send_sequence + segment_size) {
                // Data acknowledged
                conn->send_sequence += segment_size;
                bytes_sent += segment_size;
            } else {
                // Partial or duplicate ACK - handle accordingly
                // This is where TCP's complexity for handling packet loss comes in
            }
        }
    }
    
    return bytes_sent;
}

// Internet Control Message Protocol (ICMP) for network diagnostics
void send_icmp_ping(unsigned int dest_ip, unsigned short id, unsigned short sequence) {
    struct icmp_header {
        unsigned char type;         // ICMP type (8 = Echo Request)
        unsigned char code;         // ICMP code (0 for ping)
        unsigned short checksum;    // Checksum
        unsigned short identifier;  // Process identifier
        unsigned short sequence;    // Sequence number
        char data[56];             // Ping data
    } icmp_packet = {0};
    
    icmp_packet.type = 8;  // Echo Request
    icmp_packet.code = 0;
    icmp_packet.identifier = htons(id);
    icmp_packet.sequence = htons(sequence);
    strcpy(icmp_packet.data, "Hello, Internet!");
    
    icmp_packet.checksum = calculate_icmp_checksum(&icmp_packet, sizeof(icmp_packet));
    
    send_ip_packet(dest_ip, IPPROTO_ICMP, (unsigned char*)&icmp_packet, sizeof(icmp_packet));
}
```

# sourceLink
Based on RFC 793 (TCP), RFC 791 (IP), and original DARPA research papers

# expertExplanation
Vint Cerf and Bob Kahn's breakthrough was the concept of internetworking - connecting networks of networks. They designed IP to handle routing packets across multiple networks with different technologies, while TCP provided reliable, ordered delivery on top of IP's best-effort service. The layered architecture meant that applications didn't need to worry about the underlying network technology - whether data traveled over Ethernet, wireless, or satellite links was transparent. This abstraction enabled the internet to scale from a few dozen hosts to billions of connected devices.