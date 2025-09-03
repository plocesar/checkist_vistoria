:root {
  --azul-escuro: #0a2a66;
  --azul-medio: #123a85;
  --azul-claro: #1e4db7;
  --branco: #ffffff;
  --cinza: #f7f8fa;
  --borda: #d1d5db;
}

body {
  margin: 0;
  background: var(--cinza);
  color: var(--azul-escuro);
  font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu;
  padding: 24px;
}

h1 {
  font-size: 24px;
  margin: 0 0 12px 0;
  color: var(--branco);
}

header {
  background: var(--azul-escuro);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.meta {
  font-size: 14px;
  color: var(--branco);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.meta label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
}

input[type=text],
input[type=date] {
  border: 1px solid var(--borda);
  border-radius: 8px;
  padding: 6px 10px;
  margin-top: 4px;
}

h2, h3 {
  color: var(--azul-medio);
  margin-top: 20px;
}

.item {
  background: var(--branco);
  border: 1px solid var(--borda);
  border-radius: 10px;
  padding: 12px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,.05);
}

.row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.row label {
  flex: 1;
  font-weight: 600;
}

input[type=checkbox] {
  width: 18px;
  height: 18px;
  accent-color: var(--azul-medio);
  margin-top: 2px;
  border-radius: 50%; /* deixa redondo */
}

/* Observações menores e centralizadas */
textarea {
  width: 95%;
  max-width: 700px;
  min-height: 64px;
  resize: vertical;
  border: 1px solid var(--borda);
  border-radius: 10px;
  padding: 8px 10px;
  font: inherit;
  display: block;
  margin: 10px auto 0 auto; /* centraliza */
}

/* Botões de fotos */
.photo-buttons {
  margin-top: 8px;
}

.photo-buttons button {
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  background: var(--azul-medio);
  color: var(--branco);
  font-size: 14px;
  margin-right: 6px;
}

.photo-buttons button:hover {
  background: var(--azul-claro);

  function previewPhoto(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = input.closest(".photo-buttons").querySelector(".preview");
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}

}

/* Assinatura */
.signature {
  padding: 16px;
  border: 2px dashed var(--azul-claro);
  border-radius: 12px;
  margin-top: 20px;
  background: var(--branco);
  text-align: center;
}

#signature-pad {
  border: 1px solid var(--borda);
  border-radius: 8px;
  width: 100%;
  height: 200px;
  touch-action: none;
}

.signature-actions {
  margin-top: 10px;
}

.signature-actions button {
  margin: 0 5px;
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  background: var(--azul-medio);
  color: var(--branco);
  font-weight: 600;
  cursor: pointer;
}

.signature-actions button:hover {
  background: var(--azul-claro);
}

/* Toolbar */
.toolbar {
  margin: 20px 0;
  text-align: center;
}

.toolbar button {
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  background: var(--azul-medio);
  color: var(--branco);
  font-weight: 600;
}

.toolbar button:hover {
  background: var(--azul-claro);
}

footer {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  color: var(--azul-escuro);
}
