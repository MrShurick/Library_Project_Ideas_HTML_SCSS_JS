export class ModelAdmin {
    constructor() {
        const localBooks = localStorage.getItem("library_books");
        this.books = localBooks ? JSON.parse(localBooks) : [];

        const localVisitors = localStorage.getItem("library_visitors");
        this.visitors = localVisitors ? JSON.parse(localVisitors) : [];

        const localCards = localStorage.getItem("local_cards");
        this.cards = localCards ? JSON.parse(localCards) : [];

        const localFavorites = localStorage.getItem("local_favorites");
        this.favorites = localFavorites ? JSON.parse(localFavorites) : [];

        this.currentAdmin = null;
    }

    addBasesData(data, type) {
        switch (type) {
            case "createBook":
                this.books.push(data);
                localStorage.setItem("library_books", JSON.stringify(this.books));
                break;

            case "createVisitor":
                this.visitors.push(data);
                localStorage.setItem("library_visitors", JSON.stringify(this.visitors));
                break;

            case "createCard":
                this.cards.push(data);
                localStorage.setItem("local_cards", JSON.stringify(this.cards));
                break;

            case "favorites":
                this.favorites.push(data);
                localStorage.setItem("local_favorites", JSON.stringify(this.favorites));
                break;
        }
    }

    sortData(valueSort, type, nameCard) {
        const dataMap = {
            createBook: this.books,
            createVisitor: this.visitors,
            createCard: nameCard,
        };

        const data = dataMap[type];

        if (valueSort === "id" || valueSort === "return") {
            return data.sort((a, b) => {
                if (type === "createBook" || type === "createVisitor") {
                    return a.id - b.id;
                } else {
                    return a.cardId - b.cardId;
                }
            });
        } else {
            return data.sort((a, b) => {
                if (type === "createBook" || type === "createVisitor") {
                    return a.name.localeCompare(b.name);
                } else {
                    if (valueSort === "visitor") {
                        return a.visitorName.localeCompare(b.visitorName);
                    } else {
                        return a.bookName.localeCompare(b.bookName);
                    }
                }
            });
        }
    }

    editVisitor(updateData) {
        this.visitors = this.visitors.map((visitor) => {
            if (visitor.id === updateData.id) {
                return {
                    ...visitor,
                    name: updateData.name,
                    phone: updateData.phone,
                };
            }
            return visitor;
        });

        localStorage.setItem("library_visitors", JSON.stringify(this.visitors));
    }

    addDataReturn(id, dates, datas) {
        this.cards = this.cards.map((card) => {
            if (+card.cardId === +id) {
                return {
                    ...card,
                    return: dates,
                };
            }
            return card;
        });

        const cardId = this.cards.find((card) => card.cardId === id);

        this.visitors = this.visitors.map((visitor) => {
            if (+visitor.id === +cardId?.visitorId) {
                return {
                    ...visitor,
                    status: "active",
                };
            }
            return visitor;
        });

        if (id === null) {
            const newCard = datas[datas.length - 1].visitorId;

            this.visitors = this.visitors.map((visitor) => {
                if (+visitor.id === +newCard) {
                    return {
                        ...visitor,
                        status: "promiser",
                    };
                }
                return visitor;
            });
            localStorage.setItem("library_visitors", JSON.stringify(this.visitors));
        }
        localStorage.setItem("local_cards", JSON.stringify(this.cards));
        localStorage.setItem("library_visitors", JSON.stringify(this.visitors));
    }

    getVisitorId(id) {
        return this.visitors.find((visitor) => visitor.id === id);
    }

    getAllPeopleForAdmin() {
        const visitors = this.visitors || [];
        const users = JSON.parse(localStorage.getItem('user')) || [];

        const normKeyVisitor = visitors.map(v => ({
            id: v.id,
            name: v.name || 'Гість',
            surname: v.surname || 'Відвідувач',
            phone: v.phone || v.tel || 'Не вказано',
            email: v.email || '-'
        }));

        const normKeyUser = users.map(u => ({
            id: u.id,
            name: u.name || 'Не вказано',
            surname: u.surname || '-',
            phone: u.phone || 'Не вказано',
            email: u.email || '-'
        }));

        return [
            ...normKeyUser, 
            ...normKeyVisitor
        ];
    }

    getInfo() {
        return [
            this.books, 
            this.visitors, 
            this.cards, 
            this.favorites
        ];
    }

    delete(id, type) {
        if (type === "createBook") {
            this.books = this.books.filter(
                (book) => String(book.id).trim() !== String(id).trim(),
            );
            localStorage.setItem("library_books", JSON.stringify(this.books));
        }

        if (type === "createVisitor") {
            this.visitors = this.visitors.filter(
                (visitor) => String(visitor.id).trim() !== String(id).trim(),
            );
            localStorage.setItem("library_visitors", JSON.stringify(this.visitors),);
        }

        if (type === "createCard") {
            this.cards = this.cards.filter(
                (card) => String(card.cardId).trim() !== String(id).trim(),
            );
            localStorage.setItem("local_cards", JSON.stringify(this.cards));
        }

        if (type === "favorites") {
            this.favorites = this.favorites.filter(
                fav => String(fav.id).trim() !== String(id).trim(),
            );
            localStorage.setItem("local_favorites", JSON.stringify(this.favorites));
        }
    }

    clearAllData() {
        localStorage.clear();

        this.books = [];
        this.visitors = [];
        this.cards = [];
        this.favorites = [];
    }
}