import Post, {
    IPost
} from "../models/Post";
import {
    IAddPost
} from '../models/ApiModel'

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
                ownerUserId: model.ownerUserId
            });
        } catch (error) {
            console.log(error)
        }
    }
}
