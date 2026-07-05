import { ModelAdmin } from '../Model/Model_Admin.js';
import { ModelRegistrLog } from '../Model/Model.js'; 
import { UserSiedView } from '../View/User_Side_View.js';

class UserSideController {
    constructor(modelRegistrLog ,modelAdmin, view) {

        this.modelAdmin = modelAdmin;
        this.modelRegistrLog = modelRegistrLog;
        this.view = view;

        const [books,,, favorite] = this.modelAdmin.getInfo();
        const [, users, session] = this.modelRegistrLog.getBaseUserAdmin();
        const auth = modelRegistrLog.checkAuth();

        if (auth && auth.isSimpleUser) {
            this.view.renderPersonalAcc(auth.data);
            this.view.displayBooks(books);
            this.view.renderfilterBookYear(books);
            this.view.renderFilterBookAuthor(books);
            this.view.renderFavorite(favorite);
        } else if (auth && auth.isStaff) {
            window.location.href = '/HTML/Admin.html';
            return;
        } else {
            alert('Вхід не зареєстрованим заборонено!');
            window.location.href = '/HTML/Login_Registr_Form.html';
            return;
        }

        this.view.bindSearch(this.handlerSearch);
        this.view.bindfilterYear(this.handlerFilter);
        this.view.bindFilterAuthor(this.handlerFilter);
        this.view.bindInfoBook(this.handlerInfoBook);
        this.view.bindShowBack(this.handlerShowBack);
        this.view.bindshowAccFavorite(this.handlershowAccFavorite);
        this.view.bindFavorite(this.handlerFavorite);
        this.view.bindRenderAcc(this.handlerRenderAcc);
        this.view.bindEditeProfile(this.handlerEditeProfile);
        this.view.bindExit(this.handlerExit);
        this.view.bindDelet(this.handlerDelet);
    }

    handlerSearch = (value) => {
        const [books] = this.modelAdmin.getInfo();

        if (!value) {
            this.view.displayBooks(books);
            return;
        }

        const search = books.filter(book => {
            const bookName = book.name.toLowerCase();
            const bookAuthor = book.author.toLowerCase();
            const lowerValue = value.toLowerCase();

            return (
                bookName.includes(lowerValue) ||
                bookAuthor.includes(lowerValue)
            );
        });

        this.view.displayBooks(search);
    }

    handlerFilter = (value, type) => {
        const [books] = this.modelAdmin.getInfo();

        if (!value) {
            this.view.displayBooks(books);
            return;
        }

        let search = null;

        switch(type) {
            case 'year':
                search = books.filter(book => {
                    const localvalue = String(book.year);
                    const valueUser = String(value);
                    return localvalue.includes(valueUser);
                });
                break;
            case 'author':
                search = books.filter(book => {
                    const localvalue = book.author;
                    const valueUser = value;
                    return localvalue.includes(valueUser);
                });
                break;
        }
        this.view.displayBooks(search);
    }

    handlerInfoBook = (bool, id) => {
        if (bool === false) return;

        const [books] = this.modelAdmin.getInfo();

        const book = books.filter(b => b.id === id);

        this.view.renderInfoBook(book);
    }

    handlerShowBack = () => {
        this.view.showBack();
    }

    handlershowAccFavorite = (tabName) => {
        if (!tabName) return;

        const lowerTabName = tabName.toLowerCase().split(' ').join('');
        this.view.showAccFavorite(lowerTabName);
    }

    handlerFavorite = (id) => {
        if (!id) return;
        const [books,,, favorite] = this.modelAdmin.getInfo();

        const book = books.find(b => b.id === id);
        const dubl = favorite.some(fav => fav.id === book.id);

        if (!dubl) {
            this.modelAdmin.addBasesData(book, 'favorites');
            const [,,, favorite] = this.modelAdmin.getInfo();
            this.view.renderFavorite(favorite);
        }
    }

    handlerRenderAcc = () => {
        const session = this.modelRegistrLog.checkAuth();
        if (!session && session.isStaff) return;

        const dataAuth = session.data;
        this.view.renderPersonalAcc(dataAuth);
        this.view.bindEditeProfile(this.handlerEditeProfile);

        if (dataAuth.surname || dataAuth.year || dataAuth.phone || dataAuth.photo) {
            this.view.renderNewinFo(dataAuth, true);
        }
    }

    handlerEditeProfile = (editeData, id) => {
        if (!editeData) return;

        this.view.renderNewinFo(editeData, null);
        this.modelRegistrLog.updateUserData(editeData, id);

    }

    handlerExit = () => {
        this.modelRegistrLog.exitSession();
        this.view.exitProfil();
    }

    handlerDelet = (id, type) => {
        this.modelAdmin.delete(id, type);
        const [,,, favorites] = this.modelAdmin.getInfo();

        switch(type) {
            case 'favorites': 
            this.view.renderFavorite(favorites);
            break;
        }
    }
};

const modelAdmin = new ModelAdmin();
const modelRegistrLog = new ModelRegistrLog();
const view = new UserSiedView();
new UserSideController(modelRegistrLog ,modelAdmin, view);