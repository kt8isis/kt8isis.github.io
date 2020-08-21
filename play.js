function init() {
    let content = document.getElementById("content");
    let marks = [];
    for (child of content.childNodes) {
        if (child.nodeType != Node.ELEMENT_NODE) { continue; }
        let start = child.getAttribute("data-start");
        let end = child.getAttribute("data-end");
        if ((start === undefined) || (end === undefined)) {
            continue;
        }
        
        marks.push({
            start: parseFloat(start),
            end: parseFloat(end),
            element: child
        });
        
    }
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
