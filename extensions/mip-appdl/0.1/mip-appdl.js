/**
 * @file 下载
 * @author fengchuantao
 * 样式尚未确定。
 * 
 * @time 2016.06.21
 */

define(function() {
    var customElem = require('customElement');
    /**
     * build
     */
    function build() {
        if (this.isRender) {
            return;
        }

        this.isRender = true;
        getallconfig.call(this)
        BindClose.call(this)
    }

    function getallconfig() {
       var tpl = this.getAttribute('tpl');

       switch(tpl) {
            case 'imageText':
                renderHaveImg.call(this);
                break;
            case 'noneImg':
                renderNoneImg.call(this);
                break;
        }
    }


    /**
     * 图文存在
     */
    function renderHaveImg() {
        var textdom = buildtextdom.call(this);
        var textdom = buildtextdom.call(this);
        var downtext = $(this).attr("downbtntext");
        var downsrc  = $(this).attr(recognition()+"-downsrc");
        var imgsrc = $(this).attr("imgsrc");
        var postiontye = "'mip-appdl-box mip-appdl-"+$(this).attr("postiontye")+ "'";

        var str = "<div class= "+postiontye+" >"+
            "<div class='mip-appdl-content'>"+
                "<div class='mip-appdl-contentcell'>"+
                    "<img src="+imgsrc+" class='mip-appdl-downimg'>"+
                "</div>"+
                "<div class='mip-appdl-textbox mip-appdl-contentcell'>"+
                    textdom+
                "</div>"+
                "<div class='mip-appdl-downloadbbutton mip-appdl-contentcell'>"+
                    "<a target='_blank' href="+downsrc+" download='测试'>"+downtext+"</a>"+
                "</div>"+
                "<div class='mip-appdl-closebutton'></div>"+
            "</div>"+
        "</div>";
        $(this).append(str)
    }

    /**
     * 单行文本
     */
    function renderNoneImg() {
        var textdom = buildtextdom.call(this);
        var downtext = $(this).attr("downbtntext");
        var downsrc  = $(this).attr(recognition()+"-downsrc");
        var postiontye = "'mip-appdl-box mip-appdl-"+$(this).attr("postiontye")+"'";

        var str = "<div class= "+postiontye+" >"+
            "<div class='mip-appdl-content'>"+
                "<div class='mip-appdl-textbox mip-appdl-contentcell'>"+
                    textdom+
                "</div>"+
                "<div class='mip-appdl-downloadbbutton mip-appdl-contentcell'>"+
                    "<a target='_blank' href="+downsrc+" download='测试'>"+downtext+"</a>"+
                "</div>"+
                "<div class='mip-appdl-closebutton'></div>"+
            "</div>"+
        "</div>";

        $(this).append(str)
    }

    /**
     * 组装文本行
     */
    function buildtextdom() {
        var textarray = $(this).attr("texttip");
        var tarray = [];
        if (textarray) {
            try {
                tarray = new Function('return ' + textarray)();
            } catch (e) {}
        }
        var domstr = "<div class='mip-appdl-text'>";
        var length = tarray>2 ? 2:tarray.length;

        for(var i=0;i<length;i++) { //限定最大行数两行
            domstr+="<p>"+tarray[i]+"</p>";
        }
        return domstr+"</div>";
    }

    /**
     * 绑定关闭事件
     */
    function BindClose() {
        $(this).on("click",".mip-appdl-closebutton",function(){
            $(this).parents(".mip-element").remove()
        })
    }

    /**
     * 客户端判断
     */
    function recognition(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid?"Android":"Ios"
    }

    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
        this.build = build;
    };

    return customElem;

});

require(['mip-appdl'], function (appdl) {
    // 引入组件需要的css文件，选填
    MIP.css.mipAppdl = __inline('./mip-appdl.less');
    //注册组件
    console.log(MIP.registerMipElement.toString())
    MIP.registerMipElement('mip-appdl', appdl, MIP.css.mipAppdl);
});
