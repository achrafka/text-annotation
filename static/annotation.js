let full_text_array = []
let full_text = "";
let text_file_all_text = [];
let page_num = 0;
let selected_text = "";
let training_datas = [];
let training_data = {};
let entities = [];
let entities_values = [];
let class_names = []

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function myFunction(){
	setTimeout(function() {
		$("#editor").html($("#editor").text());
	}, 0);
}

function getFilename(myFile){
	if(myFile.files.length > 0){
		let file = myFile.files[0];  
	   	let filename = file.name;
	   	$(".custom-file-label").text(filename);
	
   }
   else{
   		$(".custom-file-label").text('Choose file...');
   }
}
function onPaste(e){
  e.preventDefault();

  if( e.clipboardData ){
    full_text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, full_text);
 
    return false;
  }
  else if( window.clipboardData ){
    full_text = window.clipboardData.getData('Text');
 
    if (window.getSelection)
      window.getSelection().getRangeAt(0).insertNode( document.createTextNode(full_text) );
  }
}
function setEntityOutput(value,color){

	$("#entity").append('<div class="entityval"><div style="background-color:'+color+'">'+value+'</div></div>');}
function clearSelection()
{
 if (window.getSelection) {window.getSelection().removeAllRanges();}
 else if (document.selection) {document.selection.empty();}
}
$(document).ready(function(){
	$("#edit").hide();
	$('textarea').attr('readonly',false);
});
$("#save").click(function(){
	full_text = $("#editor").text();
	$("#editor").attr('contenteditable',false);
	$("#save").hide();
	$("#edit").show();
});
$("#edit").click(function(){
	$("#editor").attr('contenteditable',true);
	$("#edit").hide();
	$("#save").show();
});
$("#addclass").click(function(){
	classname = $('input').val();
	if(class_names.indexOf(classname) != -1){
		alert("Label existed");
		$('input').val("");
		return;
	}
	class_names.push(classname);
	$(".classes").append('<div class="row pdn"><div class="col-9"><button class="class" style="background-color:'+getRandomColor()+'"><span>'+classname+'</span></button></div><div class="col-3"><button class="btn pull-right delete_btn"><i class="fa fa-trash"></i></button></div></div>')
	$('input').val("");
});
$("input").keypress(function(e){
	let key = e.which;
	if(key == 13){
		$("#addclass").click();
		return false;  
	}
});
$( ".classes" ).on("click",".class",function(){
	entity = [];
	if($("#editor").attr('contenteditable') == 'true'){
		alert("Choose label or must save the text");
		return;
	}
	selection = window.getSelection();
	selected_text = selection.toString();
	if(selected_text == ""){
		alert("Choose atleast one entity");
		return;
	}
	iniidx = full_text.indexOf(selected_text);
	lgth = selected_text.length;
	if(iniidx == -1){
		alert("choose entity ");
		return;
	}
	entities.push([{"Start":iniidx},{"End":(iniidx+lgth)},{"Label":$(this).text()}]);
	color_rgb = $(this).css('background-color');
	$("#editor").attr('contenteditable',true);
	if (selection.rangeCount && selection.getRangeAt) {
	    range = selection.getRangeAt(0);
	}
	document.designMode = "on";
	if (range) {
	  selection.removeAllRanges();
	  selection.addRange(range);
	}
	document.execCommand("BackColor", false, color_rgb);
	document.designMode = "off";
	entities_values.push(selected_text);
	entities_values.push(color_rgb);

	setEntityOutput(selected_text,color_rgb);
	selected_text = "";
	$("#editor").attr('contenteditable',false);
	clearSelection();
	$('.dele_').css('display','block')
});
$( "#entity" ).on("click",".entityval",function(){
	
		let delete_text = $(this).text();
		let e_v_idx = entities_values.indexOf(delete_text);
		let color_txt = entities_values[e_v_idx+1];
		let tag_string = '<span style="background-color: '+color_txt+';">'+delete_text+'</span>';
		$("#editor").html($("#editor").html().replace(tag_string,delete_text));
		entities_values.splice(e_v_idx,1);
		entities_values.splice(e_v_idx,1);
		en_del_idx = full_text.indexOf(delete_text);
		en_len_cnt = en_del_idx+delete_text.length;
		del_idx = -1;
		$.each(entities,function(idx,val){
			if((en_del_idx == val[0]) && (en_len_cnt == val[1])){
				del_idx = idx;
			}
		});
		if(del_idx != -1){
			entities.splice(del_idx,1);
		}
	
		$(this).remove();
		
		
	});


$("#complete").click(function(){
	training_data = {};
	training_data['Document'] = full_text;
	training_data['Annotation'] = entities;
	training_datas.push(training_data);
	if ('Blob' in window) {
		let fileName = prompt('Please enter name of the file(.json)', 'file.json');
		if(fileName != null){
		
			let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(training_datas));
			let dlAnchorElem = document.createElement('a');
			dlAnchorElem.setAttribute("href",     dataStr     );
			dlAnchorElem.setAttribute("download", fileName);
			dlAnchorElem.click();
			training_datas = []
			page_num = 0;
			entities = [];
			full_text = "";
			$("#editor").text("");
			$("#editor").attr('contenteditable',true);
			$("#save").show();
			$("#edit").hide();
			$("#entity").empty();
		}
	}
	else{
		alert('Your browser does not support the HTML5 Blob.');
	}
	
});
$( ".classes" ).on("click",".delete_btn",function(){

		tt = $('.delete_btn').parent().parent().text();
		class_names.splice(class_names.indexOf(tt),1);
		$(this).parent().parent().remove();
	
});
$("#upload").click(function(){

	let fileInput = $('#validatedCustomFile');
	let input = fileInput.get(0);
	if(input.files.length > 0){
		let textFile = input.files[0];
		let reader = new FileReader();
		reader.onload = function(e) {
		    text_file_all_text = e.target.result.split('\n');
		    $('#editor').text(text_file_all_text[page_num]);
	    	$("#gsc-i-id1.gsc-input").val(text_file_all_text[page_num]);
	    	$(".gsc-search-button").click();
		};
		reader.readAsText(textFile);
	}
});