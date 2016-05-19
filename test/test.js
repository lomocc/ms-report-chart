/**
 * Created by vincent on 2016/5/10.
 */
import Chart from "./../src/entry";

let data = [{
    "browse_count": 534,
    "group": {"start": 1356969600000, "name": "2013年", "code": "", "end": 1388419200000}
}, {
    "browse_count": 529,
    "group": {"start": 1388505600000, "name": "2014年", "code": "", "end": 1419955200000}
}, {
    "browse_count": 421,
    "group": {"start": 1420041600000, "name": "2015年", "code": "", "end": 1451491200000}
}, {"browse_count": 562, "group": {"start": 1451577600000, "name": "2016年", "code": "", "end": 1483113600000}}];

var dom = document.createElement("div");
document.body.appendChild(dom);
var chart = new Chart(dom);
chart.type = "pie";
chart.data = data;
