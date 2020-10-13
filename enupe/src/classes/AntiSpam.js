export default class AntiSpam {
    constructor(callback) {
        //Private
        this.timeouts = [];
        //Private
        this.callback = callback;
    }
    //Public
    restart = ()=>{
        const pointer = this.timeouts.length;
        this.timeouts.push( setTimeout(() => {
            this.isLastHandler(pointer)
        }, 500));
    }
    //Private
    isLastHandler = (pointer) => {
        clearTimeout(this.timeouts[pointer]);
        if (pointer ===  this.timeouts.length-1) {
            this.callback();
        }
    }
}