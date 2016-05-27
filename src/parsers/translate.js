/**
 * Created by vincent on 2016/5/27.
 */
var dic_map = {
    "turnover": "交易额",
    "regusers": "注册用户数"
};
export default (k)=> {
    if (dic_map.hasOwnProperty(k)) {
        return dic_map[k];
    }
    return k;
}