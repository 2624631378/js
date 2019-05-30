
import loadsh from 'lodash-es'
var aaa = function(){
    console.log('aaa');
    
}
var isArray = function(arg){
    console.log(loadsh.isArray(arg));
    
}
export{
    aaa,
    isArray
}