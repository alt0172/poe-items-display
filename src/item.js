class Item extends PoeItemTemplate {
    
    constructor ( obj ){
        
        super(obj);
        
        this.requirements = obj.requirements || [];
        
        this.enchant      = obj.enchant || '';
        this.implicits    = buildMods( obj.implicits );
        
        
        //set item mods
        let useModsArray = true;

        // if at least one prefix or suffix have been specified, 
        // fill special prefixes/suffixes slots
        if ( obj.hasOwnProperty(prefix1) ) {
            this.prefix1 = new ItemMod( obj.prefix1 );
            useModsArray = false;
        }
        if ( obj.hasOwnProperty(prefix2) ) {
            this.prefix2 = new ItemMod( obj.prefix2 );
            useModsArray = false;
        }
        if ( obj.hasOwnProperty(prefix3) ) {
            this.prefix3 = new ItemMod( obj.prefix3 );
            useModsArray = false;
        }
        
        if ( obj.hasOwnProperty(suffix1) ) {
            this.suffix1 = new ItemMod( obj.suffix1 );
            useModsArray = false;
        }
        if ( obj.hasOwnProperty(suffix2) ) {
            this.suffix2 = new ItemMod( obj.suffix2 );
            useModsArray = false;
        }
        if ( obj.hasOwnProperty(suffix3) ) {
            this.suffix3 = new ItemMod( obj.suffix3 );
            useModsArray = false;
        }
            
        if (useModsArray) {
            // otherwise write all mods in .mods array
            this.mods = buildMods( obj.mods );
        }
        
        // flavour text
        this.flavour     = obj.flavour|| '';
        
        // set other item properties
        this.shaper      = obj.shaper || 0;
        this.elder       = obj.elder || 0;
        
        this.mirrored    = obj.mirrored || 0;
        this.corrupted   = obj.corrupted || 0;
        
        this.fractured   = obj.fractured || 0;
        this.synthesised = obj.synthesised || 0;
        this.relic       = obj.relic || 0;
        
        // update icon (it depends on properties above)
        setFinalIconUrl();
    }
    
    
    /**
     * Makes array with instances of ItemMod objects
     *
     * @param  {*} input - contain strings, each one will be used to make ItemMod based on it
     *
     * @return {array} result
     */
    function buildMods( input ){
        let arr, result=[];
        
        if ( input.isArray() ) {
            // if input was an array use it
            arr = input;
            
        } else if ( typeof input=='string' ){
            // if input was a string make array with it as only element
            arr = [input];
            
        } else {
            // input was weird
            arr = [];
        }
        
        for ( let i=0, l=arr.length; i<l; i++ ) {
            result[i] = new ItemMod( arr[i] );
        }
        
        return result;
    }
    
    /**
     * Sets final icon image url based on item properties
     *
     * @param {number} [scale]     scale image or not. 1 (default) - do, 0 - don't
     */
    function setFinalIconUrl( scale=1 ) {
        
        let extra,
            size = '&w=' + this.w + '&h=' + this.h;
        
        if      (this.fractured)   { extra += '&fractured=1'; }
        else if (this.synthesised) { extra += '&synthesised=1'; }
        
        if (this.relic)    { extra += '&relic=1'; }
        if (this.mirrored) { extra += '&duplicated=1'; }
        
        this.icon += '?scale=' + scale + size + extra);
    }
}