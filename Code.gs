const SPREADSHEET_ID = "1FKgZTB3VNapsz3eHT9zkJHAqRg0st1Ux5XLu3-gxtCE";
const SHEET_NAME = "Leads";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.appendRow(["التاريخ","الاسم","رقم الهاتف","الإيميل","الخدمة","تفاصيل المشروع","المصدر"]);
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.email || "",
      data.service || "",
      data.message || "",
      data.source || "Apex Digital Website"
    ]);

    return ContentService.createTextOutput(JSON.stringify({success:true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success:false,error:String(error)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
