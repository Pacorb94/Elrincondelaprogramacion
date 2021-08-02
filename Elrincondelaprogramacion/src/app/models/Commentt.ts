export class Commentt {
    private id:number;
    private content:string;
    private user:any;
    private post:any;
    private inadequate:boolean;
    private createdAt:any;
    private updatedAt:any;
     
    constructor(id:number, content:string, user:any, post:any, inadequate:boolean, 
    createdAt:any, updatedAt:any) {
        this.id=id;
        this.content=content;
        this.user=user;
        this.post=post;
        this.inadequate=inadequate;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }

    setValues(id:number, content:string, user:any, post:any, inadequate:boolean, 
    createdAt:any, updatedAt:any){
        this.setId(id);
        this.setContent(content);
        this.setUser(user);
        this.setPost(post);
        this.setInadequate(inadequate);
        this.setCreatedAt(createdAt);
        this.setUpdatedAt(updatedAt);
    }

    setId(id:number){
        this.id=id;
    }

    setContent(content:string){
        this.content=content;
    }

    setUser(user:any){
        this.user=user;
    }

    setPost(post:any){
        this.post=post;
    }

    setInadequate(inadequate:boolean){
        this.inadequate=inadequate;
    }

    setCreatedAt(createdAt:any){
        this.createdAt=createdAt;
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

    getUser(){
        return this.user;
    }

    getPost(){
        return this.post;
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