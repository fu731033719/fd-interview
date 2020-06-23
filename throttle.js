/**
*
* @param fn {Function}   实际要执行的函数
* @param threshhold {Number}  执行间隔，单位是毫秒（ms）
* @return {Function}     返回一个“节流”函数
*/
function throttle(fn, threshhold) {
    var last
    var timer
    threshhold || (threshhold = 250)
    return function () {
        var context = this
        var args = arguments
        var now = +new Date()
        if (last && now < last + threshhold) {
            clearTimeout(timer)
            timer = setTimeout(function () {
                last = now
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}