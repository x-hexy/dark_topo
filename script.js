// script.js
const App = (function () { // Use IIFE to create a private scope
    let currentLang = "zh"; // 默认中文
    let currentTimeline = "all"; // 新增：记录当前时间线，初始为“全部”
    let network; // 全局网络对象
    let audio; // 在initialize中定义

    const DEFAULT_AUDIO_VOLUME = 0.3;
    const STABILIZATION_TIMEOUT = 2000;
    const TIMELINE_FADE_TIMEOUT = 500;
    const KAHNWALD_MAX_ID = 5;
    const NIELSEN_MAX_ID = 13;
    const DOPPLER_MAX_ID = 19;
    const TIEDEMANN_MAX_ID = 24;
    const GRAVITATIONAL_CONSTANT = -4000;
    const CENTRAL_GRAVITY = 0.3;
    const SPRING_LENGTH = 500;
    const SPRING_CONSTANT = 0.05;
    const DAMPING = 0.4;
    const MIN_VELOCITY = 0.1;

    // Helper function to create node data (DRY)
    function createNodeData(node) {
        const group =
            node.id <= KAHNWALD_MAX_ID ? "Kahnwald" :
                node.id <= NIELSEN_MAX_ID ? "Nielsen" :
                    node.id <= DOPPLER_MAX_ID ? "Doppler" :
                        node.id <= TIEDEMANN_MAX_ID ? "Tiedemann" :
                            "Other";
        return {
            ...node,
            group: group,
            image: `imgs/${node.label.split('\n')[0].toLowerCase().replace('/', '-')}.jpg`
        };
    }

    // Helper function to filter nodes by timeline
    function filterNodesByTimeline(nodes, timeline) {
        return nodes.filter(node => timeline === "all" || node.title.includes(timeline));
    }

    // Initialize the network
    function initNetwork(lang) {
        const langData = languages[lang];
        var nodes = new vis.DataSet(filterNodesByTimeline(langData.nodes, currentTimeline).map(createNodeData));
        var edges = new vis.DataSet(langData.edges);

        var container = document.getElementById("graph");
        var data = { nodes: nodes, edges: edges };
        var options = {
            nodes: {
                shape: "image",
                size: 50,
                font: { size: 14, color: "#e0e0e0", face: "Roboto" },
                labelHighlightBold: true,
                borderWidth: 2,
                shadow: true
            },
            edges: {
                font: {
                    size: 14,
                    color: "#ffffff",
                    face: "Roboto",
                    strokeWidth: 2,
                    strokeColor: "#000000"
                },
                color: {
                    color: "#cccccc",
                    highlight: "#ffffff"
                },
                width: 2,
                arrows: { to: { enabled: false } }
            },
            groups: {
                Kahnwald: { color: { border: "#6a4e4e" } },
                Nielsen: { color: { border: "#4e6a4e" } },
                Doppler: { color: { border: "#4e4e6a" } },
                Tiedemann: { color: { border: "#6a6a4e" } },
                Other: { color: { border: "#4a4a4a" } }
            },
            physics: {
                enabled: true,
                barnesHut: {
                    gravitationalConstant: GRAVITATIONAL_CONSTANT,
                    centralGravity: CENTRAL_GRAVITY,
                    springLength: SPRING_LENGTH,
                    springConstant: SPRING_CONSTANT,
                    damping: DAMPING,
                    avoidOverlap: 1
                },
                stabilization: {
                    enabled: true,
                    iterations: 2000,
                    fit: true
                },
                minVelocity: MIN_VELOCITY,
                solver: "barnesHut"
            },
            layout: { improvedLayout: true }
        };
        network = new vis.Network(container, data, options);

        network.on("stabilizationIterationsDone", function () {
            network.setOptions({ physics: { enabled: false } });
            network.fit();
        });
    }

    // Update the language
    function updateLanguage(lang) {
        currentLang = lang;
        const langData = languages[lang];
        console.log("Updating language to:", lang);

        // Update HTML elements immediately
        const title = document.getElementById("title");
        const pageTitle = document.getElementById("pageTitle");
        const languageLabel = document.getElementById("language_label");
        const timelineLabel = document.getElementById("timeline_label");
        const timeline = document.getElementById("timeline");
        const musicButton = document.getElementById("musicButton");

        if (title) title.textContent = langData.title;
        else console.error("Element 'title' not found");
        if (pageTitle) pageTitle.textContent = langData.title;
        else console.error("Element 'pageTitle' not found");
        if (languageLabel) languageLabel.textContent = langData.language_label;
        else console.error("Element 'language_label' not found");
        if (timelineLabel) timelineLabel.textContent = langData.timeline_label;
        else console.error("Element 'timeline_label' not found");
        if (timeline) {
            Array.from(timeline.options).forEach((option) => {
                option.text = langData.timeline_options[option.value];
            });
        } else console.error("Element 'timeline' not found");
        if (musicButton) musicButton.textContent = audio.paused ? langData.music_play : langData.music_pause;
        else console.error("Element 'musicButton' not found");

        // Update the network with delay to ensure rendering
        var graph = document.getElementById("graph");
        if (graph) graph.classList.add("fade");
        setTimeout(function () {
            console.log("Updating network data for language:", lang, "with timeline:", currentTimeline);
            var filteredNodes = filterNodesByTimeline(langData.nodes, currentTimeline);
            network.setData({
                nodes: new vis.DataSet(filteredNodes.map(createNodeData)),
                edges: new vis.DataSet(langData.edges),
            });
            network.setOptions({ physics: { enabled: true } }); // 启用物理引擎调整布局
            setTimeout(function () {
                network.setOptions({ physics: { enabled: false } }); // 延迟关闭，确保布局完成
                network.redraw(); // 强制重绘
                network.fit(); // 调整视角
                if (graph) graph.classList.remove("fade");
            }, 1000); // 延迟1秒让物理引擎调整间距
        }, TIMELINE_FADE_TIMEOUT);
    }

    // Timeline changed
    function handleTimelineChange(selected) {
        currentTimeline = selected; // 更新当前时间线
        var graph = document.getElementById("graph");
        if (graph) graph.classList.add("fade");
        setTimeout(function () {
            console.log("Updating timeline to:", selected);
            var filteredNodes = filterNodesByTimeline(languages[currentLang].nodes, selected);
            network.setData({
                nodes: new vis.DataSet(filteredNodes.map(createNodeData)),
                edges: new vis.DataSet(languages[currentLang].edges)
            });
            network.setOptions({ physics: { enabled: true } }); // 启用物理引擎调整布局
            setTimeout(function () {
                network.setOptions({ physics: { enabled: false } }); // 延迟关闭，确保布局完成
                network.redraw(); // 强制重绘
                network.fit(); // 调整视角
                if (graph) graph.classList.remove("fade");
            }, 1000); // 延迟1秒让物理引擎调整间距
        }, TIMELINE_FADE_TIMEOUT);
    }

    function toggleMusic() {
        if (audio.paused) {
            audio.play().catch(e => { console.error("Failed to play audio:", e); });
            document.getElementById("musicButton").textContent = languages[currentLang].music_pause;
        } else {
            audio.pause();
            document.getElementById("musicButton").textContent = languages[currentLang].music_play;
        }
    }

    // Initialize
    (function initialize() {
        audio = document.getElementById("backgroundMusic");
        initNetwork(currentLang);
        audio.volume = DEFAULT_AUDIO_VOLUME;
        audio.play().catch(e => { console.error("Failed to play audio:", e); });

        document.getElementById("language").addEventListener("change", function () {
            updateLanguage(this.value);
        });

        document.getElementById("timeline").addEventListener("change", function () {
            handleTimelineChange(this.value);
        });
    })();

    return {
        toggleMusic: toggleMusic,
    };
})();

// Export the method to global
window.toggleMusic = App.toggleMusic;