var isloading = false;
var isNextPage = true;

$(function() {
	$(window).scroll(function() {

		var obj_t = $('.pager-next:last');
		var obj_t_pos = obj_t.offset().top;
		var scr_count = $(document).scrollTop() + (window.innerHeight/2); // ディスプレイの半分の高さを追加

		if(scr_count > obj_t_pos){
			if (isloading)	return;
			if (!isNextPage) return;

			// console.log("次読み込む");
			var nextpage = obj_t.attr('href');
			console.log(nextpage);
			isloading = true;

			$.ajax({
				url: nextpage,
				type: 'GET',
				dataType: 'html',
			}).always(function(data){
				var container = $($.parseHTML(data)).filter("div#container")[0].innerHTML;
				var main = $($.parseHTML(container)).filter("div#main")[0].innerHTML;
				var boxwrap = $($.parseHTML(main)).filter("div.box-wrap.mix.box2.top")[0].innerHTML;
				var next_page = $($($(boxwrap))[2]).find(".pager-next");
				if (next_page.length==0) {
					console.log("次なし");
					isNextPage = false;
				}
				nexthref = $(next_page).attr("href");
				$("div.box-wrap.mix.box2.top").append(boxwrap);
				isloading = false;
			});
		}
	});
});