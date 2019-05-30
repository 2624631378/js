function fn(){
    console.log('123');
    
}
function bindEvent(){
    var box = document.getElementsByClassName('box')[0];
    box.onclick = function(){
        console.log('click');
        
    }

}