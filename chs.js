/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Hold alt and click to buy': '按住alt键并点击购买',
    'Base change rate': '基本变化率',
    'Confirm HARD RESET': '确认硬重置',
    'Confirm SOFT RESET': '确认软重置',
    'Engineering': '工程符号',
    'HARD RESET': '硬复位',
    'Nevermind': '没关系',
    'Numbers format': '数字格式',
    'Scientific': '科学计数法',
    'Show shift&alt indicator': '显示 shift & alt 指示器',
    'Show tooltips': '显示工具提示',
    'SOFT RESET': '软重置',
    'Standard': '标准',
    'Default purchase amount': '默认购买数量',
    'Default purchase max limit': '默认购买最大上限',
    'Unpause': '取消暂停',
    'Ascend': '转生',
    'Double conversion rate for all letters': '所有字母双倍转化率',
    'Automatically get last letter when possible': '可能的情况下自动获得最后一个字母',
    'Get': '获取',
    'Transcend': '超越',
    'pause': '暂停',
    'play_arrow': '继续',
    'settings': '设置',
    'Buy 1 autoconverter for 1 next letter': '为下一个字母购买 1 个自动转换器',
    'arrow_upward': '↑',
    'add': '+',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    'Spending': '开支',
    'Pause': '暂停',
    'If the previous letter\'s production is below zero the maximum number will be bought regardless of the previous letter\'s production.': '如果前一个字母的产量低于零，则将购买最大数量，而不考虑前一个字母的产量。',
    'Hold shift and click to keep previous letter production above 100.': '按住shift键并点击，以将上一个字母的产生保持在100以上。',
    'Hold shift and click to buy': '按住Shift键并点击购买',
    'Hold alt and click to keep previous letter production above 1000.': '按住alt并点击，以使上一个字母的生产保持在1000以上。',
    'Generating': '生产中',

    //原样
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "Base change rate: ": "基本变化率：",
    "Generating: ": "生成: ",
    "Spending:": "支出: ",
    "Double conversion rate of letters ": "双倍转化率对于字母 ",
    "Pay for auto converter with current letters x10 if possible for letters ": "如果可能的话，用当前字母x10来购买自动转换器对于字母 ",
    "Buy auto convertor automatically when possible for letters ": "尽可能自动购买自动转换器对于字母 ",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    " ": "",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "\n": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?[A-Za-z%]{0,2}(\s.C)?\s*$/, //12.34K,23.4 °C
    /^x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\d+(\.\d+)?[A-Za-z]{0,2}.?\(?([+\-]?(\d+(\.\d+)?[A-Za-z]{0,2})?)?$/, //12.34M (+34.34K
    /^(\d+(\.\d+)?[A-Za-z]{0,2}\/s)?.?\(?([+\-]?\d+(\.\d+)?[A-Za-z]{0,2})?\/s\stot$/, //2.74M/s (112.4K/s tot
    /^\d+(\.\d+)?(e[+\-]?\d+)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?$/, //2.177e+6 (+4.01+4
    /^(\d+(\.\d+)?(e[+\-]?\d+)?\/s)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?\/s\stot$/, //2.177e+6/s (+4.01+4/s tot
];
var cnExcludePostfix = [
    /:?\s*x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /:?\s*x?\d+(\.\d+)?[A-Za-z]{0,2}$/, //: 12.34K, x1.5
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^Buy 1 auto converter for (.+) next letter$/, '使用 $1 个下一个字母，购买1个自动转换器'],
    [/^Buy 1 auto converter for (.+) of next letters$/, '使用 $1 个下一个字母，购买1个自动转换器'],
    [/^Buy maximum number of autoconverters that you can while keeping previous letter\'s production above (.+).$/, '购买最大数量的自动转换器，同时使上一个字母的产量保持在 $1 以上。'],
    [/^Each autoconverter will convert (.+) of the previous letter to (.+) of this letter each second$/, '每个自动转换器每秒都会将前一个字母的 $1 转换为该字母的 $2'],
    [/^Cost: (\d+) RP$/, '成本：$1 皇家点数'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);