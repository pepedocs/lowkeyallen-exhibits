# title
Y2K Bug and Date Handling

# id
y2k-bug

# what
Two-digit year representation causing date calculation failures at year 2000.

# impact
Billions spent on remediation; some systems failed but catastrophe was mostly averted.

# when
1999-2000

# category
Software & Computing

# language
COBOL

# codeSnippet
```cobol
01 DATE-FIELDS.
   05 CURRENT-YEAR    PIC 99.  *> Only 2 digits!
   05 BIRTH-YEAR      PIC 99.

COMPUTE AGE = CURRENT-YEAR - BIRTH-YEAR.
*> Problem: 00 - 99 = -99 (not 1!)
```

# sourceLink
https://www.nist.gov/y2k

# expertExplanation
The Y2K bug was caused by decades of using two-digit year representations to save memory and storage space. When 1999 rolled over to 2000, systems interpreted "00" as 1900, causing incorrect calculations. This affected everything from financial systems to industrial controllers, leading to the largest software remediation effort in history.
