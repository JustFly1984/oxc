/// A token in a JSON/JSONC/JSON5 document, preserving comments and whitespace structure.
#[derive(Debug, Clone, PartialEq)]
pub enum Token<'a> {
    /// `{`
    ObjectStart,
    /// `}`
    ObjectEnd,
    /// `[`
    ArrayStart,
    /// `]`
    ArrayEnd,
    /// `:`
    Colon,
    /// `,`
    Comma,
    /// A string value (including quotes).
    String(&'a str),
    /// A number literal.
    Number(&'a str),
    /// `true`, `false`, or `null`.
    Keyword(&'a str),
    /// A single-line comment: `// ...`
    LineComment(&'a str),
    /// A block comment: `/* ... */`
    BlockComment(&'a str),
    /// Unquoted key (JSON5).
    Identifier(&'a str),
}

/// Tokenize a JSON/JSONC/JSON5 source string, preserving comments.
///
/// Returns `Ok(tokens)` or `Err(error_message)`.
pub fn tokenize(source: &str) -> Result<Vec<Token<'_>>, String> {
    let mut tokens = Vec::new();
    let bytes = source.as_bytes();
    let len = bytes.len();
    let mut i = 0;

    while i < len {
        // Skip whitespace
        if bytes[i].is_ascii_whitespace() {
            i += 1;
            continue;
        }

        match bytes[i] {
            b'{' => {
                tokens.push(Token::ObjectStart);
                i += 1;
            }
            b'}' => {
                tokens.push(Token::ObjectEnd);
                i += 1;
            }
            b'[' => {
                tokens.push(Token::ArrayStart);
                i += 1;
            }
            b']' => {
                tokens.push(Token::ArrayEnd);
                i += 1;
            }
            b':' => {
                tokens.push(Token::Colon);
                i += 1;
            }
            b',' => {
                tokens.push(Token::Comma);
                i += 1;
            }
            b'/' => {
                if i + 1 < len && bytes[i + 1] == b'/' {
                    // Line comment
                    let start = i;
                    i += 2;
                    while i < len && bytes[i] != b'\n' {
                        i += 1;
                    }
                    tokens.push(Token::LineComment(&source[start..i]));
                } else if i + 1 < len && bytes[i + 1] == b'*' {
                    // Block comment
                    let start = i;
                    i += 2;
                    while i + 1 < len && !(bytes[i] == b'*' && bytes[i + 1] == b'/') {
                        i += 1;
                    }
                    if i + 1 < len {
                        i += 2; // skip */
                    }
                    tokens.push(Token::BlockComment(&source[start..i]));
                } else {
                    return Err(format!("Unexpected character '/' at position {i}"));
                }
            }
            b'"' => {
                let start = i;
                i += 1;
                while i < len {
                    if bytes[i] == b'\\' {
                        i += 2; // skip escaped char
                    } else if bytes[i] == b'"' {
                        i += 1;
                        break;
                    } else {
                        i += 1;
                    }
                }
                tokens.push(Token::String(&source[start..i]));
            }
            b'\'' => {
                // JSON5 single-quoted strings
                let start = i;
                i += 1;
                while i < len {
                    if bytes[i] == b'\\' {
                        i += 2;
                    } else if bytes[i] == b'\'' {
                        i += 1;
                        break;
                    } else {
                        i += 1;
                    }
                }
                tokens.push(Token::String(&source[start..i]));
            }
            b'-' | b'+' | b'0'..=b'9' | b'.' => {
                let start = i;
                // Handle hex: 0x...
                if bytes[i] == b'0' && i + 1 < len && (bytes[i + 1] == b'x' || bytes[i + 1] == b'X')
                {
                    i += 2;
                    while i < len && bytes[i].is_ascii_hexdigit() {
                        i += 1;
                    }
                } else {
                    if bytes[i] == b'-' || bytes[i] == b'+' {
                        i += 1;
                    }
                    while i < len && (bytes[i].is_ascii_digit() || bytes[i] == b'.') {
                        i += 1;
                    }
                    // Exponent
                    if i < len && (bytes[i] == b'e' || bytes[i] == b'E') {
                        i += 1;
                        if i < len && (bytes[i] == b'+' || bytes[i] == b'-') {
                            i += 1;
                        }
                        while i < len && bytes[i].is_ascii_digit() {
                            i += 1;
                        }
                    }
                }
                // Infinity, NaN handled as identifiers below
                tokens.push(Token::Number(&source[start..i]));
            }
            _ if bytes[i].is_ascii_alphabetic() || bytes[i] == b'_' || bytes[i] == b'$' => {
                let start = i;
                while i < len
                    && (bytes[i].is_ascii_alphanumeric() || bytes[i] == b'_' || bytes[i] == b'$')
                {
                    i += 1;
                }
                let word = &source[start..i];
                match word {
                    "true" | "false" | "null" | "Infinity" | "NaN" | "undefined" => {
                        tokens.push(Token::Keyword(word));
                    }
                    _ => {
                        tokens.push(Token::Identifier(word));
                    }
                }
            }
            c => {
                return Err(format!("Unexpected character '{}' at position {i}", c as char));
            }
        }
    }

    Ok(tokens)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_simple_object() {
        let tokens = tokenize(r#"{"a": 1}"#).unwrap();
        assert_eq!(
            tokens,
            vec![
                Token::ObjectStart,
                Token::String(r#""a""#),
                Token::Colon,
                Token::Number("1"),
                Token::ObjectEnd,
            ]
        );
    }

    #[test]
    fn test_comments() {
        let tokens = tokenize(
            r#"{
            // line comment
            "a": 1, /* block */
        }"#,
        )
        .unwrap();
        assert!(tokens.contains(&Token::LineComment("// line comment")));
        assert!(tokens.contains(&Token::BlockComment("/* block */")));
    }

    #[test]
    fn test_json5_unquoted_keys() {
        let tokens = tokenize(r#"{key: "value"}"#).unwrap();
        assert!(tokens.contains(&Token::Identifier("key")));
    }
}
