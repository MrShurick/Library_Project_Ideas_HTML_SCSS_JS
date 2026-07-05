export class ModelRegistrLog {
    constructor() {
        const localAdmins = localStorage.getItem('admin');
        this.admins = localAdmins ? JSON.parse(localAdmins) : [];

        const localUsers = localStorage.getItem('user');
        this.users = localUsers ? JSON.parse(localUsers) : [];

        const sessionData = localStorage.getItem('currentUser');
        this.session = sessionData ? JSON.parse(sessionData) : null;
    }

    addBaseUserAdmin(type, data) {
        let id;
        switch(type) {
            case 'user':
                id = Date.now();
                data.id = id;
                data.role = 'user';
                this.users.push(data);
                localStorage.setItem('user', JSON.stringify(this.users));
                break;

            case 'admin':
                id = Date.now();
                data.id = id;
                this.admins.push(data);
                localStorage.setItem('admin', JSON.stringify(this.admins));
                break;
        }
    }

    checkNewSession(dataSession) {
        localStorage.setItem('currentUser', JSON.stringify(dataSession));
        this.session = dataSession;
    }

    checkAuth() {
        if (!this.session) return;

        const isUser = this.session.role === 'user';

        return {
            data: this.session,
            isSimpleUser: isUser,
            isStaff: !isUser,
        };
    }

    updateUserData(dataUpdate, id) {
        if (!this.session) return;

        this.session = { 
            ...this.session, 
            ...dataUpdate,
            photo: dataUpdate.userPhoto || this.session.photo || '',
        };
        localStorage.setItem('currentUser', JSON.stringify(this.session));

        this.users = this.users.map(user => {
            if (+user.id === +id) {
                return {
                    ...user,
                    photo: dataUpdate.userPhoto,
                    name: dataUpdate.name,
                    surname: dataUpdate.surname,
                    year: dataUpdate.year,
                    phone: dataUpdate.tel || user.phone,
                    email: dataUpdate.email,
                }
            }
            return user;
        });
        localStorage.setItem('user', JSON.stringify(this.users));
    }

    exitSession() {
        localStorage.removeItem('currentUser');
    }

    validatePassword(password) {
        const passwordChard = password.split('');

        const specialCharacters = [
            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 
            '_', '+', '-', '=', '[', ']', '{', '}', ';', ':', 
            '"', "'", ',', '.', '<', '>', '/', '?', '\\', '|', '`', '~'
        ];
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        const hasLength = passwordChard.length >= 8;
        const hasDigit = passwordChard.some(char => digits.includes(char));
        const hasSpecial = passwordChard.some(char => specialCharacters.includes(char));
        const hasLowercase = passwordChard.some(char => lowercaseLetters.includes(char));
        const hasUppercase = passwordChard.some(char => uppercaseLetters.includes(char));

        return {
            isValid: hasLength && hasDigit && hasSpecial && hasLowercase && hasUppercase,
            errors: {
                length: !hasLength ? 'Мінімум 8 символів': null,
                digits: !hasDigit ? 'Потрібна мінімум одна цифра': null,
                special: !hasSpecial ? 'Потрібно мінімум один спецсимвол': null,
                lowercase: !hasLowercase ? 'Потрібна маленька літера': null,
                uppercase: !hasUppercase ? 'Потрібна велика літера': null,
            },
        };
    }

    getBaseUserAdmin() {
        return [this.admins, this.users, this.session];
    }
};