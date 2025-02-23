// 节点数据
var nodes = new vis.DataSet([
    { id: 1, label: "Jonas\n(乔纳斯)", group: "Kahnwald", title: "2019年主角，Michael和Hannah的儿子", image: "imgs/jonas.jpg" },
    { id: 2, label: "Michael/Mikkel\n(迈克尔/米克尔)", group: "Kahnwald", title: "2019年Jonas的父亲，1986年穿越者", image: "imgs/michael.jpg" },
    { id: 3, label: "Hannah\n(汉娜)", group: "Kahnwald", title: "Jonas的母亲，暗恋Ulrich", image: "imgs/hannah.jpg" },
    { id: 4, label: "Ines\n(伊内斯)", group: "Kahnwald", title: "1986年收养Mikkel", image: "imgs/ines.jpg" },
    { id: 5, label: "Ulrich\n(乌尔里希)", group: "Nielsen", title: "2019年警察，Mikkel的父亲", image: "imgs/ulrich.jpg" },
    { id: 6, label: "Katharina\n(卡塔琳娜)", group: "Nielsen", title: "Ulrich的妻子", image: "imgs/katharina.jpg" },
    { id: 7, label: "Martha\n(玛莎)", group: "Nielsen", title: "Ulrich的女儿，Jonas的恋人", image: "imgs/martha.jpg" },
    { id: 8, label: "Magnus\n(马格努斯)", group: "Nielsen", title: "Ulrich的长子", image: "imgs/magnus.jpg" },
    { id: 9, label: "Charlotte\n(夏洛特)", group: "Doppler", title: "2019年警察局长", image: "imgs/charlotte.jpg" },
    { id: 10, label: "Peter\n(彼得)", group: "Doppler", title: "Charlotte的丈夫", image: "imgs/peter.jpg" },
    { id: 11, label: "Elisabeth\n(伊丽莎白)", group: "Doppler", title: "Charlotte的小女儿", image: "imgs/elisabeth.jpg" },
    { id: 12, label: "Helge\n(黑尔格)", group: "Doppler", title: "1986年核电站工人", image: "imgs/helge.jpg" },
    { id: 13, label: "Claudia\n(克劳迪娅)", group: "Tiedemann", title: "1986年核电站负责人", image: "imgs/claudia.jpg" },
    { id: 14, label: "Regina\n(雷吉娜)", group: "Tiedemann", title: "2019年旅馆老板", image: "imgs/regina.jpg" },
    { id: 15, label: "Aleksander\n(亚历山大)", group: "Tiedemann", title: "Regina的丈夫", image: "imgs/aleksander.jpg" },
    { id: 16, label: "Bartosz\n(巴托什)", group: "Tiedemann", title: "Regina的儿子", image: "imgs/bartosz.jpg" }
]);

// 边数据
var edges = new vis.DataSet([
    { from: 1, to: 2, label: "儿子" },
    { from: 2, to: 3, label: "丈夫" },
    { from: 4, to: 2, label: "养母" },
    { from: 5, to: 2, label: "父亲" },
    { from: 5, to: 6, label: "丈夫" },
    { from: 5, to: 7, label: "父亲" },
    { from: 5, to: 8, label: "父亲" },
    { from: 9, to: 10, label: "妻子" },
    { from: 9, to: 11, label: "母亲" },
    { from: 12, to: 10, label: "父亲" },
    { from: 13, to: 14, label: "母亲" },
    { from: 14, to: 15, label: "妻子" },
    { from: 14, to: 16, label: "母亲" },
    { from: 1, to: 7, label: "恋人" }
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
        font: { size: 12, color: "#e0e0e0", face: "Roboto" },
        arrows: "to",
        color: { color: "#4a5a4a" }
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
            gravitationalConstant: -3000, // 增大斥力，避免重叠
            centralGravity: 0.3,
            springLength: 200, // 增大初始边长，确保间距
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
}, 3000);

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