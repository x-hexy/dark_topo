// 节点数据
var nodes = new vis.DataSet([
    { id: 1, label: "Jonas\n(乔纳斯)", group: "Kahnwald", title: "2019年主角", image: "imgs/jonas.jpg" },
    { id: 2, label: "Michael/Mikkel\n(迈克尔/米克尔)", group: "Kahnwald", title: "2019年Jonas的父亲，1986年穿越者", image: "imgs/michael.jpg" },
    { id: 3, label: "Hannah\n(汉娜)", group: "Kahnwald", title: "Jonas的母亲", image: "imgs/hannah.jpg" },
    { id: 4, label: "Ines\n(伊内斯)", group: "Kahnwald", title: "1986年收养Mikkel", image: "imgs/ines.jpg" },
    { id: 5, label: "The Stranger\n(陌生人)", group: "Kahnwald", title: "2019年中年Jonas", image: "imgs/stranger.jpg" },

    { id: 6, label: "Ulrich\n(乌尔里希)", group: "Nielsen", title: "2019年警察，Mikkel的父亲", image: "imgs/ulrich.jpg" },
    { id: 7, label: "Katharina\n(卡塔琳娜)", group: "Nielsen", title: "Ulrich的妻子", image: "imgs/katharina.jpg" },
    { id: 8, label: "Martha\n(玛莎)", group: "Nielsen", title: "Ulrich的女儿，Jonas的恋人", image: "imgs/martha.jpg" },
    { id: 9, label: "Magnus\n(马格努斯)", group: "Nielsen", title: "Ulrich的长子", image: "imgs/magnus.jpg" },
    { id: 10, label: "Tronte\n(特龙特)", group: "Nielsen", title: "Ulrich的父亲", image: "imgs/tronte.jpg" },
    { id: 11, label: "Jana\n(亚娜)", group: "Nielsen", title: "Ulrich的母亲", image: "imgs/jana.jpg" },
    { id: 12, label: "Mads\n(马兹)", group: "Nielsen", title: "Ulrich的弟弟，1986年失踪", image: "imgs/mads.jpg" },
    { id: 13, label: "Agnes\n(阿格尼丝)", group: "Nielsen", title: "1953年Tronte的母亲", image: "imgs/agnes.jpg" },

    { id: 14, label: "Charlotte\n(夏洛特)", group: "Doppler", title: "2019年警察局长", image: "imgs/charlotte.jpg" },
    { id: 15, label: "Peter\n(彼得)", group: "Doppler", title: "Charlotte的丈夫", image: "imgs/peter.jpg" },
    { id: 16, label: "Elisabeth\n(伊丽莎白)", group: "Doppler", title: "Charlotte的小女儿", image: "imgs/elisabeth.jpg" },
    { id: 17, label: "Helge\n(黑尔格)", group: "Doppler", title: "2019/1986/1953年，绑架者", image: "imgs/helge.jpg" },
    { id: 18, label: "Bernd\n(伯恩德)", group: "Doppler", title: "Helge的父亲，核电站创始人", image: "imgs/bernd.jpg" },
    { id: 19, label: "Franziska\n(弗兰齐丝卡)", group: "Doppler", title: "Charlotte的大女儿", image: "imgs/franziska.jpg" },

    { id: 20, label: "Claudia\n(克劳迪娅)", group: "Tiedemann", title: "1986年核电站负责人", image: "imgs/claudia.jpg" },
    { id: 21, label: "Regina\n(雷吉娜)", group: "Tiedemann", title: "2019年旅馆老板", image: "imgs/regina.jpg" },
    { id: 22, label: "Aleksander\n(亚历山大)", group: "Tiedemann", title: "Regina的丈夫", image: "imgs/aleksander.jpg" },
    { id: 23, label: "Bartosz\n(巴托什)", group: "Tiedemann", title: "Regina的儿子", image: "imgs/bartosz.jpg" },
    { id: 24, label: "Egon\n(埃贡)", group: "Tiedemann", title: "1986/1953年警察", image: "imgs/egon.jpg" },

    { id: 25, label: "Noah\n(诺亚)", group: "Other", title: "2019/1986/1953年神秘牧师", image: "imgs/noah.jpg" },
    { id: 26, label: "H.G. Tannhaus\n(塔恩豪斯)", group: "Other", title: "1986年钟表匠，时间机器制造者", image: "images/tannhaus.jpg" }
]);

