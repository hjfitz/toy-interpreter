import { GeneratedCode } from "./types";

export class Interpreter {
    private readonly code: GeneratedCode[]
    private position: number
    private currentBlock: GeneratedCode

    constructor(code: GeneratedCode[]) {
	this.code = code
	this.position = 0
	this.currentBlock = this.code[this.position]
    }

    private advance() {
	this.position += 1
	this.currentBlock = this.code[this.position]
    }

    public interpret() {
	let total = 0
	let mostRecentSum = 0
	let shouldExec = true
	while (this.currentBlock) {
	    const { functionType, args } = this.currentBlock
	    switch (functionType) {
		case 'mul': {
		    const multiplied = args.reduce((a, c) => a * Number(c), 1)
		    if (shouldExec) {
			total += multiplied
		    }
		    mostRecentSum = multiplied
		    break
		}
		case 'dont': {
		    shouldExec = false
		    break
		}
		case 'do': {
		    shouldExec = true
		    break
		}
		case 'undo': {
		    total -= mostRecentSum
		    break
		}
	    }
	    this.advance()
	}
	console.log(total)
    }
}
