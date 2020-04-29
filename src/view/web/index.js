import "./index.scss"
import "lib-flexible"
import Util from "@lib/js/util"

document.addEventListener('DOMContentLoaded', function () {
    class Web extends Util {
        constructor() {
            super()
            this.state = {
                $list: $('#list'),
                arr: []
            }
            this.init() //初始化
        }

        async init() {
            await this.load()
            this.ready()
        }

        async load() {
            const data = await this.fetchData()
            this.state.list = data.data
            this.render(this.state.list)
        }

        ready() {
            $('.item').on('click',function(){
                location.href = "https://m.baidu.com"
            })
        }

        fetchData() {
            return this.fetch({
                method: 'get',
                url: `${this.baseUrl}/topics`,
                params: {
                    limit: 10
                }
            })
        }

        createListItem(arr) {
            let fragment = document.createDocumentFragment()
            arr.forEach((v) => {
                let html = `
            <li class="item">${v.title}</li>
          `
                fragment.appendChild($(html)[0])
            })

            return fragment
        }

        render(arr) {
            let fragment = this.createListItem(arr)
            this.state.$list.append(fragment)
        }
    }
    new Web()
})