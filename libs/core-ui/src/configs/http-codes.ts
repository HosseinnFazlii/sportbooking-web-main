// libs/core-ui/src/components/pages/error-page/http-codes.ts
export const httpCodes: { [key: number]: { title: string, description: string, imagePath: string, titleFa: string, descriptionFa: string } } = {
    400: {
        title: "Bad Request ❗",
        description: "The server could not understand the request due to invalid syntax.",
        imagePath:"/images/pages/400.png",
        titleFa: "درخواست نادرست ❗",
        descriptionFa: "سرور نتوانست درخواست را به دلیل نادرست بودن دستورالعمل درک کند."
    },
    401: {
        title: "Unauthorized 🔐",
        description: "You need to log in or provide valid credentials to access this resource.",
        imagePath:"/images/pages/401.png",
        titleFa: "غیر مجاز 🔐",
        descriptionFa: "برای دسترسی به این منبع باید وارد شوید یا اطلاعات معتبر ارائه دهید."
    },
    403: {
        title: "Forbidden 🚫",
        description: "You don't have permission to access this resource on the server.",
        imagePath:"/images/pages/403.png",
        titleFa: "ممنوع 🚫",
        descriptionFa: "شما اجازه دسترسی به این منبع روی سرور را ندارید."
    },
    404: {
        title: "پیدا نشد 🕳️",
        description: "The resource you're looking for cannot be found.",
        imagePath:"/images/pages/404.png",
        titleFa: "پیدا نشد 🕳️",
        descriptionFa: "منبعی که به دنبال آن هستید پیدا نشد."
    },
    408: {
        title: "Request Timeout ⌛",
        description: "The server timed out waiting for the request.",
        imagePath:"/images/pages/408.png",
        titleFa: "وقت درخواست سپری شد ⌛",
        descriptionFa: "سرور در انتظار درخواست به پایان زمان رسید."
    },
    500: {
        title: "Internal Server Error 💥",
        description: "The server encountered a situation it doesn't know how to handle.",
        imagePath:"/images/pages/500.png",
        titleFa: "خطای داخلی سرور 💥",
        descriptionFa: "سرور با وضعیتی روبرو شد که نمی‌داند چگونه با آن برخورد کند."
    },
    502: {
        title: "Bad Gateway 🌉",
        description: "The server received an invalid response from another server it was accessing while attempting to load the web page.",
        imagePath:"/images/pages/502.png",
        titleFa: "دروازه نامعتبر 🌉",
        descriptionFa: "سرور در هنگام تلاش برای بارگذاری صفحه وب، پاسخ نامعتبری از سرور دیگری دریافت کرد."
    },
    503: {
        title: "Service Unavailable 🛠️",
        description: "The server is not ready to handle the request, it may be down for maintenance or overloaded.",
        imagePath:"/images/pages/503.png",
        titleFa: "سرویس در دسترس نیست 🛠️",
        descriptionFa: "سرور آماده پردازش درخواست نیست، ممکن است برای تعمیرات خاموش باشد یا بار زیادی داشته باشد."
    },
    504: {
        title: "Gateway Timeout ⏲️",
        description: "The server, while acting as a gateway, did not get a response in time.",
        imagePath:"/images/pages/504.png",
        titleFa: "وقت دروازه سپری شد ⏲️",
        descriptionFa: "سرور، هنگام عمل به عنوان یک دروازه، در موقعیت مناسب پاسخ نگرفت."
    }
};
