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

    constructor(id: any, nick:string, email:string, password: string, profileImage:any, ban: boolean) {
        this.id = id;
        this.nick=nick;
        this.email=email;
        this.password=password;
        this.profileImage=profileImage;
        this.role='ROLE_READER';
        this.ban=ban;
        this.createdAt = Date.now();
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