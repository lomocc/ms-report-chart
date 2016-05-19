/**
 * Created by vincent on 2016/5/9.
 */
export default(sources, pureData)=> {
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
                    series.push({name, type: 'bar', data: []});
                    legend.data.push(name);
                }
                series[indexMap[k]].data.push({value: item[k], name: group.name, group: group});
            }
        }
    });
    if(pureData)
        return {series, xAxis, legend};
    return Object.assign({
        backgroundColor: '#ffffff',
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: null,
        yAxis: [
            {
                type: 'value'
            }
        ],
        legend: null,
        series: null
    }, {series, xAxis, legend});
}