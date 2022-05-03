import Post, {
    IPost
} from "../models/Post";

export default class PostService {
    public async Get() {
        const result: IPost[] = await Post.find().lean()
        return result;
    }

    public async Add(
        title: string, ownerUserId: string, description?: string, price?: number
    ) {
        try {
            await Post.create({
                title, description, price, ownerUserId
            });
        } catch (error) {
            throw error;
        }
    }
}
