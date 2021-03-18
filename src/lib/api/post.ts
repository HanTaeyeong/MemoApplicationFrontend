import client from './client';

const prefix = '/api/post';

export const getPostList = ({ page, limit }: { page: number, limit: number }) => client.get(`${prefix}/get?page=${page}&limit=${limit}`)

export const writePost = ({ title, contents, tags }: { title: string, contents: string, tags: string[] | undefined }) =>
    client.post(prefix + '/write', { title, contents, tags });

export const readPost = (id: string) =>
    client.get(`${prefix}/read/${id}`);

export const deletePost = ({_id}:{_id:string}) =>
    client.delete(`${prefix}/delete/${_id}`);

export const updatePost = ({ _id, title, contents, tags }: { _id: string, title: string, contents: string, tags: string[] | undefined }) =>
    client.patch(`${prefix}/update/${_id}`, { title, contents, tags })
