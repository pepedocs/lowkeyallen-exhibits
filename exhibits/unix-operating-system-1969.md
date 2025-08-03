# id
unix-operating-system-1969

# title
Unix Operating System

# what
The Unix operating system, created by Ken Thompson and Dennis Ritchie at Bell Labs. Unix introduced revolutionary concepts like hierarchical file systems, pipes, and the philosophy of "do one thing and do it well" that shaped all modern operating systems.

# impact
- Established the foundation for all modern operating systems
- Created the concept of portable operating systems (especially after C rewrite)
- Inspired Linux, which powers most of the internet and mobile devices
- Introduced shell scripting and command-line interfaces still used today
- Established the open source software development model
- Influenced programming languages, development tools, and software architecture principles

# when
1969

# category
Computing History

# language
Assembly

# codeSnippet
```c
// Simplified Unix kernel concepts - process creation and file operations
// Based on early Unix source code principles

#include <sys/types.h>
#include <unistd.h>

// Process control block - fundamental Unix concept
struct proc {
    int p_pid;          // Process ID
    int p_ppid;         // Parent process ID  
    int p_uid;          // User ID
    int p_gid;          // Group ID
    int p_stat;         // Process state
    char *p_wchan;      // Wait channel
    struct proc *p_link; // Link to next process
    char p_comm[14];    // Command name
};

// File descriptor table - everything is a file in Unix
struct file {
    int f_flag;         // File flags (read/write/append)
    int f_count;        // Reference count
    struct inode *f_inode; // Pointer to inode
    long f_offset;      // Current file offset
};

// The famous fork() system call implementation
int fork() {
    struct proc *newproc;
    
    // Allocate new process structure
    newproc = allocate_proc();
    if (newproc == NULL) {
        return -1;  // No more process slots
    }
    
    // Copy parent's memory space to child
    copy_memory_space(current_process, newproc);
    
    // Set up parent-child relationship
    newproc->p_ppid = current_process->p_pid;
    newproc->p_pid = allocate_pid();
    
    // Copy file descriptor table
    copy_file_descriptors(current_process, newproc);
    
    // Add to process table
    add_to_process_table(newproc);
    
    // Return different values to parent and child
    if (current_process == newproc) {
        return 0;  // Child process
    } else {
        return newproc->p_pid;  // Parent gets child's PID
    }
}

// exec() system call - load new program
int exec(char *filename, char *argv[]) {
    struct inode *inode;
    
    // Open executable file
    inode = namei(filename);
    if (inode == NULL) {
        return -1;  // File not found
    }
    
    // Check execute permissions
    if (!can_execute(inode, current_process->p_uid)) {
        return -1;  // Permission denied
    }
    
    // Replace current process image
    deallocate_memory(current_process);
    load_program(inode, current_process);
    
    // Set up argument vector
    setup_argv(argv);
    
    // Jump to program entry point
    jump_to_entry_point();
    
    // Never returns if successful
    return 0;
}

// pipe() system call - Unix's revolutionary IPC mechanism
int pipe(int filedes[2]) {
    struct file *read_file, *write_file;
    struct inode *pipe_inode;
    
    // Create pipe inode (special file type)
    pipe_inode = allocate_pipe_inode();
    if (pipe_inode == NULL) {
        return -1;
    }
    
    // Create read end file descriptor
    read_file = allocate_file();
    read_file->f_flag = FREAD;
    read_file->f_inode = pipe_inode;
    read_file->f_offset = 0;
    
    // Create write end file descriptor  
    write_file = allocate_file();
    write_file->f_flag = FWRITE;
    write_file->f_inode = pipe_inode;
    write_file->f_offset = 0;
    
    // Assign to process file descriptor table
    filedes[0] = assign_fd(current_process, read_file);   // Read end
    filedes[1] = assign_fd(current_process, write_file);  // Write end
    
    return 0;
}

// File system operations - hierarchical namespace
struct inode *namei(char *path) {
    struct inode *current_dir;
    char *component;
    
    if (path[0] == '/') {
        current_dir = root_inode;  // Start from root
        path++;  // Skip leading slash
    } else {
        current_dir = current_process->p_cdir;  // Start from current directory
    }
    
    // Walk through path components
    while ((component = next_path_component(&path)) != NULL) {
        
        if (strcmp(component, ".") == 0) {
            continue;  // Current directory
        } else if (strcmp(component, "..") == 0) {
            current_dir = current_dir->i_parent;  // Parent directory
        } else {
            // Search directory for component
            current_dir = lookup_directory_entry(current_dir, component);
            if (current_dir == NULL) {
                return NULL;  // Component not found
            }
        }
    }
    
    return current_dir;
}

// The shell - Unix's command interpreter
int main() {
    char command_line[256];
    char *argv[64];
    int argc;
    
    while (1) {
        // Display prompt
        write(1, "$ ", 2);
        
        // Read command line
        if (read_line(0, command_line, sizeof(command_line)) <= 0) {
            break;
        }
        
        // Parse command line into arguments
        argc = parse_command_line(command_line, argv);
        if (argc == 0) continue;
        
        // Handle built-in commands
        if (strcmp(argv[0], "cd") == 0) {
            chdir(argv[1]);
            continue;
        }
        
        // Fork and exec external command
        int pid = fork();
        if (pid == 0) {
            // Child process
            exec(argv[0], argv);
            write(2, "Command not found\n", 18);
            exit(1);
        } else if (pid > 0) {
            // Parent process - wait for child
            wait(&pid);
        } else {
            write(2, "Fork failed\n", 12);
        }
    }
    
    return 0;
}
```

# sourceLink
Based on early Unix source code from Bell Labs and "The Unix Programming Environment"

# expertExplanation
Ken Thompson and Dennis Ritchie created Unix out of frustration with existing systems that were complex and inflexible. Their breakthrough was treating everything as a file - devices, processes, and network connections all used the same interface. The pipe mechanism allowed small, focused programs to be combined in powerful ways, embodying the Unix philosophy. This modular approach made Unix incredibly adaptable and portable, leading to its dominance in servers, workstations, and eventually mobile devices through Linux and macOS.