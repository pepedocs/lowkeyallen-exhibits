# id
eliza-chatbot-1966

# title
ELIZA - The First AI Therapist

# what
ELIZA was one of the first chatbot programs, created by Joseph Weizenbaum at MIT in 1966. The most famous script was DOCTOR, which simulated a Rogerian psychotherapist by using pattern matching and substitution to respond to user input. Many users were convinced they were talking to a real human therapist.

# impact
Demonstrated the power of simple pattern matching to create convincing human-like interaction. Sparked debates about artificial intelligence, human-computer interaction, and the nature of understanding. Influenced decades of chatbot development and natural language processing research.

# when
1966

# category
Educational

# language
SLIP

# codeSnippet
```lisp
; ELIZA DOCTOR script pattern matching rules
; Original implementation in SLIP (Symmetric List Processor)

(defpattern (I AM *)
  (response "How long have you been" *))

(defpattern (I FEEL *)
  (response "Tell me more about feeling" *))

(defpattern (MY * IS *)
  (response "Your" * "is" * "?"))

(defpattern (* MOTHER *)
  (response "Tell me more about your family"))

(defpattern (I WANT *)
  (response "What would it mean to you if you got" *))

(defpattern (I REMEMBER *)
  (response "Do you often think of" *))

(defpattern (IF *)
  (response "Do you think it's likely that" *))

(defpattern (I DREAMED *)
  (response "Really," * "-- How do you feel about that"))

; Default responses when no pattern matches
(defresponse 
  "I see."
  "Very interesting."
  "Go on."
  "Tell me more about that.")
```

# sourceLink
https://web.stanford.edu/class/linguist238/p36-weizenabaum.pdf

# expertExplanation
ELIZA used simple keyword spotting and pattern substitution. When a user said "I am sad", ELIZA would transform it to "How long have you been sad?" by matching the pattern "I AM *" and substituting the wildcard. Despite its simplicity, users often attributed human-like understanding to the program, demonstrating the ELIZA effect - humans' tendency to unconsciously assume computer behaviors are analogous to human behaviors.
