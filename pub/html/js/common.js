//ie 하위 버전 html5태그 생성
document.createElement('header');
document.createElement('hgroup');
document.createElement('nav');
document.createElement('section');
document.createElement('main');
document.createElement('article');
document.createElement('aside');

//게시판 설정 레이어 팝업
function layer_pop(){
	var popup = $('.set_board_popup');
	var bg = $('.bg_dark');
	var wrap = $('#wrap');
	if(popup.css('display') == 'block'){
		popup.fadeOut(400);
		bg.fadeOut(400);
		wrap.css({'overflow':'visible','height':'auto'});	
	}else{
		popup.fadeIn(400);
		bg.fadeIn(400);	
		wrap.css({'overflow':'hidden','height':$(window).height()});
	}
}

$(function(){
	//input 포커스
	var input = $('.table_type02 tbody td > div input');
	input.each(function(){
		$(this).on('focus',function(){
			$(this).css({'border':'1px solid #000'});
		});
		$(this).on('blur',function(){
			$(this).css({'border':'1px solid #adadad'});
		});
	});
	
	//서브메뉴 - 2depth
	var gnb_li = $('.gnbList > li');
	gnb_li.each(function(){
		var sub = $(this).children('ul');
		if($(this).hasClass('current') == false){
			$(this).hover(function(){
				sub.stop().slideDown(300);
			},function(){
				sub.stop().slideUp(300);
			});
		}else{
			sub.css({'display':'block'});
		}
	});
	//카테고리 설정 - 문서 로딩시 리스트 초기 스타일
	var cate_list = $('.set_board_popup ul.category');
	var li = cate_list.children('li');
	var leng = li.length;
	cate_list.css({'height': 52*leng + 'px'});

	for(var i = 0; i < leng; i++){
		li.eq(i).css({
			'position':'absolute',
			'left': 0,
			'top' : 51*i +'px'
		});
	}
});
//카테고리 등록
function addCategory(){
//alert('222');
var category_name = $("#category_name").val();

if(category_name == ""){
	alert("카테고리명을 입력해주세요.");
	$("#category_name").focus();
	return;
}	

var parent = $('.max_area ul');
var list = parent.children('li');
var $length = list.length + 1;
var _length = $length - 1;

	parent.css({'height':51*$length + 'px'});
	parent.append(
		'<li style= top:'+51*_length+'px;>'+
			'<div class="listname">'+category_name+'</div>'+
			'<span class="up"><a href="#" onclick="change_list(this,\'up\');"><img src="../img/common/bg_arr_up.png"></a></span>'+
			'<span class="down"><a href="#" onclick="change_list(this,\'down\');"><img src="../img/common/bg_arr_down.png"></a></span>'+
			'<span class="del"><a href="#" onclick="remove(this);"><img src="../img/common/btn_close2.png"></a></span>'+
		'</li>'
	);			
}
/*
function saveCategory(){
$('.upload_file2 li').remove();
$('.max_area ul').find("li").each(function(index){
	//alert($(this).text());
	$('.upload_file2').append("<li>"+$(this).text()+"</li>");
});

catelayer_pop();
}
*/

//카테고리 설정 - 순서변경
function change_list(d,dir){
	var list = $('.set_board_popup ul.category > li');
	var l = $(d).parents('li');
	var idx = list.index(l);
	var max = list.length;
	var m = max - 1;
	var k = idx - 1;
	var n = idx + 1;
	if(dir == 'up'){ //카테고리 설정 - 리스트 업
		if(idx > 0){	
			//alert(idx);
			l.stop().animate({
				'top': 51*k + 'px'		
			},400,'easeOutCubic');
			list.eq(k).stop().animate({
				'top': 51*idx + 'px'		
			},400,'easeOutCubic',function(){list.eq(k).insertAfter(l)});			
		}
	}else{
		if(idx < m){ //카테고리 설정 - 리스트 다운
			l.stop().animate({
				'top': 51*n + 'px'		
			},400,'easeOutCubic');
			list.eq(n).stop().animate({
				'top': 51*idx + 'px'		
			},400,'easeOutCubic',function(){list.eq(n).insertBefore(l)});	
		}	
	}
}

//카테고리 설정 - 리스트 삭제
function remove(t) {
	$(t).parents('li').remove();

	var cate_list = $('.set_board_popup ul.category');
	var li = cate_list.children('li');
	var leng = li.length;

	cate_list.css({'height': 52*leng + 'px'});

	for(var j = 0; j < leng; j++){
		li.eq(j).css({
			'position':'absolute',
			'left': 0,
			'top' : 51*j +'px'
		});
	}	
}

