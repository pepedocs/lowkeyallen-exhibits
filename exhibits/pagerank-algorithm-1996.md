# id
pagerank-algorithm-1996

# title
PageRank Algorithm - Google's Foundation

# what
The PageRank algorithm, developed by Larry Page and Sergey Brin at Stanford in 1996, revolutionized web search by ranking web pages based on their link authority rather than just content matching. This algorithm became the foundation of Google Search and transformed how we find information on the internet.

# impact
Enabled Google to provide dramatically better search results than existing search engines, leading to Google's dominance in web search. Revolutionized information retrieval and influenced countless other ranking algorithms in social media, academic citations, and recommendation systems.

# when
1996

# category
Software & Computing

# language
Python

# codeSnippet
```python
import numpy as np
from scipy.sparse import csr_matrix

class PageRank:
    def __init__(self, damping_factor=0.85, max_iterations=100, tolerance=1e-6):
        self.damping_factor = damping_factor
        self.max_iterations = max_iterations
        self.tolerance = tolerance
    
    def calculate_pagerank(self, adjacency_matrix):
        """
        Calculate PageRank using the original algorithm
        PR(A) = (1-d)/N + d * sum(PR(T_i)/C(T_i))
        where d is damping factor, N is number of pages,
        T_i are pages that link to A, C(T_i) is outbound link count
        """
        n = adjacency_matrix.shape[0]
        
        # Initialize PageRank values uniformly
        pagerank = np.ones(n) / n
        
        # Convert to column-stochastic matrix
        # Each column sums to 1 (outbound links)
        outbound_links = np.array(adjacency_matrix.sum(axis=0)).flatten()
        
        # Handle dangling nodes (pages with no outbound links)
        dangling_nodes = (outbound_links == 0)
        outbound_links[dangling_nodes] = 1
        
        # Create transition matrix
        transition_matrix = adjacency_matrix / outbound_links
        
        # Iterative calculation
        for iteration in range(self.max_iterations):
            prev_pagerank = pagerank.copy()
            
            # PageRank formula
            pagerank = (1 - self.damping_factor) / n + \
                      self.damping_factor * transition_matrix.dot(prev_pagerank)
            
            # Handle dangling nodes by distributing their PageRank equally
            dangling_sum = prev_pagerank[dangling_nodes].sum()
            pagerank += self.damping_factor * dangling_sum / n
            
            # Check for convergence
            if np.linalg.norm(pagerank - prev_pagerank) < self.tolerance:
                print(f"Converged after {iteration + 1} iterations")
                break
        
        return pagerank
    
    def create_web_graph(self, pages, links):
        """
        Create adjacency matrix from web pages and links
        links: list of (from_page, to_page) tuples
        """
        n = len(pages)
        page_index = {page: i for i, page in enumerate(pages)}
        
        # Create adjacency matrix
        adjacency = np.zeros((n, n))
        
        for from_page, to_page in links:
            if from_page in page_index and to_page in page_index:
                from_idx = page_index[from_page]
                to_idx = page_index[to_page]
                adjacency[to_idx, from_idx] = 1  # Note: transposed for column-stochastic
        
        return adjacency, page_index

# Example usage - early web graph simulation
def simulate_early_web():
    # Simulate early Stanford/academic web structure
    pages = [
        "stanford.edu",
        "cs.stanford.edu", 
        "yahoo.com",
        "altavista.com",
        "backrub.stanford.edu",  # Original Google prototype
        "personal_page_1",
        "personal_page_2"
    ]
    
    # Link structure (who links to whom)
    links = [
        ("stanford.edu", "cs.stanford.edu"),
        ("cs.stanford.edu", "backrub.stanford.edu"),
        ("yahoo.com", "stanford.edu"),
        ("altavista.com", "stanford.edu"),
        ("personal_page_1", "stanford.edu"),
        ("personal_page_2", "cs.stanford.edu"),
        ("backrub.stanford.edu", "stanford.edu"),
        ("backrub.stanford.edu", "yahoo.com")
    ]
    
    pr = PageRank()
    adjacency, page_index = pr.create_web_graph(pages, links)
    pagerank_scores = pr.calculate_pagerank(adjacency)
    
    # Display results
    results = [(pages[i], score) for i, score in enumerate(pagerank_scores)]
    results.sort(key=lambda x: x[1], reverse=True)
    
    print("PageRank Results (1996 style):")
    for page, score in results:
        print(f"{page}: {score:.4f}")

if __name__ == "__main__":
    simulate_early_web()
```

# sourceLink
http://ilpubs.stanford.edu:8090/422/1/1999-66.pdf

# expertExplanation
PageRank models web surfing as a random walk where a surfer clicks links randomly with probability d (damping factor, typically 0.85) or jumps to any page randomly with probability (1-d). The algorithm iteratively calculates each page's probability of being visited. Pages with more high-quality inbound links receive higher PageRank scores. The mathematical foundation is an eigenvector computation on the web's link graph, making it resistant to simple spam techniques that plagued earlier search engines.
