# title
Equifax Data Breach - Apache Struts

# id
equifax-breach

# what
Unpatched Apache Struts vulnerability exposed 147 million records.

# impact
Personal data of nearly half the US population stolen, $700M+ in fines.

# when
2017

# category
Cyber Security

# language
Java

# codeSnippet
```java
// Vulnerable Struts2 code (CVE-2017-5638)
public String execute() {
    // Content-Type header processing
    String contentType = request.getContentType();
    // VULNERABILITY: OGNL injection in error handling
    if (contentType != null && contentType.contains("multipart/form-data")) {
        // Malicious OGNL expression executed here
        return ERROR;
    }
    return SUCCESS;
}
```

# sourceLink
https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-5638

# expertExplanation
Equifax failed to patch a known vulnerability in Apache Struts2 framework (CVE-2017-5638) for two months after the patch was available. Attackers exploited this to inject malicious code via specially crafted Content-Type headers, gaining access to sensitive databases. This breach exemplifies the critical importance of timely security updates.
