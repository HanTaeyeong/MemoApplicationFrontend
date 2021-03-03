import Ajv from 'ajv';

const ajv = new Ajv({allErrors:true});

//Minimum eight characters, at least one letter, one number and one special character:
//js new Regex(is not the same with \d \\d);
//number, integer, string, boolean, array, object or null

export const userSchema = {
    "properties": {
        "username": {
            "type": 'string',
            "pattern": '^[a-zA-Z0-9]{4,16}$'
        },
        "password": {
            "type": 'string',
            "pattern": '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,32}$'
        }
    },
    "required": ['username', 'password']
}

export const validate = (schema: Object, data: Object) => {

    console.log(data);

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        return { ...validate.errors, isValid: false };
    }
    return { ...validate, isValid: true }
}