/**
 * Created by vincent on 2016/5/9.
 */
export default (sources, pureData)=> {
    var indexMap = {};
    var legend = {
        orient: 'vertical',
        x: 'left', data: []
    };
    var series = [];
    sources.forEach((item)=> {
        var group = item["group"];
        for (var k in item) {
            if (k == "group") {
                legend.data.push(group.name);
            } else {
                if (indexMap[k] === undefined) {
                    indexMap[k] = series.length;
                    var name = k;//translate.get(k);
                    series.push({name, type: 'pie', data: []});
                }
                series[indexMap[k]].data.push({value: item[k], name: group.name, group: group});
            }
        }
    });
    if(pureData)
        return {series, legend};
    return Object.assign({
        backgroundColor: '#ffffff',
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: null,
        series: null
    }, {series, legend});
}