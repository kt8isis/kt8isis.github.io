function init() {
    let content = document.getElementById("content");
    let marks = [];
    function visit(element) {
        for (child of element.childNodes) {
            if (child.nodeType != Node.ELEMENT_NODE) { continue; }
            let range = child.getAttribute("data-range");
            if (range) {
                let [start, end] = range.split(":");
                marks.push({
                    start: parseFloat(start),
                    end: parseFloat(end),
                    element: child
                });
            }
            visit(child);
        }
    }
    visit(content);
    function timeupdate(event) {
        let time = event.target.currentTime;
        for (mark of marks) {
            let active = (mark.start <= time) && (mark.end >= time);
            mark.element.setAttribute("data-active", active);
        }
    }
    document.getElementById("audio").addEventListener("timeupdate", timeupdate, false);
}

document.addEventListener("DOMContentLoaded", init, false);
