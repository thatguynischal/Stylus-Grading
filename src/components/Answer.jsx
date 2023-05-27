import React, { useEffect, useRef, useState } from "react";

const Answer = (props) => {
  const [pages, setPages] = useState([{ id: 1 }]);
  const [activePage, setActivePage] = useState(1);
  const [penSize, setPenSize] = useState(1);
  const canvasRefs = useRef({});
  const [savedImages, setSavedImages] = useState({});

  useEffect(() => {
    const canvas = canvasRefs.current[activePage];
    const context = canvas.getContext("2d");

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const draw = (e) => {
      if (!isDrawing) return;
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.lineWidth = penSize;
      context.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, [activePage, penSize]);

  const handlePenSizeChange = (e) => {
    setPenSize(parseInt(e.target.value));
  };

  const handleSave = () => {
    const updatedImages = { ...savedImages };

    Object.keys(canvasRefs.current).forEach((pageId) => {
      const canvas = canvasRefs.current[pageId];
      const image = canvas.toDataURL("image/png");
      updatedImages[pageId] = image;

      const a = document.createElement("a");
      a.href = image;
      a.download = `page_${pageId}.png`;
      a.click();
    });

    setSavedImages(updatedImages);
  };

  const handleAddPage = () => {
    const newPageId = pages.length + 1;
    setPages([...pages, { id: newPageId }]);
    setActivePage(newPageId);
  };

  const handleChangePage = (pageId) => {
    setActivePage(pageId);
  };

  return (
    <div className="">
      <div className="d-flex">
        <div className="border col-3 my-5">
          <h4 className="message">Solve this equation.</h4>
          <p className="message">
            <img
              src="https://www.analyzemath.com/high_school_math/grade_12/practice/log-equ-3.gif"
              alt="Hello"
              className="meroAnswerImg"
            />
          </p>
          <div className="d-grid justify-content-center align-items-center gap-3">
            <button className="btn-shine">
              <span> <input
              type="range"
              min={1}
              max={10}
              value={penSize}
              onChange={handlePenSizeChange}
            /></span>
            </button>{" "}
           
            <button className="btn-shine" onClick={handleSave}>
              <span>Submit Answer</span>
            </button>{" "}
            <button className="btn-shine">
              <span>Go Back</span>
            </button>{" "}
            <button className="btn-shine" onClick={handleAddPage}>
              <span>Add Page</span>
            </button>{" "}
          </div>
          <div className="pagination d-flex gap-2 my-2">
            {pages.map((page) => (
              <button
                key={page.id}
                className={`page ${page.id === activePage ? "active" : ""}`}
                onClick={() => handleChangePage(page.id)}
              >
                {page.id}
              </button>
            ))}
          </div>
        </div>
        <div className="cardx">
          <button className="dismiss" type="button">
            x
          </button>
          <div className="header">
            <div className="content">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className={`canvas-page ${
                    page.id === activePage ? "active" : ""
                  }`}
                >
                  <canvas
                    ref={(ref) => (canvasRefs.current[page.id] = ref)}
                    width={1000}
                    height={500}
                    style={{
                      cursor: "crosshair",
                      borderRadius: "20px",
                      background: "#e0e0e0",
                    }}
                  ></canvas>
                </div>
              ))}
            </div>
          </div>

          {Object.keys(savedImages).map((pageId) => (
            <div
              className={`saved-image ${pageId === activePage ? "active" : ""}`}
              key={pageId}
            >
              <img src={savedImages[pageId]} alt={`Page ${pageId}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Answer;
