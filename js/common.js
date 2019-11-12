/*
* @Author: fangxu
* @Date:   2019-11-01
*
*/
layui.use(['jquery','table', 'layer'], function(){
	var $ = layui.jquery
	,table = layui.table
	,layer = layui.layer;

	/*表单的自定义验证

	 * 方式：
	 * 1、数组的形式：
	 * 2、函数形式
	 * */
	var form = layui.form;
	form.verify({
  		//1.数组的形式：数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  		pass: [
  		    /^[\S]{6,12}$/
  		    ,'密码必须6到12位，且不能出现空格'
  		]
  		//2.函数形式：value：表单的值、item：表单的DOM对象
  		,username: function(value, item){
  			//console.log(item);
		    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
		      return '用户名不能有特殊字符';
		    }else if(/(^\_)|(\__)|(\_+$)/.test(value)){
		      return '用户名首尾不能出现下划线\'_\'';
		    }else if(/^\d+\d+\d$/.test(value)){
		      return '用户名不能全为数字';
		    }
		}
	});
	//table模块  点击table的某一行行选中其复选框
//	$(document).on("click",".layui-table-body table.layui-table tbody tr",function(){
//		//debugger;
//      var obj = event ? event.target : event.srcElement;
//      var tag = obj.tagName;
//      var checkbox = $(this).find("td div.laytable-cell-checkbox div.layui-form-checkbox i");
//      var radio = $(this).find("td div.laytable-cell-radio div.layui-form-radio i");
//      if(checkbox.length!=0){
//          if(tag == 'DIV') {
//              checkbox.click();
//          }
//      }
//      if(radio.length!=0){
//          if(tag == 'DIV') {
//              radio.click();
//          }
//      }
// });
//  $(document).on("click","td div.laytable-cell-checkbox div.layui-form-checkbox",function(e){
//      e.stopPropagation();
//  });
//  $(document).on("click","td div.laytable-cell-radio div.layui-form-radio",function(e){
//      e.stopPropagation();
//  });
	//兼容ie10以下表单的占位符不现实问题
	$(document).ready(function() {
	    var doc = document,
	    inputs = doc.getElementsByTagName('input'),
	    supportPlaceholder = 'placeholder' in doc.createElement('input'),
	    placeholder = function(input) {
	        var text = input.getAttribute('placeholder'),
	        defaultValue = input.defaultValue;
	        if (defaultValue == '') {
	            input.value = text
	        }
	        input.onfocus = function() {
	            if (input.value === text) {
	                this.value = ''
	            }
	        };
	        input.onblur = function() {
	            if (input.value === '') {
	                this.value = text
	            }
	        }
	    };
	    if (!supportPlaceholder) {
	        for (var i = 0,
	        len = inputs.length; i < len; i++) {
	            var input = inputs[i],
	            text = input.getAttribute('placeholder');
	            if (input.type === 'text' && text) {
	                placeholder(input)
	            }
	        }
	    }
	});

	//点击图片放大

	$(".zoomImg").click(function(){
		var imgsrc = $(this).children('img').attr('src');
 		imgsrc = 'images/'+imgsrc.split("images/")[1];
		console.log(imgsrc);
        top.layer.open({
		  type: 1,
		  title: false,
		  closeBtn: 1,
		  area: '700px',
		  skin: 'layui-layer-nobg', //没有背景色
		  shadeClose: true,
		  content: '<img src="'+imgsrc+'" style="width: 100%;height: 100%;">'
		});
	})
	/*数据表格，点击选中某一行，背景色加深：区分表头和表身，只有表身的行背景色才加深*/
	/*$("body").on("mousedown",".layui-form-checkbox",function(e){
		 var event = e || window.event;
	    if(event.button == 2){//鼠标右击不勾选
	        console.log('right');
	    }else if(event.button == 0){//鼠标左击，勾选有效
	       // console.log('left');
	        if($(this).parents(".layui-table-body").hasClass("layui-table-main")){//tbody,1.全选--即选中表头的checkbox
				if(!$(this).hasClass("layui-unselect layui-form-checkbox layui-form-checked")){
					$(this).parents('tr').addClass("tablebluebg");
				}else{
					$(this).parents('tr').removeClass("tablebluebg");
				}
			}else{//theader，2.选中表格内的某个checkbook
				if(!$(this).hasClass("layui-unselect layui-form-checkbox layui-form-checked")){
					$(this).parents(".layui-table-header").next().find("tr").addClass("tablebluebg");
				}else{
					$(this).parents(".layui-table-header").next().find("tr").removeClass("tablebluebg");
				}
			}
	    }
	});*/

	/*-----------数据表格顶部按钮过多时，更多操作按钮js-start-----*/
	$(".layui-btn-group").on("click","#moreBtn",function(){
		var g= $(".layui-btn-group").width();//获取按钮组长度
	  	//var l= $(this).offset().left;//按钮距离左侧距离
	  	var w = $("#uls").width();//下拉宽度

	  	console.log(' g==='+g+' ; w==='+w);
	  	$("#uls").css({"top":"50px","left":g-w*0.5-23+"px"})

	  	$("#uls").slideToggle(200);

	  	//event.stopPropagation();
	  	return false;//阻止冒泡
	})
	/*关闭更多操作*/
	$('#outbody', parent.document).click(function(){//iframe以外的区域
	  	if($("#uls").css("display")=="block"){
	  		$("#uls").slideUp(200);
	  	}
	});
	$("body").on('click',':not(#moreBtn)',function(){//iframe内区域
	  	if($("#uls").css("display")=="block"){
	  		$("#uls").slideUp(200);
	  	}
	});

    /*-----------更多操作-end-----*/
	/*-----------数据表格顶部搜索条件过多时，高级查询js-start-----*/
	$("#superBtn").click(function(){
		$("#formHtml").css({"top":"55px","right":0})
		$("#formHtml").slideToggle(200);
	})
	/*收起高级查询*/
	$("#closeBtn").click(function(){
	  $("#formHtml").slideUp(200);
	})
  	/*-----------高级查询-end-----*/

	/*屏幕滚动时，更多、高级查询的下拉位置随着滚动条实时滚动..*/
	$(document).ready(function (){
		var nScrollTop = 0; //滚动到的当前位置
		var nDivHight = $("#div1").height();
		$(".tablebox").scroll(function(){
			nScrollTop = $(this)[0].scrollTop;
			//console.log('nScrollTop=='+nScrollTop);
			if(nScrollTop==0){
				$("#uls").css({"top":'55px'});
				$("#formHtml").css({"top":"55px","right":0})
			}else{
				$("#uls").css({"top":-nScrollTop+54});
				$("#formHtml").css({"top":-nScrollTop+54})
			}

		})
    })


    /*-------------公共方法-start-----------------

     * 调用方法：com.方法名("参数1","参数2","更多参数...");
     *
     * */

	com = {
		//-------------------表格数据渲染------------------
		/*
		 elem----指定原始表格元素选择器（推荐id选择器）
		 * id-----这里的id，在表格重载的时候需要！
		 * height----容器高度（格式-->"full-57"）
		 * limits---每页显示的数据条数[10,20,30]
		 * url----接口地址
		 * cols----设置表头
		 * page-----是否开启分页，默认开启true
		 * */
	    tableRender:function(elem,id,height,limits,url,cols,page,done){
	    	if(page==undefined||""){
				page = true;
			}
			//执行渲染lay-data="{id: 'tableId',height: 'full-105',cellMinWidth:60, page: true,limit:'10',limits:[10,20,30], url:'../../../tableJson.js',method:'get'}">
			var table_= table.render({
			   elem: elem //指定原始表格元素选择器（推荐id选择器）
			  ,id:id//这里的id，在表格重载的时候需要！
			  ,page:true//是否开启分页
			  ,cellMinWidth:80
			  ,height:height //容器高度
			  ,limits:limits//每页显示的数据条数[10,20,30]
			  ,url:url//接口地址
			  ,cols: cols //设置表头
			  ,page: page//是否开启分页
			  ,done:done
			  ,hide:false
			  //,…… //更多参数参考layui官网数据表格部分：基本参数选项

			});

			//给表格设置title----表头名称
			//鼠标移入表格头部显示对应的表头名称
			if($(".layui-table-header th")&&$(".layui-table-header th").length>0){
				var titles = $(".layui-table-header th"),
				tt = '';
				for (var i = 0;i<titles.length;i++) {
					var tt = titles.eq(i).text();
					$(".layui-table-header th").eq(i).attr('title',tt).css("cursor","pointer");//给表头加上title和鼠标手势
				}
			}

		}
	    //-----------表格重载reloadTable--------------
	    /*where---额外参数
	     * where: { //设定异步数据接口的额外参数，任意设
		    aaaaaa: 'xxx'
		    ,bbb: 'yyy'
		    //…
		  }
	     * tableId----table的id（不是css的id）
	     * */
	    ,reloadTable:function(where,tableId){
	    	if(tableId==undefined||""){
				tableId = "tableId";
			}
	    	table.reload(tableId, {
				where:where
				,page: {
					curr: 1 //重新从第 1 页开始
				}
			});
	    }
	   /*----------刷新页面---------------
	        当前页面的刷新方法
	    * */
		,reloadPage:function(){
			window.location.reload();
		}

	    //---------打开普通弹框页面(非本页面！调用该方法成功后，会跳转到新的地址)--直接打开，弹框无需携带参数--------------------
	    /*
		 例如  新增
		* title---页面的标题
		* content---跳转页面的url地址
		* area---弹框大小
		* */
		,pageOpen:function(title,content,area){
		   	var index = parent.layer.open({ //在父窗口打开
		   		title:title ,//标题
		   		resize:false,//禁止拉伸
			    type: 2,//风格
			    content: content,//url
			    area: area,//弹窗大小
			});
			parent.index_  = index;//传给子页面的值index
		}

		//-----------打开筛选数据弹框页面(非本页面！调用该方法成功后，会跳转到新的地址),即弹框需要携带参数,------------
		/*
		 例如编辑
		* 参数：
		* title---页面的标题
		* content---跳转页面的url地址
		* tableId-----table的id（不是css的id）
		* * */

		,checkOpen:function(title,content,area,tableId){
			if(tableId==undefined||""){
				tableId = "tableId";
			}
			var checkStatus = table.checkStatus(tableId); //test即为基础参数id对应的值
		    //数据只能是一条
		    if (checkStatus.data.length == 0) {
		        parent.layer.open({
		            title: '温馨提示'
		            , content: '请勾选一条目标数据！'
		        });
		        return false;
		    } else if (checkStatus.data.length > 1) {
		        parent.layer.open({
		            title: '温馨提示'
		            , content: '只能勾选一条数据！'
		        });
		        return false;
		    }
		  	console.log(checkStatus.data);
		   	var index = parent.layer.open({ //在父窗口打开
		   		title:title ,
		   		resize:false,//禁止拉伸
				type: 2,
				area: area,
				content: content,
			});
			parent.index_  = index;//传给子页面的值index
			parent.id_ = checkStatus.data[0].id;//传给子页面的数据id！！！！
		}

		//-----------打开筛选数据弹框页面(可以勾选多条数据，非本页面！调用该方法成功后，会跳转到新的地址),即弹框需要携带参数,------------
		/*
		 例如编辑
		* 参数：
		* title---页面的标题
		* content---跳转页面的url地址
		* tableId-----table的id（不是css的id）
		* * */

		,checkOpenMore:function(title,content,area,tableId){
			if(tableId==undefined||""){
				tableId = "tableId";
			}
			var checkStatus = table.checkStatus(tableId); //test即为基础参数id对应的值
		    //数据只能是一条
		    if (checkStatus.data.length == 0) {
		        parent.layer.open({
		            title: '温馨提示'
		            , content: '请勾选一条目标数据！'
		        });
		        return false;
		    }
		  	console.log(checkStatus.data);
		   	var index = top.layer.open({ //在父窗口打开
		   		title:title ,
		   		resize:false,//禁止拉伸
				type: 2,
				area: area,
				content: content,
			});
			parent.index_  = index;//传给子页面的值index
			parent.id_ = checkStatus.data[0].id;//传给子页面的数据id！！！！
		}
        ,openMore:function(title,content,area,tableId){
            if(tableId==undefined||""){
                tableId = "tableId";
            }
            var checkStatus = table.checkStatus(tableId); //test即为基础参数id对应的值
            //数据只能是一条
            var index = top.layer.open({ //在父窗口打开
                title:title ,
                resize:false,//禁止拉伸
                type: 2,
                area: area,
                content: content,
            });
            parent.index_  = index;//传给子页面的值index
            parent.id_ = checkStatus.data[0].id;//传给子页面的数据id！！！！
        }
		//-----------打开确认弹框页面，单选(本页面！！！)---------
		/*

		* 参数：
		* msg---确认弹出层的内容（）
		* title---页面的标题
		* btn---按钮['按钮一', '按钮二', '按钮三']
		* idArray--选中行id集合
		* fn---确定的回调，（成功回调之后，一般直接关闭弹框）
		* * */
		,confirm1:function(msg,title,btn,idArray,fn,tableId){
			if(tableId==undefined||""){
				tableId = "tableId";
			}
			var checkStatus = table.checkStatus(tableId); //test即为基础参数id对应的值
		    //数据至少是一条
		    if (checkStatus.data.length == 0) {
		        parent.layer.open({
		            title: '温馨提示'
		            ,content: '请勾选一条目标数据！'
		        });
		        return false;
		    }else if (checkStatus.data.length > 1) {
		        parent.layer.open({
		            title: '温馨提示'
		            , content: '只能勾选一条数据！'
		        });
		        return false;
		    }
		    var form = layui.form;
	    	var data = checkStatus.data;
	    	//获取选中行的id集合
	    	for (var i in data){
              idArray.push(data[i].id);
	        }

			parent.layer.confirm(msg, {
			  title:title,
			  btn: btn,//按钮
			},fn);
		}

		//-----------打开确认弹框页面，多选(本页面！！！)---------
		/*

		* 参数：
		* msg---确认弹出层的内容（）
		* title---页面的标题
		* btn---按钮['按钮一', '按钮二', '按钮三']
		* idArray--选中行id集合
		* fn---确定的回调，（成功回调之后，一般直接关闭弹框）
		* * */
		,confirm2:function(msg,title,btn,idArray,fn,tableId){

			if(tableId==undefined||""){
				tableId = "tableId";
			}
			var checkStatus = table.checkStatus(tableId); //test即为基础参数id对应的值

		    //数据至少是一条
		    if (checkStatus.data.length == 0) {
		        parent.layer.open({
		            title: '温馨提示'
		            ,content: '请勾选一条目标数据！'
		        });
		        return false;
		    }
		    var form = layui.form;
	    	var data = checkStatus.data;
	    	//获取选中行的id集合
	    	for (var i in data){
              idArray.push(data[i].id);
	        }

			parent.layer.confirm(msg, {
			  title:title,
			  btn: btn,//按钮
			},fn);
		}
		//---------提示框------------
		/*msg----提示的信息
		 * icon---提示的图标：1：对号；2：叉号；3：问号；4：锁住符号；5：不开心表情；6：开心笑脸表情；7：感叹号；
		 * 建议使用 5 作为失败提示、6 作为成功提示、7 作为警告或者温馨提示。
		 *
		 */
		,msg:function(msg,icon){
			layer.msg(msg, {icon: icon, anim: 6,time:1500});
		}
		/*,msg:function(msg){
			layer.msg(msg, { anim: 6,time:1500});
		}*/

		//-----------正在加载--loading控件---------------
		/*
		 * loadingShow();--开启loading
		 * loadingClose();--关闭loading
		 *
		 * */
		,loadingShow:function(){
			parent.layer.load(1,{
		    	shade: [1,"rgba(0,0,0,0.4)"]
			})
		}
		,loadingClose:function(){
			parent.layer.closeAll('loading');
		}

	}//com


})











