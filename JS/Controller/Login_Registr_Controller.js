import { ModelRegistrLog } from '../Model/Model.js';
import { ViewForm } from '../View/Log_Registr_View.js';


class ControllerForm {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.addUser(this.handlerAddUser);
        this.view.login(this.handlerLogin);
    }

    handlerAddUser = (dataUser, type) => {
        if (!dataUser) return;
        const checkLenPhone = dataUser.phone.split('');
        const checkPassword = dataUser.password;
        const valid = this.model.validatePassword(checkPassword);

        if (!valid.isValid) {
            const error = Object.values(valid.errors)
                .filter(err => err !== null)
                .join('\n');

            alert(`Слабкий пароль! \n\n ${error}`);
            return;
        } 

        if (checkLenPhone.length < 10) {
            alert(`Для номеру телефона потрібно ще: ${10 - checkLenPhone.length}`);
            return;
        }

        const [, users] = this.model.getBaseUserAdmin();
        const checkTel = users.some(us => us.phone === dataUser.phone);

        if (checkTel) return alert('Користувач за цим номером телефону вже існує');
        console.log(dataUser);
        this.model.addBaseUserAdmin(type, dataUser);

        this.view.navToLog();
    }

    handlerLogin = (loginData) => {
        if (!loginData) return;
        const [admins, users] = this.model.getBaseUserAdmin();

        const adminLog = admins.find(admin =>  
                admin.login === loginData.login && 
                admin.password === loginData.password
            );

        const userLog = users.find(user =>  
                user.email === loginData.login && 
                user.password === loginData.password
            );

        if (adminLog){ 
            this.model.checkNewSession(adminLog);
            this.view.renderAdminSide(true);
            this.view.renderUserSide(false);
            return;
        }

        if (userLog) {
            this.model.checkNewSession(userLog);
            this.view.renderAdminSide(false);
            this.view.renderUserSide(true);
            return;
        }
    }
};
const model = new ModelRegistrLog();
const view = new ViewForm()
new ControllerForm(model, view);