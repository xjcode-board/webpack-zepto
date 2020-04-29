## Webpack + zepto 移动端项目

    适用场景：除复杂单页应用以外的，简单的活动落地页或者hybird嵌入H5

## 功能

    1. es6/es7  //新语法还是很香的^_^
    2. zepto/jquery //移动端建议用zepto,在不选用mvvm框架的情况下，操作dom还是我们的$最方便
    3. lib-flexible + rem //移动端适配
    4. html模板引擎pug  //纯粹为了偷懒，少写嵌套闭合标签，如果想用回html记得修改webpack.base.js
    5. env-cmd 自定义环境打包

## 目录

    ```

    layout ----- 公共布局html模板
    lib----
      |----js    工具类js
      |----style 公共样式
    view
      |---activity  简单的静态页面
      |---web       复杂的业务页面  

      
    ```

## 常用命令

    ```
    npm run start //本地预览
    
    npm run build //打包

    npm run build:test //自定义环境打包

    ```
