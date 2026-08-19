// ========================================
// Apex Digital - Google Sheets Integration
// ========================================

const SPREADSHEET_ID = "1FKgZTB3VNapsz3eHT9zkJHAqRg0st1Ux5XLu3-gxtCE";
const SHEET_NAME = "Leads";

// ========================================
// اختبار الاتصال
// ========================================

function doGet() {
  return ContentService
    .createTextOutput("Apex Digital is connected successfully!")
    .setMimeType(ContentService.MimeType.TEXT);
}


// ========================================
// استقبال بيانات الفورم
// ========================================

function doPost(e) {

  try {

    // فتح ملف Google Sheets
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // البحث عن صفحة Leads
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // لو الصفحة مش موجودة يتم إنشاؤها
    if (!sheet) {

      sheet = spreadsheet.insertSheet(SHEET_NAME);

      sheet.appendRow([
        "التاريخ",
        "الاسم",
        "رقم الهاتف",
        "البريد الإلكتروني",
        "الخدمة",
        "تفاصيل المشروع",
        "المصدر"
      ]);
    }


    // استقبال البيانات
    const data = e.parameter || {};


    // إضافة البيانات في صف جديد
    sheet.appendRow([

      new Date(),

      data.name || "",

      data.phone || "",

      data.email || "",

      data.service || "",

      data.message || "",

      data.source || "Apex Digital Website"

    ]);


    // الرد بنجاح
    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true,
          message: "Data saved successfully"
        })
      )
      .setMimeType(ContentService.MimeType.JSON);


  } catch (error) {

    // تسجيل الخطأ
    console.error(error);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: error.toString()
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }

}
