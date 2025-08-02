# First Computer Virus - Creeper (1971)

## What
The Creeper virus, created by Bob Thomas at BBN Technologies, was the first self-replicating computer program. It displayed the message "I'M THE CREEPER: CATCH ME IF YOU CAN" and moved between ARPANET computers.

## When
1971

## Where
BBN Technologies, Cambridge, Massachusetts

## Language
Assembly

## Category
Security

## Code
```assembly
; Simplified representation of Creeper's core logic
; Original code was more complex and system-specific

CREEPER_START:
    ; Display message to user
    MOV AX, MESSAGE
    CALL DISPLAY_MESSAGE
    
    ; Copy self to new location
    MOV SI, PROGRAM_START
    MOV DI, NEW_LOCATION
    MOV CX, PROGRAM_SIZE
    REP MOVSB
    
    ; Find next network node
    CALL FIND_NETWORK_NODE
    
    ; Attempt to transmit to next node
    CALL TRANSMIT_SELF
    
    ; Remove self from current system
    CALL DELETE_SELF
    
    JMP NEW_LOCATION

MESSAGE: DB "I'M THE CREEPER: CATCH ME IF YOU CAN", 0
```

## Source
Historical recreation based on BBN Technologies archives

## Why This Matters
Creeper wasn't malicious - it was an experiment in distributed computing. However, it accidentally demonstrated how programs could spread autonomously across networks, leading to both advances in distributed systems and the birth of computer security concerns.

## Expert Explanation
Bob Thomas created Creeper as a proof-of-concept for mobile computing - programs that could move themselves across a network to utilize different resources. The program would copy itself to a remote system via ARPANET, announce its presence, then delete itself from the original location. While benign, it revealed the potential for self-propagating code, inspiring both defensive measures (like the first antivirus program, "Reaper") and unfortunately, malicious imitators.

## The Impact
- First demonstration of self-replicating network code
- Led to the creation of the first antivirus program (Reaper)
- Established the concept of mobile code and distributed computing
- Highlighted early network security vulnerabilities
- Inspired decades of research into both defensive and offensive cybersecurity
