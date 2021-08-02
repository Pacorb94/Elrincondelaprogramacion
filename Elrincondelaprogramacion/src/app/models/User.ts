export class User {
    private id: any;
    private nick: string;
    private email: string;
    private password: string;
    private profileImage: any;
    private role:string;
    private ban: boolean;
    private createdAt: any;
    private updatedAt: any;

    constructor(id: any, nick:string, email:string, password: string, profileImage:any, 
    role:string, ban: boolean, createdAt: any) {
        this.id = id;
        this.nick=nick;
        this.email=email;
        this.password=password;
        this.profileImage=profileImage;
        this.role=role;
        this.ban=ban;
        this.createdAt = createdAt;
    }

    setValues(id: any, nick:string, email:string, password: string, profileImage:any, 
    role:string, ban: boolean, createdAt: any, updatedAt: any) {
        this.setId(id);
        this.setNick(nick);
        this.setEmail(email);
        this.setPassword(password);
        this.setProfileImage(profileImage);
        this.setRole(role);
        this.setBan(ban);
        this.setCreatedAt(createdAt);
        this.setUpdatedAt(updatedAt);
    }

    setId(id: any) {
        this.id = id;
    }

    setNick(nick:string) {
        this.nick = nick;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password:string) {
        this.password = password;
    }

    setProfileImage(profileImage: any) {
        this.profileImage = profileImage;
    }

    setRole(role:string) {
        this.role = role;
    }

    setBan(ban:boolean) {
        this.ban = ban;
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

    getNick() {
        return this.nick;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getProfileImage() {
        return this.profileImage;
    }

    getRole() {
        return this.role;
    }

    getBan() {
        return this.ban;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }
}