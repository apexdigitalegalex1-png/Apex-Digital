// Apex Digital - Google Sheets form integration
// ضع رابط Google Apps Script Web App في المتغير التالي بعد عمل Deploy.
const GOOGLE_SCRIPT_URL = "";

const form = document.getElementById("leadForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  data.timestamp = new Date().toISOString();
  data.source = "Apex Digital Website";

  if (!GOOGLE_SCRIPT_URL) {
    status.textContent = "الموقع جاهز. اربط Google Apps Script لتسجيل الطلبات في الشيت.";
    status.style.color = "#ffd36a";
    return;
  }

  status.textContent = "جاري إرسال البيانات...";
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {"Content-Type": "text/plain;charset=utf-8"},
      body: JSON.stringify(data)
    });
    status.textContent = "تم إرسال طلبك بنجاح، سنتواصل معك قريباً.";
    status.style.color = "#63e6a0";
    form.reset();
  } catch (error) {
    status.textContent = "حصل خطأ. تواصل معنا على واتساب.";
    status.style.color = "#ff8f8f";
  }
});
