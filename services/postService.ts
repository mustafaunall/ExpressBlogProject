import Post, {
    IPost
} from "../models/Post";
import {
    IAddPost
} from '../models/ApiModel'
import {
    ObjectId
} from 'mongoose'
import { Result } from "postcss";

export default class PostService {
    public async Get() {
        const result: IPost[] = await Post.find().lean()
        return result;
    }

    public async Add(model: IAddPost) {
        try {
            await Post.create({
                title: model.title,
                description: model.description,
                price: model.price,
                createdUserId: model.createdUserId
            });
        } catch (error) {
            console.log(error)
        }
    }
    
    public async Detail(postId: string): Promise<IPost | undefined>  {
        try {
            const result = await Post.findById(postId).lean()
            if (result !== null) return result
            return undefined
        } catch (error) {
            console.log(error)
        }
    }

    public async Update(postId: string, title: string, description: string, price: number): Promise<boolean> {
        try {
            const success = await Post.findByIdAndUpdate(postId, { title, description, price })
            if (!success) return false
            return true
        } catch (error) {
            return false
        }
    }

    public async Delete(postId: string): Promise<boolean> {
        try {
            const success = await Post.findByIdAndDelete(postId)
            if (!success) return false
            return true
        } catch (error) {
            return false
        }
    }
}
