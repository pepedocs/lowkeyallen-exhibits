# id
apollo-11-guidance-computer

# title
Apollo 11 Guidance Computer Code

# what
The assembly code that powered the Apollo Guidance Computer, responsible for navigating the first humans to the Moon and back safely.

# impact
This code represents humanity's first computer-controlled journey to another celestial body, proving that software could handle life-critical space missions.

# when
1969

# category
Mission-Critical

# language
Assembly

# codeSnippet
```assembly
# LUNAR LANDING GUIDANCE EQUATIONS
#
# PROGRAM NAME - P63
# MOD NO - 1
# MOD BY - N. SEARS
# DATE - DEC 19 1966

ULLAGE          TC      PHASCHNG
                OCT     04024

                TC      INTPRET
                DLOAD   BMN
                        /LAND/
                        ASCENT
                SET     SET
                        SURFFLAG
                        APSFLAG
                SET     CLEAR
                        LATSW
                        ERADX
                CALL
                        CHKBITS
```

# sourceLink
https://github.com/chrislgarry/Apollo-11

# expertExplanation
This assembly code from the Apollo Guidance Computer represents one of the most critical software systems ever written. Every line had to work perfectly - human lives depended on it. The code shows the LUNAR LANDING GUIDANCE EQUATIONS from Program P63, which controlled the descent to the Moon's surface. Notice the precise control flow with TC (Transfer Control) instructions and the systematic approach to setting flags for different mission phases. The AGC had only 4KB of RAM and ran at 1MHz, yet it successfully navigated to the Moon multiple times. This code demonstrates that with careful engineering and rigorous testing, software can achieve the seemingly impossible. The comments and structure reveal the methodical approach NASA took to ensure reliability in the most demanding environment imaginable.
