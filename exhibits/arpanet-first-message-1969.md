# id
arpanet-first-message-1969

# title
ARPANET First Message - Birth of the Internet

# what
The first message sent over ARPANET on October 29, 1969, between UCLA and Stanford Research Institute. The intended message was "LOGIN" but the system crashed after "LO", making "LO" the first message ever sent over what would become the Internet. This historic moment launched the age of networked computing.

# impact
Marked the birth of the Internet, revolutionizing global communication and information sharing. Led to the development of TCP/IP, email, the World Wide Web, and the modern digital age. Fundamentally changed how humans interact, work, and access information.

# when
1969

# category
Mission-Critical

# language
Assembly

# language
Assembly

# codeSnippet
```assembly
; ARPANET Interface Message Processor (IMP) code
; Simplified version of the original Honeywell DDP-516 assembly

        ORG     1000H           ; Origin at 1000H
        
INIT:   CLR     A              ; Clear accumulator
        LDA     #MSGBUF        ; Load message buffer address
        STA     BUFPTR         ; Store buffer pointer
        
        ; Initialize network interface
        LDA     #NETIF         ; Network interface address
        STA     NETPTR         ; Store network pointer
        
        ; Set up interrupt vectors
        LDA     #NETINT        ; Network interrupt handler
        STA     INTVEC         ; Store in interrupt vector
        
SEND:   LDA     BUFPTR         ; Load buffer pointer
        LDB     #'L'           ; Load character 'L'
        STB     (A)+           ; Store and increment pointer
        
        LDB     #'O'           ; Load character 'O'
        STB     (A)+           ; Store and increment pointer
        
        ; Attempt to send LOGIN but system crashes here
        LDB     #'G'           ; This never gets executed
        STB     (A)+           ; Due to system crash
        
        ; Packet transmission routine
XMIT:   LDA     NETPTR         ; Load network interface
        LDB     MSGBUF         ; Load message start
        MOV     B,(A)          ; Send first character
        
        ; Wait for acknowledgment
WAIT:   LDA     NETPTR         ; Check status
        AND     #READY         ; Test ready bit
        BEQ     WAIT           ; Wait if not ready
        
        ; System crash occurs here in original transmission
CRASH:  JMP     INIT           ; System restart
        
        ; Message buffer and data
MSGBUF: DS      64             ; Message buffer space
BUFPTR: DS      1              ; Buffer pointer
NETPTR: DS      1              ; Network interface pointer
INTVEC: DS      1              ; Interrupt vector
        
        ; Network interface constants
NETIF   EQU     2000H          ; Network interface address
READY   EQU     01H            ; Ready status bit
```

# sourceLink
https://www.darpa.mil/about-us/timeline/arpanet

# expertExplanation
The ARPANET used Interface Message Processors (IMPs) based on Honeywell DDP-516 minicomputers. The first message transmission used a simple character-by-character protocol. The crash occurred due to buffer overflow or timing issues in the early networking software. The successful "LO" transmission proved that packet-switched networking could work across long distances, validating the theoretical work of pioneers like Paul Baran and Donald Davies.
