/**
 * Created by vincent on 2016/5/9.
 */
import BARParser from "./parsers/BARParser";
import LINEParser from "./parsers/LINEParser";
import PIEParser from "./parsers/PIEParser";

// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';


export default class Chart {
    $parserMap = {
        "bar": BARParser,
        "line": LINEParser,
        "pie": PIEParser
    };
    resize = ()=>this.echart.resize();

    constructor(element) {
        this.echart = echarts.init(element);
        window.addEventListener("resize", this.resize);
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;

        this.$render();
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;

        this.$render();
    }

    $invalidateRenderFlag;
    // 标记echart需要重新渲染
    $invalidateRender() {
        this.$invalidateRenderFlag = true;
    }

    // 刷新echart
    $validateRender() {
        if (this.$invalidateRenderFlag) {
            this.$updateDisplay();

            this.$invalidateRenderFlag = false;
        }
    }

    $render() {
        this.$invalidateRender();

        if (this.$renderTimeoutId != undefined)
            clearTimeout(this.$renderTimeoutId);
        this.$renderTimeoutId = setTimeout(()=>this.$validateRender(), 50);
    }

    $updateDisplay() {
        if (this.echart) {

            var parser = this.$parserMap[this.type] || this.$parserMap["bar"];
            var option = parser(this.data);
            this.echart.setOption(option, true);
        }
    }

    dispose() {
        if (this.$renderTimeoutId != undefined)
            clearTimeout(this.$renderTimeoutId);
        if (this.echart) {
            window.removeEventListener("resize", this.resize);
            this.echart.dispose();
            this.echart = null;
        }
    }
}