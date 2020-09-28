export class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username; 
        this.chats = db.collection('chats'); 
        this.unsub;
    };
    set room(value) {
        this._room = value;
    }
    get room() {
        return this._room;
    };

    set username(value) {
        if(value.length >= 2 && value.length <= 10 && value != "" && value != "   ") {
            this._username = value;
        } else {
            alert('Username must be between 2 and 10 characters, with no spaces. Please, provide corresponding username!');
        }
    }
    get username() {
        return this._username;
    };
    
    updateUsername(newUsername) {
        this.username = newUsername;
        if(newUsername.length >= 2 && newUsername.length <= 10 && newUsername != "" && newUsername != "   ") {
            localStorage.setItem('username', newUsername);
        }
    }
    updateRoom(newRoom) {
        this.room = newRoom;
        localStorage.setItem('room', newRoom);
        if(this.unsub) {
            this.unsub(); // zbog situacije u 52. liniji koda, ovde pozivamo anonimnu f-ju 
        }
    }
    async addChat(message) { 
        let datum = new Date();
        if(message != "") {
            let document = {
                message: message,
                username: this.username,
                room: this.room,
                created_at: firebase.firestore.Timestamp.fromDate(datum)
            };
            this.chats.doc().set(document)
            .then(() => {
                // console.log('Uspešno dodat chat!');
            })
            .catch(error => {
                // alert('Došlo je do greške', error);
            });
        } else {
            alert('You can not send empty message!');
        }
    }
    getChats(callback) {
        this.unsub = this.chats // iako promenljiva, kada se ovde ovako zapiše, postaje anonimna f-ja
        .orderBy('created_at')
        .where('room', '==', this.room)
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added' /* || type == 'removed' REMOVED MI NIJE POTREBAN */ ) {
                    // update chat-a (dodaj novu poruku na ekran)
                    callback(change.doc.data());
                };// ovde kada ulogovani korisnik brise poruku (jer mora da ode i iz firebase-a)
            });
        });
    }
};
