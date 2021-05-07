import { startLoading, finishLoading } from '../store/loading';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

export function createRequestThunk(type: string, request: Function) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return (params: any) => async (dispatch: Dispatch<any>) => {
        dispatch({ type });
        dispatch(startLoading(type));
        try {
            const response = await request(params);
            dispatch({
                type: SUCCESS,
                payload: response.data
            });
        } catch (e) {
            dispatch({
                type: FAILURE,
                payload: {error:e.toJSON()},
            });
        } finally {
            dispatch(finishLoading(type));
        }
    }
}

export const createRequestActionTypes = (type: string) => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
}