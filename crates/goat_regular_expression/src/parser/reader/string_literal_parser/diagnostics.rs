use goat_diagnostics::GoatDiagnostic;
use goat_span::Span;

#[cold]
pub fn invalid_input(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::error(
        "String literal should be wrapped with ' or \", or escaped properly".to_string(),
    )
    .with_label(span)
}

#[cold]
pub fn legacy_in_strict_mode(kind: &str, span: Span) -> GoatDiagnostic {
    GoatDiagnostic::error(format!("Not allowed {kind} in strict mode")).with_label(span)
}

#[cold]
pub fn too_large_unicode_escape_sequence(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::error("Too large unicode escape sequence".to_string()).with_label(span)
}
