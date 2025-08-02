# lowkeyallen Exhibits

This repository contains all the exhibit content for the lowkeyallen code museum. Each exhibit is stored as a markdown file with a simple key-value format.

## Structure

- **manifest.json**: Lists all available exhibits
- **[exhibit-id].md**: Individual exhibit markdown files

## Exhibit Format

Each exhibit follows this format:

```markdown
# title
Exhibit Title

# id
exhibit-id

# what
Brief description of what happened

# impact
The impact or consequences

# when
Date or time period

# category
Category (e.g., Cyber Security, Mission-Critical, Software & Computing)

# language
Programming language

# codeSnippet
```language
code example here
```

# sourceLink
https://link-to-original-source.com

# expertExplanation
Detailed explanation of the exhibit
```

## Adding New Exhibits

1. Create a new `.md` file following the format above
2. Add the exhibit ID to `manifest.json`
3. Commit and push changes

## Current Exhibits

- Heartbleed Vulnerability in OpenSSL
- Apollo 11's 1201 Alarm Code
- Ariane 5 Flight 501 Integer Overflow
- Therac-25 Radiation Overdose
- Mars Climate Orbiter Unit Conversion
- The Original 'Hello, World!' Program
- Y2K Bug and Date Handling
- Bitcoin's Genesis Block
- Morris Worm - First Internet Worm
- Unix Epoch Time and 2038 Problem
- First Computer Bug - Grace Hopper's Moth
- Equifax Data Breach - Apache Struts

## Categories

- **Cyber Security**: Security vulnerabilities and breaches
- **Mission-Critical**: Software failures in critical systems
- **Software & Computing**: Historical computing milestones and innovations
