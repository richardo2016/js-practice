var BST = require('./binary-tree')

/**
 * test inOrder
 * @type {BST}
 */
var nums = new BST();

nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);

console.log('InOrder traversal: ');
nums.inOrder(nums.root);
console.log('');

/**
 * test preOrder
 */
console.log('preOrder traversal: ');
nums.preOrder(nums.root);
console.log('');

/**
 * test preOrder
 */
function getRightLeaf (node) {
  var current = node
  while (current && current.right) {
    current = current.right
  }

  return current
}
console.log('postOrder traversal: ');
nums.postOrder(nums.root);
console.log('');
