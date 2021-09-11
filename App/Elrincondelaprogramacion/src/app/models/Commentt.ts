export class Commentt {
    private id:any;
    private content:string;
    private userId:number;
    private postId:number;
    private inadequate:boolean;
    private createdAt:any;
    private updatedAt:any;
     
    constructor(id:any, content:string, userId:number, postId:number, inadequate:boolean) {
        this.id=id;
        this.content=content;
        this.userId=userId;
        this.postId=postId;
        this.inadequate=inadequate;
        this.createdAt = Date.now();
    }

    setContent(content:string){
        this.content=content;
    }

    setUserId(userId:number){
        this.userId=userId;
    }

    setPostId(postId:number){
        this.postId=postId;
    }

    setInadequate(inadequate:boolean){
        this.inadequate=inadequate;
    }

    setUpdatedAt(updatedAt:any){
        this.updatedAt=updatedAt;
    }

    getId(){
        return this.id;
    }

    getContent(){
        return this.content;
    }

    getUserId(){
        return this.userId;
    }

    getPostId(){
        return this.postId;
    }

    getInadequate(){
        return this.inadequate;
    }

    getCreatedAt(){
        return this.createdAt;
    }

    getUpdatedAt(){
        return this.updatedAt;
    }
}