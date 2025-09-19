class car {
        constructor(id ,src = ["2.png"], marque, model, caracters,star = 0, color = ['black'], price = 0){
            if (!marque || !model || !caracters || caracters.length < 4 || !Array.isArray(color) || color.length === 0) {
                throw new Error("Invalid car parameters");
            }
            this.id = id;
            this.src = src;
            this.marque = marque;
            this.model = model;
            this.caracters = caracters;
            this.star = star;
            this.color = color;
            this.price = price;
        }
        getCarInfo() {
            return `<div class="car_info">
                        <img src="voiture/${this.src[0]}" alt="A ${this.marque} ${this.model} car in ${this.color.join(', ')}
                        <div class="marque">${this.marque}</div>
                        <div class="model">${this.model}</div>
                        <ul class="caract">
                            <li>${this.caracters[0]}</li>
                            <li>${this.caracters[1]}</li>
                            <li>${this.caracters[2]}</li>
                            <li>${this.caracters[3]}</li>
                        </ul>
                        <div class="important">
                            <ul class="star">
                                <li><i class="material-icons" style ="color:${this.star >= 1 ? 'gold' : 'gray'}">star</i></li>
                                <li><i class="material-icons" style ="color:${this.star >= 2 ? 'gold' : 'gray'}">star</i></li>
                                <li><i class="material-icons" style ="color:${this.star >= 3 ? 'gold' : 'gray'}">star</i></li>
                                <li><i class="material-icons" style ="color:${this.star >= 4 ? 'gold' : 'gray'}">star</i></li>
                                <li><i class="material-icons" style ="color:${this.star >= 5 ? 'gold' : 'gray'}">star</i></li>
                            </ul>
                            <div class="prix">$${this.price}</div>
                        </div>
                    </div>
                    <form action="" class="rent">
                        <input type="hidden" name="id" value="${this.id}">
                        <button type="submit">Rent a car <i class="material-icons flesh">trending_flat</i></button>
                    </form>`;
        }
    }
    class carList {
        constructor(pageNumber= 6) {
            this.cars = [];
            this.pageNumber = pageNumber;
            this.currentPage = 1;
            this.totalPages = 0;
        }
        getLengthCars() {
            return this.cars.length;
        }
        addCar(car) {
            this.cars.push(car);
            this.totalPages = Math.ceil(this.getLengthCars() / this.pageNumber);
        }
        getAllCars() {
            this.totalPages = Math.ceil(this.getLengthCars() / this.pageNumber);
            return this.cars;
        }
        getCars(currentPage = 1, marque = '', model = '') {
            this.currentPage = currentPage;
            const start = (currentPage - 1) * this.pageNumber;
            const end = start + this.pageNumber;
            this.totalPages = Math.ceil(this.getFilteredCars(marque, model).length / this.pageNumber);
            return this.getFilteredCars(marque, model).slice(start, end);
        }
        getFilteredCars(marque, model) {
            return this.cars.filter(car => 
                car.marque.toLowerCase().includes(marque.toLowerCase()) && 
                car.model.toLowerCase().includes(model.toLowerCase())
            );
        }
    }
