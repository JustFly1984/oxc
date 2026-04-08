use goat_diagnostics::GoatDiagnostic;
use goat_span::Span;

#[cold]
pub fn import_equals_cannot_be_used_in_esm(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Import assignment cannot be used when targeting ECMAScript modules.")
        .with_help(
            "Consider using 'import * as ns from \"mod\"',
         'import {a} from \"mod\"', 'import d from \"mod\"', or another module format instead.",
        )
        .with_label(span)
        .with_error_code("TS", "1202")
}

#[cold]
pub fn export_assignment_cannot_bed_used_in_esm(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Export assignment cannot be used when targeting ECMAScript modules.")
        .with_help("Consider using 'export default' or another module format instead.")
        .with_label(span)
        .with_error_code("TS", "1203")
}

#[cold]
pub fn ambient_module_nested(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Ambient modules cannot be nested in other modules or namespaces.")
        .with_label(span)
}

#[cold]
pub fn namespace_exporting_non_const(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Namespaces exporting non-const are not supported by Oxc. Change to const or see: https://goatlint.dev/docs/guide/usage/transformer/typescript.html#partial-namespace-support")
        .with_label(span)
}

#[cold]
pub fn namespace_not_supported(span: Span) -> GoatDiagnostic {
    GoatDiagnostic::warn("Namespace not marked type-only declare are disabled. To enable and review caveats see: https://goatlint.dev/docs/guide/usage/transformer/typescript.html#partial-namespace-support")
        .with_label(span)
}
