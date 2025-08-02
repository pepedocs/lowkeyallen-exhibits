# id
deep-blue-chess-1997

# title
Deep Blue vs Kasparov - AI's Historic Victory

# what
IBM's Deep Blue chess computer became the first machine to defeat a reigning world chess champion in a match when it beat Garry Kasparov 3.5-2.5 in 1997. The system could evaluate 200 million chess positions per second using specialized chess chips and advanced search algorithms.

# impact
Marked a pivotal moment in AI history, proving that machines could outperform humans in complex strategic thinking. Sparked global interest in artificial intelligence and demonstrated the potential of specialized computing hardware for solving complex problems.

# when
1997

# category
Mission-Critical

# language
C

# codeSnippet
```c
/* Simplified Deep Blue chess evaluation function */
#include <stdio.h>
#include <limits.h>

#define MAX_DEPTH 12
#define CHECKMATE_VALUE 10000

typedef struct {
    int board[8][8];
    int to_move;  /* 0 = white, 1 = black */
} Position;

/* Minimax with alpha-beta pruning */
int minimax(Position *pos, int depth, int alpha, int beta, int maximizing) {
    if (depth == 0 || is_terminal(pos)) {
        return evaluate_position(pos);
    }
    
    Move moves[256];
    int num_moves = generate_moves(pos, moves);
    
    if (maximizing) {
        int max_eval = -INT_MAX;
        for (int i = 0; i < num_moves; i++) {
            Position new_pos = make_move(pos, &moves[i]);
            int eval = minimax(&new_pos, depth - 1, alpha, beta, 0);
            max_eval = (eval > max_eval) ? eval : max_eval;
            alpha = (alpha > eval) ? alpha : eval;
            if (beta <= alpha) break;  /* Alpha-beta cutoff */
        }
        return max_eval;
    } else {
        int min_eval = INT_MAX;
        for (int i = 0; i < num_moves; i++) {
            Position new_pos = make_move(pos, &moves[i]);
            int eval = minimax(&new_pos, depth - 1, alpha, beta, 1);
            min_eval = (eval < min_eval) ? eval : min_eval;
            beta = (beta < eval) ? beta : eval;
            if (beta <= alpha) break;
        }
        return min_eval;
    }
}

/* Deep Blue's sophisticated position evaluation */
int evaluate_position(Position *pos) {
    int score = 0;
    
    /* Material counting with piece values */
    score += count_material(pos);
    
    /* Positional factors */
    score += evaluate_pawn_structure(pos);
    score += evaluate_king_safety(pos);
    score += evaluate_piece_activity(pos);
    
    /* Endgame vs middlegame adjustments */
    if (is_endgame(pos)) {
        score += evaluate_endgame_factors(pos);
    }
    
    return score;
}
```

# sourceLink
https://www.ibm.com/ibm/history/ibm100/us/en/icons/deepblue/

# expertExplanation
Deep Blue used a combination of brute-force search (200 million positions/second) and sophisticated chess knowledge. The minimax algorithm with alpha-beta pruning explored the game tree efficiently, while specialized evaluation functions assessed positions based on material, pawn structure, king safety, and tactical patterns. The system used 32 specialized chess chips in parallel, each capable of analyzing 2-2.5 million positions per second.
