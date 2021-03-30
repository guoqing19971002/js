async function async1 () {
    console.log('async1 start')
    await async2()
    console.log('async1 end') // 关键在这一步，它相当于放在 callback 中，最后执行
    await async3()
    console.log('async1 end2')
  }
  
  async function async2 () {
    console.log('async2')
  }
  async function async3 () {
    console.log('async3')
  }
  /* console.log('script start');
  (async function(){
    await async1()
    console.log('script end');
  })() */
 
  /*
   script start
   async1 start
   async2
   script end
   async1 end
   async3
   async1 end2

   script start
   async1 start
   async2
   async1 end
   async3
   async1 end2
   script end
   */


   (async function (){
     const a = async function (){
       return 100
     }
     console.log(a)
   })()