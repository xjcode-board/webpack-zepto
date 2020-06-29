## Webpack + zepto 移动端项目

    适用场景：除复杂单页应用以外的，简单的活动落地页或者hybird嵌入H5

## 功能

    1. es6/es7  
    2. zepto/jquery 
    3. lib-flexible + rem 
    4. weui //weui.js
    5. html模板pug  //目前仅支持html和pug(想用什么模板直接在view下面新建即可,不用改webpack)
    6. cross-env //自定义环境变量

## 目录

    ```
    assets ----- 静态资源
    layout ----- 公共布局html/pug模板
    lib----
      |----js    工具类js
      |----style 公共样式
    view
      |---static  简单的静态页面
      |---web     复杂的业务页面    
    ```

## 常用命令

    ```
    npm run start //本地预览
    
    npm run build //打包

    npm run build:(test|pre|pro) //自定义环境打包

    ```
