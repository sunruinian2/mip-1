/**
 * @file 组件demo示例
 * @author lilangbo
 * @time 2016.07.11
 */

define('newextensions/demo/0.1/demo', ['require', 'customElement'], function (require){
    var customElem = require('customElement');
    /**
     * demoFun
     *
     * @param  {Event} e event
     */
    function demoFun (e) {
        console.log('This is a mip componnents demo');
    }

    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
        this.createdCallback = function () {
            //创建节点回调
        };
        this.attachedCallback = function () {
            //插入节点回调
        };
        //如果在build里面定义渲染,用户在可视区域内，才会渲染
        this.build = demoFun;
        this.detachedCallback = function () {
            //销毁事件
        };
    };
});


