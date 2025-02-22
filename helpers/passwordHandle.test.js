//1. INVOCAR O ARQUIVO ORIGINAL
const { handlePassword, matchPassword } = require('./passwordHandle')

//2. SETAR A SUIT DE  TESTE

describe('password handle', () => {

  it('should hash the password correctly', () => {
    const password = 'mypassword'
    const hashedPassword = handlePassword(password)

    expect(hashedPassword).not.toBe(password)
    expect(hashedPassword).toMatch(/^\$2[ayb]\$.{56}$/)
  })

  it('should match the correct password', () => {
    const password = 'mypassword'
    const hashedPassword = handlePassword(password)
    const isMatch = matchPassword(password, hashedPassword)
    expect(isMatch).toBe(true)
  })

  it('should not match an incorrect pasword', () => {
    const password = 'mypassword'
    const hashedPassword = handlePassword(password)
    const isMatch = matchPassword('wrongpassword', hashedPassword)
    expect(isMatch).toBe(false)
  })

})

// it()