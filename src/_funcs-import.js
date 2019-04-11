/**
 * @typedef {Object} ItemObjectCreateParams
 *
 * @property {string} [name]    - name
 * @property {string} [base]    - base
 * @property {string} [rarity]  - rarity
 * @property {number} [altart]  - 1 if item has alternative art
 * @property {string} [notes]   - notes, for example buyout
 * @property {string} [icon]    - image url
 * @property {string} [w]       - width (in inventory cells)
 * @property {string} [h]       - height (in inventory cells)
 *
 *
 * @property {array}  [requirements]
 *
 * @property {string} [enchant]
 * @property {array}  [implicits]   - each element - string to create item mod based on it
 * @property {array}  [mods]        - each element - string to create item mod based on it
 *
 * @property {string} [flavour]      - flavour text
 *
 * @property {number} [shaper]      - 1 for shaper items
 * @property {number} [elder]       - 1 for elder items
 *
 * @property {number} [mirrored]    - 1 if item is mirrored
 * @property {number} [corrupted]   - 1 if item is corrupted
 *
 * @property {number} [fractured]   - 1 if item is fractured
 * @property {number} [synthesised] - 1 if item is synthesised
 * @property {number} [relic]       - 1 for relic items ("foiled" - with greenish icon and text)
 */
 
 /**
 * @typedef {Object} CurrencyObjectCreateParams
 *
 * @property {string} [name]    - name
 * @property {string} [base]    - base
 * @property {string} [rarity]  - rarity
 * @property {number} [altart]  - 1 if item has alternative art
 * @property {string} [notes]   - notes, for example buyout
 * @property {string} [icon]    - image url
 * @property {string} [w]       - width (in inventory cells)
 * @property {string} [h]       - height (in inventory cells)
 *
 *
 * @property {string} [curStack] - current stack size
 * @property {string} [maxStack] - maximum stack size
 * @property {string} [effect]   - text explaining what it does
 * @property {string} [info]     - text explaining how to use
 */
 
 
/**
 * Parses data you can get in game by pressing ctrl+c into object
 *
 * @param  {string}         - huge string to parse to object
 * @return {ItemObjectCreateParams}
 */
function from_CtrlC ( hugeString ){
 
    let obj = {},
        newLine = '\r', 
        currentStage = 0,
        r, blocksQueue;
    // r will contain rarity string, since blocks structure depends on rarity, it will be used often. hence short name
    
    // 1 - break hugeString to blocks
    let blocks = hugeString.slice( newLine+'--------' );
    
    // 2 - parse all blocks
    
    // 2.1 First block is always a header
    parseHeader( blocks[0] );
    
   
    // 2.2 - go through all remaining blocks
    for ( let i=1, len=blocks.length; i<len; i++ ){
        
        if ( r=='Unique' || r=='Rare' || r=='Magic' || r=='Normal'  ) {
            handle_RegularItem( blocks[i] );
            
        }
        else if ( r=='Currency' ) {
            // currency orbs
            handle_Currency( blocks[i] );
            
        } else if ( 0 ) {
            // something else
        }
    }
    
    return obj;
    
    
    /**
     * For regular items - figures block type and parses its data
     *
     * @param  {string}  block type
     */
    function handle_RegularItem( block ){
        // chain of possible blocks:
        // 'BASE_STATS', 'REQUIREMENTS', 'SOCKETS', 'ITEM_LEVEL', 'ENCHANT', 'IMPLICITS_LIST', 'MODS_LIST', 'FLAVOUR_TEXT', 'EXTRA_TAGS'
        
        if ( currentStage<1 && is_baseStats(block) ) {
            parse_baseStats(block);
            currentStage = 1;
            continue;
        }
        if ( currentStage<2 && is_requirements(block) ) {
            parse_requirements(block);
            currentStage = 2;
            continue;
        }
        if ( currentStage<3 && is_sockets(block) ) {
            parse_sockets(block);
            currentStage = 3;
            continue;
        }
        if ( currentStage<4 && is_itemLevel(block) ) {
            parse_itemLevel(block);
            currentStage = 4;
            continue;
        }
        if ( currentStage<5 && is_enchant(block) ) {
            parse_enchant(block);
            currentStage = 5;
            continue;
        }
        if ( currentStage<6 && is_implicits(block) ) {
            parse_implicits(block);
            currentStage = 6;
            continue;
        }
        if ( currentStage<7 && is_mods(block) ) {
            parse_mods(block);
            currentStage = 7;
            continue;
        }
        if ( currentStage<8 && is_flavour(block) ) {
            parse_flavour(block);
            currentStage = 8;
            continue;
        }
        if ( currentStage<9 && is_extraTag(block) ) {
            parse_extraTag(block);
            continue;
        }
        if ( currentStage<9 && is_note(block) ) {
            parse_note(block);
            continue;
        }
    }
    
    /**
     * For currency - figures block type and parses its data
     *
     * @param  {string}  block type
     */
    function handle_Currency( block ){
        ;
    }
    
    
    /**
     * Check if block is BASE_STATS
     *
     * @param  {string}  block
     */
    function is_BaseStats( block ) {
        return true;
    }
    /**
     * Parses block as BASE_STATS block
     *
     * @param  {string}  block
     */
    function parse_BaseStats( block ) {
        ;
    }
    
    /**
     * Parses header block
     */
    function parseHeader( block ){
        // Structure:
        // line   Content
        // 0      Rarity: <rarity>
        // 1      <itemName>
        // 2      [<itemBase>]       - only for rares and uniques, for others some extra work required
        let blockLines = block.splice( newLine );
        
        
        r = blockLines[0].replace('Rarity: ', '');
        
        if ( blockLines.length > 2 ) {
            // there is third line --> it's itemBase
            obj.rarity  = r;
            obj.name    = blockLines[1];
            obj.base    = blockLines[2];
            
        } else {
            // no ItemBase specified, figure what it is
            if ( r == 'Currency' ) {
                // for orbs name and base are the same
                obj.rarity = r;
                obj.name   = blockLines[1];
                obj.base   = blockLines[1];
                
            } else if ( r=='Magic' ){
                // have to pull base out of item name
                obj.rarity = r;
                obj.name   = blockLines[1];
                obj.base   = getBaseFromMagicName( blockLines[1] );
            } 
        }
        obj.baseEng = obj.base.replace( /(?:Superior)|(?:Synthesised)/gi, function( match ){
            if (match=='Superior'){
                obj.superior = 1;
            }
            if (match=='Synthesised'){
                obj.synthesised = 1;
            }
            return '';
        } ).trim();
    }
    
}

function from_PoB ( hugeString ){
    let obj = {};
    return obj;
}

function from_Json ( jsondata ){
    let obj = {};
    return obj;
}