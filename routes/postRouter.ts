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

router.post('/postDetailUpdate', async (req: Request, res: Response) => {
    const detail = await postService.Detail(req.body.id)
    if (detail == null) {
        return res
            .status(444)
            .json({
                isSuccess: false,
                message: "Veri yok"
            })
    }
    return res
        .status(200)
        .json({
            isSuccess: true,
            message: "Veriler",
            detail
        })
})

router.put('/updatePost', async (req: Request, res: Response) => {
    try {
        const { id, title, description, price } = req.body
        const result = await postService.Update(id, title, description, Number(price))
        if (!result) {
            return res
            .status(444)
            .json({
                isSuccess: false,
                message: "İlanınız güncenirken bir sorun oluştu"
            })
        }
        return res
            .status(200)
            .json({
                isSuccess: true,
                message: 'İlanınız güncellendi'
            })
    } catch (error) {
        return res
        .status(444)
        .json({
            isSuccess: false,
            message: "İlanınız güncenirken bir sorun oluştu"
        })
    }
})

router.delete('/deletePost', async (req: Request, res: Response) => {
    try {
        const { id } = req.body
        const result = await postService.Delete(id)
        if (!result) {
            return res
            .status(444)
            .json({
                isSuccess: false,
                message: "İlanınız silinirken bir sorun oluştu"
            })
        }
        return res
            .status(200)
            .json({
                isSuccess: true,
                message: 'İlanınız silindi'
            })
    } catch (error) {
        return res
        .status(444)
        .json({
            isSuccess: false,
            message: "İlanınız silinirken bir sorun oluştu"
        })
    }
})

export default router;
