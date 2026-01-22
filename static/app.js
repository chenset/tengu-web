//dark mode toggle
if (document.cookie.split(';').filter((item) => item.includes('darkMode=1')).length) {
    darkModeToggle()
}

function darkModeToggle() {
    if (!isDarkMode()) {
        document.documentElement.className += " dark";
        document.cookie = 'darkMode=1; expires=' + new Date(new Date().getTime() + 86400000 * 365) + '; path=/'
    } else {
        document.documentElement.className = document.documentElement.className.replace("dark", "").trim()
        document.cookie = 'darkMode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    }
}

function isDarkMode() {
    return document.documentElement.className.indexOf("dark") !== -1
}

if (typeof axios !== 'undefined') {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => {
        script = null;
        callback && callback()
    };
    document.body.appendChild(script);
}

function timestampHumanReadable(timestamp) {
    if (timestamp < 60) {
        return (timestamp).toFixed(1) + ' sec';
    }
    if (timestamp < 3600) {
        return (timestamp / 60).toFixed(1) + ' mins';
    }
    if (timestamp < 86400) {
        return (timestamp / 3600).toFixed(1) + ' hours';
    }
    return (timestamp / 86400).toFixed(1) + ' days';
}
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
// device detection
function isMobile() {
    if (window.isMobileCache === undefined) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
            window.isMobileCache = true
        } else {
            window.isMobileCache = false
        }
    }

    return window.isMobileCache;
}

Number.prototype.fileSizeH = function () {
    return fileSizeH(this.valueOf())
};

function byteFormat(bytes) {
    if (typeof bytes === 'undefined' || bytes == 0) {
        return '0B'
    }
    if (bytes < 1) {
        return bytes.toFixed(1) + 'B';
    }
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ['B', 'K', 'M', 'G', 'T', 'P', 'E'][i];
}

function fileSizeH(bytes) {
    if (bytes === 0) {
        return "0B";
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(1) * 1 + ['B', 'K', 'M', 'G', 'T'][i];
}

function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}

function pad4(n) {
    return (n < 10 ? '000' : n < 100 ? '00' : n < 1000 ? '0' : '') + n;
}

function chartCeil(n) {
    return Math.ceil(n * 1000) / 1000;
}

function chartTimeSince(t) {
    let dateTime = new Date();
    dateTime = dateTime.setSeconds(dateTime.getSeconds() - t);
    const d = new Date(dateTime);
    return pad2(d.getMinutes()) + ":" + pad2(d.getSeconds());
}

let _utc0zoneOffset = new Date().getTimezoneOffset() * 60 * 1000

let _currentYear = new Date().getFullYear()

// +8 时区时间
Number.prototype.timestamp2yyyymmddhmShangHaiTime = function () {
    let v = this.valueOf()
    if (v) {
        v += _utc0zoneOffset + 8 * 60 * 60 * 1000
    }
    const d = new Date(v);
    if (d.getFullYear() !== _currentYear) {
        return d.getFullYear() + "/" + pad2(d.getMonth() + 1) + "/" + pad2(d.getDate()) + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes()) + "(+8)";
    } else {
        return pad2(d.getMonth() + 1) + "/" + pad2(d.getDate()) + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes()) + "(+8)";
    }
    // return pad2(d.getMonth() + 1) + "/" + pad2(d.getDate());
};

// -6 时区时间
Number.prototype.timestamp2yyyymmddhmMEXICOTime = function () {
    let v = this.valueOf()
    if (v) {
        v += _utc0zoneOffset - 6 * 60 * 60 * 1000
    }
    const d = new Date(v);
    return d.getFullYear() + "/" + pad2(d.getMonth() + 1) + "/" + pad2(d.getDate()) + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes()) + "(-6)";
    // return pad2(d.getMonth() + 1) + "/" + pad2(d.getDate());
};
Number.prototype.timestamp2yyyymmddhms = function () {
    let v = this.valueOf()
    const d = new Date(v);
    return d.getFullYear() + "/" + pad2(d.getMonth() + 1) + "/" + pad2(d.getDate()) + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes()) + ":" + pad2(d.getSeconds());
    // return pad2(d.getMonth() + 1) + "/" + pad2(d.getDate());
};
String.prototype.UTC2GMT8 = function () {
    return this.valueOf()?.UTC2Timestamp()?.timestamp2date()
};
String.prototype.UTC2Timestamp = function () {
    let timestamp = Date.parse(this.valueOf())
    if (timestamp < 100000000) {
        return ""
    }
    return timestamp / 1000
};
Number.prototype.numFormat = function () {
    return numFormat(this.valueOf())
};

