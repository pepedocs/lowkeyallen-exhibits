# id
first-web-browser-worldwideweb-1990

# title
First Web Browser - WorldWideWeb (1990)

# what
The first web browser, created by Tim Berners-Lee at CERN. Originally called "WorldWideWeb" (later renamed Nexus), it was both a browser and editor, allowing users to create and edit web pages directly within the browser.

# impact
- Created the first implementation of the World Wide Web
- Established the fundamental architecture still used today: URLs, HTTP, HTML
- Demonstrated that hypertext could work on a global scale
- Inspired the creation of Mosaic, Netscape, and all subsequent browsers
- Made the web accessible to non-technical users through graphical interface
- Laid the foundation for the modern internet economy and information society

# when
1990

# category
Integration

# language
Objective-C (NeXTSTEP)

# codeSnippet
```objective-c
// Simplified representation of WorldWideWeb browser core functionality
// Original code was written for NeXTSTEP platform

@interface WWWBrowser : NSObject {
    NSString *currentURL;
    NSTextView *htmlView;
    NSTextField *addressField;
    NSMutableDictionary *linkCache;
}

- (void)loadURL:(NSString *)url;
- (void)parseHTML:(NSString *)htmlContent;
- (void)followLink:(NSString *)linkURL;
- (void)editMode:(BOOL)enabled;

@end

@implementation WWWBrowser

- (void)loadURL:(NSString *)url {
    // Parse URL components
    NSURL *parsedURL = [NSURL URLWithString:url];
    NSString *scheme = [parsedURL scheme];
    NSString *host = [parsedURL host];
    NSString *path = [parsedURL path];
    
    if ([scheme isEqualToString:@"http"]) {
        // Make HTTP request
        NSString *request = [NSString stringWithFormat:
            @"GET %@ HTTP/1.0\r\nHost: %@\r\n\r\n", path, host];
        
        // Connect to server (simplified)
        NSString *htmlContent = [self sendHTTPRequest:request toHost:host];
        
        if (htmlContent) {
            [self parseHTML:htmlContent];
            self.currentURL = url;
            [addressField setStringValue:url];
        }
    } else if ([scheme isEqualToString:@"file"]) {
        // Load local file
        NSString *content = [NSString stringWithContentsOfFile:path];
        [self parseHTML:content];
    }
}

- (void)parseHTML:(NSString *)htmlContent {
    // Simple HTML parsing (original was much more basic)
    NSMutableString *displayText = [NSMutableString string];
    NSRange searchRange = NSMakeRange(0, [htmlContent length]);
    
    // Extract title
    NSRange titleStart = [htmlContent rangeOfString:@"<TITLE>" options:0 range:searchRange];
    if (titleStart.location != NSNotFound) {
        NSRange titleEnd = [htmlContent rangeOfString:@"</TITLE>" options:0 
                            range:NSMakeRange(titleStart.location + titleStart.length, 
                                            [htmlContent length] - titleStart.location - titleStart.length)];
        if (titleEnd.location != NSNotFound) {
            NSString *title = [htmlContent substringWithRange:
                NSMakeRange(titleStart.location + titleStart.length,
                           titleEnd.location - titleStart.location - titleStart.length)];
            [[self window] setTitle:title];
        }
    }
    
    // Parse body content and links
    [self extractLinksAndText:htmlContent intoBuffer:displayText];
    
    // Display in text view
    [htmlView setString:displayText];
}

- (void)followLink:(NSString *)linkURL {
    // Handle relative URLs
    if (![linkURL hasPrefix:@"http://"] && ![linkURL hasPrefix:@"file://"]) {
        // Make relative URL absolute
        NSURL *baseURL = [NSURL URLWithString:self.currentURL];
        NSURL *fullURL = [NSURL URLWithString:linkURL relativeToURL:baseURL];
        linkURL = [fullURL absoluteString];
    }
    
    [self loadURL:linkURL];
}

- (void)editMode:(BOOL)enabled {
    if (enabled) {
        // Switch to edit mode - user can modify HTML
        [htmlView setEditable:YES];
        [htmlView setString:[self currentHTMLSource]];
    } else {
        // Switch back to view mode
        [htmlView setEditable:NO];
        NSString *editedHTML = [htmlView string];
        [self parseHTML:editedHTML];
        
        // Save changes if editing local file
        if ([self.currentURL hasPrefix:@"file://"]) {
            [self saveHTMLToFile:editedHTML];
        }
    }
}

@end
```

# sourceLink
Based on historical documentation and Tim Berners-Lee's original specifications

# expertExplanation
Tim Berners-Lee created WorldWideWeb to solve a specific problem at CERN: scientists needed to share and link documents across different computer systems. His stroke of genius was combining hypertext (clickable links), a universal addressing system (URLs), and a simple markup language (HTML) into a cohesive system. The browser could both display and edit web pages, making content creation as important as consumption. This dual functionality reflected Berners-Lee's vision of the web as a universal information space where everyone could contribute.