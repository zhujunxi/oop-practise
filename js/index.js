!function(){
	var Menu = function(option) {
		var defaults = {
			el:'cell_title',
			time:200,
			initOpen:-1,
			listData:[]
		}
		this.option = Object.assign(defaults,option)
		this.init()
	}
	/*			 
	 * 1:创建DOM
	 * 2:绑定事件
	 * */
	Menu.prototype = {
		//初始化（创建DOM）
		init:function() {
			
			this.option.initOpen >=0 ?this.openInit():'';
			this.createDom();
			this.bindEvent();
		},
		openInit:function(){
			let index = this.option.initOpen;
			console.log(index)
		},
		createDom:function(){
			let listData = this.option.listData;
			let box = document.querySelector('.box')
			for(let i=0;i<listData.length;i++) {
				let item = listData[i].item
				let cell = document.createElement('div')
				let titleWrap = document.createElement('div')
				let icon = document.createElement('i')
				let title = document.createElement('span')
				let con = document.createElement('div')
				
				cell.className = 'cell';
				titleWrap.className = 'cell_title'
				icon.className = 'cell_title_icon iconfont'
				con.className = 'cell_con'
				con.style.transition = "height "+ this.option.time +"ms";
				
				icon.innerHTML = listData[i].icon
				title.innerHTML = listData[i].title
				titleWrap.appendChild(icon)
				titleWrap.appendChild(title)
				cell.appendChild(titleWrap)
				let liCount = 0
				for(let j=0;j<item.length;j++){
					let li = document.createElement('li')
					let itemLink = document.createElement('a')
					
					li.className = 'arrow-right';
					itemLink.href = item[j].link;
					itemLink.innerHTML = item[j].title;
					li.appendChild(itemLink);
					con.appendChild(li);
					liCount++
				}
				//初始打开
				let initOpen = this.option.initOpen
				if(initOpen >= 0 && i == initOpen){
					titleWrap.classList.add('active')
					con.classList.add('active')
					let height = parseInt(getComputedStyle(con, null)['height']);
					console.log(height)
					con.style.height = liCount*57 +'px';
					console.log(con)
				}
				cell.appendChild(con)
				box.appendChild(cell)
			}
		},
		//绑定事件
		bindEvent:function() {
			var self = this
			let title = document.querySelectorAll('.'+this.option.el) ;
			for(let i = 0;i<title.length;i++){
				title[i].addEventListener('click',function(){
					let con = this.parentNode.querySelector('.cell_con')
					if(this.classList.contains('active')){
						this.classList.remove('active')
						con.classList.remove('active')
						con.style.height = '0px'
					}else{
						this.classList.add('active')
						con.classList.add('active')
						con.style.height = 'auto';
						let height = parseInt(getComputedStyle(con, null)['height']);
						con.style.height = '0';
						setTimeout(function() {
							con.style.height = height +'px';
						},0)
						
					}
				},false)
			}
		}
	}
	
	window.Menu = Menu	
}()

			
