/* map结构类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键 
set 添加成员
get 读取成员
has
delete
size属性返回 Map 结构的成员总数。
clear() 清除所有成员


map的遍历方法与set一致  遍历顺序也是插入顺序
keys()
values()
entries()
forEach()

上述方法可以结合...生成数组
[...map.keys()]

可以进行for of 遍历 利用这一点可以将map转为对象
 let obj = Object.create(null);
  for (let [k,v] of Map) {
    obj[k] = v;
  }
*/
// map也是构造函数，也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组,注意是数组，不是对象。

const map = new Map([['name','zs'],['title','nb']])
console.log(map) // Map(2) { 'name' => 'zs', 'title' => 'nb' }

// 如果对同一个键多次赋值，后面的值将覆盖前面的值。
// 注意 map的键是对象的引用，当两个对象内容一样但引用不一样时视为两个键。



/* weakMap 与 map的区别 1.只接受对象作为键值。2.WeakMap的键名所指向的对象，不计入垃圾回收机制。 与weakSet类似
 */

// WeakMap只有四个方法可用：get()、set()、has()、delete()。