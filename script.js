const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbx5EP51iEM19a93Ei5CN486kvZ9TP1bRIGwDHjk9btQ4JWzzIfJX3fXT45cW1HNIfJO/exec";

const form = document.getElementById("leadForm");
const status = document.getElementById("formStatus");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        if (status) {
            status.textContent = "جاري إرسال البيانات...";
            status.style.color = "#63d4ff";
        }

        const formData = new FormData(form);

        const data = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            data.append(key, value);
        }

        data.append("source", "Apex Digital Website");

        try {

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8"
                },
                body: data.toString()
            });

            if (status) {
                status.textContent =
                    "تم إرسال طلبك بنجاح ✅ سنتواصل معك قريباً.";
                status.style.color = "#63e6a0";
            }

            form.reset();

        } catch (error) {

            console.error(error);

            if (status) {
                status.textContent =
                    "حصل خطأ أثناء إرسال البيانات ❌";
                status.style.color = "#ff8f8f";
            }
        }
    });
}