String.prototype.numFormat = function () {
    return numFormat(this.valueOf())
};

String.prototype.urlTruncate = function () {
    let str = this.valueOf();
    if (str.length > 40) {
        return ".." + str.substring(str.length - 40) + "(" + str.length + ")"
    }
    return str
};

function numFormat(v) {
    if (v === undefined || isNaN(v)) {
        return "0"
    }
    return new Intl.NumberFormat().format(v)
}

function showLoading() {
    let el = document.getElementById('loading')
    if (el && el.style) {
        el.style.display = 'block';
    }
    el = document.getElementById('layer')
    if (el && el.style) {
        el.style.display = 'block';
    }
}

function hideLoading() {
    setTimeout(() => {
        let el = document.getElementById('layer')
        if (el && el.style) {
            el.style.display = 'none';
        }
        el = document.getElementById('loading')
        if (el && el.style) {
            el.style.display = 'none';
        }
    }, 100);
}

let tableToExcel = (function () {
    let uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta charset="utf-8"/><head><style type="text/css"> .txt, .string { mso-number-format: "\\@"; } table { width: 100%; } </style><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        }
        , format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        }
    return function (table, name, filename) {
        let link = document.createElement('a');
        let innerHtml = table.innerHTML
        //remove display none from innerHtml
        innerHtml = innerHtml.replace(/display:\snone;/g, "")
        link.href = uri + base64(format(template, { worksheet: name || 'Worksheet', table: innerHtml }));
        link.download = filename;
        link.click();
    }
})()

