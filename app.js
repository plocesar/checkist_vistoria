// Funções de foto
function capturePhoto(btn) {
  const input = btn.parentElement.querySelector("input[type=file]");
  input.setAttribute("capture", "environment"); // abre câmera traseira no celular
  input.click();
}

function selectPhoto(btn) {
  const input = btn.parentElement.querySelector("input[type=file]");
  input.removeAttribute("capture");
  input.click();
}

function previewPhoto(input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = input.parentElement.querySelector(".preview");
      img.src = e.target.result;
      img.style.display = "block";
      img.style.maxWidth = "120px";
      img.style.marginTop = "8px";
      img.style.borderRadius = "6px";
    };
    reader.readAsDataURL(file);
  }
}

// Função exportar PDF com assinatura
async function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "pt", "a4");

  // Captura todo o conteúdo da página
  const checklist = document.body;

  const canvasChecklist = await html2canvas(checklist, {
    scale: 2,
    useCORS: true
  });

  const imgData = canvasChecklist.toDataURL("image/png");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const imgProps = doc.getImageProperties(imgData);
  const pdfWidth = pageWidth;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  // Adiciona a assinatura
  const signatureCanvas = document.getElementById("signature-pad");
  if (signatureCanvas) {
    const sigData = signatureCanvas.toDataURL("image/png");
    const sigWidth = 200; // largura da assinatura no PDF
    const sigHeight = 100;
    const sigX = pageWidth / 2 - sigWidth / 2; // centraliza
    const sigY = pageHeight - sigHeight - 40;  // margem inferior

    doc.addImage(sigData, "PNG", sigX, sigY, sigWidth, sigHeight);
  }

  doc.save("checklist_vistoria.pdf");
}
