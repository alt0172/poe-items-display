class PoeItemTemplate {
    
    constructor ( obj ){
        
        this.name   = obj.name || 'Example Item';
        this.base   = obj.base || getBaseFromName(obj.name);
        this.rarity = obj.rarity || 'rare';
        this.altart = obj.altart || 0;
        this.notes  = obj.notes || '';
        
        // set item icon, width, height 
        if ( obj.icon && obj.w && obj.h ) {
            // if all have been specified
            this.icon   = obj.icon;
            this.w      = obj.w;
            this.h      = obj.h;
            
        } else {
            // otherwise get data from item base
            let tmp = getIconWHfromSomeItemData( {
                                                    name:   this.name,
                                                    base:   this.base,
                                                    rarity: this.rarity,
                                                    altart: this.altart
                                                } );
            
            this.icon   = tmp.icon;
            this.w      = tmp.w;
            this.h      = tmp.h;
        }
        
    }

}