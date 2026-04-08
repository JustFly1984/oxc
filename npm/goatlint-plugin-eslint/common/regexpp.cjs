//#region ../../node_modules/.pnpm/@eslint-community+regexpp@4.12.2/node_modules/@eslint-community/regexpp/index.js
var require_regexpp = /* @__PURE__ */ require("./chunk.cjs").t(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: !0 });
	var ast = /* @__PURE__ */ Object.freeze({ __proto__: null });
	let latestEcmaVersion = 2025, largeIdStartRanges, largeIdContinueRanges;
	function isIdStart(cp) {
		return cp < 65 ? !1 : cp < 91 ? !0 : cp < 97 ? !1 : cp < 123 ? !0 : isLargeIdStart(cp);
	}
	function isIdContinue(cp) {
		return cp < 48 ? !1 : cp < 58 ? !0 : cp < 65 ? !1 : cp < 91 || cp === 95 ? !0 : cp < 97 ? !1 : cp < 123 ? !0 : isLargeIdStart(cp) || isLargeIdContinue(cp);
	}
	function isLargeIdStart(cp) {
		return isInRange(cp, largeIdStartRanges ??= initLargeIdStartRanges());
	}
	function isLargeIdContinue(cp) {
		return isInRange(cp, largeIdContinueRanges ??= initLargeIdContinueRanges());
	}
	function initLargeIdStartRanges() {
		return restoreRanges("4q 0 b 0 5 0 6 m 2 u 2 cp 5 b f 4 8 0 2 0 3m 4 2 1 3 3 2 0 7 0 2 2 2 0 2 j 2 2a 2 3u 9 4l 2 11 3 0 7 14 20 q 5 3 1a 16 10 1 2 2q 2 0 g 1 8 1 b 2 3 0 h 0 2 t u 2g c 0 p w a 1 5 0 6 l 5 0 a 0 4 0 o o 8 a 6 n 2 6 h 15 1n 1h 4 0 j 0 8 9 g f 5 7 3 1 3 l 2 6 2 0 4 3 4 0 h 0 e 1 2 2 f 1 b 0 9 5 5 1 3 l 2 6 2 1 2 1 2 1 w 3 2 0 k 2 h 8 2 2 2 l 2 6 2 1 2 4 4 0 j 0 g 1 o 0 c 7 3 1 3 l 2 6 2 1 2 4 4 0 v 1 2 2 g 0 i 0 2 5 4 2 2 3 4 1 2 0 2 1 4 1 4 2 4 b n 0 1h 7 2 2 2 m 2 f 4 0 r 2 2 1 3 1 v 0 5 7 2 2 2 m 2 9 2 4 4 0 v 2 2 1 g 1 i 8 2 2 2 14 3 0 h 0 6 2 9 2 p 5 6 h 4 n 2 8 2 0 3 6 1n 1b 2 1 d 6 1n 1 2 0 2 4 2 n 2 0 2 9 2 1 a 0 3 4 2 0 m 3 x 0 1s 7 2 z s 4 38 16 l 0 h 5 5 3 4 0 4 1 8 2 5 c d 0 i 11 2 0 6 0 3 16 2 98 2 3 3 6 2 0 2 3 3 14 2 3 3 w 2 3 3 6 2 0 2 3 3 e 2 1k 2 3 3 1u 12 f h 2d 3 5 4 h7 3 g 2 p 6 22 4 a 8 h e i f h f c 2 2 g 1f 10 0 5 0 1w 2g 8 14 2 0 6 1x b u 1e t 3 4 c 17 5 p 1j m a 1g 2b 0 2m 1a i 7 1j t e 1 b 17 r z 16 2 b z 3 a 6 16 3 2 16 3 2 5 2 1 4 0 6 5b 1t 7p 3 5 3 11 3 5 3 7 2 0 2 0 2 0 2 u 3 1g 2 6 2 0 4 2 2 6 4 3 3 5 5 c 6 2 2 6 39 0 e 0 h c 2u 0 5 0 3 9 2 0 3 5 7 0 2 0 2 0 2 f 3 3 6 4 5 0 i 14 22g 6c 7 3 4 1 d 11 2 0 6 0 3 1j 8 0 h m a 6 2 6 2 6 2 6 2 6 2 6 2 6 2 6 fb 2 q 8 8 4 3 4 5 2d 5 4 2 2h 2 3 6 16 2 2l i v 1d f e9 533 1t h3g 1w 19 3 7g 4 f b 1 l 1a h u 3 27 14 8 3 2u 3 29 l g 2 2 2 3 2 m u 1f f 1d 1r 5 4 0 2 1 c r b m q s 8 1a t 0 h 4 2 9 b 4 2 14 o 2 2 7 l m 4 0 4 1d 2 0 4 1 3 4 3 0 2 0 p 2 3 a 8 2 d 5 3 5 3 5 a 6 2 6 2 16 2 d 7 36 u 8mb d m 5 1c 6it a5 3 2x 13 6 d 4 6 0 2 9 2 c 2 4 2 0 2 1 2 1 2 2z y a2 j 1r 3 1h 15 b 39 4 2 3q 11 p 7 p c 2g 4 5 3 5 3 5 3 2 10 b 2 p 2 i 2 1 2 e 3 d z 3e 1y 1g 7g s 4 1c 1c v e t 6 11 b t 3 z 5 7 2 4 17 4d j z 5 z 5 13 9 1f d a 2 e 2 6 2 1 2 a 2 e 2 6 2 1 4 1f d 8m a l b 7 p 5 2 15 2 8 1y 5 3 0 2 17 2 1 4 0 3 m b m a u 1u i 2 1 b l b p 7 p 13 1j 7 1 1t 0 g 3 2 2 2 s 17 s 4 s 10 7 2 r s 1h b l b i e h 33 20 1k 1e e 1e e z 13 r a m 6z 15 7 1 h 5 1l s b 0 9 l 17 h 1b k s m d 1g 1m 1 3 0 e 18 x o r z u 0 3 0 9 y 4 0 d 1b f 3 m 0 2 0 10 h 2 o k 1 1s 6 2 0 2 3 2 e 2 9 8 1a 13 7 3 1 3 l 2 6 2 1 2 4 4 0 j 0 d 4 v 9 2 0 3 0 2 11 2 0 q 0 2 0 19 1g j 3 l 2 v 1b l 1 2 0 55 1a 16 3 11 1b l 0 1o 16 e 0 20 q 12 6 56 17 39 1r w 7 3 0 3 7 2 1 2 n g 0 2 0 2n 7 3 12 h 0 2 0 t 0 b 13 8 0 m 0 c 19 k 0 j 20 5k w w 8 2 10 i 0 1e t 35 6 2 1 2 11 m 0 q 5 2 1 2 v f 0 o 17 79 i g 0 2 c 2 x 3h 0 28 pl 2v 32 i 5f 219 2o g tr i 5 q 32y 6 g6 5a2 t 1cz fs 8 u i 26 i t j 1b h 3 w k 6 i c1 18 5w 1r x o 3 o 19 22 6 0 1v c 1t 1 2 0 f 4 a 5p1 16 v 2q 36 6pq 3 2 6 2 1 2 82 g 0 u 2 3 0 f 3 9 az 1s5 2y 6 c 4 8 8 9 4mf 2c 2 1y 2 1 3 0 3 1 3 3 2 b 2 0 2 6 2 1s 2 3 3 7 2 6 2 r 2 3 2 4 2 0 4 6 2 9f 3 o 2 o 2 u 2 o 2 u 2 o 2 u 2 o 2 u 2 o 2 7 1f9 u 7 5 7a 1p 43 18 b 6 h 0 8y t j 17 dh r 6d t 3 0 5s u 2 2 2 1 2 6 3 4 a 1 69 6 2 3 2 1 2 e 2 5g 1o 1v 8 0 xh 3 2 q 2 1 2 0 3 0 2 9 2 3 2 0 2 0 7 0 5 0 2 0 2 0 2 2 2 1 2 0 3 0 2 0 2 0 2 0 2 0 2 1 2 0 3 3 2 6 2 3 2 3 2 0 2 9 2 g 6 2 2 4 2 g 3et wyn x 3dp 3 4gd 3 5rk g h9 1wj f1 15v 3t6 6 6jt");
	}
	function initLargeIdContinueRanges() {
		return restoreRanges("53 0 g9 33 o 0 70 4 7e 18 2 0 2 1 2 1 2 0 21 a 1d u 7 0 2u 6 3 5 3 1 2 3 3 9 o 0 v q 2k a g 9 y 8 a 0 p 3 2 8 2 2 2 4 18 2 1o 8 17 n 2 w 1j 2 2 h 2 6 b 1 3 9 i 2 1l 0 2 6 3 1 3 2 a 0 b 1 3 9 f 0 3 2 1l 0 2 4 5 1 3 2 4 0 l b 4 0 c 2 1l 0 2 7 2 2 2 2 l 1 3 9 b 5 2 2 1l 0 2 6 3 1 3 2 8 2 b 1 3 9 j 0 1o 4 4 2 2 3 a 0 f 9 h 4 1k 0 2 6 2 2 2 3 8 1 c 1 3 9 i 2 1l 0 2 6 2 2 2 3 8 1 c 1 3 9 4 0 d 3 1k 1 2 6 2 2 2 3 a 0 b 1 3 9 i 2 1z 0 5 5 2 0 2 7 7 9 3 1 1q 0 3 6 d 7 2 9 2g 0 3 8 c 6 2 9 1r 1 7 9 c 0 2 0 2 0 5 1 1e j 2 1 6 a 2 z a 0 2t j 2 9 d 3 5 2 2 2 3 6 4 3 e b 2 e jk 2 a 8 pt 3 t 2 u 1 v 1 1t v a 0 3 9 y 2 2 a 40 0 3b b 5 b b 9 3l a 1p 4 1m 9 2 s 3 a 7 9 n d 2 u 3 b l 4 1c g c 9 i 8 d 2 v c 3 9 19 d 1d j 9 9 7 9 3b 2 2 k 5 0 7 0 3 2 5j 1r el 1 1e 1 k 0 3g c 5 0 4 b 2db 2 3y 0 2p v ff 5 2y 1 2p 0 n51 9 1y 0 5 9 x 1 29 1 7l 0 4 0 5 0 o 4 5 0 2c 1 1f h b 9 7 h e a t 7 q c 19 3 1c d g 9 c 0 b 9 1c d d 0 9 1 3 9 y 2 1f 0 2 2 3 1 6 1 2 0 16 4 6 1 6l 7 2 1 3 9 fmt 0 ki f h f 4 1 p 2 5d 9 12 0 12 0 ig 0 6b 0 46 4 86 9 120 2 2 1 6 3 15 2 5 0 4m 1 fy 3 9 9 7 9 w 4 8u 1 26 5 1z a 1e 3 3f 2 1i e w a 3 1 b 3 1a a 8 0 1a 9 7 2 11 d 2 9 6 1 19 0 d 2 1d d 9 3 2 b 2b b 7 0 3 0 4e b 6 9 7 3 1k 1 2 6 3 1 3 2 a 0 b 1 3 6 4 4 1w 8 2 0 3 0 2 3 2 4 2 0 f 1 2b h a 9 5 0 2a j d 9 5y 6 3 8 s 1 2b g g 9 2a c 9 9 7 j 1m e 5 9 6r e 4m 9 1z 5 2 1 3 3 2 0 2 1 d 9 3c 6 3 6 4 0 t 9 15 6 2 3 9 0 a a 1b f 5j 7 3t 9 1i 7 2 7 h 9 1l l 2 d 3f 5 4 0 2 1 2 6 2 0 9 9 1d 4 2 1 2 4 9 9 1j 9 7e 3 a 1 2 0 1d 6 4 4 e a 44m 0 7 e 8uh r 1t3 9 2f 9 13 4 1o 6 q 9 ev 9 d2 0 2 1i 8 3 2a 0 c 1 f58 1 382 9 ef 19 3 m f3 4 4 5 9 7 3 6 v 3 45 2 13e 1d e9 1i 5 1d 9 0 f 0 n 4 2 e 11t 6 2 g 3 6 2 1 2 4 2t 0 4h 6 a 9 9x 0 1q d dv d 6t 1 2 9 6h 0 3 0 8 1 6 0 d7 6 32 6 6 9 3o7 9 gvt3 6n");
	}
	function isInRange(cp, ranges) {
		let l = 0, r = ranges.length / 2 | 0, i = 0, min = 0, max = 0;
		for (; l < r;) if (i = (l + r) / 2 | 0, min = ranges[2 * i], max = ranges[2 * i + 1], cp < min) r = i;
		else if (cp > max) l = i + 1;
		else return !0;
		return !1;
	}
	function restoreRanges(data) {
		let last = 0;
		return data.split(" ").map((s) => last += parseInt(s, 36) | 0);
	}
	var DataSet = class {
		constructor(raw2018, raw2019, raw2020, raw2021, raw2022, raw2023, raw2024, raw2025, raw2026) {
			this._raw2018 = raw2018, this._raw2019 = raw2019, this._raw2020 = raw2020, this._raw2021 = raw2021, this._raw2022 = raw2022, this._raw2023 = raw2023, this._raw2024 = raw2024, this._raw2025 = raw2025, this._raw2026 = raw2026;
		}
		get es2018() {
			return this._set2018 ??= new Set(this._raw2018.split(" "));
		}
		get es2019() {
			return this._set2019 ??= new Set(this._raw2019.split(" "));
		}
		get es2020() {
			return this._set2020 ??= new Set(this._raw2020.split(" "));
		}
		get es2021() {
			return this._set2021 ??= new Set(this._raw2021.split(" "));
		}
		get es2022() {
			return this._set2022 ??= new Set(this._raw2022.split(" "));
		}
		get es2023() {
			return this._set2023 ??= new Set(this._raw2023.split(" "));
		}
		get es2024() {
			return this._set2024 ??= new Set(this._raw2024.split(" "));
		}
		get es2025() {
			return this._set2025 ??= new Set(this._raw2025.split(" "));
		}
		get es2026() {
			return this._set2026 ??= new Set(this._raw2026.split(" "));
		}
	};
	let gcNameSet = new Set(["General_Category", "gc"]), scNameSet = new Set([
		"Script",
		"Script_Extensions",
		"sc",
		"scx"
	]), gcValueSets = new DataSet("C Cased_Letter Cc Cf Close_Punctuation Cn Co Combining_Mark Connector_Punctuation Control Cs Currency_Symbol Dash_Punctuation Decimal_Number Enclosing_Mark Final_Punctuation Format Initial_Punctuation L LC Letter Letter_Number Line_Separator Ll Lm Lo Lowercase_Letter Lt Lu M Mark Math_Symbol Mc Me Mn Modifier_Letter Modifier_Symbol N Nd Nl No Nonspacing_Mark Number Open_Punctuation Other Other_Letter Other_Number Other_Punctuation Other_Symbol P Paragraph_Separator Pc Pd Pe Pf Pi Po Private_Use Ps Punctuation S Sc Separator Sk Sm So Space_Separator Spacing_Mark Surrogate Symbol Titlecase_Letter Unassigned Uppercase_Letter Z Zl Zp Zs cntrl digit punct", "", "", "", "", "", "", "", ""), scValueSets = new DataSet("Adlam Adlm Aghb Ahom Anatolian_Hieroglyphs Arab Arabic Armenian Armi Armn Avestan Avst Bali Balinese Bamu Bamum Bass Bassa_Vah Batak Batk Beng Bengali Bhaiksuki Bhks Bopo Bopomofo Brah Brahmi Brai Braille Bugi Buginese Buhd Buhid Cakm Canadian_Aboriginal Cans Cari Carian Caucasian_Albanian Chakma Cham Cher Cherokee Common Copt Coptic Cprt Cuneiform Cypriot Cyrillic Cyrl Deseret Deva Devanagari Dsrt Dupl Duployan Egyp Egyptian_Hieroglyphs Elba Elbasan Ethi Ethiopic Geor Georgian Glag Glagolitic Gonm Goth Gothic Gran Grantha Greek Grek Gujarati Gujr Gurmukhi Guru Han Hang Hangul Hani Hano Hanunoo Hatr Hatran Hebr Hebrew Hira Hiragana Hluw Hmng Hung Imperial_Aramaic Inherited Inscriptional_Pahlavi Inscriptional_Parthian Ital Java Javanese Kaithi Kali Kana Kannada Katakana Kayah_Li Khar Kharoshthi Khmer Khmr Khoj Khojki Khudawadi Knda Kthi Lana Lao Laoo Latin Latn Lepc Lepcha Limb Limbu Lina Linb Linear_A Linear_B Lisu Lyci Lycian Lydi Lydian Mahajani Mahj Malayalam Mand Mandaic Mani Manichaean Marc Marchen Masaram_Gondi Meetei_Mayek Mend Mende_Kikakui Merc Mero Meroitic_Cursive Meroitic_Hieroglyphs Miao Mlym Modi Mong Mongolian Mro Mroo Mtei Mult Multani Myanmar Mymr Nabataean Narb Nbat New_Tai_Lue Newa Nko Nkoo Nshu Nushu Ogam Ogham Ol_Chiki Olck Old_Hungarian Old_Italic Old_North_Arabian Old_Permic Old_Persian Old_South_Arabian Old_Turkic Oriya Orkh Orya Osage Osge Osma Osmanya Pahawh_Hmong Palm Palmyrene Pau_Cin_Hau Pauc Perm Phag Phags_Pa Phli Phlp Phnx Phoenician Plrd Prti Psalter_Pahlavi Qaac Qaai Rejang Rjng Runic Runr Samaritan Samr Sarb Saur Saurashtra Sgnw Sharada Shavian Shaw Shrd Sidd Siddham SignWriting Sind Sinh Sinhala Sora Sora_Sompeng Soyo Soyombo Sund Sundanese Sylo Syloti_Nagri Syrc Syriac Tagalog Tagb Tagbanwa Tai_Le Tai_Tham Tai_Viet Takr Takri Tale Talu Tamil Taml Tang Tangut Tavt Telu Telugu Tfng Tglg Thaa Thaana Thai Tibetan Tibt Tifinagh Tirh Tirhuta Ugar Ugaritic Vai Vaii Wara Warang_Citi Xpeo Xsux Yi Yiii Zanabazar_Square Zanb Zinh Zyyy", "Dogr Dogra Gong Gunjala_Gondi Hanifi_Rohingya Maka Makasar Medefaidrin Medf Old_Sogdian Rohg Sogd Sogdian Sogo", "Elym Elymaic Hmnp Nand Nandinagari Nyiakeng_Puachue_Hmong Wancho Wcho", "Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", "Cpmn Cypro_Minoan Old_Uyghur Ougr Tangsa Tnsa Toto Vith Vithkuqi", "Berf Beria_Erfe Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sidetic Sidt Sunu Sunuwar Tai_Yo Tayo Todhri Todr Tolong_Siki Tols Tulu_Tigalari Tutg Unknown Zzzz", "", "", ""), binPropertySets = new DataSet("AHex ASCII ASCII_Hex_Digit Alpha Alphabetic Any Assigned Bidi_C Bidi_Control Bidi_M Bidi_Mirrored CI CWCF CWCM CWKCF CWL CWT CWU Case_Ignorable Cased Changes_When_Casefolded Changes_When_Casemapped Changes_When_Lowercased Changes_When_NFKC_Casefolded Changes_When_Titlecased Changes_When_Uppercased DI Dash Default_Ignorable_Code_Point Dep Deprecated Dia Diacritic Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Ext Extender Gr_Base Gr_Ext Grapheme_Base Grapheme_Extend Hex Hex_Digit IDC IDS IDSB IDST IDS_Binary_Operator IDS_Trinary_Operator ID_Continue ID_Start Ideo Ideographic Join_C Join_Control LOE Logical_Order_Exception Lower Lowercase Math NChar Noncharacter_Code_Point Pat_Syn Pat_WS Pattern_Syntax Pattern_White_Space QMark Quotation_Mark RI Radical Regional_Indicator SD STerm Sentence_Terminal Soft_Dotted Term Terminal_Punctuation UIdeo Unified_Ideograph Upper Uppercase VS Variation_Selector White_Space XIDC XIDS XID_Continue XID_Start space", "Extended_Pictographic", "", "EBase EComp EMod EPres ExtPict", "", "", "", "", ""), binPropertyOfStringsSets = new DataSet("", "", "", "", "", "", "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji RGI_Emoji_Flag_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence", "", "");
	function isValidUnicodeProperty(version, name, value) {
		return gcNameSet.has(name) ? version >= 2018 && gcValueSets.es2018.has(value) : scNameSet.has(name) ? version >= 2018 && scValueSets.es2018.has(value) || version >= 2019 && scValueSets.es2019.has(value) || version >= 2020 && scValueSets.es2020.has(value) || version >= 2021 && scValueSets.es2021.has(value) || version >= 2022 && scValueSets.es2022.has(value) || version >= 2023 && scValueSets.es2023.has(value) : !1;
	}
	function isValidLoneUnicodeProperty(version, value) {
		return version >= 2018 && binPropertySets.es2018.has(value) || version >= 2019 && binPropertySets.es2019.has(value) || version >= 2021 && binPropertySets.es2021.has(value);
	}
	function isValidLoneUnicodePropertyOfString(version, value) {
		return version >= 2024 && binPropertyOfStringsSets.es2024.has(value);
	}
	function isLatinLetter(code) {
		return code >= 65 && code <= 90 || code >= 97 && code <= 122;
	}
	function isDecimalDigit(code) {
		return code >= 48 && code <= 57;
	}
	function isOctalDigit(code) {
		return code >= 48 && code <= 55;
	}
	function isHexDigit(code) {
		return code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102;
	}
	function isLineTerminator(code) {
		return code === 10 || code === 13 || code === 8232 || code === 8233;
	}
	function isValidUnicode(code) {
		return code >= 0 && code <= 1114111;
	}
	function digitToInt(code) {
		return code >= 97 && code <= 102 ? code - 97 + 10 : code >= 65 && code <= 70 ? code - 65 + 10 : code - 48;
	}
	function isLeadSurrogate(code) {
		return code >= 55296 && code <= 56319;
	}
	function isTrailSurrogate(code) {
		return code >= 56320 && code <= 57343;
	}
	function combineSurrogatePair(lead, trail) {
		return (lead - 55296) * 1024 + (trail - 56320) + 65536;
	}
	var GroupSpecifiersAsES2018 = class {
		constructor() {
			this.groupName = /* @__PURE__ */ new Set();
		}
		clear() {
			this.groupName.clear();
		}
		isEmpty() {
			return !this.groupName.size;
		}
		hasInPattern(name) {
			return this.groupName.has(name);
		}
		hasInScope(name) {
			return this.hasInPattern(name);
		}
		addToScope(name) {
			this.groupName.add(name);
		}
		enterDisjunction() {}
		enterAlternative() {}
		leaveDisjunction() {}
	}, BranchID = class BranchID {
		constructor(parent, base) {
			this.parent = parent, this.base = base ?? this;
		}
		separatedFrom(other) {
			return this.base === other.base && this !== other || other.parent && this.separatedFrom(other.parent) ? !0 : this.parent?.separatedFrom(other) ?? !1;
		}
		child() {
			return new BranchID(this, null);
		}
		sibling() {
			return new BranchID(this.parent, this.base);
		}
	}, GroupSpecifiersAsES2025 = class {
		constructor() {
			this.branchID = new BranchID(null, null), this.groupNames = /* @__PURE__ */ new Map();
		}
		clear() {
			this.branchID = new BranchID(null, null), this.groupNames.clear();
		}
		isEmpty() {
			return !this.groupNames.size;
		}
		enterDisjunction() {
			this.branchID = this.branchID.child();
		}
		enterAlternative(index) {
			index !== 0 && (this.branchID = this.branchID.sibling());
		}
		leaveDisjunction() {
			this.branchID = this.branchID.parent;
		}
		hasInPattern(name) {
			return this.groupNames.has(name);
		}
		hasInScope(name) {
			let branches = this.groupNames.get(name);
			if (!branches) return !1;
			for (let branch of branches) if (!branch.separatedFrom(this.branchID)) return !0;
			return !1;
		}
		addToScope(name) {
			let branches = this.groupNames.get(name);
			if (branches) {
				branches.push(this.branchID);
				return;
			}
			this.groupNames.set(name, [this.branchID]);
		}
	};
	let legacyImpl = {
		at(s, end, i) {
			return i < end ? s.charCodeAt(i) : -1;
		},
		width(c) {
			return 1;
		}
	}, unicodeImpl = {
		at(s, end, i) {
			return i < end ? s.codePointAt(i) : -1;
		},
		width(c) {
			return c > 65535 ? 2 : 1;
		}
	};
	var Reader = class {
		constructor() {
			this._impl = legacyImpl, this._s = "", this._i = 0, this._end = 0, this._cp1 = -1, this._w1 = 1, this._cp2 = -1, this._w2 = 1, this._cp3 = -1, this._w3 = 1, this._cp4 = -1;
		}
		get source() {
			return this._s;
		}
		get index() {
			return this._i;
		}
		get currentCodePoint() {
			return this._cp1;
		}
		get nextCodePoint() {
			return this._cp2;
		}
		get nextCodePoint2() {
			return this._cp3;
		}
		get nextCodePoint3() {
			return this._cp4;
		}
		reset(source, start, end, uFlag) {
			this._impl = uFlag ? unicodeImpl : legacyImpl, this._s = source, this._end = end, this.rewind(start);
		}
		rewind(index) {
			let impl = this._impl;
			this._i = index, this._cp1 = impl.at(this._s, this._end, index), this._w1 = impl.width(this._cp1), this._cp2 = impl.at(this._s, this._end, index + this._w1), this._w2 = impl.width(this._cp2), this._cp3 = impl.at(this._s, this._end, index + this._w1 + this._w2), this._w3 = impl.width(this._cp3), this._cp4 = impl.at(this._s, this._end, index + this._w1 + this._w2 + this._w3);
		}
		advance() {
			if (this._cp1 !== -1) {
				let impl = this._impl;
				this._i += this._w1, this._cp1 = this._cp2, this._w1 = this._w2, this._cp2 = this._cp3, this._w2 = impl.width(this._cp2), this._cp3 = this._cp4, this._w3 = impl.width(this._cp3), this._cp4 = impl.at(this._s, this._end, this._i + this._w1 + this._w2 + this._w3);
			}
		}
		eat(cp) {
			return this._cp1 === cp ? (this.advance(), !0) : !1;
		}
		eat2(cp1, cp2) {
			return this._cp1 === cp1 && this._cp2 === cp2 ? (this.advance(), this.advance(), !0) : !1;
		}
		eat3(cp1, cp2, cp3) {
			return this._cp1 === cp1 && this._cp2 === cp2 && this._cp3 === cp3 ? (this.advance(), this.advance(), this.advance(), !0) : !1;
		}
	}, RegExpSyntaxError = class extends SyntaxError {
		constructor(message, index) {
			super(message), this.index = index;
		}
	};
	function newRegExpSyntaxError(srcCtx, flags, index, message) {
		let source = "";
		if (srcCtx.kind === "literal") {
			let literal = srcCtx.source.slice(srcCtx.start, srcCtx.end);
			literal && (source = `: ${literal}`);
		} else srcCtx.kind === "pattern" && (source = `: /${srcCtx.source.slice(srcCtx.start, srcCtx.end)}/${`${flags.unicode ? "u" : ""}${flags.unicodeSets ? "v" : ""}`}`);
		return new RegExpSyntaxError(`Invalid regular expression${source}: ${message}`, index);
	}
	let SYNTAX_CHARACTER = new Set([
		94,
		36,
		92,
		46,
		42,
		43,
		63,
		40,
		41,
		91,
		93,
		123,
		125,
		124
	]), CLASS_SET_RESERVED_DOUBLE_PUNCTUATOR_CHARACTER = new Set([
		38,
		33,
		35,
		36,
		37,
		42,
		43,
		44,
		46,
		58,
		59,
		60,
		61,
		62,
		63,
		64,
		94,
		96,
		126
	]), CLASS_SET_SYNTAX_CHARACTER = new Set([
		40,
		41,
		91,
		93,
		123,
		125,
		47,
		45,
		92,
		124
	]), CLASS_SET_RESERVED_PUNCTUATOR = new Set([
		38,
		45,
		33,
		35,
		37,
		44,
		58,
		59,
		60,
		61,
		62,
		64,
		96,
		126
	]), FLAG_PROP_TO_CODEPOINT = {
		global: 103,
		ignoreCase: 105,
		multiline: 109,
		unicode: 117,
		sticky: 121,
		dotAll: 115,
		hasIndices: 100,
		unicodeSets: 118
	}, FLAG_CODEPOINT_TO_PROP = Object.fromEntries(Object.entries(FLAG_PROP_TO_CODEPOINT).map(([k, v]) => [v, k]));
	function isSyntaxCharacter(cp) {
		return SYNTAX_CHARACTER.has(cp);
	}
	function isClassSetReservedDoublePunctuatorCharacter(cp) {
		return CLASS_SET_RESERVED_DOUBLE_PUNCTUATOR_CHARACTER.has(cp);
	}
	function isClassSetSyntaxCharacter(cp) {
		return CLASS_SET_SYNTAX_CHARACTER.has(cp);
	}
	function isClassSetReservedPunctuator(cp) {
		return CLASS_SET_RESERVED_PUNCTUATOR.has(cp);
	}
	function isIdentifierStartChar(cp) {
		return isIdStart(cp) || cp === 36 || cp === 95;
	}
	function isIdentifierPartChar(cp) {
		return isIdContinue(cp) || cp === 36 || cp === 8204 || cp === 8205;
	}
	function isUnicodePropertyNameCharacter(cp) {
		return isLatinLetter(cp) || cp === 95;
	}
	function isUnicodePropertyValueCharacter(cp) {
		return isUnicodePropertyNameCharacter(cp) || isDecimalDigit(cp);
	}
	function isRegularExpressionModifier(ch) {
		return ch === 105 || ch === 109 || ch === 115;
	}
	var RegExpValidator = class {
		constructor(options) {
			this._reader = new Reader(), this._unicodeMode = !1, this._unicodeSetsMode = !1, this._nFlag = !1, this._lastIntValue = 0, this._lastRange = {
				min: 0,
				max: Infinity
			}, this._lastStrValue = "", this._lastAssertionIsQuantifiable = !1, this._numCapturingParens = 0, this._backreferenceNames = /* @__PURE__ */ new Set(), this._srcCtx = null, this._options = options ?? {}, this._groupSpecifiers = this.ecmaVersion >= 2025 ? new GroupSpecifiersAsES2025() : new GroupSpecifiersAsES2018();
		}
		validateLiteral(source, start = 0, end = source.length) {
			if (this._srcCtx = {
				source,
				start,
				end,
				kind: "literal"
			}, this._unicodeSetsMode = this._unicodeMode = this._nFlag = !1, this.reset(source, start, end), this.onLiteralEnter(start), this.eat(47) && this.eatRegExpBody() && this.eat(47)) {
				let flagStart = this.index, unicode = source.includes("u", flagStart), unicodeSets = source.includes("v", flagStart);
				this.validateFlagsInternal(source, flagStart, end), this.validatePatternInternal(source, start + 1, flagStart - 1, {
					unicode,
					unicodeSets
				});
			} else if (start >= end) this.raise("Empty");
			else {
				let c = String.fromCodePoint(this.currentCodePoint);
				this.raise(`Unexpected character '${c}'`);
			}
			this.onLiteralLeave(start, end);
		}
		validateFlags(source, start = 0, end = source.length) {
			this._srcCtx = {
				source,
				start,
				end,
				kind: "flags"
			}, this.validateFlagsInternal(source, start, end);
		}
		validatePattern(source, start = 0, end = source.length, uFlagOrFlags = void 0) {
			this._srcCtx = {
				source,
				start,
				end,
				kind: "pattern"
			}, this.validatePatternInternal(source, start, end, uFlagOrFlags);
		}
		validatePatternInternal(source, start = 0, end = source.length, uFlagOrFlags = void 0) {
			let mode = this._parseFlagsOptionToMode(uFlagOrFlags, end);
			this._unicodeMode = mode.unicodeMode, this._nFlag = mode.nFlag, this._unicodeSetsMode = mode.unicodeSetsMode, this.reset(source, start, end), this.consumePattern(), !this._nFlag && this.ecmaVersion >= 2018 && !this._groupSpecifiers.isEmpty() && (this._nFlag = !0, this.rewind(start), this.consumePattern());
		}
		validateFlagsInternal(source, start, end) {
			let flags = this.parseFlags(source, start, end);
			this.onRegExpFlags(start, end, flags);
		}
		_parseFlagsOptionToMode(uFlagOrFlags, sourceEnd) {
			let unicode = !1, unicodeSets = !1;
			return uFlagOrFlags && this.ecmaVersion >= 2015 && (typeof uFlagOrFlags == "object" ? (unicode = !!uFlagOrFlags.unicode, this.ecmaVersion >= 2024 && (unicodeSets = !!uFlagOrFlags.unicodeSets)) : unicode = uFlagOrFlags), unicode && unicodeSets && this.raise("Invalid regular expression flags", {
				index: sourceEnd + 1,
				unicode,
				unicodeSets
			}), {
				unicodeMode: unicode || unicodeSets,
				nFlag: unicode && this.ecmaVersion >= 2018 || unicodeSets || !!(this._options.strict && this.ecmaVersion >= 2023),
				unicodeSetsMode: unicodeSets
			};
		}
		get strict() {
			return !!this._options.strict || this._unicodeMode;
		}
		get ecmaVersion() {
			return this._options.ecmaVersion ?? latestEcmaVersion;
		}
		onLiteralEnter(start) {
			this._options.onLiteralEnter && this._options.onLiteralEnter(start);
		}
		onLiteralLeave(start, end) {
			this._options.onLiteralLeave && this._options.onLiteralLeave(start, end);
		}
		onRegExpFlags(start, end, flags) {
			this._options.onRegExpFlags && this._options.onRegExpFlags(start, end, flags), this._options.onFlags && this._options.onFlags(start, end, flags.global, flags.ignoreCase, flags.multiline, flags.unicode, flags.sticky, flags.dotAll, flags.hasIndices);
		}
		onPatternEnter(start) {
			this._options.onPatternEnter && this._options.onPatternEnter(start);
		}
		onPatternLeave(start, end) {
			this._options.onPatternLeave && this._options.onPatternLeave(start, end);
		}
		onDisjunctionEnter(start) {
			this._options.onDisjunctionEnter && this._options.onDisjunctionEnter(start);
		}
		onDisjunctionLeave(start, end) {
			this._options.onDisjunctionLeave && this._options.onDisjunctionLeave(start, end);
		}
		onAlternativeEnter(start, index) {
			this._options.onAlternativeEnter && this._options.onAlternativeEnter(start, index);
		}
		onAlternativeLeave(start, end, index) {
			this._options.onAlternativeLeave && this._options.onAlternativeLeave(start, end, index);
		}
		onGroupEnter(start) {
			this._options.onGroupEnter && this._options.onGroupEnter(start);
		}
		onGroupLeave(start, end) {
			this._options.onGroupLeave && this._options.onGroupLeave(start, end);
		}
		onModifiersEnter(start) {
			this._options.onModifiersEnter && this._options.onModifiersEnter(start);
		}
		onModifiersLeave(start, end) {
			this._options.onModifiersLeave && this._options.onModifiersLeave(start, end);
		}
		onAddModifiers(start, end, flags) {
			this._options.onAddModifiers && this._options.onAddModifiers(start, end, flags);
		}
		onRemoveModifiers(start, end, flags) {
			this._options.onRemoveModifiers && this._options.onRemoveModifiers(start, end, flags);
		}
		onCapturingGroupEnter(start, name) {
			this._options.onCapturingGroupEnter && this._options.onCapturingGroupEnter(start, name);
		}
		onCapturingGroupLeave(start, end, name) {
			this._options.onCapturingGroupLeave && this._options.onCapturingGroupLeave(start, end, name);
		}
		onQuantifier(start, end, min, max, greedy) {
			this._options.onQuantifier && this._options.onQuantifier(start, end, min, max, greedy);
		}
		onLookaroundAssertionEnter(start, kind, negate) {
			this._options.onLookaroundAssertionEnter && this._options.onLookaroundAssertionEnter(start, kind, negate);
		}
		onLookaroundAssertionLeave(start, end, kind, negate) {
			this._options.onLookaroundAssertionLeave && this._options.onLookaroundAssertionLeave(start, end, kind, negate);
		}
		onEdgeAssertion(start, end, kind) {
			this._options.onEdgeAssertion && this._options.onEdgeAssertion(start, end, kind);
		}
		onWordBoundaryAssertion(start, end, kind, negate) {
			this._options.onWordBoundaryAssertion && this._options.onWordBoundaryAssertion(start, end, kind, negate);
		}
		onAnyCharacterSet(start, end, kind) {
			this._options.onAnyCharacterSet && this._options.onAnyCharacterSet(start, end, kind);
		}
		onEscapeCharacterSet(start, end, kind, negate) {
			this._options.onEscapeCharacterSet && this._options.onEscapeCharacterSet(start, end, kind, negate);
		}
		onUnicodePropertyCharacterSet(start, end, kind, key, value, negate, strings) {
			this._options.onUnicodePropertyCharacterSet && this._options.onUnicodePropertyCharacterSet(start, end, kind, key, value, negate, strings);
		}
		onCharacter(start, end, value) {
			this._options.onCharacter && this._options.onCharacter(start, end, value);
		}
		onBackreference(start, end, ref) {
			this._options.onBackreference && this._options.onBackreference(start, end, ref);
		}
		onCharacterClassEnter(start, negate, unicodeSets) {
			this._options.onCharacterClassEnter && this._options.onCharacterClassEnter(start, negate, unicodeSets);
		}
		onCharacterClassLeave(start, end, negate) {
			this._options.onCharacterClassLeave && this._options.onCharacterClassLeave(start, end, negate);
		}
		onCharacterClassRange(start, end, min, max) {
			this._options.onCharacterClassRange && this._options.onCharacterClassRange(start, end, min, max);
		}
		onClassIntersection(start, end) {
			this._options.onClassIntersection && this._options.onClassIntersection(start, end);
		}
		onClassSubtraction(start, end) {
			this._options.onClassSubtraction && this._options.onClassSubtraction(start, end);
		}
		onClassStringDisjunctionEnter(start) {
			this._options.onClassStringDisjunctionEnter && this._options.onClassStringDisjunctionEnter(start);
		}
		onClassStringDisjunctionLeave(start, end) {
			this._options.onClassStringDisjunctionLeave && this._options.onClassStringDisjunctionLeave(start, end);
		}
		onStringAlternativeEnter(start, index) {
			this._options.onStringAlternativeEnter && this._options.onStringAlternativeEnter(start, index);
		}
		onStringAlternativeLeave(start, end, index) {
			this._options.onStringAlternativeLeave && this._options.onStringAlternativeLeave(start, end, index);
		}
		get index() {
			return this._reader.index;
		}
		get currentCodePoint() {
			return this._reader.currentCodePoint;
		}
		get nextCodePoint() {
			return this._reader.nextCodePoint;
		}
		get nextCodePoint2() {
			return this._reader.nextCodePoint2;
		}
		get nextCodePoint3() {
			return this._reader.nextCodePoint3;
		}
		reset(source, start, end) {
			this._reader.reset(source, start, end, this._unicodeMode);
		}
		rewind(index) {
			this._reader.rewind(index);
		}
		advance() {
			this._reader.advance();
		}
		eat(cp) {
			return this._reader.eat(cp);
		}
		eat2(cp1, cp2) {
			return this._reader.eat2(cp1, cp2);
		}
		eat3(cp1, cp2, cp3) {
			return this._reader.eat3(cp1, cp2, cp3);
		}
		raise(message, context) {
			throw newRegExpSyntaxError(this._srcCtx, {
				unicode: context?.unicode ?? (this._unicodeMode && !this._unicodeSetsMode),
				unicodeSets: context?.unicodeSets ?? this._unicodeSetsMode
			}, context?.index ?? this.index, message);
		}
		eatRegExpBody() {
			let start = this.index, inClass = !1, escaped = !1;
			for (;;) {
				let cp = this.currentCodePoint;
				if (cp === -1 || isLineTerminator(cp)) {
					let kind = inClass ? "character class" : "regular expression";
					this.raise(`Unterminated ${kind}`);
				}
				if (escaped) escaped = !1;
				else if (cp === 92) escaped = !0;
				else if (cp === 91) inClass = !0;
				else if (cp === 93) inClass = !1;
				else if (cp === 47 && !inClass || cp === 42 && this.index === start) break;
				this.advance();
			}
			return this.index !== start;
		}
		consumePattern() {
			let start = this.index;
			this._numCapturingParens = this.countCapturingParens(), this._groupSpecifiers.clear(), this._backreferenceNames.clear(), this.onPatternEnter(start), this.consumeDisjunction();
			let cp = this.currentCodePoint;
			if (this.currentCodePoint !== -1) {
				cp === 41 && this.raise("Unmatched ')'"), cp === 92 && this.raise("\\ at end of pattern"), (cp === 93 || cp === 125) && this.raise("Lone quantifier brackets");
				let c = String.fromCodePoint(cp);
				this.raise(`Unexpected character '${c}'`);
			}
			for (let name of this._backreferenceNames) this._groupSpecifiers.hasInPattern(name) || this.raise("Invalid named capture referenced");
			this.onPatternLeave(start, this.index);
		}
		countCapturingParens() {
			let start = this.index, inClass = !1, escaped = !1, count = 0, cp = 0;
			for (; (cp = this.currentCodePoint) !== -1;) escaped ? escaped = !1 : cp === 92 ? escaped = !0 : cp === 91 ? inClass = !0 : cp === 93 ? inClass = !1 : cp === 40 && !inClass && (this.nextCodePoint !== 63 || this.nextCodePoint2 === 60 && this.nextCodePoint3 !== 61 && this.nextCodePoint3 !== 33) && (count += 1), this.advance();
			return this.rewind(start), count;
		}
		consumeDisjunction() {
			let start = this.index, i = 0;
			this._groupSpecifiers.enterDisjunction(), this.onDisjunctionEnter(start);
			do
				this.consumeAlternative(i++);
			while (this.eat(124));
			this.consumeQuantifier(!0) && this.raise("Nothing to repeat"), this.eat(123) && this.raise("Lone quantifier brackets"), this.onDisjunctionLeave(start, this.index), this._groupSpecifiers.leaveDisjunction();
		}
		consumeAlternative(i) {
			let start = this.index;
			for (this._groupSpecifiers.enterAlternative(i), this.onAlternativeEnter(start, i); this.currentCodePoint !== -1 && this.consumeTerm(););
			this.onAlternativeLeave(start, this.index, i);
		}
		consumeTerm() {
			return this._unicodeMode || this.strict ? this.consumeAssertion() || this.consumeAtom() && this.consumeOptionalQuantifier() : this.consumeAssertion() && (!this._lastAssertionIsQuantifiable || this.consumeOptionalQuantifier()) || this.consumeExtendedAtom() && this.consumeOptionalQuantifier();
		}
		consumeOptionalQuantifier() {
			return this.consumeQuantifier(), !0;
		}
		consumeAssertion() {
			let start = this.index;
			if (this._lastAssertionIsQuantifiable = !1, this.eat(94)) return this.onEdgeAssertion(start, this.index, "start"), !0;
			if (this.eat(36)) return this.onEdgeAssertion(start, this.index, "end"), !0;
			if (this.eat2(92, 66)) return this.onWordBoundaryAssertion(start, this.index, "word", !0), !0;
			if (this.eat2(92, 98)) return this.onWordBoundaryAssertion(start, this.index, "word", !1), !0;
			if (this.eat2(40, 63)) {
				let lookbehind = this.ecmaVersion >= 2018 && this.eat(60), negate = !1;
				if (this.eat(61) || (negate = this.eat(33))) {
					let kind = lookbehind ? "lookbehind" : "lookahead";
					return this.onLookaroundAssertionEnter(start, kind, negate), this.consumeDisjunction(), this.eat(41) || this.raise("Unterminated group"), this._lastAssertionIsQuantifiable = !lookbehind && !this.strict, this.onLookaroundAssertionLeave(start, this.index, kind, negate), !0;
				}
				this.rewind(start);
			}
			return !1;
		}
		consumeQuantifier(noConsume = !1) {
			let start = this.index, min = 0, max = 0, greedy = !1;
			if (this.eat(42)) min = 0, max = Infinity;
			else if (this.eat(43)) min = 1, max = Infinity;
			else if (this.eat(63)) min = 0, max = 1;
			else if (this.eatBracedQuantifier(noConsume)) ({min, max} = this._lastRange);
			else return !1;
			return greedy = !this.eat(63), noConsume || this.onQuantifier(start, this.index, min, max, greedy), !0;
		}
		eatBracedQuantifier(noError) {
			let start = this.index;
			if (this.eat(123)) {
				if (this.eatDecimalDigits()) {
					let min = this._lastIntValue, max = min;
					if (this.eat(44) && (max = this.eatDecimalDigits() ? this._lastIntValue : Infinity), this.eat(125)) return !noError && max < min && this.raise("numbers out of order in {} quantifier"), this._lastRange = {
						min,
						max
					}, !0;
				}
				!noError && (this._unicodeMode || this.strict) && this.raise("Incomplete quantifier"), this.rewind(start);
			}
			return !1;
		}
		consumeAtom() {
			return this.consumePatternCharacter() || this.consumeDot() || this.consumeReverseSolidusAtomEscape() || !!this.consumeCharacterClass() || this.consumeCapturingGroup() || this.consumeUncapturingGroup();
		}
		consumeDot() {
			return this.eat(46) ? (this.onAnyCharacterSet(this.index - 1, this.index, "any"), !0) : !1;
		}
		consumeReverseSolidusAtomEscape() {
			let start = this.index;
			if (this.eat(92)) {
				if (this.consumeAtomEscape()) return !0;
				this.rewind(start);
			}
			return !1;
		}
		consumeUncapturingGroup() {
			let start = this.index;
			return this.eat2(40, 63) ? (this.onGroupEnter(start), this.ecmaVersion >= 2025 && this.consumeModifiers(), this.eat(58) || (this.rewind(start + 1), this.raise("Invalid group")), this.consumeDisjunction(), this.eat(41) || this.raise("Unterminated group"), this.onGroupLeave(start, this.index), !0) : !1;
		}
		consumeModifiers() {
			let start = this.index, hasAddModifiers = this.eatModifiers(), addModifiersEnd = this.index, hasHyphen = this.eat(45);
			if (!hasAddModifiers && !hasHyphen) return !1;
			this.onModifiersEnter(start);
			let addModifiers = this.parseModifiers(start, addModifiersEnd);
			if (this.onAddModifiers(start, addModifiersEnd, addModifiers), hasHyphen) {
				let modifiersStart = this.index;
				!this.eatModifiers() && !hasAddModifiers && this.currentCodePoint === 58 && this.raise("Invalid empty flags");
				let modifiers = this.parseModifiers(modifiersStart, this.index);
				for (let [flagName] of Object.entries(modifiers).filter(([, enable]) => enable)) addModifiers[flagName] && this.raise(`Duplicated flag '${String.fromCodePoint(FLAG_PROP_TO_CODEPOINT[flagName])}'`);
				this.onRemoveModifiers(modifiersStart, this.index, modifiers);
			}
			return this.onModifiersLeave(start, this.index), !0;
		}
		consumeCapturingGroup() {
			let start = this.index;
			if (this.eat(40)) {
				let name = null;
				if (this.ecmaVersion >= 2018) {
					if (this.consumeGroupSpecifier()) name = this._lastStrValue;
					else if (this.currentCodePoint === 63) return this.rewind(start), !1;
				} else if (this.currentCodePoint === 63) return this.rewind(start), !1;
				return this.onCapturingGroupEnter(start, name), this.consumeDisjunction(), this.eat(41) || this.raise("Unterminated group"), this.onCapturingGroupLeave(start, this.index, name), !0;
			}
			return !1;
		}
		consumeExtendedAtom() {
			return this.consumeDot() || this.consumeReverseSolidusAtomEscape() || this.consumeReverseSolidusFollowedByC() || !!this.consumeCharacterClass() || this.consumeCapturingGroup() || this.consumeUncapturingGroup() || this.consumeInvalidBracedQuantifier() || this.consumeExtendedPatternCharacter();
		}
		consumeReverseSolidusFollowedByC() {
			let start = this.index;
			return this.currentCodePoint === 92 && this.nextCodePoint === 99 ? (this._lastIntValue = this.currentCodePoint, this.advance(), this.onCharacter(start, this.index, 92), !0) : !1;
		}
		consumeInvalidBracedQuantifier() {
			return this.eatBracedQuantifier(!0) && this.raise("Nothing to repeat"), !1;
		}
		consumePatternCharacter() {
			let start = this.index, cp = this.currentCodePoint;
			return cp !== -1 && !isSyntaxCharacter(cp) ? (this.advance(), this.onCharacter(start, this.index, cp), !0) : !1;
		}
		consumeExtendedPatternCharacter() {
			let start = this.index, cp = this.currentCodePoint;
			return cp !== -1 && cp !== 94 && cp !== 36 && cp !== 92 && cp !== 46 && cp !== 42 && cp !== 43 && cp !== 63 && cp !== 40 && cp !== 41 && cp !== 91 && cp !== 124 ? (this.advance(), this.onCharacter(start, this.index, cp), !0) : !1;
		}
		consumeGroupSpecifier() {
			let start = this.index;
			if (this.eat(63)) {
				if (this.eatGroupName()) {
					if (!this._groupSpecifiers.hasInScope(this._lastStrValue)) return this._groupSpecifiers.addToScope(this._lastStrValue), !0;
					this.raise("Duplicate capture group name");
				}
				this.rewind(start);
			}
			return !1;
		}
		consumeAtomEscape() {
			return this.consumeBackreference() || this.consumeCharacterClassEscape() || this.consumeCharacterEscape() || this._nFlag && this.consumeKGroupName() ? !0 : ((this.strict || this._unicodeMode) && this.raise("Invalid escape"), !1);
		}
		consumeBackreference() {
			let start = this.index;
			if (this.eatDecimalEscape()) {
				let n = this._lastIntValue;
				if (n <= this._numCapturingParens) return this.onBackreference(start - 1, this.index, n), !0;
				(this.strict || this._unicodeMode) && this.raise("Invalid escape"), this.rewind(start);
			}
			return !1;
		}
		consumeCharacterClassEscape() {
			let start = this.index;
			if (this.eat(100)) return this._lastIntValue = -1, this.onEscapeCharacterSet(start - 1, this.index, "digit", !1), {};
			if (this.eat(68)) return this._lastIntValue = -1, this.onEscapeCharacterSet(start - 1, this.index, "digit", !0), {};
			if (this.eat(115)) return this._lastIntValue = -1, this.onEscapeCharacterSet(start - 1, this.index, "space", !1), {};
			if (this.eat(83)) return this._lastIntValue = -1, this.onEscapeCharacterSet(start - 1, this.index, "space", !0), {};
			if (this.eat(119)) return this._lastIntValue = -1, this.onEscapeCharacterSet(start - 1, this.index, "word", !1), {};
			if (this.eat(87)) return this._lastIntValue = -1, this.onEscapeCharacterSet(start - 1, this.index, "word", !0), {};
			let negate = !1;
			if (this._unicodeMode && this.ecmaVersion >= 2018 && (this.eat(112) || (negate = this.eat(80)))) {
				this._lastIntValue = -1;
				let result = null;
				if (this.eat(123) && (result = this.eatUnicodePropertyValueExpression()) && this.eat(125)) return negate && result.strings && this.raise("Invalid property name"), this.onUnicodePropertyCharacterSet(start - 1, this.index, "property", result.key, result.value, negate, result.strings ?? !1), { mayContainStrings: result.strings };
				this.raise("Invalid property name");
			}
			return null;
		}
		consumeCharacterEscape() {
			let start = this.index;
			return this.eatControlEscape() || this.eatCControlLetter() || this.eatZero() || this.eatHexEscapeSequence() || this.eatRegExpUnicodeEscapeSequence() || !this.strict && !this._unicodeMode && this.eatLegacyOctalEscapeSequence() || this.eatIdentityEscape() ? (this.onCharacter(start - 1, this.index, this._lastIntValue), !0) : !1;
		}
		consumeKGroupName() {
			let start = this.index;
			if (this.eat(107)) {
				if (this.eatGroupName()) {
					let groupName = this._lastStrValue;
					return this._backreferenceNames.add(groupName), this.onBackreference(start - 1, this.index, groupName), !0;
				}
				this.raise("Invalid named reference");
			}
			return !1;
		}
		consumeCharacterClass() {
			let start = this.index;
			if (this.eat(91)) {
				let negate = this.eat(94);
				this.onCharacterClassEnter(start, negate, this._unicodeSetsMode);
				let result = this.consumeClassContents();
				return this.eat(93) || (this.currentCodePoint === -1 && this.raise("Unterminated character class"), this.raise("Invalid character in character class")), negate && result.mayContainStrings && this.raise("Negated character class may contain strings"), this.onCharacterClassLeave(start, this.index, negate), result;
			}
			return null;
		}
		consumeClassContents() {
			if (this._unicodeSetsMode) return this.currentCodePoint === 93 ? {} : this.consumeClassSetExpression();
			let strict = this.strict || this._unicodeMode;
			for (;;) {
				let rangeStart = this.index;
				if (!this.consumeClassAtom()) break;
				let min = this._lastIntValue;
				if (!this.eat(45)) continue;
				if (this.onCharacter(this.index - 1, this.index, 45), !this.consumeClassAtom()) break;
				let max = this._lastIntValue;
				if (min === -1 || max === -1) {
					strict && this.raise("Invalid character class");
					continue;
				}
				min > max && this.raise("Range out of order in character class"), this.onCharacterClassRange(rangeStart, this.index, min, max);
			}
			return {};
		}
		consumeClassAtom() {
			let start = this.index, cp = this.currentCodePoint;
			if (cp !== -1 && cp !== 92 && cp !== 93) return this.advance(), this._lastIntValue = cp, this.onCharacter(start, this.index, this._lastIntValue), !0;
			if (this.eat(92)) {
				if (this.consumeClassEscape()) return !0;
				if (!this.strict && this.currentCodePoint === 99) return this._lastIntValue = 92, this.onCharacter(start, this.index, this._lastIntValue), !0;
				(this.strict || this._unicodeMode) && this.raise("Invalid escape"), this.rewind(start);
			}
			return !1;
		}
		consumeClassEscape() {
			let start = this.index;
			if (this.eat(98)) return this._lastIntValue = 8, this.onCharacter(start - 1, this.index, this._lastIntValue), !0;
			if (this._unicodeMode && this.eat(45)) return this._lastIntValue = 45, this.onCharacter(start - 1, this.index, this._lastIntValue), !0;
			let cp = 0;
			return !this.strict && !this._unicodeMode && this.currentCodePoint === 99 && (isDecimalDigit(cp = this.nextCodePoint) || cp === 95) ? (this.advance(), this.advance(), this._lastIntValue = cp % 32, this.onCharacter(start - 1, this.index, this._lastIntValue), !0) : !!this.consumeCharacterClassEscape() || this.consumeCharacterEscape();
		}
		consumeClassSetExpression() {
			let start = this.index, mayContainStrings = !1, result = null;
			if (this.consumeClassSetCharacter()) {
				if (this.consumeClassSetRangeFromOperator(start)) return this.consumeClassUnionRight({}), {};
				mayContainStrings = !1;
			} else if (result = this.consumeClassSetOperand()) mayContainStrings = result.mayContainStrings;
			else {
				let cp = this.currentCodePoint;
				cp === 92 && (this.advance(), this.raise("Invalid escape")), cp === this.nextCodePoint && isClassSetReservedDoublePunctuatorCharacter(cp) && this.raise("Invalid set operation in character class"), this.raise("Invalid character in character class");
			}
			if (this.eat2(38, 38)) {
				for (; this.currentCodePoint !== 38 && (result = this.consumeClassSetOperand());) if (this.onClassIntersection(start, this.index), result.mayContainStrings || (mayContainStrings = !1), !this.eat2(38, 38)) return { mayContainStrings };
				this.raise("Invalid character in character class");
			}
			if (this.eat2(45, 45)) {
				for (; this.consumeClassSetOperand();) if (this.onClassSubtraction(start, this.index), !this.eat2(45, 45)) return { mayContainStrings };
				this.raise("Invalid character in character class");
			}
			return this.consumeClassUnionRight({ mayContainStrings });
		}
		consumeClassUnionRight(leftResult) {
			let mayContainStrings = leftResult.mayContainStrings;
			for (;;) {
				let start = this.index;
				if (this.consumeClassSetCharacter()) {
					this.consumeClassSetRangeFromOperator(start);
					continue;
				}
				let result = this.consumeClassSetOperand();
				if (result) {
					result.mayContainStrings && (mayContainStrings = !0);
					continue;
				}
				break;
			}
			return { mayContainStrings };
		}
		consumeClassSetRangeFromOperator(start) {
			let currentStart = this.index, min = this._lastIntValue;
			if (this.eat(45)) {
				if (this.consumeClassSetCharacter()) {
					let max = this._lastIntValue;
					return (min === -1 || max === -1) && this.raise("Invalid character class"), min > max && this.raise("Range out of order in character class"), this.onCharacterClassRange(start, this.index, min, max), !0;
				}
				this.rewind(currentStart);
			}
			return !1;
		}
		consumeClassSetOperand() {
			let result = null;
			return (result = this.consumeNestedClass()) || (result = this.consumeClassStringDisjunction()) ? result : this.consumeClassSetCharacter() ? {} : null;
		}
		consumeNestedClass() {
			let start = this.index;
			if (this.eat(91)) {
				let negate = this.eat(94);
				this.onCharacterClassEnter(start, negate, !0);
				let result = this.consumeClassContents();
				return this.eat(93) || this.raise("Unterminated character class"), negate && result.mayContainStrings && this.raise("Negated character class may contain strings"), this.onCharacterClassLeave(start, this.index, negate), result;
			}
			if (this.eat(92)) {
				let result = this.consumeCharacterClassEscape();
				if (result) return result;
				this.rewind(start);
			}
			return null;
		}
		consumeClassStringDisjunction() {
			let start = this.index;
			if (this.eat3(92, 113, 123)) {
				this.onClassStringDisjunctionEnter(start);
				let i = 0, mayContainStrings = !1;
				do
					this.consumeClassString(i++).mayContainStrings && (mayContainStrings = !0);
				while (this.eat(124));
				if (this.eat(125)) return this.onClassStringDisjunctionLeave(start, this.index), { mayContainStrings };
				this.raise("Unterminated class string disjunction");
			}
			return null;
		}
		consumeClassString(i) {
			let start = this.index, count = 0;
			for (this.onStringAlternativeEnter(start, i); this.currentCodePoint !== -1 && this.consumeClassSetCharacter();) count++;
			return this.onStringAlternativeLeave(start, this.index, i), { mayContainStrings: count !== 1 };
		}
		consumeClassSetCharacter() {
			let start = this.index, cp = this.currentCodePoint;
			if ((cp !== this.nextCodePoint || !isClassSetReservedDoublePunctuatorCharacter(cp)) && cp !== -1 && !isClassSetSyntaxCharacter(cp)) return this._lastIntValue = cp, this.advance(), this.onCharacter(start, this.index, this._lastIntValue), !0;
			if (this.eat(92)) {
				if (this.consumeCharacterEscape()) return !0;
				if (isClassSetReservedPunctuator(this.currentCodePoint)) return this._lastIntValue = this.currentCodePoint, this.advance(), this.onCharacter(start, this.index, this._lastIntValue), !0;
				if (this.eat(98)) return this._lastIntValue = 8, this.onCharacter(start, this.index, this._lastIntValue), !0;
				this.rewind(start);
			}
			return !1;
		}
		eatGroupName() {
			if (this.eat(60)) {
				if (this.eatRegExpIdentifierName() && this.eat(62)) return !0;
				this.raise("Invalid capture group name");
			}
			return !1;
		}
		eatRegExpIdentifierName() {
			if (this.eatRegExpIdentifierStart()) {
				for (this._lastStrValue = String.fromCodePoint(this._lastIntValue); this.eatRegExpIdentifierPart();) this._lastStrValue += String.fromCodePoint(this._lastIntValue);
				return !0;
			}
			return !1;
		}
		eatRegExpIdentifierStart() {
			let start = this.index, forceUFlag = !this._unicodeMode && this.ecmaVersion >= 2020, cp = this.currentCodePoint;
			return this.advance(), cp === 92 && this.eatRegExpUnicodeEscapeSequence(forceUFlag) ? cp = this._lastIntValue : forceUFlag && isLeadSurrogate(cp) && isTrailSurrogate(this.currentCodePoint) && (cp = combineSurrogatePair(cp, this.currentCodePoint), this.advance()), isIdentifierStartChar(cp) ? (this._lastIntValue = cp, !0) : (this.index !== start && this.rewind(start), !1);
		}
		eatRegExpIdentifierPart() {
			let start = this.index, forceUFlag = !this._unicodeMode && this.ecmaVersion >= 2020, cp = this.currentCodePoint;
			return this.advance(), cp === 92 && this.eatRegExpUnicodeEscapeSequence(forceUFlag) ? cp = this._lastIntValue : forceUFlag && isLeadSurrogate(cp) && isTrailSurrogate(this.currentCodePoint) && (cp = combineSurrogatePair(cp, this.currentCodePoint), this.advance()), isIdentifierPartChar(cp) ? (this._lastIntValue = cp, !0) : (this.index !== start && this.rewind(start), !1);
		}
		eatCControlLetter() {
			let start = this.index;
			if (this.eat(99)) {
				if (this.eatControlLetter()) return !0;
				this.rewind(start);
			}
			return !1;
		}
		eatZero() {
			return this.currentCodePoint === 48 && !isDecimalDigit(this.nextCodePoint) ? (this._lastIntValue = 0, this.advance(), !0) : !1;
		}
		eatControlEscape() {
			return this.eat(102) ? (this._lastIntValue = 12, !0) : this.eat(110) ? (this._lastIntValue = 10, !0) : this.eat(114) ? (this._lastIntValue = 13, !0) : this.eat(116) ? (this._lastIntValue = 9, !0) : this.eat(118) ? (this._lastIntValue = 11, !0) : !1;
		}
		eatControlLetter() {
			let cp = this.currentCodePoint;
			return isLatinLetter(cp) ? (this.advance(), this._lastIntValue = cp % 32, !0) : !1;
		}
		eatRegExpUnicodeEscapeSequence(forceUFlag = !1) {
			let start = this.index, uFlag = forceUFlag || this._unicodeMode;
			if (this.eat(117)) {
				if (uFlag && this.eatRegExpUnicodeSurrogatePairEscape() || this.eatFixedHexDigits(4) || uFlag && this.eatRegExpUnicodeCodePointEscape()) return !0;
				(this.strict || uFlag) && this.raise("Invalid unicode escape"), this.rewind(start);
			}
			return !1;
		}
		eatRegExpUnicodeSurrogatePairEscape() {
			let start = this.index;
			if (this.eatFixedHexDigits(4)) {
				let lead = this._lastIntValue;
				if (isLeadSurrogate(lead) && this.eat(92) && this.eat(117) && this.eatFixedHexDigits(4)) {
					let trail = this._lastIntValue;
					if (isTrailSurrogate(trail)) return this._lastIntValue = combineSurrogatePair(lead, trail), !0;
				}
				this.rewind(start);
			}
			return !1;
		}
		eatRegExpUnicodeCodePointEscape() {
			let start = this.index;
			return this.eat(123) && this.eatHexDigits() && this.eat(125) && isValidUnicode(this._lastIntValue) ? !0 : (this.rewind(start), !1);
		}
		eatIdentityEscape() {
			let cp = this.currentCodePoint;
			return this.isValidIdentityEscape(cp) ? (this._lastIntValue = cp, this.advance(), !0) : !1;
		}
		isValidIdentityEscape(cp) {
			return cp === -1 ? !1 : this._unicodeMode ? isSyntaxCharacter(cp) || cp === 47 : this.strict ? !isIdContinue(cp) : this._nFlag ? !(cp === 99 || cp === 107) : cp !== 99;
		}
		eatDecimalEscape() {
			this._lastIntValue = 0;
			let cp = this.currentCodePoint;
			if (cp >= 49 && cp <= 57) {
				do
					this._lastIntValue = 10 * this._lastIntValue + (cp - 48), this.advance();
				while ((cp = this.currentCodePoint) >= 48 && cp <= 57);
				return !0;
			}
			return !1;
		}
		eatUnicodePropertyValueExpression() {
			let start = this.index;
			if (this.eatUnicodePropertyName() && this.eat(61)) {
				let key = this._lastStrValue;
				if (this.eatUnicodePropertyValue()) {
					let value = this._lastStrValue;
					if (isValidUnicodeProperty(this.ecmaVersion, key, value)) return {
						key,
						value: value || null
					};
					this.raise("Invalid property name");
				}
			}
			if (this.rewind(start), this.eatLoneUnicodePropertyNameOrValue()) {
				let nameOrValue = this._lastStrValue;
				if (isValidUnicodeProperty(this.ecmaVersion, "General_Category", nameOrValue)) return {
					key: "General_Category",
					value: nameOrValue || null
				};
				if (isValidLoneUnicodeProperty(this.ecmaVersion, nameOrValue)) return {
					key: nameOrValue,
					value: null
				};
				if (this._unicodeSetsMode && isValidLoneUnicodePropertyOfString(this.ecmaVersion, nameOrValue)) return {
					key: nameOrValue,
					value: null,
					strings: !0
				};
				this.raise("Invalid property name");
			}
			return null;
		}
		eatUnicodePropertyName() {
			for (this._lastStrValue = ""; isUnicodePropertyNameCharacter(this.currentCodePoint);) this._lastStrValue += String.fromCodePoint(this.currentCodePoint), this.advance();
			return this._lastStrValue !== "";
		}
		eatUnicodePropertyValue() {
			for (this._lastStrValue = ""; isUnicodePropertyValueCharacter(this.currentCodePoint);) this._lastStrValue += String.fromCodePoint(this.currentCodePoint), this.advance();
			return this._lastStrValue !== "";
		}
		eatLoneUnicodePropertyNameOrValue() {
			return this.eatUnicodePropertyValue();
		}
		eatHexEscapeSequence() {
			let start = this.index;
			if (this.eat(120)) {
				if (this.eatFixedHexDigits(2)) return !0;
				(this._unicodeMode || this.strict) && this.raise("Invalid escape"), this.rewind(start);
			}
			return !1;
		}
		eatDecimalDigits() {
			let start = this.index;
			for (this._lastIntValue = 0; isDecimalDigit(this.currentCodePoint);) this._lastIntValue = 10 * this._lastIntValue + digitToInt(this.currentCodePoint), this.advance();
			return this.index !== start;
		}
		eatHexDigits() {
			let start = this.index;
			for (this._lastIntValue = 0; isHexDigit(this.currentCodePoint);) this._lastIntValue = 16 * this._lastIntValue + digitToInt(this.currentCodePoint), this.advance();
			return this.index !== start;
		}
		eatLegacyOctalEscapeSequence() {
			if (this.eatOctalDigit()) {
				let n1 = this._lastIntValue;
				if (this.eatOctalDigit()) {
					let n2 = this._lastIntValue;
					n1 <= 3 && this.eatOctalDigit() ? this._lastIntValue = n1 * 64 + n2 * 8 + this._lastIntValue : this._lastIntValue = n1 * 8 + n2;
				} else this._lastIntValue = n1;
				return !0;
			}
			return !1;
		}
		eatOctalDigit() {
			let cp = this.currentCodePoint;
			return isOctalDigit(cp) ? (this.advance(), this._lastIntValue = cp - 48, !0) : (this._lastIntValue = 0, !1);
		}
		eatFixedHexDigits(length) {
			let start = this.index;
			this._lastIntValue = 0;
			for (let i = 0; i < length; ++i) {
				let cp = this.currentCodePoint;
				if (!isHexDigit(cp)) return this.rewind(start), !1;
				this._lastIntValue = 16 * this._lastIntValue + digitToInt(cp), this.advance();
			}
			return !0;
		}
		eatModifiers() {
			let ate = !1;
			for (; isRegularExpressionModifier(this.currentCodePoint);) this.advance(), ate = !0;
			return ate;
		}
		parseModifiers(start, end) {
			let { ignoreCase, multiline, dotAll } = this.parseFlags(this._reader.source, start, end);
			return {
				ignoreCase,
				multiline,
				dotAll
			};
		}
		parseFlags(source, start, end) {
			let flags = {
				global: !1,
				ignoreCase: !1,
				multiline: !1,
				unicode: !1,
				sticky: !1,
				dotAll: !1,
				hasIndices: !1,
				unicodeSets: !1
			}, validFlags = /* @__PURE__ */ new Set();
			validFlags.add(103), validFlags.add(105), validFlags.add(109), this.ecmaVersion >= 2015 && (validFlags.add(117), validFlags.add(121), this.ecmaVersion >= 2018 && (validFlags.add(115), this.ecmaVersion >= 2022 && (validFlags.add(100), this.ecmaVersion >= 2024 && validFlags.add(118))));
			for (let i = start; i < end; ++i) {
				let flag = source.charCodeAt(i);
				if (validFlags.has(flag)) {
					let prop = FLAG_CODEPOINT_TO_PROP[flag];
					flags[prop] && this.raise(`Duplicated flag '${source[i]}'`, { index: start }), flags[prop] = !0;
				} else this.raise(`Invalid flag '${source[i]}'`, { index: start });
			}
			return flags;
		}
	};
	let DUMMY_PATTERN = {}, DUMMY_FLAGS = {}, DUMMY_CAPTURING_GROUP = {};
	function isClassSetOperand(node) {
		return node.type === "Character" || node.type === "CharacterSet" || node.type === "CharacterClass" || node.type === "ExpressionCharacterClass" || node.type === "ClassStringDisjunction";
	}
	var RegExpParserState = class {
		constructor(options) {
			this._node = DUMMY_PATTERN, this._expressionBufferMap = /* @__PURE__ */ new Map(), this._flags = DUMMY_FLAGS, this._backreferences = [], this._capturingGroups = [], this.source = "", this.strict = !!options?.strict, this.ecmaVersion = options?.ecmaVersion ?? latestEcmaVersion;
		}
		get pattern() {
			if (this._node.type !== "Pattern") throw Error("UnknownError");
			return this._node;
		}
		get flags() {
			if (this._flags.type !== "Flags") throw Error("UnknownError");
			return this._flags;
		}
		onRegExpFlags(start, end, { global, ignoreCase, multiline, unicode, sticky, dotAll, hasIndices, unicodeSets }) {
			this._flags = {
				type: "Flags",
				parent: null,
				start,
				end,
				raw: this.source.slice(start, end),
				global,
				ignoreCase,
				multiline,
				unicode,
				sticky,
				dotAll,
				hasIndices,
				unicodeSets
			};
		}
		onPatternEnter(start) {
			this._node = {
				type: "Pattern",
				parent: null,
				start,
				end: start,
				raw: "",
				alternatives: []
			}, this._backreferences.length = 0, this._capturingGroups.length = 0;
		}
		onPatternLeave(start, end) {
			this._node.end = end, this._node.raw = this.source.slice(start, end);
			for (let reference of this._backreferences) {
				let ref = reference.ref, groups = typeof ref == "number" ? [this._capturingGroups[ref - 1]] : this._capturingGroups.filter((g) => g.name === ref);
				if (groups.length === 1) {
					let group = groups[0];
					reference.ambiguous = !1, reference.resolved = group;
				} else reference.ambiguous = !0, reference.resolved = groups;
				for (let group of groups) group.references.push(reference);
			}
		}
		onAlternativeEnter(start) {
			let parent = this._node;
			if (parent.type !== "Assertion" && parent.type !== "CapturingGroup" && parent.type !== "Group" && parent.type !== "Pattern") throw Error("UnknownError");
			this._node = {
				type: "Alternative",
				parent,
				start,
				end: start,
				raw: "",
				elements: []
			}, parent.alternatives.push(this._node);
		}
		onAlternativeLeave(start, end) {
			let node = this._node;
			if (node.type !== "Alternative") throw Error("UnknownError");
			node.end = end, node.raw = this.source.slice(start, end), this._node = node.parent;
		}
		onGroupEnter(start) {
			let parent = this._node;
			if (parent.type !== "Alternative") throw Error("UnknownError");
			this._node = {
				type: "Group",
				parent,
				start,
				end: start,
				raw: "",
				modifiers: null,
				alternatives: []
			}, parent.elements.push(this._node);
		}
		onGroupLeave(start, end) {
			let node = this._node;
			if (node.type !== "Group" || node.parent.type !== "Alternative") throw Error("UnknownError");
			node.end = end, node.raw = this.source.slice(start, end), this._node = node.parent;
		}
		onModifiersEnter(start) {
			let parent = this._node;
			if (parent.type !== "Group") throw Error("UnknownError");
			this._node = {
				type: "Modifiers",
				parent,
				start,
				end: start,
				raw: "",
				add: null,
				remove: null
			}, parent.modifiers = this._node;
		}
		onModifiersLeave(start, end) {
			let node = this._node;
			if (node.type !== "Modifiers" || node.parent.type !== "Group") throw Error("UnknownError");
			node.end = end, node.raw = this.source.slice(start, end), this._node = node.parent;
		}
		onAddModifiers(start, end, { ignoreCase, multiline, dotAll }) {
			let parent = this._node;
			if (parent.type !== "Modifiers") throw Error("UnknownError");
			parent.add = {
				type: "ModifierFlags",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				ignoreCase,
				multiline,
				dotAll
			};
		}
		onRemoveModifiers(start, end, { ignoreCase, multiline, dotAll }) {
			let parent = this._node;
			if (parent.type !== "Modifiers") throw Error("UnknownError");
			parent.remove = {
				type: "ModifierFlags",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				ignoreCase,
				multiline,
				dotAll
			};
		}
		onCapturingGroupEnter(start, name) {
			let parent = this._node;
			if (parent.type !== "Alternative") throw Error("UnknownError");
			this._node = {
				type: "CapturingGroup",
				parent,
				start,
				end: start,
				raw: "",
				name,
				alternatives: [],
				references: []
			}, parent.elements.push(this._node), this._capturingGroups.push(this._node);
		}
		onCapturingGroupLeave(start, end) {
			let node = this._node;
			if (node.type !== "CapturingGroup" || node.parent.type !== "Alternative") throw Error("UnknownError");
			node.end = end, node.raw = this.source.slice(start, end), this._node = node.parent;
		}
		onQuantifier(start, end, min, max, greedy) {
			let parent = this._node;
			if (parent.type !== "Alternative") throw Error("UnknownError");
			let element = parent.elements.pop();
			if (element == null || element.type === "Quantifier" || element.type === "Assertion" && element.kind !== "lookahead") throw Error("UnknownError");
			let node = {
				type: "Quantifier",
				parent,
				start: element.start,
				end,
				raw: this.source.slice(element.start, end),
				min,
				max,
				greedy,
				element
			};
			parent.elements.push(node), element.parent = node;
		}
		onLookaroundAssertionEnter(start, kind, negate) {
			let parent = this._node;
			if (parent.type !== "Alternative") throw Error("UnknownError");
			let node = this._node = {
				type: "Assertion",
				parent,
				start,
				end: start,
				raw: "",
				kind,
				negate,
				alternatives: []
			};
			parent.elements.push(node);
		}
		onLookaroundAssertionLeave(start, end) {
			let node = this._node;
			if (node.type !== "Assertion" || node.parent.type !== "Alternative") throw Error("UnknownError");
			node.end = end, node.raw = this.source.slice(start, end), this._node = node.parent;
		}
		onEdgeAssertion(start, end, kind) {
			let parent = this._node;
			if (parent.type !== "Alternative") throw Error("UnknownError");
			parent.elements.push({
				type: "Assertion",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				kind
			});
		}
		onWordBoundaryAssertion(start, end, kind, negate) {
			let parent = this._node;
			if (parent.type !== "Alternative") throw Error("UnknownError");
			parent.elements.push({
				type: "Assertion",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				kind,
				negate
			});
		}
		onAnyCharacterSet(start, end, kind) {
			let parent = this._node;
			if (parent.type !== "Alternative") throw Error("UnknownError");
			parent.elements.push({
				type: "CharacterSet",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				kind
			});
		}
		onEscapeCharacterSet(start, end, kind, negate) {
			let parent = this._node;
			if (parent.type !== "Alternative" && parent.type !== "CharacterClass") throw Error("UnknownError");
			parent.elements.push({
				type: "CharacterSet",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				kind,
				negate
			});
		}
		onUnicodePropertyCharacterSet(start, end, kind, key, value, negate, strings) {
			let parent = this._node;
			if (parent.type !== "Alternative" && parent.type !== "CharacterClass") throw Error("UnknownError");
			let base = {
				type: "CharacterSet",
				parent: null,
				start,
				end,
				raw: this.source.slice(start, end),
				kind,
				strings: null,
				key
			};
			if (strings) {
				if (parent.type === "CharacterClass" && !parent.unicodeSets || negate || value !== null) throw Error("UnknownError");
				parent.elements.push(Object.assign(Object.assign({}, base), {
					parent,
					strings,
					value,
					negate
				}));
			} else parent.elements.push(Object.assign(Object.assign({}, base), {
				parent,
				strings,
				value,
				negate
			}));
		}
		onCharacter(start, end, value) {
			let parent = this._node;
			if (parent.type !== "Alternative" && parent.type !== "CharacterClass" && parent.type !== "StringAlternative") throw Error("UnknownError");
			parent.elements.push({
				type: "Character",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				value
			});
		}
		onBackreference(start, end, ref) {
			let parent = this._node;
			if (parent.type !== "Alternative") throw Error("UnknownError");
			let node = {
				type: "Backreference",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				ref,
				ambiguous: !1,
				resolved: DUMMY_CAPTURING_GROUP
			};
			parent.elements.push(node), this._backreferences.push(node);
		}
		onCharacterClassEnter(start, negate, unicodeSets) {
			let parent = this._node, base = {
				type: "CharacterClass",
				parent,
				start,
				end: start,
				raw: "",
				unicodeSets,
				negate,
				elements: []
			};
			if (parent.type === "Alternative") {
				let node = Object.assign(Object.assign({}, base), { parent });
				this._node = node, parent.elements.push(node);
			} else if (parent.type === "CharacterClass" && parent.unicodeSets && unicodeSets) {
				let node = Object.assign(Object.assign({}, base), {
					parent,
					unicodeSets
				});
				this._node = node, parent.elements.push(node);
			} else throw Error("UnknownError");
		}
		onCharacterClassLeave(start, end) {
			let node = this._node;
			if (node.type !== "CharacterClass" || node.parent.type !== "Alternative" && node.parent.type !== "CharacterClass") throw Error("UnknownError");
			let parent = node.parent;
			node.end = end, node.raw = this.source.slice(start, end), this._node = parent;
			let expression = this._expressionBufferMap.get(node);
			if (!expression) return;
			if (node.elements.length > 0) throw Error("UnknownError");
			this._expressionBufferMap.delete(node);
			let newNode = {
				type: "ExpressionCharacterClass",
				parent,
				start: node.start,
				end: node.end,
				raw: node.raw,
				negate: node.negate,
				expression
			};
			if (expression.parent = newNode, node !== parent.elements.pop()) throw Error("UnknownError");
			parent.elements.push(newNode);
		}
		onCharacterClassRange(start, end) {
			let parent = this._node;
			if (parent.type !== "CharacterClass") throw Error("UnknownError");
			let elements = parent.elements, max = elements.pop();
			if (!max || max.type !== "Character") throw Error("UnknownError");
			if (!parent.unicodeSets) {
				let hyphen = elements.pop();
				if (!hyphen || hyphen.type !== "Character" || hyphen.value !== 45) throw Error("UnknownError");
			}
			let min = elements.pop();
			if (!min || min.type !== "Character") throw Error("UnknownError");
			let node = {
				type: "CharacterClassRange",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				min,
				max
			};
			min.parent = node, max.parent = node, elements.push(node);
		}
		onClassIntersection(start, end) {
			let parent = this._node;
			if (parent.type !== "CharacterClass" || !parent.unicodeSets) throw Error("UnknownError");
			let right = parent.elements.pop(), left = this._expressionBufferMap.get(parent) ?? parent.elements.pop();
			if (!left || !right || left.type === "ClassSubtraction" || left.type !== "ClassIntersection" && !isClassSetOperand(left) || !isClassSetOperand(right)) throw Error("UnknownError");
			let node = {
				type: "ClassIntersection",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				left,
				right
			};
			left.parent = node, right.parent = node, this._expressionBufferMap.set(parent, node);
		}
		onClassSubtraction(start, end) {
			let parent = this._node;
			if (parent.type !== "CharacterClass" || !parent.unicodeSets) throw Error("UnknownError");
			let right = parent.elements.pop(), left = this._expressionBufferMap.get(parent) ?? parent.elements.pop();
			if (!left || !right || left.type === "ClassIntersection" || left.type !== "ClassSubtraction" && !isClassSetOperand(left) || !isClassSetOperand(right)) throw Error("UnknownError");
			let node = {
				type: "ClassSubtraction",
				parent,
				start,
				end,
				raw: this.source.slice(start, end),
				left,
				right
			};
			left.parent = node, right.parent = node, this._expressionBufferMap.set(parent, node);
		}
		onClassStringDisjunctionEnter(start) {
			let parent = this._node;
			if (parent.type !== "CharacterClass" || !parent.unicodeSets) throw Error("UnknownError");
			this._node = {
				type: "ClassStringDisjunction",
				parent,
				start,
				end: start,
				raw: "",
				alternatives: []
			}, parent.elements.push(this._node);
		}
		onClassStringDisjunctionLeave(start, end) {
			let node = this._node;
			if (node.type !== "ClassStringDisjunction" || node.parent.type !== "CharacterClass") throw Error("UnknownError");
			node.end = end, node.raw = this.source.slice(start, end), this._node = node.parent;
		}
		onStringAlternativeEnter(start) {
			let parent = this._node;
			if (parent.type !== "ClassStringDisjunction") throw Error("UnknownError");
			this._node = {
				type: "StringAlternative",
				parent,
				start,
				end: start,
				raw: "",
				elements: []
			}, parent.alternatives.push(this._node);
		}
		onStringAlternativeLeave(start, end) {
			let node = this._node;
			if (node.type !== "StringAlternative") throw Error("UnknownError");
			node.end = end, node.raw = this.source.slice(start, end), this._node = node.parent;
		}
	}, RegExpParser = class {
		constructor(options) {
			this._state = new RegExpParserState(options), this._validator = new RegExpValidator(this._state);
		}
		parseLiteral(source, start = 0, end = source.length) {
			this._state.source = source, this._validator.validateLiteral(source, start, end);
			let pattern = this._state.pattern, flags = this._state.flags, literal = {
				type: "RegExpLiteral",
				parent: null,
				start,
				end,
				raw: source,
				pattern,
				flags
			};
			return pattern.parent = literal, flags.parent = literal, literal;
		}
		parseFlags(source, start = 0, end = source.length) {
			return this._state.source = source, this._validator.validateFlags(source, start, end), this._state.flags;
		}
		parsePattern(source, start = 0, end = source.length, uFlagOrFlags = void 0) {
			return this._state.source = source, this._validator.validatePattern(source, start, end, uFlagOrFlags), this._state.pattern;
		}
	}, RegExpVisitor = class {
		constructor(handlers) {
			this._handlers = handlers;
		}
		visit(node) {
			switch (node.type) {
				case "Alternative":
					this.visitAlternative(node);
					break;
				case "Assertion":
					this.visitAssertion(node);
					break;
				case "Backreference":
					this.visitBackreference(node);
					break;
				case "CapturingGroup":
					this.visitCapturingGroup(node);
					break;
				case "Character":
					this.visitCharacter(node);
					break;
				case "CharacterClass":
					this.visitCharacterClass(node);
					break;
				case "CharacterClassRange":
					this.visitCharacterClassRange(node);
					break;
				case "CharacterSet":
					this.visitCharacterSet(node);
					break;
				case "ClassIntersection":
					this.visitClassIntersection(node);
					break;
				case "ClassStringDisjunction":
					this.visitClassStringDisjunction(node);
					break;
				case "ClassSubtraction":
					this.visitClassSubtraction(node);
					break;
				case "ExpressionCharacterClass":
					this.visitExpressionCharacterClass(node);
					break;
				case "Flags":
					this.visitFlags(node);
					break;
				case "Group":
					this.visitGroup(node);
					break;
				case "Modifiers":
					this.visitModifiers(node);
					break;
				case "ModifierFlags":
					this.visitModifierFlags(node);
					break;
				case "Pattern":
					this.visitPattern(node);
					break;
				case "Quantifier":
					this.visitQuantifier(node);
					break;
				case "RegExpLiteral":
					this.visitRegExpLiteral(node);
					break;
				case "StringAlternative":
					this.visitStringAlternative(node);
					break;
				default: throw Error(`Unknown type: ${node.type}`);
			}
		}
		visitAlternative(node) {
			this._handlers.onAlternativeEnter && this._handlers.onAlternativeEnter(node), node.elements.forEach(this.visit, this), this._handlers.onAlternativeLeave && this._handlers.onAlternativeLeave(node);
		}
		visitAssertion(node) {
			this._handlers.onAssertionEnter && this._handlers.onAssertionEnter(node), (node.kind === "lookahead" || node.kind === "lookbehind") && node.alternatives.forEach(this.visit, this), this._handlers.onAssertionLeave && this._handlers.onAssertionLeave(node);
		}
		visitBackreference(node) {
			this._handlers.onBackreferenceEnter && this._handlers.onBackreferenceEnter(node), this._handlers.onBackreferenceLeave && this._handlers.onBackreferenceLeave(node);
		}
		visitCapturingGroup(node) {
			this._handlers.onCapturingGroupEnter && this._handlers.onCapturingGroupEnter(node), node.alternatives.forEach(this.visit, this), this._handlers.onCapturingGroupLeave && this._handlers.onCapturingGroupLeave(node);
		}
		visitCharacter(node) {
			this._handlers.onCharacterEnter && this._handlers.onCharacterEnter(node), this._handlers.onCharacterLeave && this._handlers.onCharacterLeave(node);
		}
		visitCharacterClass(node) {
			this._handlers.onCharacterClassEnter && this._handlers.onCharacterClassEnter(node), node.elements.forEach(this.visit, this), this._handlers.onCharacterClassLeave && this._handlers.onCharacterClassLeave(node);
		}
		visitCharacterClassRange(node) {
			this._handlers.onCharacterClassRangeEnter && this._handlers.onCharacterClassRangeEnter(node), this.visitCharacter(node.min), this.visitCharacter(node.max), this._handlers.onCharacterClassRangeLeave && this._handlers.onCharacterClassRangeLeave(node);
		}
		visitCharacterSet(node) {
			this._handlers.onCharacterSetEnter && this._handlers.onCharacterSetEnter(node), this._handlers.onCharacterSetLeave && this._handlers.onCharacterSetLeave(node);
		}
		visitClassIntersection(node) {
			this._handlers.onClassIntersectionEnter && this._handlers.onClassIntersectionEnter(node), this.visit(node.left), this.visit(node.right), this._handlers.onClassIntersectionLeave && this._handlers.onClassIntersectionLeave(node);
		}
		visitClassStringDisjunction(node) {
			this._handlers.onClassStringDisjunctionEnter && this._handlers.onClassStringDisjunctionEnter(node), node.alternatives.forEach(this.visit, this), this._handlers.onClassStringDisjunctionLeave && this._handlers.onClassStringDisjunctionLeave(node);
		}
		visitClassSubtraction(node) {
			this._handlers.onClassSubtractionEnter && this._handlers.onClassSubtractionEnter(node), this.visit(node.left), this.visit(node.right), this._handlers.onClassSubtractionLeave && this._handlers.onClassSubtractionLeave(node);
		}
		visitExpressionCharacterClass(node) {
			this._handlers.onExpressionCharacterClassEnter && this._handlers.onExpressionCharacterClassEnter(node), this.visit(node.expression), this._handlers.onExpressionCharacterClassLeave && this._handlers.onExpressionCharacterClassLeave(node);
		}
		visitFlags(node) {
			this._handlers.onFlagsEnter && this._handlers.onFlagsEnter(node), this._handlers.onFlagsLeave && this._handlers.onFlagsLeave(node);
		}
		visitGroup(node) {
			this._handlers.onGroupEnter && this._handlers.onGroupEnter(node), node.modifiers && this.visit(node.modifiers), node.alternatives.forEach(this.visit, this), this._handlers.onGroupLeave && this._handlers.onGroupLeave(node);
		}
		visitModifiers(node) {
			this._handlers.onModifiersEnter && this._handlers.onModifiersEnter(node), node.add && this.visit(node.add), node.remove && this.visit(node.remove), this._handlers.onModifiersLeave && this._handlers.onModifiersLeave(node);
		}
		visitModifierFlags(node) {
			this._handlers.onModifierFlagsEnter && this._handlers.onModifierFlagsEnter(node), this._handlers.onModifierFlagsLeave && this._handlers.onModifierFlagsLeave(node);
		}
		visitPattern(node) {
			this._handlers.onPatternEnter && this._handlers.onPatternEnter(node), node.alternatives.forEach(this.visit, this), this._handlers.onPatternLeave && this._handlers.onPatternLeave(node);
		}
		visitQuantifier(node) {
			this._handlers.onQuantifierEnter && this._handlers.onQuantifierEnter(node), this.visit(node.element), this._handlers.onQuantifierLeave && this._handlers.onQuantifierLeave(node);
		}
		visitRegExpLiteral(node) {
			this._handlers.onRegExpLiteralEnter && this._handlers.onRegExpLiteralEnter(node), this.visitPattern(node.pattern), this.visitFlags(node.flags), this._handlers.onRegExpLiteralLeave && this._handlers.onRegExpLiteralLeave(node);
		}
		visitStringAlternative(node) {
			this._handlers.onStringAlternativeEnter && this._handlers.onStringAlternativeEnter(node), node.elements.forEach(this.visit, this), this._handlers.onStringAlternativeLeave && this._handlers.onStringAlternativeLeave(node);
		}
	};
	function parseRegExpLiteral(source, options) {
		return new RegExpParser(options).parseLiteral(String(source));
	}
	function validateRegExpLiteral(source, options) {
		new RegExpValidator(options).validateLiteral(source);
	}
	function visitRegExpAST(node, handlers) {
		new RegExpVisitor(handlers).visit(node);
	}
	exports.AST = ast, exports.RegExpParser = RegExpParser, exports.RegExpSyntaxError = RegExpSyntaxError, exports.RegExpValidator = RegExpValidator, exports.parseRegExpLiteral = parseRegExpLiteral, exports.validateRegExpLiteral = validateRegExpLiteral, exports.visitRegExpAST = visitRegExpAST;
}));
//#endregion
Object.defineProperty(exports, "t", {
	enumerable: !0,
	get: function() {
		return require_regexpp;
	}
});
