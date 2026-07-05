import { ModelAdmin } from "../Model/Model_Admin.js";
import { ModelRegistrLog } from "../Model/Model.js";
import { View } from "../View/View_Admin.js";

class Controller {
    constructor(modelRegistrLog, modelAdmin, view) {

        this.modelRegistrLog = modelRegistrLog
        this.modelAdmin = modelAdmin;
        this.view = view;

        const activeAdmin = this.modelRegistrLog.checkAuth();

        if (!activeAdmin || !activeAdmin.isStaff) {
            alert('Доступ заборонено! Спочатку увійдіть в систему.');
            window.location.href = '/HTML/Login_Registr_Form.html';
            return;
        }

        const [books, visitors, cards] = this.modelAdmin.getInfo();
        const allPeople = this.modelAdmin.getAllPeopleForAdmin();
        const cardForRender = this.overData(books, allPeople, cards);

        this.view.renderInfo(books, "createBook");
        this.view.renderInfo(allPeople, "createVisitor");
        this.view.renderInfo(cardForRender, "createCard");

        this.view.bindJumpChapter(this.handlerJump);
        this.view.addBind(this.handlerAdd);
        this.view.bindSort(this.handlerSort);
        this.view.bindSearch(this.handlerSearch);
        this.view.bindEdit(this.handlerEdit);
        this.view.bindReturn(this.handlerReturn);
        this.view.bindDeleteBook(this.handlerDeleteBook);
        this.view.bindClearLocal(this.handlerClear);
    }

    handlerJump = (dataset) => {
        this.view.jumpChapter(dataset);

        if (dataset === "statistics") {
            const [books, visitors, cards] = this.modelAdmin.getInfo();
            this.view.renderChartData(books, visitors, cards);
        }
    };

    handlerAdd = (data, type, isModalOp = false) => {
        let [books, visitors, cards] = this.modelAdmin.getInfo();

        if (isModalOp) {
            const allPeopleForModal = this.modelAdmin.getAllPeopleForAdmin();
            return this.view.modals(type, allPeopleForModal, books);
        }

        switch(type) {
            case "createBook":
                this.modelAdmin.addBasesData(data, type);
                this.view.renderInfo(books, type);
                break;
            case "createVisitor":
                this.modelAdmin.addBasesData(data, type);
                const updateUsersandVisitors = this.modelAdmin.getAllPeopleForAdmin();
                this.view.renderInfo(updateUsersandVisitors, type);
                break;
            case "createCard": 
                this.modelAdmin.addBasesData(data, type);
                [books, visitors, cards] = this.modelAdmin.getInfo();
                const users = this.modelAdmin.getAllPeopleForAdmin();
                console.log(users)
                const cardForRender = this.overData(books, users, cards);
                this.view.renderInfo(cardForRender, type);
                this.modelAdmin.addDataReturn(null, null, cards);
                break;
        }
    };

    overData = (books, visitors, cards) => {
        console.log(visitors);
        return cards.map((card) => {
            const visitor = visitors.find((v) => +v.id === +card.visitorId);
            const book = books.find((b) => +b.id === +card.bookId);

            return {
                ...card,
                visitorName: visitor ? visitor.name : "underfunded",
                bookName: book ? book.name : "underfunded",
            };
        });
    };

    handlerSort = (value, type) => {
        const [books, visitors, cards] = this.modelAdmin.getInfo();
        const over = this.overData(books, visitors, cards);
        this.modelAdmin.sortData(value, type, over);

        switch (type) {
            case "createBook":
                this.view.renderInfo(books, type);
                break;
            case "createVisitor":
                this.view.renderInfo(visitors, type);
                break;
            case "createCard":
                this.view.renderInfo(over, type);
                break;
        }
    };

    handlerSearch = (value, type) => {
        if (type === "createBook") {
            const [books] = this.modelAdmin.getInfo();

            if (!value) {
                this.view.renderInfo(books, type);
                return;
            }

            const filterBooks = books.filter((book) => {
                const bookName = book.name.toLowerCase();
                const bookAuthor = book.author.toLowerCase();
                const searchValue = value.toLowerCase();

                return (
                    bookName.includes(searchValue) ||
                    bookAuthor.includes(searchValue)
                );
            });

            this.view.renderInfo(filterBooks, type);
        }

        if (type === "createVisitor") {
            const [, visitors] = this.modelAdmin.getInfo();
            const [, users] = this.modelRegistrLog.getBaseUserAdmin();

            if (!value) {
                this.view.renderInfo(visitors, type);
                return;
            }

            const filterVisitor = visitors.filter((visitor) => {
                const visitorName = visitor.name.toLowerCase();
                const visitorId = visitor.id;
                const searchValue = value.toLowerCase();

                return (
                    visitorName.includes(searchValue) ||
                    visitorId.includes(searchValue)
                );
            });

            this.view.renderInfo(filterVisitor, type);
        }

        if (type === "createCard") {
            const [books, visitors, cards] = this.modelAdmin.getInfo();

            if (!value) {
                this.view.renderInfo(cards, type);
                return;
            }

            const cardNames = this.overData(books, visitors, cards);

            const filterCards = cardNames.filter((card) => {
                const visitor = card.visitorName?.toLowerCase() || "";
                const book = card.bookName?.toLowerCase() || "";
                const cardId = card.cardId;
                const searchValue = value.toLowerCase();

                return (
                    visitor.includes(searchValue) ||
                    book.includes(searchValue) ||
                    cardId.includes(searchValue)
                );
            });

            this.view.renderInfo(filterCards, type);
        }
    };

    handlerEdit = (type, id) => {
        if (document.querySelector(".modalAdd")) return;

        const data = this.modelAdmin.getVisitorId(id);
        const modal = this.view.modals(type, data);

        modal.querySelector(".close").addEventListener("click", () => {
            modal.remove();
        });

        const form = modal.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const data = new FormData(form);
            const dataObj = Object.fromEntries(data.entries());

            this.modelAdmin.editVisitor(dataObj);

            const [, visitors] = this.modelAdmin.getInfo();

            this.view.renderInfo(visitors, "createVisitor");

            modal.remove();
        });
    };

    handlerReturn = (id, dates, btn) => {
        this.modelAdmin.addDataReturn(id, dates);

        const parentTd = btn.parentElement;

        if (parentTd) parentTd.textContent = dates;

        const [, visitors, cards] = this.modelAdmin.getInfo();
        this.view.renderInfo(visitors, "createVisitor");
    };

    handlerLogOut = () => {
        localStorage.removeItem('currentUser');
        window.location.href = '/HTML/Login_Registr_Form.html';
    }

    handlerDeleteBook = (id, type) => {
        this.modelAdmin.delete(id, type);
        const [books, visitors, cards] = this.modelAdmin.getInfo();

        switch (type) {
            case "createBook": {
                this.view.renderInfo(books, type);
                break;
            }
            case "createVisitor": {
                this.view.renderInfo(visitors, type);
                break;
            }
            case "createCard": {
                this.view.renderInfo(cards, type);
                break;
            }
        }
    };

    handlerClear = () => {
        this.modelAdmin.clearAllData();

        const [books, visitors, cards] = this.modelAdmin.getInfo();

        this.view.renderInfo(books, "createBook");
        this.view.renderInfo(visitors, "createVisitor");
        this.view.renderInfo(cards, "createCard");
    };
}

new Controller(new ModelRegistrLog(), new ModelAdmin(), new View());