import client from './client';


const apiServer=process.env.MEMO_API_ADRESS;

const prefix = apiServer+'/api/post';

export const getPostList = async ({ page, limit }: { page: number, limit: number }) => await client.get(`${prefix}/get?page=${page}&limit=${limit}`)


export const writePost = ({ title, contents, tags }: { title: string, contents: string, tags: string[] | undefined }) => {
    if (!title.trim()) {
        return () => { };
    }
    return client.post(prefix + '/write', { title, contents, tags });
}

export const readPost = (id: string) =>
    client.get(`${prefix}/read/${id}`);

export const deletePost = ({ _id }: { _id: string }) =>
    client.post(`${prefix}/delete/${_id}`, {});

export const updatePost = ({ _id, title, contents, tags }: { _id: string, title: string, contents: string, tags: string[] | undefined }) =>
    client.post(`${prefix}/update/${_id}`, { title, contents, tags })
