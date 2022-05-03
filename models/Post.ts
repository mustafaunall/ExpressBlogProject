import { Model, model, Schema } from "mongoose";

export interface IPost {
    title: string;
    description: string;
    price?: number;
    isSelled: boolean;
    isActive: boolean;
    createdUserId: string;
    createdDate: Date;
}

const PostSchema =  new Schema<IPost>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: false, default: 0 },
    isSelled: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: true },
    createdUserId: { type: String, required: true },
    createdDate: { type: Date, required: false, default: new Date(Date.now()) }
});

const Post: Model<IPost> = model("Post", PostSchema);
export default Post;
