class ChatUI {
    constructor(message) {
        this.message = message;
    };

    set message(value) {
        if(!value == "") {
            this._message = value;
        } else {
            alert('You cannot send empty message!');
        }
    }
    get message() {
        return this._message;
    };  

    clear() {
        this.message.innerHTML = "";
    }
    formatDate(dateInput) {

        let day = dateInput.getDate();
        let month = dateInput.getMonth() + 1;
        let hours = dateInput.getHours();
        let minutes = dateInput.getMinutes();
        let year = dateInput.getFullYear();
        let today = new Date();

        if(day.toString() == 1) {
            day = '0' + day;
        } else {
            day = day;
        };

        if(month.toString().length == 1) {
            month = '0' + month;
        } else {
            month = month;
        };

        if(hours.toString().length == 1 ) {
            hours = '0' + hours;
        } else {
            hours = hours;
        };
        
        if(minutes.toString().length == 1) {
            minutes = '0' + minutes;
        } else {
            minutes = minutes;
        };

        if(dateInput.getDate() == today.getDate()) {
            let strDate = hours + ":" + minutes;
            return strDate;
        } else {
            let strDate1 =  day + "." + month + "." + year + ". - " + hours + ":" + minutes;
            return strDate1;
        }  
    }
    
    templateLI(object) {
        let date = object.created_at.toDate();
        let datum = this.formatDate(date);
        let currentUser = localStorage.getItem('username');
        let htmlLi;

        if(currentUser == object.username) {
            htmlLi = `<li>
            <div class='current_user'>
                <span class='username'><b>${object.username}</b></span>: 
                <span class='message'>${object.message}</span> <br> 
                <span class='date'>${datum}</span>
                <img src='pictures/bin.jpg' width='15px' class='trash_bin'>
            </div>
            </li>`
        } else {
            htmlLi = `<li>
            <div class='li'>
                <span class='username'><b>${object.username}</b></span>: 
                <span class='message'>${object.message}</span> <br> 
                <span class='date'>${datum}</span> 
                <img src='pictures/bin.jpg' width='15px' class='trash_bin'>
            </div>
            </li>` 
        };

        this.message.innerHTML += htmlLi;

        document.getElementById('section').scrollTop = document.getElementById('section').scrollHeight;
    }
    removeLi() {
        this.message.innerHTML = 'Deleted';
    }
};
export {ChatUI};

