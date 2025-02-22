// 定义节点（人物）
var nodes = new vis.DataSet([
    { id: 1, label: "Jonas\n(乔纳斯)", group: "Kahnwald", title: "2019年主角，Michael和Hannah的儿子" },
    { id: 2, label: "Michael/Mikkel\n(迈克尔/米克尔)", group: "Kahnwald", title: "2019年Jonas的父亲，1986年穿越者" },
    { id: 3, label: "Hannah\n(汉娜)", group: "Kahnwald", title: "Jonas的母亲，暗恋Ulrich" },
    { id: 4, label: "Ines\n(伊内斯)", group: "Kahnwald", title: "1986年收养Mikkel" },

    { id: 5, label: "Ulrich\n(乌尔里希)", group: "Nielsen", title: "2019年警察，Mikkel的父亲" },
    { id: 6, label: "Katharina\n(卡塔琳娜)", group: "Nielsen", title: "Ulrich的妻子" },
    { id: 7, label: "Martha\n(玛莎)", group: "Nielsen", title: "Ulrich的女儿，Jonas的恋人" },
    { id: 8, label: "Magnus\n(马格努斯)", group: "Nielsen", title: "Ulrich的长子" },

    { id: 9, label: "Charlotte\n(夏洛特)", group: "Doppler", title: "2019年警察局长" },
    { id: 10, label: "Peter\n(彼得)", group: "Doppler", title: "Charlotte的丈夫" },
    { id: 11, label: "Elisabeth\n(伊丽莎白)", group: "Doppler", title: "Charlotte的小女儿" },
    { id: 12, label: "Helge\n(黑尔格)", group: "Doppler", title: "1986年核电站工人" },

    { id: 13, label: "Claudia\n(克劳迪娅)", group: "Tiedemann", title: "1986年核电站负责人" },
    { id: 14, label: "Regina\n(雷吉娜)", group: "Tiedemann", title: "2019年旅馆老板" },
    { id: 15, label: "Aleksander\n(亚历山大)", group: "Tiedemann", title: "Regina的丈夫" },
    { id: 16, label: "Bartosz\n(巴托什)", group: "Tiedemann", title: "Regina的儿子" }
]);

// 定义边（关系）
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
    nodes: { shape: "box", font: { size: 14, color: "#fff" } },
    edges: { font: { size: 12, color: "#fff" }, arrows: "to" },
    groups: {
        Kahnwald: { color: { background: "#4a2e2e" } },
        Nielsen: { color: { background: "#2e4a2e" } },
        Doppler: { color: { background: "#2e2e4a" } },
        Tiedemann: { color: { background: "#4a4a2e" } }
    }
};
var network = new vis.Network(container, data, options);

// 时间线筛选功能
document.getElementById("timeline").addEventListener("change", function () {
    var selected = this.value;
    var filteredNodes = nodes.get().filter(function (node) {
        return selected === "all" || node.title.includes(selected);
    });
    network.setData({ nodes: new vis.DataSet(filteredNodes), edges: edges });
});