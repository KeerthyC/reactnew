

const checkAndNavigate = () => {

    const hexmModsString = localStorage.getItem('hexm_mods');
  
    if (hexmModsString) {
        const hexmMods = JSON.parse(hexmModsString);
  
        if (hexmMods.length > 0) {
            const firstMod = hexmMods[0];
  
            if (firstMod.type === 'questions') {
                navigate('/usertest');
            } else if (firstMod.type === 'jupyter') {
                navigate('/jupyter');
            } else if (firstMod.type === 'sql') {
              navigate('/sql');
          }
          else
          {
            navigate('/finish');
  
          }
            // Add more conditions here if needed
        }
        else
        {
          navigate('/finish');
  
        }
    }
    else
        {
          navigate('/finish');
  
        }
  };

export default checkAndNavigate;