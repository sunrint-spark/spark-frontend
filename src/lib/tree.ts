export const generateRandomCode = (): string => {
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const allCharacters = upperCase + lowerCase + numbers;
    const codeLength = 8;
    let result = '';

    result += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
    result += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));

    for (let i = 3; i < codeLength; i++) {
        result += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }

    result = result.split('').sort(() => Math.random() - 0.5).join('');
    return result
};