# title
Heartbleed Vulnerability in OpenSSL

# id
heartbleed-openssl

# what
Fails to verify the payload length in a heartbeat message before copying memory.

# impact
Leaked ~64KB of memory from servers, exposing encryption keys and personal data.

# when
2011 - 2014

# category
Cyber Security

# language
C

# codeSnippet
```c
memcpy(bp, pl, payload);  // no bounds check
```

# sourceLink
https://github.com/openssl/openssl/commit/4817504

# expertExplanation
This bug emerged from a new feature in OpenSSL's heartbeat extension. The attacker could exploit unchecked input to read arbitrary server memory, causing a major global security breach.
