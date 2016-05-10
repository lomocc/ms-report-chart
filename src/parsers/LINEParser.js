/**
 * Created by vincent on 2016/5/9.
 */
export default (sources)=> {
    var indexMap = {};
    var xAxis = [
        {
            type: 'category',
            data: []
        }
    ];
    var legend = {data: []};
    var series = [];
    sources.forEach((item)=> {
        var group = item["group"];
        for (var k in item) {
            if (k == "group") {
                xAxis[0].data.push(group.name);
            } else {
                if (indexMap[k] === undefined) {
                    indexMap[k] = series.length;
                    var name = k;//translate.get(k);
                    series.push({name, type: 'line', smooth: true, data: []});
                    legend.data.push(name);
                }
                series[indexMap[k]].data.push({value: item[k], name: group.name, group: group});
            }
        }
    });
    return Object.assign({
        backgroundColor: '#ffffff',
        tooltip: {
            trigger: 'axis'
        },
        legend: null,
        xAxis: null,
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: null
    }, {series, xAxis, legend});
}