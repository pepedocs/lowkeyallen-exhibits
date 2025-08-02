# id
linux-kernel-first-version-1991

# title
Linux Kernel 0.01 - Revolutionary Operating System

# what
The first version of the Linux kernel, released by Linus Torvalds on September 17, 1991. This 10,239-line monolithic kernel supported basic functionality like task switching, filesystem operations, and device drivers. It was initially developed as a hobby project to create a free alternative to MINIX.

# impact
Revolutionized operating systems by proving that high-quality software could be developed through open-source collaboration. Linux now powers everything from smartphones to supercomputers, becoming the foundation of the modern internet infrastructure and cloud computing.

# when
1991

# category
Software & Computing

# language
C

# codeSnippet
```c
/* Linux kernel 0.01 - boot/head.s and kernel/sched.c excerpts */

/* From boot/head.s - kernel entry point */
.text
.globl _main
_main:
    movl $0x10,%eax          /* Load data segment selector */
    mov %ax,%ds              /* Set data segment */
    mov %ax,%es              /* Set extra segment */ 
    mov %ax,%fs              /* Set fs segment */
    mov %ax,%gs              /* Set gs segment */
    lss _stack_start,%esp    /* Load stack pointer */
    call setup_idt           /* Setup interrupt descriptor table */
    call setup_gdt           /* Setup global descriptor table */
    movl $0x10,%eax          /* Reload all segments */
    mov %ax,%ds
    mov %ax,%es
    mov %ax,%fs
    mov %ax,%gs
    lss _stack_start,%esp
    jmp after_page_tables    /* Jump to main kernel code */

/* From kernel/sched.c - task switching */
#include <linux/sched.h>
#include <linux/kernel.h>
#include <asm/system.h>

struct task_struct * task[NR_TASKS] = {&(init_task.task), };
long volatile jiffies = 0;
long startup_time = 0;
struct task_struct *current = &(init_task.task);
struct task_struct *last_task_used_math = NULL;

/* Simple round-robin scheduler */
void schedule(void) {
    int i, next, c;
    struct task_struct ** p;

    /* Check alarm timers */
    for(p = &LAST_TASK ; p > &FIRST_TASK ; --p)
        if (*p) {
            if ((*p)->alarm && (*p)->alarm < jiffies) {
                (*p)->signal |= (1<<(SIGALRM-1));
                (*p)->alarm = 0;
            }
            if (((*p)->signal & ~(_BLOCKABLE & (*p)->blocked)) &&
                (*p)->state == TASK_INTERRUPTIBLE)
                (*p)->state = TASK_RUNNING;
        }

    /* Find task with highest counter (time slice) */
    while (1) {
        c = -1;
        next = 0;
        i = NR_TASKS;
        p = &task[NR_TASKS];
        while (--i) {
            if (!*--p)
                continue;
            if ((*p)->state == TASK_RUNNING && (*p)->counter > c)
                c = (*p)->counter, next = i;
        }
        if (c) break;
        
        /* Reset counters if all are zero */
        for(p = &LAST_TASK ; p > &FIRST_TASK ; --p)
            if (*p)
                (*p)->counter = ((*p)->counter >> 1) + (*p)->priority;
    }
    switch_to(next);  /* Perform context switch */
}

/* Timer interrupt handler */
void do_timer(long cpl) {
    if (cpl)
        current->utime++;
    else
        current->stime++;
    
    if (current == task[0] || (--current->counter) <= 0) {
        current->counter = 0;
        if (!cpl) return;
        schedule();
    }
}
```

# sourceLink
https://kernel.org/pub/linux/kernel/Historic/linux-0.01.tar.gz

# expertExplanation
Linux 0.01 was a monolithic kernel with basic process scheduling, memory management, and file system support. The scheduler used a simple priority-based round-robin algorithm, giving more CPU time to processes with higher priority values. Task switching was handled through assembly language routines that saved and restored CPU registers. The kernel supported the Intel 80386 processor and could run basic Unix-like programs, though it lacked networking, loadable modules, and many other modern features.
