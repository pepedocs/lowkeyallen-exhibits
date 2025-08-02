# title
Ariane 5 Flight 501 Integer Overflow

# id
ariane-5-explosion

# what
64-bit floating point converted to 16-bit signed integer without proper bounds checking.

# impact
$370 million rocket exploded 37 seconds after launch.

# when
1996

# category
Mission-Critical

# language
Ada

# codeSnippet
```ada
-- Ada code
BH := BH + BV * 0.1;
IF BH > 32767 THEN
  EXCEPTION_HANDLER; -- This was missing!
```

# sourceLink
https://www.ima.umn.edu/~arnold/disasters/ariane.html

# expertExplanation
The inertial reference system tried to convert a 64-bit floating-point number to a 16-bit signed integer, but the number was larger than 32,767. This caused an operand error, system shutdown, and ultimately the rocket's destruction. The irony: this conversion was for a diagnostic value only needed before launch.
