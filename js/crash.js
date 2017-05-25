function crash(arr1,arr2){
    if(arr1 instanceof Array && arr2 instanceof Array){
        for(var i = 0 ; i < arr1.length; i++){
            for(var j = 0 ; j < arr2.length ; j++){
                var arr1W = parseInt(window.getComputedStyle(arr1[i].img).width),
                    arr2W = parseInt(window.getComputedStyle(arr2[j].img).width),
                    arr1L = parseInt(window.getComputedStyle(arr1[i].img).left),
                    arr2L = parseInt(window.getComputedStyle(arr2[j].img).left),
                    arr1H = parseInt(window.getComputedStyle(arr1[i].img).height),
                    arr2H = parseInt(window.getComputedStyle(arr2[j].img).height),
                    arr1T = parseInt(window.getComputedStyle(arr1[i].img).top),
                    arr2T = parseInt(window.getComputedStyle(arr2[j].img).top);
                if(Math.abs(arr1L-arr2L)<=arr1W && (Math.abs(arr1T-arr2T)<= arr1H||Math.abs(arr1T-arr2T)<= arr2H) ){
                    return {i:i,j:j,isCrash:true};
                }
            }
        }
        return {isCrash:false};
    }
}



