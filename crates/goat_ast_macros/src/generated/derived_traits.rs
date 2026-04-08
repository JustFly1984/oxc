// Auto-generated code, DO NOT EDIT DIRECTLY!
// To edit this generated file you have to edit `tasks/ast_tools/src/main.rs`.

use proc_macro2::TokenStream;
use quote::quote;

pub fn get_trait_crate_and_generics(trait_name: &str) -> Option<(TokenStream, TokenStream)> {
    let res = match trait_name {
        "CloneIn" => (quote!(::goat_allocator::CloneIn), quote!(< 'static >)),
        "Dummy" => (quote!(::goat_allocator::Dummy), quote!(< 'static >)),
        "TakeIn" => (quote!(::goat_allocator::TakeIn), quote!(< 'static >)),
        "GetAddress" => (quote!(::goat_allocator::GetAddress), TokenStream::new()),
        "UnstableAddress" => (quote!(::goat_allocator::UnstableAddress), TokenStream::new()),
        "GetSpan" => (quote!(::goat_span::GetSpan), TokenStream::new()),
        "GetSpanMut" => (quote!(::goat_span::GetSpanMut), TokenStream::new()),
        "ContentEq" => (quote!(::goat_span::ContentEq), TokenStream::new()),
        "ESTree" => (quote!(::goat_estree::ESTree), TokenStream::new()),
        _ => return None,
    };
    Some(res)
}
