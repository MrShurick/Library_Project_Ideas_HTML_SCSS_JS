export class UserSiedView {
    constructor() {
        this.mainContain = document.querySelector('.main');
        this.infoBook = document.querySelector('.infoBooks');
        this.mainFavorite = document.querySelector('.favorBook');
        this.mainPresonalAcc = document.querySelector('.personalAcc');
        this.navs = document.querySelectorAll('nav');
        this.searchInpt = document.getElementById('searchInpt');
        this.searchBtn = document.getElementById('searchBtn');
        this.filtrYearDiv = document.querySelector('.filterYear');
        this.filtrAuthorDiv = document.querySelector('.filterAuthor');
        this.booksDiv = document.querySelector('.booksDiv');

        this.onDelete = null;
    }

    displayBooks(dataBook) {
        this.booksDiv.innerHTML = '';

        dataBook.forEach(book => {
            const cardBook = document.createElement("DIV");
                cardBook.classList.add("card-book");
                cardBook.setAttribute('id', book.id);

                cardBook.insertAdjacentHTML("beforeend",
                    `
                        <div class="bookPhoto">
                            <img src="${book.photo}" alt="${book.name}" width="200px">
                        </div>

                        <div class="infoBook">
                            <h3>${book.name}</h3>
                            <p>Автор: ${book.author}</p>
                            <p>Рік випуску: ${book.year}</p>
                        </div>
                    `
                );
            this.booksDiv.appendChild(cardBook);
        });
    }

    renderfilterBookYear(booksYear) {
        const contain = document.querySelector('.years');

        booksYear.forEach(book => {
            const boxTake = document.getElementById(book.year);
            if (boxTake) return;

            const divYear = document.createElement('DIV');
            divYear.classList.add('checkBoxYear');

            divYear.insertAdjacentHTML('beforeend', 
                `
                    <label for="${book.year}">${book.year}</label>
                    <input type="checkbox" id="${book.year}" value="${book.year}" class="checkYear">
                `);
            contain.appendChild(divYear);
        });
    }

    renderFilterBookAuthor(booksAuthor) {
        const contain = document.querySelector('.authors');

        booksAuthor.forEach(book => {
            const takeAuthor = document.getElementById(book.author);
            if (takeAuthor) return;

            const buttAuthor = document.createElement('BUTTON');
            buttAuthor.setAttribute('class', 'buttonAuthor');
            buttAuthor.setAttribute('id', book.author);
            buttAuthor.setAttribute('type', 'button');
            buttAuthor.textContent = book.author;

            contain.appendChild(buttAuthor);
        });
    }

    renderInfoBook(dataBook) {
        const contain = document.querySelector('.infoBookDiv');

        if (!contain) return;

        contain.innerHTML = '';

        dataBook.forEach(book => {
            contain.insertAdjacentHTML('beforeend', 
                `
                    <div class="divBack">
                        <button id="backBtn">
                        <img src="/IMG/free-icon-back-3183312.png" width="24px" id="photoIcon">
                        </button>
                    </div>

                    <div class="photoInfoBook">
                        <div class="photoBook">
                            <img src="${book.photo}" width="256px">
                        </div>

                        <div class="info">
                            <h4>${book.name}</h4>
                            <p>${book.author}</p>
                            <p>${book.year}</p>
                        </div>

                        <div class="clickFavor">
                            <button type="button" id="favoriteBtn" value="${book.id}">
                            Favorite ?
                            </button>
                        </div>
                    </div>

                    <div class="descript">
                        <h3 class="headInfo">Опис</h3>
                        <p>${book.description}</p>
                    </div>
                `
            );
        })
    }

    showBack() {
        if (this.mainContain && this.infoBook) {
            this.mainContain.style.display = 'grid';
            this.infoBook.style.display = 'none';
        }
    }

    showAccFavorite(tab) {
        this.infoBook.style.display = tab === '' ? 'block' : 'none';
        this.mainContain.style.display = tab === 'library' ? 'grid' : 'none';
        this.mainFavorite.style.display = tab === 'favorites' ? 'grid' : 'none';
        this.mainPresonalAcc.style.display = tab === 'personalaccount' ? 'block' : 'none';
    }

    renderFavorite(book) {
        const nav = this.infoBook?.querySelector('nav');
        if (nav) {
            const a = nav.querySelectorAll('UL LI A');

            a.forEach(tab => {
                if (tab.textContent.trim().toLocaleLowerCase() === 'favorites') {
                    tab.classList.add('blink-favorite');
                    setTimeout(() => tab.classList.remove('blink-favorite'),1000);
                }
            });
        }

        const contain = document.querySelector('.favoriteBooks');
        contain.innerHTML = '';

        book.forEach(b => {
            const cardBook = document.createElement("DIV");
            cardBook.classList.add("card-book");
            cardBook.setAttribute('id', b.id);
            
            cardBook.insertAdjacentHTML("beforeend",
                `
                    <div class="delBtn">
                        <button class="del">X</button>
                    </div>

                    <div class="bookPhoto">
                        <img src="${b.photo}" alt="${b.name}" width="200px">
                    </div>

                    <div class="infoBook">
                        <h3>${b.name}</h3>
                        <p>Автор: ${b.author}</p>
                        <p>Рік випуску: ${b.year}</p>
                    </div>
                `
            );
            const btnDel = cardBook.querySelectorAll('.del');
            if (!btnDel) return;

            btnDel.forEach(del => {
                del.addEventListener('click', (e) => {
                    if (e.target) this.onDelete(b.id, 'favorites');
                });
            });

            contain.appendChild(cardBook);
        });
    }

    renderPersonalAcc(dataUser) {
        if (!dataUser) return;
        const contain = document.querySelector('.personalAccDiv');

        contain.innerHTML = '';

        contain.insertAdjacentHTML('beforeend', 
            `
                <div class="photoDiv">
                    <img src="/IMG/free-icon-no-photo-4054617.png" id="newUserPhoto" alt="photo" width="256px">

                    <button type="button" id="exit">Вихід</button>
                </div>

                <div class="editeInfo">
                    <p class="name">Ім'я: ${dataUser.name}</p>
                    <p class="surname">Прізвище: </p>
                    <p class="year">Вік: </p>
                    <p class="email">Email: ${dataUser.email}</p>
                    <p class="tel">Телефон: ${dataUser.phone}</p>
                    <button type="button" id="btnReturnToForm">Редагувати профіль</button>
                </div>

                <div class="formEdInfo">
                    <form id="formEdite">

                        <div class="divInpt">
                            <label for="userPhoto">Фото</label>
                            <input type="file" id="userPhoto" name="userPhoto">
                        </div>

                        <div class="divInpt">
                            <label for="name">Ім'я</label>
                            <input type="text" id="name" name="name" value="${dataUser.name}">
                        </div>

                        <div class="divInpt">
                            <label for="surname">Прізвище</label>
                            <input type="text" id="surname" name="surname" value="">
                        </div>

                        <div class="divInpt">
                            <label for="year">Вік</label>
                            <input type="text" id="year" name="year" value="">
                        </div>

                        <div class="divInpt">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" value="${dataUser.email}">
                        </div>

                        <div class="divInpt">
                            <label for="tel">Номер телефону</label>
                            <input type="tel" id="tel" name="phone" value="${dataUser.phone}">
                        </div>

                        <div class="divEdite">
                            <button type="submit" id="btnEdite" value="${dataUser.id}">Зберегти</button>
                        </div>
                    </form>
                </div>
            `
        );

        const btnReturn = contain.querySelector('#btnReturnToForm');

        if (btnReturn) {
            btnReturn.addEventListener('click', () => {
                contain.querySelector('.formEdInfo').style.display = 'grid';
                contain.querySelector('.editeInfo').style.display = 'none';
            });
        }
    }

    renderNewinFo(newData, flag) {
        const contain = document.querySelector('.personalAccDiv');
        if (!contain) return;

        const name = contain.querySelector('.name');
        const surname = contain.querySelector('.surname');
        const year = contain.querySelector('.year');
        const email = contain.querySelector('.email');
        const tel = contain.querySelector('.tel');

        if (name) name.textContent = `Ім'я: ${newData.name || ''}`;
        if (surname) surname.textContent = `Прізвище: ${newData.surname || ''}`;
        if (year) year.textContent = `Вік: ${newData.year || ''}`;
        if (email) email.textContent = `Email: ${newData.email || ''}`;
        if (tel) tel.textContent = `Телефон: ${newData.phone || ''}`;

        const form = document.querySelector('.formEdInfo');
        const editeInfo = document.querySelector('.editeInfo');
        const newPhoto = document.getElementById('newUserPhoto');

        if (form) form.style.display = 'none';
        if (editeInfo) editeInfo.style.display = 'grid';
        if (newPhoto && newData.photo) newPhoto.src = newData.userPhoto;
    }

    exitProfil() {
        window.location.href = '/HTML/Login_Registr_Form.html';
    }

    bindSearch(handler) {
        this.searchBtn.addEventListener('click', () => {
            const valueSearch = this.searchInpt.value;
            handler(valueSearch);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const valueSearch = this.searchInpt.value;
                handler(valueSearch);
            } else {
                handler();
            }
        });
    }

    bindfilterYear(handler) {
        const check = this.filtrYearDiv.querySelectorAll('.checkYear'); 
        check.forEach(box => {
            box.addEventListener('change', (e) => {
                if (e.target.checked) {
                    check.forEach(otherBox => otherBox !== e.target && 
                            (otherBox.checked = false));
                    const value = e.target.value;
                    handler(value, 'year');
                } else {
                    handler();
                }
            });
        });
    }

    bindFilterAuthor(handler) {
        const buttonsAuthor = document.querySelectorAll('.buttonAuthor');
        buttonsAuthor.forEach(button => {
            button.addEventListener('click', (e) => {
                const active = e.target.classList.contains('active-author');
                buttonsAuthor.forEach(btn => btn.classList.remove('active-author'));

                if (!active) {
                    e.target.classList.add('active-author');
                    const value = e.target.textContent;
                    handler(value, 'author');
                } else {
                    handler();
                }
            });
        });
    }

    bindInfoBook(handler) {
        const cardsBook = document.querySelectorAll('.card-book');

        cardsBook.forEach(card => {
            card.addEventListener('click', (e) => {
                let isBool = false;
                const mainContain = document.querySelector('.main');
                const mainContainInfo = document.querySelector('.infoBooks');

                if (mainContainInfo) {
                    isBool = true;
                    mainContain.style.display = 'none';
                    mainContainInfo.style.display = 'block';
                    const parent = e.currentTarget;
                    const id = parent.id;
                    handler(isBool, id);
                }
                
            });
        });
    }

    bindShowBack(handler) {
        const parent = document.querySelector('.infoBookDiv');
        if (!parent) return;
        parent.addEventListener('click', (e) => {
            if (e.target.id === 'backBtn' || e.target.id === 'photoIcon') handler();
        });
    }

    bindshowAccFavorite(handler) {
        this.navs.forEach(nav => {
            nav.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    e.preventDefault();
                    const tabName = e.target.textContent;
                    handler(tabName);
                }

                if (e.target.tagName === 'IMG') {
                    const tabName = e.target.alt;
                    handler(tabName);
                }
            });
        });
    }

    bindFavorite(handler) {
        const parent = document.querySelector('.infoBookDiv');

        if (!parent) return;

        parent.addEventListener('click', (e) => {
            if (e.target.id === 'favoriteBtn') {
                const idBook = e.target.value;
                handler(idBook);
            }
            
        });
    }

    bindRenderAcc(handler) {
        this.navs.forEach(nav => {
            nav.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    if (e.target.textContent.toLowerCase().split(' ').join('') === 'personalaccount') {
                        handler();
                    }
                }
            });
        });
    }

    bindEditeProfile(handler) {
        const form = document.getElementById('formEdite');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('btnEdite');
            const id = btn.value;
            console.log(id)
            if (btn) {
                const dataForm = new FormData(form);
                const dataObj = Object.fromEntries(dataForm.entries());
                if (form.userPhoto && form.userPhoto.files && form.userPhoto.files.length > 0) {
                    const file = form.userPhoto.files[0];
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        dataObj.userPhoto = reader.result;
                        handler(dataObj, id);
                    };

                    reader.readAsDataURL(file);
                } else {

                    if (form.userPhoto) dataObj.userPhoto = '';
                    handler(dataObj, id);
                }
            }
        });
    }

    bindExit(handler) {
        const div = document.querySelector('.personalAccDiv');
        if (!div) {
            console.log(false); 
            return;
        }

        div.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'exit') {
                console.log(true)
                handler();
            }
        });
    }

    bindDelet(handler) {
        this.onDelete = handler;
    }
};