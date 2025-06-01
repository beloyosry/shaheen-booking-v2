import { confirmDialog } from "primereact/confirmdialog";

// Function to set a secure cookie
function setSecureCookie(
    name: string,
    value: string,
    daysToExpire: number,
    sameSite = "Strict"
) {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const secure = location.protocol === "https:" ? "Secure" : "";
    const cookieString = `${name}=${value}; ${expires}; path=/; ${secure}; SameSite=${sameSite}`;
    document.cookie = cookieString;
}
// Function to get the value of a cookie by name
function getCookie(name: string) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie
            .split("=")
            .map((c) => c.trim());
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return "";
}

// Handle User Logout
const handleLogOut = () => {
    window.localStorage.clear();

    setSecureCookie("shaheen_token", "", -1);

    return (window.location.href = "/");
};

const numberFormat = (number: string) => {
    const formattedNumber = number
        ?.toString()
        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedNumber;
};

const handleDelete = (accept: () => void) => {
    return confirmDialog({
        message: "هل تريد الحذف؟",
        header: "تأكيد الحذف",
        icon: "pi pi-info-circle",
        defaultFocus: "reject",
        acceptClassName: "p-button-danger",
        accept: accept,
    });
};

export { setSecureCookie, getCookie, handleLogOut, numberFormat, handleDelete };
