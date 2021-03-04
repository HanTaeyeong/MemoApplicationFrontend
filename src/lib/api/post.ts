import client from './client';

export const getPostList = ({ page, limit }: { page: number, limit: number }) => client.get(`/api/post/get?page=${page}&limit=${limit}`)

export const writePost = ({ title, contents, tags }: { title: string, contents: string, tags: string[] | undefined }) =>
    client.post('/api/post/write', { title, contents, tags });

export const readPost = (id: string) =>
    client.get(`/api/post/read/${id}`);

export const deletePost = (id: string) =>
    client.delete(`/api/post/delete/${id}`);

export const updatePost = ({ _id, title, contents, tags }: { _id: string, title: string, contents: string, tags: string[] | undefined }) =>
    client.patch(`/api/post/update/${_id}`, { title, contents, tags })


