class Currency extends PoeItemTemplate {
    
    constructor ( obj ){
        
        super( obj );
        
        this.curStack = obj.curStack || 1;
        this.maxStack = obj.maxStack || 20;
        this.effect   = obj.effect || '';
        this.info     = obj.info || '';
    }
    
    get curStack() {
        return this.curStack;
    }
    set curStack(v) {
        this.curStack = v;
    }
}