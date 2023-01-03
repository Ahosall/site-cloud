import React, { useEffect, useState } from "react";
import api from "../../utils/api";

import "./style.css";

const Add = () => {
  const [addFiles, setAddFiles] = useState([]);

  const handleAddfiles = (e) => {
    const files = Object.values(e.target.files);

    let lFiles = [];
    files.map((f) => lFiles.push({ name: f.name, size: f.size }));
    setAddFiles(lFiles);
  };

  const handleOpenSelector = () => {
    document.getElementById("files").click();
  };

  const handleDiscart = () => {
    window.location.href = "/";
  };

  const handleSend = (e) => {
    e.preventDefault();

    let size = 0;

    addFiles.map((f) => (size = size + f.size));

    const formData = new FormData();
    const files = Object.values(document.getElementById("files").files);

    formData.append("title", document.getElementById("title").value);
    formData.append("author", document.getElementById("author").value);
    formData.append("date", Date.now());

    files.forEach((f) => {
      formData.append("files", f);
    });

    formData.append("size", size);

    console.log(formData);
    (async () =>
      api
        .post("/files/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => (window.location.href = "/")))();
  };

  const NormalizeSize = (bytes, si = false, dp = 1) => {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }

    const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    );

    return bytes.toFixed(dp) + " " + units[u];
  };

  return (
    <div className="add">
      <h2>Adicionar arquivos</h2>
      <form className="form">
        <div className="entry">
          <label htmlFor="title">Título</label>
          <input type="text" id="title" required autoFocus />
        </div>
        <div className="entry">
          <label htmlFor="author">Identificador</label>
          <input type="text" id="author" required />
        </div>
        <div className="entry fileArea">
          <div className="areaInfo">
            <label htmlFor="files">Arquivos</label>
            <div onClick={handleOpenSelector} className="btnAddFiles">
              Adicionar arquivos
            </div>
          </div>

          <input
            onChange={handleAddfiles}
            type="file"
            id="files"
            multiple
            required
            hidden
          />

          <ul className="listFiles">
            {addFiles && addFiles.length > 0 ? (
              addFiles.map((f, i) => (
                <li key={i} className="file">
                  <div className="infos">
                    <div className="title">{f.name}</div>
                    <div className="size">{NormalizeSize(f.size, true)}</div>
                  </div>
                </li>
              ))
            ) : (
              <li className="noFiles">Nenhum arquivo selecionado</li>
            )}
          </ul>
        </div>
        <div className="buttons">
          <span onClick={handleDiscart}>Cancelar</span>
          <span onClick={handleSend}>Enviar</span>
        </div>
      </form>
    </div>
  );
};

export default Add;
