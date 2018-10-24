var pagination = function(option,fun){
    this.parentId = option.id;                             //容器
    this.pageSize = option.pageSize || 1;                  //每页显示多少条
    this.totals = option.totals || 0;                      //总条目数
    this.currentPage = option.currentPage || 1;            //当前页
    this.showFirstBtn = option.showFirstBtn || false;      //显示首页按钮
    this.showLastBtn = option.showLastBtn || false;        //显示尾页按钮
    this.totalPage = Math.ceil(this.totals / this.pageSize);//总页数
    this.firstText = '首页';
    this.lastText = '尾页';
    this.preText = '上一页';
    this.nextText = '下一页';
    this.goText = '跳转至';
    /**
     * 创建dom元素
     */
    this.createDom = function(nodeName,attr,text){
        var el = document.createElement(nodeName);
        if(attr){
            for(var key in attr){
                el.setAttribute(key,attr[key]);
            }
        }
        if(text){
            el.innerText = text;
        }
        return el;
    }
    /**
     * 添加className
     */
    this.addClass = function(ele,className){
        var oldClass = ele.className.split(' ');
        if(oldClass.indexOf(className) < 0){
            oldClass.push(className);
            ele.className = oldClass.join(' ');
        }
    }
    /**
     * 删除class
     */
    this.delClass = function(ele,className){
        var classArr = ele.className.split(' ');
        classArr.forEach(function(name,i){
            if(name == className){
                classArr.replace(i,1);
            }
        });
        ele.className = classArr;
    }
    /**
     * 是否包含class
     */
    this.hasClass = function(ele,className){
        var classArr = ele.className.split(' ');
        return classArr.indexOf(className) < 0 ? false : true;
    }
    var self = this;
    this.refshPage = function(index){
        self.currentPage = index;
        fun(index);
        self.renderPage();
        var pageParent = document.getElementById(self.parentId);
        if(index == 1){
            self.addClass(pageParent.querySelector('.preBtn'),'btnDisabled');
            
        }else if(index == self.totalPage){
            self.addClass(pageParent.querySelector('.nextBtn'),'btnDisabled');
        }else{
            self.delClass(pageParent.querySelector('.preBtn'),'btnDisabled');
            self.delClass(pageParent.querySelector('.nextBtn'),'btnDisabled');
        }
    }
    /**
     * 生成分頁dom
     */
    this.getPageDom = function(index,totalPage){
        var pageBox = self.createDom('div',{class:'pageBox'});
        var firstBtn = self.createDom('span',{class:'firstBtn'},self.firstText);
        var lastBtn = self.createDom('span',{class:'lastBtn'},self.lastText);
        var preBtn = self.createDom('span',{class:'preBtn'},self.preText);
        var nextBtn = self.createDom('span',{class:'nextBtn'},self.nextText);
        if(self.showFirstBtn){
            pageBox.appendChild(firstBtn);
        }
        if(self.showLastBtn){
            pageBox.appendChild(lastBtn);
        }
        firstBtn.onclick = function(){
            self.refshPage(1);
        }
        lastBtn.onclick = function(){
            self.refshPage(totalPage);
        }
        preBtn.onclick = function(){
            var index = --self.currentPage;
            if(index < 1)index = 1;
            self.refshPage(index);
        }
        nextBtn.onclick = function(){
            var index = ++self.currentPage;
            if(index > totalPage)index = totalPage;
            self.refshPage(index);
        }
        pageBox.appendChild(preBtn);
        if(totalPage <= 10){
            for(var i = 1; i <= totalPage; i++){
                var page = self.createDom('span',{class:'pageNum'},i);
                if(i == index){
                    self.addClass(page,'pageActive');
                    
                } 
                pageBox.appendChild(page);
                (function(i){
                    page.onclick = function(){
                        self.refshPage(i);
                    }
                })(i);
            }
            pageBox.appendChild(nextBtn);
        }else{
            if(index <= 5){
                for(var i = 1; i < 9; i++){
                    var page = self.createDom('span',{class:'pageNum'},i);
                    if(i == index) self.addClass(page,'pageActive');
                    pageBox.appendChild(page);
                    (function(i){
                        page.onclick = function(){
                            self.refshPage(i);
                        }
                    })(i);
                }
                pageBox.appendChild(self.createDom('span',{class:'dots'},'...'));
                var lastPage = self.createDom('span',{class:'pageNum'},totalPage);
                pageBox.appendChild(lastPage);
                lastPage.onclick = function(){
                    self.refshPage(totalPage);
                }
                pageBox.appendChild(nextBtn);
            }
            if(index >= (totalPage - 4)){
                var firstPage = self.createDom('span',{class:'pageNum'},1);
                firstPage.onclick = function(){
                    self.refshPage(1);
                }
                pageBox.appendChild(firstPage);
                pageBox.appendChild(self.createDom('span',{class:'dots'},'...'));
                for(var i = totalPage - 9; i <= totalPage; i++){
                    var page = self.createDom('span',{class:'pageNum'},i);
                    if(i == index) self.addClass(page,'pageActive');
                    pageBox.appendChild(page);
                    (function(i){
                        page.onclick = function(){
                            self.refshPage(i);
                        }
                    })(i);
                }
                pageBox.appendChild(nextBtn);
            }
            if(index > 5 && index < (totalPage - 4)){
                var firstPage = self.createDom('span',{class:'pageNum'},1);
                firstPage.onclick = function(){
                    self.refshPage(1);
                }
                pageBox.appendChild(self.createDom('span',{class:'dots'},'...'));
                for(var i = index - 3; i <= index + 3; i++){
                    var page = self.createDom('span',{class:'pageNum'},i);
                    if(i == index) self.addClass(page,'pageActive');
                    pageBox.appendChild(page);
                    (function(i){
                        page.onclick = function(){
                            self.refshPage(i);
                        }
                    })(i);
                }
                pageBox.appendChild(self.createDom('span',{class:'dots'},'...'));
                var lastPage = self.createDom('span',{class:'pageNum'},totalPage);
                pageBox.appendChild(lastPage);
                lastPage.onclick = function(){
                    self.refshPage(totalPage);
                }
                pageBox.appendChild(nextBtn);
            }
        }
        if(index == 1){
            self.addClass(preBtn,'btnDisabled');
        }else if(index == totalPage){
            self.addClass(nextBtn,'btnDisabled');
        }
        if(self.showLastBtn){
            pageBox.appendChild(lastBtn);
        }
        return pageBox;
    };
    /**
     * 渲染page
     */
    this.renderPage = function(){
        var pageParent = document.getElementById(self.parentId);
        var pagesDom = self.getPageDom(self.currentPage,self.totalPage);
        pageParent.innerHTML = '';
        pageParent.appendChild(pagesDom);
    }
    this.renderPage();
}