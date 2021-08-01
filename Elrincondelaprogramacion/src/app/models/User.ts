class User {
    private id: number;
    private nick: string;
    private email: string;
    private password: string;
    private profileImage: string;
    private rol:string;
    private ban: boolean;
    private createdAt: any;
    private updatedAt: any;

    constructor(id: number, nick:string, email:string, password: string, profileImage:string, 
    rol:string, ban: boolean, createdAt: any, updatedAt: any) {
        this.id = id;
        this.nick=nick;
        this.email=email;
        this.password=password;
        this.profileImage=profileImage;
        this.rol=rol;
        this.ban=ban;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    setValues(id: number, nick:string, email:string, password: string, profileImage:string, 
    rol:string, ban: boolean, createdAt: any, updatedAt: any) {
        this.setId(id);
        this.setNick(nick);
        this.setEmail(email);
        this.setPassword(password);
        this.setProfileImage(profileImage);
        this.setRol(rol);
        this.setBan(ban);
        this.setCreatedAt(createdAt);
        this.setUpdatedAt(updatedAt);
    }

    setId(id: number) {
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

    setProfileImage(profileImage: string) {
        this.profileImage = profileImage;
    }

    setRol(rol:string) {
        this.rol = rol;
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

    getRol() {
        return this.rol;
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