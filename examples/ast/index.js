const { parse, print } = require('recast')
const { visit } = require('ast-types')

const code = `
const Word = 'Word';
console.log(Word);
`

const ast = parse(code)

visit(ast, {
  visitVariableDeclaration(path) {
    if (path.node.kind === 'const') {
      path.node.kind = 'var'
    }

    this.traverse(path)
  },
  visitIdentifier(path) {
    if (path.node.name === 'Word') {
      path.node.name = 'a'
    }
    
    this.traverse(path)
  }
})

console.log(print(ast).code)
