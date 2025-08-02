# Google PageRank Algorithm (1996)

## What
The original PageRank algorithm developed by Larry Page and Sergey Brin at Stanford University. This algorithm revolutionized web search by ranking pages based on their link structure rather than just content matching.

## When
1996

## Where
Stanford University, California

## Language
Mathematical/Pseudocode

## Category
Integration

## Code
```python
# Simplified PageRank algorithm implementation
import numpy as np

def pagerank(M, num_iterations=100, d=0.85):
    """
    M: adjacency matrix where M[i,j] represents a link from page j to page i
    d: damping factor (probability of following a link vs random jump)
    """
    N = M.shape[1]  # number of pages
    v = np.random.rand(N, 1)  # initial ranking vector
    v = v / np.linalg.norm(v, 1)  # normalize
    
    # Normalize M column-wise (outgoing links)
    M_hat = M / np.sum(M, axis=0, keepdims=True)
    
    for i in range(num_iterations):
        # PageRank equation: PR = d * M * PR + (1-d)/N * e
        v = d * np.dot(M_hat, v) + (1 - d) / N * np.ones((N, 1))
    
    return v

# Example usage
# Create a simple 4-page web graph
# Page 0 links to pages 1,2,3
# Page 1 links to page 2  
# Page 2 links to page 0
# Page 3 links to pages 0,2

M = np.array([
    [0, 0, 1, 1],  # Page 0 receives links from pages 2,3
    [1, 0, 0, 0],  # Page 1 receives link from page 0
    [1, 1, 0, 1],  # Page 2 receives links from pages 0,1,3
    [1, 0, 0, 0]   # Page 3 receives link from page 0
])

rankings = pagerank(M)
print("Page rankings:", rankings.flatten())
```

## Source
Based on "The PageRank Citation Ranking: Bringing Order to the Web" by Page, Brin, Motwani, and Winograd

## Why This Matters
PageRank solved the fundamental problem of web search: how to determine which pages are most important when millions of pages might contain your search terms. By treating links as "votes" and weighing votes from important pages more heavily, it created the foundation for modern search engines.

## Expert Explanation
The genius of PageRank lies in its recursive definition: a page is important if important pages link to it. This creates a feedback loop where authority flows through the web's link structure. The algorithm models a "random surfer" who clicks links randomly (with probability d) or jumps to a random page (with probability 1-d). The steady-state probability of being on each page becomes its PageRank score. This mathematical elegance turned link analysis into Google's competitive advantage and changed how we navigate information.

## The Impact
- Became the foundation of Google Search, creating a $1+ trillion company
- Transformed web search from keyword matching to authority-based ranking
- Inspired countless variations in social networks, academic citations, and recommendation systems
- Established the principle that link structure reveals content quality
- Created the modern SEO industry focused on earning high-quality backlinks