document.addEventListener('DOMContentLoaded',function(){
    const marque = document.getElementById('marque');
    const model = document.getElementById('model');
    
    const carListInstance = new carList(3);
    // Add cars to the carListInstance
    carListInstance.addCar(new car(carListInstance.getLengthCars()+1,["1CLIO.jpg","2clio.jpg","3clio.jpeg","4clio.jpeg","5clio.jpeg","6clio.jpeg","7clio.jpeg","8clio.jpeg","9clio.jpeg","10clio.jpeg"], "Clio", "X5", ["4x4", "Diesel", "Automatic", "2020"], 5, ['black', 'white'], 60000));
    carListInstance.addCar(new car(carListInstance.getLengthCars()+1,["2025-Porsche-Macan-4-EV-15.png","2025-Porsche-Macan-4-EV-25.png","2025-Porsche-Macan-4-EV-28.png","2025-Porsche-Macan-Turbo-EV-11.png","2025-Porsche-Macan-Turbo-EV-12.png","2025-Porsche-Macan-Turbo-EV-14.png","2025-Porsche-Macan-Turbo-EV-20.png"], "Porche macan", "GLC", ["4x4", "Diesel", "Automatic", "2021"], 4, ['black', 'blue'], 70000));
    carListInstance.addCar(new car(carListInstance.getLengthCars()+1,["DB2020AU00140large.jpg","DB2020AU00141large.jpg","DB2020AU00143large.jpg","DB2020AU00137large.jpg","DB2020AU00144large.jpg","DB2020AU00147large.jpg","DB2020AU00148large.jpg","DB2020AU00136large.jpg"], "Golf", "X6", ["4x4", "Diesel", "Automatic", "2022"], 5, ['black', 'silver'], 80000));
    carListInstance.addCar(new car(carListInstance.getLengthCars()+1,["Range-Rover-Sport-8-631x420.jpg","Range-Rover-Sport-7-597x420.jpg","Range-Rover-Sport-13-631x420.jpg","Range-Rover-Sport-4-631x420.jpg","DB2020AU00151large.jpg","Range-Rover-Sport-2-881x420.jpg"], "Range Rover Sport", "Cayenne", ["4x4", "Petrol", "Automatic", "2023"], 5, ['black', 'red'], 90000));
    carListInstance.addCar(new car(carListInstance.getLengthCars()+1,["volkswagen-t-roc-2022-maroc-autonews-face-300x300.jpg","volkswagen-t-roc-autonews-1-300x200.jpg","volkswagen-t-roc-autonews-2-300x200.jpg","volkswagen-t-roc-autonews-3-300x200.jpg","volkswagen-t-roc-autonews-4.jpg","volkswagen-t-roc-autonews-8.jpg","volkswagen-t-roc-autonews-9.jpg"], "Golf", "Large", ["4x4", "Diesel", "Automatic", "2020"], 5, ['black', 'green'], 100000));
    updateCarDisplay();

    const searchForm = document.getElementById('search_car');
    searchForm.addEventListener('submit',function(event){
        event.preventDefault();
        updateCarDisplay(carListInstance.getCars(1, marque.value.toLowerCase(), model.value.toLowerCase()));
    });
    const searchIcon = document.getElementById('search');
    searchIcon.addEventListener('click', function() {
        const searchContainer = document.getElementById('marque');
        searchContainer.focus();
    });
    function rentCar(){
        const rentForm = document.querySelectorAll('.rent');
        rentForm.forEach(form => {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const carId = this.querySelector('input[name="id"]').value;
                rentCarForm(carId);
            });
        });
    }
    function rentCarForm(carId) {
        const car = carListInstance.getAllCars().find(c => c.id == carId);
        if (car) {
            alert(`You have rented a ${car.marque} ${car.model} for $${car.price}.`);
            rentPage(carId);
        } else {
            alert('Car not found.');
        }
    }
    function rentPage(carId) {
        const car = carListInstance.getAllCars().find(c => c.id == carId);
        if (car) {
            const searchIcon = document.getElementById('search');
            searchIcon.style.display = 'none';
            const main = document.querySelector('main');
            const search_car = document.getElementById('search_car');
            search_car.style.display = 'none';
            main.innerHTML = '' ;
            // Clear the main content and display the rent page in format of an form to inseart the detail of client and prefered color of car and when submited send an email or whatsapp message pre filled with the car details
            main.innerHTML = `<div class="rent_page">
                <div class="titre">Rent a <span class="right">${car.marque} ${car.model}</span></div>
                <div class="car_info">
                    <div class="img_container"><span id="left"><i class="material-icons">skip_previous</i></span><img src="voiture/${car.src[0]}" alt=""><span id="right"><i class="material-icons">skip_next</i></span></div>
                    <div class="marque">${car.marque}</div>
                    <div class="model">${car.model}</div>
                    <ul class="caract">
                        <li>${car.caracters[0]}</li>
                        <li>${car.caracters[1]}</li>
                        <li>${car.caracters[2]}</li>
                        <li>${car.caracters[3]}</li>
                    </ul>
                    <div class="important">
                            <ul class="star">
                                <li><i class="material-icons" style ="color:${car.star >= 1 ? 'gold' : 'gray'}">star</i></li>
                                <li><i class="material-icons" style ="color:${car.star >= 2 ? 'gold' : 'gray'}">star</i></li>
                                <li><i class="material-icons" style ="color:${car.star >= 3 ? 'gold' : 'gray'}">star</i></li>
                                <li><i class="material-icons" style ="color:${car.star >= 4 ? 'gold' : 'gray'}">star</i></li>
                                <li><i class="material-icons" style ="color:${car.star >= 5 ? 'gold' : 'gray'}">star</i></li>
                            </ul>
                            <div class="prix">$${car.price}</div>
                    </div>
                </div>`;
            main.innerHTML += `<form id="rent_form">
                <h2>Rent Form</h2>
                <label for="name">Full Name:</label>
                <input type="text" id="name" name="name" required>
                <label for="carte">Carte Nationale / Passport:</label>
                <input type="text" id="carte" name="carte" required>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email">
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required>
                <button type="submit">Rent</button>
            </form>`;
            const left = document.getElementById('left');
            const right = document.getElementById('right');
            left.addEventListener('click', function() {
                const img = document.querySelector('.img_container img');
                // Ensure the image source take just the img src and not the full path and add voiture/
                const currentSrc = img.src.split('/').pop();
                img.src = 'voiture/' + car.src[(car.src.indexOf(currentSrc) - 1 + car.src.length) % car.src.length];
                img.onload = function() {
                    img.style.opacity = '1';
                }
                console.log('Left arrow clicked');
                console.log('Current image source:', img.src);
            });
            right.addEventListener('click', function() {
                const img = document.querySelector('.img_container img');
                const currentSrc = img.src.split('/').pop();
                img.src = 'voiture/' + car.src[(car.src.indexOf(currentSrc) + 1) % car.src.length];
                img.onload = function() {
                    img.style.opacity = '1';
                }
                console.log('Right arrow clicked');
                console.log('Current image source:', img.src);
            });
            const rentForm = document.getElementById('rent_form');
            rentForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const name = document.getElementById('name').value;
                const carte = document.getElementById('carte').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                if (name && carte && phone) {
                    alert(`Thank you ${name}, you have successfully rented a ${car.marque} ${car.model} with the following details:\nCarte Nationale / Passport: ${carte}\nEmail: ${email}\nWe will contact you shortly.`);
                    // Create a mailto link with the car details
                    const subject = `Car Rental Request: ${car.marque} ${car.model}`;
                    const body = `Name: ${name}\nCarte Nationale / Passport: ${carte}\nEmail: ${email}\nPhone: ${phone}\nCar Details:\nMarque: ${car.marque}\nModel: ${car.model}\nPrice: $${car.price}`;

                    const mailtoLink = `mailto:abdelkabyr9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    window.location.href = mailtoLink;
                } else {
                    alert('Please fill in all fields.');
                }
            });

            const home = document.getElementById('home');
            home.addEventListener('click', function() {
                search_car.style.display = 'flex';
                searchIcon.style.display = 'flex';
                main.innerHTML = `
                <div id="fleet">
                    <div class="titre">Our <span class="right">Fleet</span></div>
                    <!-- Cars will be dynamically inserted here by JavaScript -->
                </div>
                <div id="advantages">
                    <span class="right titre" >Advantages</span>
                    <div class="adv">
                        <i class="material-icons">headset_mic</i>
                        <div class="desc">24/7 Customer Online </br>Support</div>
                        <div class="small">Call us Anywhere Anytime</div>
                    </div>
                    <div class="adv">
                        <i class="material-icons">event_note</i>
                        <div class="desc">Reservation Anytime </br>You Wants</div>
                        <div class="small">24/7 Online reservation</div>
                    </div>
                    <div class="adv">
                        <i class="material-icons">place</i>
                        <div class="desc">Lots of Picking </br>Locations</div>
                        <div class="small">250+ Locations</div>
                    </div>
                </div>`;
                updateCarDisplay(carListInstance.getCars(carListInstance.currentPage, marque.value.toLowerCase(), model.value.toLowerCase()));
            });
        }
    }
    function updateCarDisplay(cars = carListInstance.getCars()) {
        const fleet = document.getElementById('fleet');
        fleet.innerHTML = '<div class="titre">Our <span class="right">Fleet</span></div>';
        cars.forEach(car => {
            const carElement = document.createElement('div');
            carElement.className = 'car';
            carElement.innerHTML = car.getCarInfo();
            fleet.appendChild(carElement);
        });
        if (carListInstance.totalPages > 1) {
            const pagination = document.createElement('div');
            pagination.id = 'pagination';
            for (let i = 1; i <= carListInstance.totalPages; i++) {
                const pageLink = document.createElement('a');
                pageLink.href = '#';
                pageLink.innerText = i;
                pageLink.className = (i === carListInstance.currentPage) ? 'active' : '';
                pageLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    carListInstance.currentPage = i;
                    updateCarDisplay(carListInstance.getCars(carListInstance.currentPage, marque.value.toLowerCase(), model.value.toLowerCase()));
                });
                pagination.appendChild(pageLink);
            }
            fleet.appendChild(pagination);
        }
        rentCar();
    }
}); 