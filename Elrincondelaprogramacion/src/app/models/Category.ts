export class Category {
    private id:any;
    private name:string;
    private createdAt:any;
    private updatedAt:any;
     
    constructor(id:any, name:string) {
        this.id=id;
        this.name=name;
        this.createdAt=Date.now();
    }

    setValues(name:string, createdAt:any, updatedAt:any){
        this.setName(name);
        this.setCreatedAt(createdAt);
        this.setUpdatedAt(updatedAt);
    }

    setName(name:string){
        this.name=name;
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

    getName(){
        return this.name;
    }

    getCreatedAt(){
        return this.createdAt;
    }

    getUpdatedAt(){
        return this.updatedAt;
    }
}