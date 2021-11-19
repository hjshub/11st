//파일 업로드
function brd_fileCheck(obj,type,target) {
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
	   $(".profile").css("display","block");
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
		var parent = $('.table_type02 > table > tbody');
		parent.append(
			'<tr>'+
				'<th>&nbsp;</th>'+
					'<td>'+
						'<div class="upload_f">'+
							'<span><input class="name attachment_file_name" type="text" id="files" value='+fileName+' disabled></span>'+
							'<span><input class="size" type="text" value='+r_size+' disabled></span>'+
						'</div>'+
					'</td>'+
					'<td style="padding-left:0">'+
						'<button type="button" onclick="removeFile2(this);" class="button">삭제</button>'+
					'</td>'+
			'</tr>'
		);			
		parent.find("input.attachment_file_name").trigger("click");
		
	 }else { //문서 및 이미지 파일 업로드 - 확장자 제한없음
		$('.'+target+' input[type=text].name').val(fileName);	
		$('.'+target+' input[type=text].size').val(r_size);	 	
	 }
}

function fileuploadAttachment(target) {
	var label = $(target);
	
	var parent = $('.table_type02 > table > tbody');
	
	var column = $(
		'<tr>'+
			'<th>&nbsp;</th>'+
				'<td>'+
					'<div class="upload_f">'+
						'<span>' +
							'<input class="attachment attachment_file_name" type="file" style="display: none;">' +
							'<input class="name" type="text" disabled>' +
						'</span>'+
						'<span><input class="size" type="text" disabled></span>'+
					'</div>'+
				'</td>'+
				'<td style="padding-left:0">'+
					'<button type="button" onclick="removeFile2(this);" class="button">삭제</button>'+
				'</td>'+
		'</tr>'
	);
	parent.append(column);		
	var attachmentElement = column.find(".attachment");
	var nameElement = column.find(".name");
	var sizeElement = column.find(".size");
	attachmentElement.on("change", function(e) {
		var obj = this;		// = attachment file input
		
		var fileName = null;
		var filesize = null;
		var size = 0;
		var r_size = 0;
		if(window.FileReader){ // modern browser 
		 	fileName = $(obj)[0].files[0].name; //첨부 파일 명
		 	filesize = $(obj)[0].files[0].size; //첨부 파일 용량
		 	size = parseInt(filesize);
		 	size_= size/1024;
		 	r_size = Math.round(size_) + 'KB';  
		 }else{ // old IE 
		 	fileName = $(obj).val().split('/').pop().split('\\').pop(); //첨부 파일명만 추출 
		 }
		
		nameElement.val(fileName);
		sizeElement.val(r_size);
		
	});
	attachmentElement.trigger("click");
	
}

function brd_removeFile(elem){ //프로필 썸네일 첨부 이미지 삭제
	deleteFile = confirm('확인을 누르시면 첨부하신 파일이 삭제됩니다.\n계속 하시겠습니까?');
	if(!deleteFile){
		return;
	}else{
		$(".profile").css("display","none");
	}
	$('.'+elem).find('input[type=text].name').val("선택된 파일이 없습니다.");
	$('.'+elem).find('input[type=text].size').val("0KB");
	$('.'+elem).siblings('.img').html('<img src="../img/common/no-image.jpg">'); // 첨부이미지 default이미지로 변경 
}
function removeFile2(elem){ //파일 업로드 리스트 삭제
	$(elem).parents('tr').remove();
}

//입력 글자수 체크
//input			: 입력 필드
//max 			: 제한할 최대 값
//이벤트는 		: onkeyup
function checkCharLength(input, maxLength) {
	var str = input.value; 
	var inputLength = str.length;		// 전체길이
	
	// 글자수 초과
	if (inputLength > maxLength) {
		alert(maxLength + "글자를 초과 입력할수 없습니다.");
		strTemp = str.substr(0, maxLength);
		input.value = strTemp;
	}
}



