export type TokenType = 'DELIMITER' | 'IDENTIFIER' | 'NUMBER' | 'SEPARATOR'

export type Token = {
    type: TokenType
    value: string
}

export type GeneratedCode = {
    functionType: string
    args: string[]
}
