// 节点数据（添加image属性）
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

// 边数据（添加id便于操作）
var edges = new vis.DataSet([
    { id: "e1", from: 1, to: 2, label: "儿子" },
    { id: "e2", from: 2, to: 3, label: "丈夫" },
    { id: "e3", from: 4, to: 2, label: "养母" },
    { id: "e4", from: 5, to: 2, label: "父亲" },
    { id: "e5", from: 5, to: 6, label: "丈夫" },
    { id: "e6", from: 5, to: 7, label: "父亲" },
    { id: "e7", from: 5, to: 8, label: "父亲" },
    { id: "e8", from: 9, to: 10, label: "妻子" },
    { id: "e9", from: 9, to: 11, label: "母亲" },
    { id: "e10", from: 12, to: 10, label: "父亲" },
    { id: "e11", from: 13, to: 14, label: "母亲" },
    { id: "e12", from: 14, to: 15, label: "妻子" },
    { id: "e13", from: 14, to: 16, label: "母亲" },
    { id: "e14", from: 1, to: 7, label: "恋人" }
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
        shadow: true,
        // fixed: true // 固定节点位置
    },
    edges: {
        font: { size: 12, color: "#e0e0e0", face: "Roboto" },
        arrows: "to",
        color: { color: "#4a5a4a" },
        smooth: { enabled: true, type: "cubicBezier" } // 使用贝塞尔曲线
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
            gravitationalConstant: -2000, // 减弱斥力，节点更靠近
            centralGravity: 0.5, // 增强家族内聚力
            springLength: 100, // 缩短边长，关系更紧凑
            springConstant: 0.08, // 增强弹性
            damping: 0.4, // 更快减速稳定
            avoidOverlap: 1
        },
        stabilization: {
            enabled: true,
            iterations: 1000,
            fit: true
        },
        minVelocity: 0.1, // 更快停止
        solver: "barnesHut"
    },
    layout: {
        improvedLayout: true
    },
    interaction: {
        // dragNodes: false, // 禁止拖动节点
        dragView: true,
        zoomView: true
    }
};
var network = new vis.Network(container, data, options);

// 3秒后固定布局
network.once("stabilizationIterationsDone", function () {
    // 稳定后立即关闭物理引擎
    network.setOptions({ physics: { enabled: false } });
    console.log("Stabilization complete, physics disabled");
});
setTimeout(function () {
    // 确保3秒内强制停止
    network.setOptions({ physics: { enabled: false } });
    network.fit(); // 调整视角适配画布
}, 3000);

// 双击边时添加控制点
let selectedEdge = null;
network.on("doubleClick", function (params) {
    if (params.edges.length > 0) {
        selectedEdge = params.edges[0];
        const edge = edges.get(selectedEdge);
        const fromPos = network.getPosition(edge.from);
        const toPos = network.getPosition(edge.to);
        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2;

        // 添加控制点节点（临时）
        const controlId = "control_" + selectedEdge;
        if (!nodes.get(controlId)) {
            nodes.add({
                id: controlId,
                shape: "dot",
                size: 10,
                x: midX,
                y: midY,
                fixed: false,
                color: "#ff0000"
            });
        }
    }
});

// 拖动控制点更新边形状
network.on("dragEnd", function (params) {
    if (params.nodes.length > 0 && params.nodes[0].startsWith("control_")) {
        const controlId = params.nodes[0];
        const edgeId = controlId.replace("control_", "");
        const controlPos = network.getPosition(controlId);

        // 更新边的贝塞尔曲线控制点
        edges.update({
            id: edgeId,
            smooth: {
                enabled: true,
                type: "cubicBezier",
                roundness: 0.5,
                forceDirection: "none",
                controlPoints: [{ x: controlPos.x, y: controlPos.y }]
            }
        });
    }
});

// 时间线筛选功能
document.getElementById("timeline").addEventListener("change", function () {
    var selected = this.value;
    var graph = document.getElementById("graph");
    graph.classList.add("fade");
    network.setOptions({ physics: { enabled: true } });// 筛选时启用物理引擎
    setTimeout(function () {
        var filteredNodes = nodes.get().filter(function (node) {
            return selected === "all" || node.title.includes(selected) && !node.id.startsWith("control_");
        });
        network.setData({ nodes: new vis.DataSet(filteredNodes), edges: edges });
        graph.classList.remove("fade");
        setTimeout(function () {
            network.setOptions({ physics: { enabled: false } });
            network.fit();
        }, 3000);
    }, 500);
});

