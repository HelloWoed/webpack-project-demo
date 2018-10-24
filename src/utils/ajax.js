export default function(method,url,param,success,err){
    var ajax = new XMLHttpRequest();
    if(method.toLowerCase() == 'get'){
        url += '?' + param;
        ajax.open(method,url,true);
        ajax.send();
    }else if(method.toLowerCase() == 'post'){
        ajax.open(method,url);
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        if (param) {
            ajax.send(param);
        }else{
            ajax.send();
        }
    }
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            success(ajax.responseText);
        }else{
            if(err)err();
        }
    }
}