# title
Bitcoin's Genesis Block

# id
bitcoin-genesis-block

# what
The first block in the Bitcoin blockchain, containing Satoshi's message about bank bailouts.

# impact
Launched the cryptocurrency revolution and blockchain technology.

# when
2009

# category
Software & Computing

# language
C++

# codeSnippet
```cpp
const char* pszTimestamp = "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks";
CTransaction txNew;
txNew.vin.resize(1);
txNew.vout.resize(1);
txNew.vout[0].nValue = 50 * COIN;
genesis.vtx.push_back(txNew);
```

# sourceLink
https://github.com/bitcoin/bitcoin

# expertExplanation
The Genesis Block was hardcoded into Bitcoin's source code as block 0. It contains a reference to a headline from The Times newspaper, proving it was created no earlier than January 3, 2009, and suggesting Satoshi's motivation was the 2008 financial crisis. The coinbase transaction of 50 bitcoins in this block is unspendable due to a quirk in the code.
