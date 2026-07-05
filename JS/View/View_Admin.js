export class View {
    constructor() {
        this.count = document.getElementById("count");
        this.nav = document.getElementById("menu");
        this.mainBook = document.getElementById("mainBook");
        this.mainVisitor = document.getElementById("mainVisitor");
        this.mainCard = document.getElementById("mainCard");
        this.mainStat = document.getElementById("mainStat");

        this.onDelete = null;
    }

    jumpChapter(chapter) {
        this.mainBook.style.display = chapter === "books" ? "block" : "none";
        this.mainVisitor.style.display = chapter === "visitors" ? "block" : "none";
        this.mainCard.style.display = chapter === "cards" ? "block" : "none";
        this.mainStat.style.display = chapter === "statistics" ? "block" : "none";

        const aAll = this.nav.querySelectorAll("a");
        aAll.forEach((a) => {
            if (a.dataset.link === chapter) {
                a.style.borderBottom = "0.3rem solid rgb(0, 173, 185)";
            } else {
                a.style.borderBottom = "";
            }
        });
    }

    modals(target, dataVisitor, dataBook) {
        const modalForm = document.createElement("DIV");
        modalForm.classList.add("modalAdd");
    // ================================== Book ======================================
        if (target === "createBook") {
            modalForm.insertAdjacentHTML(
                "beforeend",
                `
                <div class="closeModal">
                    <h3>New Book:</h3>
                    <button type="button" class="close">Close</button>
                </div>

                <form name="infoBook">
                    <div class="infoInput">
                        <label for="photo">Завантажте фото:</label>
                        <input type="file" id="photo" name="photo">
                    </div>

                    <div class="infoInput">
                        <label for="name">Назва книги:</label>
                        <input type="text" id="name" name="name">
                    </div>

                    <div class="infoInput">
                        <label for="author">Автор:</label>
                        <input type="text" id="author" name="author">
                    </div>

                    <div class="infoInput">
                        <label for="year">Рік випуску:</label>
                        <input type="text" id="year" name="year">
                    </div>

                    <div class="infoInput">
                        <label for="id">ID:</label>
                        <input type="text" id="id" name="id" value="${Date.now()}" readonly>
                    </div>

                    <div class="infoInput">
                        <label for="description">Опис:</label>
                        <textarea id="description" name="description"></textarea>
                    </div>

                    <button type="submit" class="addBtn">Add</button>
                </form>
            `,
            );
            this.mainBook.appendChild(modalForm);
        }
    // ============================== Visitors ======================================
        if (target === "createVisitor") {
            modalForm.insertAdjacentHTML(
                "beforeend",
                `
                <div class="closeModal">
                    <h3>New Visitor:</h3>
                    <button type="button" class="close">Close</button>
                </div>

                <form name="createVisitor">
                    <div class="infoInput">
                        <label for="name">Ім'я:</label>
                        <input type="text" name="name">
                    </div>

                    <div class="infoInput">
                        <label for="author">Номер телефону:</label>
                        <input type="tel" name="phone">
                    </div>

                    <div class="infoInput">
                        <label for="id">ID:</label>
                        <input type="text" name="id" value="${Date.now()}" readonly>
                    </div>

                    <div class="infoInput">
                        <label for="status">Status:</label>
                        <input type="text" name="status" value="" readonly>
                    </div>

                    <button type="submit" class="addBtn">Add</button>
                </form>
            `,
            );
            this.mainVisitor.appendChild(modalForm);
        }
    // ============================== Edit Visitors =================================
        if (target === "edit") {
            modalForm.insertAdjacentHTML(
                "beforeend",
                `
                <div class="closeModal">
                    <h3>Edit Visitor:</h3>
                    <button type="button" class="close">Close</button>
                </div>

                <form name="editVisitor">
                    <div class="infoInput">
                        <label for="name">Ім'я:</label>
                        <input type="text"id="name" value="${dataVisitor.name}" name="name">
                    </div>

                    <div class="infoInput">
                        <label for="phone">Номер телефону:</label>
                        <input type="tel" id="phone" value="${dataVisitor.phone}" name="phone">
                    </div>

                    <div class="infoInput">
                        <label for="id">ID:</label>
                        <input type="text" name="id" value="${dataVisitor.id}" readonly>
                    </div>

                    <button type="submit" class="addBtn editBtn">Edit</button>
                </form>
            `,
            );
            this.mainVisitor.appendChild(modalForm);
        }
    // ================================== Cards =====================================
        if (target === "createCard") {
            const divClose = document.createElement("DIV");
            const divVisitor = document.createElement("DIV");
            const divBook = document.createElement("DIV");
            const divId = document.createElement("DIV");
            const saveButt = document.createElement("BUTTON");
            const form = document.createElement("FORM");

            divClose.classList.add("closeModal");
            divVisitor.classList.add("infoInput");
            divBook.classList.add("infoInput");
            divId.classList.add("infoInput");
            saveButt.classList.add("saveBtn");
            saveButt.setAttribute("type", "submit");
            form.setAttribute("name", "createCard");

            divClose.innerHTML = `
                <h3>New Card:</h3>
                <button type="button" class="close">Close</button>`;

            divVisitor.innerHTML = `
                <label for="searchVisitor">Visitor:</label>
                <select id="searchVisitor" class="searchVisit" name="visitorId"></select>`;

            divBook.innerHTML = `
                <label for="searchBook">Book:</label>
                <select id="searchBook" class="searchBook" name="bookId"></select>`;

            divId.innerHTML = `
                <label for="id">Card ID:</label>
                <input type="text" id="id" name="cardId" value="${Date.now()}" readonly>`;

            saveButt.textContent = "Save";

            form.appendChild(divClose);
            form.appendChild(divVisitor);
            form.appendChild(divBook);
            form.appendChild(divId);
            form.appendChild(saveButt);

            modalForm.appendChild(form);

            const selectVisitor = modalForm.querySelector(".searchVisit");
            const selectBook = modalForm.querySelector(".searchBook");

            dataVisitor.forEach((visitor) => {
                const option = document.createElement("OPTION");
                option.setAttribute("value", visitor.id);
                option.textContent = visitor.name;
                selectVisitor.appendChild(option);
            });

            dataBook.forEach((book) => {
                const option = document.createElement("OPTION");
                option.setAttribute("value", book.id);
                option.textContent = book.name;
                selectBook.appendChild(option);
            });

            this.mainCard.appendChild(modalForm);
        }
        return modalForm;
    }

    renderInfo(data, type) {
    // ================================== Book ======================================
        if (type === "createBook") {
            this.border = this.mainBook.querySelector("#borderBook");

            this.border.innerHTML = "";

            data.forEach((book) => {
                const cardBook = document.createElement("DIV");
                cardBook.classList.add("card-book");
                cardBook.insertAdjacentHTML(
                    "beforeend",
                    `
                        <div class="bookPhoto">
                            <img src="${book.photo}" alt="${book.name}">
                        </div>

                        <div class="infoBook">
                            <h3>${book.name}</h3>
                            <p>Автор: ${book.author}</p>
                            <p>Рік випуску: ${book.year}</p>
                            <p>ID: ${book.id}</p>
                        </div>

                        <div class="deleteBook">
                            <button type="button" class="deleteBookBtn">Delete</button>
                        </div>
                    `,
                );

                const deleteBtn = cardBook.querySelector(".deleteBookBtn");
                if (deleteBtn) {
                    deleteBtn.addEventListener("click", (e) => {
                        if (e.target) this.onDelete(book.id, "createBook");
                    });
                }
                this.border.appendChild(cardBook);
            });
        }
    // ============================== Visitors ======================================
        if (type === "createVisitor") {
            const tBody = this.mainVisitor.querySelector(".tableBody");

            tBody.innerHTML = "";

            data.forEach((visitor) => {
                const tr = document.createElement("TR");
                tr.insertAdjacentHTML(
                    "beforeend",
                    `
                        <td>${visitor.id}</td>
                        <td>${visitor.name}</td>
                        <td>${visitor.phone}</td>
                        <td>
                            <button type="button" class="editBtn" id="${visitor.id}" data-type="edit">
                                <img src="/IMG/free-icon-lead-pencil-12005039.png">
                            </button>
                        </td>

                        <td>
                            <button type="button" class="deleteVisit" id="${visitor.id}" data-type="edit">
                                <img src="/IMG/free-icon-close-1828527.png">
                            </button>
                        </td>
                    `,
                );
                tr.addEventListener("click", (e) => {
                    const btn = e.target.closest(".deleteVisit");

                    if (btn) this.onDelete(visitor.id, "createVisitor");
                });

                tBody.appendChild(tr);
            });
        }
    // ============================== Cards ======================================
        if (type === "createCard") {
            const tBodyCard = this.mainCard.querySelector(".tableBodyCard");
            tBodyCard.innerHTML = "";

            data.forEach((card) => {
                const tr = document.createElement("TR");
                tr.insertAdjacentHTML(
                    "beforeend",
                    `
                        <td>${card.cardId}</td>
                        <td>${card.visitorName}</td>
                        <td>${card.bookName}</td>
                        <td>${new Date().toLocaleDateString()}</td>
                        <td class="returnBooks">
                            ${ card.return ? card.return: `
                                <button type="button" class="returnBtn" id="${card.cardId}" data-type="returnBook">
                                    <img src="/IMG/free-icon-book-return-18741921.png">
                                </button>
                            `
                            }
                        </td>
                    `);
                tBodyCard.appendChild(tr);
            });
        }
    }
// ================================== Render Charts ===============================
    renderChartData(booksCount, visitorsCount, cardsCount) {
        const ctx = document.getElementById("chartAll");
        if (!ctx) return;

        if (this.libaChartAll) this.libaChartAll.destroy();

        this.libaChartAll = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Книги", "Відвідувачи", "Позичені книги"],
                datasets: [
                    {
                        label: "Кількість",
                        data: [
                            booksCount.length,
                            visitorsCount.length,
                            cardsCount.length,
                        ],

                        backgroundColor: [
                            "rgba(14, 250, 2, 0.54)",
                            "rgba(238, 250, 2, 0.54)",
                            "rgba(250, 2, 2, 0.54)",
                        ],
                        borderColor: [
                            "rgb(10, 201, 0)",
                            "rgb(181, 191, 0)",
                            "rgb(200, 0, 0)",
                        ],
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                    },
                },
                animation: {
                    y: {
                        duration: 2000,
                        from: 0,
                    },
                    opacity: {
                        duration: 2000,
                        from: 0,
                        to: 1,
                    },
                },
            },
        });
    }
