import { addLocale } from "primereact/api";
const useSetLocale = () => {
    addLocale("ar", {
        firstDayOfWeek: 1,
        dayNames: [
            "الأحد",
            "الاثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "الجمعة",
            "السبت",
        ],
        dayNamesMin: [
            "أحد",
            "اثنين",
            "ثلاثاء",
            "أربعاء",
            "خميس",
            "جمعة",
            "سبت",
        ], // dayNamesShort
        dayNamesShort: ["ح", "ن", "ث", "ر", "خ", "ج", "س"], // dayNamesMin
        monthNames: [
            "يناير",
            "فبراير",
            "مارس",
            "إبريل",
            "مايو",
            "يونيو",
            "يوليو",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر",
        ],
        monthNamesShort: [
            "يناير",
            "فبراير",
            "مارس",
            "إبريل",
            "مايو",
            "يونيو",
            "يوليو",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر",
        ],
        today: "اليوم",
        clear: "مسح",
    });
    return {};
};

export { useSetLocale };
