import client from './client';


export const getPostList = () => client.get('/api/post/')


export const writePost = ({ title, contents, tags }: { title: string, contents: string, tags: string[] | undefined }) =>
    client.post('/api/post/write', { title, contents, tags });

export const readPost = (id: string) =>
    client.get(`/api/post/read/${id}`);


export const deletePost = (id: string) =>
    client.delete(`/api/post/delete/${id}`);


export const updatePost = (id: string, { title, contents, tags }: { title: string, contents: string, tags: string[] | undefined }) =>
    client.patch(`/api/post/update/${id}`, { title, contents, tags });

