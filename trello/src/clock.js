export const clock = () =>{
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        return formattedTime
 
}