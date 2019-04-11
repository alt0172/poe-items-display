/**
 * "Pulls" item base from item name
 *
 * @param  {string} itemName
 *
 * @return {string} itemBase
 */
function getBaseFromName( itemName ){
    let itemBase = '';
    //
    return itemBase;
}


/**
 * Gets 3 item properties: icon, width, height
 *
 * @param  {object} itemData
 *                  .name    {string} - item name in english
 *                  .rarity  {string} - item rarity in english
 *                  .base    {string} - item base in english
 *                 [.altart] {number} - flag if item uses alternative art
 *
 * @return {object}
 *                  .url {string} - icom image url (basic, without extra GET params)
 *                  .w   {number} - item width (in 'inventory cells')
 *                  .h   {number} - item height (in 'inventory cells')
 */
function getIconWHfromSomeItemData( itemData ) {

    let obj = {}, tmp = '', data, useAltArt = 0;
    
    if ( itemData.hasOwnProperty('altart') ){
        useAltArt = itemData.altart;
    }
    
    //base = ( itemData.base )? itemData.base : getBaseFromName( itemData.name );
    
    data = getItemDataFromBase( itemData.base ),
    
    if ( data !== false ) {
        if ( itemData.rarity === 'Unique'){
            // Unique item icons
            if ( useAltArt ) {
                // alt. art uniques
                tmp = getIcon_uniq_altart( itemData.name );
            } else {
                // normal uniques
                tmp = getIcon_uniq( itemData.name );
            }
        } else {
            if ( useAltArt ) {
                // alt art
                tmp = getIcon_altart( itemData.base );
            }
        }
        obj.url = tmp || data.url;
        obj.w   = data.w;
        obj.h   = data.h;
        
    } else {
        // unknown base
    }
    
    return obj;
}
