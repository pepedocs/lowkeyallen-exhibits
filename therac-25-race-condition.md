# title
Therac-25 Radiation Overdose

# id
therac-25-race-condition

# what
Race condition in medical software allowed massive radiation overdoses.

# impact
6 patients received lethal radiation doses; 3 died.

# when
1985-1987

# category
Mission-Critical

# language
C

# codeSnippet
```c
// Pseudocode of the flaw
if (edit_mode) {
  set_energy_level(25);
}
// Race condition here - operator could change mode
if (treatment_mode) {
  activate_beam(); // Used wrong energy level!
}
```

# sourceLink
https://web.archive.org/web/20041128024227/http://www.cs.umd.edu/class/spring2003/cmsc838p/Misc/therac.pdf

# expertExplanation
The Therac-25's software had a race condition where rapid operator inputs could cause the machine to fire a high-energy electron beam instead of the intended low-energy X-ray beam. The software also had inadequate error handling and dismissed safety interlocks, leading to tragic consequences.
