export class ViewForm {
    constructor() {
        this.loginForm = document.forms.loginForm;
        this.registrForm = document.forms.registrForm;
        this.eyeBtn = document.getElementById('eye');
        this.registr = document.querySelector('.registr');
        this.log = document.querySelector('.login');

        this.openEyes();
        this.linkAddAcc();
    }

    renderAdminSide(login) {
        if (login === false) return;
        return  window.location.href = '/HTML/Admin.html';
    }

    renderUserSide(login) {
        if (login === false) return;
        return  window.location.href = '/HTML/User_Side.html';
    }

    openEyes () {
        const input = document.getElementById('logPass');

        if (!input || !this.eyeBtn) return;

        const setEyeState = (type, iconSrc) => {
            input.type = type;
            this.eyeBtn.innerHTML = `<img src="${iconSrc}" alt="eye" width="20px">`;
        }

        this.eyeBtn.addEventListener('mousedown', () => {
            setEyeState('text', '/IMG/free-icon-eye-367070.png');
        });

        this.eyeBtn.addEventListener('mouseup', () => {
            setEyeState('password', '/IMG/free-icon-hide-11238328.png');
        });

        this.eyeBtn.addEventListener('mouseleave', () => {
            setEyeState('password', '/IMG/free-icon-hide-11238328.png');
        });
    }

    linkAddAcc() {
        const linkRegistr = document.getElementById('linkRegistr');
        const linkLogin = document.getElementById('linkLogin');

        if (!linkRegistr || !linkLogin || !this.registr || !this.log) return;

        linkRegistr.addEventListener('click', (e) => {
            e.preventDefault();
            this.registr.style.display = 'flex';
            this.log.style.display = 'none';
        });

        linkLogin.addEventListener('click', (e) => {
            e.preventDefault();
            this.registr.style.display = 'none';
            this.log.style.display = 'flex';
        });
    }

    navToLog () {
        this.registrForm.reset();
        this.registr.style.display = 'none';
        this.log.style.display = 'flex';
    }

    clearForm() {
        if (this.registrForm) this.registrForm.reset();
    }

    addUser(handler) {
        this.registrForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(this.registrForm);
            const dataObj = Object.fromEntries(formData.entries());

            handler(dataObj, 'user');
        });
    }

    login(handler) {
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(this.loginForm);
            const dataObj = Object.fromEntries(formData.entries());

            handler(dataObj);
        });
    }
};