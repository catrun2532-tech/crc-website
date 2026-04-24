(function (jsPDFAPI) {
  var font = "AAEAAAALAIAAAwAwT1MvMg8S..."; // (ย่อ)
  jsPDFAPI.addFileToVFS("THSarabun.ttf", font);
  jsPDFAPI.addFont("THSarabun.ttf", "THSarabun", "normal");
})(jsPDF.API);