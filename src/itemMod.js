/**
 * Class for item mod - string with some special possibilities
 *
 * @constructor
 *
 * @param  {string} inputString - text to use as base (example: "Adds 17 to 32 Chaos Damage to Attacks (crafted)")
 *
 * @private modText {string}  text describing mod with all numbers replaced by '##' and with mod type removed (example: "Adds ## to ## Chaos Damage to Attacks")
 *    values  {array}   array, containing all numbers taken from string when making modText (example: [17, 32])
 *
 * @public
 *    txt     {string}  text where all '##' have been replaced by numbers (example: "Adds 17 to 32 Chaos Damage to Attacks")
 *    modType {string}  possible values:
 *                         ''          empty string for regular explicit mods
 *                         'crafted'   for crafted
 *                         'fractured' for fractured
 *    
 *
 */
class ItemMod {
    /* example for mod
    
    
    modText  = "Adds ## to ## Chaos Damage to Attacks"    // isn't visible outside
    values[0] = 17
    values[1] = 32
    
    this.txt = "Adds 17 to 32 Chaos Damage to Attacks"
    this.modtype = ''

    possible values for modtype:
        ''          empty string for regular explicit mods (like in this example),
        'crafted'   for crafted mods
        'fractured' for fractured mods
        
    this.txtObj() = 
    {
        template: "Adds ## to ## Chaos Damage to Attacks", 
        values: [ 17, 32 ] 
    }
    //*/
    constructor ( inputString ){

        let str     = parseInputString(inputString).txt,
            modText = str.replace( /\d+/g, '##'),
            values  = str.match( /\d+/g );
    
        this.txt     = str;
        this.modType = parseInputString(inputString).type;
    }
    
    
    
    /**
     * Changes mod to a new one 
     * (similar to constructor)
     *
     * @param {sting}
     */
    newMod ( newModString ) {
        let tmp = parseInputString(newModString),
            str = tmp.txt;
        
        modText = str.replace( /\d+/g, '##'),
        values  = str.match( /\d+/g );
        
        this.txt = str;
        this.modType = tmp.type;
    };
    
    
    /**
     * Sets mod value(s) to random number between min and max
     *
     * @param {array} [min, max]. for each value separate array
     */
    reroll(){
        // arguments: [min,max] array for each value
        // example: 
        // reroll( [15,20], [30,40] ) -> "Adds 15 to 34 Chaos Damage to Attacks"
        // (like if random rolled 15 and 34)
        
        if ( arguments.length !== values.length ) {return;}
        
        var i, min, max;
        
        for (i=0; i<arguments.length; i++) {
            
            min = Math.min( arguments[i][0], arguments[i][1] );
            max = Math.max( arguments[i][0], arguments[i][1] );
            
            if ( isNaN(min) || isNaN(max) ) {return;}
            
            if ( Number.isInteger(min) && Number.isInteger(max) ) {
                // both are integer - round
                values[i] = Math.floor( Math.random()*(1+max-min) + min );
                
            } else {
                // there is float - keep 2 digits after point
                //values[i] = Math.random()*(max-min) + min;
                values[i] = Math.floor( 100 * (Math.random()*(1+max-min) + min) )/100;
            }
        }
        makeTxtString();
    };
    
    /**
     * Sets values to those that were specified
     *
     * @param {number} 
     */
    setTo(){
        // argument(s): value(s)
        // example: setTo(18,33) -> "Adds 18 to 33 Chaos Damage to Attacks"
        if ( arguments.length !== values.length ) { return;}
        var tmp;
        for (var i=0; i<arguments.length; i++) {
            
            if ( typeof arguments[i] == 'string' ) {
                tmp = Number( arguments[i] );
                if ( isNaN(tmp) ) return;
                values[i] = tmp;
                
            } else if ( typeof arguments[i] == 'number' ) {
                values[i] = arguments[i];
            }
        }
        makeTxtString();
    };
    
    /**
     * Returns object containing private object variables
     *
     * @return {object}
     */
    txtObj(){
        return { 'modText': modText, 'values': values };
    };
    
    /**
     * Builds .txt public property based on private variables
     *
     */
    function makeTxtString(){
        var tmp = modText;
        
        for ( var i=0; i<values.length; i++) {
            tmp = tmp.replace( '##', values[i] );
        }
        
        self.txt = tmp;
    }
    
    /**
     * @typedef  {Object} ParsedString
     * @property {string} txt     - cleared string
     * @property {string} modType - special word found or empty string. if few special words were found, 'crafted' has priority over everything
     */
     
    /**
     * Searches for special words in the string and removes all of them
     *
     * @param  {string} str - string to parse
     *
     * @return {ParsedString}
     *
     */
    function parseInputString( str ){
        var modString,
            modType = '';
        
        //some regexp magic
        modString = str.replace( /(\(crafted\))|(\(fractured\))/gi, function( match ){ //match, p1, p2, offset, string
            if ( !modType ) {
                // change modType only if it hasn't been changed before
                modType = match.slice(1, -1);
            }
            return '';
        } );
        
        return { txt:modString, type:modType };
    }
}