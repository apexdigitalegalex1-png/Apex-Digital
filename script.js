// Apex Digital - Google Sheets Integration

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwR-1t1BaDQE_t2uk0msz8-txJl37Xk3hQjSyoDRTFBdYssUlehbmXF1wgUuFPvD5qq/exec";

const form = document.getElementById("leadForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "جاري إرسال البيانات...";
    status.style.color = "#63d4ff";

    const formData = new FormData(form);

    const data = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
        data.append(key, value);
    }

    data.append("timestamp", new Date().toISOString());
    data.append("source", "Apex Digital Website");

    try {

        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: data
        });

        status.textContent = "تم إرسال طلبك بنجاح، سنتواصل معك قريباً.";
        status.style.color = "#63e6a0";

        form.reset();

    } catch (error) {

        console.error(error);

        status.textContent = "حصل خطأ أثناء الإرسال. تواصل معنا على واتساب.";
        status.style.color = "#ff8f8f";
    }
});
