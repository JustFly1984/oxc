use goat_diagnostics::GoatDiagnostic;
use goat_span::Span;

#[cold]
pub fn invalid_input(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::error(
        "Template literal should be wrapped with ` or escaped properly".to_string(),
    )
    .with_label(span)
}

#[cold]
pub fn template_substitution(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::error("Template literal should not contain unescaped `${}`".to_string())
        .with_label(span)
}

#[cold]
pub fn too_large_unicode_escape_sequence(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::error("Too large unicode escape sequence".to_string()).with_label(span)
}

#[cold]
pub fn invalid_hex_escape(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::error("Invalid hex escape sequence".to_string()).with_label(span)
}

#[cold]
pub fn invalid_unicode_escape(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::error("Invalid unicode escape sequence".to_string()).with_label(span)
}
