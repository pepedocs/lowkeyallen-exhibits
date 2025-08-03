# id
git-version-control-system-2005

# title
Git Version Control System

# what
The Git distributed version control system, created by Linus Torvalds to manage Linux kernel development. Git revolutionized software development by making branching, merging, and distributed collaboration practical and efficient.

# impact
- Revolutionized software development workflows with practical branching and merging
- Enabled the rise of distributed development and open-source collaboration
- Made possible platforms like GitHub, which transformed how developers share code
- Influenced the design of other distributed systems and content-addressable storage
- Became the dominant version control system used by virtually all software projects
- Enabled new development practices like continuous integration and GitOps

# when
2005

# category
Integration

# language
C

# codeSnippet
```c
// Simplified Git internals - core concepts and data structures
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <openssl/sha.h>

// Git object types
#define GIT_OBJ_COMMIT 1
#define GIT_OBJ_TREE   2
#define GIT_OBJ_BLOB   3
#define GIT_OBJ_TAG    4

// Git object header structure
struct git_object_header {
    int type;
    size_t size;
    unsigned char sha1[20];
};

// Git blob object - stores file content
struct git_blob {
    struct git_object_header header;
    unsigned char *data;
};

// Git tree entry - represents a file or directory
struct git_tree_entry {
    unsigned int mode;          // File permissions (e.g., 100644, 100755, 040000)
    char name[256];            // File/directory name
    unsigned char sha1[20];    // SHA-1 hash of the object
    struct git_tree_entry *next;
};

// Git tree object - represents a directory
struct git_tree {
    struct git_object_header header;
    struct git_tree_entry *entries;
};

// Git commit object - represents a snapshot in history
struct git_commit {
    struct git_object_header header;
    unsigned char tree_sha1[20];      // Root tree SHA-1
    unsigned char *parent_sha1;       // Parent commit(s) SHA-1
    int num_parents;
    char author[256];                 // Author name and email
    time_t author_time;
    char committer[256];              // Committer name and email  
    time_t commit_time;
    char *message;                    // Commit message
};

// Calculate SHA-1 hash for Git objects
void calculate_sha1(const unsigned char *data, size_t length, unsigned char *hash) {
    SHA_CTX ctx;
    SHA1_Init(&ctx);
    SHA1_Update(&ctx, data, length);
    SHA1_Final(hash, &ctx);
}

// Create a blob object from file content
struct git_blob *create_blob(const unsigned char *file_data, size_t file_size) {
    struct git_blob *blob = malloc(sizeof(struct git_blob));
    
    // Create object content: "blob <size>\0<data>"
    size_t header_size = snprintf(NULL, 0, "blob %zu", file_size) + 1;
    unsigned char *object_data = malloc(header_size + file_size);
    
    sprintf((char*)object_data, "blob %zu", file_size);
    object_data[header_size - 1] = '\0';
    memcpy(object_data + header_size, file_data, file_size);
    
    // Calculate SHA-1 hash
    calculate_sha1(object_data, header_size + file_size, blob->header.sha1);
    
    blob->header.type = GIT_OBJ_BLOB;
    blob->header.size = file_size;
    blob->data = malloc(file_size);
    memcpy(blob->data, file_data, file_size);
    
    free(object_data);
    return blob;
}

// Create a tree object from directory entries
struct git_tree *create_tree(struct git_tree_entry *entries) {
    struct git_tree *tree = malloc(sizeof(struct git_tree));
    tree->entries = entries;
    
    // Calculate tree content for hashing
    size_t content_size = 0;
    struct git_tree_entry *entry = entries;
    
    // Calculate total size needed
    while (entry) {
        content_size += snprintf(NULL, 0, "%o %s", entry->mode, entry->name) + 1 + 20;
        entry = entry->next;
    }
    
    // Build tree content: mode name\0sha1 for each entry
    unsigned char *tree_content = malloc(content_size);
    size_t offset = 0;
    entry = entries;
    
    while (entry) {
        int name_len = sprintf((char*)tree_content + offset, "%o %s", entry->mode, entry->name);
        offset += name_len + 1;  // +1 for null terminator
        memcpy(tree_content + offset, entry->sha1, 20);
        offset += 20;
        entry = entry->next;
    }
    
    // Create object header and calculate hash
    size_t header_size = snprintf(NULL, 0, "tree %zu", content_size) + 1;
    unsigned char *object_data = malloc(header_size + content_size);
    sprintf((char*)object_data, "tree %zu", content_size);
    object_data[header_size - 1] = '\0';
    memcpy(object_data + header_size, tree_content, content_size);
    
    calculate_sha1(object_data, header_size + content_size, tree->header.sha1);
    
    tree->header.type = GIT_OBJ_TREE;
    tree->header.size = content_size;
    
    free(tree_content);
    free(object_data);
    return tree;
}

// Create a commit object
struct git_commit *create_commit(unsigned char *tree_sha1, 
                                unsigned char **parent_sha1s,
                                int num_parents,
                                const char *author,
                                const char *message) {
    struct git_commit *commit = malloc(sizeof(struct git_commit));
    
    memcpy(commit->tree_sha1, tree_sha1, 20);
    commit->num_parents = num_parents;
    
    if (num_parents > 0) {
        commit->parent_sha1 = malloc(20 * num_parents);
        for (int i = 0; i < num_parents; i++) {
            memcpy(commit->parent_sha1 + (i * 20), parent_sha1s[i], 20);
        }
    } else {
        commit->parent_sha1 = NULL;
    }
    
    strncpy(commit->author, author, sizeof(commit->author) - 1);
    strncpy(commit->committer, author, sizeof(commit->committer) - 1);
    commit->author_time = commit->commit_time = time(NULL);
    
    commit->message = malloc(strlen(message) + 1);
    strcpy(commit->message, message);
    
    // Build commit content for hashing
    char tree_str[41], parent_str[41];
    sha1_to_hex(tree_sha1, tree_str);
    
    size_t content_size = snprintf(NULL, 0, 
        "tree %s\n%sauthor %s %ld +0000\ncommitter %s %ld +0000\n\n%s",
        tree_str,
        num_parents > 0 ? (sha1_to_hex(parent_sha1s[0], parent_str), 
                          snprintf(NULL, 0, "parent %s\n", parent_str) + 1) : 0,
        author, commit->author_time,
        author, commit->commit_time,
        message);
    
    unsigned char *commit_content = malloc(content_size);
    snprintf((char*)commit_content, content_size,
        "tree %s\n%sauthor %s %ld +0000\ncommitter %s %ld +0000\n\n%s",
        tree_str,
        num_parents > 0 ? (snprintf(parent_str, sizeof(parent_str), "parent %s\n", 
                                   sha1_to_hex(parent_sha1s[0], tree_str)), parent_str) : "",
        author, commit->author_time,
        author, commit->commit_time,
        message);
    
    // Create object with header
    size_t header_size = snprintf(NULL, 0, "commit %zu", content_size) + 1;
    unsigned char *object_data = malloc(header_size + content_size);
    sprintf((char*)object_data, "commit %zu", content_size);
    object_data[header_size - 1] = '\0';
    memcpy(object_data + header_size, commit_content, content_size);
    
    calculate_sha1(object_data, header_size + content_size, commit->header.sha1);
    
    commit->header.type = GIT_OBJ_COMMIT;
    commit->header.size = content_size;
    
    free(commit_content);
    free(object_data);
    return commit;
}

// Git's three-way merge algorithm (simplified)
int three_way_merge(const char *base_content, 
                   const char *ours_content, 
                   const char *theirs_content,
                   char **merged_content) {
    
    // This is a simplified version - real Git uses much more sophisticated algorithms
    
    // If our version matches base, take their version
    if (strcmp(base_content, ours_content) == 0) {
        *merged_content = strdup(theirs_content);
        return 0;  // Clean merge
    }
    
    // If their version matches base, take our version
    if (strcmp(base_content, theirs_content) == 0) {
        *merged_content = strdup(ours_content);
        return 0;  // Clean merge
    }
    
    // If both versions are identical, use either
    if (strcmp(ours_content, theirs_content) == 0) {
        *merged_content = strdup(ours_content);
        return 0;  // Clean merge
    }
    
    // Conflict - create merge conflict markers
    size_t merged_size = strlen(ours_content) + strlen(theirs_content) + 100;
    *merged_content = malloc(merged_size);
    snprintf(*merged_content, merged_size,
        "<<<<<<< HEAD\n%s=======\n%s>>>>>>> branch\n",
        ours_content, theirs_content);
    
    return 1;  // Merge conflict
}

// Git repository status checking
typedef enum {
    GIT_STATUS_UNMODIFIED,
    GIT_STATUS_MODIFIED,
    GIT_STATUS_ADDED,
    GIT_STATUS_DELETED,
    GIT_STATUS_RENAMED,
    GIT_STATUS_COPIED,
    GIT_STATUS_UNTRACKED
} git_status_t;

struct git_status_entry {
    char filename[256];
    git_status_t status;
    unsigned char index_sha1[20];
    unsigned char workdir_sha1[20];
    struct git_status_entry *next;
};

// Check status of working directory vs index
struct git_status_entry *git_status(const char *repo_path) {
    struct git_status_entry *status_list = NULL;
    
    // Compare working directory with index
    // This would involve:
    // 1. Reading the index file (.git/index)
    // 2. Scanning working directory files
    // 3. Computing SHA-1 hashes for modified files
    // 4. Comparing timestamps and hashes
    
    printf("Checking repository status...\n");
    
    // Simplified implementation - in real Git this is much more complex
    return status_list;
}

// Git branch management
struct git_branch {
    char name[64];
    unsigned char commit_sha1[20];
    int is_current;
    struct git_branch *next;
};

struct git_branch *list_branches(const char *repo_path) {
    struct git_branch *branches = NULL;
    
    // Read .git/refs/heads/ directory
    // Parse .git/HEAD to find current branch
    
    printf("Listing branches in %s\n", repo_path);
    return branches;
}

// Example usage - simulating Git operations
int main() {
    printf("Git Internals Demonstration\n");
    printf("===========================\n\n");
    
    // Create a blob (file content)
    const char *file_content = "Hello, Git World!\nThis is a test file.\n";
    struct git_blob *blob = create_blob((unsigned char*)file_content, strlen(file_content));
    
    char blob_hash[41];
    sha1_to_hex(blob->header.sha1, blob_hash);
    printf("Created blob: %s\n", blob_hash);
    
    // Create tree entries
    struct git_tree_entry entry = {
        .mode = 100644,  // Regular file
        .name = "test.txt",
        .next = NULL
    };
    memcpy(entry.sha1, blob->header.sha1, 20);
    
    // Create a tree (directory)
    struct git_tree *tree = create_tree(&entry);
    char tree_hash[41];
    sha1_to_hex(tree->header.sha1, tree_hash);
    printf("Created tree: %s\n", tree_hash);
    
    // Create a commit
    struct git_commit *commit = create_commit(
        tree->header.sha1,
        NULL,  // No parents (initial commit)
        0,
        "Linus Torvalds <torvalds@linux-foundation.org>",
        "Initial commit\n\nAdded test.txt file"
    );
    
    char commit_hash[41];
    sha1_to_hex(commit->header.sha1, commit_hash);
    printf("Created commit: %s\n", commit_hash);
    
    printf("\nGit object model demonstration complete!\n");
    printf("This shows how Git stores everything as content-addressed objects.\n");
    
    // Clean up
    free(blob->data);
    free(blob);
    free(tree);
    free(commit->message);
    free(commit->parent_sha1);
    free(commit);
    
    return 0;
}
```

# sourceLink
Based on Git source code and Linus Torvalds' original design documents

# expertExplanation
Linus Torvalds designed Git after becoming frustrated with existing version control systems that were either too slow (like CVS) or proprietary (like BitKeeper). Git's breakthrough was treating everything as content-addressable objects identified by SHA-1 hashes. This made operations like comparing versions incredibly fast and guaranteed data integrity. The distributed model meant every clone was a complete repository, enabling offline work and making the system highly resilient. Git's sophisticated merging algorithms made branching practical, transforming how teams collaborate on code.