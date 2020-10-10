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

    let audio = document.getElementById("audio");

    function timeupdate() {
        let time = audio.currentTime;
        for (mark of marks) {
            let active = (mark.start <= time) && (mark.end >= time);
            mark.element.setAttribute("data-active", active);
        }
    }
    audio.addEventListener("timeupdate", timeupdate, false);

    let button = audio.parentElement.getElementsByTagName("button")[0];

    function pause() {
        button.className = "play";
        audio.pause();
        playing = false;
    }
    function play() {
        button.className = "pause";
        audio.play();
        playing = true;
    }
    function toggle() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
    function update_button() {
        button.className = ["pause", "play"][audio.paused | 0];
    }
    audio.addEventListener("ended", update_button, false);
    audio.addEventListener("play", update_button, false);
    audio.addEventListener("pause", update_button, false);

    button.addEventListener("click", toggle, false);

    audio.style.display = "none";
    button.style.display = "block";
}

document.addEventListener("DOMContentLoaded", init, false);
