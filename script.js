const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbx5EP51iEM19a93Ei5CN486kvZ9TP1bRIGwDHjk9btQ4JWzzIfJX3fXT45cW1HNIfJO/exec";

const dialog = document.getElementById("leadDialog");
const form = document.getElementById("leadForm");
const status = document.getElementById("formStatus");

document.querySelectorAll("[data-open]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    status.textContent = "";
    dialog.showModal();
  });
});

document.querySelectorAll("[data-close]").forEach(function (btn) {
  btn.addEventListener("click", function () { dialog.close(); });
});

// إغلاق عند الضغط خارج النموذج
dialog.addEventListener("click", function (e) {
  if (e.target === dialog) dialog.close();
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const submitBtn = form.querySelector(".submit");
  submitBtn.disabled = true;
  status.textContent = "جاري إرسال البيانات...";
  status.style.color = "#63d4ff";

  const data = new URLSearchParams(new FormData(form));
  data.append("source", "Apex Digital Website");

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: data.toString()
    });
    status.textContent = "تم إرسال طلبك ✅ هنتواصل معاك قريباً.";
    status.style.color = "#63e6a0";
    form.reset();
    setTimeout(function () { if (dialog.open) dialog.close(); }, 2200);
  } catch (error) {
    console.error(error);
    status.textContent = "حصل خطأ أثناء الإرسال ❌ جرّب تاني أو كلمنا على واتساب.";
    status.style.color = "#ff8f8f";
  } finally {
    submitBtn.disabled = false;
  }
});