//메뉴관리 순서변경
function menuSet(w,dir){
	var setMenu = $('#container .listBoard #setMenu');
	var Menu =  setMenu.find('tbody > tr');	
	var menu_list = $(w).parents('tr');
	var $leng = Menu.length;
	var Max = $leng -1;
	var index = Menu.index(menu_list);
	var pre = index -1;
	var nxt = index +1;

	if(dir == 'up'){
		if(index > 0){
			Menu.eq(pre).insertAfter(menu_list);
		}	
	}else{
		if(index < Max){
			Menu.eq(nxt).insertBefore(menu_list);
		}		
	}
}

//파일 업로드
function fileCheck(obj,type,target) {
    pathpoint = obj.value.lastIndexOf('.');
    filepoint = obj.value.substring(pathpoint+1,obj.length);
    filetype = filepoint.toLowerCase(); //업로드 파일 확장자 이름 - 확장자 구분 시 사용   
	 if(window.FileReader){ // modern browser 
	 	var fileName = $(obj)[0].files[0].name; //첨부 파일 명
	 	var filesize = $(obj)[0].files[0].size; //첨부 파일 용량
	 }else{ // old IE 
	 	var fileName = $(obj).val().split('/').pop().split('\\').pop(); //첨부 파일명만 추출 
        var objFSO = new ActiveXObject("Scripting.FileSystemObject");
        var val = $(obj)[0].value; 
        var objFile = objFSO.getFile(val);
        var filesize = objFile.size;//첨부 파일 용량 	 
	 }
	 var r_size = Math.round(filesize/1024) + 'KB';
	 if(type == 'type1'){ //이미지 파일만 업로드
	   if(filetype =='jpg' || filetype =='gif' || filetype =='png' || filetype =='jpeg' || filetype=='bmp'){
		// 정상적인 이미지 확장자 파일일 경우
			$('.'+target+' input[type=text].name').val(fileName);	
			$('.'+target+' input[type=text].size').val(r_size);
			if(window.FileReader){ // modern browser				 
				var img_reader = new FileReader(); 
				img_reader.onload = function(e){ 
					var src = e.target.result; 
					$('.'+target).siblings('.img').html('<img src="'+src+'">'); 
				} 
				img_reader.readAsDataURL($(obj)[0].files[0]);				 
			}else{ // old IE 
				$(obj)[0].select(); 
				$(obj)[0].blur(); 
				var imgSrc = document.selection.createRange().text; 
				$('.'+target).siblings('.img').html('<img src="'+imgSrc+'">');
			}
	    }else{
	        alert('이미지 파일만 선택 할 수 있습니다.');
	        parentObj  = obj.parentNode
	        node = parentObj.replaceChild(obj.cloneNode(true),obj);
	        return false;
	    }
	 }else if(type == 'type2'){ //엑셀파일만 업로드
	 	if(filetype =='xls' || filetype =='xlsx') {
			 $('.'+target+' input[type=text].name').val(fileName);	
		}else{
	        alert('엑셀 파일만 선택 할 수 있습니다.');
	        parentObj  = obj.parentNode
	        node = parentObj.replaceChild(obj.cloneNode(true),obj);
	        return false;
		}
	 }else if(type == 'type3'){ //파일 첨부시 파일리스트 추가 생성
		var parent = $('.table_type02 table tbody');
		parent.append(
			'<tr>'+
				'<th>&nbsp;</th>'+
					'<td>'+
						'<div class="upload_f">'+
							'<span><input class="name" type="text" value='+fileName+' disabled></span>'+
							'<span><input class="size" type="text" value='+r_size+' disabled></span>'+
						'</div>'+
					'</td>'+
					'<td style="padding-left:0">'+
						'<button type="button" onclick="removeFile2(this);" class="button">삭제</button>'+
					'</td>'+
			'</tr>'
		);			
	 }else { //문서 및 이미지 파일 업로드 - 확장자 제한없음
		$('.'+target+' input[type=text].name').val(fileName);	
		$('.'+target+' input[type=text].size').val(r_size);	 	
	 }
}
function removeFile(elem){ //프로필 썸네일 첨부 이미지 삭제
	deleteFile = confirm('확인을 누르시면 첨부하신 파일이 삭제됩니다.\n계속 하시겠습니까?');
	if(!deleteFile) return false;
	$('.'+elem).find('input[type=text].name').val("선택된 파일이 없습니다.");
	$('.'+elem).find('input[type=text].size').val("0KB");
	$('.'+elem).siblings('.img').html('<img src="../img/common/no-image.jpg">'); // 첨부이미지 default이미지로 변경 
}
function removeFile2(elem){ //파일 업로드 리스트 삭제
	$(elem).parents('tr').remove();
}





