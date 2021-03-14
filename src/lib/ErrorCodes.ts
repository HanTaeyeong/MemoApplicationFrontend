interface ErrorCodesType {
    [key: number]: string
};

const ErrorCodes: ErrorCodesType = {
    //server
    200: 'okay', 
    409: '[ID] Already existing ID',
    440: 'Username or Password is empty.',
    441: '[ID] There is no such user.',
    442: '[PW] Invailid password.',
    500: '[SV] Internal server error.',

    //client
    450:'okay',
    451:'',
    
}

export default ErrorCodes;