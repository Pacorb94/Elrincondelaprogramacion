export class Post {
    private id: any;
    private categoryId: number;
    private title: string;
    private content: string;
    private userId: number;
    private image: string;
    private inadequate: boolean;
    private comments: any[];
    private createdAt: any;
    private updatedAt: any;

    constructor(id:any, categoryId:number, title:string, content: string, userId: number, 
    image:string, inadequate: boolean, comments:any) {
        this.id = id;
        this.categoryId=categoryId;
        this.title=title;
        this.content = content;
        this.userId = userId;
        this.image=image;
        this.comments=comments;
        this.inadequate = inadequate;
        this.createdAt = Date.now();
    }

    setCategoryId(categoryId: number) {
        this.categoryId = categoryId;
    }

    setTitle(title: string) {
        this.title = title;
    }

    setContent(content: string) {
        this.content = content;
    }

    setUserId(userId: number) {
        this.userId = userId;
    }

    setImage(image: string) {
        this.image = image;
    }

    setInadequate(inadequate: boolean) {
        this.inadequate = inadequate;
    }

    setComments(comments:any[]){
        this.comments=comments;
    }

    setUpdatedAt(updatedAt: any) {
        this.updatedAt = updatedAt;
    }

    getId() {
        return this.id;
    }

    getCategoryId() {
        return this.categoryId;
    }

    getTitle() {
        return this.title;
    }

    getContent() {
        return this.content;
    }

    getUserId() {
        return this.userId;
    }

    getImage() {
        return this.image;
    }

    getInadequate() {
        return this.inadequate;
    }

    getComments(){
        return this.comments;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }
}