// 获取基础url
 url ='http://127.0.0.1:9000/declaration/list'
window.document.location.host   //表示当前域名 + 端口号 127.0.0.1:9000
window.document.location.hostname  //表示域名 127.0.0.1
window.document.location.href   //表示完整的URL http://127.0.0.1:9000/declaration/list
window.document.location.port   //表示端口号 9000
window.document.location.protocol   //表示当前的网络协议 http:
const basePath = function() {
	// 获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
	let curWwwPath = window.document.location.href;
	// 获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
	let pathName = window.document.location.pathname;
	let pos = curWwwPath.indexOf(pathName);
	// 获取主机地址，如： http://localhost:8080
	let localhostPath = curWwwPath.substring(0, pos);
	// 获取带"/"的项目名，如：/ems
	let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	// 获取项目的basePath http://localhost:8080/ems/
	let basePath = localhostPath + projectName + "/";
	return basePath;
};
/**
 * 获取URL后缀属性值 
   例:http://127.0.0.1:9000/declaration/list?id=001&flag=true 
   值: getQueryString("id")=001
 */
function getQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return (r[2]);
  }
  return null;
};
/**
 * 描述：获取url中的参数
   例:http://127.0.0.1:9000/declaration/list?id=001&flag=true 
   值: {id: "001", flag: "true"}  
 */
function getUrllets() {
  let vars = {};
  let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars[hash[0]] = hash[1];
  }
  return vars;
}
// 生成唯一标识！
function uuid(len, radix) {
	let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	let uuid = [], i;
	let timeCur = new Date();
	radix = radix || chars.length;
	if (len) {
		for (i = 0; i < len; i++)
			uuid[i] = chars[0 | Math.random() * radix];
	} else {
		let r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return uuid.join('') + timeCur.getTime();
};
/*
 * cookies 操作 Malson 方法二localStorage.name="malson"
 */
function setCookie(c_name, value, expiredays) {
	let exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name
			+ "="
			+ escape(value)
			+ ((expiredays == null) ? "; path=/" : ";expires="
					+ exdate.toGMTString() + "; path=/");
};
// 读取cookies
function getCookie(name) {
	let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) {
		return (arr[2]);
	} else {
		return null;
	}
}

// 删除cookies
function delCookie(name) {
	let exp = new Date();
	exp.setTime(exp.getTime() - 1000);
	let cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
				+ "; path=/";
};
(function () {
 var calc = {
  /**
     * @function 加法函数，用来得到精确的加法结果
     * @description  javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
     * @param arg1 第一个加数
     * @param arg2 第二个加数
     * @param d 要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
       @returns 两数相加的结果
     */
    Add (arg1, arg2) {
      let arg1Arr = arg1.toString().split('.')
      let arg2Arr = arg2.toString().split('.')
      let d1 = arg1Arr.length === 2 ? arg1Arr[1] : ''
      let d2 = arg2Arr.length === 2 ? arg2Arr[1] : ''
      let maxLen = Math.max(d1.length, d2.length)
      let m = Math.pow(10, maxLen)
      let result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen))
      let d = arguments[2] // arguments 为获取所有传入的参数 取第三个参数
      return typeof d === 'number' ? Number((result).toFixed(d)) : result
    },
    /**
     * @function 减法函数，用来得到精确的减法结果
     * @description 函数返回较为精确的减法结果
     * @param arg1 第一个加数
     * @param arg2 第二个加数
     * @param d 要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
       @returns 两数相减的结果
     */
    Sub (arg1, arg2) {
      return this.Add(arg1, -Number(arg2), arguments[2])
    },
    /**
     * @function 精确的乘法运算
     * @description  函数返回较为精确的乘法结果
     * @param arg1 第一个乘数
     * @param arg2 第二个乘数
     * @param d 要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
       @returns 两数相乘的结果
     */
    Mul (arg1, arg2) {
      let r1 = arg1.toString()
      let r2 = arg2.toString()
      let m
      let resultVal
      let d = arguments[2] // arguments 为获取所有传入的参数 取第三个参数
      m = (r1.split('.')[1] ? r1.split('.')[1].length : 0) + (r2.split('.')[1] ? r2.split('.')[1].length : 0)
      resultVal = Number(r1.replace('.', '')) * Number(r2.replace('.', '')) / Math.pow(10, m)
      return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)))
    },
    /**
     * @function 精确的除法运算
     * @description  函数返回较为精确的除法结果
     * @param arg1 除数
     * @param arg2 被除数
     * @param d 要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
       @returns arg1除于arg2的结果
     */
    Div (arg1, arg2) {
      let r1 = arg1.toString()
      let r2 = arg2.toString()
      let m
      let resultVal
      let d = arguments[2]
      m = (r2.split('.')[1] ? r2.split('.')[1].length : 0) - (r1.split('.')[1] ? r1.split('.')[1].length : 0)
      resultVal = Number(r1.replace('.', '')) / Number(r2.replace('.', '')) * Math.pow(10, m)
      return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)))
    }
 };
 window.Calc = calc;
}());
/*
 纯数据json对象的深度克隆,一般用来深拷贝一个json对象
 还可以用来去除值不具有JSON 表示形式（
 数字、字符串、逻辑值、数组、对象、null）的属性，
 也就是说像undefined和function这样的属性值
*/
simpleClone: function (data) {
  let obj = {}
  obj = JSON.parse(JSON.stringify(data))
  return obj
},


