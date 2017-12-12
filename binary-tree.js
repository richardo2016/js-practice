var { putstr } = require('./_base')

function Node (data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = show;
}

function show () {
  return this.data;
}

module.exports = function BST () {
  this.root = null;
  this.insert = insert;
  this.inOrder = inOrder;
  this.preOrder = preOrder;
  this.postOrder = postOrder;
}

function insert (data) {
  var n = new Node(data, null, null);
  if (this.root === null) {
    this.root = n;
  } else {
    var current = this.root;
    var parent;
    while (true) {
      parent = current;
      // check left first
      if (data < current.data) {
        current = current.left;
        if (current === null) {
          parent.left = n;
          break;
        }

      } else { // check right then
        current = current.right;
        if (current === null) {
          parent.right = n;
          break;
        }
      }
    }
  }
}

function visitNode (node) {
  putstr(node.show() + ' ');
}

function inOrder (node) {
  if (node !== null) {
    inOrder(node.left);
    visitNode(node);
    inOrder(node.right);
  }
}

function preOrder (node) {
  if (node !== null) {
    visitNode(node);
    preOrder(node.left);
    preOrder(node.right);
  }
}

function postOrder (node) {
  if (node !== null) {
    postOrder(node.left);
    postOrder(node.right);
    visitNode(node);
  }
}

// summary
// good balance between memoration and code effect.
//
// go throught util node equals to null
