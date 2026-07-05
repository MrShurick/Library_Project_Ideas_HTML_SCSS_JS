export class AddAdminView {
    constructor() {
        this.formRegistrAdmin = document.forms.registrAdmin;
    }

    clearForm() {
        if (this.formRegistrAdmin) this.formRegistrAdmin.reset();
    }

    registrAdmin(handler) {
        this.formRegistrAdmin.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = this.formRegistrAdmin.addAdmin;

            if(btn) {
                const dataForm = new FormData(this.formRegistrAdmin);
                const dataObj = Object.fromEntries(dataForm.entries());

                handler(dataObj, 'admin');
            }
        });
    }
};