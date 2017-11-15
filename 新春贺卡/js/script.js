window.onload = function(){
	var disc = document.getElementById('disc');
	var audio1 = document.getElementById('audio1');
	var page1 = document.getElementById('page1');
	var page2 = document.getElementById('page2');
	var page3 = document.getElementById('page3');
	var blessing = page3.getElementsByClassName('p3_blessing')[0];
	
	disc.onclick = function(){
		//判断动画的状态
		if(disc.style.animationPlayState=='paused'){
			//原来是暂停的状态，点击后变成运行状态
			disc.style.animationPlayState=='running';
			audio1.play();
		}else{
			//原来是运行的状态，点击后变成暂停状态
			disc.style.animationPlayState=='paused';
			audio1.pause();
		}
	}
	
	page1.onclick = function(){
		page1.style.display='none';
		page2.style.display='block';
		setTimeout(function(){
			page3.style.display='block';
			page2.className='page fadeOut';
			page3.className='page fadeIn';
			blessing.className = 'p3_blessing blessing_anim1';
			
			setTimeout(function(){
				blessing.className = 'p3_blessing blessing_anim2';
			},2000);
		},5000);
	}
	
}