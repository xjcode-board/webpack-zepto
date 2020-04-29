import $ from "n-zepto"
import "weui"
import weui from "weui.js"
/**
 *工具类
 *
 * @export
 * @class Util
 */
export default class Util {
    constructor() {
        this.baseUrl = 'https://cnodejs.org/api/v1'
        this.windowUrl = window.location.href
        this.origin = window.location.origin
        this.params = this.getUrlParams()
        this.loading = null
    }
    // 获取url参数
    getUrlParams(url) {
        let uri = url || this.windowUrl
        let match = uri && uri.match(/([^?=&]+)=([^?&]+)/g)

        return match && match.reduce(function (a, b) {
            let val = b.split(/([^?=&]+)=([^?&]+)/g)
            a[val[1]] = val[2]
            return a
        }, {})
    }
    showLoading() {
        this.loading = weui.loading('加载中...');
    }

    hideLoading() {
        this.loading.hide()
    }

    showTips(msg) {
        weui.topTips(msg, 2000);
    }
    // 请求
    fetch(option) {
        const _this = this
        this.showLoading()
        return new Promise((resolve, reject) => {
            $.ajax({
                type: option.method,
                url: option.url,
                data: option.method === 'get' ? option.params : JSON.stringify(option.params),
                contentType: 'application/json',
                timeout: 10000,
                success: function (data) {
                    resolve(data)
                },
                error: function (xhr, type) {
                    try {
                        let errorMsg = JSON.parse(xhr.response)['error']['message']
                        _this.showTips(errorMsg)
                        reject(errorMsg)
                    } catch (error) {
                        _this.showTips(`网络错误（status:${xhr.status}）`)
                        reject(xhr.status)
                    }

                },
                complete: function () {
                    _this.hideLoading()
                }
            })
        }).catch(err => {
            _this.showTips("网络繁忙，请稍后重试！");
            console.log(`错误信息: ${err}`)
        })
    }
}