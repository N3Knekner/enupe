export default class AntiSpam {
    constructor(callback) {
        this.timeouts = [];
        this.callback = callback;
    }
    restart = ()=>{
        const pointer = this.timeouts.length;
        this.timeouts.push( setTimeout(() => {
            this.isLastHandler(pointer)
        }, 500));
    }
    isLastHandler = (pointer) => {
        clearTimeout(this.timeouts[pointer]);
        if (pointer ===  this.timeouts.length-1) {
            this.callback();
        }
    }
}