//克隆对象的方法 浅层拷贝
function clone(origin){
	//获取origin的原型对象
	let originProto = Obejct.getPrototypeOf(origin);
	//根据原型对象，创建新的空对象，再assign
	return Object.assign(Object.create(originProto),origin);
}
// 浅拷贝
function copy(obj){
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}
// 深拷贝 采用递归层层拷贝
function deepCopy(obj){
  if(typeof obj != 'object'){
      return obj;
  }
  var newobj = {};
  for ( var attr in obj) {
      newobj[attr] = deepCopy(obj[attr]);
  }
  return newobj;
}
/**
	深度拷贝
	可以拷贝像undefined和function这样的属性值
	1、用new obj.constructor ()构造函数新建一个空的对象，而不是使用{}或者[],这样可以保持原形链的继承；
	2、用obj.hasOwnProperty(key)来判断属性是否来自原型链上，因为for..in..也会遍历其原型链上的可枚举属性。
	3、上面的函数用到递归算法，在函数有名字，而且名字以后也不会变的情况下，这样定义没有问题。但问题是这个函数的执行与函数名 factorial 紧紧耦合在了一起。为了消除这种紧密耦合的现象，需要使用 arguments.callee。

*/
function  cloneAll(obj) { 
  if(obj === null) return null 
  if(typeof obj !== 'object') return obj;
  if(obj.constructor===Date) return new Date(obj); 
  var newObj = new obj.constructor ();  //保持继承链
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
          var val = obj[key];
          newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
      }
  }  
  return newObj;  
}; 
/**************************************时间格式化处理************************************/
/**
@params fmt 格式
@params date 日期  类似于 new Date()
*/
function dateFtt(fmt,date)   
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

// 是否不为空：true为空-false不为空
function isNotEmpty(obj) {
  if (obj === null || obj === undefined || obj === '') {
    return false
  }
  return true
},
  // 删除数组某个值
function removeByValue(obj, val) {
	for (var i = 0; i < obj.length; i++) {
	  if (obj[i] === val) {
	    obj.splice(i, 1)
	    break
	  }
	}
},
/**
 * 
 * @param calculations  计算值的集合
 * @param calculationType 计算类型,0,1,2,3分别对应加减乘除
 * @param roundingMode  计算结果小数保留的方式，四舍五入等
 * @param digit 保留小数的位数
 * @param isZeroNoShow  小数点后全为0是否显示，1显示，0不显示
 */
