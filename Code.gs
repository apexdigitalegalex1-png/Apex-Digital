const SHEET_ID = "1FKgZTB3VNapsz3eHT9zkJHAqRg0st1Ux5XLu3-gxtCE";
const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    // قراءة البيانات القادمة من الموقع
    const data = JSON.parse(e.postData.contents);

    // فتح ملف Google Sheets
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);

    // فتح ورقة Leads
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("لم يتم العثور على ورقة باسم Leads");
    }

    // إضافة البيانات في الصف الجديد
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.service || "",
      data.details || "",
      data.source || "Apex Digital Website"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "تم تسجيل البيانات بنجاح"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
