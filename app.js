
// Capturar foto
function capturePhoto(btn) {
  let input = btn.parentElement.querySelector('input[type=file]');
  input.setAttribute("capture", "environment");
  input.click();
}

// Selecionar foto
function selectPhoto(btn) {
  let input = btn.parentElement.querySelector('input[type=file]');
  input.removeAttribute("capture");
  input.click();
}

// Preview da foto
function previewPhoto(input) {
  let file = input.files[0];
  if (!file) return;
  let reader = new FileReader();
  reader.onload = function(e) {
    input.parentElement.querySelector('.preview').src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Assinatura digital
const canvas = document.getElementById("signature-pad");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let drawing = false;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#123a85";
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function startDraw(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(getX(e), getY(e));
    e.preventDefault();
  }

  function draw(e) {
    if (!drawing) return;
    ctx.lineTo(getX(e), getY(e));
    ctx.stroke();
    e.preventDefault();
  }

  function endDraw() {
    drawing = false;
    ctx.closePath();
  }

  function getX(e) {
    if (e.touches) return e.touches[0].clientX - canvas.getBoundingClientRect().left;
    return e.clientX - canvas.getBoundingClientRect().left;
  }
  function getY(e) {
    if (e.touches) return e.touches[0].clientY - canvas.getBoundingClientRect().top;
    return e.clientY - canvas.getBoundingClientRect().top;
  }

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", endDraw);
  canvas.addEventListener("mouseleave", endDraw);

  canvas.addEventListener("touchstart", startDraw);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", endDraw);

  window.clearSignature = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  window.saveSignature = function() {
    const dataURL = canvas.toDataURL();
    alert("Assinatura salva! (base64 gerado, pode ser enviado ao backend)");
    console.log(dataURL);
  }
}



function exportPDF() {
  const element = document.body;
  html2canvas(element, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jspdf.jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("checklist_vistoria.pdf");
  });
}
