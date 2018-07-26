var ty;
//监听工具条
table.on('tool(tool)',function(obj){	//注：tool(1)是工具条事件名，tool(2)是table原始容器的属性 lay-filter="对应的值"
	var data=obj.data;					//获得当前行数据
	var layEvent=obj.event;				//获得 lay-event 对应的值
	var tr=obj.tr;						//获得当前行 tr 的DOM对象

	// ty=$(this).closest('.layui-table-view').prev('.table_container').attr('data-ty');
	console.log('ty: '+ty);

	if(layEvent==='edit'){
		eId=$(this).closest('tr').find('td[data-field="id"] div').html(); // 此行id
		var editable=[]; // 可编辑列
		var list=[];
		var n=0;
		$(this).closest('tr').find('td').each(function(){
			if($(this).attr('editable')){ // 遍历可编辑列
				var val={};
				var index=$(this).index();
				var titleTxt=$('#dataTable').next().find('.layui-table-header').find('th').eq(index).find('div span').eq(0).html();
				list.push(titleTxt);

				for(var i=0;i<list.length;i++){
					val.title=titleTxt;
					val.field=$(this).attr('data-field');
					val.edittype=$(this).attr('edittype');
					if(val.edittype=='text'){
						val.editval=$(this).find('div').html(); // 获取内容
					}
					else if(val.edittype=='img'){
						val.editval=$(this).find('div img').attr('src'); // 获取图片
					}
					else if(val.edittype=='textarea'){
						val.editval=$(this).find('div').html(); // 获取内容
					}
				}
				editable[n]=val;
				n++;
			}
		});

		// 生成编辑弹窗
		var editTxt='<div class="layui-form layui-form-pane">';
		for(var i=0;i<editable.length;i++){
			if(editable[i].edittype=='text'){

				console.log(editable[i].editval);

				editTxt+='<div class="layui-form-item">'+
						'	<label class="layui-form-label" data-field='+editable[i].field+' data-type='+editable[i].edittype+'>'+editable[i].title+'</label>'+
						'	<div class="layui-input-block">'+
						'		<input type="text" class="layui-input" value="'+editable[i].editval+'">'+
						'	</div>'+
						'</div>';
			}else if(editable[i].edittype=='img'){
				editTxt+='<div class="layui-form-item">'+
						'	<label class="layui-form-label" data-field='+editable[i].field+' data-type='+editable[i].edittype+'>'+editable[i].title+'</label>'+
						'	<div class="editImgBor">'+
						'		<img class="editImg" src='+editable[i].editval+'>'+
						'		<input class="uploadImgBtn" type="file" name="inputImg">'+
						'	</div>'+
						'</div>';
			}else if(editable[i].edittype=='textarea'){
				editTxt+='<div class="layui-form-item layui-form-text">'+
						 '	<label class="layui-form-label" data-field='+editable[i].field+' data-type='+editable[i].edittype+'>'+editable[i].title+'</label>'+
						 '	<div class="layui-input-block">'+
						 '		<textarea name="desc" placeholder="请输入内容" class="layui-textarea">'+editable[i].editval+'</textarea>'+
						 '	</div>'+
						 '</div>';
			}
		}
		editTxt+='<div class="layui-form-item"><button id="submit_edit" class="layui-btn">提交</button></div></div>'
		$('.edit_pop').html(editTxt);

		uploadImgFn();

		// 显示
		var edit_pop=$('.edit_pop').html();
		layer.open({
			type: 1,
			maxWidth: '800',
			title: '编辑',
			content: $('.edit_pop') // 这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
		});
	}
	else if(layEvent==='del'){
		layer.confirm('确定删除所选行数据?',function(index){
			console.log(obj.data.id);

			$.ajax({
				type: 'POST',
				url: 'server.php?oper=del&table='+ty,
				data: {
					'id': obj.data.id
				},
				dataType:'json',
				cache:false,
				success: function(data) {
					console.log(data);
					layer.closeAll('loading');
					if(data.success){
						// layer.closeAll();

						// obj.del(); // 删除对应行（tr）的DOM结构，并更新缓存
						layer.close(index);
						tableIns.reload({}); // 表格重载
					}else{

					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					layer.closeAll('loading');
					alert(errorThrown);
				}
			});
		},function(index){
			console.log("取消");
		});
	}
});

// 上传图片
function uploadImgFn(){
	var uploadInst=upload.render({
		elem: '.uploadImgBtn', // 绑定元素
		url: 'uploadImg.php',  // 上传接口
		data:{
			d_name: 'inputImg',
		},
		accept: 'file',
		before: function(obj){
			layer.load(2); // loading
		},
		done: function(res){ // 上传完毕回调
			layer.closeAll('loading');
			console.log(res);
			layer.msg(res.msg);
			$(this.elem.context.activeElement).parent().find('img').attr('src',res.imgUrl);
		},
		error: function(res){ // 请求异常回调
			layer.closeAll('loading');
			console.log(res);
		}
	});
}

// 提交 (编辑)
$(document).on('click','#submit_edit',function(){
	var dataJson={};
	dataJson.id=eId;
	$('#edit_pop .layui-form-label').each(function(){
		var field=$(this).attr('data-type');
		var key=$(this).attr('data-field');
		var val;
		if(field=='text'){
			val=$(this).parent().find('input').val();
		}else if(field=='img'){
			val=$(this).parent().find('img').attr('src');
		}else if(field=='textarea'){
			val=$(this).parent().find('textarea').val();
		}
		dataJson[key]=val;
	});
	layer.load(2);

	$.ajax({
		type: 'POST',
		url: 'server.php?oper=edit&table='+ty,
		data: dataJson,
		dataType:'json',
		cache:false,
		success: function(data) {
			console.log(data);
			layer.closeAll('loading');
			var iconIndex;
			if(data.success){
				iconIndex=1;
				layer.closeAll();
				tableIns.reload({}); // 表格重载
			}else{
				iconIndex=7;
			}
			layer.msg(data.msg, {
				icon: iconIndex,
				time: 800
			});
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			layer.closeAll('loading');
			alert(errorThrown);
		}
	});
});

// 添加
$('.addBtn').on('click',function(){
	// 获取表格结构
	// 生成编辑弹窗
	// 后台交互

	var editable=[]; // 可编辑列
	var list=[];
	var n=0;
	var sel=$('#dataTable').next().find('table').eq(1)[0];
	$(sel).find('tr').eq(0).find('td').each(function(){
		if($(this).attr('editable')){ // 遍历可编辑列
			var val={};
			var index=$(this).index();
			var titleTxt=$('#dataTable').next().find('.layui-table-header').find('th').eq(index).find('div span').eq(0).html();
			list.push(titleTxt);

			for(var i=0;i<list.length;i++){
				val.title=titleTxt;
				val.field=$(this).attr('data-field');
				val.edittype=$(this).attr('edittype');
			}
			editable[n]=val;
			n++;
		}
	});

	// 生成编辑弹窗
	var editTxt='<div class="layui-form layui-form-pane">';
	for(var i=0;i<editable.length;i++){
		if(editable[i].edittype=='text'){
			editTxt+='<div class="layui-form-item">'+
					 '	<label class="layui-form-label" data-field='+editable[i].field+' data-type='+editable[i].edittype+'>'+editable[i].title+'</label>'+
					 '	<div class="layui-input-block">'+
					 '		<input type="text" class="layui-input" value="">'+
					 '	</div>'+
					 '</div>';
		}else if(editable[i].edittype=='img'){
			editTxt+='<div class="layui-form-item">'+
					 '	<label class="layui-form-label" data-field='+editable[i].field+'  data-type='+editable[i].edittype+'>'+editable[i].title+'</label>'+
					 '	<div class="editImgBor">'+
					 '		<img class="editImg" src="">'+
					 '		<input class="uploadImgBtn" type="file" name="inputImg">'+
					 '	</div>'+
					 '</div>';
		}else if(editable[i].edittype=='textarea'){
			editTxt+='<div class="layui-form-item layui-form-text">'+
					 '	<label class="layui-form-label" data-field='+editable[i].field+' data-type='+editable[i].edittype+'>'+editable[i].title+'</label>'+
					 '	<div class="layui-input-block">'+
					 '		<textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>'+
					 '	</div>'+
					 '</div>';
		}
	}
	editTxt+='<div class="layui-form-item"><button id="submit_add" class="layui-btn">提交</button></div></div>'
	$('.edit_pop').html(editTxt);
	uploadImgFn();

	// 显示
	var edit_pop=$('.edit_pop').html();
	layer.open({
		type: 1,
		maxWidth: '800',
		title: '添加',
		content: $('.edit_pop') // 这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
	});
});

// 提交 (增加)
var add_data={};
$(document).on('click','#submit_add',function(){
	$('#edit_pop .layui-form-item').each(function(){
		var type=$(this).find('label').eq(0).attr('data-type');
		var field=$(this).find('label').eq(0).attr('data-field');
		if(field){
			var val;
			if(type=='text'){
				val=$(this).find('.layui-input-block').eq(0).find('input').val();
			}else if(type=='img'){
				val=$(this).find('.editImg').attr('src');
			}else if(type=='textarea'){
				val=$(this).find('.layui-input-block').eq(0).find('textarea').val();
			}
			add_data[field]=val;
		}
	});
	layer.load(2);

	$.ajax({
		type: 'POST',
		url: 'server.php?oper=add&table='+ty,
		data: add_data,
		dataType:'json',
		cache:false,
		success: function(data) {
			console.log(data);
			layer.closeAll('loading');
			var iconIndex;
			if(data.success){
				iconIndex=1;
				layer.closeAll();
				tableIns.reload({}); // 表格重载
			}else{
				iconIndex=2;
			}

			layer.msg(data.msg, {
				icon: iconIndex,
				time: 800
			});
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			layer.closeAll('loading');
			alert(errorThrown);
		}
	});
});

// 监听开关
form.on('switch(switch)', function(data){
	var _this=data.othis; // 得到美化后的DOM对象
	eId=$(this).closest('tr').find('td[data-field="id"] div').html(); // 此行id
	var checked=data.elem.checked; // 开关是否开启
	checked ? checked=1 : checked=0;

	layer.load(2);
	$.ajax({
		type: 'POST',
		url: 'server.php?oper=switch&table='+ty,
		data: {
			'id': eId,
			'checked': checked
		},
		dataType:'json',
		cache:false,
		success: function(data) {
			console.log(data);
			layer.closeAll('loading');
			if(data.success){
				tableIns.reload({}); // 表格重载
			}else{
				layer.msg(data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			layer.closeAll('loading');
			alert(errorThrown);
		}
	});

	setTimeout(function(){
		$("input[type='checkbox']").click();
	},2000);
});