function calculation(calculations,calculationType,roundingMode,digit,isZeroNoShow){
  var resultData = {};
  var result = "";
  if(!calculations || calculations.length<1 ||!calculationType || calculationType.length<0 ){
    resultData.result = result;
    return resultData;
  }
  if(!digit){
    digit = "0";
  }
  if(!isZeroNoShow){
    digit = "1";
  }
  var bigDecimalResult = new BigDecimal(calculations[0]);
  var bigDecimal =null;
  var calculation ="";
  for(var i=1;i<calculations.length;i++){
    if(!calculations[i]){
      calculation = "0";
    }else{
      calculation = calculations[i];
    }
    bigDecimal = new BigDecimal(calculation);
    if(calculationType=="0"){
      bigDecimalResult = bigDecimalResult.add(bigDecimal);
    }else if(calculationType=="1"){
      bigDecimalResult = bigDecimalResult.subtract(bigDecimal);
    }else if(calculationType=="2"){
      bigDecimalResult = bigDecimalResult.multiply(bigDecimal).setScale(parseInt(digit), parseInt(roundingMode));
    }else if(calculationType=="3"){
      bigDecimal = new BigDecimal(calculations[i]);
      if(calculation=="0"){
        resultData.result="";
        return resultData;
      }else{
        bigDecimalResult = bigDecimalResult.divide(bigDecimal, parseInt(digit), parseInt(roundingMode));
      }
    }else{
      resultData.result="";
      return resultData;
    }
  }
  if(isZeroNoShow=="1" && parseInt(bigDecimalResult) == bigDecimalResult.toString() ){
    result = parseInt(bigDecimalResult);
  }else{
    result = bigDecimalResult.toString();
  }
  resultData.result = result;
  return resultData;
}
//特殊字符
function html_encode(str) 
{ 
    var s = ""; 
    if (!str || str.length == 0) return ""; 
    s = str.replace(/&/g, "&amp;"); 
    s = s.replace(/</g, "&lt;"); 
    s = s.replace(/>/g, "&gt;"); 
    s = s.replace(/ /g, "&nbsp;"); 
    s = s.replace(/\'/g, "&#39;"); 
    s = s.replace(/\"/g, "&quot;"); 
        s = s.replace(/\n/g, "<br/>"); 
    return s; 
} 

function html_decode(str) { 
    var s = ""; 
    if (str.length == 0) return ""; 
    s = str.replace(/&amp;/g, "&"); 
    s = s.replace(/&lt;/g, "<"); 
    s = s.replace(/&gt;/g, ">"); 
    s = s.replace(/&nbsp;/g, " "); 
    s = s.replace(/&#39;/g, "\'"); 
    s = s.replace(/&quot;/g, "\""); 
    s = s.replace(/<br\/>/g, "\n"); 
    return s; 
}
/**
 * 替换指定位置数据
 * @param strObj
 * @param pos
 * @param replaceText
 * @returns
 */
function replacePos(strObj, pos, replaceText){
	if(strObj && pos>-1){
		var str = strObj.substr(0, pos - 1) + replaceText + strObj.substr(pos, strObj.length);
		return str;
	}else{
		return "";
	}
}
/**
 * 控制输入中英文字符长度，一个中文当做2个长度来控制
 * @param inpt
 * @param maxlen
 */

function checklen(inpt, maxlen) {
	var str = inpt.value;
	var len = str.length;
	//utf-8字节长度
	var realLength = 0;
	for (var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128&& charCode != 10) {
			realLength += 1;
		} else {
			// 如果是中文则长度加2
			realLength += 2;
		}
		if (realLength > maxlen) {
			inpt.value = str.substr(0, i);
			return;
		}
	}
}
/**
 * 控制输入中英文字符长度，一个中文当做3个长度来控制
 * @param inpt
 * @param maxlen
 */

function checklen1(inpt, maxlen) {
	var str = inpt.value;
	var len = str.length;
	//utf-8字节长度
	var realLength = 0;
	for (var i = 0; i < len; i++) {
		charCode = str.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128&& charCode != 10) {
			realLength += 1;
		} else {
			// 如果是中文则长度加2
			realLength += 3;
		}
		if (realLength > maxlen) {
			inpt.value = str.substr(0, i);
			return;
		}
	}
}
/**
 * 控制输入数字格式，maxlen长度，flmax精度
 */
function checkflaot(inpt, maxlen, flmax) {

	var val = inpt.value;
	
	//检查是否是非数字值    
	if (isNaN(val)) {
		inpt.value = 0;
		return;
	}
	//当不足flmax位小数时，自动补0
	var s_x = val.toString();
	var pos_decimal = s_x.indexOf('.');

	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + flmax) {
		s_x += '0';
	}
	//整数位最大长度
	var intmax=maxlen-flmax;
	var num=s_x.split(".");
	//整数位截取
	var intnum = num[0].substr(-intmax);
	//小数位截取
	var bitnum = num[1].substr(0,flmax);
	inpt.value = intnum+'.'+bitnum;
}

/**
 * 只允许输入正整数
 * @param obj
 */
function decCheckInt(obj) {
    var t = obj.value.replace(/[^(\(\)\d\&\|)]/g,"");
    if(obj.value!=t)
        obj.value=t;
},
// 获取浏览器类型
myBrowser () {
  let userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  let isOpera = (userAgent.indexOf('Opera') > -1)
  if (userAgent.indexOf('Opera') > -1) {
    return 'Opera'
  } // 判断是否Opera浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  } // 判断是否Firefox浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  } // 判断是否Safari浏览器
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE'
  } // 判断是否IE浏览器
},
/**
   * @description 计算字符串的字节
   * @param {String} value 需要计算长度的字符串
   * @param {Number} defaultFlag 一个中文占几个字节
   */
  decGetlen: function (value, defaultFlag) {
    if (!defaultFlag) {
      defaultFlag = 2
    } else {
      defaultFlag = +defaultFlag
    }
    let realLength = 0
    if (!value) {
      return 0
    }
    let str = value
    let len = str.length
    // utf-8字节长度
    for (let i = 0; i < len; i++) {
      let charCode = str.charCodeAt(i)
      if (charCode >= 0 && charCode <= 128) {
        realLength += 1
      } else {
        // 如果是中文则长度加2
        realLength += defaultFlag
      }
    }
    return realLength
  }