import type { Token, TokenType } from "./types"

export class Lexer {
    private input: string
    private position: number
    private tokens: Token[]
    private currentChar: string | null

    constructor(inputText: string) {
	this.input = inputText
	this.position = 0
	this.tokens = []
	this.currentChar = this.input[this.position] || null
    }

    private advance() {
	this.position += 1
	this.currentChar = this.input[this.position] || null
    }

    private addToken(type: TokenType, value: string) {
	this.tokens.push({ type, value })
    }

    public lex() {
	while (this.currentChar) {
	    if (/[a-z]/gi.test(this.currentChar)) {
		this.lexIdentifier()
	    } else if (/[0-9]/.test(this.currentChar)) {
		this.lexNumber()
	    } else if (['(', ')'].includes(this.currentChar)) {
		this.addToken('DELIMITER', this.currentChar)
		this.advance()
	    } else if (this.currentChar === ',') {
		this.addToken('SEPARATOR', this.currentChar)
		this.advance()
	    } else if (/\s/.test(this.currentChar)) {
		this.advance()
	    } else {
		throw new Error(`Unexpected token: ${this.currentChar}`)
	    }
	}
    }

    private lexIdentifier() {
	if (!this.currentChar) return
	const startPos = this.position
	while (/[a-z']/gi.test(this.currentChar)) {
	    this.advance()
	}
	const endPos = this.position
	const token = this.input.slice(startPos, endPos)
	this.addToken('IDENTIFIER', token)
    }

    private lexNumber() {
	if (!this.currentChar) return
	const startPos = this.position
	while (/[0-9]/g.test(this.currentChar)) {
	    this.advance()
	}
	const endPos = this.position
	const token = this.input.slice(startPos, endPos)
	this.addToken('NUMBER', token)
    }

    public getTokens() {
	return this.tokens
    }
}
