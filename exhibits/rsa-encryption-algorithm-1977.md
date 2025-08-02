# id
rsa-encryption-algorithm-1977

# title
Example usage

# what
The RSA public-key cryptography algorithm, developed by Ron Rivest, Adi Shamir, and Leonard Adleman at MIT. This breakthrough enabled secure communication between parties who had never met, laying the foundation for modern internet security.

# impact
- Enabled secure e-commerce and online banking
- Made possible the secure transmission of credit card numbers over the internet
- Established the foundation for digital signatures and certificates
- Created the PKI (Public Key Infrastructure) used throughout the internet
- Influenced the development of other public-key cryptosystems like ECC
- Remains a cornerstone of internet security protocols like TLS/SSL

# when
1977

# category
Security

# language
Mathematics/Pseudocode

# codeSnippet
```python
import random
import math

def is_prime(n, k=5):
    """Miller-Rabin primality test"""
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False
    
    # Write n-1 as d * 2^r
    d = n - 1
    r = 0
    while d % 2 == 0:
        d //= 2
        r += 1
    
    # Miller-Rabin test
    for _ in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, d, n)
        if x == 1 or x == n - 1:
            continue
        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True

def generate_prime(bits):
    """Generate a random prime number of specified bit length"""
    while True:
        candidate = random.getrandbits(bits)
        candidate |= (1 << bits - 1) | 1  # Ensure it's odd and has correct bit length
        if is_prime(candidate):
            return candidate

def extended_gcd(a, b):
    """Extended Euclidean Algorithm"""
    if a == 0:
        return b, 0, 1
    gcd, x1, y1 = extended_gcd(b % a, a)
    x = y1 - (b // a) * x1
    y = x1
    return gcd, x, y

def mod_inverse(e, phi):
    """Find modular multiplicative inverse"""
    gcd, x, y = extended_gcd(e, phi)
    if gcd != 1:
        raise ValueError("Modular inverse does not exist")
    return (x % phi + phi) % phi

class RSA:
    def __init__(self, key_size=1024):
        """Generate RSA key pair"""
        # Step 1: Generate two large prime numbers
        print("Generating prime p...")
        self.p = generate_prime(key_size // 2)
        print("Generating prime q...")
        self.q = generate_prime(key_size // 2)
        
        # Step 2: Compute n = p * q
        self.n = self.p * self.q
        
        # Step 3: Compute Euler's totient function φ(n) = (p-1)(q-1)
        self.phi = (self.p - 1) * (self.q - 1)
        
        # Step 4: Choose e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1
        self.e = 65537  # Common choice: 2^16 + 1, prime and efficient
        while math.gcd(self.e, self.phi) != 1:
            self.e += 2
        
        # Step 5: Calculate d, the modular multiplicative inverse of e
        self.d = mod_inverse(self.e, self.phi)
        
        # Public key: (n, e)
        # Private key: (n, d)
        print(f"RSA Key Generated:")
        print(f"Key size: {key_size} bits")
        print(f"Public key (n, e): ({hex(self.n)[:20]}..., {self.e})")
        print(f"Private key (n, d): ({hex(self.n)[:20]}..., {hex(self.d)[:20]}...)")
    
    def encrypt(self, message):
        """Encrypt message using public key (n, e)"""
        if isinstance(message, str):
            # Convert string to integer
            message_int = int.from_bytes(message.encode(), 'big')
        else:
            message_int = message
            
        if message_int >= self.n:
            raise ValueError("Message too large for key size")
        
        # Encryption: c = m^e mod n
        ciphertext = pow(message_int, self.e, self.n)
        return ciphertext
    
    def decrypt(self, ciphertext):
        """Decrypt ciphertext using private key (n, d)"""
        # Decryption: m = c^d mod n
        message_int = pow(ciphertext, self.d, self.n)
        
        # Convert back to string
        try:
            byte_length = (message_int.bit_length() + 7) // 8
            message = message_int.to_bytes(byte_length, 'big').decode()
            return message
        except:
            return message_int
    
    def sign(self, message):
        """Create digital signature using private key"""
        if isinstance(message, str):
            message_int = int.from_bytes(message.encode(), 'big')
        else:
            message_int = message
            
        # Signing: s = m^d mod n
        signature = pow(message_int, self.d, self.n)
        return signature
    
    def verify(self, message, signature):
        """Verify digital signature using public key"""
        if isinstance(message, str):
            message_int = int.from_bytes(message.encode(), 'big')
        else:
            message_int = message
            
        # Verification: m = s^e mod n
        verified_message = pow(signature, self.e, self.n)
        return verified_message == message_int

if __name__ == "__main__":
    # Generate RSA key pair
    rsa = RSA(key_size=512)  # Small key for demo
    
    # Encrypt and decrypt a message
    original_message = "Hello, World!"
    print(f"\nOriginal message: {original_message}")
    
    encrypted = rsa.encrypt(original_message)
    print(f"Encrypted: {hex(encrypted)}")
    
    decrypted = rsa.decrypt(encrypted)
    print(f"Decrypted: {decrypted}")
    
    # Digital signature example
    signature = rsa.sign(original_message)
    is_valid = rsa.verify(original_message, signature)
    print(f"\nSignature valid: {is_valid}")
```

# sourceLink
Based on "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems" by Rivest, Shamir, and Adleman (1978)

# expertExplanation
RSA's security relies on the mathematical fact that it's easy to multiply two large prime numbers together, but extremely difficult to factor the result back into its prime components. The algorithm uses modular exponentiation: encryption raises the message to the power e modulo n, while decryption raises the result to the power d modulo n. The magic is that e and d are mathematically related through Euler's totient function, but finding d from e requires factoring n - something that would take thousands of years with current computers for sufficiently large keys.