// An array containing every parameter on the menu.
const fcnSwitch = param => {
  switch (param.name) {
    case "Search Term(s)":
      return  (value => {
        return value ? `&as_q=${value.replace(/\s+/g, "+")}` : ""
      });
    case "Exact Match":
      return (value => {
        return value ? `&as_epq=${value.replace(/\s+/g, "+")}` : ""
      });
    case "Include Any":
      return (value => {
        return value ? `&as_oq=%28${value.replace(/\s+/g, "+")}%29` : ""
      });
    case "Wild Card":
      return (value => {
        let querySegment = value
        ? `&as_q=${value.replace(/\s+(?=(?:(?:[^"]*"){2})*[^"]*"[^"]*$)/g, "+").replace(/\s+(?=[^\])}]*([\[({]|$))/g, "+*+").replace(/[()[\]{}]/g, "")}`
        : "";
        const numSpaces = querySegment.match(/([\s]+)/g) ? querySegment.match(/([\s]+)/g).length : 0;
        console.log(numSpaces);
        for (let i = 0; i < numSpaces; i++) {
          querySegment = querySegment.replace(/\s+/, "+");
          console.log(querySegment);
        }
        return querySegment;
      });
    case "Exclude Each":
      return (value => {
        return value ? `&as_eq=${value.replace(/\s+/g, "+")}` : ""
      });
    case "Exclude Phrase":
      return (value => {
        return value ? `&as_eq=%22${value.replace(/\s+/g, "+")}%22` : ""
      });
    case "Numerical Range":
      return (value => {
        const querySegment = value.map((val, index) => {
          if (index === 0) {
            return val ? `&as_nlo=${val.replace(/[,\s]/g, "")}` : "";
          }
          return val ? `&as_nhi=${val.replace(/[,\s]/g, "")}` : "";
        }).join("");
        return querySegment;
      });
    case "Range with Units":
      return (value => {
        const querySegment = value.map((val, index) => {
          if (index === 0) {
            return val ? `&as_nlo=${val.replace(/[,\s]/g, "")}` : "";
          } else if (index === 1) {
            return val ? `&as_nhi=${val.replace(/[,\s]/g, "")}` : "";
          }
          return val ? `+${val.replace(/\s+/g, "")}` : "";
        }).join("");
        return querySegment;
      });
    case "Dollar Amount Range":
      return (value => {
        const querySegment = value.map((val, index) => {
          if (index === 0) {
            return val ? `&as_nlo=$${val.replace(/[,\s]/g, "")}` : "";
          }
          return val ? `&as_nhi=$${val.replace(/[,\s]/g, "")}` : "";
        }).join("");
        return querySegment;
      });
    case "Language":
      return (value => {
        return value ? `&lr=lang_${value}` : ""
      });
    case "Region":
      return (value => {
        return value ? `&cr=country${value}` : ""
      });
    case "Max Time Since Last Update":
      return (value => {
        return value ? `&as_qdr=${value}` : ""
      });
    case "Specific Site/Domain":
      return (value => {
        return value ? `&as_sitesearch=${value}` : ""
      });
    case "Location of Terms":
      return (value => {
        return value ? `&as_occt=${value}` : ""
      });
    case "SafeSearch Option":
      return (value => {
        return value ? `&safe=${value}` : ""
      });
    case "File Type":
      return (value => {
        return value ? `&as_filetype=${value}` : ""
      });
    case "Usage Rights Filter":
      return (value => {
        return value ? `&as_rights=${value}` : ""
      });
    default:
      return console.log("No valid param name detected.");
  }
};

module.exports = fcnSwitch;
