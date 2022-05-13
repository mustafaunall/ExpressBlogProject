import md5 from "md5";

export default abstract class HashHelper {
    public static HashPassword(password: string) {
        return md5(password);
    }
}
