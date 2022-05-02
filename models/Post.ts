import { Model, model, Schema } from "mongoose";

export interface IPost {
    title: string;
    description: string;
    price?: number;
    ownerUserId: string;
    isSelled: boolean;
    isActive: boolean;
}

const PostSchema =  new Schema<IPost>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: false, default: 0 },
    ownerUserId: { type: String, required: true },
    isSelled: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: true },
});

const Post: Model<IPost> = model("Post", PostSchema);
export default Post;
