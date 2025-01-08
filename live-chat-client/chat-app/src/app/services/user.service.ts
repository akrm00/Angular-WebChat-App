export class UserService {
    private username: string = '';

    setUsername(name: string) {
        this.username = name;
    }

    getUsername(): string {
        return this.username;
    }
}