# title
Apollo 11's 1201 Alarm Code

# id
apollo-11-1201-alarm

# what
Computer overload protection that prioritized critical tasks during lunar landing.

# impact
Prevented mission abort, allowing first moon landing despite computer warnings.

# when
1969

# category
Mission-Critical

# language
Assembly

# codeSnippet
```assembly
if (PRIO(NEWJOB) >= PRIO(job[EXEC])) {
    ALARM(1201);  // Executive overflow
    RESTART();
}
```

# sourceLink
https://github.com/chrislgarry/Apollo-11

# expertExplanation
The Apollo Guidance Computer's executive program could detect when it was overloaded and would restart itself while preserving the most critical tasks. The 1201 alarm meant 'executive overflow' but the system kept running, allowing Armstrong to land safely.
