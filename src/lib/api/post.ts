import client from './client';


export const getPostList = () => {
    return client.get('/api/post/')
}

export const writePost = ({ title, body, tags }: { title: string, body: string, tags: string[] | undefined }) => {
    client.post('/', { title, body, tags });
}

export const readPost = (id: string) => {
    return client.get(`/${id}`);
}

export const deletePost = (id: string) => {
    return client.delete(`/${id}`);
}

export const updatePost = (id: string, { title, body, tags }: { title: string, body: string, tags: string[] | undefined }) => {
    return client.patch(`/${id}`, { title, body, tags });
}
