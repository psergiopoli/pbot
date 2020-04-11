export class Logger {
    static log(message: string) {
        console.log(message)
    } 

    static error(error, message: string) {
        console.error(error, message)
    } 
}