// 边数据
var edges = new vis.DataSet([
    { from: 1, to: 2, label: "儿子" },
    { from: 2, to: 3, label: "丈夫" },
    { from: 4, to: 2, label: "养母" },
    { from: 1, to: 5, label: "未来自己" },
    { from: 6, to: 2, label: "父亲" },
    { from: 6, to: 7, label: "丈夫" },
    { from: 6, to: 8, label: "父亲" },
    { from: 6, to: 9, label: "父亲" },
    { from: 10, to: 6, label: "儿子" },
    { from: 10, to: 11, label: "丈夫" },
    { from: 10, to: 12, label: "儿子" },
    { from: 13, to: 10, label: "儿子" },
    { from: 1, to: 8, label: "恋人" },
    { from: 14, to: 15, label: "妻子" },
    { from: 14, to: 16, label: "母亲" },
    { from: 14, to: 19, label: "母亲" },
    { from: 17, to: 15, label: "父亲" },
    { from: 18, to: 17, label: "儿子" },
    { from: 20, to: 21, label: "母亲" },
    { from: 21, to: 22, label: "妻子" },
    { from: 21, to: 23, label: "母亲" },
    { from: 24, to: 20, label: "女儿" },
    { from: 17, to: 25, label: "助手" },
    { from: 23, to: 25, label: "合作者" },
    { from: 5, to: 26, label: "时间机器提供者" }, // Stranger与Tannhaus的关系
    { from: 20, to: 26, label: "技术顾问" }    // Claudia与Tannhaus的联系
]);

// 创建网络图
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
            size: 16,           // 增大字号（从12到16）
            color: "#ffffff",   // 改为纯白，提高对比度
            face: "Roboto",
            strokeWidth: 2,     // 加粗描边
            strokeColor: "#000000" // 黑色描边增强文字清晰度
        },
        arrows: "to",
        color: {
            color: "#cccccc",   // 连线改为亮灰色（从#4a5a4a调亮）
            highlight: "#ffffff" // 高亮时为纯白
        },
        width: 3              // 连线加粗（从默认1到3）
    },
    groups: {
        Kahnwald: { color: { border: "#6a4e4e" } },
        Nielsen: { color: { border: "#4e6a4e" } },
        Doppler: { color: { border: "#4e4e6a" } },
        Tiedemann: { color: { border: "#6a6a4e" } }
    },
    physics: {
        enabled: true,
        barnesHut: {
            gravitationalConstant: -4000, // 增大斥力，避免重叠
            centralGravity: 0.3,
            springLength: 500, // 增大初始边长，确保间距
            springConstant: 0.05,
            damping: 0.4,
            avoidOverlap: 1 // 强制避免重叠
        },
        stabilization: {
            enabled: true,
            iterations: 2000, // 增加迭代次数，预计算更精确
            fit: true
        },
        minVelocity: 0.1,
        solver: "barnesHut"
    },
    layout: {
        improvedLayout: true
    }
};
var network = new vis.Network(container, data, options);

// 等待稳定化完成后再显示
network.on("stabilizationIterationsDone", function () {
    network.setOptions({ physics: { enabled: false } });
    network.fit(); // 调整视角适配画布
    console.log("Stabilization complete, layout fixed");
});

// 强制3秒后固定（备用）
setTimeout(function () {
    network.setOptions({ physics: { enabled: false } });
    network.fit();
}, 2000);

// 时间线筛选功能
document.getElementById("timeline").addEventListener("change", function () {
    var selected = this.value;
    var graph = document.getElementById("graph");
    graph.classList.add("fade");
    network.setOptions({ physics: { enabled: true } });
    setTimeout(function () {
        var filteredNodes = nodes.get().filter(function (node) {
            return selected === "all" || node.title.includes(selected);
        });
        network.setData({ nodes: new vis.DataSet(filteredNodes), edges: edges });
        graph.classList.remove("fade");
        network.once("stabilizationIterationsDone", function () {
            network.setOptions({ physics: { enabled: false } });
            network.fit();
        });
        setTimeout(function () {
            network.setOptions({ physics: { enabled: false } });
            network.fit();
        }, 3000);
    }, 500);
});

// 音乐控制函数
var audio = document.getElementById("backgroundMusic");
audio.volume = 0.3; // 设置音量，默认30%
audio.play(); // 自动播放（浏览器可能限制，需用户交互）

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        document.querySelector(".music-control button").textContent = "暂停";
    } else {
        audio.pause();
        document.querySelector(".music-control button").textContent = "播放";
    }
}