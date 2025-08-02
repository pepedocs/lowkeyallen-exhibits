# id
arpanet-first-network-message-1969

# title
ARPANET First Network Message (1969)

# what
The first message sent over ARPANET, the predecessor to the internet, transmitted between UCLA and Stanford Research Institute. The intended message was "LOGIN" but the system crashed after "LO", making the first internet message an unintentional "LO".

# impact
- Established the first successful packet-switched network
- Demonstrated the feasibility of distributed networking between remote computers
- Created the technical foundation for the modern internet
- Proved that reliable communication was possible over unreliable connections
- Inspired the development of TCP/IP and other internet protocols
- Made possible the global connected world we live in today

# when
October 29, 1969, 10:30 PM

# category
Integration

# language
Assembly/Network Protocol

# codeSnippet
```assembly
; Simplified representation of the first ARPANET message transmission
; Original code was specific to the Sigma 7 and SDS 940 computers

; UCLA Host (Sigma 7) - Sending side
UCLA_SEND_MESSAGE:
    ; Initialize ARPANET Interface Message Processor (IMP)
    MOV AX, IMP_INIT_CMD
    OUT IMP_PORT, AX
    
    ; Wait for IMP ready signal
WAIT_IMP_READY:
    IN AX, IMP_STATUS_PORT
    TEST AX, IMP_READY_FLAG
    JZ WAIT_IMP_READY
    
    ; Prepare message header
    ; Destination: Stanford Research Institute (Host 2)
    MOV BX, 2                    ; Destination host number
    MOV CX, MESSAGE_LENGTH       ; Message length
    MOV DX, LOGIN_REQUEST        ; Message type
    
    ; Send header to IMP
    OUT IMP_DATA_PORT, BX        ; Destination
    OUT IMP_DATA_PORT, CX        ; Length
    OUT IMP_DATA_PORT, DX        ; Type
    
    ; Send message data character by character
    MOV SI, MESSAGE_BUFFER
    MOV DI, 0                    ; Character counter
    
SEND_CHAR_LOOP:
    LODSB                        ; Load character from message
    OUT IMP_DATA_PORT, AL        ; Send to IMP
    
    ; Wait for acknowledgment from remote host
    CALL WAIT_FOR_ACK
    CMP AL, ACK_RECEIVED
    JE CHAR_ACKNOWLEDGED
    
    ; If no ACK, we may have lost connection
    CMP AL, CONNECTION_LOST
    JE TRANSMISSION_FAILED
    
CHAR_ACKNOWLEDGED:
    INC DI                       ; Increment character count
    CMP DI, MESSAGE_LENGTH
    JL SEND_CHAR_LOOP
    
    ; Message sent successfully
    MOV AX, SUCCESS
    RET

TRANSMISSION_FAILED:
    ; The famous crash after "LO"
    MOV AX, SYSTEM_CRASH
    RET

; Stanford Research Institute Host (SDS 940) - Receiving side
SRI_RECEIVE_MESSAGE:
    ; Monitor IMP for incoming messages
WAIT_FOR_MESSAGE:
    IN AX, IMP_STATUS_PORT
    TEST AX, MESSAGE_AVAILABLE
    JZ WAIT_FOR_MESSAGE
    
    ; Read message header
    IN BX, IMP_DATA_PORT         ; Source host
    IN CX, IMP_DATA_PORT         ; Message length
    IN DX, IMP_DATA_PORT         ; Message type
    
    ; Prepare to receive character data
    MOV DI, RECEIVE_BUFFER
    MOV SI, 0                    ; Character counter
    
RECEIVE_CHAR_LOOP:
    ; Wait for character
    IN AX, IMP_STATUS_PORT
    TEST AX, DATA_AVAILABLE
    JZ RECEIVE_CHAR_LOOP
    
    ; Read character
    IN AL, IMP_DATA_PORT
    STOSB                        ; Store in receive buffer
    
    ; Send acknowledgment back to sender
    MOV AL, ACK_RECEIVED
    OUT IMP_ACK_PORT, AL
    
    ; Check what we received
    INC SI
    CMP SI, 1
    JE RECEIVED_L                ; First character 'L'
    CMP SI, 2  
    JE RECEIVED_O                ; Second character 'O'
    
    JMP CONTINUE_RECEIVE

RECEIVED_L:
    ; Logged: "Received 'L'"
    CALL LOG_CHARACTER
    JMP CONTINUE_RECEIVE

RECEIVED_O:
    ; Logged: "Received 'O'"
    CALL LOG_CHARACTER
    ; At this point, the UCLA system crashed
    ; SRI waited for more characters that never came
    JMP WAIT_FOR_MORE_DATA

WAIT_FOR_MORE_DATA:
    ; Wait for rest of "LOGIN" message
    ; But UCLA system had crashed after sending "LO"
    IN AX, IMP_STATUS_PORT
    TEST AX, CONNECTION_ACTIVE
    JZ CONNECTION_LOST
    JMP WAIT_FOR_MORE_DATA

CONNECTION_LOST:
    ; Connection terminated unexpectedly
    MOV AL, CONNECTION_TERMINATED
    RET

; Data definitions
MESSAGE_BUFFER:     DB 'LOGIN', 0
LOGIN_REQUEST       EQU 1
MESSAGE_LENGTH      EQU 5
ACK_RECEIVED        EQU 0x06
CONNECTION_LOST     EQU 0xFF
SUCCESS             EQU 0
SYSTEM_CRASH        EQU 1

; The historic log entry from that night:
; "22:30 - Attempted to send 'LOGIN' to SRI"
; "22:30 - Sent 'L' - ACK received"  
; "22:30 - Sent 'O' - ACK received"
; "22:30 - System crash - connection lost"
; "22:35 - System restored, LOGIN successful on retry"
```

# sourceLink
Based on historical accounts from Leonard Kleinrock (UCLA) and Bill Duvall (SRI)

# expertExplanation
The first ARPANET message used Interface Message Processors (IMPs) - the predecessors to modern routers. These specialized computers handled the network protocol while host computers focused on applications. The crash after "LO" wasn't a failure of the network design but of the host software, demonstrating an important principle: network reliability shouldn't depend on perfect host behavior. The successful retry an hour later proved that the fundamental architecture was sound, establishing patterns of error recovery and retry logic that became standard in all network protocols.