import { Request, Response, Router } from "express";
import PostService from "../services/postService";
const postService = new PostService();
const router = Router();

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
            ownerUserId
        } = req.body;
        await postService.Add(
            title, description, price, ownerUserId
        );
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

export default router;
