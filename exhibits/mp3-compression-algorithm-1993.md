# id
mp3-compression-algorithm-1993

# title
MP3 Compression Algorithm

# what
The MP3 audio compression algorithm, developed by the Fraunhofer Institute in Germany. This revolutionary codec could compress CD-quality audio by a factor of 10-12 while maintaining acceptable quality, making digital music distribution practical over early internet connections.

# impact
- Enabled the digital music revolution and peer-to-peer file sharing
- Destroyed the traditional music industry distribution model
- Led to the creation of portable MP3 players and eventually the iPod
- Established the foundation for streaming music services
- Created the concept of "good enough" digital media quality
- Influenced the development of numerous audio and video compression standards

# when
1993

# category
Software & Computing

# language
C

# codeSnippet
```c
// Simplified MP3 encoding algorithm core concepts
#include <math.h>
#include <stdlib.h>

#define FRAME_SIZE 1152
#define SUBBANDS 32
#define PI 3.14159265359

// Psychoacoustic model - the key to MP3's efficiency
typedef struct {
    float masking_threshold[SUBBANDS];
    float signal_to_mask_ratio[SUBBANDS];
    int bit_allocation[SUBBANDS];
} PsychoAcousticModel;

// Modified Discrete Cosine Transform (MDCT) for frequency analysis
void mdct_transform(float *input_samples, float *frequency_coeffs, int N) {
    for (int k = 0; k < N/2; k++) {
        frequency_coeffs[k] = 0.0;
        for (int n = 0; n < N; n++) {
            float angle = (PI / N) * (n + 0.5 + N/4.0) * (k + 0.5);
            frequency_coeffs[k] += input_samples[n] * cos(angle);
        }
    }
}

// Psychoacoustic masking - remove inaudible frequencies
PsychoAcousticModel analyze_psychoacoustics(float *audio_frame) {
    PsychoAcousticModel model = {0};
    
    // Calculate masking thresholds based on human hearing
    for (int band = 0; band < SUBBANDS; band++) {
        
        // Simultaneous masking - loud sounds mask nearby quiet sounds
        float masking_level = calculate_simultaneous_masking(audio_frame, band);
        
        // Temporal masking - sounds mask other sounds before/after them
        float temporal_masking = calculate_temporal_masking(audio_frame, band);
        
        model.masking_threshold[band] = fmax(masking_level, temporal_masking);
        
        // Calculate signal-to-mask ratio
        float signal_power = calculate_signal_power(audio_frame, band);
        model.signal_to_mask_ratio[band] = signal_power / model.masking_threshold[band];
        
        // Allocate bits based on perceptual importance
        if (model.signal_to_mask_ratio[band] > 1.0) {
            // Audible content - allocate more bits
            model.bit_allocation[band] = (int)(6 + log2(model.signal_to_mask_ratio[band]));
        } else {
            // Masked content - allocate minimal bits or skip
            model.bit_allocation[band] = 0;
        }
    }
    
    return model;
}

// Huffman encoding for final compression
typedef struct {
    unsigned int code;
    int length;
} HuffmanCode;

void huffman_encode(float *quantized_coeffs, PsychoAcousticModel *model, 
                   unsigned char *output_bitstream) {
    
    // Create Huffman tables based on coefficient statistics
    HuffmanCode huffman_table[1024];
    build_huffman_table(quantized_coeffs, huffman_table);
    
    int bit_position = 0;
    
    for (int band = 0; band < SUBBANDS; band++) {
        if (model->bit_allocation[band] > 0) {
            
            // Quantize coefficients based on bit allocation
            int quantized_value = quantize_coefficient(quantized_coeffs[band], 
                                                      model->bit_allocation[band]);
            
            // Encode using Huffman coding
            HuffmanCode code = huffman_table[quantized_value];
            write_bits_to_stream(output_bitstream, &bit_position, 
                               code.code, code.length);
        }
    }
}

// Main MP3 encoding function
int encode_mp3_frame(float *pcm_audio, unsigned char *mp3_output) {
    
    // 1. Apply psychoacoustic analysis
    PsychoAcousticModel psycho_model = analyze_psychoacoustics(pcm_audio);
    
    // 2. Transform to frequency domain using MDCT
    float frequency_coeffs[FRAME_SIZE/2];
    mdct_transform(pcm_audio, frequency_coeffs, FRAME_SIZE);
    
    // 3. Quantize based on psychoacoustic model
    float quantized_coeffs[FRAME_SIZE/2];
    for (int i = 0; i < FRAME_SIZE/2; i++) {
        int band = i / (FRAME_SIZE/2/SUBBANDS);
        quantized_coeffs[i] = quantize_coefficient(frequency_coeffs[i], 
                                                  psycho_model.bit_allocation[band]);
    }
    
    // 4. Huffman encode for final compression
    huffman_encode(quantized_coeffs, &psycho_model, mp3_output);
    
    return calculate_frame_size(mp3_output);
}
```

# sourceLink
Based on ISO/IEC 11172-3 standard and Fraunhofer research papers

# expertExplanation
The genius of MP3 lies in its psychoacoustic model, which identifies which parts of an audio signal humans can't hear and discards them. The algorithm uses the masking effect - where loud sounds make nearby quiet sounds inaudible - to remove "perceptually irrelevant" information. Combined with sophisticated mathematical transforms (MDCT) and entropy coding (Huffman), MP3 achieves remarkable compression ratios while maintaining acceptable quality. This "perceptual coding" approach influenced everything from JPEG image compression to modern video codecs.