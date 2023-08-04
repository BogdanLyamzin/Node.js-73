const createUser = data => {
    return {
        name: data.userName,
        lastName: data.userLastName,
        fullName: `${data.userName} ${data.userLastName}`,
    }
}

const user = createUser();
if(Object.keys(user).length === 2) {
    
}