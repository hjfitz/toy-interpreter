import { Interpreter } from "./interpreter"
import { Lexer } from "./lexer"
import { Parser } from "./parser"

const input = `mul(2,4)
dont()
mul(5,5)
mul(32, 64, 11)
mul(11,8)
undo()
do()
mul(8,5)`

const lexer = new Lexer(input)

lexer.lex()

const tokens = lexer.getTokens()

console.log(tokens)

const parser = new Parser(tokens)

const out = parser.parse()

console.log(out)

const interpreter = new Interpreter(out)

interpreter.interpret()
