# title
Unix Epoch Time and 2038 Problem

# id
unix-epoch-2038

# what
32-bit Unix timestamp overflow on January 19, 2038.

# impact
Many systems will fail or reset to 1901, similar to Y2K but potentially worse.

# when
1970 - 2038

# category
Software & Computing

# language
C

# codeSnippet
```c
#include <time.h>

time_t now = time(NULL);  // 32-bit signed integer
// Maximum value: 2,147,483,647
// = January 19, 2038 03:14:07 UTC
// After that: -2,147,483,648
// = December 13, 1901 20:45:52 UTC
```

# sourceLink
https://en.wikipedia.org/wiki/Year_2038_problem

# expertExplanation
The Unix epoch began on January 1, 1970, and time is counted in seconds since then. On 32-bit systems, this creates a signed integer that will overflow on January 19, 2038, wrapping around to a negative number representing 1901. Unlike Y2K, this problem affects the fundamental time representation in many operating systems and embedded devices.
