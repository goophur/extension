// An array containing every parameter on the menu.
const paramsArr = [
    {
        name: "Search Term(s)",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_q=${value.replace(/\s+/g, "+")}` : ""}
    },
    {
        name: "Exact Match",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_epq=${value.replace(/\s+/g, "+")}` : ""}
    },
    {
        name: "Include Any",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_oq=%28${value.replace(/\s+/g, "+")}%29` : ""}
    },
    {
        name: "Exclude Each",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_eq=${value.replace(/\s+/g, "+")}` : ""}
    },
    {
        name: "Exclude Phrase",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_eq=%22${value.replace(/\s+/g, "+")}%22` : ""}
    },
    {
        name: "Numerical Range",
        type: "Range",
        value: ["", ""],
        querySegment: value => {
            const querySegment = value.map((val, index) => {
                if (index === 0) {
                    return val ? `&as_nlo=${val.replace(/[,\s]/g, "")}` : "";
                }
                return val ? `&as_nhi=${val.replace(/[,\s]/g, "")}` : "";
            }).join("");
            return querySegment;
        }
    },
    {
        name: "Range with Units",
        type: "RangeWithUnits",
        value: ["", "", ""],
        querySegment: value => {
            const querySegment = value.map((val, index) => {
                if (index === 0) {
                    return val ? `&as_nlo=${val.replace(/[,\s]/g, "")}` : "";
                } else if (index === 1) {
                    return val ? `&as_nhi=${val.replace(/[,\s]/g, "")}` : "";
                }
                return val ? `+${val.replace(/\s+/g, "")}` : "";
            }).join("");
            return querySegment;
        }
    },
    {
        name: "Dollar Amount Range",
        type: "Range",
        value: ["", ""],
        querySegment: value => {
            const querySegment = value.map((val, index) => {
                if (index === 0) {
                    return val ? `&as_nlo=$${val.replace(/[,\s]/g, "")}` : "";
                }
                return val ? `&as_nhi=$${val.replace(/[,\s]/g, "")}` : "";
            }).join("");
            return querySegment;
        }
    },
    {
        name: "Language",
        type: "Select",
        options: [
            {
                name: "Afrikaans",
                value: "af"
            },
            {
                name: "Arabic",
                value: "ar"
            },
            {
                name: "Armenian",
                value: "hy"
            },
            {
                name: "Belarusian",
                value: "be"
            },
            {
                name: "Bulgarian",
                value: "bg"
            },
            {
                name: "Croatian",
                value: "hr"
            },
            {
                name: "Czech",
                value: "cs"
            },
            {
                name: "Danish",
                value: "da"
            },
            {
                name: "Dutch",
                value: "nl"
            },
            {
                name: "English",
                value: "en"
            },
            {
                name: "Esperanto",
                value: "eo"
            },
            {
                name: "Estonian",
                value: "et"
            },
            {
                name: "Filipino",
                value: "tl"
            },
            {
                name: "Finnish",
                value: "fi"
            },
            {
                name: "French",
                value: "fr"
            },
            {
                name: "German",
                value: "de"
            },
            {
                name: "Greek",
                value: "el"
            },
            {
                name: "Hebrew",
                value: "iw"
            },
            {
                name: "Hungarian",
                value: "hu"
            },
            {
                name: "Icelandic",
                value: "is"
            },
            {
                name: "Indonesian",
                value: "id"
            },
            {
                name: "Italian",
                value: "it"
            },
            {
                name: "Japanese",
                value: "ja"
            },
            {
                name: "Korean",
                value: "ko"
            },
            {
                name: "Latvian",
                value: "lv"
            },
            {
                name: "Lithuanian",
                value: "lt"
            },
            {
                name: "Norwegian",
                value: "no"
            },
            {
                name: "Persian",
                value: "fa"
            },
            {
                name: "Polish",
                value: "pl"
            },
            {
                name: "Portuguese",
                value: "pt"
            },
            {
                name: "Romanian",
                value: "ro"
            },
            {
                name: "Russian",
                value: "ru"
            },
            {
                name: "Serbian",
                value: "sr"
            },
            {
                name: "Slovak",
                value: "sk"
            },
            {
                name: "Slovenian",
                value: "sl"
            },
            {
                name: "Spanish",
                value: "es"
            },
            {
                name: "Swedish",
                value: "sv"
            },
            {
                name: "Thai",
                value: "th"
            },
            {
                name: "Turkish",
                value: "tr"
            },
            {
                name: "Ukrainian",
                value: "uk"
            },
            {
                name: "Vietnamese",
                value: "vi"
            },
            {
                name: "Chinese Simplified",
                value: "zh-CN"
            },
            {
                name: "Chinese Traditional",
                value: "zh-TW"
            }
        ],
        value: "",
        querySegment: value => {return value ? `&lr=lang_${value}` : ""}
    },
    {
        name: "Region",
        type: "Select",
        options: [
            {
                name: "Afghanistan",
                value: "AF"
            },
            {
                name: "Albania",
                value: "AL"
            },
            {
                name: "Algeria",
                value: "DZ"
            },
            {
                name: "AmericanSamoa",
                value: "AS"
            },
            {
                name: "Andora",
                value: "AD"
            },
            {
                name: "Angola",
                value: "AO"
            },
            {
                name: "Anguilla",
                value: "AI"
            },
            {
                name: "Antarctica",
                value: "AQ"
            },
            {
                name: "Antigua and Barbuda",
                value: "AG"
            },
            {
                name: "Argentina",
                value: "AR"
            },
            {
                name: "Armenia",
                value: "AM"
            },
            {
                name: "Aruba",
                value: "AW"
            },
            {
                name: "Australia",
                value: "AU"
            },
            {
                name: "Austria",
                value: "AT"
            },
            {
                name: "Azerbaijan",
                value: "AZ"
            },
            {
                name: "Bahamas",
                value: "BS"
            },
            {
                name: "Bahrain",
                value: "BH"
            },
            {
                name: "Bangladesh",
                value: "BD"
            },
            {
                name: "Barbados",
                value: "BB"
            },
            {
                name: "Belarus",
                value: "BY"
            },
            {
                name: "Belgium",
                value: "BE"
            },
            {
                name: "Belize",
                value: "BZ"
            },
            {
                name: "Benin",
                value: "BJ"
            },
            {
                name: "Bermuda",
                value: "BM"
            },
            {
                name: "Bhutan",
                value: "BT"
            },
            {
                name: "Bolivia",
                value: "BO"
            },
            {
                name: "Bosnia and Herzegovina",
                value: "BA"
            },
            {
                name: "Botswana",
                value: "BW"
            },
            {
                name: "Bouvet Island",
                value: "BV"
            },
            {
                name: "Brazil",
                value: "BR"
            },
            {
                name: "British Indian Ocean Territory",
                value: "IO"
            },
            {
                name: "Brunei Darussalam",
                value: "BN"
            },
            {
                name: "Bulgari",
                value: "BG"
            },
            {
                name: "Burkina Faso",
                value: "BF"
            },
            {
                name: "Burundi",
                value: "BI"
            },
            {
                name: "Cambodia",
                value: "KH"
            },
            {
                name: "Cameroon",
                value: "CM"
            },
            {
                name: "Canada",
                value: "CA"
            },
            {
                name: "Cape Verde",
                value: "CV"
            },
            {
                name: "Cayman Islands",
                value: "KY"
            },
            {
                name: "Central African Republic",
                value: "CF"
            },
            {
                name: "Chad",
                value: "TD"
            },
            {
                name: "Chile",
                value: "CL"
            },
            {
                name: "China",
                value: "CN"
            },
            {
                name: "Christmas Island",
                value: "CX"
            },
            {
                name: "Cocos (Keeling) Islands",
                value: "CC"
            },
            {
                name: "Colombia",
                value: "CO"
            },
            {
                name: "Comoros",
                value: "KM"
            },
            {
                name: "Congo",
                value: "CG"
            },
            {
                name: "Congo Democratic Republic",
                value: "CD"
            },
            {
                name: "Cook Islands",
                value: "CK"
            },
            {
                name: "Costa Rica",
                value: "CR"
            },
            {
                name: "Cote d'Ivoire",
                value: "CI"
            },
            {
                name: "Croatia",
                value: "HR"
            },
            {
                name: "Cyprus",
                value: "CY"
            },
            {
                name: "Czech Republic",
                value: "CZ"
            },
            {
                name: "Denmark",
                value: "DK"
            },
            {
                name: "Djibouti",
                value: "DJ"
            },
            {
                name: "Dominica",
                value: "DM"
            },
            {
                name: "Dominican Republic",
                value: "DO"
            },
            {
                name: "East Timor",
                value: "TL"
            },
            {
                name: "Ecuador",
                value: "EC"
            },
            {
                name: "Egypt",
                value: "EG"
            },
            {
                name: "El Salvador",
                value: "SV"
            },
            {
                name: "Equatorial Guinea",
                value: "GQ"
            },
            {
                name: "Eritrea",
                value: "ER"
            },
            {
                name: "Estonia",
                value: "EE"
            },
            {
                name: "Ethiopia",
                value: "ET"
            },
            {
                name: "Falkl and Islands Malvinas",
                value: "FK"
            },
            {
                name: "Faroe Islands",
                value: "FO"
            },
            {
                name: "Fiji",
                value: "FJ"
            },
            {
                name: "Finland",
                value: "FI"
            },
            {
                name: "France",
                value: "FR"
            },
            {
                name: "French Guiana",
                value: "GF"
            },
            {
                name: "French Polynesia",
                value: "PF"
            },
            {
                name: "French Southern Territories",
                value: "TF"
            },
            {
                name: "Gabon",
                value: "GA"
            },
            {
                name: "Gambia",
                value: "GM"
            },
            {
                name: "Georgia",
                value: "GE"
            },
            {
                name: "Germany",
                value: "DE"
            },
            {
                name: "Ghana",
                value: "GH"
            },
            {
                name: "Gibraltar",
                value: "GI"
            },
            {
                name: "Greece",
                value: "GR"
            },
            {
                name: "Greenland",
                value: "GL"
            },
            {
                name: "Grenada",
                value: "GD"
            },
            {
                name: "Guadeloupe",
                value: "GP"
            },
            {
                name: "Guam",
                value: "GU"
            },
            {
                name: "Guatemala",
                value: "GT"
            },
            {
                name: "Guinea",
                value: "GN"
            },
            {
                name: "Guinea Bissau",
                value: "GW"
            },
            {
                name: "Guyana",
                value: "GY"
            },
            {
                name: "Haiti",
                value: "HT"
            },
            {
                name: "Heard and McDonald Islands",
                value: "HM"
            },
            {
                name: "Honduras",
                value: "HN"
            },
            {
                name: "Hong Kong",
                value: "HK"
            },
            {
                name: "Hungary",
                value: "HU"
            },
            {
                name: "Iceland",
                value: "IS"
            },
            {
                name: "India",
                value: "IN"
            },
            {
                name: "Indonesia",
                value: "ID"
            },
            {
                name: "Iraq",
                value: "IQ"
            },
            {
                name: "Ireland",
                value: "IE"
            },
            {
                name: "Israel",
                value: "IL"
            },
            {
                name: "Italy",
                value: "IT"
            },
            {
                name: "Jamaica",
                value: "JM"
            },
            {
                name: "Japan",
                value: "JP"
            },
            {
                name: "Jordan",
                value: "JO"
            },
            {
                name: "Kazakhstan",
                value: "KZ"
            },
            {
                name: "Kenya",
                value: "KE"
            },
            {
                name: "Kiribati",
                value: "KI"
            },
            {
                name: "Kuwait",
                value: "KW"
            },
            {
                name: "Kyrgyzstan",
                value: "KG"
            },
            {
                name: "Lao People's Democratic Republic",
                value: "LA"
            },
            {
                name: "Latvia",
                value: "LV"
            },
            {
                name: "Lebanon",
                value: "LB"
            },
            {
                name: "Lesotho",
                value: "LS"
            },
            {
                name: "Liberia",
                value: "LR"
            },
            {
                name: "Libya",
                value: "LY"
            },
            {
                name: "Liechtenstein",
                value: "LI"
            },
            {
                name: "Lithuania",
                value: "LT"
            },
            {
                name: "Luxembourg",
                value: "LU"
            },
            {
                name: "Macau",
                value: "MO"
            },
            {
                name: "Macedonia",
                value: "MK"
            },
            {
                name: "Madagascar",
                value: "MG"
            },
            {
                name: "Malawi",
                value: "MW"
            },
            {
                name: "Malaysia",
                value: "MY"
            },
            {
                name: "Maldives",
                value: "MV"
            },
            {
                name: "Mali",
                value: "ML"
            },
            {
                name: "Malta",
                value: "MT"
            },
            {
                name: "Marshall Islands",
                value: "MH"
            },
            {
                name: "Martinique",
                value: "MQ"
            },
            {
                name: "Mauritania",
                value: "MR"
            },
            {
                name: "Mauritius",
                value: "MU"
            },
            {
                name: "Mayotte",
                value: "YT"
            },
            {
                name: "Mexico",
                value: "MX"
            },
            {
                name: "Micronesia",
                value: "FM"
            },
            {
                name: "Moldova",
                value: "MD"
            },
            {
                name: "Monaco",
                value: "MC"
            },
            {
                name: "Mongolia",
                value: "MN"
            },
            {
                name: "Montserrat",
                value: "MS"
            },
            {
                name: "Morocco",
                value: "MA"
            },
            {
                name: "Mozambique",
                value: "MZ"
            },
            {
                name: "Namibia",
                value: "NA"
            },
            {
                name: "Nauru",
                value: "NR"
            },
            {
                name: "Nepal",
                value: "NP"
            },
            {
                name: "Netherlands",
                value: "NL"
            },
            {
                name: "Netherlands Antilles",
                value: "AN"
            },
            {
                name: "NewCaledonia",
                value: "NC"
            },
            {
                name: "New Zealand",
                value: "NZ"
            },
            {
                name: "Nicaragua",
                value: "NI"
            },
            {
                name: "Niger",
                value: "NE"
            },
            {
                name: "Nigeria",
                value: "NG"
            },
            {
                name: "Niue",
                value: "NU"
            },
            {
                name: "Norfolk Island",
                value: "NF"
            },
            {
                name: "Northern Maria a Islands",
                value: "MP"
            },
            {
                name: "Norway",
                value: "NO"
            },
            {
                name: "Oman",
                value: "OM"
            },
            {
                name: "Pakistan",
                value: "PK"
            },
            {
                name: "Palau",
                value: "PW"
            },
            {
                name: "Palestinian Territory",
                value: "PS"
            },
            {
                name: "Panama",
                value: "PA"
            },
            {
                name: "Papua New Guinea",
                value: "PG"
            },
            {
                name: "Paraguay",
                value: "PY"
            },
            {
                name: "Peru",
                value: "PE"
            },
            {
                name: "Philippines",
                value: "PH"
            },
            {
                name: "Pitcairn",
                value: "PN"
            },
            {
                name: "Poland",
                value: "PL"
            },
            {
                name: "Portugal",
                value: "PT"
            },
            {
                name: "Puerto Rico",
                value: "PR"
            },
            {
                name: "Qatar",
                value: "QA"
            },
            {
                name: "Reunion",
                value: "RE"
            },
            {
                name: "Romania",
                value: "RO"
            },
            {
                name: "Russian Federation",
                value: "RU"
            },
            {
                name: "Rwanda",
                value: "RW"
            },
            {
                name: "Saint Kitts and Nevis",
                value: "KN"
            },
            {
                name: "Saint Lucia",
                value: "LC"
            },
            {
                name: "Saint Vincent and the Grenadines",
                value: "VC"
            },
            {
                name: "Samoa",
                value: "WS"
            },
            {
                name: "San Marino",
                value: "SM"
            },
            {
                name: "Sao Tome and Principe",
                value: "ST"
            },
            {
                name: "Saudi Arabia",
                value: "SA"
            },
            {
                name: "Senegal",
                value: "SN"
            },
            {
                name: "Serbia and Montenegro",
                value: "CS"
            },
            {
                name: "Seychelles",
                value: "SC"
            },
            {
                name: "Sierra Leone",
                value: "SL"
            },
            {
                name: "Singapore",
                value: "SG"
            },
            {
                name: "Slovakia",
                value: "SK"
            },
            {
                name: "Slovenia",
                value: "SI"
            },
            {
                name: "Solomon Islands",
                value: "SB"
            },
            {
                name: "Somalia",
                value: "SO"
            },
            {
                name: "South Africa",
                value: "ZA"
            },
            {
                name: "South Georgia and the South Sandwich Islands",
                value: "GS"
            },
            {
                name: "SouthKorea",
                value: "KR"
            },
            {
                name: "Spain",
                value: "ES"
            },
            {
                name: "SriLanka",
                value: "LK"
            },
            {
                name: "St.Helena",
                value: "SH"
            },
            {
                name: "St. Pierre and Miquelon",
                value: "PM"
            },
            {
                name: "Suriname",
                value: "SR"
            },
            {
                name: "Svalbard and Jan Mayen Islands",
                value: "SJ"
            },
            {
                name: "Swaziland",
                value: "SZ"
            },
            {
                name: "Sweden",
                value: "SE"
            },
            {
                name: "Switzerland",
                value: "CH"
            },
            {
                name: "Taiwan",
                value: "TW"
            },
            {
                name: "Tajikistan",
                value: "TJ"
            },
            {
                name: "Tanzania",
                value: "TZ"
            },
            {
                name: "Thailand",
                value: "TH"
            },
            {
                name: "Togo",
                value: "TG"
            },
            {
                name: "Tokelau",
                value: "TK"
            },
            {
                name: "Tonga",
                value: "TO"
            },
            {
                name: "Trinidad and Tobago",
                value: "TT"
            },
            {
                name: "Tunisia",
                value: "TN"
            },
            {
                name: "Turkey",
                value: "TR"
            },
            {
                name: "Turkmenistan",
                value: "TM"
            },
            {
                name: "Turks and Caicos Islands",
                value: "TC"
            },
            {
                name: "Tuvalu",
                value: "TV"
            },
            {
                name: "Uganda",
                value: "UG"
            },
            {
                name: "Ukraine",
                value: "UA"
            },
            {
                name: "United Arab Emirates",
                value: "AE"
            },
            {
                name: "United Kingdom",
                value: "GB"
            },
            {
                name: "United States",
                value: "US"
            },
            {
                name: "United States Minor Outlying Islands",
                value: "UM"
            },
            {
                name: "Uruguay",
                value: "UY"
            },
            {
                name: "Uzbekistan",
                value: "UZ"
            },
            {
                name: "Vanuatu",
                value: "VU"
            },
            {
                name: "Vatican",
                value: "VA"
            },
            {
                name: "Venezuela",
                value: "VE"
            },
            {
                name: "Vietnam",
                value: "VN"
            },
            {
                name: "Virgin Islands British",
                value: "VG"
            },
            {
                name: "Virgin Islands US",
                value: "VI"
            },
            {
                name: "Wallis and Futuna Islands",
                value: "WF"
            },
            {
                name: "Western Sahara",
                value: "EH"
            },
            {
                name: "Yemen",
                value: "YE"
            },
            {
                name: "Zambia",
                value: "ZM"
            },
            {
                name: "Zimbabwe",
                value: "ZW"
            }
        ],
        value: "",
        querySegment: value => {return value ? `&cr=country${value}` : ""}
    },
    {
        name: "Max Time Since Last Update",
        type: "Select",
        options: [
            {
                name: "Any Time",
                value: "all"
            },
            {
                name: "Past 24 Hours",
                value: "d"
            },
            {
                name: "Past Week",
                value: "w"
            },
            {
                name: "Past Month",
                value: "m"
            },
            {
                name: "Past Year",
                value: "y"
            }
        ],
        value: "",
        querySegment: value => {return value ? `&as_qdr=${value}` : ""}
    },
    {
        name: "Specific Site/Domain",
        type: "FormInput",
        value: "",
        querySegment: value => {return value ? `&as_sitesearch=${value}` : ""}
    },
    {
        name: "Location of Terms",
        type: "Select",
        options: [
            {
                name: "Anywhere in the Page",
                value: "any"
            },
            {
                name: "In the Title of the Page",
                value: "title"
            },
            {
                name: "In the Text of the Page",
                value: "body"
            },
            {
                name: "In the URL of the Page",
                value: "url"
            },
            {
                name: "In Links to the Page",
                value: "links"
            }
        ],
        value: "",
        querySegment: value => {return value ? `&as_occt=${value}` : ""}
    },
    {
        name: "SafeSearch Option",
        type: "Select",
        options: [
            {
                name: "Show Most Relevant Results",
                value: "images"
            },
            {
                name: "Filter Explicit Results",
                value: "active"
            }
        ],
        value: "",
        querySegment: value => {return value ? `&safe=${value}` : ""}
    },
    {
        name: "File Type",
        type: "Select",
        options: [
            {
                name: "Any Format",
                value: "any"
            },
            {
                name: "Adobe Acrobat PDF (.pdf)",
                value: "pdf"
            },
            {
                name: "Adobe PostScript (.ps)",
                value: "ps"
            },
            {
                name: "Autodesk DWF (.dwf)",
                value: "dwf"
            },
            {
                name: "Google Earth KML (.kml)",
                value: "kml"
            },
            {
                name: "Google Earth KMZ (.kmz)",
                value: "kmz"
            },
            {
                name: "Microsoft Excel (.xls)",
                value: "xls"
            },
            {
                name: "Microsoft PowerPoint (.ppt)",
                value: "ppt"
            },
            {
                name: "Microsoft Word (.doc)",
                value: "doc"
            },
            {
                name: "Rich Text Format (.rtf)",
                value: "rtf"
            },
            {
                name: "Shockwave Flash (.swf)",
                value: "swf"
            }
        ],
        value: "",
        querySegment: value => {return value ? `&as_filetype=${value}` : ""}
    },
    {
        name: "Usage Rights Filter",
        type: "Select",
        options: [
            {
                name: "No Filter",
                value: ""
            },
            {
                name: "Free to Use or Share",
                value: "%28cc_publicdomain%7Ccc_attribute%7Ccc_sharealike%7Ccc_noncommercial%7Ccc_nonderived%29"
            },
            {
                name: "Free to Use or Share, Even Commercially",
                value: "%28cc_publicdomain%7Ccc_attribute%7Ccc_sharealike%7Ccc_nonderived%29.-%28cc_noncommercial%29"
            },
            {
                name: "Free to Use, Share, or Modify",
                value: "%28cc_publicdomain%7Ccc_attribute%7Ccc_sharealike%7Ccc_noncommercial%29.-%28cc_nonderived%29"
            },
            {
                name: "Free to Use, Share, or Modify, Even Commercially",
                value: "%28cc_publicdomain%7Ccc_attribute%7Ccc_sharealike%29.-%28cc_noncommercial%7Ccc_nonderived%29"
            }
        ],
        value: "",
        querySegment: value => {return value ? `&as_rights=${value}` : ""}
    }
];

module.exports = paramsArr;
