export const getZapatillas = async() => {
    try{

        const response = await fetch("https://api-zapacity.onrender.com");
        const data = await response.json();
   
        return data;        
        
   

    }catch(error){
        console.log(`El error es: ${error}`);
        return[];
    }
}