// ================================== Bind ==========================================
    bindJumpChapter(handler) {
        this.nav.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                e.preventDefault();
                const targetPage = e.target.dataset.link;
                handler(targetPage);
            }
        });
    }

    addBind(handler) {
        const creatBtns = document.querySelectorAll(".createBtn");
        creatBtns.forEach((button) => {
            button.addEventListener("click", (e) => {
                if (document.querySelector(".modalAdd")) return;

                const type = e.currentTarget.dataset.type;

                const currentModal = handler(null, type, true);
                if (!currentModal) return;

                const form = currentModal.querySelector("form");
                const closeBtn = currentModal.querySelector(".close");

                if (closeBtn) {
                    closeBtn.addEventListener("click", () => {
                        currentModal.remove();
                    });
                }

                if (form) {
                    form.addEventListener("submit", (e) => {
                        e.preventDefault();

                        const formData = new FormData(form);
                        const dataObj = Object.fromEntries(formData.entries());

                        if (form.photo && form.photo.files && form.photo.files.length > 0) {
                            const file = form.photo.files[0];
                            const reader = new FileReader();

                            reader.onloadend = () => {
                                dataObj.photo = reader.result;

                                handler(dataObj, type, false);
                                console.log(dataObj);
                                currentModal.remove();
                            };

                            reader.readAsDataURL(file);
                        } else {
                            if (form.photo) dataObj.photo = '';

                            handler(dataObj, type, false);
                            currentModal.remove();
                        }
                    });
                }
            });
        });
    }

    bindSort(handler) {
        const sortBtns = document.querySelectorAll(".sortBtn");
        sortBtns.forEach((button) => {
            button.addEventListener("click", (e) => {
                const btn = e.currentTarget;
                const type = btn.dataset.type;
                const container = btn.parentElement;
                const select = container.querySelector(".sortSelect");

                if (select && type) {
                    const valueSort = select.value;
                    handler(valueSort, type);
                }
            });
        });
    }

    bindSearch(handler) {
        const searchBtns = document.querySelectorAll(".searchBtn");
        searchBtns.forEach((button) => {
            button.addEventListener("click", (e) => {
                const container = e.currentTarget.parentElement;
                const valueSearch = container.querySelector(".search").value.trim();
                const type = e.currentTarget.dataset.type;
                handler(valueSearch, type);
            });
        });
    }

    bindEdit(handler) {
        const tBody = this.mainVisitor.querySelector(".tableBody");

        tBody.addEventListener("click", (e) => {
            const btn = e.target.closest(".editBtn");
            if (btn) {
                const type = btn.dataset.type;
                const id = btn.id;
                handler(type, id);
            }
        });
    }

    bindReturn(handler) {
        const tbody = this.mainCard.querySelector(".tableBodyCard");

        tbody.addEventListener("click", (e) => {
            const btn = e.target.closest(".returnBtn");
            if (btn) {
                const id = btn.id;
                const dates = new Date().toLocaleDateString();
                handler(id, dates, btn);
            }
        });
    }

    bindDeleteBook(handler) {
        this.onDelete = handler;
    }

    bindClearLocal(handler) {
        this.nav.addEventListener("click", (e) => {
            const btn = e.target.closest("#localClear");
            if (btn) handler();
        });
    }
}