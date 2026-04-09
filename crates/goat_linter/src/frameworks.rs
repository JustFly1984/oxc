use std::{hash, path::Path};

use bitflags::bitflags;

use crate::ModuleRecord;

bitflags! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq)]
    pub struct FrameworkFlags: u32 {
        // front-end frameworks

        /// Uses [React](https://reactjs.org/).
        ///
        /// May be part of a meta-framework like Next.js.
        const React = 1 << 0;
        /// Uses [Preact](https://preactjs.com/).
        const Preact = 1 << 1;
        /// Uses [Next.js](https://nextjs.org/).
        const NextOnly = 1 << 2;
        const Next = Self::NextOnly.bits() | Self::React.bits();
        const JsxLike = Self::React.bits() | Self::Preact.bits() | Self::Next.bits();

        const Vue = 1 << 3;
        const NuxtOnly = 1 << 4;
        const Nuxt = Self::NuxtOnly.bits() | Self::Vue.bits();

        const Angular = 1 << 5;

        const Svelte = 1 << 6;
        const SvelteKitOnly = 1 << 7;
        const SvelteKit = Self::SvelteKitOnly.bits() | Self::Svelte.bits();

        const Astro = 1 << 8;

        // Testing frameworks
        const Jest = 1 << 9;
        const Vitest = 1 << 10;
        const OtherTest = 1 << 11;
        /// Flag for if any test frameworks are used, such as Jest or Vitest.
        const Test = Self::Jest.bits() | Self::Vitest.bits() | Self::OtherTest.bits();
    }
}

impl Default for FrameworkFlags {
    #[inline]
    fn default() -> Self {
        Self::empty()
    }
}
impl hash::Hash for FrameworkFlags {
    #[inline]
    fn hash<H: hash::Hasher>(&self, state: &mut H) {
        state.write_u32(self.bits());
    }
}

impl FrameworkFlags {
    #[inline]
    pub const fn is_test(self) -> bool {
        self.intersects(Self::Test)
    }

    #[inline]
    pub const fn is_vitest(self) -> bool {
        self.contains(Self::Vitest)
    }

    #[inline]
    pub const fn is_jest(self) -> bool {
        self.contains(Self::Jest)
    }
}

/// <https://jestjs.io/docs/configuration#testmatch-arraystring>
pub fn is_jestlike_file(path: &Path) -> bool {
    use std::ffi::OsStr;

    if path.components().any(|c| match c {
        std::path::Component::Normal(p) => p == OsStr::new("__tests__"),
        _ => false,
    }) {
        return true;
    }

    path.file_name() // foo/bar/baz.test.ts -> baz.test.ts
        .and_then(OsStr::to_str)
        .and_then(|filename| filename.split('.').rev().nth(1)) // baz.test.ts -> test
        .is_some_and(|name_or_first_ext| name_or_first_ext == "test" || name_or_first_ext == "spec")
}

pub fn has_vitest_imports(module_record: &ModuleRecord) -> bool {
    module_record.import_entries.iter().any(|entry| {
        entry.module_request.name() == "vitest" || entry.module_request.name() == "vite-plus/test"
    })
}

pub fn has_jest_imports(module_record: &ModuleRecord) -> bool {
    module_record.import_entries.iter().any(|entry| entry.module_request.name() == "@jest/globals")
}

#[derive(Debug, Clone, Copy, Eq, PartialEq)]

pub enum FrameworkOptions {
    Default,  // default
    VueSetup, // context is inside `<script setup>`
}

#[cfg(test)]
mod tests {
    use std::path::Path;

    use super::*;

    // --- is_jestlike_file ---

    #[test]
    fn test_jestlike_file_in_tests_dir() {
        assert!(is_jestlike_file(Path::new("__tests__/foo.ts")));
    }

    #[test]
    fn test_jestlike_file_nested_tests_dir() {
        assert!(is_jestlike_file(Path::new("src/__tests__/nested/bar.js")));
    }

    #[test]
    fn test_jestlike_file_dot_test() {
        assert!(is_jestlike_file(Path::new("foo.test.ts")));
        assert!(is_jestlike_file(Path::new("components/Button.test.jsx")));
    }

    #[test]
    fn test_jestlike_file_dot_spec() {
        assert!(is_jestlike_file(Path::new("foo.spec.js")));
        assert!(is_jestlike_file(Path::new("utils/helper.spec.tsx")));
    }

    #[test]
    fn test_not_jestlike_regular_file() {
        assert!(!is_jestlike_file(Path::new("foo.ts")));
        assert!(!is_jestlike_file(Path::new("src/components/Button.tsx")));
    }

    #[test]
    fn test_not_jestlike_test_directory_name() {
        // A directory named "test" (not "__tests__") should not match
        assert!(!is_jestlike_file(Path::new("src/test/bar.js")));
        assert!(!is_jestlike_file(Path::new("test/utils.ts")));
    }

    #[test]
    fn test_not_jestlike_no_real_extension() {
        // "foo.test" — split('.').rev() = ["test", "foo"], nth(1) = "foo" → no match
        // Requires at least two dots like "foo.test.ts"
        assert!(!is_jestlike_file(Path::new("foo.test")));
        assert!(!is_jestlike_file(Path::new("foo.spec")));
    }

    #[test]
    fn test_not_jestlike_single_component_no_ext() {
        assert!(!is_jestlike_file(Path::new("foo")));
    }

    // --- FrameworkFlags ---

    #[test]
    fn test_next_contains_react() {
        assert!(FrameworkFlags::Next.contains(FrameworkFlags::React));
    }

    #[test]
    fn test_sveltekit_contains_svelte() {
        assert!(FrameworkFlags::SvelteKit.contains(FrameworkFlags::Svelte));
    }

    #[test]
    fn test_nuxt_contains_vue() {
        assert!(FrameworkFlags::Nuxt.contains(FrameworkFlags::Vue));
    }

    #[test]
    fn test_is_test_jest() {
        assert!(FrameworkFlags::Jest.is_test());
    }

    #[test]
    fn test_is_test_vitest() {
        assert!(FrameworkFlags::Vitest.is_test());
        assert!(FrameworkFlags::Vitest.is_vitest());
        assert!(!FrameworkFlags::Vitest.is_jest());
    }

    #[test]
    fn test_is_test_other() {
        assert!(FrameworkFlags::OtherTest.is_test());
    }

    #[test]
    fn test_is_test_non_test_framework() {
        assert!(!FrameworkFlags::React.is_test());
        assert!(!FrameworkFlags::Vue.is_test());
        assert!(!FrameworkFlags::Angular.is_test());
    }

    #[test]
    fn test_combined_flags() {
        let flags = FrameworkFlags::React | FrameworkFlags::Jest;
        assert!(flags.contains(FrameworkFlags::React));
        assert!(flags.is_test());
        assert!(flags.is_jest());
        assert!(!flags.is_vitest());
    }

    #[test]
    fn test_empty_flags() {
        let flags = FrameworkFlags::empty();
        assert!(!flags.is_test());
        assert!(!flags.contains(FrameworkFlags::React));
    }

    #[test]
    fn test_default_is_empty() {
        assert_eq!(FrameworkFlags::default(), FrameworkFlags::empty());
    }

    #[test]
    fn test_jsx_like_includes_react_preact_next() {
        assert!(FrameworkFlags::JsxLike.contains(FrameworkFlags::React));
        assert!(FrameworkFlags::JsxLike.contains(FrameworkFlags::Preact));
        assert!(FrameworkFlags::JsxLike.contains(FrameworkFlags::Next));
    }
}
