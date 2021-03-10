interface ErrorCodesType {
    [key: number]: string
};

const ErrorCodes: ErrorCodesType = {
    200: 'okay',
    440: 'Username or Password is empty.',
    441: 'There is no such user.',
    442: 'Invailid password.',
    500: 'Internal server error.',
    409: 'Already existing ID'
}

export default ErrorCodes;