import { GeneratedCode, Token, TokenType } from "./types";

export class Parser {
    private tokens: Token[]
    private position: number
    private currentToken: Token
    constructor(tokens: Token[]) {
	this.tokens = tokens
	this.position = 0
	this.currentToken = this.tokens[this.position]
    }

    private advance() {
	this.position += 1
	this.currentToken = this.tokens[this.position]
    }

    public parse(): GeneratedCode[] {
	const output = []
	while (this.currentToken) {
	    try {
		output.push(this.parseFunction())
	    } catch (err) {
		console.log(err)
		console.log('stack')
		console.log(output)
		process.exit(1)
	    }
	}
	return output
    }

    private expect(tokenType: TokenType): Token {
	const token = this.currentToken
	if (!token || token.type !== tokenType) {
	    throw new Error(`Unable to parse! Expected: ${tokenType} but got ${token.type}. ${this.currentToken}, pos: ${this.position}`)
	}
	this.advance()
	return token
    }

    private parseFunction() {
	const functionType = this.expect('IDENTIFIER').value
	this.expect('DELIMITER')
	const args = this.parseArguments()
	this.expect('DELIMITER')

	return { functionType, args }
    }

    private parseArguments(): string[] {
	if (this.currentToken.type === 'DELIMITER') {
	    return []
	}

	const args: string[] = []
	while (this.currentToken.value !== ')') {
	    args.push(this.expect('NUMBER').value)
	    if (this.currentToken.value !== ')') {
		this.expect("SEPARATOR")
	    }
	}

	return args
    }
}
