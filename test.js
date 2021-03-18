/* function fn(i){
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
 */

/*  const foo = {
     name:{
         bar:'111'
     }
 }

 const { bar } = foo.name

 console.log(bar) */

const jsList = [
  "es5:forEach",
  "es5:map",
  "es5:filter",
  "es6:find",
  "es6:findIndex",
  "add",
];
const jsObj = jsList
  .map((item) => item.split(":")) // 拆开每一项
  .filter((arr) => {
    console.log(arr);
    arr.length === 2;
  }) //
  .reduce((obj, item) => {
    const [version, apiName] = item; // 此时每一项是数组 [es5,forEach]
    return {
      ...obj,
      [version]: [...(obj[version] || []), apiName],
    };
  }, {});

console.log(jsObj);
