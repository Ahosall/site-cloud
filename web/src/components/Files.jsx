import React, { useEffect, useState } from "react";

import api from "../utils/api";

import "./files.css";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [onSearch, setOnSearch] = useState(false);
  const [filesOnSearch, setFilesOnSearch] = useState([]);

  useEffect(() => {
    (async () => setFiles(await api.get("/files").then((res) => res.data)))();
  }, []);

  const handleAdd = () => {
    window.location.href = "/add";
  };

  const handleDownload = (url) => {
    let name = url.split("/");
    name = name[name.length - 1];
    console.log(name);
    const link = document.createElement("a");

    link.setAttribute("download", name);
    link.href = url;

    document.body.appendChild(link);

    link.click();
    link.remove();
  };

  const handleSearch = (el) => {
    const search = el.target.value.toLowerCase();
    console.log(
      search.length,
      search.replace(" ", ""),
      onSearch.length == 0 ? true : false
    );
    if (search.length > 2 && search.replace(" ", "") !== "") {
      setOnSearch(true);
      setFilesOnSearch(
        files.filter((f) => f.title.toLowerCase().includes(search))
      );
    } else {
      setOnSearch(false);
    }
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
    <div className="files">
      <div className="header">
        <input
          type="text"
          onChange={handleSearch}
          className="search"
          placeholder="Pesquisar...."
        />
        <div className="btnAdd" onClick={handleAdd}>
          <span>+</span>
        </div>
      </div>
      <ul className="contents">
        {files && onSearch !== true && files.length > 0 ? (
          files
            .map((f, i) => (
              <li
                key={i}
                className="file"
                onClick={() => handleDownload(f.location, f.title)}
              >
                <div className="infos">
                  <div className="title">{f.title}</div>
                  <div className="author">{f.author}</div>
                  <div className="date">
                    {new Date(parseInt(f.date)).toLocaleDateString("pt-BR", {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </div>
                  <div className="size">{NormalizeSize(f.size, true)}</div>
                </div>
              </li>
            ))
            .reverse()
        ) : onSearch ? (
          filesOnSearch.length > 0 ? (
            filesOnSearch.map((f, i) => (
              <li
                key={i}
                className="file"
                onClick={() => handleDownload(f.location, f.title)}
              >
                <div className="infos">
                  <div className="title">{f.title}</div>
                  <div className="author">{f.author}</div>
                  <div className="date">
                    {new Date(parseInt(f.date)).toLocaleDateString("pt-BR", {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </div>
                  <div className="size">{NormalizeSize(f.size, true)}</div>
                </div>
              </li>
            ))
          ) : (
            <li className="notFiles">
              Não há arquivos com essas especificações!
            </li>
          )
        ) : (
          <li className="notFiles">Não há arquivos na nuvem!</li>
        )}
      </ul>
    </div>
  );
};

export default Files;
