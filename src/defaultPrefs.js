const defaultPrefs = [{
        name: "Search Term(s)",
        type: "FormInput",
        value: "",
        querySegment: value => {
            return value ? `&as_q=${value.replace(/\s+/g, "+")}` : ""
        }
    },
    {
        name: "Exact Match",
        type: "FormInput",
        value: "",
        querySegment: value => {
            return value ? `&as_epq=${value.replace(/\s+/g, "+")}` : ""
        }
    },
    {
        name: "Include Any",
        type: "FormInput",
        value: "",
        querySegment: value => {
            return value ? `&as_oq=%28${value.replace(/\s+/g, "+")}%29` : ""
        }
    },
    {
        name: "Exclude Each",
        type: "FormInput",
        value: "",
        querySegment: value => {
            return value ? `&as_eq=${value.replace(/\s+/g, "+")}` : ""
        }
    },
]

export default defaultPrefs;