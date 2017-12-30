/**
 * [正则]
 * @author 张梦涵
 */
var baseReg = {};
//机身码
baseReg.mobile=/^\d+$/;
//身份证15位
baseReg.idCard15=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/
//身份证18位
baseReg.idCard18=/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
//邮编
baseReg.postCode=/^[a-zA-Z0-9]{3,12}$/


//物品组
//机身码
baseReg.targetType4_4=/^\d{14}$/;
//网卡
baseReg.targetType4_8=/^(([0-9A-Fa-f]){2}:){5}([0-9A-Fa-f]){2}$/;
//车牌号码
baseReg.targetType4_3=/^.{5,10}$/;
//物品名称
baseReg.targetType4_12=/^[\u4E00-\u9FA5]{1,50}$/;
//银行卡
baseReg.targetType4_11=/^\d{1,25}$/;
//文件名
baseReg.targetType4_9=/^.{1,100}$/;
//文件MD5
baseReg.targetType4_10=/^([a-fA-F0-9]{16})|([a-fA-F0-9]{32})|([a-fA-F0-9]{64})$/;

//地址组
//网址
baseReg.targetType6_2=/^.{1,100}$/;
//详细地址
baseReg.targetType6_5=/^.{1,100}$/;
//邮箱地址
baseReg.targetType6_4=/^.{1,29}@.{1,29}$/;
//IP地址
baseReg.targetType6_3=/^((25[0-5]|2[0-4]\d|(1\d{2})|([1-9]?\d))\.){3}(25[0-5]|2[0-4]\d|(1\d{2})|([1-9]?\d))$/;

//内容组
//文本
baseReg.targetType5_1=/^.{1,100}$/;

//大于零的正整数
baseReg.Intger = /^\+?[1-9]\d*$/;
//搜索条件过滤
baseReg.guolvSpecWord = /[_%']/;