/* bfs计算dom树最大孩子数 */

function bfs(node) {
  let q = [];
  let width = 0;
  q.push(node);
  while (q.length) {
    const e = q.shift();
    if (e && e.childNodes) {
      const nodeList = [].slice.call(e.childNodes);
      width = Math.max(width, nodeList.length);
      nodeList.forEach((i) => q.push(i));
    }
  }
  return width;
}
bfs(Array.from(document.getElementsByTagName("body"))[0]);

/*
dfs获取最深嵌套层数 
 */
function getDep(node) {
  let depth = 0;
  const dfs = (e, d = 0) => {
    depth = Math.max(d, depth);
    console.log(e.value)
    if(!e.childNodes) return
    const nodeList = [].slice.call(e.childNodes);
    nodeList.forEach((i) => {
      dfs(i, d + 1);
    });
  };
  dfs(node);
  return depth;
}
getDep(Array.from(document.getElementsByTagName("body"))[0])

const obj = {
  childNodes: [
    {
      value: "1",
      childNodes: [
        {
          value: "2",
          childNodes: [
            {
              value: "3",
              childNodes: [
                {
                  value: "4",
                  childNodes: [
                    {
                      value: "5",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

console.log(getDep(obj));
