// src/utils/usefulFunction.js

const removeFirstItemFromHexmMods = (arg1) => {
    // Retrieve the data from localStorage
    const hexmModsString = localStorage.getItem('hexm_mods');
  
    if (hexmModsString) {
        // Parse the JSON string to an array
        let hexmMods = JSON.parse(hexmModsString);
        const index = hexmMods.findIndex(mod => mod.type === arg1);
  
        // Check if there are items in the array
        // If found, remove the item
        if (index !== -1) {
          hexmMods.splice(index, 1);
  
          // Save the modified array back to localStorage
          localStorage.setItem('hexm_mods', JSON.stringify(hexmMods));
      }
    }
  };

export default removeFirstItemFromHexmMods;
