import client from './client';
import { getConfig } from './config';


const apiServer = process.env.REACT_APP_MEMO_API_ADDRESS;

const prefix = apiServer + '/api/post';

export const getPostList = async ({ page, limit }: { page: number, limit: number }) => await client.get(`${prefix}/get?page=${page}&limit=${limit}`, getConfig())

export const writePost = ({ title, contents, tags }: { title: string, contents: string, tags: string[] | undefined }) =>
    client.post(prefix + '/write', { title, contents, tags }, getConfig())

// export const readPost = (id: string) =>
//     client.get(`${prefix}/read/${id}`);

export const deletePost = ({ _id }: { _id: string }) =>
    client.post(`${prefix}/delete/${_id}`, {}, getConfig());

export const updatePost = ({ _id, title, contents, tags }: { _id: string, title: string, contents: string, tags: string[] | undefined }) =>
    client.post(`${prefix}/update/${_id}`, { title, contents, tags }, getConfig())
