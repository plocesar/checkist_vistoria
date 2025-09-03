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
// Assinatura
let canvas, ctx, drawing = false;
window.onload = () => {
  canvas = document.getElementById("sigPad");
  if (canvas) {
    ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", e => { drawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); });
    canvas.addEventListener("mousemove", e => { if (drawing) { ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); } });
    canvas.addEventListener("mouseup", () => drawing = false);
    canvas.addEventListener("mouseleave", () => drawing = false);
    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
    });
    canvas.addEventListener("touchmove", e => {
      e.preventDefault();
      if (drawing) {
        ctx.lineTo(e.touches[0].clientX - canvas.offsetLeft, e.touches[0].clientY - canvas.offsetTop);
        ctx.stroke();
      }
    });
    canvas.addEventListener("touchend", () => drawing = false);
  }
}
function clearSig() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

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

