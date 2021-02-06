const http = require("http");
let time = null;
function updateTime() {
  setInterval(() => (time = new Date().toUTCString()), 5000);
}
updateTime();

http
  .createServer((req, res) => {
    //console.log("url:", `${req.method} ${req.url} `);

    const { url } = req;
    if ("/" === url) {
      res.end(`
            <html>
                <!-- <meta charset="UTF-8"> -->
                Html Update Time: ${time}
                <script src='main.js'></script>
            </html>
            `);
    } else if (url === "/main.js") {
      const content = `document.writeln('<br>JS   Update Time:${time}')`;
      // HTTP1.0 强缓存
      // res.setHeader('Expires', new Date(Date.now() + 5 * 1000).toUTCString())
      // HTTP1.1 强缓存 cache-control字段   cache-control 优先级更高
      // res.setHeader('Cache-Control', 'max-age=10')
      // 协商缓存
      // 方式一 last-modified & if-Modified-Since  通过协商修改时间为基础的策略

      /* 静态资源应答时都会通过last-modified来标示修改时间。
           浏览器下次请求相同资源会将last-modified时间作为if-modified-since字段放在请求报文中用以询问服务器是否该资源过期。
           服务器需要通过规则判断是否过期
           过期时直接返回200并在body中放入更新内容
           如果未过期则直接返回304状态码即可
        */
      /* res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('last-modified', new Date().toUTCString())
        if (new Date(req.headers['if-modified-since']).getTime() + 5 * 1000 > Date.now()) {
            console.log('协商缓存命中....')
            res.statusCode = 304
            res.end()
            return
        } */

      // 方式二 etag & if-None-Match  一般的做法是将返回内容进行摘要（Hash），然后通过对比摘要来判断内容是否更新。
      /* 
         静态资源应答时都会通过etag来标示内容摘要。
         浏览器下次请求相同资源会将etag时间作为if-none-match字段放在请求报文中用以询问服务器是否该资源过期。
         服务器需要通过和服务器内容的摘要进行比对确定是否过期
         过期时直接返回200并在body中放入更新内容
         如果未过期则直接返回304状态码即可        
        */
      res.setHeader("Cache-Control", "no-cache");
      const crypto = require("crypto"); // nodejs的一个加密模块
      // createHash 创建并返回一个 Hash 对象，该对象可用于生成哈希摘要  digest 字符编码
      const hash = crypto.createHash("sha1").update(content).digest("hex");
      res.setHeader("Etag", hash);
      if (req.headers["if-none-match"] === hash) {
        console.log("Etag协商缓存命中.....");
        res.statusCode = 304;
        res.end();
        return;
      }
      res.statusCode = 200;
      res.end(content);
    } else if (url === "/favicon.ico") {
      console.log("favicon..");
      res.end("");
    }
  })
  .listen(3000, () => {
    console.log("服务已启动" + 3000);
  });
