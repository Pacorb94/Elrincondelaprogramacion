class Category {
    private id:number;
    private name:string;
    private createdAt:any;
    private updatedAt:any;
     
    constructor(id:number, name:string, createdAt:any, updatedAt:any) {
        this.id=id;
        this.name=name;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }

    setValues(id:number, name:string, createdAt:any, updatedAt:any){
        this.setId(id);
        this.setName(name);
        this.setCreatedAt(createdAt);
        this.setUpdatedAt(updatedAt);
    }

    setId(id:number){
        this.id=id;
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