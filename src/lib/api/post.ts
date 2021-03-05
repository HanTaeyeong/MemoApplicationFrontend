import client from './client';

const proxy='/simplememo.com/api/post'

export const getPostList = ({ page, limit }: { page: number, limit: number }) => client.get(`${proxy}/get?page=${page}&limit=${limit}`)

export const writePost = ({ title, contents, tags }: { title: string, contents: string, tags: string[] | undefined }) =>
    client.post(proxy+'/write', { title, contents, tags });

export const readPost = (id: string) =>
    client.get(`${proxy}/read/${id}`);

export const deletePost = (id: string) =>
    client.delete(`${proxy}/delete/${id}`);

export const updatePost = ({ _id, title, contents, tags }: { _id: string, title: string, contents: string, tags: string[] | undefined }) =>
    client.patch(`${proxy}/update/${_id}`, { title, contents, tags })
