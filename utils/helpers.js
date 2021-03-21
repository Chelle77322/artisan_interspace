module.exports = {
    format_date: (date) =>{
    //Formats the date as MM/DD/YYYY
    return date.toLocaleDateString();
    },
    format_amount: (amount) => {
        return parseInt(amount).toLocaleString();
    },
get_emoji: () =>{
    const randomNum = Math.random();
    //Returns a random emoji
    if(randomNum > 0.7){
        return `span for = "img" aria-label="money"></span`;
    }else if (randomNum > 0.4) {
        return `<span for="img" aria-label="laptop">💻</span>`;
      } else {
        return `<span for="img" aria-label="gear">⚙️</span>`;
      }
    },
  };
