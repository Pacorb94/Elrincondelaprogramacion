export class Post {
    private id: any;
    private categoryId: number;
    private title: string;
    private content: string;
    private user: any;
    private image: string;
    private inadequate: boolean;
    private comments: any[];
    private createdAt: any;
    private updatedAt: any;


    constructor(id:any, categoryId:number, title:string, content: string, user: any, 
    image:string, inadequate: boolean, comments:any, createdAt: any) {
        this.id = id;
        this.categoryId=categoryId;
        this.title=title;
        this.content = content;
        this.user = user;
        this.image=image;
        this.comments=comments;
        this.inadequate = inadequate;
        this.createdAt = createdAt;
    }

    setValues(category:number, title:string, content: string, user: any, 
    image:string, inadequate: boolean, comments:any[], createdAt: any, updatedAt: any) {
        this.setCategoryId(category);
        this.setTitle(title);
        this.setContent(content);
        this.setUser(user);
        this.setImage(image);
        this.setInadequate(inadequate);
        this.setComments(comments);
        this.setCreatedAt(createdAt);
        this.setUpdatedAt(updatedAt);
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

    setUser(user: any) {
        this.user = user;
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

    setCreatedAt(createdAt: any) {
        this.createdAt = createdAt;
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

    getUser() {
        return this.user;
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