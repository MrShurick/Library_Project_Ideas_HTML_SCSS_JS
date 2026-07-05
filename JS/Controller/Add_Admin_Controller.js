import { ModelRegistrLog } from '../Model/Model.js';
import { AddAdminView } from '../View/Add_Admin_View.js';

class AddAdminController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.registrAdmin(this.handlerRegistrAdmin);
    }

    handlerRegistrAdmin = (dataAdmin, type) => {
        if (!dataAdmin) return;

        const checkPassword = dataAdmin.password;
        const valid = this.model.validatePassword(checkPassword);

        if (!valid.isValid) {
            const error = Object.values(valid.errors)
                .filter(err => err !== null)
                .join('\n');

            alert(`Слабкий пароль! \n\n ${error}`);
            return;
        }

        const [admin] = this.model.getBaseUserAdmin();
        const checLogin = admin.some(ad => ad.login === dataAdmin.login);

        if (checLogin) return alert('Цей LOGIN вже зайнятий');

        this.model.addBaseUserAdmin(type, dataAdmin);

        this.view.clearForm();
    }
};

const model = new ModelRegistrLog();
const view = new AddAdminView();
new AddAdminController(model, view);