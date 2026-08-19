// ========================================
// Apex Digital - Website Form
// Google Sheets Integration
// ========================================

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbwR-1t1BaDQE_t2uk0msz8-txJl37Xk3hQjSyoDRTFBdYssUlehbmXF1wgUuFPvD5qq/exec";

const form = document.getElementById("leadForm");
const status = document.getElementById("formStatus");


// التأكد إن الفورم موجود
if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();


        // رسالة أثناء الإرسال
        if (status) {
            status.textContent = "جاري إرسال البيانات...";
            status.style.color = "#63d4ff";
        }


        // جمع بيانات الفورم
        const formData = new FormData(form);


        // تحويل البيانات إلى URLSearchParams
        const data = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            data.append(key, value);
        }


        // بيانات إضافية
        data.append("timestamp", new Date().toISOString());
        data.append("source", "Apex Digital Website");


        try {

            // إرسال البيانات إلى Google Apps Script
            await fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8"
                },

                body: data.toString()

            });


            // رسالة نجاح
            if (status) {
                status.textContent =
                    "تم إرسال طلبك بنجاح، سنتواصل معك قريباً.";

                status.style.color = "#63e6a0";
            }


            // تفريغ الفورم
            form.reset();


        } catch (error) {

            console.error(
                "Google Sheets Error:",
                error
            );


            if (status) {

                status.textContent =
                    "حصل خطأ أثناء إرسال البيانات. حاول مرة أخرى أو تواصل معنا على واتساب.";

                status.style.color = "#ff8f8f";

            }

        }

    });

}