function popupWindow(title, content, dontDisplay, windowStyle = { width: '96%' }, contentStyle = {}) {
    const popupWindowEl = document.getElementById("popup-window");
    const popupWindowLayerEl = document.getElementById("popup-window-layer");
    const popupWindowTitleEl = document.getElementById("popup-window-title");
    const popupWindowContentEl = document.getElementById("popup-window-content");

    for (let key in windowStyle) {
        popupWindowEl.style[key] = windowStyle[key]
    }

    for (let key in contentStyle) {
        popupWindowContentEl.style[key] = contentStyle[key]
    }

    if (window.getComputedStyle(popupWindowEl).display === 'none') {
        popupWindowLayerEl.style.display = 'block';
        popupWindowTitleEl.innerHTML = title;
        popupWindowContentEl.innerHTML = content;
        popupWindowEl.style.display = "block";
        if (!dontDisplay) {
            popupWindowContentEl.style.maxHeight = Math.min((window.innerHeight * .5), popupWindowContentEl.scrollHeight) + 'px';
            popupWindowContentEl.style.display = "none";
        }

        //run javascript
        Array.from(popupWindowContentEl.querySelectorAll("script")).forEach(oldScript => {
            const newScript = document.createElement("script");
            Array.from(oldScript.attributes)
                .forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }
}

function refreshPopupContentHeight() {
    const popupWindowContentEl = document.getElementById("popup-window-content");
    if (popupWindowContentEl && window.getComputedStyle(popupWindowContentEl).display === 'none') {
        popupWindowContentEl.style.maxHeight = Math.min((window.innerHeight * .5), popupWindowContentEl.scrollHeight) + 'px';
        // console.log(popupWindowContentEl.style.maxHeight)
        popupWindowContentEl.style.display = "block";
    }
}

function popupWindowClose() {
    const popupWindowContentEl = document.getElementById("popup-window-content");
    while (popupWindowContentEl.firstChild) {
        popupWindowContentEl.removeChild(popupWindowContentEl.firstChild);
    }
    popupWindowContentEl.scrollTo(0, 0);

    document.getElementById("popup-window").style.display = "none";
    document.getElementById("popup-window-layer").style.display = 'none';
}


function getQueryParam(key) {
    let queryString = window.location.search // 尝试 HTML5 模式

    if (!queryString && window.location.hash && window.location.hash.includes("?")) {
        // 尝试 hash 模式
        queryString = window.location.hash.substring(window.location.hash.indexOf("?"))
    }

    return (new URLSearchParams(queryString)).get(key)
}

async function loadJSScriptFiles(src) {
    return new Promise((resolve, reject) => {
        const scriptEl = document.createElement("script");
        scriptEl.setAttribute("src", src);
        scriptEl.defer = true
        scriptEl.async = true
        scriptEl.onload = () => {
            resolve()
        }
        scriptEl.onerror = (err) => {
            reject(err)
        }
        document.head.appendChild(scriptEl);
    });
}

function errorMsg(err) {
    console.log(err);
    if (err instanceof TypeError || err instanceof Error) {
        popupWindowClose()
        popupWindow("<h3 class='text-red'>Error</h3>", err.message, true, { width: 'auto' })
        return
    }
    if (err === undefined || typeof err === "undefined") {
        popupWindowClose()
        popupWindow("<h3 class='text-red'>Error</h3>", "JS程序错误", true, { width: 'auto' })
        return
    }
    if (typeof err === 'string') {
        popupWindowClose()
        popupWindow("<h3 class='text-red'>Error</h3>", err, true, { width: 'auto' })
        return
    }
    if (!err.response) {
        popupWindowClose()
        popupWindow("<h3 class='text-red'>Error</h3>", "网络错误, 请查看Console", true, { width: 'auto' })
        return
    }
    if (err.response.status === 401) {
        location.href = "/login"
        return
    }
    if (err.response.data.message) {
        popupWindowClose()
        popupWindow("<h3 class='text-red'>Error</h3>", err.response.data.message, true, { width: 'auto' })
        return
    }
    if (err.response.data.msg) {
        popupWindowClose()
        popupWindow("<h3 class='text-red'>Error</h3>", err.response.data.msg, true, { width: 'auto' })
        return
    }
    popupWindowClose()

    if (typeof err.response.data === 'string') {
        popupWindow("<h3 class='text-red'>Error</h3>", err.response.data.trim(), true, { width: 'auto' })
        return
    }
    popupWindow("<h3 class='text-red'>Error</h3>", JSON.stringify(err.response.data), true, { width: 'auto' })
}

const checkParseJson = async (response) => {
    if (response != null && response.status === 401) {
        location.href = "/login"
        return
    }
    let text
    try {
        text = await response.text()
    } catch (e) {
        return Promise.reject(e);
    }
    let parsed;
    try {
        parsed = JSON.parse(text)
    } catch (e) {
        return Promise.reject(new Error("Parse Json Err: [ " + text + " ]"));
    }
    const {
        status
    } = response;
    if (status >= 200 && status < 300) {
        return parsed;
    }
    let err = new Error()
    if (parsed.message) {
        err.message = parsed.message
    } else if (parsed.msg) {
        err.message = parsed.msg
    } else {
        err.message = JSON.stringify(response)
    }
    return Promise.reject(err);
};

const globalTranslateApiPrefix = "https://cvt.flysay.com/convert.jsonp?fast=0&group=11&s="

const generateCanvasID = () => {
    // 创建一个不可见的 canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 设置 canvas 的宽高
    canvas.width = 200;
    canvas.height = 50;

    // 绘制一些图形或文字
    ctx.fillStyle = '#f60';
    ctx.fillRect(10, 10, 150, 30);
    ctx.fillStyle = '#069';
    ctx.font = '16px sans-serif';
    ctx.fillText('Hello, world!', 10, 40);

    // 获取 canvas 图像数据
    const dataUrl = canvas.toDataURL();

    // 对图像数据进行哈希运算生成唯一 ID
    return Math.abs(_hashStringSimple(dataUrl));
}

function getBrowserUniqueId() {
    let id = sessionStorage.getItem('BU_NO')
    if (id) {
        return id
    }
    id = generateCanvasID()
    sessionStorage.setItem('BU_NO', id)
    return id
}

// 简单的哈希函数
function _hashStringSimple(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // 转为32位整数
    }
    return hash.toString();
}


(function () {
    if (sessionStorage.getItem("reload") === "1") {
        window._counting_232_8d73 = 0
        let reloadTimer0123 = setInterval(() => {
            if (sessionStorage.getItem("reload") !== "1" || (window._counting_232_8d73++) > 600) {
                clearInterval(reloadTimer0123)
                return
            }
            fetch("/detect/modify?_=" + new Date().getTime()).then(checkParseJson).then((data) => {
                data.data.modify && location.reload()
            }).catch((err) => {
                console.log("需要检查detectModify进程是否正常运行, 早期启动命令为 docker exec -it nginx bash 找到对应路径 nohup ./detectModify -web :8744 &")
            })
        }, 1000)
        console.log("sessionStorage.setItem('reload', 0)")
    } else {
        console.log("sessionStorage.setItem('reload', 1)")
    }
})()

var Base64Util = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64Util._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64Util._utf8_decode(output);

        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

//默认 callback 拦截
function _callback_default_(res) {
    console.log(res);
    if (res) {
        app.$notify({
            title: "API调用失败",
            message: (res.message || "未知错误"),
            type: 'warning',
            duration: 10000,
        });
        hideLoading()
        return
    }
}

function catchCheck(err) {
    if (err instanceof Event) {
        console.log(err)
        app.$notify({
            message: "[Event]发生错误, 请求失败",
            type: 'warning',
            duration: 10000,
        });
        return
    }
    if (err instanceof Error) {
        console.log(err)
        app.$notify({
            message: "[Error]发生错误, 未知错误",
            type: 'warning',
            duration: 10000,
        });
        return
    }

    // app.$notify({
    //     message: "异常, 未知错误",
    //     type: 'warning',
    //     duration: 10000,
    // });
}
function jsonpCheckResult(res) {
    if (res.resultCode !== 0) {
        return Promise.resolve(res)
    }

    let trans = ""
    if (res.transMeta && res.transMeta.shortCode && res.transMeta.transCode) {
        trans += "(" + res.transMeta.shortCode + ":" + res.transMeta.transCode + ")"
    }
    app.$notify({
        message: trans + res.message,
        type: 'warning',
        duration: 10000,
    });
    return Promise.reject(res)
}
function sampleEscapeHtml(string) {
    return string.replace(/[&<>"']/g, function (match) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[match];
    });
}

const NoInterestWords = [
    /\b(Claro|mitelcel|telcel|telmex|izzi|movistar|rsos|att|miatt|unefon|imei|mb|gb|megas|telnor|totalplay|BAIT|dish)\b/ig,
    'miat&t',
    'at&t',
]

const ECommerceExpression = [
    /\b(7.Eleven|Sears|La.Comer|Chedraui|Soriana|Circle.K|OXXO|costco|coppel|amazon|mercado|walmart|liverpool)\b/ig,
]

const CreditCardWords = [
    /\b(TDC|Stori|Rappicard|Hey.Banco|Vexi|nu|falabella)\b/ig,
    /\b(tarjeta.de.credito)\b/ig,
    /\b(didi.card)\b/ig,
    /\b(tarjeta.stori)\b/ig,
    /\b(tarjeta.liverpool)\b/ig,
]

const InterestRegexPattern = /\b(banbajio|credito|prestar|loan|hipoteca|prestamos?|ABC.CAPITAL|ACTINVER|AFIRME|ARCUS|ASP.INTEGRA.OPC|AUTOFIN|AZTECA|BaBien|BAJIO|BANAMEX|BANCO.COVALTO|BANCOMEXT|BANCOPPEL|BANCO.S3|BANCREA|BANJERCITO|BANKAOOL|BANK.OF.AMERICA|BANK.OF.CHINA|BANOBRAS|BANORTE|BANREGIO|BANSI|BANXICO|BARCLAYS|BBASE|BBVA.MEXICO|BMONEX|CAJA.POP|CAJA.TELEFONIST|INTERCAM|CBM.BANCO|CIBANCO|CI.BOLSA|CLS|CoDi.Valida|COMPARTAMOS|CONSUBANCO|CREDICAPITAL|CREDICLUB|CRISTOBAL.COLON|Cuenca|FINAMEX|FINCOMUN|FOMPED|FONDEADORA|FONDO.FIRA|GBM|HIPOTECARIA.FED|HSBC|ICBC|INBURSA|INDEVAL|INMOBILIARIO|INTERCAM.BANCO|INVEX|JP.MORGAN|KLAR|KUSPIT|LIBERTAD|MASARI|Mercado.Pago|MIFEL|MIZUHO.BANK|MONEXCB|MUFG|MULTIVA.BANCO|NAFIN|NU.MEXICO|NVIO|PAGATODO|PROFUTURO|SABADELL|SANTANDER|SCOTIABANK|SHINHAN|STP|TESORED|TRANSFER|UNAGRA|VALMEX|VALUE|VECTOR|VE.POR.MAS|VOLKSWAGEN|citibanamex|bradescard|AKALA|OPM|BANSEFI|BANAMEX2|BBVA)\b/ig

const customHighlightRulesStr = localStorage.getItem('customHighlightRules_v2')
let customHighlightRules = customHighlightRulesStr ? JSON.parse(customHighlightRulesStr) : null
if (!customHighlightRules) {
    customHighlightRules = {
        keyword: '',
        regex: '(银行卡|信用卡)\n(逾期|贷款)\n\\b(liquidadas|liquidado|liquitado|reembolsado|gracias.por.tu.reembolso|liqiudado)\\b\n\\b(vencido|vencida|vencieron|vencio)\\b\n\\b(no.fue.exitosa|rechazada|desafortunadamente|lo.sentimos|lamentamos|rechazado|no.fue.aprobada|no.ha.sido.aprobada|lamentablemente)\\b'
    }
    localStorage.setItem('customHighlightRules_v2', JSON.stringify(customHighlightRules))
}

function highlightSmsContent(row, linkClickAvailable = false) {
    //cache first
    if (row._renderCache) {
        return row._renderCache
    }

    const smsContent = row.sampleOne || row.content;
    let str = sampleEscapeHtml(smsContent)

    //highlight signature
    if (row.signature) {
        str = str.replace(row.signature, '<strong class="signature-words">' + row.signature + '</strong>')
    }

    //highlight links
    if (row.attr?.links?.length) {
        row.attr?.links.forEach((link) => {
            if (link?.length > 3) {
                if (linkClickAvailable) {
                    let aHref = link.indexOf('http') === 0 ? link : 'http://' + link
                    str = str.replace(link, '<span style="text-decoration: underline;text-decoration-color:#67C23A;color:#67C23A"><i class="fad fa-external-link"></i> <a class="link-words" target="_blank" href="' + aHref + '"><strong>' + link + '</strong></a></span>')
                } else {
                    str = str.replace(link, '<strong class="link-words">' + link + '</strong>')
                }
            }
        })
    }

    //other highlight 
    str = _highlightString(str)

    //cache
    row._renderCache = str
    return row._renderCache
}

function highlightSmsZhCn(item) {
    var str = item.zhCn || ""
    item.renderZhCn = _highlightString(str)
}

function _highlightString(str) {
    //highlight no interest words
    NoInterestWords.forEach((expression) => {
        if (typeof expression === 'string') {
            str = ignoreCaseReplace(str, expression, '<strong class="no-interest-words">' + expression + '</strong>')
        } else {
            str = str.replace(expression, '<strong class="no-interest-words">$1</strong>')
        }
    })

    //highlight ECommerceExpression
    ECommerceExpression.forEach((expression) => {
        if (typeof expression === 'string') {
            str = ignoreCaseReplace(str, expression, '<strong class="e-commerce-words">' + expression + '</strong>')
        } else {
            str = str.replace(expression, '<strong class="e-commerce-words">$1</strong>')
        }
    })

    //highlight CreditCardWords
    CreditCardWords.forEach((expression) => {
        if (typeof expression === 'string') {
            str = ignoreCaseReplace(str, expression, '<strong class="credit-card-words">' + expression + '</strong>')
        } else {
            str = str.replace(expression, '<strong class="credit-card-words">$1</strong>')
        }
    })

    // InterestRegexPattern highlight
    str = str.replace(InterestRegexPattern, '<strong class="interest-words">$1</strong>')

    //custom highlight rules
    if (customHighlightRules) {
        customHighlightRules.keyword.split('\n').forEach((rule) => {
            expression = rule.trim()
            if (expression) {
                str = ignoreCaseReplace(str, expression, '<strong class="cus-keyword-words">' + expression + '</strong>')
            }
        })

        customHighlightRules.regex.split('\n').forEach((rule) => {
            let pattern = rule.trim()
            pattern = pattern.replaceAll(" ", "\\s")//todo 空格转义成\s 测试一段时间没问题后则应用到上面的默认规则中
            if (pattern) {
                try {
                    str = str.replace(new RegExp(pattern, "ig"), '<strong class="cus-primary-words">$1</strong>')
                } catch (ignore) {
                    if (!window._error_warnning_once) {
                        window._error_warnning_once = true
                        app.$notify({ message: '自定义正则表达式高亮语法错误', type: 'warning', duration: 10000 });
                    }
                }
            }
        })
    }
    return str
}

function ignoreCaseReplace(str, search, replace) {
    if (!str || !search) {
        return str
    }

    const strLower = str.toLowerCase();
    const searchLower = search.toLowerCase();
    let startIndex = strLower.indexOf(searchLower);
    if (startIndex !== -1) {
        return str.substring(0, startIndex) + replace + str.substring(startIndex + search.length);
    }

    return str
}

function splitString(str, size = 1000) {
    const result = [];
    if (str && size && size > 0) {
        for (let i = 0; i < str.length; i += size) {
            result.push(str.slice(i, i + size));
        }
    }
    return result;
}

// 调用后端短信console接口使用, 需要传递 reqNo / accessToken
async function jsonpRequest(reqUrl, params, timeout = 55000) {
    let urlPayload = getUrlPayload()
    if (!urlPayload || !urlPayload.apiServer) {
        setTimeout(() => {
            app.$notify({ message: '无权限访问, 请通过管理系统后台打开', type: 'error', duration: 10000 });
        }, 323)
        return Promise.reject("apiServer not found")
    }

    return new Promise((resolve, reject) => {
        //create random fun name
        if (!window._random_fun_create_prefix_incr) {
            window._random_fun_create_prefix_incr = 0
        }
        window._random_fun_create_prefix_incr++
        let funName = 'ras_79_8fa62377fSa62_' + window._random_fun_create_prefix_incr;
        window[funName] = function (res) {
            resolve(res)
            // 清理
            cleanup();
        }


        // params must be json object
        params['fun'] = funName
        params['reqNo'] = urlPayload.reqNo
        params['accessToken'] = urlPayload.accessToken

        // let base64Str = btoa(JSON.stringify(params))
        // let base64Str = Base64Util.encode(unescape(encodeURIComponent(JSON.stringify(params))))
        // let base64Str = window.btoa(unescape(encodeURIComponent(JSON.stringify(params))))
        let base64Str = Base64.encode(JSON.stringify(params))
        if (reqUrl.indexOf("?") > 1) {
            reqUrl = reqUrl + "&X-CHOICE-TAG=chen&base64=" + base64Str
        } else {
            reqUrl = reqUrl + "?X-CHOICE-TAG=chen&base64=" + base64Str
        }

        //create script element to call jsonp
        let scriptEl = document.createElement('script');
        scriptEl.src = reqUrl
        // scriptEl.crossOrigin = "anonymous";
        scriptEl.defer = true;
        scriptEl.async = true;
        // 错误处理
        scriptEl.onerror = function (err) {
            reject(err)
            cleanup();
        }
        document.getElementsByTagName('head')[0].appendChild(scriptEl);

        // 设置超时
        const timeoutId = setTimeout(() => {
            reject(new Error('request timeout'));
            cleanup();
        }, timeout);

        // 清理函数：移除 script 元素、回调函数和清除超时
        function cleanup() {
            clearTimeout(timeoutId);
            scriptEl.remove();
            delete (window)[funName];
        }
    })
}

// 给调用外部翻译专用的
async function jsonpRequestForTranslate(reqUrl, timeout = 30000) {
    return new Promise((resolve, reject) => {
        //create random fun name
        if (!window._random_fun_create_prefix_incr4522) {
            window._random_fun_create_prefix_incr4522 = 0
        }
        window._random_fun_create_prefix_incr4522++
        let funName = 'ras_79_8fass261fSDa62_' + window._random_fun_create_prefix_incr4522;
        window[funName] = function (res) {
            resolve(res)
            // 清理
            cleanup();
        }

        if (reqUrl.indexOf("?") > 1) {
            reqUrl = reqUrl + "&callback=" + funName
        } else {
            reqUrl = reqUrl + "?callback=" + funName
        }

        //create script element to call jsonp
        let scriptEl = document.createElement('script');
        scriptEl.src = reqUrl
        scriptEl.defer = true;
        scriptEl.async = true;
        scriptEl.onerror = function (err) {
            reject(err)
            // 清理
            cleanup();
        }
        document.getElementsByTagName('head')[0].appendChild(scriptEl);

        // 设置超时
        const timeoutId = setTimeout(() => {
            reject(new Error('request timeout'));
            cleanup();
        }, timeout);

        // 清理函数：移除 script 元素、回调函数和清除超时
        function cleanup() {
            clearTimeout(timeoutId);
            scriptEl.remove();
            delete (window)[funName];
        }
    })
}

function getParentPageAccessUrl() {
    // let url = document.referrer || "https://ms-console.itessy.cn:1443/"
    // let url = document.referrer

    //生产环境修改标题

    if (location.host.includes('.mx.flysay.com')) {
        document.title = "[墨西哥] 🇲🇽 短信标记"
    } else if (location.host.includes('.cl.flysay.com')) {
        document.title = "[智利] 🇨🇱 短信标记"
    } else if (location.host.includes('.flysay.com')) {
        document.title = "[生产环境] 💌 短信标记"
    }

    return getUrlPayload().apiServer || ""

    if (false) {

        let url = ""

        if (!url && (location.host.includes('bitiful') || location.host.includes('.flysay.com'))) { //http://message.s3.bitiful.net/sms/index.html  http://sms.flysay.com/sms/index.html#/
            // url = "https://ms-console.itessy.cn:1443/"
            url = "https://console.maxicredito.loan/"
            document.title = "[生产环境] 短信标记平台 💌"
        }
        if (!url) {
            url = "http://vitech-manage-gateway.to.dev.com/"
            // url = "http://vitech-manage.test.com/"
            // url = "http://192.168.2.111:44002/"
            // url = "http://10.0.0.44:44002/"
        }
        // let url = document.referrer || "http://vitech-manage.test.com/"
        if (url.endsWith("/")) {
            url = url.substring(0, url.length - 1)
        }

        // localStorage.setItem("parent-page-access-url", url)
        return url
    }
}

function getUrlPayload() {
    let s = getQueryParam('s')
    const envMap = {
        '1': 'prod'
    }
    const apiServerMap = {
        '1': 'https://ms-console.itessy.cn:1443', //URL参数压缩
        '2': 'https://console.maxicredito.loan', //URL参数压缩
        '6': 'https://console.middlela.com', //URL参数压缩
    }

    if (s) {
        let arr = atob(s).split(";");
        let env = envMap[arr[3]] || arr[3] //dev/test/prod
        let url = apiServerMap[arr[4]] || arr[4] //URL参数压缩
        let region = arr[5] // region

        //   if (!url) {
        //default
        // return "https://console.maxicredito.loan"
        //   }
        if (url.endsWith('/')) {
            url = url.substring(0, url.length - 1)
        }
        let https = false
        let http = false
        if (url.startsWith('http://')) {
            http = true
            url = url.replace('http://', '')
        }
        if (url.startsWith('https://')) {
            https = true
            url = url.replace('https://', '')
        }
        if (http) {
            url = "http://" + url
        } else if (https) {
            url = "https://" + url
        } else if (env === "prod") {
            url = "https://" + url
        } else if (window.location.href.startsWith("https://")) {
            url = "https://" + url
        } else {
            url = "http://" + url
        }

        // url = "http://127.0.0.1:44002"

        if (!region) {
            if (location.host.includes('.mx.flysay.com')) {
                region = "MEXICO"
            } else if (location.host.includes('.cl.flysay.com')) {
                region = "CHILE"
            }
        }

        if (region) {
            region = region.toUpperCase()
        }

        return {
            query: this.query || arr[0],
            reqNo: arr[1],
            accessToken: arr[2],
            env: env,
            apiServer: url,
            region: region,
        }
    }
    return {}
    // return JSON.parse(atob(getQueryParam('payload')));
}

// API基础URL
function apiBaseUrl() {

    if (!location.hostname.startsWith('192.168.') && !location.hostname.startsWith('10.') && !location.hostname.startsWith('172.') && !location.hostname.startsWith('localhost') && !location.hostname.startsWith('127.0.') && !location.hostname.startsWith('n.cc')) {
        //非局域网, 生产环境
        return "";
    }

    let u = "http://127.0.0.1:44056"

    if (window.location.port == '8551' || window.location.port == '8552') {
        //邵含的本地开发机器
        u = "/"
    }

    if (u.endsWith('/')) {
        return u.slice(0, -1);
    }
    return u;
}

function getTimeElapsed(startTime) {
    // 计算时间差（毫秒）
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = now - start;

    // 转换为秒
    const diffSeconds = Math.floor(diffMs / 1000);

    // 如果时间差为负数或0，返回0秒
    if (diffSeconds <= 0) {
        return '0秒';
    }

    // 计算各个时间单位
    const days = Math.floor(diffSeconds / 86400);
    const hours = Math.floor((diffSeconds % 86400) / 3600);
    const minutes = Math.floor((diffSeconds % 3600) / 60);
    const seconds = diffSeconds % 60;

    // 构建返回字符串
    let result = '';

    if (days > 0) {
        result += `${days}天`;
        if (hours > 0) {
            result += `${hours}时`;
        }
    } else if (hours > 0) {
        result += `${hours}时`;
        if (minutes > 0) {
            result += `${minutes}分`;
        }
    } else if (minutes > 0) {
        result += `${minutes}分`;
        // if (seconds > 0) {
        // result += `${seconds}秒`;
        // }
    } else {
        result += `${seconds}秒`;
    }

    return result;
}


const mixins = { methods: { byteFormat, } }

// 时间戳格式化函数 (13位毫秒时间戳)
function formatTimestamp(timestamp) {
    if (!timestamp) {
        return '-';
    }
    const d = new Date(timestamp);
    return d.getFullYear() + '/' + pad2(d.getMonth() + 1) + '/' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
}

// Token管理函数
function setApiAccessToken(token) {
    if (token) {
        localStorage.setItem('apiAccessToken', token);
    } else {
        localStorage.removeItem('apiAccessToken');
    }
}

function getApiAccessToken() {
    return localStorage.getItem('apiAccessToken') || '';
}

function removeApiAccessToken() {
    localStorage.removeItem('apiAccessToken');
}

// Fetch封装 - 自动添加token到请求头
function fetchWithToken(url, options) {
    options = options || {};
    options.headers = options.headers || {};
    const token = getApiAccessToken();
    if (token) {
        options.headers['X-API-ACCESS-TOKEN'] = token;
    }
    let res = fetch(url, options);

    //捕获401错误，自动跳转登录
    res = res.then(response => {
        if (response.status === 401) {
            // 跳转到登录页
            window.location.href = '#/login';
            return Promise.reject(new Error('Unauthorized'));
        }
        return response;
    });

    return res
}