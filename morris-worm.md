# title
Morris Worm - First Internet Worm

# id
morris-worm

# what
The first self-propagating worm that spread across the early Internet.

# impact
Infected 10% of the 60,000 computers connected to the Internet, led to first computer crime conviction.

# when
1988

# category
Cyber Security

# language
C

# codeSnippet
```c
// Simplified version of finger exploit
char buffer[512];
char shellcode[] = "\x90\x90\x90..."; // NOP sled + payload

strcpy(buffer, shellcode);  // Buffer overflow
system("/bin/sh");          // Execute shell
```

# sourceLink
https://www.fbi.gov/news/stories/morris-worm-30-years-since-first-major-attack-on-internet-security

# expertExplanation
Robert Tappan Morris created this worm as an experiment to measure the size of the Internet, but a bug caused it to replicate faster than intended. It exploited vulnerabilities in sendmail, finger, and rsh/rexec to spread between Unix systems. This incident led to the creation of the first Computer Emergency Response Team (CERT) and highlighted the need for Internet security.
