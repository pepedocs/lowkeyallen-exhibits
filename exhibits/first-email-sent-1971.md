# id
first-email-sent-1971

# title
First Email Sent

# what
Ray Tomlinson sent the first network email between two computers on ARPANET, using the @ symbol to separate the user name from the host name. This simple innovation created the addressing system still used in email today.

# impact
- Created the @ symbol email addressing system used by billions daily
- Established the foundation for modern digital communication
- Enabled the first form of asynchronous networked messaging
- Led to the development of email protocols like SMTP, POP, and IMAP
- Transformed business communication and personal correspondence globally
- Made possible the later development of instant messaging and social media

# when
1971

# category
Integration

# language
Assembly

# codeSnippet
```assembly
; Simplified representation of SNDMSG modifications for network email
; Original code was much more complex and system-specific

SEND_MESSAGE:
    ; Parse recipient address for @ symbol
    MOV SI, RECIPIENT_ADDR
    CALL FIND_AT_SYMBOL
    
    ; Split into username and hostname
    MOV DI, USERNAME
    CALL EXTRACT_USERNAME
    
    MOV DI, HOSTNAME  
    CALL EXTRACT_HOSTNAME
    
    ; Check if hostname is local or remote
    CMP HOSTNAME, LOCAL_HOST
    JE LOCAL_DELIVERY
    
    ; For remote delivery, establish ARPANET connection
    CALL CONNECT_TO_HOST
    
    ; Send message format:
    ; FROM: sender@localhost
    ; TO: recipient@remotehost
    ; MESSAGE: [content]
    
    CALL TRANSMIT_MESSAGE
    CALL CLOSE_CONNECTION
    RET

LOCAL_DELIVERY:
    ; Use existing local message system
    CALL DELIVER_LOCAL
    RET

; The @ symbol parsing routine
FIND_AT_SYMBOL:
    LODSB               ; Load character from address
    CMP AL, '@'         ; Compare with @ symbol (ASCII 64)
    JE FOUND_AT
    CMP AL, 0           ; End of string?
    JE NO_AT_FOUND
    JMP FIND_AT_SYMBOL
    
FOUND_AT:
    ; Split address at @ symbol
    RET
```

# sourceLink
Based on historical accounts from Ray Tomlinson and BBN Technologies archives

# expertExplanation
Ray Tomlinson modified the existing SNDMSG program to work across ARPANET nodes. His innovation was the addressing scheme: "user@host" which allowed messages to be sent between different computers on the network. The first email was likely something mundane like "QWERTYUIOP" - Tomlinson was testing the system, not trying to make history. But this simple test message established the fundamental architecture of email: store-and-forward messaging with universal addressing that could scale across any network.