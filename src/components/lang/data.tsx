// That's Will Set The Lang Cookie To Cookie
function setCookie(key: string, value: string, expiry: number) {
    const expires = new Date();
    expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
}

// To Render The Table Of Lang
export const gridItem = (product: any) => {
    return (
        <div
            className="bg-white col-span-6 sm:col-span-6 md:col-span-4 xl:col-span-3 cursor-pointer p-2"
            onClick={() => {
                // To ensure the language of the page changed
                setCookie("googtrans", `/en/${product.code}`, 1);
                localStorage.setItem("lang", product.lang_code || "ar-AE");

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }}
        >
            <div className="flex items-center mb-3">
                <img
                    src={`https://github.com/ProNabowy/countries_Flags/blob/main/${product.name}.png?raw=true`}
                    loading="lazy"
                    alt={product.name}
                    className="w-[30px] h-[20px] object-cover me-3 shadow-lg"
                />

                <h2 className="font-medium text-[11px] sm:text-[16px]">
                    {product.name === "saudi"
                        ? "العربية السعودية"
                        : product?.name}
                </h2>
            </div>
        </div>
    );
};

// Lang data
export const data = [
    { code: "en", lang_code: "en-GB", name: "English" },
    { code: "ar", lang_code: "ar-AE", name: "saudi" },
    { code: "af", lang_code: "ar-AE", name: "Afrikaans" },
    { code: "sq", lang_code: "ar-AE", name: "Albanian" },
    { code: "am", lang_code: "ar-AE", name: "Amharic" },
    { code: "hy", lang_code: "ar-AE", name: "Armenian" },
    { code: "as", lang_code: "ar-AE", name: "Assamese" },
    { code: "ay", lang_code: "ar-AE", name: "Aymara" },
    { code: "az", lang_code: "ar-AE", name: "Azerbaijani" },
    { code: "bm", lang_code: "ar-AE", name: "Bambara" },
    { code: "eu", lang_code: "ar-AE", name: "Basque" },
    { code: "be", lang_code: "ar-AE", name: "Belarusian" },
    { code: "bn", lang_code: "ar-AE", name: "Bengali" },
    { code: "bho", lang_code: "ar-AE", name: "Bhojpuri" },
    { code: "bs", lang_code: "ar-AE", name: "Bosnian" },
    { code: "bg", lang_code: "bg-BG", name: "Bulgarian" },
    { code: "ca", lang_code: "ar-AE", name: "Catalan" },
    { code: "ceb", lang_code: "ar-AE", name: "Cebuano" },
    { code: "ny", lang_code: "ar-AE", name: "Chichewa" },
    { code: "zh-CN", lang_code: "zh-CN", name: "Chinese (Simplified)" },
    { code: "zh-TW", lang_code: "zh-TW", name: "Chinese (Traditional)" },
    { code: "co", lang_code: "ar-AE", name: "Corsican" },
    { code: "hr", lang_code: "ar-AE", name: "Croatian" },
    { code: "cs", lang_code: "cs-CZ", name: "Czech" },
    { code: "da", lang_code: "ar-AE", name: "Danish" },
    { code: "dv", lang_code: "ar-AE", name: "Dhivehi" },
    { code: "doi", lang_code: "da-DK", name: "Dogri" },
    { code: "nl", lang_code: "nl-NL", name: "Dutch" },
    { code: "eo", lang_code: "ar-AE", name: "Esperanto" },
    { code: "et", lang_code: "ar-AE", name: "Estonian" },
    { code: "ee", lang_code: "ar-AE", name: "Ewe" },
    { code: "tl", lang_code: "tl-PH", name: "Filipino" },
    { code: "fi", lang_code: "fi-FI", name: "Finnish" },
    { code: "fr", lang_code: "fr-FR", name: "French" },
    { code: "fy", lang_code: "ar-AE", name: "Frisian" },
    { code: "gl", lang_code: "ar-AE", name: "Galician" },
    { code: "ka", lang_code: "ar-AE", name: "Georgian" },
    { code: "de", lang_code: "de-DE", name: "German" },
    { code: "el", lang_code: "el-GR", name: "Greek" },
    { code: "gn", lang_code: "ar-AE", name: "Guarani" },
    { code: "gu", lang_code: "ar-AE", name: "Gujarati" },
    { code: "ht", lang_code: "ar-AE", name: "Haitian Creole" },
    { code: "ha", lang_code: "ar-AE", name: "Hausa" },
    { code: "haw", lang_code: "ar-AE", name: "Hawaiian" },
    { code: "hi", lang_code: "hi-IN", name: "Hindi" },
    { code: "hmn", lang_code: "ar-AE", name: "Hmong" },
    { code: "hu", lang_code: "hu-HU", name: "Hungarian" },
    { code: "is", lang_code: "ar-AE", name: "Icelandic" },
    { code: "ig", lang_code: "ar-AE", name: "Igbo" },
    { code: "ilo", lang_code: "ar-AE", name: "Ilocano" },
    { code: "id", lang_code: "id-ID", name: "Indonesian" },
    { code: "ga", lang_code: "ar-AE", name: "Irish" },
    { code: "it", lang_code: "it-IT", name: "Italian" },
    { code: "ja", lang_code: "ja-JP", name: "Japanese" },
    { code: "jw", lang_code: "ar-AE", name: "Javanese" },
    { code: "kn", lang_code: "ar-AE", name: "Kannada" },
    { code: "kk", lang_code: "ar-AE", name: "Kazakh" },
    { code: "km", lang_code: "ar-AE", name: "Khmer" },
    { code: "rw", lang_code: "ar-AE", name: "Kinyarwanda" },
    { code: "gom", lang_code: "ar-AE", name: "Konkani" },
    { code: "ko", lang_code: "ko-KR", name: "Korean" },
    { code: "kri", lang_code: "ar-AE", name: "Krio" },
    { code: "ku", lang_code: "ar-AE", name: "Kurdish (Kurmanji)" },
    { code: "ckb", lang_code: "ar-AE", name: "Kurdish (Sorani)" },
    { code: "ky", lang_code: "ar-AE", name: "Kyrgyz" },
    { code: "lo", lang_code: "ar-AE", name: "Lao" },
    { code: "la", lang_code: "ar-AE", name: "Latin" },
    { code: "lv", lang_code: "ar-AE", name: "Latvian" },
    { code: "ln", lang_code: "ar-AE", name: "Lingala" },
    { code: "lt", lang_code: "ar-AE", name: "Lithuanian" },
    { code: "lg", lang_code: "ar-AE", name: "Luganda" },
    { code: "lb", lang_code: "ar-AE", name: "Luxembourgish" },
    { code: "mk", lang_code: "ar-AE", name: "Macedonian" },
    { code: "mai", lang_code: "ar-AE", name: "Maithili" },
    { code: "mg", lang_code: "ar-AE", name: "Malagasy" },
    { code: "ms", lang_code: "ms-MY", name: "Malay" },
    { code: "ml", lang_code: "ar-AE", name: "Malayalam" },
    { code: "mt", lang_code: "ar-AE", name: "Maltese" },
    { code: "mi", lang_code: "ar-AE", name: "Maori" },
    { code: "mr", lang_code: "ar-AE", name: "Marathi" },
    { code: "mni-Mtei", lang_code: "ar-AE", name: "Meiteilon (Manipuri)" },
    { code: "lus", lang_code: "ar-AE", name: "Mizo" },
    { code: "mn", lang_code: "ar-AE", name: "Mongolian" },
    { code: "my", lang_code: "ms-MY", name: "Myanmar (Burmese)" },
    { code: "ne", lang_code: "ar-AE", name: "Nepali" },
    { code: "no", lang_code: "nb-NO", name: "Norwegian" },
    { code: "or", lang_code: "ar-AE", name: "Odia (Oriya)" },
    { code: "om", lang_code: "ar-AE", name: "Oromo" },
    { code: "ps", lang_code: "ar-AE", name: "Pashto" },
    { code: "fa", lang_code: "ar-AE", name: "Persian" },
    { code: "pl", lang_code: "pl-PL", name: "Polish" },
    { code: "pt", lang_code: "pt-BR", name: "Portuguese" },
    { code: "pa", lang_code: "ar-AE", name: "Punjabi" },
    { code: "qu", lang_code: "ar-AE", name: "Quechua" },
    { code: "ro", lang_code: "ro-RO", name: "Romanian" },
    { code: "ru", lang_code: "ru-RU", name: "Russian" },
    { code: "sm", lang_code: "ar-AE", name: "Samoan" },
    { code: "sa", lang_code: "ar-AE", name: "Sanskrit" },
    { code: "gd", lang_code: "ar-AE", name: "Scots Gaelic" },
    { code: "nso", lang_code: "ar-AE", name: "Sepedi" },
    { code: "sr", lang_code: "ar-AE", name: "Serbian" },
    { code: "st", lang_code: "ar-AE", name: "Sesotho" },
    { code: "sn", lang_code: "ar-AE", name: "Shona" },
    { code: "sd", lang_code: "ar-AE", name: "Sindhi" },
    { code: "si", lang_code: "ar-AE", name: "Sinhala" },
    { code: "sk", lang_code: "ar-AE", name: "Slovak" },
    { code: "sl", lang_code: "ar-AE", name: "Slovenian" },
    { code: "so", lang_code: "ar-AE", name: "Somali" },
    { code: "es", lang_code: "es-ES", name: "Spanish" },
    { code: "su", lang_code: "ar-AE", name: "Sundanese" },
    { code: "sw", lang_code: "ar-AE", name: "Swahili" },
    { code: "sv", lang_code: "sv-SE", name: "Swedish" },
    { code: "tg", lang_code: "ar-AE", name: "Tajik" },
    { code: "ta", lang_code: "ar-AE", name: "Tamil" },
    { code: "tt", lang_code: "ar-AE", name: "Tatar" },
    { code: "te", lang_code: "ar-AE", name: "Telugu" },
    { code: "th", lang_code: "th-TH", name: "Thai" },
    { code: "ti", lang_code: "ar-AE", name: "Tigrinya" },
    { code: "ts", lang_code: "ar-AE", name: "Tsonga" },
    { code: "tr", lang_code: "tr-TR", name: "Turkish" },
    { code: "tk", lang_code: "ar-AE", name: "Turkmen" },
    { code: "ak", lang_code: "ar-AE", name: "Twi" },
    { code: "uk", lang_code: "uk-UA", name: "Ukrainian" },
    { code: "ur", lang_code: "ar-AE", name: "Urdu" },
    { code: "ug", lang_code: "ar-AE", name: "Uyghur" },
    { code: "uz", lang_code: "ar-AE", name: "Uzbek" },
    { code: "vi", lang_code: "vi-VN", name: "Vietnamese" },
    { code: "cy", lang_code: "ar-AE", name: "Welsh" },
    { code: "xh", lang_code: "ar-AE", name: "Xhosa" },
    { code: "yi", lang_code: "ar-AE", name: "Yiddish" },
    { code: "yo", lang_code: "ar-AE", name: "Yoruba" },
    { code: "zu", lang_code: "ar-AE", name: "Zulu" },
];
