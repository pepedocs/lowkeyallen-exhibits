# id
leo-first-business-computer-1951

# title
LEO I - First Business Computer for Accounting

# what
The Lyons Electronic Office (LEO I) was one of the world's first computers designed specifically for business applications. Built by J. Lyons and Co. (a British catering company) in 1951, it was used primarily for payroll calculations, inventory management, and accounting operations. LEO I revolutionized business computing by proving that computers could handle complex commercial calculations beyond scientific applications.

# impact
Pioneered the use of computers in business and accounting, establishing the foundation for modern Enterprise Resource Planning (ERP) systems. Demonstrated that electronic computers could handle complex payroll, inventory, and financial calculations more efficiently than manual bookkeeping methods. Influenced the development of COBOL and other business-oriented programming languages.

# when
1951

# category
Software & Computing

# language
Assembly

# codeSnippet
```assembly
; LEO I Assembly - Payroll Calculation Routine (reconstructed)
; Calculate weekly pay with overtime for employee
; Input: Basic hours, overtime hours, hourly rate

PAYROLL_CALC:
    ; Load employee data from memory
    LDA BASIC_HOURS     ; Load basic hours worked (40 max)
    STA TEMP_BASIC      ; Store in temporary location
    
    LDA OVERTIME_HOURS  ; Load overtime hours
    STA TEMP_OVERTIME   ; Store overtime hours
    
    LDA HOURLY_RATE     ; Load hourly rate (in pence)
    STA TEMP_RATE       ; Store rate
    
    ; Calculate basic pay (hours × rate)
    LDA TEMP_BASIC
    MUL TEMP_RATE       ; Multiply basic hours by rate
    STA BASIC_PAY       ; Store basic pay
    
    ; Calculate overtime pay (overtime hours × rate × 1.5)
    LDA TEMP_OVERTIME
    MUL TEMP_RATE       ; Overtime hours × rate
    STA TEMP_OT_PAY
    
    ; Multiply by 1.5 for overtime premium
    LDA TEMP_OT_PAY
    MUL #150            ; Multiply by 150 (representing 1.5 × 100)
    DIV #100            ; Divide by 100 to get actual amount
    STA OVERTIME_PAY    ; Store overtime pay
    
    ; Calculate total gross pay
    LDA BASIC_PAY
    ADD OVERTIME_PAY
    STA GROSS_PAY
    
    ; Calculate income tax (simple percentage)
    LDA GROSS_PAY
    MUL TAX_RATE        ; Multiply by tax rate percentage
    DIV #100            ; Convert percentage to actual amount
    STA INCOME_TAX
    
    ; Calculate net pay
    LDA GROSS_PAY
    SUB INCOME_TAX
    STA NET_PAY
    
    ; Store results in employee record
    LDA EMPLOYEE_ID
    STA PAYROLL_RECORD
    LDA NET_PAY
    STA PAYROLL_RECORD+1
    LDA GROSS_PAY
    STA PAYROLL_RECORD+2
    LDA INCOME_TAX
    STA PAYROLL_RECORD+3
    
    ; Update company totals
    LDA TOTAL_PAYROLL
    ADD NET_PAY
    STA TOTAL_PAYROLL
    
    ; Print payslip routine
    JSR PRINT_PAYSLIP
    
    RTS                 ; Return from subroutine

; Data storage areas
BASIC_HOURS:    .WORD 0
OVERTIME_HOURS: .WORD 0
HOURLY_RATE:    .WORD 0
EMPLOYEE_ID:    .WORD 0
TAX_RATE:       .WORD 20    ; 20% tax rate
GROSS_PAY:      .WORD 0
NET_PAY:        .WORD 0
INCOME_TAX:     .WORD 0
TOTAL_PAYROLL:  .WORD 0
PAYROLL_RECORD: .BLOCK 10   ; Employee payroll record
```

# sourceLink
https://en.wikipedia.org/wiki/LEO_(computer)

# expertExplanation
LEO I represented a revolutionary leap from manual bookkeeping to automated accounting systems. The computer could process complex payroll calculations including overtime premiums, tax deductions, and benefits in minutes rather than days. Its programming required meticulous attention to decimal arithmetic since floating-point math didn't exist - all calculations were performed using fixed-point integer arithmetic. The system processed J. Lyons' weekly payroll for over 5,000 employees, handling complex union rules, pension contributions, and tax calculations. This marked the birth of what we now call business intelligence and automated financial reporting systems.
