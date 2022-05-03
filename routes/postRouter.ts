import { Request, Response, Router } from "express";
import PostService from "../services/postService";
const postService = new PostService();
const router = Router();

import {
    IAddPost
} from '../models/ApiModel'

router.get("/", (req: Request, res: Response) => {
    res.render("index", {
        title: "Ana Sayfa"
    });
});

router.get("/posts", async (req: Request, res: Response) => {
    const posts = await postService.Get();
    res.render("posts", {
        posts
    });
});

router.get('/addPost', async (req: Request, res: Response) => {
    res.render('addPost', {})
})

router.post("/addPost", async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            price,
            createdUserId
        } = req.body;
        const model: IAddPost = {
            title, description, price, createdUserId: 1
        }
        await postService.Add(model);
        res
        .json({
            isSuccess: true,
            message: "İlanınız eklendi."
        });
    } catch (error) {
        // console.log(error)
        res
        .status(444)
        .json({
            isSuccess: false,
            message: "İlanınız eklenirken bir sorun oluştu"
        });
    }
});

router.get('/postDetail/:postId', async (req: Request, res: Response) => {
    const detailResult = await postService.Detail(req.params.postId)
    res.render('postDetail', {
        postId: req.params.postId,
        post: detailResult
    })
})

export default router;
