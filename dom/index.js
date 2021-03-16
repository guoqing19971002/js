/* bfs计算dom树最大孩子数 */

function bfs(node) {
  let q = [];
  let width = 0;
  q.push(node);
  while (q.length) {
    const e = q.shift();
    if (e&&e.childNodes) {
      const nodeList = [].slice.call(e.childNodes);
      width = Math.max(width, nodeList.length);
      nodeList.forEach((i) => q.push(i));
    }
  }
  return width;
}
bfs(Array.from(document.getElementsByTagName("body"))[0]);
