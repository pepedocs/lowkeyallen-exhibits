# id
jpeg-image-compression-1992

# title
JPEG Image Compression

# what
The JPEG (Joint Photographic Experts Group) image compression algorithm that revolutionized digital photography and web images. JPEG uses lossy compression based on human visual perception to reduce image file sizes by 90% or more while maintaining acceptable quality.

# impact
- Made digital photography mainstream by solving the storage problem
- Enabled the sharing of images over early internet connections
- Became the dominant image format for photography and web images
- Influenced the development of other lossy compression algorithms
- Made possible the rise of social media platforms based on photo sharing
- Remains the most widely used image format 30+ years after its creation

# when
1992

# category
Computing History

# language
C

# codeSnippet
```c
// Simplified JPEG compression algorithm implementation
#include <math.h>
#include <stdio.h>
#include <stdlib.h>

#define BLOCK_SIZE 8
#define PI 3.14159265359

// JPEG quantization tables - key to compression efficiency
// Luminance (brightness) quantization table
static const int luminance_quantization[64] = {
    16, 11, 10, 16,  24,  40,  51,  61,
    12, 12, 14, 19,  26,  58,  60,  55,
    14, 13, 16, 24,  40,  57,  69,  56,
    14, 17, 22, 29,  51,  87,  80,  62,
    18, 22, 37, 56,  68, 109, 103,  77,
    24, 35, 55, 64,  81, 104, 113,  92,
    49, 64, 78, 87, 103, 121, 120, 101,
    72, 92, 95, 98, 112, 100, 103,  99
};

// Chrominance (color) quantization table - more aggressive compression
static const int chrominance_quantization[64] = {
    17, 18, 24, 47, 99, 99, 99, 99,
    18, 21, 26, 66, 99, 99, 99, 99,
    24, 26, 56, 99, 99, 99, 99, 99,
    47, 66, 99, 99, 99, 99, 99, 99,
    99, 99, 99, 99, 99, 99, 99, 99,
    99, 99, 99, 99, 99, 99, 99, 99,
    99, 99, 99, 99, 99, 99, 99, 99,
    99, 99, 99, 99, 99, 99, 99, 99
};

// Zigzag scanning pattern for frequency ordering
static const int zigzag_order[64] = {
     0,  1,  5,  6, 14, 15, 27, 28,
     2,  4,  7, 13, 16, 26, 29, 42,
     3,  8, 12, 17, 25, 30, 41, 43,
     9, 11, 18, 24, 31, 40, 44, 53,
    10, 19, 23, 32, 39, 45, 52, 54,
    20, 22, 33, 38, 46, 51, 55, 60,
    21, 34, 37, 47, 50, 56, 59, 61,
    35, 36, 48, 49, 57, 58, 62, 63
};

// Discrete Cosine Transform - the heart of JPEG compression
void dct_transform(double input[BLOCK_SIZE][BLOCK_SIZE], double output[BLOCK_SIZE][BLOCK_SIZE]) {
    
    for (int u = 0; u < BLOCK_SIZE; u++) {
        for (int v = 0; v < BLOCK_SIZE; v++) {
            
            double sum = 0.0;
            
            for (int x = 0; x < BLOCK_SIZE; x++) {
                for (int y = 0; y < BLOCK_SIZE; y++) {
                    
                    double cos_u = cos((2.0 * x + 1.0) * u * PI / (2.0 * BLOCK_SIZE));
                    double cos_v = cos((2.0 * y + 1.0) * v * PI / (2.0 * BLOCK_SIZE));
                    
                    sum += input[x][y] * cos_u * cos_v;
                }
            }
            
            // Apply DCT coefficients
            double cu = (u == 0) ? 1.0 / sqrt(2.0) : 1.0;
            double cv = (v == 0) ? 1.0 / sqrt(2.0) : 1.0;
            
            output[u][v] = 0.25 * cu * cv * sum;
        }
    }
}

// Quantization - where the lossy compression happens
void quantize_block(double dct_block[BLOCK_SIZE][BLOCK_SIZE], 
                   int quantized[BLOCK_SIZE][BLOCK_SIZE],
                   const int *quantization_table, 
                   int quality_factor) {
    
    // Scale quantization table based on quality setting
    int scaled_quantization[64];
    for (int i = 0; i < 64; i++) {
        int scale;
        if (quality_factor < 50) {
            scale = 5000 / quality_factor;
        } else {
            scale = 200 - 2 * quality_factor;
        }
        
        scaled_quantization[i] = (quantization_table[i] * scale + 50) / 100;
        if (scaled_quantization[i] < 1) scaled_quantization[i] = 1;
        if (scaled_quantization[i] > 255) scaled_quantization[i] = 255;
    }
    
    // Quantize DCT coefficients
    for (int i = 0; i < BLOCK_SIZE; i++) {
        for (int j = 0; j < BLOCK_SIZE; j++) {
            int index = i * BLOCK_SIZE + j;
            quantized[i][j] = (int)round(dct_block[i][j] / scaled_quantization[index]);
        }
    }
}

// Huffman encoding tables for entropy coding
struct huffman_code {
    int code;
    int length;
};

// DC coefficient differences encoding
static struct huffman_code dc_luminance_codes[12] = {
    {0x00, 2}, {0x01, 3}, {0x02, 3}, {0x03, 3},
    {0x04, 3}, {0x05, 3}, {0x06, 4}, {0x07, 5},
    {0x08, 6}, {0x09, 7}, {0x0A, 8}, {0x0B, 9}
};

// AC coefficient run-length encoding
static struct huffman_code ac_luminance_codes[256] = {
    // EOB (End of Block)
    {0x0A, 4},
    // Zero run length codes...
    {0x00, 2}, {0x01, 2}, {0x04, 3}, {0x0B, 4},
    // ... (full table would be much longer)
};

// Encode a single 8x8 block
int encode_block(unsigned char input_block[BLOCK_SIZE][BLOCK_SIZE],
                unsigned char *output_stream,
                int *output_pos,
                const int *quantization_table,
                int quality_factor,
                int *previous_dc) {
    
    // Step 1: Level shift (subtract 128 to center around 0)
    double shifted_block[BLOCK_SIZE][BLOCK_SIZE];
    for (int i = 0; i < BLOCK_SIZE; i++) {
        for (int j = 0; j < BLOCK_SIZE; j++) {
            shifted_block[i][j] = input_block[i][j] - 128.0;
        }
    }
    
    // Step 2: DCT transform
    double dct_block[BLOCK_SIZE][BLOCK_SIZE];
    dct_transform(shifted_block, dct_block);
    
    // Step 3: Quantization
    int quantized[BLOCK_SIZE][BLOCK_SIZE];
    quantize_block(dct_block, quantized, quantization_table, quality_factor);
    
    // Step 4: Zigzag reordering
    int zigzag_coefficients[64];
    for (int i = 0; i < 64; i++) {
        int row = zigzag_order[i] / BLOCK_SIZE;
        int col = zigzag_order[i] % BLOCK_SIZE;
        zigzag_coefficients[i] = quantized[row][col];
    }
    
    // Step 5: DC coefficient differential encoding
    int dc_diff = zigzag_coefficients[0] - *previous_dc;
    *previous_dc = zigzag_coefficients[0];
    
    // Encode DC coefficient
    int dc_category = get_coefficient_category(dc_diff);
    struct huffman_code dc_code = dc_luminance_codes[dc_category];
    write_bits(output_stream, output_pos, dc_code.code, dc_code.length);
    
    if (dc_category > 0) {
        write_bits(output_stream, output_pos, get_coefficient_bits(dc_diff), dc_category);
    }
    
    // Step 6: AC coefficient run-length encoding
    int run_length = 0;
    for (int i = 1; i < 64; i++) {
        int coefficient = zigzag_coefficients[i];
        
        if (coefficient == 0) {
            run_length++;
        } else {
            // Encode zero run and coefficient
            while (run_length >= 16) {
                // ZRL (Zero Run Length) - 16 zeros
                write_bits(output_stream, output_pos, 0xF0, 8);
                run_length -= 16;
            }
            
            int ac_category = get_coefficient_category(coefficient);
            int symbol = (run_length << 4) | ac_category;
            
            struct huffman_code ac_code = ac_luminance_codes[symbol];
            write_bits(output_stream, output_pos, ac_code.code, ac_code.length);
            write_bits(output_stream, output_pos, get_coefficient_bits(coefficient), ac_category);
            
            run_length = 0;
        }
    }
    
    // End of Block marker if needed
    if (run_length > 0) {
        write_bits(output_stream, output_pos, 0x0A, 4);  // EOB
    }
    
    return 0;
}

// Main JPEG compression function
int compress_jpeg(unsigned char *image_data, 
                 int width, 
                 int height, 
                 int quality,
                 unsigned char *compressed_data,
                 int *compressed_size) {
    
    printf("Compressing %dx%d image at quality %d\n", width, height, quality);
    
    // Convert RGB to YCbCr color space
    unsigned char *y_channel = malloc(width * height);
    unsigned char *cb_channel = malloc(width * height);
    unsigned char *cr_channel = malloc(width * height);
    
    rgb_to_ycbcr(image_data, width, height, y_channel, cb_channel, cr_channel);
    
    // Compress each 8x8 block
    int output_pos = 0;
    int previous_dc_y = 0, previous_dc_cb = 0, previous_dc_cr = 0;
    
    for (int block_y = 0; block_y < height; block_y += BLOCK_SIZE) {
        for (int block_x = 0; block_x < width; block_x += BLOCK_SIZE) {
            
            // Extract 8x8 blocks
            unsigned char y_block[BLOCK_SIZE][BLOCK_SIZE];
            unsigned char cb_block[BLOCK_SIZE][BLOCK_SIZE];
            unsigned char cr_block[BLOCK_SIZE][BLOCK_SIZE];
            
            extract_block(y_channel, width, height, block_x, block_y, y_block);
            extract_block(cb_channel, width, height, block_x, block_y, cb_block);
            extract_block(cr_channel, width, height, block_x, block_y, cr_block);
            
            // Encode blocks
            encode_block(y_block, compressed_data, &output_pos, 
                        luminance_quantization, quality, &previous_dc_y);
            encode_block(cb_block, compressed_data, &output_pos, 
                        chrominance_quantization, quality, &previous_dc_cb);
            encode_block(cr_block, compressed_data, &output_pos, 
                        chrominance_quantization, quality, &previous_dc_cr);
        }
    }
    
    *compressed_size = output_pos;
    
    printf("Compression complete: %d bytes -> %d bytes (%.1f%% reduction)\n",
           width * height * 3, *compressed_size, 
           100.0 * (1.0 - (double)*compressed_size / (width * height * 3)));
    
    free(y_channel);
    free(cb_channel);
    free(cr_channel);
    
    return 0;
}
```

# sourceLink
Based on ISO/IEC 10918-1 JPEG standard and original research papers

# expertExplanation
JPEG's brilliance lies in exploiting human visual perception. The DCT transform converts image blocks into frequency components, and the quantization step discards high-frequency details that humans can't easily see. The algorithm compresses color information more aggressively than brightness information because human eyes are more sensitive to brightness changes. The psychovisual model built into JPEG's quantization tables represents decades of research into how humans perceive images, making it possible to throw away large amounts of data while maintaining perceived quality.