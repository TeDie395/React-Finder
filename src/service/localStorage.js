export class LocalStorageService {
    
    constructor() {
        
    }
    
    addLoggedUser(user){
        localStorage.setItem('userLogged', JSON.stringify(user));
    }
    
    checkLoggedUser(){
        const user = localStorage.getItem('userLogged');
        return user ? true : false;
    }
    
    getLoggedUser(){
        return JSON.parse(localStorage.getItem('userLogged'));
    }
    
    updateLoggedUser(user){
        if (this.getLoggedUser().id === user.id){
            localStorage.setItem('userLogged', JSON.stringify(user));
        }
        
    }
}
