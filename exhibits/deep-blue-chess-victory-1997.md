# id
deep-blue-chess-victory-1997

# title
Deep Blue Chess Victory (1997)

# what
The chess-playing algorithm that defeated world champion Garry Kasparov in 1997, marking the first time a computer defeated a reigning world chess champion in a match. Deep Blue's victory represented a milestone in artificial intelligence and parallel computing.

# impact
- Marked a turning point in public perception of artificial intelligence
- Demonstrated the power of specialized parallel computing architectures
- Inspired advances in game-playing AI that led to modern systems like AlphaGo
- Showed that AI could excel in domains requiring strategic thinking
- Led to IBM's focus on AI research, eventually creating Watson
- Influenced the development of specialized AI hardware and algorithms

# when
May 11, 1997

# category
Numeric

# language
C/Assembly with custom hardware

# codeSnippet
```c
// Simplified representation of Deep Blue's evaluation function
// Actual code was highly optimized and proprietary

#define INFINITY 999999
#define MAX_DEPTH 12

typedef struct {
    int piece_values[64];    // Board position values
    int king_safety;         // King protection evaluation  
    int pawn_structure;      // Pawn formation analysis
    int piece_activity;      // Piece mobility and control
    int endgame_tables;      // Precomputed endgame positions
    int opening_book;        // Opening move database
} Position;

// Alpha-beta minimax search with deep chess knowledge
int evaluate_position(Position *pos, int depth, int alpha, int beta, int maximizing_player) {
    
    if (depth == 0 || game_over(pos)) {
        return chess_evaluation(pos);
    }
    
    Move moves[256];
    int num_moves = generate_moves(pos, moves);
    
    // Move ordering - search best moves first
    sort_moves(moves, num_moves, pos);
    
    if (maximizing_player) {
        int max_eval = -INFINITY;
        for (int i = 0; i < num_moves; i++) {
            make_move(pos, &moves[i]);
            int eval = evaluate_position(pos, depth - 1, alpha, beta, 0);
            unmake_move(pos, &moves[i]);
            
            max_eval = max(max_eval, eval);
            alpha = max(alpha, eval);
            
            if (beta <= alpha) {
                break;  // Alpha-beta pruning
            }
        }
        return max_eval;
    } else {
        int min_eval = INFINITY;
        for (int i = 0; i < num_moves; i++) {
            make_move(pos, &moves[i]);
            int eval = evaluate_position(pos, depth - 1, alpha, beta, 1);
            unmake_move(pos, &moves[i]);
            
            min_eval = min(min_eval, eval);
            beta = min(beta, eval);
            
            if (beta <= alpha) {
                break;  // Alpha-beta pruning
            }
        }
        return min_eval;
    }
}

// Chess evaluation function with thousands of parameters
int chess_evaluation(Position *pos) {
    int score = 0;
    
    // Material counting
    score += count_material(pos);
    
    // Positional factors
    score += evaluate_king_safety(pos);
    score += evaluate_pawn_structure(pos); 
    score += evaluate_piece_activity(pos);
    score += evaluate_center_control(pos);
    
    // Endgame tablebase lookup for perfect play
    if (piece_count(pos) <= 6) {
        score = endgame_tablebase_lookup(pos);
    }
    
    return score;
}
```

# sourceLink
Based on published research papers and IBM's technical descriptions

# expertExplanation
Deep Blue combined massive parallel processing (200 million positions per second) with deep chess knowledge encoded by grandmasters. Unlike pure brute-force search, it used sophisticated evaluation functions, opening books, and endgame databases. The system's 32 chess-specific processors worked in parallel, with custom chips designed specifically for chess move generation and evaluation. Kasparov's defeat shocked the world because chess was considered the ultimate test of strategic thinking - if a computer could master chess, what else could it master?