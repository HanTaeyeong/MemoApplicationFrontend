import {getItem, setItem, removeItem} from '../../lib/localStorageRequest';

describe('localStorage test',()=>{
    it('setItem',()=>{
        setItem('username','gksxodud');
        expect(getItem('username')).toEqual('gksxodud')
    })
    it('removeItem',()=>{
        setItem('username','gksxodud');
        expect(getItem('username')).toEqual('gksxodud')
        removeItem('username');
        expect(getItem('username')).toBe('');
    })
    it('localStorage error test',()=>{
        setItem(()=>new Error('sdf'),'gkgsod');
       
        removeItem(12345);

        expect(1).toBe(1);
    })
})


