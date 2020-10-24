function fn(i){
    return new Promise((resolve, reject) => {

        setTimeout(function (i) {
            console.log(i)
           if(i === 5)
           {
   
               resolve(i+1)
                          
           }
           else(
               reject(i)
           )

        }, 1000);
    })
}

fn(5).then((value) => {
    console.log(value)
}, (err) => {
    console.log(err)
});
console.log('next')
