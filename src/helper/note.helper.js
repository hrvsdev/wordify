// Convert date to format like "15 Jan"
export const convertDateToString = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(date);
  const day = d.getDate();
  const month = months[d.getMonth()];
  return `${day} ${month}`;
}

// Extract all text from HTML
export const extractTextFromHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// Limit the string to 70 characters and add ellipis if it exceeds
export const limitString = (str) => {
  if (str.length > 70) {
    return str.substring(0, 70) + " ...";
  }
  return str;
}

