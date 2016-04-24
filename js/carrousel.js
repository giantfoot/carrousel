;(function(){
	window.onload=function(){
		Carrousel.init(document.querySelectorAll('.carrousel-main'));
		var box = document.getElementById("box");
		animate(box,"width",1050);
		animate(box,"height",200);
		animate(box,"left",400);
	      // animate(box,"height",200);
	  }
	  var Carousel=function(carrousel){
	  	var calSelf=this;
   //保存单个旋转图片对象
   this.carrousel=carrousel;
   this.carrouselItemMain=this.carrousel.querySelector('.carrousel-list');
   //获取左右按钮
   this.preBtn=this.carrousel.querySelector('.carrousel-btn-pre');
   this.nextBtn=this.carrousel.querySelector('.carrousel-btn-next');
      //获取图片数量
      this.carrouselItems=this.carrousel.querySelector('.carrousel-list').querySelectorAll('.carrousel-item');
   if(this.carrouselItems.length%2==0){//偶数帧的时候，克隆第一个加到最后，形成奇数的形式
   	this.carrouselItemMain.appendChild(this.carrousel.querySelector('.carrousel-list').firstElementChild.cloneNode(true));
   	this.carrouselItems=this.carrousel.querySelector('.carrousel-list').querySelectorAll('.carrousel-item');
   };
   //获取第一张图片
   this.carrouselFir=this.carrousel.querySelector('.carrousel-list').firstElementChild;
   //获取最后一张图片
   this.carrouselLat=this.carrousel.querySelector('.carrousel-list').lastElementChild;
   //默认参数配置
   this.Settings={
   	width:1000,  //幻灯片的宽度
   	height:400,  //幻灯片的高度
   	carrouselWidth:700, //幻灯片第一帧的宽度
   	carrouselHeight:400, //幻灯片第一帧的高度
   	scale:0.9,//记录显示比例关系
   	speed:500,
   	autoPlay:true,//是否自动播放
   	timeSpan:3000,//自动播放时间间隔
   	verticalAlign:'middle'  //默认有top\middle\bottom
   };
   if(this.getSetting()){
   	this.Settings=extendObj(this.Settings,this.getSetting());
   	// console.log(this.Settings);
   }
   this.setValue();
   this.setPic();
   this.nextBtn.onclick=function(){
   	calSelf.carrouselRote('left');
   };
   this.preBtn.onclick=function(){
   	calSelf.carrouselRote('right');
   };
   //判断是否自动播放
   if(this.Settings.autoPlay){
   	this.autoPlay();
   	this.carrousel.onmouseover=function(){
   		window.clearInterval(calSelf.timer);
   	};
   	this.carrousel.onmouseout=function(){
   		calSelf.autoPlay();
   	};
   };
}
Carousel.init=function(carrousels){
	var _this=this;
       //将nodeList转换为数组
       var cals= toArray(carrousels); 
       cals.forEach(function(item,index,array){
       	new _this(item);
       });
   }
   Carousel.prototype={
   	//自动播放
   	autoPlay:function(){
   		var _this=this;
   		this.timer=window.setInterval(function(){
   			_this.nextBtn.click();
   		},_this.Settings.timeSpan);
   	},
   	//旋转
   	carrouselRote:function(dir){
   		var _this=this;

   		if(dir=='left'){
   			toArray(this.carrouselItems).forEach(function(item,index,array){
   				var pre;
   				if(item.previousElementSibling==null){
   					pre=_this.carrouselLat;
   				}else{
   					pre=item.previousElementSibling;
   				}
   				var width=pre.offsetWidth;
   				var height=pre.offsetHeight;
   				var zIndex=pre.style.zIndex;
   				var opa=pre.style.opacity;
   				var top=pre.style.top;
   				var left=pre.style.left;
 
   				// console.log(width+'--'+height+'---'+zIndex+'---'+opa+'---'+top);
   				setTimeout(function(){
   					// animate(item,'width',width);
   					// animate(item,'height',height);
   					// animate(item,'opacity',opa);
   					// animate(item,'top',top);
   					// animate(item,'left',left);

   					item.style.width=width+'px';
   					item.style.height=height+'px';
   					item.style.zIndex=zIndex;
   					item.style.opacity=opa;
   					item.style.top=top;
   					item.style.left=left;
   				});

   			});
   		}
   		if(dir=='right'){
   			toArray(this.carrouselItems).forEach(function(item,index,array){
   				var next;
   				if(item.nextElementSibling==null){
   					next=_this.carrouselFir;
   				}else{
   					next=item.nextElementSibling;
   				}
   				// console.log(index+"------");
   				// console.log(item)
   				// console.log('----------------------')
   				var width=next.offsetWidth;
   				var height=next.offsetHeight;
   				var zIndex=next.style.zIndex;
   				var opa=next.style.opacity;
   				var top=next.style.top;
   				var left=next.style.left;
        
                var le=left.toString().slice(0,left.toString().length-3);
          
   				// console.log(width+'--'+height+'---'+zIndex+'---'+opa+'---'+top);
   				setTimeout(function(){
   					item.style.width=width+'px';
   					item.style.height=height+'px';
   					item.style.zIndex=zIndex;
   					item.style.opacity=opa;
   					item.style.top=top;
   					item.style.left=left;
   				});
   			});
   		}
   	},
   	//设置图片对齐方式
   	setCarrouselAlign:function(height){
   		var type=this.Settings.verticalAlign;
   		var top=0;
   		if(type==='middle'){
   			top=(this.Settings.height-height)/2;
   		}else if(type==='top'){
   			top=0;
   		}else if(type==='bottom'){
   			top=this.Settings.height-height;
   		}else{
   			top=(this.Settings.height-height)/2;
   		};
   		return top;
   	},
	//设置配置参数值去控制基本的宽度高度
	setValue:function(){
		this.carrousel.style.width=this.Settings.width+'px';
		this.carrousel.style.height=this.Settings.height+'px';
        //左右按钮设置
        var btnW=(this.Settings.width-this.Settings.carrouselWidth)/2;
        this.preBtn.style.width=btnW+'px';
        this.preBtn.style.height=this.Settings.height+'px';
        this.preBtn.style.zIndex=Math.ceil(this.carrouselItems.length/2);

        this.nextBtn.style.width=btnW+'px';
        this.nextBtn.style.height=this.Settings.height+'px';
        this.nextBtn.style.zIndex=Math.ceil(this.carrouselItems.length/2);
        //第一帧相关设置
        this.carrouselFir.style.left=btnW+'px';
        this.carrouselFir.style.width=this.Settings.carrouselWidth+'px';
        this.carrouselFir.style.height=this.Settings.carrouselHeight+'px';
        this.carrouselFir.style.zIndex=Math.floor(this.carrouselItems.length/2);

    },
	//设置除第一张之外的图片位置关系
	setPic:function(){
		var sliceItems=toArray(this.carrouselItems).slice(1);
		var sliceLength=sliceItems.length/2;
		var rightSlice=sliceItems.slice(0,sliceLength);
		var leftSlice=sliceItems.slice(sliceLength);
		var level=Math.floor(this.carrouselItems.length/2);

		var carrouselSelf=this;
		var rw=this.Settings.carrouselWidth;
		var rh=this.Settings.carrouselHeight;
		var gap=((this.Settings.width-this.Settings.carrouselWidth)/2)/level;


         //第一帧Left
         var firLeft=(this.Settings.width-this.Settings.carrouselWidth)/2;
         //固定偏移量
         var constOffset=firLeft+rw;

        //设置右边图片的位置关系
        var rightIndex=level;
        rightSlice.forEach(function(item,index,array){
        	rightIndex--;
        	var i=index;
        	rw=rw*carrouselSelf.Settings.scale;
        	rh=rh*carrouselSelf.Settings.scale;

        	item.style.zIndex=rightIndex;
        	item.style.width=rw+'px';
        	item.style.height=rh+'px';
        	item.style.opacity=1/(++i);
        	item.style.left=(constOffset+(++index)*gap-rw)+'px';
        	item.style.top=carrouselSelf.setCarrouselAlign(rh)+'px';
        });
        //设置左边位置关系
        
        var lw=rightSlice[rightSlice.length-1].offsetWidth;
        var lh=rightSlice[rightSlice.length-1].offsetHeight;
        /*此处有一个比较巧妙的地方就是leftSlice的第一张的尺寸实际上等于右边的最后一张*/

        var leftOpa=level;
        leftSlice.forEach(function(item,index,array){
        	var i=index;
        	item.style.zIndex=i;
        	item.style.width=lw+'px';
        	item.style.height=lh+'px';
        	item.style.opacity=1/leftOpa;
        	item.style.left=i*gap+'px';
        	item.style.top=carrouselSelf.setCarrouselAlign(lh)+'px';

        	lw=lw/carrouselSelf.Settings.scale;
        	lh=lh/carrouselSelf.Settings.scale;

        	leftOpa--;
        });
    },
	//获取DOM中的配置参数
	getSetting:function(){
		var setting=this.carrousel.getAttribute('data-setting');
		if(setting&&setting!=null){
			setting=JSON.parse(setting);
			return setting;
		}else{
			return {};
		}
	}
};
//类似$.extend的扩展对象的方法
function cloneObj(oldObj){//复制对象方法
	if((oldObj==null)||(typeof(oldObj!='object'))){
		return oldObj;
	}
	var newObj=new Object();
	for(var item in oldObj){
		newObj[item]=cloneObj(oldObj[item]);
	}
	return newObj;
}
function extendObj(){//扩展对象
	var args=arguments;
	if(args.length<2){
		return;
	}
	var temp=cloneObj(args[0]);
	for(var i=1;i<args.length;i++){
		for(var item in args[i]){
			temp[item]=args[i][item];
		}
	}
	return temp;
}
//转换数组方法
function toArray(list){
	return Array.prototype.slice.call(list);
}
//获取元素样式
function getstyle(dom,name){
	if(dom.currentStyle){
		return dom.currentStyle[name];
	}else{
		return getComputedStyle(dom,false)[name];
	}
}
//定义动画
function animate(dom,attr,toStyle,fn){
	// console.log('--------'+toStyle)
	// clearInterval(dom.timer);
	dom.timer=setInterval(function(){
		var cur=0;
		if(attr=='opacity'){
			cur=Math.round(parseFloat(getstyle(dom,attr))*100);
		}else{
			cur=parseInt(getstyle(dom,attr));
		}
		var speed=(toStyle-cur)/18;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);

		if(cur==toStyle){
			clearInterval(dom.timer);
			if(fn){
				fn();
			}
		}else{
			if(attr=='opacity'){
				dom.style.filter='alpha(opacity=)'+(cur+speed)+')';
				dom.style.opacity=(cur+speed)/100;
			}else{
				dom.style[attr]=cur+speed+'px';
			}
		}
	},30);
}
window['Carrousel']=Carousel;
})();