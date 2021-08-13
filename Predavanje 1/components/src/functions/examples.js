export const logToConsole = () => {
    console.log("Hello")
}

export const logToConsole2 = (message = "Hello 2") => {
    console.log(message)
}

export const forOfLoop = (value) => {
    for (let variable of value) {
        console.log(variable);
    }
}

//arrays

export const mapArray = (array) => {
    array.map(item => console.log(item))
}