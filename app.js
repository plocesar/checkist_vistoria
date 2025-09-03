function capturePhoto(btn) {
  const input = btn.parentNode.querySelector('input[type=file]');
  input.setAttribute("capture", "environment");
  input.click();
}
function selectPhoto(btn) {
  const input = btn.parentNode.querySelector('input[type=file]');
  input.removeAttribute("capture");
  input.click();
}
function previewPhoto(input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      let img = input.parentNode.querySelector("img.preview");
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// ✍️ Assinatura corrigida para celular
let canvas, ctx, drawing = false;

window.onload = () => {
  canvas = document.getElementById("sigPad");
  if (canvas) {
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    // Mouse (PC)
    canvas.addEventListener("mousedown", e => startDraw(e.offsetX, e.offsetY));
    canvas.addEventListener("mousemove", e => { if (drawing) draw(e.offsetX, e.offsetY); });
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mouseleave", endDraw);

    // Toque (Mobile)
    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      startDraw(x, y);
    });

    canvas.addEventListener("touchmove", e => {
      e.preventDefault();
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      draw(x, y);
    });

    canvas.addEventListener("touchend", endDraw);
  }
};

function startDraw(x, y) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function draw(x, y) {
  ctx.lineTo(x, y);
  ctx.stroke();
}

function endDraw() {
  drawing = false;
}

function clearSig() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 📄 Exportar PDF
async function exportPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "pt", "a4");

  const element = document.querySelector(".container");

  await html2canvas(element, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  });

  pdf.save("checklist-vistoria.pdf");
}
