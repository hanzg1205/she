window.onload=function(){
	//重新开始
	document.querySelector('.resetbtn').onclick=function(e){
		e.preventDefault();
		location.reload();
	}

	//初始化
	var scene=document.getElementById('scene');
	var snake=[{x:9,y:8},{x:10,y:8},{x:11,y:8},{x:12,y:8}];//定义蛇
	var dir=39;
	var dic={};
	var score=0;
	var game=false;
	var time=300;
	var k=1;
	for(var i in snake){
		var a=snake[i].x +'_'+ snake[i].y;
		dic[a]=true;
	}
	console.log(dic);
	//绘制场景
	(function(){
		var j,b;
		for(var i=0;i<15;i++){
			for(j=0;j<20;j++){
				b=document.createElement('div');
				b.className='b';
				scene.appendChild(b);
				b.id=j+'_'+i;
			}
		}
		for(i=0;i<snake.length;i++){
			document.getElementById(snake[i].x+'_'+snake[i].y).className='b s';
		}
	})();

	//键盘操作 上下左右
	var t;
	document.onkeydown=function(){
		t=setInterval(move,time);
		game=true;
		document.onkeydown=function(e){
			if(!game){
				return;
			}
			var ev=e||window.event;
			
			if(Math.abs(ev.keyCode-dir)==2){
				return;
			}
			dir=ev.keyCode;
		}

	}
	
	
	var food=dropFood();
	function dropFood(){
		var x=Math.floor(Math.random()*19);
		var y=Math.floor(Math.random()*14);	
		while(dic[x+'_'+y]){
			x=Math.floor(Math.random()*19);
			y=Math.floor(Math.random()*14);
		}
		document.getElementById(x+'_'+y).className='b f'
		return {x:x,y:y};
	}
	//蛇运动   执行 操作
	
	function move(){

		var direction=dir;
		var h=snake[snake.length-1];
		var newH;
		if(direction==39){	
			newH={x:h.x+1,y:h.y};	
		}
		if(direction==40){
			newH={x:h.x,y:h.y+1};	
		}
		if(direction==37){
			newH={x:h.x-1,y:h.y};	
		}
		if(direction==38){
			newH={x:h.x,y:h.y-1};
		}
		if(dic[newH.x+'_'+newH.y]||newH.x<0||newH.y<0||newH.x>19||newH.y>14){
			game=false;
			window.clearInterval(t);
			alert('Game Over!');
			return;
		}
		if(food.x==newH.x&&food.y==newH.y){
			food=dropFood();
			score+=k;
			document.querySelector('.fsnum').innerHTML=score;
		}else{
			var d=snake.shift();
			delete dic[d.x+'_'+d.y];
			document.getElementById(d.x+'_'+d.y).className='b';
		}
		
		snake.push(newH);
		dic[newH.x+'_'+newH.y]=true;
		document.getElementById(newH.x+'_'+newH.y).className='b s';
		
	}
}