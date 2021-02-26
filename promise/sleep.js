function sleep(time){
    return new Promise(function(resolve,reject){    
        setTimeout(()=>resolve('over'),time);
    });
}

async function run(time){
    let result = await sleep(time);
    console.log(result);
}

run(3000);